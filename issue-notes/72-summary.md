# Streaming 50ms Lookahead Investigation - Summary

## Investigation Objective
Verify that the streaming implementation follows the specification: "For each line (event), calculate the scheduled playback time and schedule it 50ms before that time."

## Investigation Result: ✅ CONFIRMED

The implementation correctly follows the specification.

## Key Implementation Details

### 1. Play Button Press Moment
**File:** `src/ndjson-streaming.ts`, line 192

When the play button is pressed, the system captures the actual audio context time and adds a 50ms buffer:

```typescript
const startTime = this.Tone.now() + this.config.lookaheadMs / 1000;
```

This `startTime` becomes the reference point for all event scheduling.

### 2. Continuous Processing Loop
**File:** `src/ndjson-streaming.ts`, lines 277-394

The `processEvents()` function runs continuously via `requestAnimationFrame` (~60fps, every ~16ms):

```typescript
private processEvents(): void {
  const currentTime = this.Tone.now();
  const lookaheadTime = currentTime + this.config.lookaheadMs / 1000;
  
  // Check each event
  events.forEach((event, index) => {
    const absoluteTime = this.playbackState.startTime + eventTime + loopOffset;
    
    // Schedule if within lookahead window and not yet scheduled
    if (absoluteTime <= lookaheadTime && !alreadyScheduled) {
      scheduleEvent(event, absoluteTime);
    }
  });
}
```

### 3. Scheduling Logic

For each event:
1. **Calculate absolute time**: `startTime + eventTime + loopOffset`
2. **Check if within lookahead window**: `absoluteTime <= currentTime + 50ms`
3. **Schedule once**: Track with `Set` to prevent duplicates
4. **Schedule at exact time**: Event plays at `absoluteTime`

### 4. Jitter Compensation

The 50ms buffer provides:
- JavaScript execution jitter compensation
- Audio context scheduling time
- Event processing overhead buffer

## Timeline Example

```
T0 = 10.000s (play button pressed)
startTime = 10.050s (T0 + 50ms)

Event at 0:0:0 (time = 0s):
  absoluteTime = 10.050s
  Scheduled during first processing loop:
    currentTime ≈ 10.000s
    lookaheadTime ≈ 10.050s
    10.050 <= 10.050 ✓ → Schedule!
  
Event at 0:0:2 (time = 0.5s @ 120 BPM):
  absoluteTime = 10.550s
  Scheduled when:
    currentTime ≈ 10.500s
    lookaheadTime ≈ 10.550s
    10.550 <= 10.550 ✓ → Schedule!
```

## Verification Methods

### 1. Code Review
- ✅ Reviewed `src/ndjson-streaming.ts`
- ✅ Verified timing calculations
- ✅ Confirmed single scheduling per event

### 2. Timing Verification Example
Run: `node examples/timing-verification.js`

Output shows:
- Start time calculation
- Event scheduling decisions
- Lookahead window behavior

### 3. Interactive Demo
1. Open `demo/streaming.html`
2. Enable "Debug Mode"
3. Click "Play"
4. Watch console output

Debug output shows:
- Event scheduling times
- Time deltas (how far ahead scheduled)
- Loop iteration counts
- Processing statistics

## Documentation Improvements

### Added Code Comments
Enhanced `src/ndjson-streaming.ts` with detailed timing specification comments in:
- `initializePlayback()` - Explains startTime calculation
- `processEvents()` - Documents processing loop timing
- Event scheduling section - Details absoluteTime calculation

### Investigation Documents
1. `issue-notes/72-investigation.md` - Detailed English analysis
2. `issue-notes/72.md` - Updated with Japanese summary
3. `examples/timing-verification.js` - Console demonstration
4. `examples/README.md` - Examples documentation

## Conclusion

The streaming implementation is **correct and compliant** with the specification. The 50ms lookahead:
- ✅ Captures play button press time
- ✅ Adds buffer for jitter compensation
- ✅ Schedules events before they play
- ✅ Prevents duplicate scheduling
- ✅ Provides smooth, precise playback

No code changes are needed - only documentation improvements to clarify the existing correct behavior.

---

# Streaming 50ms先読み調査 - 概要（日本語）

## 調査目的
streamingが「行ごとに、演奏予定時刻を算出し、その50ms前に予約をする」という仕様どおりになっているか調査する。

## 調査結果：✅ 仕様どおり

実装は仕様に正しく準拠しています。

## 主要な実装の詳細

### 1. playボタンを押した瞬間
**ファイル：** `src/ndjson-streaming.ts` 192行目

playボタンを押すと、実際のオーディオコンテキスト時刻を取得し、50msバッファを追加：

```typescript
const startTime = this.Tone.now() + this.config.lookaheadMs / 1000;
```

この`startTime`がすべてのイベントスケジューリングの基準点になります。

### 2. 継続的な処理ループ
**ファイル：** `src/ndjson-streaming.ts` 277-394行目

`processEvents()`関数が`requestAnimationFrame`で継続実行（約60fps、16ms間隔）：

```typescript
private processEvents(): void {
  const currentTime = this.Tone.now();
  const lookaheadTime = currentTime + this.config.lookaheadMs / 1000;
  
  // 各イベントをチェック
  events.forEach((event, index) => {
    const absoluteTime = this.playbackState.startTime + eventTime + loopOffset;
    
    // lookahead窓内で未スケジュールならスケジュール
    if (absoluteTime <= lookaheadTime && !alreadyScheduled) {
      scheduleEvent(event, absoluteTime);
    }
  });
}
```

### 3. スケジューリングロジック

各イベントに対して：
1. **絶対時刻を計算**: `startTime + イベント時刻 + ループオフセット`
2. **lookahead窓内かチェック**: `絶対時刻 <= 現在時刻 + 50ms`
3. **一度だけスケジュール**: `Set`で追跡し重複を防止
4. **正確な時刻にスケジュール**: イベントは`絶対時刻`に再生

### 4. ジッター補償

50msバッファの役割：
- JavaScript実行のジッター補償
- オーディオコンテキストのスケジューリング時間
- イベント処理のオーバーヘッドバッファ

## タイムラインの例

```
T0 = 10.000秒（playボタンを押した瞬間）
startTime = 10.050秒（T0 + 50ms）

0:0:0のイベント（時刻 = 0秒）：
  絶対時刻 = 10.050秒
  最初の処理ループでスケジュール：
    現在時刻 ≈ 10.000秒
    lookahead時刻 ≈ 10.050秒
    10.050 <= 10.050 ✓ → スケジュール！
  
0:0:2のイベント（時刻 = 0.5秒 @ 120 BPM）：
  絶対時刻 = 10.550秒
  スケジュールされるタイミング：
    現在時刻 ≈ 10.500秒
    lookahead時刻 ≈ 10.550秒
    10.550 <= 10.550 ✓ → スケジュール！
```

## 検証方法

### 1. コードレビュー
- ✅ `src/ndjson-streaming.ts`をレビュー
- ✅ タイミング計算を検証
- ✅ イベント単一スケジューリングを確認

### 2. タイミング検証例
実行：`node examples/timing-verification.js`

出力内容：
- 開始時刻の計算
- イベントスケジューリングの決定
- lookahead窓の動作

### 3. インタラクティブデモ
1. `demo/streaming.html`を開く
2. 「デバッグモード」を有効化
3. 「再生」をクリック
4. コンソール出力を確認

デバッグ出力：
- イベントスケジューリング時刻
- タイムデルタ（どれだけ先にスケジュールされたか）
- ループ回数
- 処理統計

## ドキュメント改善

### コードコメントの追加
`src/ndjson-streaming.ts`に詳細なタイミング仕様コメントを追加：
- `initializePlayback()` - startTime計算の説明
- `processEvents()` - 処理ループのタイミングをドキュメント化
- イベントスケジューリング部分 - absoluteTime計算の詳細

### 調査ドキュメント
1. `issue-notes/72-investigation.md` - 詳細な英語分析
2. `issue-notes/72.md` - 日本語要約で更新
3. `examples/timing-verification.js` - コンソールデモンストレーション
4. `examples/README.md` - サンプルドキュメント

## 結論

streaming実装は仕様に**正しく準拠**しています。50ms先読みは：
- ✅ playボタン押下時刻を記録
- ✅ ジッター補償のためバッファを追加
- ✅ イベントを再生前にスケジュール
- ✅ 重複スケジュールを防止
- ✅ スムーズで正確な再生を提供

コード変更は不要です - 既存の正しい動作を明確にするドキュメント改善のみ実施しました。

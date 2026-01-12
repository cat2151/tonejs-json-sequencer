# Tone.js コンポーネント JSON対応ロードマップ

このドキュメントは、Tone.jsの全コンポーネント（Instrument / Source / Effect / Component）のJSON対応状況とロードマップを記載しています。

## 実装状況の凡例

- ✅ **実装済み** - JSON記述に対応済み
- 🚧 **計画中** - ロードマップに含まれている
- ⏳ **未定** - 今後検討予定

---

## Instrument（音源）

### Monophonic Instruments（モノフォニック音源）

| クラス名 | 状態 | 説明 |
|---------|------|------|
| Synth | ✅ | 基本的なオシレーター + エンベロープ |
| MonoSynth | ✅ | オシレーター + フィルター + デュアルエンベロープ |
| FMSynth | ✅ | 2オシレーターによる周波数変調シンセ |
| AMSynth | ✅ | 2オシレーターによる振幅変調シンセ |
| MetalSynth | ✅ | パーカッシブな金属音 |
| MembraneSynth | ✅ | ドラム・パーカッション音 |
| DuoSynth | ✅ | デュアルオシレーター・モノフォニックシンセ |
| PluckSynth | ✅ | プラック（弾く）音色、アコースティックギターやハープ |
| NoiseSynth | ✅ | ノイズベースのシンセサイザー |

### Polyphonic Instruments（ポリフォニック音源）

| クラス名 | 状態 | 説明 |
|---------|------|------|
| PolySynth | ✅ | ポリフォニックラッパー（任意のモノフォニックシンセを複数ボイスで）|
| Sampler | ✅ | サンプルベース、キーボード全体にサンプルをマップ |

---

## Source（音源生成）

低レベルのサウンドジェネレーター。さらなる処理のためのベース信号を提供。

| クラス名 | 状態 | 説明 |
|---------|------|------|
| Oscillator | ⏳ | Sine/Square/Triangle/Sawtooth/カスタム波形 |
| OmniOscillator | ⏳ | 複数の波形タイプと周期性をサポートする柔軟なオシレーター |
| FatOscillator | 🚧 | 分厚いシンセパッド用、複数のデチューンされたオシレーター |
| PulseOscillator | 🚧 | パルス波オシレーター、パルス幅変調対応 |
| PWMOscillator | ⏳ | パルス幅変調オシレーター |
| Noise | ⏳ | White/Brown/Pink ノイズ |
| Player | ⏳ | オーディオバッファー/サンプルを再生、開始/停止/ループ制御 |
| GrainPlayer | ⏳ | オーディオサンプルからグラニュラー合成 |
| UserMedia | ⏳ | マイクやその他のメディア入力 |
| BufferSource | ⏳ | 低レベルサンプル再生 |

---

## Effect（エフェクト）

オーディオ信号を変更または結合する標準的なオーディオエフェクトとプロセッサー。

### Dynamics（ダイナミクス処理）

| クラス名 | 状態 | 説明 |
|---------|------|------|
| Compressor | 🚧 | 標準コンプレッサー |
| MultibandCompressor | ⏳ | マルチバンドコンプレッサー |
| MidSideCompressor | ⏳ | Mid/Side コンプレッサー |
| Limiter | ⏳ | リミッター |
| Gate | ⏳ | ノイズゲート |

### Filter（フィルター）

| クラス名 | 状態 | 説明 |
|---------|------|------|
| Filter | ⏳ | 基本フィルター |
| BiquadFilter | ⏳ | バイクアッドフィルター |
| EQ3 | 🚧 | 3バンドイコライザー |
| LowpassCombFilter | ⏳ | ローパスコムフィルター |
| FeedbackCombFilter | ⏳ | フィードバックコムフィルター |
| OnePoleFilter | ⏳ | ワンポールフィルター |

### Spatial（空間系）

| クラス名 | 状態 | 説明 |
|---------|------|------|
| Reverb | ✅ | リバーブ |
| Freeverb | ✅ | Freeverb リバーブアルゴリズム |
| JCReverb | ✅ | JCReverb リバーブアルゴリズム |
| Convolver | ⏳ | インパルスレスポンスを使用したコンボルバー |

### Modulation（モジュレーション系）

| クラス名 | 状態 | 説明 |
|---------|------|------|
| Chorus | ✅ | コーラス |
| Phaser | ✅ | フェイザー |
| Tremolo | ✅ | トレモロ |
| Vibrato | ✅ | ビブラート |
| AutoFilter | ✅ | オートフィルター |
| AutoPanner | ✅ | オートパンナー |
| AutoWah | ✅ | オートワウ |

### Delay（ディレイ系）

| クラス名 | 状態 | 説明 |
|---------|------|------|
| FeedbackDelay | ✅ | フィードバックディレイ |
| PingPongDelay | ✅ | ピンポンディレイ |

### Distortion（歪み系）

| クラス名 | 状態 | 説明 |
|---------|------|------|
| Distortion | ✅ | ディストーション |
| BitCrusher | ✅ | ビットクラッシャー |
| Chebyshev | ✅ | チェビシェフ歪み（倍音生成） |

### Pitch（ピッチ系）

| クラス名 | 状態 | 説明 |
|---------|------|------|
| PitchShift | ✅ | ピッチシフト |
| FrequencyShifter | ✅ | 周波数シフター |

### Stereo（ステレオ処理）

| クラス名 | 状態 | 説明 |
|---------|------|------|
| StereoWidener | ✅ | ステレオワイドナー |
| Panner | ⏳ | パンナー |
| Panner3D | ⏳ | 3Dパンナー |
| PanVol | ⏳ | パン + ボリューム |

### Other Effects（その他のエフェクト）

| クラス名 | 状態 | 説明 |
|---------|------|------|
| Channel | ⏳ | 一般的な信号ルーティング/ミキシング/エフェクトチェーン |
| CrossFade | ⏳ | クロスフェード |
| Follower | ⏳ | エンベロープフォロワー |
| Merge | ⏳ | マルチチャンネル信号マージ |
| Mono | ⏳ | ステレオからモノラルへ変換 |
| MidSideMerge | ⏳ | Mid/Side マージ |
| MidSideSplit | ⏳ | Mid/Side スプリット |

---

## Component（コンポーネント）

オーディオシンセシス、モジュレーション、コントロールの低レベル構成要素。

### Envelope（エンベロープ）

| クラス名 | 状態 | 説明 |
|---------|------|------|
| Envelope | ⏳ | 基本エンベロープ（ADSR） |
| AmplitudeEnvelope | ⏳ | 振幅エンベロープ |
| FrequencyEnvelope | ⏳ | 周波数エンベロープ |

### Signal/Modulation（信号/モジュレーション）

| クラス名 | 状態 | 説明 |
|---------|------|------|
| Signal | ⏳ | 信号ソース |
| LFO | ⏳ | 低周波オシレーター（Low Frequency Oscillator） |
| SignalOperator | ⏳ | 信号演算 |

### Analysis（解析）

| クラス名 | 状態 | 説明 |
|---------|------|------|
| Meter | ⏳ | オーディオレベルメーター |
| DCMeter | ⏳ | DC オフセットメーター |
| Analyser | ⏳ | オーディオアナライザー |
| FFT | ⏳ | FFT 解析 |
| Waveform | ⏳ | 波形表示 |

### Core（コア）

| クラス名 | 状態 | 説明 |
|---------|------|------|
| Param | ⏳ | オーディオパラメーターラッパー |
| Gain | ⏳ | 基本ゲインコントロール |
| Volume | ⏳ | デシベルでのボリュームコントロール |
| Transport | ⏳ | タイミングとスケジューリング |
| Context | ⏳ | オーディオコンテキスト |
| Destination | ⏳ | 最終出力先 |

---

## 実装の優先順位

### 高優先度（ロードマップに記載済み）

1. **Source系**
   - FatOscillator（SuperSawパッド用）
   - PulseOscillator（12.5% パルス波）

2. **Effect系**
   - EQ（イコライザー）
   - Compressor（コンプレッサー）

3. **奏法表現用のメソッド**
   - Panpot変更
   - Expression変更
   - LPF変更
   - Portamento（ポルタメント）

### 中優先度

1. **Filter系**
   - 基本的なFilter
   - 各種フィルタータイプ

2. **Dynamics系**
   - 基本的なCompressor
   - Limiter

3. **Source系その他**
   - Noise
   - Player

### 低優先度

1. **高度なComponent**
   - Envelope系
   - LFO
   - Signal系

2. **解析系**
   - Meter
   - Analyser
   - FFT

3. **3D/特殊系**
   - Panner3D
   - 特殊なエフェクト

---

## 実装方針

### 基本方針

1. **安全性優先**
   - `eval`等は使用しない
   - switch-case によるホワイトリスト方式を継続

2. **段階的実装**
   - ロードマップに記載された機能から優先的に実装
   - 効果がわかりやすいものを優先

3. **ドッグフーディング**
   - 実装した機能は実際に使用してテスト
   - 実用性を確認してから次へ進む

### 実装の進め方

1. **createNode の拡張**
   - 新しいInstrument/Effect/Sourceを追加

2. **メソッド呼び出しの拡張**
   - 各ノードの主要メソッドをeventTypeとして追加
   - 例: `set`, `get`, `rampTo`, `linearRampTo`, `exponentialRampTo`

3. **プロパティアクセスの拡張**
   - 深いプロパティアクセスへの対応
   - 例: `oscillator.frequency.value`, `filter.Q.value`

---

## 参考資料

- [Tone.js 公式ドキュメント](https://tonejs.github.io/docs/)
- [Tone.js GitHub リポジトリ](https://github.com/Tonejs/Tone.js)
- [Tone.js Wiki - Instruments](https://github.com/Tonejs/Tone.js/wiki/Instruments)

---

## 更新履歴

- 2026-01-11: 初版作成、全コンポーネントの分類と実装状況の整理

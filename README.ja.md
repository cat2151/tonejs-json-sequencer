# tonejs-json-sequencer

<p align="left">
  <a href="https://deepwiki.com/cat2151/tonejs-json-sequencer"><img src="https://img.shields.io/badge/DeepWiki-Documentation-blue?logo=book" alt="DeepWiki"></a>
  <a href="README.ja.md"><img src="https://img.shields.io/badge/🇯🇵-Japanese-red.svg" alt="Japanese"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/🇺🇸-English-blue.svg" alt="English"></a>
  <a href="https://cat2151.github.io/tonejs-json-sequencer/index.html"><img src="https://img.shields.io/badge/🚀-Live%20Demo-brightgreen.svg" alt="Demo"></a>
  <a href="https://cat2151.github.io/tonejs-json-sequencer/streaming.html"><img src="https://img.shields.io/badge/🎵-Streaming%20Demo-orange.svg" alt="Streaming Demo"></a>
  <a href="https://cat2151.github.io/tonejs-json-sequencer/demo-library/"><img src="https://img.shields.io/badge/📦-Library%20Demo-blue.svg" alt="Library Demo"></a>
</p>

# 状況
- 頻繁に破壊的変更をする予定です
- このドキュメントと関連ドキュメントには、AI生成が含まれており、計画などは間違っている（cat2151の構想とは異なる）可能性があります

# 3行で説明
- Tone.jsの音色・エフェクト・演奏をJSONで記述できる軽量ライブラリ
- コードを書かず、音をデータで制御できるため、UIやストリーミングと自然に連携
- 時間順のイベントをデータとして扱い、緻密な演奏表現が可能に

# Why
- ※応急でChatGPTに生成させたものです。今後、書き直す可能性があります。
- ※実際には大部分が「今後実装予定です」

Tone.js は、Web 上で豊かな音楽表現を可能にするライブラリです。シンセの構築、エフェクトチェーン、トリガーのスケジューリングなど、高度な音響設計が JavaScript で自由に行えます。

ただその柔軟さゆえに、音色やパターンの構造がプログラムに深く埋め込まれやすく、再利用や連携がしづらくなることもあります。

tonejs-json-sequencer は、Tone.js をそのまま活かしながらも、音色定義・演奏内容・タイミング情報などを JSON として外部化し、データドリブンな音楽再生を可能にする小さな仕組みです。

シーケンスは SMF のように、「時間順にすべてのイベントを明示的に並べた構造」

音色は Tone.js の synth/chain/params を柔軟に JSON で定義可能

演奏中にも音色パラメータを動的に変更できるため、ディレイビブラートやフィルターの開閉などの奏法表現も可能

外部ツールやライブ生成エンジンからの NDJSON ストリームをそのまま受け取り、リアルタイム再生が可能

これにより、構造を持った音楽データを UI やネットワーク越しに操作・再生・交換するという流れを、Tone.js 上でシンプルに実現できます。

# Design Philosophy
- ※応急でChatGPTに生成させたものです。今後、書き直す可能性があります。

tonejs-json-sequencer では、Tone.js の構成要素（シンセ、エフェクトチェーン、パラメータ変更など）を、そのまま JSON に記述するというアプローチを取っています。

独自の音楽記述言語や抽象レイヤーは導入せず、そうした高度なロジックは、より上位のプログラム層に委ねる設計です。

音色定義は、Tone.Synth や Tone.FMSynth などのコンストラクタ名と引数オブジェクトを指定する形式

イベント定義も、triggerAttackRelease などの Tone.js の呼び出し内容に近い構造

演奏中のパラメータ変更も、関数名と引数をイベントのタイムスタンプとともに列挙する形式

これにより、Tone.js の持つ音響表現力を損なうことなく、再生ロジックをデータに移し、外部から構成可能にするという目標を実現しています。

コアとなる scheduleOrExecuteEvent は単一elementを受け取るだけのシンプルなソースファイルとし、上位レイヤーでシーケンスやNDJSON ストリーミングを扱う

これにより、Tone.jsとつながる低レイヤーと、シーケンスやストリーミングなどの高レイヤーを、切り分けて柔軟に開発できます。

# ライブラリとして利用する

tonejs-json-sequencerは、他のプロジェクトからライブラリとして利用できます。

## インストール

### npm を使用する場合

```bash
npm install tonejs-json-sequencer tone
```

### GitHubから直接インストールする場合

GitHub から直接インストールして、最新の開発バージョンを使用できます：

```bash
npm install cat2151/tonejs-json-sequencer tone
```

GitHub インストール経由で外部プロジェクトからライブラリを使用する完全な例については、[demo-library](https://cat2151.github.io/tonejs-json-sequencer/demo-library/) ディレクトリを参照してください。

### dist/ ディレクトリを直接参照する場合

このリポジトリをクローンまたはダウンロードして、`dist/` ディレクトリ内のファイルを直接参照できます。

#### ES Modules（推奨）

```javascript
import { SequencerNodes, playSequence } from './path/to/tonejs-json-sequencer/dist/index.mjs';
```

#### CommonJS

```javascript
const { SequencerNodes, playSequence } = require('./path/to/tonejs-json-sequencer/dist/cjs/index.js');
```

#### TypeScript

TypeScript を使用する場合、型定義ファイルも `dist/` ディレクトリに含まれています：

```typescript
import { SequencerNodes, playSequence, SequenceEvent } from './path/to/tonejs-json-sequencer/dist/index.mjs';
```

型定義ファイル: `dist/index.d.ts`

### CDN を使用する場合

```html
<script type="module">
  import { SequencerNodes, playSequence } from 'https://cdn.jsdelivr.net/npm/tonejs-json-sequencer@1.0.0/dist/index.mjs';
</script>
```

または unpkg を使用：

```html
<script type="module">
  import { SequencerNodes, playSequence } from 'https://unpkg.com/tonejs-json-sequencer@1.0.0/dist/index.mjs';
</script>
```

## 基本的な使用例

```typescript
import * as Tone from 'tone';
import { SequencerNodes, playSequence } from 'tonejs-json-sequencer';

// JSONでシーケンスを定義
const sequence = [
  {
    eventType: 'createNode',
    nodeId: 0,
    nodeType: 'Synth',
    args: { oscillator: { type: 'sine' } }
  },
  {
    eventType: 'connect',
    nodeId: 0,
    connectTo: 'toDestination'
  },
  {
    eventType: 'triggerAttackRelease',
    nodeId: 0,
    args: ['C4', '8n', '0']
  },
  {
    eventType: 'triggerAttackRelease',
    nodeId: 0,
    args: ['E4', '8n', '0:0:2']
  },
  {
    eventType: 'triggerAttackRelease',
    nodeId: 0,
    args: ['G4', '8n', '0:1:0']
  }
];

// ノードマネージャを作成
const nodes = new SequencerNodes();

// シーケンスを再生
async function play() {
  await Tone.start();
  await playSequence(Tone, nodes, sequence);
}

// ボタンクリックに紐付け
document.getElementById('playButton').addEventListener('click', play);
```

## ブラウザでの使用例（CDN使用）

```html
<!DOCTYPE html>
<html>
<head>
  <title>Tonejs JSON Sequencer Example</title>
  <script src="https://cdn.jsdelivr.net/npm/tone@15.0.4/build/Tone.js"></script>
</head>
<body>
  <button id="playButton">Play</button>
  
  <script type="module">
    import { SequencerNodes, playSequence } from 'https://cdn.jsdelivr.net/npm/tonejs-json-sequencer@1.0.0/dist/index.mjs';

    const sequence = [
      {
        eventType: 'createNode',
        nodeId: 0,
        nodeType: 'Synth',
        args: { oscillator: { type: 'sine' } }
      },
      {
        eventType: 'connect',
        nodeId: 0,
        connectTo: 'toDestination'
      },
      {
        eventType: 'triggerAttackRelease',
        nodeId: 0,
        args: ['C4', '4n', '0']
      }
    ];

    const nodes = new SequencerNodes();

    document.getElementById('playButton').addEventListener('click', async () => {
      await Tone.start();
      await playSequence(Tone, nodes, sequence);
    });
  </script>
</body>
</html>
```

## dist/ ディレクトリの構造

`dist/` ディレクトリには以下のファイルが含まれています：

- `index.mjs` - ES Modules形式のエントリポイント
- `index.js` - CommonJS形式のエントリポイント
- `index.d.ts` - TypeScript型定義ファイル
- `esm/` - ES Modules形式のコンパイル済みファイル
- `cjs/` - CommonJS形式のコンパイル済みファイル

プロジェクトの要件に応じて、適切な形式のファイルを選択できます。

## サンプル

より詳細な使用例については、`examples/` ディレクトリを参照してください：

- `examples/cdn-example.html` - CDNを使用したブラウザでの使用例
- `examples/npm-example.mjs` - npmパッケージとしての使用例

## NDJSON ストリーミング

tonejs-json-sequencerは、リアルタイム再生、ライブ編集、ループ再生をサポートするNDJSON（改行区切りJSON）ストリーミングに対応しています。

### 機能

- **ライブ編集**: 再生中にシーケンスを編集可能 - 再起動なしでリアルタイムに変更が反映されます
- **ループ再生**: シーケンスが終了すると自動的にループします
- **50ms先読み**: イベントは50ms先にスケジュールされ、スムーズで正確な再生を実現します

### 基本的な使い方

```typescript
import * as Tone from 'tone';
import { SequencerNodes, NDJSONStreamingPlayer } from 'tonejs-json-sequencer';

// ノードマネージャーを作成
const nodes = new SequencerNodes();

// 設定付きでストリーミングプレーヤーを作成
const player = new NDJSONStreamingPlayer(Tone, nodes, {
  lookaheadMs: 50,    // 先読み時間（ミリ秒）
  loop: true,         // ループ再生を有効化
  onLoopComplete: () => {
    console.log('ループ完了！');
  }
});

// NDJSON文字列またはイベント配列で再生開始
const ndjson = `
{"eventType":"createNode","nodeId":0,"nodeType":"Synth"}
{"eventType":"connect","nodeId":0,"connectTo":"toDestination"}
{"eventType":"triggerAttackRelease","nodeId":0,"args":["C4","8n","0"]}
{"eventType":"triggerAttackRelease","nodeId":0,"args":["E4","8n","0:0:2"]}
`;

await Tone.start();
await player.start(ndjson);

// 再生中にシーケンスを更新（ライブ編集）
const updatedNdjson = `
{"eventType":"createNode","nodeId":0,"nodeType":"Synth"}
{"eventType":"connect","nodeId":0,"connectTo":"toDestination"}
{"eventType":"triggerAttackRelease","nodeId":0,"args":["G4","8n","0"]}
`;
await player.start(updatedNdjson);  // 停止せずに更新

// 再生を停止
player.stop();
```

### デモ

ライブ編集とループ再生の完全なインタラクティブデモについては、`streaming.html` を参照してください。

# Tone.js コンポーネントのJSON対応

tonejs-json-sequencerは、Tone.jsの主要なコンポーネントをJSONで記述できるようにします。

## 対応状況の概要

### 現在対応済み（✅）

- **Instrument**: Synth, MonoSynth, FMSynth, AMSynth, DuoSynth, MetalSynth, MembraneSynth, PluckSynth, NoiseSynth, PolySynth, Sampler
- **Effect**: Reverb, Freeverb, JCReverb, Chorus, Phaser, Tremolo, Vibrato, AutoFilter, AutoPanner, AutoWah, FeedbackDelay, PingPongDelay, Distortion, BitCrusher, Chebyshev, PitchShift, FrequencyShifter, StereoWidener

### 計画中（🚧）

- **Source**: FatOscillator, PulseOscillator
- **Effect**: EQ3（イコライザー）, Compressor（コンプレッサー）
- **奏法メソッド**: Panpot変更, Expression変更, LPF変更, Portamento

### 今後検討予定（⏳）

- **Source**: Oscillator, OmniOscillator, Noise, Player, GrainPlayer 他
- **Effect**: Filter系, Dynamics系（Limiter, Gate）, Spatial系（Convolver）他
- **Component**: Envelope系, LFO, Signal系, Analysis系（Meter, Analyser, FFT）他

## 詳細ドキュメント

全コンポーネントの詳細な対応状況、実装優先順位、実装方針については、以下のドキュメントを参照してください：

📄 [Tone.js コンポーネント JSON対応ロードマップ（詳細版）](docs/tonejs-components-roadmap.ja.md)

このドキュメントには以下の情報が含まれています：
- 全コンポーネントの分類と実装状況（Instrument / Source / Effect / Component）
- 実装の優先順位と計画
- 実装方針と進め方
- 参考資料へのリンク

# 未実装JSON Eventのロードマップ

このセクションでは、「Tone.jsで実現可能だが、まだJSON eventとして実装されていない機能」をリストアップしています。

## 現在実装済みのJSON Event

- `createNode` - シンセやエフェクトノードの作成
- `connect` - ノード同士の接続
- `triggerAttackRelease` - 音符の発音
- `depth.rampTo` - depthパラメータの滑らかな変更
- `volume.rampTo` - volumeパラメータの滑らかな変更
- `LFO` - 指定したパスのパラメータにLFOを作成してモジュレーションを開始
- `set` - グローバル設定（現在は `Transport.bpm.value` のみ対応）
- `loopEnd` - ストリーミング再生用の明示的なループ境界のマーク（メタデータイベント）

### LFO Event例

```json
{
  "eventType": "LFO",
  "nodeId": 1,
  "args": [
    { "frequency": "4n", "min": 0, "max": 10, "type": "sine" },
    "filter.Q",
    "0:0:0"
  ]
}
```

## 未実装機能リスト

### 高優先度：奏法表現に必要なJSON Event

これらは演奏表現に直接影響する重要な機能です。

#### Panpot（パン）制御 ⏳
- **概要**: ステレオ定位（L/R）をリアルタイムに変更
- **必要なJSON Event**:
  - `pan.rampTo` - パンの滑らかな変更
  - `pan.value` - パンの即座の変更
- **Tone.jsでの実現**: `PanVol` / `Panner` など `.pan` パラメータを持つ対応ノードを経由し、Param APIで制御
- **用途例**: シーケンスフレーズでL/Rを動的に変化させる

#### LPFカットオフ周波数とレゾナンス制御 ⏳
- **概要**: ローパスフィルターのカットオフ周波数とQ値をリアルタイムに変更
- **必要なJSON Event**:
  - `filter.frequency.rampTo` - カットオフ周波数の滑らかな変更
  - `filter.Q.rampTo` - レゾナンス（Q値）の滑らかな変更
  - `filter.frequency.value` - カットオフ周波数の即座の変更
  - `filter.Q.value` - レゾナンス（Q値）の即座の変更
- **Tone.jsでの実現**: MonoSynth等のフィルター付きシンセがサポート
- **用途例**: フレーズ中でフィルターを開閉、長いsweep、attack連動フィルタエンベロープ

#### ピッチ制御（Portamento/Pitch Envelope） ⏳
- **概要**: 音程を滑らかに変化させる
- **必要なJSON Event**:
  - `frequency.rampTo` - 周波数の滑らかな変更（ポルタメント）
  - `detune.rampTo` - デチューンの滑らかな変更（ピッチエンベロープ）
- **Tone.jsでの実現**: オシレーターとシンセのfrequency/detuneパラメータ
- **用途例**: ポルタメント、attack時のピッチエンベロープ（-200cent→0cent等）

#### Expression（表現力）制御 ⏳
- **概要**: ボリュームやその他のパラメータを動的に制御
- **必要なJSON Event**:
  - （短期）ボリューム等、主要パラメータごとの個別イベントを追加
  - （中長期）汎用的なパラメータアクセス機構
  - 例: `<nodeId>.<paramPath>.rampTo` 形式（※ `paramPath` 自体をホワイトリスト化し、対応パスを列挙する前提）
- **設計方針 / ロードマップ**:
  - switch-case による **ノードIDのホワイトリスト方式は継続** する
  - `<nodeId>.<paramPath>.rampTo` を導入する場合も、`paramPath` は任意文字列ではなく **事前定義されたパスのみ許可** する
  - まずは個別イベントを増やし、必要なパターンを洗い出したうえで、対応パスを列挙した汎用機構を検討する
- **Tone.jsでの実現**: すべてのParamオブジェクトがrampToをサポート
- **用途例**: フレーズ中でExpressionを増減、ダイナミクスの変化

### 中優先度：エフェクトパラメータ制御

#### リバーブパラメータ ⏳
- **必要なJSON Event**: `decay.rampTo`, `wet.rampTo` 等
- **用途**: リバーブの深さやルームサイズを動的に変更

#### コーラスパラメータ ⏳
- **必要なJSON Event**: `frequency.rampTo`, `depth.rampTo` (Chorus専用)
- **用途**: コーラスの速度や深さを動的に変更

#### ディレイパラメータ ⏳
- **必要なJSON Event**: `delayTime.rampTo`, `feedback.rampTo` 等
- **用途**: ディレイタイムやフィードバック量を動的に変更

#### フェイザーパラメータ ⏳
- **必要なJSON Event**: `frequency.rampTo`, `octaves.rampTo`, `Q.rampTo` 等
- **用途**: フェイザーの長いsweep、パッドへのモジュレーション

#### EQ（イコライザー）パラメータ ⏳
- **必要なJSON Event**: `low.rampTo`, `mid.rampTo`, `high.rampTo` 等
- **用途**: 周波数帯域ごとのレベル調整

#### コンプレッサーパラメータ ⏳
- **必要なJSON Event**: `threshold.rampTo`, `ratio.rampTo`, `attack.rampTo`, `release.rampTo` 等
- **用途**: ダイナミクス処理の動的な調整

### 低優先度：高度な機能

#### エンベロープ制御 ⏳
- **必要なJSON Event**: ADSR各パラメータへのアクセス
- **用途**: エンベロープ形状の動的な変更

#### LFOパラメータ ⏳
- **必要なJSON Event**: LFOの周波数、深さ、波形の制御
- **用途**: モジュレーションの動的な変更

#### 3Dパンニング ⏳
- **必要なJSON Event**: 3D空間でのポジショニング制御
- **用途**: 空間オーディオの実現

## 実装済み機能の確認

### Tempo（BPM）制御 ✅
- **実装状況**: ✅ **実装済み**
- **JSON Event**: `set` event with `nodeType: 'Transport.bpm.value'`
- **使用例**:
  ```json
  {
    "eventType": "set",
    "nodeId": 0,
    "nodeType": "Transport.bpm.value",
    "args": [120]
  }
  ```

### ディレイビブラート ✅
- **実装状況**: ✅ **実装済み**
- **実現方法**: `depth.rampTo` を使用

## 実装方針

1. **安全性優先**: `eval` 等は使用せず、switch-case によるホワイトリスト方式を継続
2. **段階的実装**: 高優先度の機能から順次実装
3. **ドッグフーディング**: 実装した機能は実際に使用して検証

## 参考情報

- 詳細なコンポーネント対応状況: [Tone.js コンポーネント JSON対応ロードマップ](docs/tonejs-components-roadmap.ja.md)
- Tone.js公式ドキュメント: https://tonejs.github.io/docs/

# ロードマップ
- ※順不同
- ※のち2種類に切り分けて、利用しやすさ優先で1つのtopicに絞ったシンプルなサンプルと、強みがわかりやすいよう複数topicを実用的にまとめたサンプル、がよさげ
- プログラム
  - 済 : NDJSON streamingとライブ編集、ループ再生（streaming.htmlを参照）
- 構造
  - 済 : マルチティンバー、FM Bassと、Saw Chord
- 奏法
  - 済 : ディレイビブラート
  - ピッチエンベロープで、attack時が-200cent、のち0centまで変化 ※attack連動ではなく、ディレイビブラートのように独立しているもの
  - Panpotをその場でLR変更するsequenceフレーズ
  - Expressionをその場で増減するフレーズ
  - LPFをその場で増減するフレーズ
- Effect
  - リバーブ
  - コーラス
  - ディレイ
  - フェイザー、シンセパッドに長いsweepをかける、無理なら無理な旨をtitle等に可視化する
  - EQ
  - コンプレッサー
- Lead
  - 済 : SuperSaw音色（FatOscillator）
  - Distortion、できればPluckでギター
  - Overdrive風のWaveShaper設定、できればPluckでギター
  - Chebyshevを使った過激なシンセリード
  - long decayで倍音変化のあるFMリード、ギラギラした典型的なFMリード、modulatorにpulse、carrierにもpulseを試す、無理なら無理な旨をtitle等に可視化する
  - アンビエント用lead、pulse音色、ランダムにかすかに揺らぐピッチ変化
  - クセのあるlead、attack連動ピッチエンベロープで、attack時が-200cent、のち0centまで変化
  - ポルタメントを常時かけたlead
- シーケンス音色
  - PulseOscillator音色で、12.5% pulse
  - PluckSynth音色で、アコースティックギターやharp
  - NoiseSynthにフィルターをかけて音程感のあるフレーズを鳴らす
- Drum
  - Tone.js内蔵のKick, Snare, Tom, Hi-Hat、909Kickが無理ならその旨title等に可視化する
- Pad
  - 済 : FatOscillatorで分厚いシンセパッド
  - FMエレピ
- Bass
  - 硬いFMベース
  - attack連動フィルタエンベロープを常時かけたシンセベース
  - Overdrive風のSawシンセベース、フィルタエンベロープつき、さらにフィルタがlong sweepで変化
- ほかTone.jsで音がわかりやすいサンプルでめぼしいのが見つかり次第追記する。現在みた限りでは上記で一段落。

# 開発メモ、随時更新
- tonejs-mml-to-jsonとの連携
  - 後回し。tonejs-json-sequencerの検証dataを整理してから、検討する
- NDJSON streaming
  - ステータス: ✅ **実装完了** （`streaming.html` と `src/ndjson-streaming.ts` を参照）
  - 実装した機能:
    - ライブ編集: textareaを編集したときは、再演奏ではなく、演奏を継続したまま、編集内容が反映される
    - ループ演奏: 末尾までいったら先頭から演奏
    - 50ms先読み: イベントは50ms先にスケジュールされ、スムーズに再生される
  - 実装の詳細:
    - `NDJSONStreamingPlayer` クラスが先読みタイミングでイベントを処理
    - `requestAnimationFrame` を使用した連続的なイベント処理
    - `parseNDJSON` 関数で配列とNDJSON文字列の両方に対応
    - `streaming.html` に独立したデモと専用のソースファイルを配置
- Tone.Transport.schedule はまだ使わない
  - 試しにagentにcode生成させたところ、複雑なcodeが生成された割に、発音の不自然さの改善が確認できなかった
  - 時期尚早である、test dataが揃ってからがよい、と判断する
  - 今後の展望
    - 上位レイヤー(tonejs-mml-to-json)を実装する
    - test dataを作成する
      - 明らかにリズムがヨレることがわかるJSON
        - 例、アルペジオ、chord、bassによるハイテンポなフレーズ
    - 以下を実施する
      - そのJSONをtonejs-json-sequencerで演奏し、ヨレることを確認する
      - Tone.Transport.schedule を実装し、ヨレ改善をtestする
      - 実績のある、postmate-midiで成功している方法を実装してtestする：
        - JSONの時刻記述を上位レイヤーで加工して実時間指定にし、NDJSON streamingで演奏する
        - 前述のとおり+50msec未来を指定する

# 検討中の課題
- 課題、手でswitch caseを書いていくのが手間
  - 方針、switch caseで実際に関数呼び出しを書く、のが安全でシンプルなので、基本的にこれでいくつもり
    - 懸念、ただし今後switch caseが大きくなったとき、軽量ライブラリというコンセプトなのに通信速度がかかりすぎる懸念はある
      - 想定、なのでホワイトリストにある関数名だけを使う仕組みも選択肢に入れておく、ただし複雑になりセキュリティのミスのリスクは増える
        - 後回し、これは非機能要件なので、ドッグフーディングして「遅すぎる」となってからの検討のほうがよい
  - 分析、生成でswitch caseをagentに書かせるにはcontext不足
    - 例、生成で depth.rampTo などが網羅できるか不明
    - 例、depth.rampTo は現状でよいか、ほかの奏法や音色でのメソッドチェーンはどういったものがあるかは、ドッグフーディングが必要
    - 想定、仮に生成ですべて網羅が書けたとして、test red時に調査が手間（ソースコードが膨大になるので）
  - 対策、実装方針はこのままとし、ドッグフーディングを進める
- 音色ライブラリの検討
  - ※そのうち、tonejs-mml-to-json同様に、別projectの案として切り出すかも
  - これまでの課題
    - Tone.jsは、実際に使いこなすとどれくらいの音まで出せるか？の潜在能力がよくわからない
      - 使いこなす、とは、ここでは、外付け波形（サウンドフォント等）や外付けAudioWorkletなし、ローコストな実装の範囲で、としておく
      - 例えばSawやSquareは、実際に出せる音色キャラクター、高音域のエリアシングノイズ有無、FM接続にどれくらい有用か、などが未調査でまだわからない
        - 参考までにChatGPTにきいたところ（裏は取ってないので注意）、Tone.jsはnode生成時に波形テーブルを1loopぶん生成する方式で、高周波でナイキスト周波数まわりでエリアシングノイズは出るらしい
      - 例えばFMは、
        - 位相変調方式ではなく周波数変調方式でfeedbackもないので、
        - 位相変調系の音色やFeedback系の音色が出せないが、
        - モジュレータとキャリアにどんな波形を使えてどんな音色が出せるか？の潜在能力は、未調査なのでまだわからない
      - 例えばSuperSawは、
        - どれくらいエフェクトなどの追加の作り込みをすると、
        - どれくらい実用的な典型的なSuperSawになるか？
        - のロードマップやワークフローがもっと見えたほうがよさげ
      - 例えば1loopが64サンプル、8bitの波形、を作ろうにも、Tone.jsやWeb Audioの仕組み上そのインターフェイスがなく、おそらくフーリエ変換してpartialsパラメータを生成するくらいしか方法がない（それ以上がほしいなら外付け波形や外付けAudioWorkletしかない）、ようだが、
        - 実際そうなのかは、未調査なのでまだわからない
      - 例えばリバーブ / コーラス / フランジャー / フェイザーは、例えば最低限SC-88Proくらいのレベルが実現できるのか？が、調査不足でまだわからない
      - 例えばDistortion系は、Overdrive系も含め最低限SC-88Proくらいのレベルが実現できるのか？が、調査不足でまだわからない
      - 用途が「割り切って使う。教育用、実験用」なので、豪華な音が出せないのはそれほど致命的ではない。
        - 重要なのは、「どこまで出せるか？スイートスポットはどこか？」が見えたほうが、よりスムーズに音楽活動ができる、という点
        - 補足すると、Tone.jsやWebAudioの立ち位置は楽器寄りではなく簡易的な信号処理寄りで、それを把握した上で、では割り切ってローコストに楽器的なことをやるならどれくらいできるか？という観点もある
        - ここでいうローコストは「tonejs-json-sequencerのような技術スタックやエコシステムの土壌が豊かになっていけば、今後、巨人の肩の上に立ち、ローコストに開発ができるか？」といった意味
        - なお選択肢としてはTone.jsが総合力で優れている認識
        - つまり、無料OSSマルチプラットフォームな音楽活動の場としてブラウザを選んだとき、総合力でTone.jsが優れている認識
  - 対策
    - 音色ライブラリ共有がeasyにできるようになれば、
      - ローコストな手法で発揮できる潜在能力はこれくらい
      - が可視化しやすくなる
  - イメージ
    - こんな音色が作れます、こんなエフェクトがかけられます、組み合わせると、これくらい実用的なサウンドができます、などの事例を共有する
  - 音色ライブラリのメリット
    - Tone.jsのエコシステムの土壌になることが期待できる
        - これまでの課題として、userそれぞれのアウトプットの再利用性がない、という点がある
        - userそれぞれのアウトプットを、共有・連携する土壌ができれば、それが蓄積されることで、次世代のuserが巨人の肩の上に立てることが期待できる
          - 音色に限らず、Web Audio全般の話でもある
  - 音色ライブラリの位置するレイヤーの検討
    - tonejs-json-sequencerには組み込まず、
    - その上位レイヤー、別project、で用意する
  - 音色ライブラリにどれくらい注力するか？
    - 検討中
    - 音色ライブラリと音色エディタそれぞれ充実していると、エコシステムが育ちやすそう
    - tonejs-json-sequencerに最低限の機能を作っていく優先度は高い
      - tonejs-json-sequencerに機能があること、が上位レイヤーの前提なので
- whyに関連、DAWとの棲み分け
  - DAW
    - 楽曲の完成度を優先するとき用
    - 作編曲の効率を最大化するとき用
    - ハイクオリティな曲が素早く作れる！実用性最強！
    - 求められるアプリ非機能要件は、低遅延、音途切れなし。高性能マシンを使うことも前提。
  - tonejs-json-sequencer
    - ※あるいはブラウザ、WebAudio、Tone.js、マルチプラットフォームの非DAW的な音楽アプリ全般
    - 実験用
      - 新たなUI
      - 新たなサウンド、音色、楽曲を、新たな手法で
    - 新規体験
      - 作曲のヒントになるインスピレーション
    - インタラクティブな体験
      - 例、教育用の音楽おもちゃ
    - 求められる非機能要件は、なし。
      - 機能の実現が素早いとよい
      - マルチプラットフォームであるとよい

# 優先すること
- 効果のわかりやすいものの実装。例えばディレイビブラート、マルチティンバー。
- 安全。セキュリティ。インジェクション対策。eval等を使わない。

# スコープ外
- nodeIdの採番 → 上位レイヤー側で担当します、例えばtonejs-mml-to-jsonか、それより低いレイヤーのjsonポストプロセッサで担当します
- ディレイビブラートのonとoffを全noteに生成 → nodeIdの採番と同様です
- ほか、json内のデータの加工 → nodeIdの採番と同様です
- 網羅。Tone.jsの全てのclassとmethodとメソッドチェーンの組み合わせを完全に網羅し、Tone.jsで実現できる全てのパターンの関数呼び出しをJSON経由で完全に網羅すること
- 高性能。処理時間やソースファイルのサイズを最小化するため、メンテしづらいロジックを選ぶこと

# 自動英訳
README.md は README.ja.md を元にGeminiの翻訳でGitHub Actionsで自動生成しています。

Last updated: 2026-01-17


# プロジェクト概要生成プロンプト（来訪者向け）

## 生成するもの：
- projectを3行で要約する
- プロジェクトで使用されている技術スタックをカテゴリ別に整理して説明する
- プロジェクト全体のファイル階層ツリー（ディレクトリ構造を図解）
- プロジェクト全体のファイルそれぞれの説明
- プロジェクト全体の関数それぞれの説明
- プロジェクト全体の関数の呼び出し階層ツリー

## 生成しないもの：
- Issues情報（開発者向け情報のため）
- 次の一手候補（開発者向け情報のため）
- ハルシネーションしそうなもの（例、存在しない機能や計画を勝手に妄想する等）

## 出力フォーマット：
以下のMarkdown形式で出力してください：

```markdown
# Project Overview

## プロジェクト概要
[以下の形式で3行でプロジェクトを要約]
- [1行目の説明]
- [2行目の説明]
- [3行目の説明]

## 技術スタック
[使用している技術をカテゴリ別に整理して説明]
- フロントエンド: [フロントエンド技術とその説明]
- 音楽・オーディオ: [音楽・オーディオ関連技術とその説明]
- 開発ツール: [開発支援ツールとその説明]
- テスト: [テスト関連技術とその説明]
- ビルドツール: [ビルド・パース関連技術とその説明]
- 言語機能: [言語仕様・機能とその説明]
- 自動化・CI/CD: [自動化・継続的統合関連技術とその説明]
- 開発標準: [コード品質・統一ルール関連技術とその説明]

## ファイル階層ツリー
```
[プロジェクトのディレクトリ構造をツリー形式で表現]
```

## ファイル詳細説明
[各ファイルの役割と機能を詳細に説明]

## 関数詳細説明
[各関数の役割、引数、戻り値、機能を詳細に説明]

## 関数呼び出し階層ツリー
```
[関数間の呼び出し関係をツリー形式で表現]
```
```


以下のプロジェクト情報を参考にして要約を生成してください：

## プロジェクト情報
名前: tonejs-json-sequencer
説明: # tonejs-json-sequencer

<p align="left">
  <a href="README.ja.md"><img src="https://img.shields.io/badge/🇯🇵-Japanese-red.svg" alt="Japanese"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/🇺🇸-English-blue.svg" alt="English"></a>
</p>

[Demo](https://cat2151.github.io/tonejs-json-sequencer/demo/index.html)

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

# ロードマップ
- ※順不同
- ※のち2種類に切り分けて、利用しやすさ優先で1つのtopicに絞ったシンプルなサンプルと、強みがわかりやすいよう複数topicを実用的にまとめたサンプル、がよさげ
- プログラム
  - NDJSON streaming、内容は後述
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
  - 実現したいこと
    - ライブ編集、textareaを編集したときは、再演奏ではなく、演奏を継続したまま、編集内容が反映される
    - ループ演奏、末尾までいったら先頭から演奏
  - 方法
    - 今から50msec後までに演奏されるもの、をNDJSON streaming
    - playボタンを開始した時刻の50msec後を0tick とし、以降、sequencer部でevent発生時刻を+50msecする加工を行う。ループ時はさらに加算
    - 別htmlの別srcに切り分ける想定
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


依存関係:
{
  "dependencies": {},
  "devDependencies": {
    "@types/node": "^20.10.0",
    "tone": "^15.0.4",
    "typescript": "^5.3.0"
  }
}

## ファイル階層ツリー
📄 .editorconfig
📄 .gitignore
📖 CONVERSION_SUMMARY.md
📖 EXTRACTION_PROCESS.md
📄 LICENSE
📖 NEW_STRUCTURE.md
📖 NPM_README.md
📖 README.ja.md
📖 README.md
📖 REFACTORING_SUMMARY.md
📖 RELEASE.ja.md
📖 RELEASE.md
📄 _config.yml
📁 demo/
  🌐 index.html
  🎨 styles.css
📁 dist/
  📁 cjs/
    📘 event-scheduler.d.ts
    📜 event-scheduler.js
    📘 index.d.ts
    📜 index.js
    📘 node-factory.d.ts
    📜 node-factory.js
    📘 sequencer-nodes.d.ts
    📜 sequencer-nodes.js
    📘 types.d.ts
    📜 types.js
  📁 demo/
    📜 demo-types.js
    📁 effect/
      📜 autofilter.js
      📜 autopanner.js
      📜 autowah.js
      📜 bitcrusher.js
      📜 chebyshev.js
      📜 chorus.js
      📜 distortion.js
      📜 feedbackdelay.js
      📜 freeverb.js
      📜 frequencyshifter.js
      📜 jcreverb.js
      📜 phaser.js
      📜 pingpongdelay.js
      📜 pitchshift.js
      📜 reverb.js
      📜 stereowidener.js
      📜 tremolo.js
      📜 vibrato.js
    📁 instrument/
      📜 amsynth.js
      📜 delay-vibrato.js
      📜 duosynth.js
      📜 membranesynth.js
      📜 metalsynth.js
      📜 minimal.js
      📜 monosynth.js
      📜 multitimbral.js
      📜 noisesynth.js
      📜 plucksynth.js
      📜 polysynth-fm.js
      📜 sampler-piano.js
      📜 supersaw.js
    📜 main.js
    📁 modules/
      📜 audioManager.js
      📜 uiManager.js
    📜 sequenceLoader.js
    📁 sequences/
      📜 basicSequences.js
      📜 effectSequences.js
      📜 synthSequences.js
  📁 esm/
    📘 event-scheduler.d.ts
    📄 event-scheduler.mjs
    📘 index.d.ts
    📄 index.mjs
    📘 node-factory.d.ts
    📄 node-factory.mjs
    📘 sequencer-nodes.d.ts
    📄 sequencer-nodes.mjs
    📘 types.d.ts
    📄 types.mjs
  📘 index.d.ts
  📜 index.js
  📄 index.mjs
📁 docs/
  📖 tonejs-components-roadmap.ja.md
  📖 tonejs-components-roadmap.md
📁 examples/
  🌐 cdn-example.html
  📄 npm-example.mjs
📁 generated-docs/
  🌐 callgraph.html
🌐 googled947dc864c270e07.html
🌐 index.html
📁 issue-notes/
  📖 1.md
  📖 11.md
  📖 12.md
  📖 14.md
  📖 15.md
  📖 17.md
  📖 19.md
  📖 2.md
  📖 21.md
  📖 23.md
  📖 25.md
  📖 27.md
  📖 29.md
  📖 3.md
  📖 31.md
  📖 32.md
  📖 34.md
  📖 36.md
  📖 38.md
  📖 4.md
  📖 40.md
  📖 41.md
  📖 44.md
  📖 5.md
  📖 7.md
  📖 9.md
📊 package-lock.json
📊 package.json
📁 scripts/
  📜 copy-to-dist.js
  📜 rename-to-mjs.js
📁 src/
  📁 demo/
    📘 demo-types.ts
    📁 effect/
      📘 autofilter.ts
      📘 autopanner.ts
      📘 autowah.ts
      📘 bitcrusher.ts
      📘 chebyshev.ts
      📘 chorus.ts
      📘 distortion.ts
      📘 feedbackdelay.ts
      📘 freeverb.ts
      📘 frequencyshifter.ts
      📘 jcreverb.ts
      📘 phaser.ts
      📘 pingpongdelay.ts
      📘 pitchshift.ts
      📘 reverb.ts
      📘 stereowidener.ts
      📘 tremolo.ts
      📘 vibrato.ts
    📁 instrument/
      📘 amsynth.ts
      📘 delay-vibrato.ts
      📘 duosynth.ts
      📘 membranesynth.ts
      📘 metalsynth.ts
      📘 minimal.ts
      📘 monosynth.ts
      📘 multitimbral.ts
      📘 noisesynth.ts
      📘 plucksynth.ts
      📘 polysynth-fm.ts
      📘 sampler-piano.ts
      📘 supersaw.ts
    📘 main.ts
    📁 modules/
      📘 audioManager.ts
      📘 uiManager.ts
    📘 sequenceLoader.ts
    📁 sequences/
      📘 basicSequences.ts
      📘 effectSequences.ts
      📘 synthSequences.ts
    📘 tone-global.d.ts
  📘 event-scheduler.ts
  📘 index.ts
  📘 node-factory.ts
  📘 sequencer-nodes.ts
  📘 types.ts
📊 tsconfig.all.json
📊 tsconfig.demo-new.json
📊 tsconfig.json

## ファイル詳細分析
**demo/index.html** (23行, 638バイト)
  - 関数: なし
  - インポート: なし

**demo/styles.css** (176行, 3642バイト)
  - 関数: なし
  - インポート: なし

**dist/cjs/event-scheduler.d.ts** (18行, 710バイト)
  - 関数: scheduleOrExecuteEvent, playSequence
  - インポート: tone, ./types.js, ./sequencer-nodes.js

**dist/cjs/event-scheduler.js** (80行, 2795バイト)
  - 関数: scheduleOrExecuteEvent, playSequence, switch, if, forEach, catch
  - インポート: ./node-factory.js

**dist/cjs/index.d.ts** (4行, 257バイト)
  - 関数: なし
  - インポート: なし

**dist/cjs/index.js** (14行, 902バイト)
  - 関数: defineProperty
  - インポート: ./sequencer-nodes.js, ./event-scheduler.js

**dist/cjs/node-factory.d.ts** (12行, 478バイト)
  - 関数: createNode, connectNode
  - インポート: tone, ./types.js, ./sequencer-nodes.js

**dist/cjs/node-factory.js** (192行, 7640バイト)
  - 関数: createNode, connectNode, switch, if
  - インポート: なし

**dist/cjs/sequencer-nodes.d.ts** (10行, 206バイト)
  - 関数: なし
  - インポート: なし

**dist/cjs/sequencer-nodes.js** (35行, 909バイト)
  - 関数: constructor, get, set, disposeAll, forEach, catch
  - インポート: なし

**dist/cjs/types.d.ts** (23行, 587バイト)
  - 関数: なし
  - インポート: なし

**dist/cjs/types.js** (6行, 219バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/demo-types.js** (5行, 186バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/effect/autofilter.js** (40行, 823バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/effect/autopanner.js** (40行, 823バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/effect/autowah.js** (45行, 942バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/effect/bitcrusher.js** (45行, 939バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/effect/chebyshev.js** (45行, 939バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/effect/chorus.js** (45行, 942バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/effect/distortion.js** (45行, 942バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/effect/feedbackdelay.js** (45行, 954バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/effect/freeverb.js** (45行, 943バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/effect/frequencyshifter.js** (40行, 836バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/effect/jcreverb.js** (45行, 937バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/effect/phaser.js** (45行, 942バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/effect/pingpongdelay.js** (45行, 954バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/effect/pitchshift.js** (45行, 940バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/effect/reverb.js** (45行, 931バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/effect/stereowidener.js** (45行, 948バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/effect/tremolo.js** (40行, 823バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/effect/vibrato.js** (40行, 822バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/instrument/amsynth.js** (55行, 1275バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/instrument/delay-vibrato.js** (67行, 1510バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/instrument/duosynth.js** (60行, 1453バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/instrument/membranesynth.js** (47行, 1068バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/instrument/metalsynth.js** (46行, 1051バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/instrument/minimal.js** (19行, 373バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/instrument/monosynth.js** (45行, 1000バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/instrument/multitimbral.js** (56行, 1235バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/instrument/noisesynth.js** (44行, 939バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/instrument/plucksynth.js** (39行, 851バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/instrument/polysynth-fm.js** (59行, 1472バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/instrument/sampler-piano.js** (43行, 1126バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/instrument/supersaw.js** (52行, 1212バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/main.js** (71行, 2649バイト)
  - 関数: constructor, initialize, initializeSequenceDataCollection, updateTextareaWithSelectedSequence, if, playWithAudioContext, catch, play
  - インポート: ./sequenceLoader.js, ./modules/uiManager.js, ./modules/audioManager.js

**dist/demo/modules/audioManager.js** (64行, 2484バイト)
  - 関数: constructor, playSequence, if, catch, ensureAudioContextStarted
  - インポート: ../../../dist/index.mjs

**dist/demo/modules/uiManager.js** (46行, 1637バイト)
  - 関数: constructor, setupEventListeners, populateSequenceSelector, getTextareaValue, setTextareaValue, getSelectedSequenceName
  - インポート: なし

**dist/demo/sequenceLoader.js** (76行, 2501バイト)
  - 関数: loadAllSequences
  - インポート: ./instrument/minimal.js, ./instrument/delay-vibrato.js, ./instrument/multitimbral.js

**dist/demo/sequences/basicSequences.js** (245行, 7252バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/sequences/effectSequences.js** (807行, 22224バイト)
  - 関数: なし
  - インポート: なし

**dist/demo/sequences/synthSequences.js** (407行, 12117バイト)
  - 関数: なし
  - インポート: なし

**dist/esm/event-scheduler.d.ts** (18行, 710バイト)
  - 関数: scheduleOrExecuteEvent, playSequence
  - インポート: tone, ./types.js, ./sequencer-nodes.js

**dist/esm/index.d.ts** (4行, 257バイト)
  - 関数: なし
  - インポート: なし

**dist/esm/node-factory.d.ts** (12行, 478バイト)
  - 関数: createNode, connectNode
  - インポート: tone, ./types.js, ./sequencer-nodes.js

**dist/esm/sequencer-nodes.d.ts** (10行, 206バイト)
  - 関数: なし
  - インポート: なし

**dist/esm/types.d.ts** (23行, 587バイト)
  - 関数: なし
  - インポート: なし

**dist/index.d.ts** (4行, 257バイト)
  - 関数: なし
  - インポート: なし

**dist/index.js** (14行, 902バイト)
  - 関数: defineProperty
  - インポート: ./sequencer-nodes.js, ./event-scheduler.js

**examples/cdn-example.html** (105行, 2646バイト)
  - 関数: なし
  - インポート: なし

**generated-docs/callgraph.html** (280行, 8444バイト)
  - 関数: なし
  - インポート: なし

**googled947dc864c270e07.html** (1行, 53バイト)
  - 関数: なし
  - インポート: なし

**index.html** (11行, 214バイト)
  - 関数: なし
  - インポート: なし

**scripts/copy-to-dist.js** (31行, 936バイト)
  - 関数: catch
  - インポート: fs, path

**scripts/rename-to-mjs.js** (97行, 3130バイト)
  - 関数: renameFiles, updateImports, catch, if
  - インポート: fs, path

**src/demo/demo-types.ts** (31行, 741バイト)
  - 関数: なし
  - インポート: なし

**src/demo/effect/autofilter.ts** (44行, 947バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/effect/autopanner.ts** (44行, 947バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/effect/autowah.ts** (49行, 1067バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/effect/bitcrusher.ts** (49行, 1067バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/effect/chebyshev.ts** (49行, 1066バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/effect/chorus.ts** (49行, 1066バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/effect/distortion.ts** (49行, 1070バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/effect/feedbackdelay.ts** (49行, 1085バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/effect/freeverb.ts** (49行, 1069バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/effect/frequencyshifter.ts** (44行, 966バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/effect/jcreverb.ts** (49行, 1063バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/effect/phaser.ts** (49行, 1066バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/effect/pingpongdelay.ts** (49行, 1085バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/effect/pitchshift.ts** (49行, 1068バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/effect/reverb.ts** (49行, 1055バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/effect/stereowidener.ts** (49行, 1079バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/effect/tremolo.ts** (44行, 944バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/effect/vibrato.ts** (44行, 943バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/instrument/amsynth.ts** (59行, 1334バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/instrument/delay-vibrato.ts** (71行, 1595バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/instrument/duosynth.ts** (64行, 1467バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/instrument/membranesynth.ts** (51行, 1159バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/instrument/metalsynth.ts** (50行, 1145バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/instrument/minimal.ts** (23行, 475バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/instrument/monosynth.ts** (49行, 1091バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/instrument/multitimbral.ts** (60行, 1340バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/instrument/noisesynth.ts** (48行, 1035バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/instrument/plucksynth.ts** (43行, 965バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/instrument/polysynth-fm.ts** (63行, 1496バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/instrument/sampler-piano.ts** (47行, 1229バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/instrument/supersaw.ts** (56行, 1284バイト)
  - 関数: なし
  - インポート: ../demo-types.js

**src/demo/main.ts** (91行, 2895バイト)
  - 関数: constructor, if, catch, initialize, playWithAudioContext, play
  - インポート: ./demo-types.js, ./sequenceLoader.js, ./modules/uiManager.js

**src/demo/modules/audioManager.ts** (68行, 2299バイト)
  - 関数: if, catch, playSequence, ensureAudioContextStarted
  - インポート: ../demo-types.js, ../../../dist/index.mjs

**src/demo/modules/uiManager.ts** (62行, 1871バイト)
  - 関数: なし
  - インポート: ../sequenceLoader.js

**src/demo/sequenceLoader.ts** (87行, 2636バイト)
  - 関数: loadAllSequences
  - インポート: ./demo-types.js, ./instrument/minimal.js, ./instrument/delay-vibrato.js

**src/demo/sequences/basicSequences.ts** (250行, 5596バイト)
  - 関数: なし
  - インポート: ../demo-types.js, ../sequenceLoader.js

**src/demo/sequences/effectSequences.ts** (812行, 16954バイト)
  - 関数: なし
  - インポート: ../demo-types.js, ../sequenceLoader.js

**src/demo/sequences/synthSequences.ts** (412行, 9064バイト)
  - 関数: なし
  - インポート: ../demo-types.js, ../sequenceLoader.js

**src/demo/tone-global.d.ts** (9行, 166バイト)
  - 関数: なし
  - インポート: tone

**src/event-scheduler.ts** (89行, 2607バイト)
  - 関数: scheduleOrExecuteEvent, playSequence, switch, if, forEach, catch
  - インポート: tone, ./types.js, ./sequencer-nodes.js

**src/index.ts** (19行, 487バイト)
  - 関数: なし
  - インポート: なし

**src/node-factory.ts** (192行, 6714バイト)
  - 関数: createNode, connectNode, switch, if
  - インポート: tone, ./types.js, ./sequencer-nodes.js

**src/sequencer-nodes.ts** (32行, 681バイト)
  - 関数: forEach, catch
  - インポート: なし

**src/types.ts** (36行, 858バイト)
  - 関数: なし
  - インポート: なし

## 関数呼び出し階層
- switch (dist/cjs/event-scheduler.js)
  - scheduleOrExecuteEvent (dist/cjs/event-scheduler.d.ts)
    - playSequence ()
      - forEach ()
      - defineProperty ()
      - get ()
      - disposeAll ()
      - ensureAudioContextStarted ()
      - createNode (dist/cjs/node-factory.d.ts)
      - connectNode ()
  - set ()
- if (dist/cjs/event-scheduler.js)
  - renameFiles (scripts/rename-to-mjs.js)
    - updateImports ()
- catch (dist/cjs/event-scheduler.js)
- loadAllSequences (dist/demo/sequenceLoader.js)


## プロジェクト構造（ファイル一覧）
CONVERSION_SUMMARY.md
EXTRACTION_PROCESS.md
NEW_STRUCTURE.md
NPM_README.md
README.ja.md
README.md
REFACTORING_SUMMARY.md
RELEASE.ja.md
RELEASE.md
demo/index.html
demo/styles.css
dist/cjs/event-scheduler.d.ts
dist/cjs/event-scheduler.js
dist/cjs/index.d.ts
dist/cjs/index.js
dist/cjs/node-factory.d.ts
dist/cjs/node-factory.js
dist/cjs/sequencer-nodes.d.ts
dist/cjs/sequencer-nodes.js
dist/cjs/types.d.ts
dist/cjs/types.js
dist/demo/demo-types.js
dist/demo/effect/autofilter.js
dist/demo/effect/autopanner.js
dist/demo/effect/autowah.js
dist/demo/effect/bitcrusher.js
dist/demo/effect/chebyshev.js
dist/demo/effect/chorus.js
dist/demo/effect/distortion.js
dist/demo/effect/feedbackdelay.js
dist/demo/instrument/amsynth.js
dist/demo/main.js
dist/esm/event-scheduler.d.ts
dist/index.d.ts
docs/tonejs-components-roadmap.ja.md
examples/cdn-example.html
generated-docs/callgraph.html
googled947dc864c270e07.html

上記の情報を基に、プロンプトで指定された形式でプロジェクト概要を生成してください。
特に以下の点を重視してください：
- 技術スタックは各カテゴリごとに整理して説明
- ファイル階層ツリーは提供された構造をそのまま使用
- ファイルの説明は各ファイルの実際の内容と機能に基づく
- 関数の説明は実際に検出された関数の役割に基づく
- 関数呼び出し階層は実際の呼び出し関係に基づく


---
Generated at: 2026-01-17 07:09:01 JST

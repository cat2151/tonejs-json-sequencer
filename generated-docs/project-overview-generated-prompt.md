Last updated: 2026-01-11


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

[日本語 README](README.ja.md) / [English README](README.md)

[Demo](https://cat2151.github.io/tonejs-json-sequencer/src/index.html)

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
📄 LICENSE
📖 NPM_README.md
📖 README.ja.md
📖 README.md
📖 RELEASE.ja.md
📖 RELEASE.md
📄 _config.yml
📁 dist/
  📁 cjs/
    📘 index.d.ts
    📜 index.js
  📁 esm/
    📘 index.d.ts
    📄 index.mjs
  📘 index.d.ts
  📜 index.js
  📄 index.mjs
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
  📖 2.md
  📖 3.md
  📖 4.md
  📖 5.md
  📖 7.md
  📖 9.md
📊 package-lock.json
📊 package.json
📁 scripts/
  📜 copy-to-dist.js
  📜 rename-to-mjs.js
📁 src/
  🌐 index.html
  📜 main.js
  📜 play.js
  🎨 redirect.css
  📜 sampleData.js
  📜 scheduleOrExecuteEvent.js
  🎨 styles.css
📁 src-ts/
  📘 index.ts
📊 tsconfig.json

## ファイル詳細分析
**dist/cjs/index.d.ts** (47行, 1394バイト)
  - 関数: scheduleOrExecuteEvent, playSequence
  - インポート: tone

**dist/cjs/index.js** (236行, 8135バイト)
  - 関数: scheduleOrExecuteEvent, createNode, connectNode, playSequence, constructor, get, set, disposeAll, forEach, catch, switch, if
  - インポート: なし

**dist/esm/index.d.ts** (47行, 1394バイト)
  - 関数: scheduleOrExecuteEvent, playSequence
  - インポート: tone

**dist/index.d.ts** (47行, 1394バイト)
  - 関数: scheduleOrExecuteEvent, playSequence
  - インポート: tone

**dist/index.js** (236行, 8135バイト)
  - 関数: scheduleOrExecuteEvent, createNode, connectNode, playSequence, constructor, get, set, disposeAll, forEach, catch, switch, if
  - インポート: なし

**examples/cdn-example.html** (105行, 2646バイト)
  - 関数: なし
  - インポート: なし

**generated-docs/callgraph.html** (280行, 8444バイト)
  - 関数: なし
  - インポート: なし

**googled947dc864c270e07.html** (1行, 53バイト)
  - 関数: なし
  - インポート: なし

**index.html** (12行, 266バイト)
  - 関数: なし
  - インポート: なし

**scripts/copy-to-dist.js** (31行, 936バイト)
  - 関数: catch
  - インポート: fs, path

**scripts/rename-to-mjs.js** (48行, 1267バイト)
  - 関数: renameFiles, catch
  - インポート: fs, path

**src/index.html** (26行, 737バイト)
  - 関数: なし
  - インポート: なし

**src/main.js** (59行, 1723バイト)
  - 関数: initializeSequenceDataCollection, populateSequenceSelector, updateTextareaWithSelectedSequence
  - インポート: なし

**src/play.js** (76行, 2100バイト)
  - 関数: playWithAudioContext, play, if, catch, forEach
  - インポート: なし

**src/redirect.css** (70行, 1518バイト)
  - 関数: なし
  - インポート: なし

**src/sampleData.js** (248行, 5462バイト)
  - 関数: なし
  - インポート: なし

**src/scheduleOrExecuteEvent.js** (123行, 4248バイト)
  - 関数: scheduleOrExecuteEvent, switch, if
  - インポート: なし

**src/styles.css** (176行, 3642バイト)
  - 関数: なし
  - インポート: なし

**src-ts/index.ts** (279行, 7949バイト)
  - 関数: scheduleOrExecuteEvent, createNode, connectNode, playSequence, forEach, catch, switch, if
  - インポート: tone

## 関数呼び出し階層
- catch (scripts/copy-to-dist.js)
  - forEach ()
    - scheduleOrExecuteEvent (dist/cjs/index.d.ts)
      - playSequence ()
      - get ()
      - set ()
      - disposeAll ()
      - createNode ()
      - connectNode ()
      - constructor (undefined)
    - playWithAudioContext ()
      - play ()
  - renameFiles (scripts/rename-to-mjs.js)
- if (src/play.js)
- switch (src/scheduleOrExecuteEvent.js)


## プロジェクト構造（ファイル一覧）
CONVERSION_SUMMARY.md
NPM_README.md
README.ja.md
README.md
RELEASE.ja.md
RELEASE.md
dist/cjs/index.d.ts
dist/cjs/index.js
dist/esm/index.d.ts
dist/index.d.ts
dist/index.js
examples/cdn-example.html
generated-docs/callgraph.html
googled947dc864c270e07.html
index.html
issue-notes/1.md
issue-notes/11.md
issue-notes/12.md
issue-notes/14.md
issue-notes/15.md
issue-notes/2.md
issue-notes/3.md
issue-notes/4.md
issue-notes/5.md
issue-notes/7.md
issue-notes/9.md
package-lock.json
package.json
scripts/copy-to-dist.js
scripts/rename-to-mjs.js
src/index.html
src-ts/index.ts
tsconfig.json

上記の情報を基に、プロンプトで指定された形式でプロジェクト概要を生成してください。
特に以下の点を重視してください：
- 技術スタックは各カテゴリごとに整理して説明
- ファイル階層ツリーは提供された構造をそのまま使用
- ファイルの説明は各ファイルの実際の内容と機能に基づく
- 関数の説明は実際に検出された関数の役割に基づく
- 関数呼び出し階層は実際の呼び出し関係に基づく


---
Generated at: 2026-01-11 07:08:07 JST

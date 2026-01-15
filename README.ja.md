# tonejs-json-sequencer

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

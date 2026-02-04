Last updated: 2026-02-05

# 開発状況生成プロンプト（開発者向け）

## 生成するもの：
- 現在openされているissuesを3行で要約する
- 次の一手の候補を3つlistする
- 次の一手の候補3つそれぞれについて、極力小さく分解して、その最初の小さな一歩を書く

## 生成しないもの：
- 「今日のissue目標」などuserに提案するもの
  - ハルシネーションの温床なので生成しない
- ハルシネーションしそうなものは生成しない（例、無価値なtaskや新issueを勝手に妄想してそれをuserに提案する等）
- プロジェクト構造情報（来訪者向け情報のため、別ファイルで管理）

## 「Agent実行プロンプト」生成ガイドライン：
「Agent実行プロンプト」作成時は以下の要素を必ず含めてください：

### 必須要素
1. **対象ファイル**: 分析/編集する具体的なファイルパス
2. **実行内容**: 具体的な分析や変更内容（「分析してください」ではなく「XXXファイルのYYY機能を分析し、ZZZの観点でmarkdown形式で出力してください」）
3. **確認事項**: 変更前に確認すべき依存関係や制約
4. **期待する出力**: markdown形式での結果や、具体的なファイル変更

### Agent実行プロンプト例

**良い例（上記「必須要素」4項目を含む具体的なプロンプト形式）**:
```
対象ファイル: `.github/workflows/translate-readme.yml`と`.github/workflows/call-translate-readme.yml`

実行内容: 対象ファイルについて、外部プロジェクトから利用する際に必要な設定項目を洗い出し、以下の観点から分析してください：
1) 必須入力パラメータ（target-branch等）
2) 必須シークレット（GEMINI_API_KEY）
3) ファイル配置の前提条件（README.ja.mdの存在）
4) 外部プロジェクトでの利用時に必要な追加設定

確認事項: 作業前に既存のworkflowファイルとの依存関係、および他のREADME関連ファイルとの整合性を確認してください。

期待する出力: 外部プロジェクトがこの`call-translate-readme.yml`を導入する際の手順書をmarkdown形式で生成してください。具体的には：必須パラメータの設定方法、シークレットの登録手順、前提条件の確認項目を含めてください。
```

**避けるべき例**:
- callgraphについて調べてください
- ワークフローを分析してください
- issue-noteの処理フローを確認してください

## 出力フォーマット：
以下のMarkdown形式で出力してください：

```markdown
# Development Status

## 現在のIssues
[以下の形式で3行でオープン中のissuesを要約。issue番号を必ず書く]
- [1行目の説明]
- [2行目の説明]
- [3行目の説明]

## 次の一手候補
1. [候補1のタイトル。issue番号を必ず書く]
   - 最初の小さな一歩: [具体的で実行可能な最初のアクション]
   - Agent実行プロンプト:
     ```
     対象ファイル: [分析/編集する具体的なファイルパス]

     実行内容: [具体的な分析や変更内容を記述]

     確認事項: [変更前に確認すべき依存関係や制約]

     期待する出力: [markdown形式での結果や、具体的なファイル変更の説明]
     ```

2. [候補2のタイトル。issue番号を必ず書く]
   - 最初の小さな一歩: [具体的で実行可能な最初のアクション]
   - Agent実行プロンプト:
     ```
     対象ファイル: [分析/編集する具体的なファイルパス]

     実行内容: [具体的な分析や変更内容を記述]

     確認事項: [変更前に確認すべき依存関係や制約]

     期待する出力: [markdown形式での結果や、具体的なファイル変更の説明]
     ```

3. [候補3のタイトル。issue番号を必ず書く]
   - 最初の小さな一歩: [具体的で実行可能な最初のアクション]
   - Agent実行プロンプト:
     ```
     対象ファイル: [分析/編集する具体的なファイルパス]

     実行内容: [具体的な分析や変更内容を記述]

     確認事項: [変更前に確認すべき依存関係や制約]

     期待する出力: [markdown形式での結果や、具体的なファイル変更の説明]
     ```
```


# 開発状況情報
- 以下の開発状況情報を参考にしてください。
- Issue番号を記載する際は、必ず [Issue #番号](../issue-notes/番号.md) の形式でMarkdownリンクとして記載してください。

## プロジェクトのファイル一覧
- .editorconfig
- .github/actions-tmp/.github/workflows/call-callgraph.yml
- .github/actions-tmp/.github/workflows/call-daily-project-summary.yml
- .github/actions-tmp/.github/workflows/call-issue-note.yml
- .github/actions-tmp/.github/workflows/call-rust-windows-check.yml
- .github/actions-tmp/.github/workflows/call-translate-readme.yml
- .github/actions-tmp/.github/workflows/callgraph.yml
- .github/actions-tmp/.github/workflows/check-recent-human-commit.yml
- .github/actions-tmp/.github/workflows/daily-project-summary.yml
- .github/actions-tmp/.github/workflows/issue-note.yml
- .github/actions-tmp/.github/workflows/rust-windows-check.yml
- .github/actions-tmp/.github/workflows/translate-readme.yml
- .github/actions-tmp/.github_automation/callgraph/codeql-queries/callgraph.ql
- .github/actions-tmp/.github_automation/callgraph/codeql-queries/codeql-pack.lock.yml
- .github/actions-tmp/.github_automation/callgraph/codeql-queries/qlpack.yml
- .github/actions-tmp/.github_automation/callgraph/config/example.json
- .github/actions-tmp/.github_automation/callgraph/docs/callgraph.md
- .github/actions-tmp/.github_automation/callgraph/presets/callgraph.js
- .github/actions-tmp/.github_automation/callgraph/presets/style.css
- .github/actions-tmp/.github_automation/callgraph/scripts/analyze-codeql.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/callgraph-utils.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/check-codeql-exists.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/check-node-version.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/common-utils.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/copy-commit-results.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/extract-sarif-info.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/find-process-results.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/generate-html-graph.cjs
- .github/actions-tmp/.github_automation/callgraph/scripts/generateHTML.cjs
- .github/actions-tmp/.github_automation/check_recent_human_commit/scripts/check-recent-human-commit.cjs
- .github/actions-tmp/.github_automation/project_summary/docs/daily-summary-setup.md
- .github/actions-tmp/.github_automation/project_summary/prompts/development-status-prompt.md
- .github/actions-tmp/.github_automation/project_summary/prompts/project-overview-prompt.md
- .github/actions-tmp/.github_automation/project_summary/scripts/ProjectSummaryCoordinator.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/development/DevelopmentStatusGenerator.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/development/GitUtils.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/development/IssueTracker.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/generate-project-summary.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/overview/CodeAnalyzer.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/overview/ProjectAnalysisOrchestrator.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/overview/ProjectDataCollector.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/overview/ProjectDataFormatter.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/overview/ProjectOverviewGenerator.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/shared/BaseGenerator.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/shared/FileSystemUtils.cjs
- .github/actions-tmp/.github_automation/project_summary/scripts/shared/ProjectFileUtils.cjs
- .github/actions-tmp/.github_automation/translate/docs/TRANSLATION_SETUP.md
- .github/actions-tmp/.github_automation/translate/scripts/translate-readme.cjs
- .github/actions-tmp/.gitignore
- .github/actions-tmp/.vscode/settings.json
- .github/actions-tmp/LICENSE
- .github/actions-tmp/README.ja.md
- .github/actions-tmp/README.md
- .github/actions-tmp/_config.yml
- .github/actions-tmp/generated-docs/callgraph.html
- .github/actions-tmp/generated-docs/callgraph.js
- .github/actions-tmp/generated-docs/development-status-generated-prompt.md
- .github/actions-tmp/generated-docs/development-status.md
- .github/actions-tmp/generated-docs/project-overview-generated-prompt.md
- .github/actions-tmp/generated-docs/project-overview.md
- .github/actions-tmp/generated-docs/style.css
- .github/actions-tmp/googled947dc864c270e07.html
- .github/actions-tmp/issue-notes/10.md
- .github/actions-tmp/issue-notes/11.md
- .github/actions-tmp/issue-notes/12.md
- .github/actions-tmp/issue-notes/13.md
- .github/actions-tmp/issue-notes/14.md
- .github/actions-tmp/issue-notes/15.md
- .github/actions-tmp/issue-notes/16.md
- .github/actions-tmp/issue-notes/17.md
- .github/actions-tmp/issue-notes/18.md
- .github/actions-tmp/issue-notes/19.md
- .github/actions-tmp/issue-notes/2.md
- .github/actions-tmp/issue-notes/20.md
- .github/actions-tmp/issue-notes/21.md
- .github/actions-tmp/issue-notes/22.md
- .github/actions-tmp/issue-notes/23.md
- .github/actions-tmp/issue-notes/24.md
- .github/actions-tmp/issue-notes/25.md
- .github/actions-tmp/issue-notes/26.md
- .github/actions-tmp/issue-notes/27.md
- .github/actions-tmp/issue-notes/28.md
- .github/actions-tmp/issue-notes/29.md
- .github/actions-tmp/issue-notes/3.md
- .github/actions-tmp/issue-notes/30.md
- .github/actions-tmp/issue-notes/4.md
- .github/actions-tmp/issue-notes/7.md
- .github/actions-tmp/issue-notes/8.md
- .github/actions-tmp/issue-notes/9.md
- .github/actions-tmp/package-lock.json
- .github/actions-tmp/package.json
- .github/actions-tmp/src/main.js
- .github/docs/TRANSLATION_SETUP.md
- .github/scripts/translate-readme.js
- .github/workflows/call-callgraph.yml
- .github/workflows/call-daily-project-summary.yml
- .github/workflows/call-issue-note.yml
- .github/workflows/call-translate-readme.yml
- .github/workflows/deploy-pages.yml
- .github/workflows/release.yml
- .gitignore
- LICENSE
- NPM_README.md
- README.ja.md
- README.md
- RELEASE.ja.md
- RELEASE.md
- _config.yml
- demo/README.md
- demo/index.html
- demo/offline-rendering.html
- demo/streaming-demo.css
- demo/streaming.html
- demo/styles.css
- dist/cjs/event-scheduler.d.ts
- dist/cjs/event-scheduler.js
- dist/cjs/factories/effect-factory.d.ts
- dist/cjs/factories/effect-factory.js
- dist/cjs/factories/instrument-factory.d.ts
- dist/cjs/factories/instrument-factory.js
- dist/cjs/index.d.ts
- dist/cjs/index.js
- dist/cjs/ndjson-streaming.d.ts
- dist/cjs/ndjson-streaming.js
- dist/cjs/node-factory.d.ts
- dist/cjs/node-factory.js
- dist/cjs/offline-renderer.d.ts
- dist/cjs/offline-renderer.js
- dist/cjs/sequencer-nodes.d.ts
- dist/cjs/sequencer-nodes.js
- dist/cjs/streaming/event-processor.d.ts
- dist/cjs/streaming/event-processor.js
- dist/cjs/streaming/playback-state.d.ts
- dist/cjs/streaming/playback-state.js
- dist/cjs/types.d.ts
- dist/cjs/types.js
- dist/cjs/utils/time-parser.d.ts
- dist/cjs/utils/time-parser.js
- dist/demo/demo-types.js
- dist/demo/effect/autofilter.js
- dist/demo/effect/autopanner.js
- dist/demo/effect/autowah.js
- dist/demo/effect/bitcrusher.js
- dist/demo/effect/chebyshev.js
- dist/demo/effect/chorus.js
- dist/demo/effect/distortion.js
- dist/demo/effect/feedbackdelay.js
- dist/demo/effect/freeverb.js
- dist/demo/effect/frequencyshifter.js
- dist/demo/effect/jcreverb.js
- dist/demo/effect/phaser.js
- dist/demo/effect/pingpongdelay.js
- dist/demo/effect/pitchshift.js
- dist/demo/effect/reverb.js
- dist/demo/effect/stereowidener.js
- dist/demo/effect/tremolo.js
- dist/demo/effect/vibrato.js
- dist/demo/instrument/amsynth.js
- dist/demo/instrument/delay-vibrato.js
- dist/demo/instrument/duosynth.js
- dist/demo/instrument/membranesynth.js
- dist/demo/instrument/metalsynth.js
- dist/demo/instrument/minimal.js
- dist/demo/instrument/monosynth.js
- dist/demo/instrument/multitimbral.js
- dist/demo/instrument/noisesynth.js
- dist/demo/instrument/plucksynth.js
- dist/demo/instrument/polysynth-fm.js
- dist/demo/instrument/portamento.js
- dist/demo/instrument/sampler-piano.js
- dist/demo/instrument/streaming-test-doremi.js
- dist/demo/instrument/supersaw.js
- dist/demo/instrument/tempo-test.js
- dist/demo/instrument/volume-control.js
- dist/demo/main.js
- dist/demo/modules/audioManager.js
- dist/demo/modules/uiManager.js
- dist/demo/offline-rendering.js
- dist/demo/sequenceLoader.js
- dist/demo/sequences/basicSequences.js
- dist/demo/sequences/effectSequences.js
- dist/demo/sequences/synthSequences.js
- dist/demo/streaming.js
- dist/esm/event-scheduler.d.ts
- dist/esm/event-scheduler.mjs
- dist/esm/factories/effect-factory.d.ts
- dist/esm/factories/effect-factory.mjs
- dist/esm/factories/instrument-factory.d.ts
- dist/esm/factories/instrument-factory.mjs
- dist/esm/index.d.ts
- dist/esm/index.mjs
- dist/esm/ndjson-streaming.d.ts
- dist/esm/ndjson-streaming.mjs
- dist/esm/node-factory.d.ts
- dist/esm/node-factory.mjs
- dist/esm/offline-renderer.d.ts
- dist/esm/offline-renderer.mjs
- dist/esm/sequencer-nodes.d.ts
- dist/esm/sequencer-nodes.mjs
- dist/esm/streaming/event-processor.d.ts
- dist/esm/streaming/event-processor.mjs
- dist/esm/streaming/playback-state.d.ts
- dist/esm/streaming/playback-state.mjs
- dist/esm/types.d.ts
- dist/esm/types.mjs
- dist/esm/utils/time-parser.d.ts
- dist/esm/utils/time-parser.mjs
- dist/event-scheduler.d.ts
- dist/event-scheduler.js
- dist/factories/effect-factory.d.ts
- dist/factories/effect-factory.js
- dist/factories/instrument-factory.d.ts
- dist/factories/instrument-factory.js
- dist/index.d.ts
- dist/index.js
- dist/index.mjs
- dist/ndjson-streaming.d.ts
- dist/ndjson-streaming.js
- dist/node-factory.d.ts
- dist/node-factory.js
- dist/offline-renderer.d.ts
- dist/offline-renderer.js
- dist/sequencer-nodes.d.ts
- dist/sequencer-nodes.js
- dist/streaming/event-processor.d.ts
- dist/streaming/event-processor.js
- dist/streaming/playback-state.d.ts
- dist/streaming/playback-state.js
- dist/types.d.ts
- dist/types.js
- dist/utils/time-parser.d.ts
- dist/utils/time-parser.js
- docs/tonejs-components-roadmap.ja.md
- docs/tonejs-components-roadmap.md
- examples/cdn-example.html
- examples/npm-example.mjs
- examples/offline-rendering-example.html
- generated-docs/project-overview-generated-prompt.md
- googled947dc864c270e07.html
- issue-notes/100.md
- issue-notes/106.md
- issue-notes/108.md
- issue-notes/109.md
- issue-notes/110.md
- issue-notes/111.md
- issue-notes/112.md
- issue-notes/62.md
- issue-notes/64.md
- issue-notes/67.md
- issue-notes/69.md
- issue-notes/70.md
- issue-notes/71.md
- issue-notes/72.md
- issue-notes/73.md
- issue-notes/74.md
- issue-notes/77.md
- issue-notes/80.md
- issue-notes/84.md
- issue-notes/87.md
- issue-notes/88.md
- issue-notes/89.md
- issue-notes/90.md
- issue-notes/91.md
- issue-notes/93.md
- issue-notes/94.md
- issue-notes/97.md
- issue-notes/98.md
- package-lock.json
- package.json
- scripts/copy-to-dist.js
- scripts/rename-to-mjs.js
- src/demo/demo-types.ts
- src/demo/effect/autofilter.ts
- src/demo/effect/autopanner.ts
- src/demo/effect/autowah.ts
- src/demo/effect/bitcrusher.ts
- src/demo/effect/chebyshev.ts
- src/demo/effect/chorus.ts
- src/demo/effect/distortion.ts
- src/demo/effect/feedbackdelay.ts
- src/demo/effect/freeverb.ts
- src/demo/effect/frequencyshifter.ts
- src/demo/effect/jcreverb.ts
- src/demo/effect/phaser.ts
- src/demo/effect/pingpongdelay.ts
- src/demo/effect/pitchshift.ts
- src/demo/effect/reverb.ts
- src/demo/effect/stereowidener.ts
- src/demo/effect/tremolo.ts
- src/demo/effect/vibrato.ts
- src/demo/instrument/amsynth.ts
- src/demo/instrument/delay-vibrato.ts
- src/demo/instrument/duosynth.ts
- src/demo/instrument/membranesynth.ts
- src/demo/instrument/metalsynth.ts
- src/demo/instrument/minimal.ts
- src/demo/instrument/monosynth.ts
- src/demo/instrument/multitimbral.ts
- src/demo/instrument/noisesynth.ts
- src/demo/instrument/plucksynth.ts
- src/demo/instrument/polysynth-fm.ts
- src/demo/instrument/portamento.ts
- src/demo/instrument/sampler-piano.ts
- src/demo/instrument/streaming-test-doremi.ts
- src/demo/instrument/supersaw.ts
- src/demo/instrument/tempo-test.ts
- src/demo/instrument/volume-control.ts
- src/demo/main.ts
- src/demo/modules/audioManager.ts
- src/demo/modules/uiManager.ts
- src/demo/offline-rendering.ts
- src/demo/sequenceLoader.ts
- src/demo/sequences/basicSequences.ts
- src/demo/sequences/effectSequences.ts
- src/demo/sequences/synthSequences.ts
- src/demo/streaming.ts
- src/demo/tone-global.d.ts
- src/event-scheduler.ts
- src/factories/effect-factory.ts
- src/factories/instrument-factory.ts
- src/index.ts
- src/ndjson-streaming.ts
- src/node-factory.ts
- src/offline-renderer.ts
- src/sequencer-nodes.ts
- src/streaming/event-processor.ts
- src/streaming/playback-state.ts
- src/types.ts
- src/utils/time-parser.ts
- tsconfig.all.json
- tsconfig.demo-new.json
- tsconfig.json

## 現在のオープンIssues
## [Issue #117](../issue-notes/117.md): Improve offline rendering demo UX with auto-rendering and performance metrics
## Offline Rendering Demo Improvements (Issue #112) ✅

### All changes implemented and code review feedback addressed!

**Implemented Features:**
- [x] Remove "Render Entire Sequence" button - implement auto-rendering
- [x] Add auto-rendering on sequence selection
- [x] Add debounced auto-rendering ...
ラベル: 
--- issue-notes/117.md の内容 ---

```markdown

```

## [Issue #112](../issue-notes/112.md): オフラインレンダリングデモ を改善する
[issue-notes/112.md](https://github.com/cat2151/tonejs-json-sequencer/blob/main/issue-notes/112.md)

...
ラベル: good first issue
--- issue-notes/112.md の内容 ---

```markdown
# issue オフラインレンダリングデモ を改善する #112
[issues #112](https://github.com/cat2151/tonejs-json-sequencer/issues/112)

# 詳細
- 機能追加 : 自動レンダリング
    - 「最小構成」などを選んだら即座にレンダリングする。「シーケンス全体をレンダリング」ボタンを削除する（シンプルな見た目を優先する）
    - シーケンスNDJSON欄のtextareaも、編集したらデバウンスのち自動でレンダリングする。
- 機能追加 : レンダリング完了直後に、以下を自動で実施する。
    - レンダリング結果波形を、レンダリング進行状況グラフにオーバーレイ表示する。
    - プレビュー再生する。
        - （プレビューシステムは削除しない。あくまで自動再生を追加するだけ）
    - レンダリング時間とスピードを表示する。
        - 例えば2.70秒のwavのレンダリングを、0.27秒でレンダリング完了したら、
        - 「レンダリング時間：0.27秒、レンダリングスピード：x10」のように表示する
- 削除 : レンダリング設定欄を削除する。48000Hz固定（どこかにそれは表示すること）、終了バッファは0秒固定、ファイル名はoutput_YYYYMMDD_HHMISS.wav固定。シンプルな見た目を優先する
- 削除 : 「レンダリング進行状況」「レンダリングされた音声のプレビュー」「音声をプレビューできます」という3つの文言は、シンプルな見た目を優先し、削除とする


```

## [Issue #89](../issue-notes/89.md): （人力）streamingのtestをする
[issue-notes/89.md](https://github.com/cat2151/tonejs-json-sequencer/blob/main/issue-notes/89.md)

...
ラベル: 
--- issue-notes/89.md の内容 ---

```markdown
# issue （人力）streamingのtestをする #89
[issues #89](https://github.com/cat2151/tonejs-json-sequencer/issues/89)



```

## ドキュメントで言及されているファイルの内容
### .github/actions-tmp/issue-notes/12.md
```md
{% raw %}
# issue project-summary を他projectから使いやすくする #12
[issues #12](https://github.com/cat2151/github-actions/issues/12)

# 保留、別projectでの検証待ちのもの
- promptsをcall側ymlで指定可能にする
  - 保留の理由
    - YAGNI原則
      - 現状の共通workflow側のpromptsで問題ないうちは、保留とする
        - そのままで使える可能性が高い見込み
      - 検証が必要
      - 別promptsを実際に書く必要が出たときに、追加実装をする
# 課題、 docs/ をメンテする
- 対象は、 daily-summary-setup.md
- call-daily-project-summary.yml の導入手順を書く
- どうする？
  - 次の日次バッチでagent用promptを生成させる
- 結果
  - 生成させた
  - 導入手順をメンテさせた
  - 人力でさらにメンテした
  - これでOKと判断する。
  - あとは必要に応じてissue起票すればよい、今すぐのissue起票は不要（YAGNI原則）、と判断する

# closeとする

{% endraw %}
```

### .github/actions-tmp/issue-notes/17.md
```md
{% raw %}
# issue development-status が生成したmdに誤りがある。issue-note へのlinkがURL誤りで、404となってしまう #17
[issues #17](https://github.com/cat2151/github-actions/issues/17)

# 事例
- 生成したmdのURL：
    - https://github.com/cat2151/github-actions/blob/main/generated-docs/development-status.md
- そのmdをGitHub上でdecodeして閲覧したときのURL、404である：
    - https://github.com/cat2151/github-actions/blob/main/generated-docs/issue-notes/16.md
- そのmdに実際に含まれるURL：
    - issue-notes/16.md
- あるべきURL：
    - https://github.com/cat2151/github-actions/blob/main/issue-notes/16.md
- あるべきURLがmdにどう含まれているべきか：
    - ../issue-notes/16.md

# どうする？
- 案
    - promptを修正する
    - promptの場所は：
        - .github_automation/project_summary/scripts/development/DevelopmentStatusGenerator.cjs
    - 備考、cjs内にpromptがハードコーディングされており、promptをメンテしづらいので別途対処する : [issues #18](https://github.com/cat2151/github-actions/issues/18)

# 結果
- agentにpromptを投げた
    - ※promptは、development-statusで生成したもの
- レビューした
    - agentがフルパスで実装した、ことがわかった
- userが分析し、 ../ のほうが適切と判断した
    - ※「事例」コーナーを、あわせて修正した
- そのように指示してagentに修正させた
- testする

# 結果
- test green
- closeする

{% endraw %}
```

### .github/actions-tmp/issue-notes/2.md
```md
{% raw %}
# issue GitHub Actions「関数コールグラフhtmlビジュアライズ生成」を共通ワークフロー化する #2
[issues #2](https://github.com/cat2151/github-actions/issues/2)


# prompt
```
あなたはGitHub Actionsと共通ワークフローのスペシャリストです。
このymlファイルを、以下の2つのファイルに分割してください。
1. 共通ワークフロー       cat2151/github-actions/.github/workflows/callgraph_enhanced.yml
2. 呼び出し元ワークフロー cat2151/github-actions/.github/workflows/call-callgraph_enhanced.yml
まずplanしてください
```

# 結果
- indent
    - linter？がindentのエラーを出しているがyml内容は見た感じOK
    - テキストエディタとagentの相性問題と判断する
    - 別のテキストエディタでsaveしなおし、テキストエディタをreload
    - indentのエラーは解消した
- LLMレビュー
    - agent以外の複数のLLMにレビューさせる
    - prompt
```
あなたはGitHub Actionsと共通ワークフローのスペシャリストです。
以下の2つのファイルをレビューしてください。最優先で、エラーが発生するかどうかだけレビューしてください。エラー以外の改善事項のチェックをするかわりに、エラー発生有無チェックに最大限注力してください。

--- 共通ワークフロー

# GitHub Actions Reusable Workflow for Call Graph Generation
name: Generate Call Graph

# TODO Windowsネイティブでのtestをしていた名残が残っているので、今後整理していく。今はWSL act でtestしており、Windowsネイティブ環境依存問題が解決した
#  ChatGPTにレビューさせるとそこそこ有用そうな提案が得られたので、今後それをやる予定
#  agentに自己チェックさせる手も、セカンドオピニオンとして選択肢に入れておく

on:
  workflow_call:

jobs:
  check-commits:
    runs-on: ubuntu-latest
    outputs:
      should-run: ${{ steps.check.outputs.should-run }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 50 # 過去のコミットを取得

      - name: Check for user commits in last 24 hours
        id: check
        run: |
          node .github/scripts/callgraph_enhanced/check-commits.cjs

  generate-callgraph:
    needs: check-commits
    if: needs.check-commits.outputs.should-run == 'true'
    runs-on: ubuntu-latest
    permissions:
      contents: write
      security-events: write
      actions: read

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set Git identity
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"

      - name: Remove old CodeQL packages cache
        run: rm -rf ~/.codeql/packages

      - name: Check Node.js version
        run: |
          node .github/scripts/callgraph_enhanced/check-node-version.cjs

      - name: Install CodeQL CLI
        run: |
          wget https://github.com/github/codeql-cli-binaries/releases/download/v2.22.1/codeql-linux64.zip
          unzip codeql-linux64.zip
          sudo mv codeql /opt/codeql
          echo "/opt/codeql" >> $GITHUB_PATH

      - name: Install CodeQL query packs
        run: |
          /opt/codeql/codeql pack install .github/codeql-queries

      - name: Check CodeQL exists
        run: |
          node .github/scripts/callgraph_enhanced/check-codeql-exists.cjs

      - name: Verify CodeQL Configuration
        run: |
          node .github/scripts/callgraph_enhanced/analyze-codeql.cjs verify-config

      - name: Remove existing CodeQL DB (if any)
        run: |
          rm -rf codeql-db

      - name: Perform CodeQL Analysis
        run: |
          node .github/scripts/callgraph_enhanced/analyze-codeql.cjs analyze

      - name: Check CodeQL Analysis Results
        run: |
          node .github/scripts/callgraph_enhanced/analyze-codeql.cjs check-results

      - name: Debug CodeQL execution
        run: |
          node .github/scripts/callgraph_enhanced/analyze-codeql.cjs debug

      - name: Wait for CodeQL results
        run: |
          node -e "setTimeout(()=>{}, 10000)"

      - name: Find and process CodeQL results
        run: |
          node .github/scripts/callgraph_enhanced/find-process-results.cjs

      - name: Generate HTML graph
        run: |
          node .github/scripts/callgraph_enhanced/generate-html-graph.cjs

      - name: Copy files to generated-docs and commit results
        run: |
          node .github/scripts/callgraph_enhanced/copy-commit-results.cjs

--- 呼び出し元
# 呼び出し元ワークフロー: call-callgraph_enhanced.yml
name: Call Call Graph Enhanced

on:
  schedule:
    # 毎日午前5時(JST) = UTC 20:00前日
    - cron: '0 20 * * *'
  workflow_dispatch:

jobs:
  call-callgraph-enhanced:
    # uses: cat2151/github-actions/.github/workflows/callgraph_enhanced.yml
    uses: ./.github/workflows/callgraph_enhanced.yml # ローカルでのテスト用
```

# レビュー結果OKと判断する
- レビュー結果を人力でレビューした形になった

# test
- #4 同様にローカル WSL + act でtestする
- エラー。userのtest設計ミス。
  - scriptの挙動 : src/ がある前提
  - 今回の共通ワークフローのリポジトリ : src/ がない
  - 今回testで実現したいこと
    - 仮のソースでよいので、関数コールグラフを生成させる
  - 対策
    - src/ にダミーを配置する
- test green
  - ただしcommit pushはしてないので、html内容が0件NG、といったケースの検知はできない
  - もしそうなったら別issueとしよう

# test green

# commit用に、yml 呼び出し元 uses をlocal用から本番用に書き換える

# closeとする
- もしhtml内容が0件NG、などになったら、別issueとするつもり

{% endraw %}
```

### .github/actions-tmp/issue-notes/7.md
```md
{% raw %}
# issue issue note生成できるかのtest用 #7
[issues #7](https://github.com/cat2151/github-actions/issues/7)

- 生成できた
- closeとする

{% endraw %}
```

### .github/actions-tmp/issue-notes/9.md
```md
{% raw %}
# issue 関数コールグラフhtmlビジュアライズが0件なので、原因を可視化する #9
[issues #9](https://github.com/cat2151/github-actions/issues/9)

# agentに修正させたり、人力で修正したりした
- agentがハルシネーションし、いろいろ根の深いバグにつながる、エラー隠蔽などを仕込んでいたため、検知が遅れた
- 詳しくはcommit logを参照のこと
- WSL + actの環境を少し変更、act起動時のコマンドライン引数を変更し、generated-docsをmountする（ほかはデフォルト挙動であるcpだけにする）ことで、デバッグ情報をコンテナ外に出力できるようにし、デバッグを効率化した

# test green

# closeとする

{% endraw %}
```

### issue-notes/112.md
```md
{% raw %}
# issue オフラインレンダリングデモ を改善する #112
[issues #112](https://github.com/cat2151/tonejs-json-sequencer/issues/112)

# 詳細
- 機能追加 : 自動レンダリング
    - 「最小構成」などを選んだら即座にレンダリングする。「シーケンス全体をレンダリング」ボタンを削除する（シンプルな見た目を優先する）
    - シーケンスNDJSON欄のtextareaも、編集したらデバウンスのち自動でレンダリングする。
- 機能追加 : レンダリング完了直後に、以下を自動で実施する。
    - レンダリング結果波形を、レンダリング進行状況グラフにオーバーレイ表示する。
    - プレビュー再生する。
        - （プレビューシステムは削除しない。あくまで自動再生を追加するだけ）
    - レンダリング時間とスピードを表示する。
        - 例えば2.70秒のwavのレンダリングを、0.27秒でレンダリング完了したら、
        - 「レンダリング時間：0.27秒、レンダリングスピード：x10」のように表示する
- 削除 : レンダリング設定欄を削除する。48000Hz固定（どこかにそれは表示すること）、終了バッファは0秒固定、ファイル名はoutput_YYYYMMDD_HHMISS.wav固定。シンプルな見た目を優先する
- 削除 : 「レンダリング進行状況」「レンダリングされた音声のプレビュー」「音声をプレビューできます」という3つの文言は、シンプルな見た目を優先し、削除とする


{% endraw %}
```

### issue-notes/89.md
```md
{% raw %}
# issue （人力）streamingのtestをする #89
[issues #89](https://github.com/cat2151/tonejs-json-sequencer/issues/89)



{% endraw %}
```

## 最近の変更（過去7日間）
### コミット履歴:
2ff346f Merge pull request #116 from cat2151/copilot/fix-volume-control-issue
028db20 Remove unnecessary Tone existence check for consistency
8e71fc6 Add Transport cleanup to main library event-scheduler
cf1297d Fix volume control demo by clearing Transport before playing
4d936a4 Initial plan
e92076a Merge pull request #115 from cat2151/copilot/fix-demo-streaming-loop-bug
a8cf071 Fix loop timing bug - correct wait offset calculation
f96d284 Initial plan
a4b9b81 Merge pull request #114 from cat2151/copilot/fix-streaming-timing-bug
aeaf356 Apply PR review feedback: fix timing window to match reservation buffer (0..lookaheadMs) and remove redundant calculations

### 変更されたファイル:
.github/workflows/deploy-pages.yml
.gitignore
demo/README.md
demo/index.html
demo/offline-rendering.html
demo/streaming-demo.css
demo/streaming.html
demo/styles.css
dist/cjs/event-scheduler.js
dist/cjs/ndjson-streaming.js
dist/demo/modules/audioManager.js
dist/demo/streaming.js
dist/esm/event-scheduler.mjs
dist/esm/ndjson-streaming.mjs
dist/event-scheduler.js
dist/ndjson-streaming.js
issue-notes/112.md
src/demo/modules/audioManager.ts
src/demo/streaming.ts
src/event-scheduler.ts
src/ndjson-streaming.ts
streaming.html


---
Generated at: 2026-02-05 07:11:05 JST

Last updated: 2026-02-15

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
- .github/actions-tmp/.github/workflows/check-large-files.yml
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
- .github/actions-tmp/.github_automation/check-large-files/README.md
- .github/actions-tmp/.github_automation/check-large-files/check-large-files.toml.example
- .github/actions-tmp/.github_automation/check-large-files/scripts/check_large_files.py
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
- .github/actions-tmp/issue-notes/35.md
- .github/actions-tmp/issue-notes/38.md
- .github/actions-tmp/issue-notes/4.md
- .github/actions-tmp/issue-notes/40.md
- .github/actions-tmp/issue-notes/42.md
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
- .github/workflows/create-issue-on-actions-failure.yml
- .github/workflows/deploy-pages.yml
- .github/workflows/release.yml
- .gitignore
- AGENTS.md
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
- demo-library/README.md
- demo-library/index.html
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
- dist/demo/effect/chorus-object-args.js
- dist/demo/effect/chorus.js
- dist/demo/effect/distortion.js
- dist/demo/effect/feedbackdelay.js
- dist/demo/effect/freeverb.js
- dist/demo/effect/frequencyshifter.js
- dist/demo/effect/generic-ramp-to.js
- dist/demo/effect/jcreverb.js
- dist/demo/effect/lpf-envelope.js
- dist/demo/effect/lpf-q-lfo.js
- dist/demo/effect/lpf-sweep.js
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
- dist/demo/instrument/loopend-test.js
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
- issue-notes/108.md
- issue-notes/109.md
- issue-notes/110.md
- issue-notes/111.md
- issue-notes/112.md
- issue-notes/120.md
- issue-notes/124.md
- issue-notes/137.md
- issue-notes/139.md
- issue-notes/162.md
- issue-notes/170.md
- issue-notes/176.md
- issue-notes/178.md
- issue-notes/89.md
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
- src/demo/effect/chorus-object-args.ts
- src/demo/effect/chorus.ts
- src/demo/effect/distortion.ts
- src/demo/effect/feedbackdelay.ts
- src/demo/effect/freeverb.ts
- src/demo/effect/frequencyshifter.ts
- src/demo/effect/generic-ramp-to.ts
- src/demo/effect/jcreverb.ts
- src/demo/effect/lpf-envelope.ts
- src/demo/effect/lpf-q-lfo.ts
- src/demo/effect/lpf-sweep.ts
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
- src/demo/instrument/loopend-test.ts
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
## [Issue #124](../issue-notes/124.md): （人力）demo-libの動作確認をする
[issue-notes/124.md](https://github.com/cat2151/tonejs-json-sequencer/blob/main/issue-notes/124.md)

...
ラベル: 
--- issue-notes/124.md の内容 ---

```markdown
# issue demo-libの動作確認をする #124
[issues #124](https://github.com/cat2151/tonejs-json-sequencer/issues/124)



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
### .github/actions-tmp/issue-notes/24.md
```md
{% raw %}
# issue Geminiが503で落ちたのでretryを実装する #24
[issues #24](https://github.com/cat2151/github-actions/issues/24)

# 何が困るの？
- 朝起きて、development statusがgenerateされてないのは困る
    - それをタスク実施のヒントにしているので
    - 毎朝generatedな状態を維持したい

# 方法
- retryを実装する
    - 現在は `this.model.generateContent(developmentPrompt);`
    - 実装後は `this.generateContent(developmentPrompt);`
    - BaseGenerator 側に、
        - generateContent関数を実装する
            - そこで、
                - `this.model.generateContent(developmentPrompt);` する
                - 503のとき、
                    - retryあり
                    - Exponential Backoff

# 結果
- 直近の実行結果をlog確認した
    - 本番で503が発生しなかったことをlog確認した
- 本番の503 testは、今回発生しなかったので、できず
- ここ1週間で2回発生しているので、次の1週間で1回発生する想定
- ソース机上確認した

# どうする？
- このissueはcloseしたほうがわかりやすい、と判断する
- 1週間503を毎日チェック、は省略とする
- もし今後503が発生したら別issueとする
- 2日チェックして503なし

# closeとする

{% endraw %}
```

### .github/actions-tmp/issue-notes/4.md
```md
{% raw %}
# issue GitHub Actions「project概要生成」を共通ワークフロー化する #4
[issues #4](https://github.com/cat2151/github-actions/issues/4)

# prompt
```
あなたはGitHub Actionsと共通ワークフローのスペシャリストです。
このymlファイルを、以下の2つのファイルに分割してください。
1. 共通ワークフロー       cat2151/github-actions/.github/workflows/daily-project-summary.yml
2. 呼び出し元ワークフロー cat2151/github-actions/.github/workflows/call-daily-project-summary.yml
まずplanしてください
```

# 結果、あちこちハルシネーションのあるymlが生成された
- agentの挙動があからさまにハルシネーション
    - インデントが修正できない、「失敗した」という
    - 構文誤りを認識できない
- 人力で修正した

# このagentによるセルフレビューが信頼できないため、別のLLMによるセカンドオピニオンを試す
```
あなたはGitHub Actionsと共通ワークフローのスペシャリストです。
以下の2つのファイルをレビューしてください。最優先で、エラーが発生するかどうかだけレビューてください。エラー以外の改善事項のチェックをするかわりに、エラー発生有無チェックに最大限注力してください。

--- 呼び出し元

name: Call Daily Project Summary

on:
  schedule:
    # 日本時間 07:00 (UTC 22:00 前日)
    - cron: '0 22 * * *'
  workflow_dispatch:

jobs:
  call-daily-project-summary:
    uses: cat2151/github-actions/.github/workflows/daily-project-summary.yml
    secrets:
      GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}

--- 共通ワークフロー
name: Daily Project Summary
on:
  workflow_call:

jobs:
  generate-summary:
    runs-on: ubuntu-latest

    permissions:
      contents: write
      issues: read
      pull-requests: read

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          fetch-depth: 0  # 履歴を取得するため

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: |
          # 一時的なディレクトリで依存関係をインストール
          mkdir -p /tmp/summary-deps
          cd /tmp/summary-deps
          npm init -y
          npm install @google/generative-ai @octokit/rest
          # generated-docsディレクトリを作成
          mkdir -p $GITHUB_WORKSPACE/generated-docs

      - name: Generate project summary
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          GITHUB_REPOSITORY: ${{ github.repository }}
          NODE_PATH: /tmp/summary-deps/node_modules
        run: |
          node .github/scripts/generate-project-summary.cjs

      - name: Check for generated summaries
        id: check_summaries
        run: |
          if [ -f "generated-docs/project-overview.md" ] && [ -f "generated-docs/development-status.md" ]; then
            echo "summaries_generated=true" >> $GITHUB_OUTPUT
          else
            echo "summaries_generated=false" >> $GITHUB_OUTPUT
          fi

      - name: Commit and push summaries
        if: steps.check_summaries.outputs.summaries_generated == 'true'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          # package.jsonの変更のみリセット（generated-docsは保持）
          git restore package.json 2>/dev/null || true
          # サマリーファイルのみを追加
          git add generated-docs/project-overview.md
          git add generated-docs/development-status.md
          git commit -m "Update project summaries (overview & development status)"
          git push

      - name: Summary generation result
        run: |
          if [ "${{ steps.check_summaries.outputs.summaries_generated }}" == "true" ]; then
            echo "✅ Project summaries updated successfully"
            echo "📊 Generated: project-overview.md & development-status.md"
          else
            echo "ℹ️ No summaries generated (likely no user commits in the last 24 hours)"
          fi
```

# 上記promptで、2つのLLMにレビューさせ、合格した

# 細部を、先行する2つのymlを参照に手直しした

# ローカルtestをしてからcommitできるとよい。方法を検討する
- ローカルtestのメリット
    - 素早く修正のサイクルをまわせる
    - ムダにgit historyを汚さない
        - これまでの事例：「実装したつもり」「エラー。修正したつもり」「エラー。修正したつもり」...（以降エラー多数）
- 方法
    - ※検討、WSL + act を環境構築済みである。test可能であると判断する
    - 呼び出し元のURLをコメントアウトし、相対パス記述にする
    - ※備考、テスト成功すると結果がcommit pushされる。それでよしとする
- 結果
    - OK
    - secretsを簡略化できるか試した、できなかった、現状のsecrets記述が今わかっている範囲でベストと判断する
    - OK

# test green

# commit用に、yml 呼び出し元 uses をlocal用から本番用に書き換える

# closeとする

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

### issue-notes/124.md
```md
{% raw %}
# issue demo-libの動作確認をする #124
[issues #124](https://github.com/cat2151/tonejs-json-sequencer/issues/124)



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
7c28e06 Merge pull request #179 from cat2151/codex/fix-demo-library-sound-issue
4ba0f3c Lazy-load demo sequences in demo-library
720128a Add dropdown playback fixes to demo library
02ed93c Initial plan
d150f9f Merge pull request #177 from cat2151/codex/add-loopend-to-examples
7c4afc4 Adjust supersaw envelope release for loopEnd
337e50d Add loopEnd markers to demo sequences
f337bb0 Add issue note for #178 [auto]
260a5d0 Initial plan
8376d5a Add issue note for #176 [auto]

### 変更されたファイル:
README.ja.md
README.md
demo-library/README.md
demo-library/index.html
dist/cjs/event-scheduler.js
dist/cjs/index.d.ts
dist/cjs/types.d.ts
dist/demo/effect/autofilter.js
dist/demo/effect/autopanner.js
dist/demo/effect/autowah.js
dist/demo/effect/bitcrusher.js
dist/demo/effect/chebyshev.js
dist/demo/effect/chorus-object-args.js
dist/demo/effect/chorus.js
dist/demo/effect/distortion.js
dist/demo/effect/feedbackdelay.js
dist/demo/effect/freeverb.js
dist/demo/effect/frequencyshifter.js
dist/demo/effect/generic-ramp-to.js
dist/demo/effect/jcreverb.js
dist/demo/effect/lpf-envelope.js
dist/demo/effect/lpf-sweep.js
dist/demo/effect/phaser.js
dist/demo/effect/pingpongdelay.js
dist/demo/effect/pitchshift.js
dist/demo/effect/reverb.js
dist/demo/effect/stereowidener.js
dist/demo/effect/tremolo.js
dist/demo/effect/vibrato.js
dist/demo/instrument/amsynth.js
dist/demo/instrument/delay-vibrato.js
dist/demo/instrument/duosynth.js
dist/demo/instrument/membranesynth.js
dist/demo/instrument/metalsynth.js
dist/demo/instrument/minimal.js
dist/demo/instrument/monosynth.js
dist/demo/instrument/multitimbral.js
dist/demo/instrument/noisesynth.js
dist/demo/instrument/plucksynth.js
dist/demo/instrument/polysynth-fm.js
dist/demo/instrument/portamento.js
dist/demo/instrument/sampler-piano.js
dist/demo/instrument/streaming-test-doremi.js
dist/demo/instrument/supersaw.js
dist/demo/instrument/tempo-test.js
dist/demo/instrument/volume-control.js
dist/demo/sequenceLoader.js
dist/esm/event-scheduler.mjs
dist/esm/index.d.ts
dist/esm/types.d.ts
dist/event-scheduler.js
dist/index.d.ts
dist/types.d.ts
issue-notes/172.md
issue-notes/176.md
issue-notes/178.md
src/demo/demo-types.ts
src/demo/effect/autofilter.ts
src/demo/effect/autopanner.ts
src/demo/effect/autowah.ts
src/demo/effect/bitcrusher.ts
src/demo/effect/chebyshev.ts
src/demo/effect/chorus-object-args.ts
src/demo/effect/chorus.ts
src/demo/effect/distortion.ts
src/demo/effect/feedbackdelay.ts
src/demo/effect/freeverb.ts
src/demo/effect/frequencyshifter.ts
src/demo/effect/generic-ramp-to.ts
src/demo/effect/jcreverb.ts
src/demo/effect/lpf-envelope.ts
src/demo/effect/lpf-sweep.ts
src/demo/effect/phaser.ts
src/demo/effect/pingpongdelay.ts
src/demo/effect/pitchshift.ts
src/demo/effect/reverb.ts
src/demo/effect/stereowidener.ts
src/demo/effect/tremolo.ts
src/demo/effect/vibrato.ts
src/demo/instrument/amsynth.ts
src/demo/instrument/delay-vibrato.ts
src/demo/instrument/duosynth.ts
src/demo/instrument/membranesynth.ts
src/demo/instrument/metalsynth.ts
src/demo/instrument/minimal.ts
src/demo/instrument/monosynth.ts
src/demo/instrument/multitimbral.ts
src/demo/instrument/noisesynth.ts
src/demo/instrument/plucksynth.ts
src/demo/instrument/polysynth-fm.ts
src/demo/instrument/portamento.ts
src/demo/instrument/sampler-piano.ts
src/demo/instrument/streaming-test-doremi.ts
src/demo/instrument/supersaw.ts
src/demo/instrument/tempo-test.ts
src/demo/instrument/volume-control.ts
src/demo/sequenceLoader.ts
src/event-scheduler.ts
src/index.ts
src/types.ts


---
Generated at: 2026-02-15 07:08:53 JST

Last updated: 2026-01-16

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
- .github/workflows/release.yml
- .gitignore
- CONVERSION_SUMMARY.md
- EXTRACTION_PROCESS.md
- LICENSE
- NEW_STRUCTURE.md
- NPM_README.md
- README.ja.md
- README.md
- REFACTORING_SUMMARY.md
- RELEASE.ja.md
- RELEASE.md
- _config.yml
- demo/index.html
- demo/styles.css
- dist/cjs/event-scheduler.d.ts
- dist/cjs/event-scheduler.js
- dist/cjs/index.d.ts
- dist/cjs/index.js
- dist/cjs/node-factory.d.ts
- dist/cjs/node-factory.js
- dist/cjs/sequencer-nodes.d.ts
- dist/cjs/sequencer-nodes.js
- dist/cjs/types.d.ts
- dist/cjs/types.js
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
- dist/demo/instrument/sampler-piano.js
- dist/demo/instrument/supersaw.js
- dist/demo/main.js
- dist/demo/modules/audioManager.js
- dist/demo/modules/uiManager.js
- dist/demo/sequenceLoader.js
- dist/demo/sequences/basicSequences.js
- dist/demo/sequences/effectSequences.js
- dist/demo/sequences/synthSequences.js
- dist/esm/event-scheduler.d.ts
- dist/esm/event-scheduler.mjs
- dist/esm/index.d.ts
- dist/esm/index.mjs
- dist/esm/node-factory.d.ts
- dist/esm/node-factory.mjs
- dist/esm/sequencer-nodes.d.ts
- dist/esm/sequencer-nodes.mjs
- dist/esm/types.d.ts
- dist/esm/types.mjs
- dist/index.d.ts
- dist/index.js
- dist/index.mjs
- docs/tonejs-components-roadmap.ja.md
- docs/tonejs-components-roadmap.md
- examples/cdn-example.html
- examples/npm-example.mjs
- generated-docs/callgraph.html
- generated-docs/project-overview-generated-prompt.md
- googled947dc864c270e07.html
- index.html
- issue-notes/1.md
- issue-notes/11.md
- issue-notes/12.md
- issue-notes/14.md
- issue-notes/15.md
- issue-notes/17.md
- issue-notes/19.md
- issue-notes/2.md
- issue-notes/21.md
- issue-notes/23.md
- issue-notes/25.md
- issue-notes/27.md
- issue-notes/29.md
- issue-notes/3.md
- issue-notes/31.md
- issue-notes/32.md
- issue-notes/34.md
- issue-notes/36.md
- issue-notes/38.md
- issue-notes/4.md
- issue-notes/40.md
- issue-notes/41.md
- issue-notes/5.md
- issue-notes/7.md
- issue-notes/9.md
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
- src/demo/instrument/sampler-piano.ts
- src/demo/instrument/supersaw.ts
- src/demo/main.ts
- src/demo/modules/audioManager.ts
- src/demo/modules/uiManager.ts
- src/demo/sequenceLoader.ts
- src/demo/sequences/basicSequences.ts
- src/demo/sequences/effectSequences.ts
- src/demo/sequences/synthSequences.ts
- src/demo/tone-global.d.ts
- src/event-scheduler.ts
- src/index.ts
- src/node-factory.ts
- src/sequencer-nodes.ts
- src/types.ts
- tsconfig.all.json
- tsconfig.demo-new.json
- tsconfig.json

## 現在のオープンIssues
## [Issue #31](../issue-notes/31.md): 大規模なリファクタリングを行ったのでdemoを動作確認する
[issue-notes/31.md](https://github.com/cat2151/tonejs-json-sequencer/blob/main/issue-notes/31.md)

...
ラベル: 
--- issue-notes/31.md の内容 ---

```markdown
# issue 大規模なリファクタリングを行ったのでdemoを動作確認する #31
[issues #31](https://github.com/cat2151/tonejs-json-sequencer/issues/31)



```

## ドキュメントで言及されているファイルの内容
### issue-notes/1.md
```md
{% raw %}
# issue 現在のdemoはprototypeなのでゼロから作り直す。README.ja.mdに入出力定義などをBluesky投稿を元にまとめる #1
[issues #1](https://github.com/cat2151/tonejs-json-sequencer/issues/1)

# close条件
- 済 : 入出力定義をREADME.ja.mdにざっくりまとめること
  - 結果 : 実際には、入出力定義にはなっていないが、実装とREADMEを読めばわかる、のを確認した
- 済 : ゼロから作り直すこと
  - 方法 : READMEを整理して意図を可視化のち、Agentic Codingで一歩ずつ指示
  - 結果 : スムーズにできた。なおゼロからでなく、index.htmlにすべて入った最初のprototype状態から、agentに一歩ずつ指示をするだけで、スムーズに構造を変更できた
- 済 : Bluesky投稿を参照し、意図のヌケモレチェック結果をここに書くこと
  - 結果 : ヌケモレなしと判断する。投稿時よりも進んだことがREADMEに整理できている

# closeする

{% endraw %}
```

### issue-notes/31.md
```md
{% raw %}
# issue 大規模なリファクタリングを行ったのでdemoを動作確認する #31
[issues #31](https://github.com/cat2151/tonejs-json-sequencer/issues/31)



{% endraw %}
```

## 最近の変更（過去7日間）
### コミット履歴:
187e817 Auto-translate README.ja.md to README.md [auto]
5e5f7c2 Merge pull request #43 from cat2151/copilot/update-readme-library-usage
9f49635 Fix CommonJS import path to use dist/cjs/index.js
a656540 Add library usage documentation to README.ja.md with dist/ reference methods
998a986 Auto-translate README.ja.md to README.md [auto]
9dadd45 Initial plan
d5fb48a Merge pull request #42 from cat2151/copilot/add-badges-to-readme
82fd948 Replace incorrect badges with language badges (JA/EN) matching user's style
4e48931 Add badges to README.md for consistency with README.ja.md
cf1b76c Add badges to README.ja.md (npm, TypeScript, License, Demo)

### 変更されたファイル:
README.ja.md
README.md
dist/cjs/node-factory.js
dist/esm/node-factory.mjs
issue-notes/40.md
issue-notes/41.md
src/node-factory.ts


---
Generated at: 2026-01-16 07:09:11 JST

Last updated: 2026-02-04

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
- LICENSE
- NPM_README.md
- README.ja.md
- README.md
- RELEASE.ja.md
- RELEASE.md
- _config.yml
- index.html
- offline-rendering.html
- streaming.html
- styles.css
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
- dist/esm/event-scheduler.js
- dist/esm/event-scheduler.mjs
- dist/esm/factories/effect-factory.d.ts
- dist/esm/factories/effect-factory.js
- dist/esm/factories/effect-factory.mjs
- dist/esm/factories/instrument-factory.d.ts
- dist/esm/factories/instrument-factory.js
- dist/esm/factories/instrument-factory.mjs
- dist/esm/index.d.ts
- dist/esm/index.js
- dist/esm/index.mjs
- dist/esm/ndjson-streaming.d.ts
- dist/esm/ndjson-streaming.js
- dist/esm/ndjson-streaming.mjs
- dist/esm/node-factory.d.ts
- dist/esm/node-factory.js
- dist/esm/node-factory.mjs
- dist/esm/offline-renderer.d.ts
- dist/esm/offline-renderer.js
- dist/esm/offline-renderer.mjs
- dist/esm/sequencer-nodes.d.ts
- dist/esm/sequencer-nodes.js
- dist/esm/sequencer-nodes.mjs
- dist/esm/streaming/event-processor.d.ts
- dist/esm/streaming/event-processor.js
- dist/esm/streaming/event-processor.mjs
- dist/esm/streaming/playback-state.d.ts
- dist/esm/streaming/playback-state.js
- dist/esm/streaming/playback-state.mjs
- dist/esm/types.d.ts
- dist/esm/types.js
- dist/esm/types.mjs
- dist/esm/utils/time-parser.d.ts
- dist/esm/utils/time-parser.js
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
- index.html
- issue-notes/100.md
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
## [Issue #97](../issue-notes/97.md): demoが、demo/ にdeployされてしまっておりuserが混乱した。ほかのcat2151のリポジトリ同様、プロジェクトルートにdeployとする
[issue-notes/97.md](https://github.com/cat2151/tonejs-json-sequencer/blob/main/issue-notes/97.md)

...
ラベル: good first issue
--- issue-notes/97.md の内容 ---

```markdown
# issue demoが、demo/ にdeployされてしまっておりuserが混乱した。ほかのcat2151のリポジトリ同様、プロジェクトルートにdeployとする #97
[issues #97](https://github.com/cat2151/tonejs-json-sequencer/issues/97)



```

## [Issue #90](../issue-notes/90.md): 直近でtempo（BPM）等が未実装だったように、未実装な要素を洗い出して、README.ja.mdにロードマップとして反映する
[issue-notes/90.md](https://github.com/cat2151/tonejs-json-sequencer/blob/main/issue-notes/90.md)

...
ラベル: 
--- issue-notes/90.md の内容 ---

```markdown
# issue 直近でtempo（BPM）等が未実装だったように、未実装な要素を洗い出して、README.ja.mdにロードマップとして反映する #90
[issues #90](https://github.com/cat2151/tonejs-json-sequencer/issues/90)



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

## [Issue #88](../issue-notes/88.md): JSONで、指定したnodeの音量を変更できるようにする
[issue-notes/88.md](https://github.com/cat2151/tonejs-json-sequencer/blob/main/issue-notes/88.md)

...
ラベル: good first issue
--- issue-notes/88.md の内容 ---

```markdown
# issue JSONで、指定したnodeの音量を変更できるようにする #88
[issues #88](https://github.com/cat2151/tonejs-json-sequencer/issues/88)



```

## [Issue #87](../issue-notes/87.md): tempo（BPM）をJSONで指定できるようにする
[issue-notes/87.md](https://github.com/cat2151/tonejs-json-sequencer/blob/main/issue-notes/87.md)

...
ラベル: good first issue
--- issue-notes/87.md の内容 ---

```markdown
# issue tempo（BPM）をJSONで指定できるようにする #87
[issues #87](https://github.com/cat2151/tonejs-json-sequencer/issues/87)



```

## ドキュメントで言及されているファイルの内容
### .github/actions-tmp/README.ja.md
```md
{% raw %}
# GitHub Actions 共通ワークフロー集

このリポジトリは、**複数プロジェクトで使い回せるGitHub Actions共通ワークフロー集**です

<p align="left">
  <a href="README.ja.md"><img src="https://img.shields.io/badge/🇯🇵-Japanese-red.svg" alt="Japanese"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/🇺🇸-English-blue.svg" alt="English"></a>
</p>

# 3行で説明
- 🚀 プロジェクトごとのGitHub Actions管理をもっと楽に
- 🔗 共通化されたワークフローで、どのプロジェクトからも呼ぶだけでOK
- ✅ メンテは一括、プロジェクト開発に集中できます

## Quick Links
| 項目 | リンク |
|------|--------|
| 📖 プロジェクト概要 | [generated-docs/project-overview.md](generated-docs/project-overview.md) |
| 📖 コールグラフ | [generated-docs/callgraph.html](https://cat2151.github.io/github-actions/generated-docs/callgraph.html) |
| 📊 開発状況 | [generated-docs/development-status.md](generated-docs/development-status.md) |

# notes
- まだ共通化の作業中です
- まだワークフロー内容を改善中です

※README.md は README.ja.md を元にGeminiの翻訳でGitHub Actionsで自動生成しています

{% endraw %}
```

### README.ja.md
```md
{% raw %}
# tonejs-json-sequencer

<p align="left">
  <a href="https://deepwiki.com/cat2151/tonejs-json-sequencer"><img src="https://img.shields.io/badge/DeepWiki-Documentation-blue?logo=book" alt="DeepWiki"></a>
  <a href="README.ja.md"><img src="https://img.shields.io/badge/🇯🇵-Japanese-red.svg" alt="Japanese"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/🇺🇸-English-blue.svg" alt="English"></a>
  <a href="https://cat2151.github.io/tonejs-json-sequencer/index.html"><img src="https://img.shields.io/badge/🚀-Live%20Demo-brightgreen.svg" alt="Demo"></a>
  <a href="https://cat2151.github.io/tonejs-json-sequencer/streaming.html"><img src="https://img.shields.io/badge/🎵-Streaming%20Demo-orange.svg" alt="Streaming Demo"></a>
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

### .github/actions-tmp/issue-notes/8.md
```md
{% raw %}
# issue 関数コールグラフhtmlビジュアライズ生成の対象ソースファイルを、呼び出し元ymlで指定できるようにする #8
[issues #8](https://github.com/cat2151/github-actions/issues/8)

# これまでの課題
- 以下が決め打ちになっていた
```
  const allowedFiles = [
    'src/main.js',
    'src/mml2json.js',
    'src/play.js'
  ];
```

# 対策
- 呼び出し元ymlで指定できるようにする

# agent
- agentにやらせることができれば楽なので、初手agentを試した
- 失敗
    - ハルシネーションしてscriptを大量破壊した
- 分析
    - 修正対象scriptはagentが生成したもの
    - 低品質な生成結果でありソースが巨大
    - ハルシネーションで破壊されやすいソース
    - AIの生成したソースは、必ずしもAIフレンドリーではない

# 人力リファクタリング
- 低品質コードを、最低限agentが扱えて、ハルシネーションによる大量破壊を防止できる内容、にする
- 手短にやる
    - そもそもビジュアライズは、agentに雑に指示してやらせたもので、
    - 今後別のビジュアライザを選ぶ可能性も高い
    - 今ここで手間をかけすぎてコンコルド効果（サンクコストバイアス）を増やすのは、project群をトータルで俯瞰して見たとき、損
- 対象
    - allowedFiles のあるソース
        - callgraph-utils.cjs
            - たかだか300行未満のソースである
            - この程度でハルシネーションされるのは予想外
            - やむなし、リファクタリングでソース分割を進める

# agentに修正させる
## prompt
```
allowedFilesを引数で受け取るようにしたいです。
ないならエラー。
最終的に呼び出し元すべてに波及して修正したいです。

呼び出し元をたどってエントリポイントも見つけて、
エントリポイントにおいては、
引数で受け取ったjsonファイル名 allowedFiles.js から
jsonファイル allowedFiles.jsonの内容をreadして
変数 allowedFilesに格納、
後続処理に引き渡す、としたいです。

まずplanしてください。
planにおいては、修正対象のソースファイル名と関数名を、呼び出し元を遡ってすべて特定し、listしてください。
```

# 修正が順調にできた
- コマンドライン引数から受け取る作りになっていなかったので、そこだけ指示して修正させた
- yml側は人力で修正した

# 他のリポジトリから呼び出した場合にバグらないよう修正する
- 気付いた
    - 共通ワークフローとして他のリポジトリから使った場合はバグるはず。
        - ymlから、共通ワークフロー側リポジトリのcheckoutが漏れているので。
- 他のyml同様に修正する
- あわせて全体にymlをリファクタリングし、修正しやすくし、今後のyml読み書きの学びにしやすくする

# local WSL + act : test green

# closeとする
- もし生成されたhtmlがNGの場合は、別issueとするつもり

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

### issue-notes/87.md
```md
{% raw %}
# issue tempo（BPM）をJSONで指定できるようにする #87
[issues #87](https://github.com/cat2151/tonejs-json-sequencer/issues/87)



{% endraw %}
```

### issue-notes/88.md
```md
{% raw %}
# issue JSONで、指定したnodeの音量を変更できるようにする #88
[issues #88](https://github.com/cat2151/tonejs-json-sequencer/issues/88)



{% endraw %}
```

### issue-notes/89.md
```md
{% raw %}
# issue （人力）streamingのtestをする #89
[issues #89](https://github.com/cat2151/tonejs-json-sequencer/issues/89)



{% endraw %}
```

### issue-notes/90.md
```md
{% raw %}
# issue 直近でtempo（BPM）等が未実装だったように、未実装な要素を洗い出して、README.ja.mdにロードマップとして反映する #90
[issues #90](https://github.com/cat2151/tonejs-json-sequencer/issues/90)



{% endraw %}
```

### issue-notes/97.md
```md
{% raw %}
# issue demoが、demo/ にdeployされてしまっておりuserが混乱した。ほかのcat2151のリポジトリ同様、プロジェクトルートにdeployとする #97
[issues #97](https://github.com/cat2151/tonejs-json-sequencer/issues/97)



{% endraw %}
```

## 最近の変更（過去7日間）
### コミット履歴:
832d29f Merge pull request #101 from cat2151/copilot/debug-loop-timing-visualization
680ea06 Fix timing drift calculation and improve timing visualization accuracy
87163dd Add documentation for timing visualization feature in issue notes
8db500c Add enhanced timing visualization to streaming demo for モタり (timing delay) detection
1569b8a Initial plan
139d793 Merge pull request #99 from cat2151/copilot/remove-streaming-demo-loop
a0a0bee Add issue note for #100 [auto]
49a8a0b Set streaming demo defaults: loop on, 0s wait, debounce mode
99c9cf0 Initial plan
ebb58ba Add issue note for #98 [auto]

### 変更されたファイル:
offline-rendering.html
streaming.html
dist/cjs/offline-renderer.d.ts
dist/cjs/offline-renderer.js
dist/cjs/streaming/event-processor.js
dist/cjs/utils/time-parser.d.ts
dist/cjs/utils/time-parser.js
dist/demo/offline-rendering.js
dist/demo/streaming.js
dist/esm/event-scheduler.js
dist/esm/factories/effect-factory.js
dist/esm/factories/instrument-factory.js
dist/esm/index.js
dist/esm/ndjson-streaming.js
dist/esm/node-factory.js
dist/esm/offline-renderer.d.ts
dist/esm/offline-renderer.js
dist/esm/offline-renderer.mjs
dist/esm/sequencer-nodes.js
dist/esm/streaming/event-processor.js
dist/esm/streaming/event-processor.mjs
dist/esm/streaming/playback-state.js
dist/esm/types.js
dist/esm/utils/time-parser.d.ts
dist/esm/utils/time-parser.js
dist/esm/utils/time-parser.mjs
dist/offline-renderer.d.ts
dist/offline-renderer.js
dist/streaming/event-processor.js
dist/utils/time-parser.d.ts
dist/utils/time-parser.js
issue-notes/100.md
issue-notes/97.md
issue-notes/98.md
src/demo/offline-rendering.ts
src/demo/streaming.ts
src/ndjson-streaming.ts
src/offline-renderer.ts
src/streaming/event-processor.ts
src/utils/time-parser.ts


---
Generated at: 2026-02-04 07:13:44 JST

Last updated: 2026-03-04

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
- .github/actions-tmp/.github/workflows/call-check-large-files.yml
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
- .github/actions-tmp/.github_automation/check-large-files/check-large-files.toml.default
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
- .github/actions-tmp/issue-notes/44.md
- .github/actions-tmp/issue-notes/52.md
- .github/actions-tmp/issue-notes/7.md
- .github/actions-tmp/issue-notes/8.md
- .github/actions-tmp/issue-notes/9.md
- .github/actions-tmp/package-lock.json
- .github/actions-tmp/package.json
- .github/actions-tmp/src/main.js
- .github/docs/TRANSLATION_SETUP.md
- .github/scripts/translate-readme.js
- .github/workflows/call-callgraph.yml
- .github/workflows/call-check-large-files.yml
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
- issue-notes/180.md
- issue-notes/185.md
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
## [Issue #186](../issue-notes/186.md): Fix TimeParser BPM not syncing after `set` event in NDJSONStreamingPlayer
- [x] Investigate root cause of issue 182 (playback position lines still misaligned in BPM180 demo)
- [x] Add `updateBPM` method to `TimeParser` to allow syncing BPM after `set` events are processed
- [x] In `NDJSONStreamingPlayer.initializePlayback`, sync `TimeParser` BPM from `Tone.Transport.bpm.v...
ラベル: 
--- issue-notes/186.md の内容 ---

```markdown

```

## [Issue #185](../issue-notes/185.md): issue 182が解決していない
[issue-notes/185.md](https://github.com/cat2151/tonejs-json-sequencer/blob/main/issue-notes/185.md)

...
ラベル: 
--- issue-notes/185.md の内容 ---

```markdown
# issue issue 182が解決していない #185
[issues #185](https://github.com/cat2151/tonejs-json-sequencer/issues/185)



```

## [Issue #184](../issue-notes/184.md): 大きなファイルの検出: 3個のファイルが500行を超えています
⚠️ 巨大ファイルが検知されていますがテストが見つかりません。まずテストを実装し、リファクタリング前後で結果を確認してください。

以下のファイルが500行を超えています。リファクタリングを検討してください。

## 検出されたファイル

| ファイル | 行数 | 超過行数 |
|---------|------|----------|
| `src/demo/streaming.ts` | 820 | +320 |
| `src/demo/sequences/effectSequences.ts` | 811 | +311 |
| `src/ndjson-streaming.ts` | 6...
ラベル: refactoring, code-quality, automated
--- issue-notes/184.md の内容 ---

```markdown

```

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

### issue-notes/185.md
```md
{% raw %}
# issue issue 182が解決していない #185
[issues #185](https://github.com/cat2151/tonejs-json-sequencer/issues/185)



{% endraw %}
```

### issue-notes/89.md
```md
{% raw %}
# issue （人力）streamingのtestをする #89
[issues #89](https://github.com/cat2151/tonejs-json-sequencer/issues/89)



{% endraw %}
```

### src/demo/sequences/effectSequences.ts
```ts
{% raw %}
// Effect demo sequences
import type { SequenceEvent } from '../demo-types.js';
import type { SequenceDefinition } from '../sequenceLoader.js';

export const sequenceDefinitions: SequenceDefinition[] = [
  // === Effect Demos ===
  {
    name: "Reverb",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "Reverb",
        "args": [2]
      },
      {
        "eventType": "connect",
        "nodeId": 0,
        "connectTo": 1
      },
      {
        "eventType": "connect",
        "nodeId": 1,
        "connectTo": "toDestination"
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C4", "8n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["E4", "8n", "+96i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "8n", "+192i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C5", "4n", "+288i"]
      }
    ]
  },
  {
    name: "Freeverb",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "Freeverb",
        "args": [0.8, 5000]
      },
      {
        "eventType": "connect",
        "nodeId": 0,
        "connectTo": 1
      },
      {
        "eventType": "connect",
        "nodeId": 1,
        "connectTo": "toDestination"
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C4", "8n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["E4", "8n", "+96i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "8n", "+192i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C5", "4n", "+288i"]
      }
    ]
  },
  {
    name: "JCReverb",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "JCReverb",
        "args": [0.5]
      },
      {
        "eventType": "connect",
        "nodeId": 0,
        "connectTo": 1
      },
      {
        "eventType": "connect",
        "nodeId": 1,
        "connectTo": "toDestination"
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C4", "8n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["E4", "8n", "+96i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "8n", "+192i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C5", "4n", "+288i"]
      }
    ]
  },
  {
    name: "Chorus",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "Chorus",
        "args": [4, 2.5, 0.5]
      },
      {
        "eventType": "connect",
        "nodeId": 0,
        "connectTo": 1
      },
      {
        "eventType": "connect",
        "nodeId": 1,
        "connectTo": "toDestination"
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C4", "2n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["E4", "2n", "+192i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "2n", "+384i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C5", "1n", "+576i"]
      }
    ]
  },
  {
    name: "Phaser",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "Phaser",
        "args": [0.5, 3, 350]
      },
      {
        "eventType": "connect",
        "nodeId": 0,
        "connectTo": 1
      },
      {
        "eventType": "connect",
        "nodeId": 1,
        "connectTo": "toDestination"
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C4", "2n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["E4", "2n", "+192i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "2n", "+384i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C5", "1n", "+576i"]
      }
    ]
  },
  {
    name: "Tremolo",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "Tremolo",
        "args": [9, 0.75]
      },
      {
        "eventType": "connect",
        "nodeId": 0,
        "connectTo": 1
      },
      {
        "eventType": "connect",
        "nodeId": 1,
        "connectTo": "toDestination"
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C4", "1n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["E4", "1n", "+384i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "1n", "+768i"]
      }
    ]
  },
  {
    name: "Vibrato",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "Vibrato",
        "args": [5, 0.1]
      },
      {
        "eventType": "connect",
        "nodeId": 0,
        "connectTo": 1
      },
      {
        "eventType": "connect",
        "nodeId": 1,
        "connectTo": "toDestination"
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C4", "1n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["E4", "1n", "+384i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "1n", "+768i"]
      }
    ]
  },
  {
    name: "AutoFilter",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "AutoFilter",
        "args": [4]
      },
      {
        "eventType": "connect",
        "nodeId": 0,
        "connectTo": 1
      },
      {
        "eventType": "connect",
        "nodeId": 1,
        "connectTo": "toDestination"
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C4", "1n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["E4", "1n", "+384i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "1n", "+768i"]
      }
    ]
  },
  {
    name: "AutoPanner",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "AutoPanner",
        "args": [4]
      },
      {
        "eventType": "connect",
        "nodeId": 0,
        "connectTo": 1
      },
      {
        "eventType": "connect",
        "nodeId": 1,
        "connectTo": "toDestination"
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C4", "1n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["E4", "1n", "+384i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "1n", "+768i"]
      }
    ]
  },
  {
    name: "AutoWah",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "AutoWah",
        "args": [50, 6, -30]
      },
      {
        "eventType": "connect",
        "nodeId": 0,
        "connectTo": 1
      },
      {
        "eventType": "connect",
        "nodeId": 1,
        "connectTo": "toDestination"
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C4", "8n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["E4", "8n", "+96i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "8n", "+192i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C5", "4n", "+288i"]
      }
    ]
  },
  {
    name: "FeedbackDelay",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "FeedbackDelay",
        "args": ["8n", 0.5]
      },
      {
        "eventType": "connect",
        "nodeId": 0,
        "connectTo": 1
      },
      {
        "eventType": "connect",
        "nodeId": 1,
        "connectTo": "toDestination"
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C4", "8n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["E4", "8n", "+192i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "8n", "+384i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C5", "4n", "+576i"]
      }
    ]
  },
  {
    name: "PingPongDelay",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "PingPongDelay",
        "args": ["8n", 0.3]
      },
      {
        "eventType": "connect",
        "nodeId": 0,
        "connectTo": 1
      },
      {
        "eventType": "connect",
        "nodeId": 1,
        "connectTo": "toDestination"
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C4", "8n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["E4", "8n", "+192i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "8n", "+384i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C5", "4n", "+576i"]
      }
    ]
  },
  {
    name: "Distortion",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "Distortion",
        "args": [0.8]
      },
      {
        "eventType": "connect",
        "nodeId": 0,
        "connectTo": 1
      },
      {
        "eventType": "connect",
        "nodeId": 1,
        "connectTo": "toDestination"
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C3", "4n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["E3", "4n", "+192i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G3", "4n", "+384i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C4", "2n", "+576i"]
      }
    ]
  },
  {
    name: "BitCrusher",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "BitCrusher",
        "args": [4]
      },
      {
        "eventType": "connect",
        "nodeId": 0,
        "connectTo": 1
      },
      {
        "eventType": "connect",
        "nodeId": 1,
        "connectTo": "toDestination"
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C4", "8n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["E4", "8n", "+96i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "8n", "+192i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C5", "4n", "+288i"]
      }
    ]
  },
  {
    name: "Chebyshev",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "Chebyshev",
        "args": [50]
      },
      {
        "eventType": "connect",
        "nodeId": 0,
        "connectTo": 1
      },
      {
        "eventType": "connect",
        "nodeId": 1,
        "connectTo": "toDestination"
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C4", "4n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["E4", "4n", "+192i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "4n", "+384i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C5", "2n", "+576i"]
      }
    ]
  },
  {
    name: "PitchShift",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "PitchShift",
        "args": [4]
      },
      {
        "eventType": "connect",
        "nodeId": 0,
        "connectTo": 1
      },
      {
        "eventType": "connect",
        "nodeId": 1,
        "connectTo": "toDestination"
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C4", "4n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["E4", "4n", "+192i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "4n", "+384i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C5", "2n", "+576i"]
      }
    ]
  },
  {
    name: "FrequencyShifter",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "FrequencyShifter",
        "args": [42]
      },
      {
        "eventType": "connect",
        "nodeId": 0,
        "connectTo": 1
      },
      {
        "eventType": "connect",
        "nodeId": 1,
        "connectTo": "toDestination"
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C4", "1n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["E4", "1n", "+384i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "1n", "+768i"]
      }
    ]
  },
  {
    name: "StereoWidener",
    data: [
      {
        "eventType": "createNode",
        "nodeId": 0,
        "nodeType": "Synth"
      },
      {
        "eventType": "createNode",
        "nodeId": 1,
        "nodeType": "StereoWidener",
        "args": [0.5]
      },
      {
        "eventType": "connect",
        "nodeId": 0,
        "connectTo": 1
      },
      {
        "eventType": "connect",
        "nodeId": 1,
        "connectTo": "toDestination"
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C4", "4n", "+0i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["E4", "4n", "+192i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["G4", "4n", "+384i"]
      },
      {
        "eventType": "triggerAttackRelease",
        "nodeId": 0,
        "args": ["C5", "2n", "+576i"]
      }
    ]
  },

];

{% endraw %}
```

### src/demo/streaming.ts
```ts
{% raw %}
// Tone.js JSON Sequencer - NDJSON Streaming Demo
import type { SequenceEvent } from './demo-types.js';
import { loadAllSequences } from './sequenceLoader.js';
// @ts-ignore - Using built library
import { SequencerNodes, NDJSONStreamingPlayer, parseNDJSON, type EventScheduledInfo } from '../../dist/index.mjs';

interface PlaybackNoteBlock {
  start: number;
  duration: number;
  noteNumber: number;
  nodeId: number;
}

interface PlaybackTrackData {
  nodeId: number;
  nodeLabel: string;
  minNote: number;
  maxNote: number;
  notes: PlaybackNoteBlock[];
}

class StreamingDemo {
  private player: NDJSONStreamingPlayer | null = null;
  private nodes = new SequencerNodes();
  private sequences = loadAllSequences();
  private debugMessages: string[] = [];
  private maxDebugMessages = 100;
  private debounceTimer: number | null = null;
  private updateMode: 'manual' | 'debounce' = 'debounce';
  private readonly DEBOUNCE_DELAY_MS = 1000;
  private timingStats = this.createInitialTimingStats();
  private eventLineMap: number[] = [];
  private currentLineIndicator: HTMLElement | null = null;
  private numberedNDJSONTextarea: HTMLTextAreaElement | null = null;
  private playbackTrackContainer: HTMLDivElement | null = null;
  private playbackTrackLines: Map<number, HTMLDivElement> = new Map();
  private playbackTrackBodies: Map<number, HTMLDivElement> = new Map();
  private playbackDurationSeconds = 0;
  private playbackLoopEnabled = false;
  private playbackLoopWaitSeconds = 0;
  private playbackStartTime: number | null = null;
  private playbackAnimationFrameId: number | null = null;
  private readonly EVENT_FLASH_DURATION_MS = 200;
  private readonly PLAYBACK_LOOKAHEAD_SECONDS = 0.05;

  constructor() {
    this.initializeUI();
    this.initializeCollapsibleSections();
    this.loadInitialSequence();
  }

  private createInitialTimingStats() {
    return {
      totalEvents: 0,
      onTimeEvents: 0,
      lateEvents: 0,
      earlyEvents: 0,
      loopCount: 0,
      lastLoopStatus: 'N/A',
      lastLoopDriftMs: null as number | null
    };
  }

  private initializeUI(): void {
    // Populate sequence selector
    const selector = document.getElementById('sequenceSelector') as HTMLSelectElement;
    this.sequences.forEach((seq, index) => {
      const option = document.createElement('option');
      option.value = index.toString();
      option.textContent = seq.name;
      selector.appendChild(option);
    });

    // Play button
    document.getElementById('playButton')?.addEventListener('click', () => {
      this.play();
    });

    // Stop button
    document.getElementById('stopButton')?.addEventListener('click', () => {
      this.stop();
    });

    // Sequence selector change - immediately play the selected sequence for easier debugging
    selector.addEventListener('change', async () => {
      // Stop current playback if any, then load and play the new sequence
      if (this.player && this.player.playing) {
        this.stop();
      }
      this.loadSelectedSequence();
      // Auto-play when selecting a new sequence for easier debugging
      try {
        await this.play();
      } catch (error) {
        console.error('Error during auto-play:', error);
      }
    });

    // Loop checkbox change
    const loopCheckboxElement = document.getElementById('loopCheckbox') as HTMLInputElement | null;
    loopCheckboxElement?.addEventListener('change', () => {
      this.playbackLoopEnabled = loopCheckboxElement.checked;
      // If playing, restart with new loop setting
      if (this.player && this.player.playing) {
        this.stop();
        this.play();
      }
    });
    this.playbackLoopEnabled = loopCheckboxElement?.checked ?? false;

    // Debug checkbox change
    document.getElementById('debugCheckbox')?.addEventListener('change', (e) => {
      const enabled = (e.target as HTMLInputElement).checked;
      const debugOutput = document.getElementById('debugOutput');
      const timingVisualization = document.getElementById('timingVisualization');
      if (debugOutput) {
        debugOutput.style.display = enabled ? 'block' : 'none';
      }
      if (timingVisualization) {
        timingVisualization.style.display = enabled ? 'block' : 'none';
      }
      if (!enabled) {
        this.clearDebugOutput();
      }
      // If playing, restart with new debug setting
      if (this.player && this.player.playing) {
        this.stop();
        this.play();
      }
    });

    // Clear debug button
    document.getElementById('clearDebugButton')?.addEventListener('click', () => {
      this.clearDebugOutput();
    });

    // Update mode radio buttons
    document.getElementById('updateModeManual')?.addEventListener('change', (e) => {
      if ((e.target as HTMLInputElement).checked) {
        this.updateMode = 'manual';
        // Clear any pending debounce timer when switching to manual mode
        this.clearDebounceTimer();
      }
    });

    document.getElementById('updateModeDebounce')?.addEventListener('change', (e) => {
      if ((e.target as HTMLInputElement).checked) {
        this.updateMode = 'debounce';
      }
    });

    // Textarea change (live editing)
    const textarea = document.getElementById('sequenceEditor') as HTMLTextAreaElement;
    this.currentLineIndicator = document.getElementById('currentLineIndicator');
    this.numberedNDJSONTextarea = document.getElementById('sequenceEditorDebug') as HTMLTextAreaElement | null;
    this.playbackTrackContainer = document.getElementById('playbackTrackContainer') as HTMLDivElement | null;
    this.updateCurrentLineIndicator(null);
    this.syncHighlightLines();
    
    // Input event handler for debounce mode
    textarea.addEventListener('input', () => {
      this.syncHighlightLines();
      if (this.updateMode === 'debounce') {
        this.onSequenceEditDebounced();
      }
    });

    // Keyboard shortcuts for manual mode (CTRL+S and SHIFT+ENTER)
    textarea.addEventListener('keydown', (e) => {
      if (this.updateMode === 'manual') {
        // CTRL+S (prevent default save behavior)
        if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
          e.preventDefault();
          this.onSequenceEdit();
        }
        // SHIFT+ENTER
        else if (e.shiftKey && e.key === 'Enter') {
          e.preventDefault();
          this.onSequenceEdit();
        }
      }
    });
  }

  private initializeCollapsibleSections(): void {
    // About button
    const aboutButton = document.getElementById('aboutButton');
    const aboutContent = document.getElementById('aboutContent');
    aboutButton?.addEventListener('click', () => {
      if (aboutContent && aboutButton) {
        const isExpanded = aboutContent.classList.toggle('active');
        aboutButton.setAttribute('aria-expanded', String(isExpanded));
      }
    });

    // Usage button
    const usageButton = document.getElementById('usageButton');
    const usageContent = document.getElementById('usageContent');
    usageButton?.addEventListener('click', () => {
      if (usageContent && usageButton) {
        const isExpanded = usageContent.classList.toggle('active');
        usageButton.setAttribute('aria-expanded', String(isExpanded));
      }
    });
  }

  private loadInitialSequence(): void {
    if (this.sequences.length > 0) {
      this.loadSelectedSequence();
    }
  }

  private loadSelectedSequence(): void {
    const selector = document.getElementById('sequenceSelector') as HTMLSelectElement;
    const index = parseInt(selector.value);
    const sequence = this.sequences[index];

    if (sequence) {
      const ndjson = this.sequenceToNDJSON(sequence.data);
      const textarea = document.getElementById('sequenceEditor') as HTMLTextAreaElement;
      textarea.value = ndjson;
      this.eventLineMap = this.buildEventLineMap(ndjson);
      this.syncHighlightLines(ndjson);
    }
  }

  private sequenceToNDJSON(sequence: SequenceEvent[]): string {
    return sequence.map(event => JSON.stringify(event)).join('\n');
  }

  private getNDJSONFromTextarea(): string {
    const textarea = document.getElementById('sequenceEditor') as HTMLTextAreaElement;
    return textarea.value;
  }

  private async play(): Promise<void> {
    try {
      // Ensure audio context is started
      await Tone.start();

      const loopCheckbox = document.getElementById('loopCheckbox') as HTMLInputElement;
      const loop = loopCheckbox.checked;
      this.playbackLoopEnabled = loop;
      
      const debugCheckbox = document.getElementById('debugCheckbox') as HTMLInputElement;
      const debug = debugCheckbox.checked;

      // Loop wait is fixed to 0 seconds
      const loopWaitSeconds = 0;
      this.playbackLoopWaitSeconds = loopWaitSeconds;

      // Create player only if it doesn't exist or isn't playing
      if (!this.player || !this.player.playing) {
        // Dispose old nodes and create fresh instance
        this.nodes.disposeAll();
        this.nodes = new SequencerNodes();
        
        this.player = new NDJSONStreamingPlayer(Tone, this.nodes, {
          lookaheadMs: 50,
          loop: loop,
          loopWaitSeconds: loopWaitSeconds,
          debug: debug,
          onDebug: (message: string, data?: any) => this.handleDebugMessage(message, data),
          onEventScheduled: (info: EventScheduledInfo) => this.handleEventScheduled(info),
          onLoopComplete: () => {
            this.updateStatus('再生中（ループ）');
          }
        });
      }

      // Get NDJSON from textarea
      const ndjson = this.getNDJSONFromTextarea();
      this.eventLineMap = this.buildEventLineMap(ndjson);
      this.syncHighlightLines(ndjson);
      const events = parseNDJSON(ndjson);

      // Start playback
      await this.player.start(events);
      // Rebuild viewer after player.start() so time values (e.g. ticks→seconds) use the
      // BPM that was applied by the sequence's "set" event, not the pre-play default BPM.
      this.syncHighlightLines(ndjson);
      this.startPlaybackPositionUpdates();
      
      this.updateStatus(loop ? '再生中（ループ有効）' : '再生中');
      
      // Disable play button, enable stop button
      (document.getElementById('playButton') as HTMLButtonElement).disabled = true;
      (document.getElementById('stopButton') as HTMLButtonElement).disabled = false;
    } catch (error) {
      console.error('Error during playback:', error);
      this.updateStatus('エラー: ' + (error as Error).message);
      alert('再生の開始に失敗しました。詳細はコンソールを確認してください。');
    }
  }

  private stop(): void {
    if (this.player) {
      this.player.stop();
      this.player = null;
    }

    this.stopPlaybackPositionUpdates();
    
    // Clear any pending debounce timer
    this.clearDebounceTimer();
    
    // Dispose all nodes on stop
    this.nodes.disposeAll();
    
    this.updateStatus('停止中');
    this.updateCurrentLineIndicator(null);
    
    // Enable play button, disable stop button
    (document.getElementById('playButton') as HTMLButtonElement).disabled = false;
    (document.getElementById('stopButton') as HTMLButtonElement).disabled = true;
  }

  private onSequenceEdit(): void {
    // If playing, update the sequence in real-time
    if (this.player && this.player.playing) {
      try {
        const ndjson = this.getNDJSONFromTextarea();
        this.eventLineMap = this.buildEventLineMap(ndjson);
        this.syncHighlightLines(ndjson);
        const events = parseNDJSON(ndjson);
        this.player.start(events);
        this.updateStatus('再生中（ライブ編集）');
      } catch (error) {
        console.error('Error updating sequence:', error);
        // Don't stop playback on edit errors
      }
    }
  }

  private onSequenceEditDebounced(): void {
    // Clear existing timer
    this.clearDebounceTimer();

    // Set new timer for debounce
    this.debounceTimer = window.setTimeout(() => {
      this.onSequenceEdit();
      this.debounceTimer = null;
    }, this.DEBOUNCE_DELAY_MS);
  }

  private clearDebounceTimer(): void {
    if (this.debounceTimer !== null) {
      window.clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
  }

  private buildEventLineMap(ndjson: string): number[] {
    const lines = ndjson.split('\n');
    const map: number[] = [];
    let eventIndex = 0;
    
    lines.forEach((line, index) => {
      if (line.trim().length === 0) {
        return;
      }
      map[eventIndex] = index;
      eventIndex++;
    });

    return map;
  }

  private syncHighlightLines(ndjson?: string): void {
    const source = ndjson ?? this.getNDJSONFromTextarea();
    this.updateNumberedNDJSON(source);
    this.rebuildPlaybackViewer(source);
  }

  private updateNumberedNDJSON(ndjson?: string): void {
    if (!this.numberedNDJSONTextarea) {
      return;
    }

    const source = ndjson ?? this.getNDJSONFromTextarea();
    const lines = source.split('\n');
    const padding = Math.max(1, lines.length.toString().length);
    const numbered = lines
      .map((line, index) => `${String(index + 1).padStart(padding, ' ')}: ${line}`)
      .join('\n');

    this.numberedNDJSONTextarea.value = numbered;
  }

  private updateCurrentLineIndicator(lineIndex: number | null): void {
    if (!this.currentLineIndicator) {
      return;
    }

    this.currentLineIndicator.textContent = lineIndex === null
      ? '現在の演奏行: -'
      : `現在の演奏行: ${lineIndex + 1}`;
  }

  private updateCurrentLineFromEvent(eventIndex: number): void {
    const lineIndex = this.eventLineMap[eventIndex];
    this.updateCurrentLineIndicator(lineIndex ?? null);
  }

  private handleEventScheduled(info: EventScheduledInfo): void {
    this.updateCurrentLineFromEvent(info.eventIndex);
    this.flashPlaybackEvent(info);
  }

  private rebuildPlaybackViewer(ndjson: string): void {
    const container = this.playbackTrackContainer;
    if (!container) {
      return;
    }

    let events: SequenceEvent[];
    try {
      events = parseNDJSON(ndjson);
    } catch {
      container.innerHTML = '<div class="playback-viewer-empty">NDJSONのパースに失敗しました</div>';
      this.playbackTrackLines.clear();
      this.playbackTrackBodies.clear();
      this.playbackDurationSeconds = 0;
      return;
    }

    const { tracks, totalDuration } = this.buildPlaybackTracks(events);
    this.playbackDurationSeconds = totalDuration;
    container.innerHTML = '';
    this.playbackTrackLines.clear();
    this.playbackTrackBodies.clear();

    if (tracks.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'playback-viewer-empty';
      empty.textContent = 'triggerAttackReleaseイベントがありません';
      container.appendChild(empty);
      return;
    }

    tracks.forEach(track => {
      const wrapper = document.createElement('div');
      wrapper.className = 'playback-track';

      const label = document.createElement('div');
      label.className = 'playback-track-label';
      label.textContent = track.nodeLabel;
      wrapper.appendChild(label);

      const body = document.createElement('div');
      body.className = 'playback-track-body';

      const progressLine = document.createElement('div');
      progressLine.className = 'playback-progress-line';
      body.appendChild(progressLine);
      this.playbackTrackLines.set(track.nodeId, progressLine);
      this.playbackTrackBodies.set(track.nodeId, body);

      track.notes.forEach(note => {
        const noteEl = document.createElement('div');
        noteEl.className = 'playback-note';

        const leftPercent = this.playbackDurationSeconds > 0
          ? Math.max(0, Math.min(100, (note.start / this.playbackDurationSeconds) * 100))
          : 0;
        const widthPercent = this.playbackDurationSeconds > 0
          ? Math.max((note.duration / this.playbackDurationSeconds) * 100, 0.5)
          : 0;

        const noteRange = track.maxNote - track.minNote;
        const verticalRatio = noteRange === 0
          ? 0.5
          : (note.noteNumber - track.minNote) / noteRange;
        const topPercent = 100 - (verticalRatio * 100);

        noteEl.style.left = `${leftPercent}%`;
        noteEl.style.width = `${widthPercent}%`;
        noteEl.style.top = `${topPercent}%`;
        body.appendChild(noteEl);
      });

      wrapper.appendChild(body);
      container.appendChild(wrapper);
    });

    this.updatePlaybackPositionLine(0);
  }

  private buildPlaybackTracks(events: SequenceEvent[]): { tracks: PlaybackTrackData[]; totalDuration: number } {
    const trackMap = new Map<number, PlaybackTrackData>();
    const nodeTypeMap = new Map<number, string>();
    let maxEndTime = 0;
    let loopEndSeconds: number | null = null;

    events.forEach(event => {
      if (event.eventType === 'createNode') {
        nodeTypeMap.set(event.nodeId, event.nodeType);
        return;
      }

      if (event.eventType === 'loopEnd' && 'args' in event && Array.isArray(event.args) && event.args.length > 0) {
        const parsedLoopEnd = this.parseTimeValue(event.args[event.args.length - 1]);
        if (parsedLoopEnd !== null) {
          loopEndSeconds = loopEndSeconds === null ? parsedLoopEnd : Math.max(loopEndSeconds, parsedLoopEnd);
        }
        return;
      }

      if (event.eventType !== 'triggerAttackRelease' || !('args' in event) || !Array.isArray(event.args)) {
        return;
      }

      if (event.args.length < 3) {
        return;
      }

      const noteNumber = this.parseNoteNumber(event.args[0]);
      const duration = this.parseTimeValue(event.args[1]);
      const start = this.parseTimeValue(event.args[event.args.length - 1]);

      if (noteNumber === null || duration === null || start === null) {
        return;
      }

      const endTime = start + duration;
      maxEndTime = Math.max(maxEndTime, endTime);

      const existing = trackMap.get(event.nodeId);
      const label = nodeTypeMap.has(event.nodeId)
        ? `Node ${event.nodeId} (${nodeTypeMap.get(event.nodeId)})`
        : `Node ${event.nodeId}`;

      const track: PlaybackTrackData = existing ?? {
        nodeId: event.nodeId,
        nodeLabel: label,
        minNote: noteNumber,
        maxNote: noteNumber,
        notes: []
      };

      track.minNote = Math.min(track.minNote, noteNumber);
      track.maxNote = Math.max(track.maxNote, noteNumber);
      track.notes.push({ start, duration, noteNumber, nodeId: event.nodeId });
      trackMap.set(event.nodeId, track);
    });

    const tracks = Array.from(trackMap.values()).sort((a, b) => a.nodeId - b.nodeId);
    const totalDuration = loopEndSeconds !== null && loopEndSeconds > 0 ? loopEndSeconds : maxEndTime;

    return {
      tracks,
      totalDuration
    };
  }

  private parseNoteNumber(value: unknown): number | null {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === 'string') {
      const trimmed = value.trim();
      const numeric = Number(trimmed);
      if (Number.isFinite(numeric)) {
        return numeric;
      }

      try {
        const midi = Tone.Frequency(trimmed).toMidi();
        return Number.isFinite(midi) ? midi : null;
      } catch {
        return null;
      }
    }

    return null;
  }

  private parseTimeValue(value: unknown): number | null {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }

    if (typeof value !== 'string') {
      return null;
    }

    const trimmed = value.trim();
    const withoutPlus = trimmed.startsWith('+') ? trimmed.substring(1) : trimmed;

    try {
      const ticksSeconds = Tone.Ticks(withoutPlus).toSeconds();
      if (Number.isFinite(ticksSeconds)) {
        return ticksSeconds;
      }
    } catch {
      // Fall through
    }

    try {
      const seconds = Tone.Time(withoutPlus).toSeconds();
      if (Number.isFinite(seconds)) {
        return seconds;
      }
    } catch {
      // Fall through
    }

    const numeric = Number(withoutPlus);
    return Number.isFinite(numeric) ? numeric : null;
  }

  private getEventStartTime(event: SequenceEvent): number | null {
    if (!('args' in event) || !Array.isArray(event.args) || event.args.length === 0) {
      return null;
    }
    return this.parseTimeValue(event.args[event.args.length - 1]);
  }

  private startPlaybackPositionUpdates(): void {
    this.stopPlaybackPositionUpdates();
    this.playbackStartTime = Tone.now() + this.PLAYBACK_LOOKAHEAD_SECONDS;
    this.updatePlaybackProgressLineFromNow();
  }

  private stopPlaybackPositionUpdates(): void {
    if (this.playbackAnimationFrameId !== null) {
      cancelAnimationFrame(this.playbackAnimationFrameId);
      this.playbackAnimationFrameId = null;
    }
    this.playbackStartTime = null;
    this.updatePlaybackPositionLine(0);
  }

  private updatePlaybackProgressLineFromNow(): void {
    if (this.playbackStartTime === null || this.playbackDurationSeconds <= 0) {
      return;
    }

    const now = Tone.now();
    const elapsed = Math.max(0, now - this.playbackStartTime);
    const loopCycle = this.playbackDurationSeconds + this.playbackLoopWaitSeconds;
    const position = this.playbackLoopEnabled && loopCycle > 0
      ? elapsed % loopCycle
      : Math.min(elapsed, this.playbackDurationSeconds);

    this.updatePlaybackPositionLine(position);
    this.playbackAnimationFrameId = requestAnimationFrame(() => this.updatePlaybackProgressLineFromNow());
  }

  private updatePlaybackPositionLine(positionSeconds: number): void {
    if (this.playbackDurationSeconds <= 0) {
      this.playbackTrackLines.forEach(line => {
        line.style.left = '0%';
      });
      return;
    }

    const percent = Math.max(0, Math.min(100, (positionSeconds / this.playbackDurationSeconds) * 100));
    this.playbackTrackLines.forEach(line => {
      line.style.left = `${percent}%`;
    });
  }

  private flashPlaybackEvent(info: EventScheduledInfo): void {
    if (this.playbackDurationSeconds <= 0) {
      return;
    }

    const eventStartTime = this.getEventStartTime(info.event);
    const nodeId = info.event.nodeId;
    if (eventStartTime === null) {
      return;
    }
    const targetBody = this.playbackTrackBodies.get(nodeId);
    if (!targetBody) {
      return;
    }

    const loopCycle = this.playbackDurationSeconds + this.playbackLoopWaitSeconds;
    if (this.playbackStartTime === null) {
      const loopOffset = info.loopIteration * loopCycle;
      this.playbackStartTime = info.absoluteTime - eventStartTime - loopOffset;
    }

    const baseStart = this.playbackStartTime ?? info.absoluteTime;
    const elapsedFromStart = info.absoluteTime - baseStart;
    const relativeTime = this.playbackLoopEnabled && loopCycle > 0
      ? elapsedFromStart % loopCycle
      : elapsedFromStart;

    const percent = Math.max(0, Math.min(100, (relativeTime / this.playbackDurationSeconds) * 100));

    const flashLine = document.createElement('div');
    flashLine.className = 'playback-flash-line';
    flashLine.style.left = `${percent}%`;
    targetBody.appendChild(flashLine);

    window.setTimeout(() => {
      flashLine.remove();
    }, this.EVENT_FLASH_DURATION_MS);
  }

  private updateStatus(status: string): void {
    const statusElement = document.getElementById('status');
    if (statusElement) {
      statusElement.textContent = `ステータス: ${status}`;
    }
  }

  private handleDebugMessage(message: string, data?: any): void {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    let debugLine = `[${timestamp}] ${message}`;
    
    if (data !== undefined && data !== null && data !== '') {
      if (typeof data === 'object') {
        debugLine += ': ' + JSON.stringify(data);
      } else {
        debugLine += ': ' + data;
      }
    }

    // Parse timing information from debug messages
    if (message.includes('⚪') || message.includes('🔴') || message.includes('🟢')) {
      // Event scheduling message
      this.timingStats.totalEvents++;
      if (message.includes('⚪')) {
        this.timingStats.onTimeEvents++;
      } else if (message.includes('🔴')) {
        this.timingStats.lateEvents++;
      } else if (message.includes('🟢')) {
        this.timingStats.earlyEvents++;
      }
    } else if (message.includes('🔄') && message.includes('Loop')) {
      // Loop completion message
      if (data && typeof data === 'object') {
        this.timingStats.loopCount = data.currentLoop || 0;
        if (data.timingStatus) {
          this.timingStats.lastLoopStatus = data.timingStatus;
        }
        if (data.loopTimingDriftMs !== undefined) {
          this.timingStats.lastLoopDriftMs = parseFloat(data.loopTimingDriftMs);
        }
      }
    } else if (message.includes('🎵') && message.includes('Initializing')) {
      // Reset stats on playback initialization
      this.timingStats = this.createInitialTimingStats();
    }

    this.debugMessages.push(debugLine);
    
    // Keep only the last N messages
    if (this.debugMessages.length > this.maxDebugMessages) {
      this.debugMessages.shift();
    }

    this.updateDebugOutput();
    this.updateTimingVisualization();
  }

  private updateDebugOutput(): void {
    const debugOutput = document.getElementById('debugOutput');
    if (debugOutput) {
      debugOutput.textContent = this.debugMessages.join('\n');
      // Auto-scroll to bottom
      debugOutput.scrollTop = debugOutput.scrollHeight;
    }
  }

  private updateTimingVisualization(): void {
    const eventSchedulingStats = document.getElementById('eventSchedulingStats');
    const loopTimingStats = document.getElementById('loopTimingStats');
    
    if (eventSchedulingStats) {
      const total = this.timingStats.totalEvents;
      const onTime = this.timingStats.onTimeEvents;
      const late = this.timingStats.lateEvents;
      const early = this.timingStats.earlyEvents;
      
      const onTimePercent = total > 0 ? ((onTime / total) * 100).toFixed(1) : '0.0';
      const latePercent = total > 0 ? ((late / total) * 100).toFixed(1) : '0.0';
      const earlyPercent = total > 0 ? ((early / total) * 100).toFixed(1) : '0.0';
      
      eventSchedulingStats.innerHTML = `
        <div>総イベント数: ${total}</div>
        <div style="margin-top: 5px;">
          <div>⚪ 正常: ${onTime} (${onTimePercent}%)</div>
          <div>🔴 遅延: ${late} (${latePercent}%)</div>
          <div>🟢 早い: ${early} (${earlyPercent}%)</div>
        </div>
      `;
    }
    
    if (loopTimingStats) {
      const driftDisplay = this.timingStats.lastLoopDriftMs !== null
        ? `${this.timingStats.lastLoopDriftMs > 0 ? '+' : ''}${this.timingStats.lastLoopDriftMs.toFixed(2)}ms`
        : '-';
      
      loopTimingStats.innerHTML = `
        <div>ループ回数: ${this.timingStats.loopCount}</div>
        <div style="margin-top: 5px;">
          <div>ステータス: ${this.timingStats.lastLoopStatus}</div>
          <div>タイミングずれ: ${driftDisplay}</div>
        </div>
      `;
    }
  }

  private clearDebugOutput(): void {
    this.debugMessages = [];
    this.timingStats = this.createInitialTimingStats();
    this.updateDebugOutput();
    this.updateTimingVisualization();
  }
}

// Initialize demo when page loads
window.addEventListener('load', () => {
  new StreamingDemo();
});

{% endraw %}
```

### src/ndjson-streaming.ts
```ts
{% raw %}
// Tone.js JSON Sequencer - NDJSON Streaming Module
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer

import type * as ToneTypes from 'tone';
import type { SequenceEvent } from './types.js';
import type { SequencerNodes } from './sequencer-nodes.js';
import { TimeParser, type TimeParserConfig } from './utils/time-parser.js';
import { PlaybackState } from './streaming/playback-state.js';
import { EventProcessor } from './streaming/event-processor.js';

/**
 * Parse NDJSON string into array of events
 * @param ndjson - NDJSON string (newline-delimited JSON)
 * @returns Array of sequence events
 * @throws Error if any line fails to parse
 */
export function parseNDJSON(ndjson: string): SequenceEvent[] {
  const lines = ndjson.split('\n');
  const events: SequenceEvent[] = [];

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();

    // Skip empty or whitespace-only lines
    if (line.length === 0) {
      return;
    }

    try {
      const parsed = JSON.parse(line) as SequenceEvent;
      events.push(parsed);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      // Log detailed information for debugging
      console.error('Failed to parse NDJSON line:', {
        lineNumber: index + 1,
        lineContent: line,
        error,
      });

      // Surface a clear, user-facing error so invalid NDJSON can be fixed
      throw new Error(
        `Failed to parse NDJSON input at line ${index + 1}: ${errorMessage}`,
      );
    }
  });

  return events;
}

/**
 * Predicted scheduling information for an event
 */
export interface EventPrediction {
  eventIndex: number;
  eventType: string;
  timeNotation: string;  // Original time notation (e.g., "+192i", "4n")
  timeSeconds: number;    // Converted to seconds
  expectedScheduleTime: number;  // t0 + timeSeconds
  loopIteration: number;
}

/**
 * Information about a scheduled event
 */
export interface EventScheduledInfo {
  eventIndex: number;
  loopIteration: number;
  absoluteTime: number;
  event: SequenceEvent;
}

/**
 * Debug callback function type
 */
export type DebugCallback = (message: string, data?: any) => void;

/**
 * Configuration for NDJSON streaming player
 * 
 * Note: Timing-related properties (beatsPerMinute, ticksPerQuarter, etc.) are used
 * only for internal time format parsing (converting tick notation and bar:beat:subdivision
 * format to seconds). These do not affect global Tone.Transport settings.
 */
export interface NDJSONStreamingConfig {
  /** Lookahead time in milliseconds (default: 50ms) */
  lookaheadMs?: number;
  /** Whether to loop playback (default: false) */
  loop?: boolean;
  /** Wait time in seconds between loop iterations (default: 0.5) */
  loopWaitSeconds?: number;
  /** Callback when playback completes a loop iteration */
  onLoopComplete?: () => void;
  /** Ticks per quarter note for timing calculations (default: 192, Tone.js standard) */
  ticksPerQuarter?: number;
  /** Beats per minute for timing calculations (default: 120) */
  beatsPerMinute?: number;
  /** Beats per bar for time signature (default: 4) */
  beatsPerBar?: number;
  /** Subdivisions per beat (default: 4) */
  subdivisionsPerBeat?: number;
  /** Buffer time in seconds to add after last event (default: 1) */
  endBufferSeconds?: number;
  /** Enable debug mode for detailed logging (default: false) */
  debug?: boolean;
  /** Callback for debug messages (default: console.log) */
  onDebug?: DebugCallback;
  /** Callback when an event is scheduled (default: no-op) */
  onEventScheduled?: (info: EventScheduledInfo) => void;
}

/**
 * NDJSON Streaming Player
 * Processes events with lookahead timing and supports live editing and loop playback
 */
export class NDJSONStreamingPlayer {
  private static readonly SCHEDULE_TIME_TOLERANCE_SECONDS = 0.001; // 0.001s (1ms) tolerance for schedule time comparison
  
  private Tone: typeof ToneTypes;
  private nodes: SequencerNodes;
  private config: Required<NDJSONStreamingConfig>;
  private playbackState: PlaybackState;
  private timeParser: TimeParser;
  private eventProcessor: EventProcessor;
  private animationFrameId: number | null = null;
  private eventPredictions: Map<string, EventPrediction> = new Map(); // key: "loopIteration-eventIndex"

  constructor(
    Tone: typeof ToneTypes,
    nodes: SequencerNodes,
    config: NDJSONStreamingConfig = {}
  ) {
    this.Tone = Tone;
    this.nodes = nodes;
    this.config = {
      lookaheadMs: config.lookaheadMs ?? 50,
      loop: config.loop ?? false,
      loopWaitSeconds: config.loopWaitSeconds ?? 0.5,
      onLoopComplete: config.onLoopComplete ?? (() => {}),
      ticksPerQuarter: config.ticksPerQuarter ?? 192,
      beatsPerMinute: config.beatsPerMinute ?? 120,
      beatsPerBar: config.beatsPerBar ?? 4,
      subdivisionsPerBeat: config.subdivisionsPerBeat ?? 4,
      endBufferSeconds: config.endBufferSeconds ?? 1,
      debug: config.debug ?? false,
      onDebug: config.onDebug ?? ((msg, data) => console.log(`[DEBUG] ${msg}`, data ?? '')),
      onEventScheduled: config.onEventScheduled ?? (() => {})
    };

    this.playbackState = new PlaybackState();
    this.timeParser = new TimeParser({
      ticksPerQuarter: this.config.ticksPerQuarter,
      beatsPerMinute: this.config.beatsPerMinute,
      beatsPerBar: this.config.beatsPerBar,
      subdivisionsPerBeat: this.config.subdivisionsPerBeat
    });
    this.eventProcessor = new EventProcessor(this.Tone, this.nodes, this.timeParser);
  }

  /**
   * Log debug message if debug mode is enabled
   */
  private debug(message: string, data?: any): void {
    if (this.config.debug) {
      this.config.onDebug(message, data);
    }
  }

  /**
   * Check if an event is schedulable (i.e., not a setup/metadata event)
   */
  private isSchedulableEvent(event: SequenceEvent): boolean {
    return event.eventType !== 'createNode' && 
           event.eventType !== 'connect' && 
           event.eventType !== 'set' && 
           event.eventType !== 'loopEnd';
  }

  /**
   * Extract time notation from event args
   */
  private getTimeNotation(event: SequenceEvent): string {
    if ('args' in event && Array.isArray(event.args) && event.args.length > 0) {
      return String(event.args[event.args.length - 1]);
    }
    return 'unknown';
  }

  /**
   * Generate event scheduling predictions
   * Creates predictions for the first loop and the first event of the next loop
   */
  private generatePredictions(events: SequenceEvent[], startTime: number, sequenceDuration: number): void {
    this.eventPredictions.clear();
    const predictions: EventPrediction[] = [];

    // Generate predictions for first loop (loop 0)
    events.forEach((event, index) => {
      // Skip non-schedulable events
      if (!this.isSchedulableEvent(event)) {
        return;
      }

      const eventTime = this.eventProcessor.getEventTime(event);
      if (eventTime === null) return;

      const prediction: EventPrediction = {
        eventIndex: index,
        eventType: event.eventType,
        timeNotation: this.getTimeNotation(event),
        timeSeconds: eventTime,
        expectedScheduleTime: startTime + eventTime,
        loopIteration: 0
      };

      predictions.push(prediction);
      this.eventPredictions.set(`0-${index}`, prediction);
    });

    // Add prediction for first event of next loop (if loop mode enabled)
    if (this.config.loop && events.length > 0) {
      const firstSchedulableEvent = events.find(e => this.isSchedulableEvent(e));

      if (firstSchedulableEvent) {
        const firstEventIndex = events.indexOf(firstSchedulableEvent);
        const eventTime = this.eventProcessor.getEventTime(firstSchedulableEvent);
        
        if (eventTime !== null) {
          const loopOffset = sequenceDuration + this.config.loopWaitSeconds;
          const prediction: EventPrediction = {
            eventIndex: firstEventIndex,
            eventType: firstSchedulableEvent.eventType,
            timeNotation: this.getTimeNotation(firstSchedulableEvent),
            timeSeconds: eventTime,
            expectedScheduleTime: startTime + loopOffset + eventTime,
            loopIteration: 1
          };

          predictions.push(prediction);
          this.eventPredictions.set(`1-${firstEventIndex}`, prediction);
        }
      }
    }

    // Log predictions
    if (this.config.debug && predictions.length > 0) {
      this.debug('📋 === Event Scheduling Predictions ===');
      this.debug(`t0 (playback start + lookahead) = ${startTime.toFixed(3)}s`);
      this.debug('');
      this.debug('Expected schedule times:');
      
      predictions.forEach(pred => {
        const loopLabel = pred.loopIteration > 0 ? ` [Loop ${pred.loopIteration}]` : '';
        this.debug(
          `  Event #${pred.eventIndex} (${pred.eventType})${loopLabel}: ${pred.timeNotation} → ${pred.timeSeconds.toFixed(3)}s → t0+${pred.timeSeconds.toFixed(3)}s = ${pred.expectedScheduleTime.toFixed(3)}s`
        );
      });
      this.debug('');
    }
  }

  /**
   * Start or update the streaming playback
   * @param eventsOrNDJSON - Array of events or NDJSON string
   */
  async start(eventsOrNDJSON: SequenceEvent[] | string): Promise<void> {
    // Parse events if NDJSON string is provided
    const events = typeof eventsOrNDJSON === 'string'
      ? parseNDJSON(eventsOrNDJSON)
      : eventsOrNDJSON;

    // If not playing, initialize playback
    if (!this.playbackState.isPlaying) {
      await this.initializePlayback(events);
    } else {
      // If already playing, update events for live editing
      this.updateEvents(events);
    }
  }

  /**
   * Initialize playback
   */
  private async initializePlayback(events: SequenceEvent[]): Promise<void> {
    // Handle empty events array
    if (events.length === 0) {
      console.warn('No events to play');
      return;
    }

    this.debug('🎵 === Initializing Playback ===');
    this.debug('📊 Total events', events.length);

    // Set start time as current time + lookahead
    const startTime = this.Tone.now() + this.config.lookaheadMs / 1000;
    this.playbackState.start(events, startTime);

    this.debug('⏰ Start time', { 
      startTime: startTime.toFixed(3),
      currentTime: this.Tone.now().toFixed(3),
      lookaheadMs: this.config.lookaheadMs
    });

    // Create nodes and connections first
    await this.eventProcessor.createNodesAndConnections(
      events,
      this.playbackState.createdNodeIds
    );

    // Cache sequence duration
    // When loop mode is enabled, don't add end buffer to avoid unwanted gaps between loops
    const endBuffer = this.config.loop ? 0 : this.config.endBufferSeconds;
    this.playbackState.cachedSequenceDuration = this.eventProcessor.calculateSequenceDuration(
      events,
      endBuffer,
      this.config.loop
    );

    this.debug('📏 Sequence duration', {
      duration: this.playbackState.cachedSequenceDuration.toFixed(3),
      loopEnabled: this.config.loop,
      loopWaitSeconds: this.config.loop ? this.config.loopWaitSeconds : 'N/A'
    });

    // Log loopEnd event details for verifiability
    const loopEndEvent = events.find(e => e.eventType === 'loopEnd');
    if (loopEndEvent && 'args' in loopEndEvent && Array.isArray(loopEndEvent.args)) {
      const loopEndArg = loopEndEvent.args[loopEndEvent.args.length - 1];
      const loopEndSeconds = this.eventProcessor.getEventTime(loopEndEvent);
      this.debug('🔁 loopEnd event', {
        args: JSON.stringify(loopEndEvent.args),
        timeArg: loopEndArg,
        timeSeconds: loopEndSeconds !== null ? loopEndSeconds.toFixed(3) + 's' : 'parse error',
        formula: `parseTimeToSeconds("${loopEndArg}") = ${loopEndSeconds !== null ? loopEndSeconds.toFixed(3) : 'null'}s → sequenceDuration = ${this.playbackState.cachedSequenceDuration.toFixed(3)}s`
      });
    } else {
      this.debug('🔁 loopEnd event: not found (duration calculated from note events)');
    }

    // Generate event scheduling predictions
    this.generatePredictions(events, startTime, this.playbackState.cachedSequenceDuration);

    // Start processing loop
    this.processEvents();
  }

  /**
   * Update events during playback (for live editing)
   */
  private updateEvents(events: SequenceEvent[]): void {
    // Handle empty events array
    if (events.length === 0) {
      console.warn('No events to update');
      return;
    }

    this.debug('=== Live Editing: Updating Events ===', { 
      previousCount: this.playbackState.currentEvents.length,
      newCount: events.length
    });

    // Process any new node creation or connection events (idempotent)
    this.eventProcessor.processNewCreateAndConnectEvents(
      events,
      this.playbackState.createdNodeIds
    );
    
    // Store previous values before updating
    const previousEvents = this.playbackState.currentEvents;
    const previousDuration = this.playbackState.cachedSequenceDuration;
    
    // Recalculate sequence duration with new events
    // When loop mode is enabled, don't add end buffer to avoid unwanted gaps between loops
    const endBuffer = this.config.loop ? 0 : this.config.endBufferSeconds;
    this.playbackState.cachedSequenceDuration = this.eventProcessor.calculateSequenceDuration(
      events,
      endBuffer,
      this.config.loop
    );

    this.debug('Updated sequence duration', {
      previous: previousDuration.toFixed(3),
      new: this.playbackState.cachedSequenceDuration.toFixed(3)
    });

    // Get current time to determine which events have already been scheduled
    const currentTime = this.Tone.now();
    
    // Clear and rebuild processed events set
    // Mark events as processed if their scheduled time has already passed
    // IMPORTANT: Use previous duration and previous array length for calculations
    // because that's what was used when events were actually scheduled
    this.playbackState.resetProcessedEvents();
    
    events.forEach((event, index) => {
      if (!this.isSchedulableEvent(event)) {
        return;
      }

      const eventTime = this.eventProcessor.getEventTime(event);
      if (eventTime === null) return;

      // Check all loop iterations that may have occurred
      for (let loop = 0; loop <= this.playbackState.loopCount; loop++) {
        // Use previous duration for loop offset calculation
        // because that's what was used when events were originally scheduled
        // Wait time is only added between loops (not for the first iteration)
        const loopOffset = loop * (previousDuration + this.config.loopWaitSeconds);
        const absoluteTime = this.playbackState.startTime + eventTime + loopOffset;
        
        // If this event's scheduled time has passed, mark it as processed
        if (absoluteTime <= currentTime) {
          // Use previous array length for event key calculation
          // because that's what was used when events were originally scheduled
          const eventKey = index + loop * previousEvents.length;
          this.playbackState.markEventAsProcessed(eventKey);
        }
      }
    });
    
    // Update current events after rebuilding processed indices
    this.playbackState.currentEvents = events;

    this.debug('Live editing: rebuilt processed events based on time', {
      processedCount: this.playbackState.processedEventIndices.size,
      currentTime: currentTime.toFixed(3),
      timeSinceStart: (currentTime - this.playbackState.startTime).toFixed(3)
    });
  }

  /**
   * Main event processing loop
   */
  private processEvents(): void {
    if (!this.playbackState.isPlaying) return;

    const processStartTime = performance.now();
    this.playbackState.incrementProcessLoopCount();

    const currentTime = this.Tone.now();
    const lookaheadTime = currentTime + this.config.lookaheadMs / 1000;

    // Use cached sequence duration
    const sequenceDuration = this.playbackState.cachedSequenceDuration;

    // Debug: Log processing loop info periodically (every 60 loops, ~1 second)
    if (this.config.debug && this.playbackState.processLoopCount % 60 === 0) {
      const timeSinceStart = currentTime - this.playbackState.startTime;
      
      this.debug('⚙️ === Processing Loop Status ===', {
        loopIteration: this.playbackState.loopCount,
        processLoopCount: this.playbackState.processLoopCount,
        currentTime: currentTime.toFixed(3),
        lookaheadTime: lookaheadTime.toFixed(3),
        timeSinceStart: timeSinceStart.toFixed(3),
        processedEvents: this.playbackState.processedEventIndices.size,
        totalEvents: this.playbackState.currentEvents.length
      });
    }

    // Check if we need to advance loop count (before scheduling to keep loopCount up to date)
    if (this.config.loop && sequenceDuration > 0) {
      const timeSinceStart = currentTime - this.playbackState.startTime;
      
      // Calculate which loop we should be on
      // Each loop cycle = sequenceDuration + loopWaitSeconds
      let completedLoops = 0;
      const loopCycleDuration = sequenceDuration + this.config.loopWaitSeconds;
      
      if (loopCycleDuration > 0 && timeSinceStart >= loopCycleDuration) {
        completedLoops = Math.floor(timeSinceStart / loopCycleDuration);
      }
      
      // Guard against multiple increments due to processing delays
      if (completedLoops > this.playbackState.loopCount) {
        const previousLoopCount = this.playbackState.loopCount;
        this.playbackState.loopCount = completedLoops;
        
        // Prune processedEventIndices from old loop iterations to prevent unbounded memory growth.
        // Keep only entries for the current and next loop (which may be pre-scheduled).
        const eventsLength = this.playbackState.currentEvents.length;
        if (eventsLength > 0) {
          const minKeepKey = this.playbackState.loopCount * eventsLength;
          for (const key of this.playbackState.processedEventIndices) {
            if (key < minKeepKey) {
              this.playbackState.processedEventIndices.delete(key);
            }
          }
        }
        
        this.debug(`🔄 === Loop #${previousLoopCount} → #${this.playbackState.loopCount} ===`, {
          previousLoop: previousLoopCount,
          currentLoop: this.playbackState.loopCount,
          timeSinceStart: timeSinceStart.toFixed(3),
          sequenceDuration: sequenceDuration.toFixed(3),
          loopWaitSeconds: this.config.loopWaitSeconds
        });
        
        this.config.onLoopComplete();
      }
    }

    // Determine the range of loop iterations to schedule
    // When loop mode is enabled, also pre-schedule events for the next loop iteration
    // to ensure seamless transitions at loop boundaries
    const minLoop = this.playbackState.loopCount;
    const maxLoop = this.config.loop ? minLoop + 1 : minLoop;

    for (let checkLoop = minLoop; checkLoop <= maxLoop; checkLoop++) {
      // Process events within lookahead window
      this.playbackState.currentEvents.forEach((event, index) => {
        if (!this.isSchedulableEvent(event)) {
          return;
        }

        // Get event time from args (last argument is time)
        const eventTime = this.eventProcessor.getEventTime(event);
        if (eventTime === null) return;

        // Calculate absolute time with loop offset
        // Each loop cycle = sequenceDuration + loopWaitSeconds
        const loopOffset = checkLoop * (sequenceDuration + this.config.loopWaitSeconds);
        const absoluteTime = this.playbackState.startTime + eventTime + loopOffset;

        // Check if event should be scheduled
        const eventKey = index + checkLoop * this.playbackState.currentEvents.length;
        if (absoluteTime <= lookaheadTime && !this.playbackState.processedEventIndices.has(eventKey)) {
          
          if (this.config.debug) {
            // Look up prediction for this event
            const predictionKey = `${checkLoop}-${index}`;
            const prediction = this.eventPredictions.get(predictionKey);
            
            if (prediction) {
              // Compare actual scheduled time with prediction
              const expectedTime = prediction.expectedScheduleTime;
              const actualTime = absoluteTime;
              const mismatch = Math.abs(actualTime - expectedTime);
              
              if (mismatch > NDJSONStreamingPlayer.SCHEDULE_TIME_TOLERANCE_SECONDS) {
                // Mismatch detected - highlight in red
                this.debug(`🔴 MISMATCH Event #${index} (${event.eventType}) Loop:${checkLoop}`, {
                  timeNotation: prediction.timeNotation,
                  expectedScheduleTime: expectedTime.toFixed(3) + 's',
                  actualScheduleTime: actualTime.toFixed(3) + 's',
                  mismatch: (mismatch * 1000).toFixed(1) + 'ms'
                });
              } else {
                // Matches prediction - simple confirmation
                this.debug(`✓ Event #${index} (${event.eventType}) Loop:${checkLoop}: ${prediction.timeNotation} → scheduled at ${actualTime.toFixed(3)}s (expected ${expectedTime.toFixed(3)}s)`);
              }
            } else {
              // No prediction available (e.g., loop iterations beyond first two)
              this.debug(`Event #${index} (${event.eventType}) Loop:${checkLoop}: scheduled at ${absoluteTime.toFixed(3)}s`);
            }
          }

          this.eventProcessor.scheduleEvent(event, absoluteTime);
          this.config.onEventScheduled({
            eventIndex: index,
            loopIteration: checkLoop,
            absoluteTime,
            event
          });
          this.playbackState.processedEventIndices.add(eventKey);
        }
      });
    }

    // Continue processing
    this.animationFrameId = requestAnimationFrame(() => this.processEvents());
  }

  /**
   * Stop playback
   */
  stop(): void {
    this.debug('=== Stopping Playback ===', {
      processedEvents: this.playbackState.processedEventIndices.size,
      loopCount: this.playbackState.loopCount,
      processLoopCount: this.playbackState.processLoopCount
    });

    this.playbackState.stop();
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    // Don't dispose nodes here - let the caller manage node lifecycle
    // this.nodes.disposeAll();
  }

  /**
   * Check if player is currently playing
   */
  get playing(): boolean {
    return this.playbackState.isPlaying;
  }
}

{% endraw %}
```

## 最近の変更（過去7日間）
### コミット履歴:
961a15a Add issue note for #185 [auto]
1c0b0fd Merge branch 'main' of github.com:cat2151/tonejs-json-sequencer into main
11942b2 first
46f1ba4 Merge pull request #183 from cat2151/copilot/fix-streaming-demo-sync-issue
1e3f37d Fix playback position lines misalignment for BPM180 demo
105c5f5 Add issue note for #182 [auto]
e7a60b3 Initial plan
471619c Merge pull request #181 from cat2151/copilot/fix-ndjson-synth-issue
6919aae refactor: extract disposeSingle helper, use undefined instead of delete, check node existence before skipping
666fa34 fix: detect nodeType changes during live editing to recreate nodes with new instrument type

### 変更されたファイル:
.github/workflows/call-check-large-files.yml
dist/cjs/sequencer-nodes.d.ts
dist/cjs/sequencer-nodes.js
dist/cjs/streaming/event-processor.d.ts
dist/cjs/streaming/event-processor.js
dist/cjs/streaming/playback-state.d.ts
dist/cjs/streaming/playback-state.js
dist/demo/streaming.js
dist/esm/sequencer-nodes.d.ts
dist/esm/sequencer-nodes.mjs
dist/esm/streaming/event-processor.d.ts
dist/esm/streaming/event-processor.mjs
dist/esm/streaming/playback-state.d.ts
dist/esm/streaming/playback-state.mjs
dist/sequencer-nodes.d.ts
dist/sequencer-nodes.js
dist/streaming/event-processor.d.ts
dist/streaming/event-processor.js
dist/streaming/playback-state.d.ts
dist/streaming/playback-state.js
generated-docs/development-status-generated-prompt.md
generated-docs/development-status.md
generated-docs/project-overview-generated-prompt.md
generated-docs/project-overview.md
issue-notes/176.md
issue-notes/178.md
issue-notes/180.md
issue-notes/185.md
src/demo/streaming.ts
src/sequencer-nodes.ts
src/streaming/event-processor.ts
src/streaming/playback-state.ts


---
Generated at: 2026-03-04 07:12:16 JST

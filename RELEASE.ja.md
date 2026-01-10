# リリースプロセス

このドキュメントでは、tonejs-json-sequencerのリリース方法を説明します。

## GitHub Actionsによる自動リリース

本プロジェクトは、mainブランチに変更がプッシュされると、GitHub Actionsを使用して自動的にリリースを作成します。

### 動作の仕組み

1. **変更をコミット**
   ```bash
   git add .
   git commit -m "コミットメッセージ"
   ```

2. **mainブランチにプッシュ**
   ```bash
   git push origin main
   ```

3. **GitHub Actionsが自動的に以下を実行:**
   - 依存関係のインストール
   - 配布ファイルのビルド
   - package.jsonのバージョン（例: v0.0.1）を使用してGitHubリリースを作成または更新
   - ビルドされたファイル（dist/index.js、dist/index.mjsなど）をリリースアセットとしてアップロード

4. **CDNアクセス**
   
   リリースが更新されると、ファイルは自動的にjsDelivr CDN経由で利用可能になります:
   ```html
   <!-- CommonJS -->
   <script src="https://cdn.jsdelivr.net/gh/cat2151/tonejs-json-sequencer@v0.0.1/dist/index.js"></script>
   
   <!-- ES Module -->
   <script type="module">
     import * as ToneJSONSequencer from 'https://cdn.jsdelivr.net/gh/cat2151/tonejs-json-sequencer@v0.0.1/dist/index.mjs';
   </script>
   ```
   
   バージョン指定なしで常に最新版を参照することもできます:
   ```html
   <!-- 常に最新バージョンを使用 -->
   <script src="https://cdn.jsdelivr.net/gh/cat2151/tonejs-json-sequencer/dist/index.js"></script>
   ```

## 手動リリース

必要に応じて、手動でリリースをトリガーすることもできます:

1. [Actionsタブ](https://github.com/cat2151/tonejs-json-sequencer/actions/workflows/release.yml)に移動
2. "Run workflow"をクリック
3. ブランチを選択して"Run workflow"をクリック
4. ワークフローはpackage.jsonのバージョンを使用します

## バージョンの更新

バージョンを上げる準備ができたとき（例: 0.0.1から0.0.2へ）:

1. **package.jsonのバージョンを更新**
   ```bash
   npm version patch  # 0.0.1 -> 0.0.2 の場合
   npm version minor  # 0.0.1 -> 0.1.0 の場合
   npm version major  # 0.0.1 -> 1.0.0 の場合
   ```
   
   または、手動で`package.json`を編集してバージョン番号を更新します。

2. **コミットしてプッシュ**
   ```bash
   git add package.json package-lock.json
   git commit -m "Bump version to x.x.x"
   git push origin main
   ```

3. 新しいバージョンでリリースが自動的に作成されます。

## ワークフローの詳細

リリースワークフローは`.github/workflows/release.yml`で定義されており、以下の機能があります:
- mainブランチへのプッシュで自動的にトリガー
- workflow_dispatchによる手動トリガーも可能
- package.jsonのバージョンを使用してリリースをタグ付け
- `npm run build`を使用してプロジェクトをビルド
- CDN使用方法の説明を含むGitHubリリースを作成
- `dist/`ディレクトリのすべてのファイルをリリースアセットとしてアップロード

## 注意事項

- mainにプッシュする前に、必ずコードをテストしてください
- mainへの各プッシュは、現在のpackage.jsonバージョンでリリースを更新します
- リリース作成後、CDNの更新には数分かかる場合があります
- Work In Progressプロジェクトの場合、同じバージョン（例: v0.0.1）を維持することで、一貫したCDN URLを使用できます

# リリースプロセス

このドキュメントでは、tonejs-json-sequencerの新しいリリースを作成する方法を説明します。

## GitHub Actionsによる自動リリース

本プロジェクトは、バージョンタグがプッシュされると、GitHub Actionsを使用して自動的にリリースを作成します。

### リリースを作成する手順

1. **package.jsonのバージョンを更新**
   ```bash
   npm version patch  # 0.0.1 -> 0.0.2 の場合
   npm version minor  # 0.0.1 -> 0.1.0 の場合
   npm version major  # 0.0.1 -> 1.0.0 の場合
   ```
   
   または、手動で`package.json`を編集してバージョン番号を更新します。

2. **バージョン変更をコミット**
   ```bash
   git add package.json package-lock.json
   git commit -m "Bump version to x.x.x"
   ```

3. **gitタグを作成してプッシュ**
   ```bash
   git tag v0.0.2  # バージョンに置き換えてください
   git push origin main
   git push origin v0.0.2
   ```

4. **GitHub Actionsが自動的に以下を実行:**
   - 依存関係のインストール
   - 配布ファイルのビルド
   - タグを使用したGitHubリリースの作成
   - ビルドされたファイル（dist/index.js、dist/index.mjsなど）をリリースアセットとしてアップロード

5. **CDNアクセス**
   
   リリースが作成されると、ファイルは自動的にjsDelivr CDN経由で利用可能になります:
   ```html
   <!-- CommonJS -->
   <script src="https://cdn.jsdelivr.net/gh/cat2151/tonejs-json-sequencer@v0.0.2/dist/index.js"></script>
   
   <!-- ES Module -->
   <script type="module">
     import * as ToneJSONSequencer from 'https://cdn.jsdelivr.net/gh/cat2151/tonejs-json-sequencer@v0.0.2/dist/index.mjs';
   </script>
   ```

## 手動リリース

必要に応じて、手動でリリースをトリガーすることもできます:

1. [Actionsタブ](https://github.com/cat2151/tonejs-json-sequencer/actions/workflows/release.yml)に移動
2. "Run workflow"をクリック
3. ブランチを選択して"Run workflow"をクリック
4. ワークフローはpackage.jsonのバージョンを使用します

## ワークフローの詳細

リリースワークフローは`.github/workflows/release.yml`で定義されており、以下の機能があります:
- `v*.*.*`パターンに一致するタグで自動的にトリガー
- workflow_dispatchによる手動トリガーも可能
- `npm run build`を使用してプロジェクトをビルド
- CDN使用方法の説明を含むGitHubリリースを作成
- `dist/`ディレクトリのすべてのファイルをリリースアセットとしてアップロード

## 注意事項

- リリースを作成する前に、必ずコードをテストしてください
- タグのバージョンはpackage.jsonのバージョンと一致する必要があります
- リリース作成後、CDNの更新には数分かかる場合があります

# README Auto-Translation Setup

このプロジェクトでは、GitHub ActionsとGemini APIを使用して、README.ja.mdが更新されたときに自動的にREADME.mdを英語に翻訳します。

## ファイル構成

```
.github/
├── workflows/
│   └── translate-readme.yml    # GitHub Actionsワークフロー
├── scripts/
│   └── translate-readme.js     # 翻訳スクリプト
└── docs/
    └── TRANSLATION_SETUP.md    # このファイル
```

## セットアップ手順

### 1. Gemini API Keyの取得

1. [Google AI Studio](https://aistudio.google.com/)にアクセス
2. 「Get API key」をクリック
3. 新しいAPI keyを作成
4. API keyをコピーして保存

### 2. GitHub Secretsの設定

1. GitHubリポジトリページで「Settings」タブを開く
2. 左サイドバーの「Secrets and variables」→「Actions」をクリック
3. 「New repository secret」をクリック
4. 以下のシークレットを追加：
   - Name: `GEMINI_API_KEY`
   - Secret: 上記で取得したGemini API Key

### 3. 動作確認

1. README.ja.mdファイルを編集
2. 変更をcommitしてpush
3. GitHub Actionsタブで翻訳ワークフローが実行されることを確認
4. README.mdが自動生成されることを確認

## ワークフローの詳細

- **トリガー**: README.ja.mdファイルがmain/masterブランチにpushされたとき
- **処理**: Gemini APIを使用してREADME.ja.mdを英語に翻訳し、README.mdを更新
- **自動コミット**: 翻訳されたREADME.mdは自動的にコミット・プッシュされます

## 手動実行

GitHub Actionsタブから「Auto Translate README」ワークフローを手動で実行することも可能です。

## 注意事項

- Gemini API の利用制限に注意してください
- 大きなREADMEファイルの場合、API制限に引っかかる可能性があります
- 翻訳の品質は完璧ではない場合があるため、必要に応じて手動で調整してください

## トラブルシューティング

### よくある問題

1. **API Key エラー**
   - GitHub Secretsが正しく設定されているか確認
   - API Keyが有効か確認

2. **翻訳が実行されない**
   - README.ja.mdがmain/masterブランチにpushされているか確認
   - GitHub Actionsが有効になっているか確認

3. **ファイルパスエラー**
   - スクリプトは`.github/scripts/`ディレクトリから実行される前提
   - プロジェクトルートの相対パスが正しく設定されている

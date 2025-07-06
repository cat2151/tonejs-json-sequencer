const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs').promises;
const path = require('path');

async function translateReadme() {
  try {
    // 環境変数の確認
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY environment variable is not set');
    }

    console.log('Starting README translation process...');

    // Gemini API の初期化
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // プロジェクトルートへのパスを設定
    const projectRoot = path.resolve(__dirname, '../../');
    const readmeJaPath = path.join(projectRoot, 'README.ja.md');
    const readmePath = path.join(projectRoot, 'README.md');

    // README.ja.md の存在確認と読み込み
    try {
      await fs.access(readmeJaPath);
    } catch (error) {
      throw new Error('README.ja.md file not found');
    }

    const japaneseContent = await fs.readFile(readmeJaPath, 'utf-8');
    
    if (!japaneseContent.trim()) {
      console.log('README.ja.md is empty, skipping translation.');
      return;
    }

    console.log(`README.ja.md content length: ${japaneseContent.length} characters`);
    console.log('Sending translation request to Gemini API...');

    // 翻訳プロンプト
    const prompt = `Please translate the following Japanese Markdown text to English. 
Keep the Markdown formatting intact, including headers, links, code blocks, and other formatting elements.
Make the translation natural and professional for an English-speaking developer audience.
If there are any technical terms or project-specific terms, keep them appropriate for a software development context.
Preserve all URLs, code snippets, and special formatting exactly as they are.

Japanese text to translate:
${japaneseContent}`;

    // Gemini API で翻訳
    const result = await model.generateContent(prompt);
    const translatedText = result.response.text();

    if (!translatedText || !translatedText.trim()) {
      throw new Error('Translation result is empty');
    }

    console.log(`Translation result length: ${translatedText.length} characters`);

    // 既存のREADME.mdと比較
    let existingContent = '';
    try {
      existingContent = await fs.readFile(readmePath, 'utf-8');
    } catch (error) {
      console.log('README.md does not exist yet, will create new file');
    }

    if (existingContent === translatedText) {
      console.log('Translation result is identical to existing README.md, no update needed');
      return;
    }

    // 翻訳結果をREADME.mdに書き込み
    await fs.writeFile(readmePath, translatedText, 'utf-8');
    
    console.log('Translation completed successfully!');
    console.log('README.md has been updated with the English translation');

    // 翻訳結果の簡単なプレビュー
    const preview = translatedText.substring(0, 200);
    console.log('Translation preview:');
    console.log('---');
    console.log(preview + (translatedText.length > 200 ? '...' : ''));
    console.log('---');

  } catch (error) {
    console.error('Translation failed:', error.message);
    if (error.response) {
      console.error('API Response:', error.response);
    }
    process.exit(1);
  }
}

// メイン処理実行
translateReadme();

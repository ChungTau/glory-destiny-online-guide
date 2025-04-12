import * as fs from 'fs';
import * as path from 'path';

// 定義 generated 目錄同輸出檔案
const generatedDir = path.join(__dirname, '../generated');
const outputFile = path.join(generatedDir, 'index.js');

// 確保 generated 目錄存在
if (!fs.existsSync(generatedDir)) {
  fs.mkdirSync(generatedDir, { recursive: true });
}

// 生成固定嘅 export 內容
function generateExports() {
  const content =
    [
      '// Auto-generated exports from generated/',
      "module.exports = require('./client/index.js');",
    ].join('\n') + '\n';

  fs.writeFileSync(outputFile, content);
}

// 執行
try {
  generateExports();
} catch (error) {
  console.error('Error generating exports:', error);
  process.exit(1);
}

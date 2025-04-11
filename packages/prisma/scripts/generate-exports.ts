import * as fs from 'fs';
import * as path from 'path';

// 定義generated目錄同輸出檔案
const generatedDir = path.join(__dirname, '../generated');
const outputFile = path.join(generatedDir, 'index.ts');

// 生成固定嘅 export 內容
function generateExports() {
  // 編譯 entity-include.ts 成 entity-include.js

  const content =
    [
      '// Auto-generated exports from generated/',
      "export * from './client/index.js';",
    ].join('\n') + '\n';

  fs.writeFileSync(outputFile, content);
  console.log('Generated packages/prisma/generated/index.ts successfully');
  console.log('Hardcoded content:\n', content);
}

// 執行
try {
  generateExports();
} catch (error) {
  console.error('Error generating exports:', error);
  process.exit(1);
}

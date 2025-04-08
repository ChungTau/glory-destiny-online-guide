import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

// 定義generated目錄同輸出檔案
const generatedDir = path.join(__dirname, '../generated');
const outputFile = path.join(generatedDir, 'index.ts');

// 生成固定嘅 export 內容
function generateExports() {
  // 編譯 entity-include.ts 成 entity-include.js
  const entityIncludeTs = path.join(generatedDir, 'entity-include.ts');
  if (fs.existsSync(entityIncludeTs)) {
    try {
      // 用 tsc 編譯，生成 entity-include.js 喺同一個目錄
      execSync(`npx tsc ${entityIncludeTs} --module commonjs --target esnext --declaration`, { stdio: 'inherit' });
      console.log('Successfully compiled entity-include.ts to entity-include.js');
    } catch (err) {
      console.error('Failed to compile entity-include.ts:', err);
      throw err;
    }
  } else {
    console.error('entity-include.ts not found in', generatedDir);
    throw new Error('entity-include.ts missing');
  }

  const content = [
    '// Auto-generated exports from generated/',
    "export * from './client/index.js';",
    "export * from './entity-include.js';",
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
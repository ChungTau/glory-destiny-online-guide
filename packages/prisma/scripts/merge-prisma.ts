import * as fs from 'fs';
import * as path from 'path';

// 定義路徑
const schemaDir = path.join(__dirname, '../schema');
const outputFile = path.join(schemaDir, 'schema.prisma');

// Prisma嘅基本配置
const datasource = `
datasource db {
  provider = "postgresql"
  url      = "postgresql://user:password@postgres:5432/mydb?schema=public"
}
generator client {
  provider = "prisma-client-js"
  output   = "../generated/client"
}
`;

// 遞迴讀取所有 .prisma 檔案嘅函數
function readPrismaFiles(dir: string): string[] {
  let results: string[] = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // 如果係目錄，遞迴讀取
      results = results.concat(readPrismaFiles(filePath));
    } else if (file.endsWith('.prisma') && file !== 'schema.prisma') {
      // 如果係 .prisma 檔案（唔包括最終生成嘅schema.prisma），讀取內容
      const content = fs.readFileSync(filePath, 'utf-8').trim();
      if (content) {
        results.push(content);
      }
    }
  }
  return results;
}

// 主邏輯
function mergePrismaFiles() {
  // 讀取 enums 同 models
  const enums = readPrismaFiles(path.join(schemaDir, 'enums'));
  const models = readPrismaFiles(path.join(schemaDir, 'models'));

  // 按字母序排序（可選，增加可讀性）
  enums.sort();
  models.sort();

  // 合併所有內容，加入分隔符
  const mergedSchema = [
    datasource.trim(),
    '// Enums',
    ...enums,
    '// Models',
    ...models
  ].filter(Boolean).join('\n\n');

  // 寫入最終檔案
  fs.writeFileSync(outputFile, mergedSchema);
  console.log('Generated schema.prisma successfully');
}

// 執行
try {
  mergePrismaFiles();
} catch (error) {
  console.error('Error generating schema.prisma:', error);
}
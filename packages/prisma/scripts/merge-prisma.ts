import * as fs from 'fs';
import * as path from 'path';

// 定義路徑
const schemaDir = path.join(__dirname, '../schema');
const outputFile = path.join(schemaDir, 'schema.prisma');

// Prisma 嘅基本配置
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
      results = results.concat(readPrismaFiles(filePath));
    } else if (file.endsWith('.prisma') && file !== 'schema.prisma') {
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
  const enums = readPrismaFiles(path.join(schemaDir, 'enums'));
  const models = readPrismaFiles(path.join(schemaDir, 'models'));

  enums.sort();
  models.sort();

  const mergedSchema = [
    datasource.trim(),
    '// Enums',
    ...enums,
    '// Models',
    ...models,
  ]
    .filter(Boolean)
    .join('\n\n');

  fs.writeFileSync(outputFile, mergedSchema);
}

// 執行
try {
  mergePrismaFiles();
} catch (error) {
  console.error('Error generating schema.prisma:', error);
  process.exit(1);
}

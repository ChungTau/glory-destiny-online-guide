import * as fs from 'fs';
import * as path from 'path';

// 定義路徑
const schemaFile = path.join(__dirname, '../schema/schema.prisma');
const generatedDir = path.join(__dirname, '../generated');
const outputFile = path.join(generatedDir, 'entity-include.ts');

// 基本類型黑名單
const primitiveTypes = new Set(['Int', 'String', 'Boolean', 'Float', 'DateTime', 'Json', 'Bytes']);

// 確保 generated/ 目錄存在
function ensureGeneratedDir() {
  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir, { recursive: true });
    console.log('Created generated/ directory');
  }
}

// 解析 schema.prisma，搵model同entity關係
function parseSchema(schemaContent: string): Map<string, string[]> {
  const lines = schemaContent.split('\n');
  const models = new Map<string, string[]>();
  const enums = new Set<string>();
  let currentModel: string | null = null;

  // 第一步：收集所有model同enum名稱
  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('model ')) {
      currentModel = trimmed.split(' ')[1];
      models.set(currentModel, []);
    }
    else if (trimmed.startsWith('enum ')) {
      enums.add(trimmed.split(' ')[1]);
    }
    else if (trimmed === '}' && currentModel) {
      currentModel = null;
    }
  }

  // 第二步：解析關係，只加model類型
  currentModel = null;
  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('model ')) {
      currentModel = trimmed.split(' ')[1];
    }
    else if (currentModel && trimmed.match(/^\w+\s+\w+(\[\])?/)) {
      const [field, type] = trimmed.split(/\s+/);
      const relatedModel = type.replace('[]', '');
      if (!primitiveTypes.has(relatedModel) && !enums.has(relatedModel) && models.has(relatedModel)) {
        models.get(currentModel)!.push(field);
      }
    }
    else if (trimmed === '}') {
      currentModel = null;
    }
  }

  return models;
}

// 生成interface，只用 boolean
function generateInterfaces(models: Map<string, string[]>): string {
  const interfaces: string[] = [];

  models.forEach((relations, modelName) => {
    if (relations.length > 0) {
      const interfaceName = `${modelName}Include`;
      const fields = relations.map(rel => `  ${rel}?: boolean;`);
      interfaces.push(`export interface ${interfaceName} {\n${fields.join('\n')}\n}`);
    }
  });

  return interfaces.join('\n\n');
}

// 主邏輯
function generateEntityIncludes() {
  // 讀取 schema.prisma
  if (!fs.existsSync(schemaFile)) {
    throw new Error('schema.prisma not found. Run merge-prisma first.');
  }
  const schemaContent = fs.readFileSync(schemaFile, 'utf-8');

  // 解析model同關係
  const models = parseSchema(schemaContent);

  // 生成interface
  const interfaces = generateInterfaces(models);

  // 確保目錄存在
  ensureGeneratedDir();

  // 寫入檔案
  const content = `// Auto-generated entity include interfaces\n${interfaces}\n`;
  fs.writeFileSync(outputFile, content);
  console.log('Generated entity-include.ts successfully');
}

// 執行
try {
  generateEntityIncludes();
} catch (error) {
  console.error('Error generating entity-include.ts:', error);
  process.exit(1);
}
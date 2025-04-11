import * as fs from 'fs/promises';
import * as path from 'path';

const rootDir = path.join(__dirname, '../../..');
const clientTranslationsDir = path.join(rootDir, 'apps/client/translations');
const cmsTranslationsDir = path.join(rootDir, 'apps/cms/translations');
const outputDir = path.join(__dirname, '../generated/translations');

function deepMerge(target: any, source: any): any {
  const output = { ...target };
  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key])
    ) {
      output[key] = deepMerge(output[key] || {}, source[key]);
    } else {
      output[key] = source[key];
    }
  }
  return output;
}

async function readJsonFiles(dir: string): Promise<Record<string, any>> {
  const translations: Record<string, any> = {};
  try {
    const files = (await fs.readdir(dir, { withFileTypes: true }))
      .filter((file) => file.isFile() && file.name.endsWith('.json'))
      .map((file) => file.name);

    for (const file of files) {
      const lang = path.basename(file, '.json');
      const content = await fs.readFile(path.join(dir, file), 'utf-8');
      translations[lang] = JSON.parse(content);
    }
  } catch (error) {
    console.warn(`No translations found in ${dir}, skipping...`);
  }
  return translations;
}

async function mergeTranslations() {
  try {
    await fs.mkdir(outputDir, { recursive: true });

    const clientTranslations = await readJsonFiles(clientTranslationsDir);
    const cmsTranslations = await readJsonFiles(cmsTranslationsDir);

    const allLanguages = new Set([
      ...Object.keys(clientTranslations),
      ...Object.keys(cmsTranslations),
    ]);

    for (const lang of allLanguages) {
      const merged = deepMerge(
        clientTranslations[lang] || {},
        cmsTranslations[lang] || {}
      );
      const outputFile = path.join(outputDir, `${lang}.json`);
      await fs.writeFile(outputFile, JSON.stringify(merged, null, 2), 'utf-8');
      console.log(`Merged translations for ${lang} written to ${outputFile}`);
    }

    console.log('All translations merged successfully!');
  } catch (error) {
    console.error('Error merging translations:', error);
    process.exit(1);
  }
}

mergeTranslations();

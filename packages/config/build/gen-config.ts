import { genAssets } from './gen-asset';
import { genI18n } from './gen-i18n';

async function generate(): Promise<void> {
  const assets = await genAssets();
  await genI18n(assets);
}

generate().catch(console.error);

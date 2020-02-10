import { buildI18n } from './build-i18n';
import { buildAssets } from './build-assets';

async function build(): Promise<void> {
  await buildAssets();
  await buildI18n();
}

build().catch(console.error);

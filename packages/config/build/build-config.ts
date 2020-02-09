import { buildAssets } from './build-assets';

async function build(): Promise<void> {
  await buildAssets();
}

build().catch(console.error);

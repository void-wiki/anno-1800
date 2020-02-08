import { genAssets } from './gen-asset';

async function generate(): Promise<void> {
  await genAssets();
}

generate().catch(console.error);

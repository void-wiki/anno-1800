import { genAssets } from './gen-asset';

async function generate(): Promise<void> {
  const assets = await genAssets();
}

generate().catch(console.error);

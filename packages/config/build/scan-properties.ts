import fs from 'fs-extra';
import { VElement } from './v-element';
import { processAssetsXml } from './process';
import { assetsFiles, propertiesFile, templatesFile, TAG_NAMES } from './constants';

/**
 * Scan all of properties in a specified property.
 */
async function scanProperties(): Promise<void> {
  const assetsXml: VElement[] = processAssetsXml(
    (await Promise.all(assetsFiles.map(async f => fs.readJSON(f)))).flat(1),
    await fs.readJSON(propertiesFile),
    await fs.readJSON(templatesFile),
  );

  const path: readonly string[] = process.argv.slice(2);
  const propertiesSet = new Set<string>();
  assetsXml.forEach(a => {
    const values = a.children.find(c => c.name === TAG_NAMES.Values);
    if (!values) {
      return;
    }

    let prop: VElement | undefined = values;
    const pathPool = [...path];
    while (!!prop && pathPool.length > 0) {
      const propName = pathPool.shift();
      prop = prop.children.find(c => c.name === propName);
    }
    if (prop) {
      prop.children.forEach(c => propertiesSet.add(c.name));
    }
  });

  console.log([...propertiesSet]);
}

scanProperties().catch(console.error);

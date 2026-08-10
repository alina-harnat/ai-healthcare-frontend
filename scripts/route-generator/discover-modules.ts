import fg from 'fast-glob';
import path from 'node:path';

import { DiscoveredModule } from './types';

const MODULES_ROOT = 'modules';

export async function discoverModules(): Promise<DiscoveredModule[]> {
  const files = await fg(`${MODULES_ROOT}/*/module.ts`);

  return files.map((file) => ({
    file,
    modulePath: path.relative(MODULES_ROOT, path.dirname(file)),
  }));
}

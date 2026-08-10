import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { discoverModules } from './discover-modules';
import { LoadedModule } from './types';
import { Module } from '@/modules/common/types/module';

export async function loadModules(): Promise<LoadedModule[]> {
  const modules = await discoverModules();

  return Promise.all(
    modules.map(async ({ file, modulePath }) => {
      const imported = await import(pathToFileURL(path.resolve(file)).href);

      const [module] = Object.values(imported) as [Module];

      if (!module) {
        throw new Error(`Module "${modulePath}" does not export a module.`);
      }

      return {
        file,
        modulePath,
        module,
      };
    }),
  );
}

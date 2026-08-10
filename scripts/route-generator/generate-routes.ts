import path from 'node:path';

import { GeneratedFile, LoadedModule } from './types';
import { pageTemplate } from './templates';

export function generateRoutes(modules: LoadedModule[]): GeneratedFile[] {
  const files: GeneratedFile[] = [];

  for (const currentModule of modules) {
    for (const route of currentModule.module.routes) {
      files.push({
        path: path.join(
          'app',
          currentModule.modulePath,
          route.path,
          'page.tsx',
        ),

        content: pageTemplate(
          path.posix.join(
            '@/modules',
            currentModule.modulePath,
            'pages',
            route.page,
          ),
        ),
      });
    }
  }

  return files;
}

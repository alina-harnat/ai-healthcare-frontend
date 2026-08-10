import fs from 'node:fs/promises';
import path from 'node:path';

import { GeneratedFile } from './types';

export async function writeFiles(files: GeneratedFile[]): Promise<void> {
  for (const file of files) {
    await fs.mkdir(path.dirname(file.path), {
      recursive: true,
    });

    await fs.writeFile(file.path, file.content);
  }
}

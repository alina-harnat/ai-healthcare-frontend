import { loadModules } from './load-modules';
import { generateRoutes } from './generate-routes';
import { writeFiles } from './write-files';

export async function generate() {
  console.log('🔍 Loading modules...');

  const modules = await loadModules();

  console.log('📦 Loaded modules:');
  console.dir(modules, { depth: null });

  console.log('🛠 Generating routes...');

  const files = generateRoutes(modules);

  console.log('📄 Generated files:');
  console.dir(files, { depth: null });

  console.log('💾 Writing files...');

  await writeFiles(files);

  console.log('✅ Route generation finished');
}

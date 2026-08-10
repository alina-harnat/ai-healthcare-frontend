import { generate } from './generator';

console.log('🚀 Route generator started');
console.log('📂 Working directory:', process.cwd());

generate()
  .then(() => {
    console.log('✅ Route generation completed');
  })
  .catch((error) => {
    console.error('❌ Error generating routes');
    console.error(error);
    process.exit(1);
  });

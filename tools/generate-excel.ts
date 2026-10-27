import { readFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

import { ReportGeneratorService } from './report-generator/services';
import { createTestCaseReportSheets } from './test-case-report/config';
import type { TestCase } from './test-case-report/types';

const [input, output] = process.argv.slice(2);

if (!input || !output) {
  throw new Error('Usage: generate-excel <test-cases.json> <report.xlsx>');
}

async function generateExcel(): Promise<void> {
  const inputPath = resolve(input);
  const outputPath = resolve(output);
  const testCases = JSON.parse(readFileSync(inputPath, 'utf-8')) as TestCase[];

  mkdirSync(dirname(outputPath), { recursive: true });

  await new ReportGeneratorService().generate(
    createTestCaseReportSheets(testCases),
    outputPath,
  );

  console.log(`Generated ${testCases.length} test cases: ${outputPath}`);
}

generateExcel().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

import { ReportGeneratorService } from '../../report-generator/services';
import { createTestCaseReportSheets } from '../config';
import type { TestCase } from '../types';

export class TestCaseReportService {
  constructor(private readonly reportGenerator: ReportGeneratorService) {}

  async generate(testCases: TestCase[], outputPath: string): Promise<void> {
    await this.reportGenerator.generate(
      createTestCaseReportSheets(testCases),
      outputPath,
    );
  }
}

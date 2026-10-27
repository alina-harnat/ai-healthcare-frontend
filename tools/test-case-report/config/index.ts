import type { ReportSheet } from '../../report-generator/types';
import type { TestCase } from '../types';

export const TEST_CASE_REPORT_CONFIG = {
  name: 'Test Cases',

  columns: [
    { header: 'ID', key: 'id', width: 15 },
    { header: 'Title', key: 'title', width: 35 },
    { header: 'Preconditions', key: 'preconditions', width: 40 },
    { header: 'Steps', key: 'steps', width: 50 },
    { header: 'Expected Result', key: 'expectedResult', width: 40 },
    { header: 'Status', key: 'status', width: 15 },
  ],

  autoFilter: true,
  freezeHeader: true,
};

export function createTestCaseReportSheets(
  testCases: TestCase[],
): ReportSheet[] {
  const summaryRows: { category: string; value: string; count: number }[] = [
    { category: 'Total', value: 'All test cases', count: testCases.length },
  ];

  const statusCounts = new Map<string, number>();

  for (const testCase of testCases) {
    statusCounts.set(
      testCase.status,
      (statusCounts.get(testCase.status) ?? 0) + 1,
    );
  }

  for (const [value, count] of statusCounts) {
    summaryRows.push({ category: 'Status', value, count });
  }

  return [
    { ...TEST_CASE_REPORT_CONFIG, rows: testCases },
    {
      name: 'Summary',
      columns: [
        { header: 'Category', key: 'category', width: 20 },
        { header: 'Value', key: 'value', width: 25 },
        { header: 'Count', key: 'count', width: 15 },
      ],
      rows: summaryRows,
      autoFilter: true,
      freezeHeader: true,
    },
  ];
}

export interface TestCase {
  id: string;
  title: string;
  preconditions: string;
  steps: string;
  expectedResult: string;
  status: 'Not Run' | 'Passed' | 'Failed';
}

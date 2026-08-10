export function pageTemplate(importPath: string): string {
  return `export { default } from "${importPath}";
`;
}

# Excel Export

## Objective

Export the reviewed JSON test cases using the project's existing report generator.

## Procedure

### 1. Inspect the export workflow

- Locate the existing export script and its usage instructions.
- Verify the expected input format, command, dependencies, and output path.
- Reuse existing tooling; do not create a competing exporter.

### 2. Generate the report

- Supply the complete, reviewed test case JSON.
- Execute the existing script.
- Resolve export errors when possible without modifying application code.
- Never claim success if execution failed or was not performed.

### 3. Validate the workbook

- Confirm the file exists and can be opened or parsed.
- Verify all test cases and required fields are preserved.
- Check for missing, duplicated, or truncated content.
- Confirm the exported data matches the reviewed JSON.

### 4. Report the result

Provide the actual output path, number of exported test cases, validation results, and any unresolved issues.

## Rules

- Do not invent file paths or execution results.
- Do not silently omit or modify test cases.
- Report blockers accurately if export or validation cannot be completed.

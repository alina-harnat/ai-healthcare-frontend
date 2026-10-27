---
name: create-and-verify-artifact
description: Format reviewed test cases, save the Markdown artifact, and verify its integrity.
---

# Create and Verify Test Case Artifact

**Objective:** Save the reviewed test cases as a complete, correctly formatted artifact without losing coverage or changing verified expectations.

## 1. Prepare the Artifact

- Use the reviewed draft from `03-review-coverage-and-quality.md`.
- Preserve valid test cases, requirement references, unresolved questions, and coverage limitations.
- Follow existing project conventions when available.
- Otherwise, save a Markdown file under `docs/test-cases/` using a descriptive filename, such as `YYYY-MM-DD-<feature-name>-test-cases.md`.
- Do not overwrite existing artifacts unless explicitly instructed.

## 2. Format Test Cases

Use this Markdown table structure with the exact columns and order:

| ID     | Test Case Title | Preconditions   | Steps to Reproduce         | Expected Result   | Status  |
| ------ | --------------- | --------------- | -------------------------- | ----------------- | ------- |
| TC-001 | [Title]         | [Preconditions] | 1. [Step 1]<br>2. [Step 2] | [Expected Result] | Not Run |

- Assign unique, sequential IDs (`TC-001`, `TC-002`, etc.) unless project conventions specify otherwise.
- Place each test case in a separate row.
- Use numbered steps and `<br>` for line breaks within table cells.
- Escape or reformat literal pipe characters (`|`) in cell content to preserve table structure.
- Set every initial status to `Not Run`.
- Preserve traceability using project conventions; otherwise, include requirement references in a relevant cell or a separate section.
- Document unresolved requirements and affected coverage separately from confirmed test cases.

## 3. Save the Artifact

- Use the `edit` tool to create the artifact at the appropriate path.
- Include the complete reviewed test suite.
- Do not modify application code or generate automated test scripts.

## 4. Verify the Saved File

Use the available `read` or `search` tools to verify the saved artifact.

Confirm that:

- The file exists at the intended path.
- All reviewed test cases are present, without unintended duplication or truncation.
- IDs are unique and sequential.
- All required columns are present and correctly ordered.
- Table formatting, steps, preconditions, expected results, and statuses are preserved.
- Requirement references and unresolved coverage notes are retained.

Correct any detected issues and verify the artifact again when possible.

## 5. Report the Result

Report:

- The saved file path.
- The number of test cases created.
- Any unresolved requirements or known coverage gaps.
- Whether the artifact was successfully verified.

Do not claim creation, saving, or verification unless confirmed by the available tools.

---
name: design-test-cases
description: Instructions for applying test design techniques and writing detailed, independent manual test cases based on gathered context.
---

# Manual Test Case Design Instructions

**Objective:** Transform the findings from `01-analyze-requirements.md` into detailed, independently executable manual test cases with reproducible steps and observable expected results.

## 1. Establish Test Coverage

- Use the requirements analysis as the basis for test design.
- Cover every relevant acceptance criterion and manual testing checklist item.
- Add scenarios identified through implementation analysis and relevant regression risks.
- Split checklist items into separate test cases when they involve distinct inputs, conditions, permissions, states, or outcomes.
- Avoid unrelated scenarios and redundant coverage.

## 2. Apply Test Design Techniques

Select techniques based on the feature and its risks:

- **Equivalence partitioning:** Cover meaningfully different classes of valid and invalid inputs.
- **Boundary value analysis:** Test relevant limits and adjacent values when constraints are established.
- **Decision tables:** Cover meaningful combinations of conditions that affect outcomes.
- **State transition testing:** Verify relevant state changes and invalid transitions.
- **Negative testing:** Cover applicable validation, authorization, and failure scenarios.
- **Risk-based testing:** Prioritize critical workflows, access control, data integrity, and high-impact failures.

Use only constraints and expected behavior supported by requirements or verified contracts. **Do not** invent limits, business rules, or state transitions.

## 3. Write Independent Test Cases

Each test case must verify one clearly defined scenario and be executable without relying on another test case.

### Test Case Title

- Describe the specific behavior being verified.
- Use concise, distinguishable wording.
- Avoid vague titles such as "Check validation" or "Test API".

### Preconditions

- Specify the required application state, permissions, configuration, and test data.
- Identify accounts, records, files, or fixtures that must be prepared.
- Include only conditions necessary to execute the test.
- **Do not** repeat execution steps or assume that unverified test data already exists.

### Steps to Reproduce

- Provide numbered steps in execution order.
- Describe concrete actions, navigation, and input values.
- Use exact values when supported by requirements, verified contracts, or available fixtures.
- Ensure each step is unambiguous and reproducible.
- **Do not** combine independent scenarios or include automated test scripts.

### Expected Result

- Describe the observable outcome of the test.
- Specify relevant responses, validation outcomes, data changes, access restrictions, or state transitions when supported by requirements.
- Make the result specific enough to determine whether the test passed or failed.
- **Do not** invent error messages, status codes, UI behavior, or persistence outcomes.
- If implementation behavior conflicts with requirements, use the requirements as the expected behavior and flag the discrepancy for review.

### Status

- Set the initial status to `Not Run`.
- **Never** mark a test as passed or failed without execution evidence.

## 4. Define Test Data

- Reuse verified fixtures and established project test data when available.
- Choose representative values that distinguish relevant input classes and outcomes.
- Use distinct records when needed to verify filtering, pagination, persistence, or data isolation.
- **Do not** use sensitive production data or invent existing accounts, records, or fixtures.
- When concrete values are unavailable, use explicit placeholders such as `<authorized_test_user>` or `<valid_image_payload>` and state what must be prepared.

## 5. Cover Failure and Regression Scenarios

Consider applicable scenarios involving:

- Missing, malformed, invalid, or unsupported inputs.
- Relevant boundary conditions and partially populated data.
- Authentication and authorization failures.
- Empty results and no-match scenarios.
- Dependency failures, timeouts, and error handling.
- Duplicate or repeated operations.
- Persistence, data consistency, and state transitions.
- Pagination, filtering, and sorting.
- Existing functionality that could be affected by the change.

Include only scenarios relevant to the feature and supported by requirements, verified contracts, or identified risks. **Do not** create a test for every category by default.

## 6. Maintain Traceability

- Link each test case to at least one requirement, acceptance criterion, or checklist item.
- Preserve existing requirement IDs and references where available.
- Follow the traceability convention defined in `04-create-and-verify-artifact.md` when the output format has no dedicated traceability field.
- Ensure every relevant checklist item is covered or explicitly marked as unresolved or not applicable, with a reason.
- **Do not** claim complete coverage when relevant gaps remain.

## 7. Handle Unresolved Requirements

- Continue designing test cases for confirmed behavior when other requirements remain unclear.
- **Do not** block the entire test design because of an unresolved question.
- **Do not** invent expected results for unconfirmed behavior.
- Record each unresolved question, its impact on coverage, and the clarification required.
- Keep independent, confirmed scenarios testable; mark only the affected coverage as pending clarification.
- Revisit affected scenarios when the missing information becomes available.

## 8. Prepare the Draft for Review

Before passing the draft to `03-review-coverage-and-quality.md`, verify that:

- Each test case covers a distinct, relevant scenario.
- Preconditions and steps are complete, actionable, and reproducible.
- Expected results are observable and supported by requirements or verified contracts.
- Test data is available or explicitly identified for preparation.
- Relevant requirements and checklist items are traceable to test cases.
- Coverage gaps, unresolved questions, and implementation discrepancies remain visible.

**Do not** modify application code or save the final artifact in this step. Artifact formatting, creation, and verification are handled by `04-create-and-verify-artifact.md`.

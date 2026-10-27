---
name: review-coverage-and-quality
description: Instructions for reviewing draft test cases to ensure coverage, accuracy, independence, and traceability before final artifact creation.
---

# Test Case Review Instructions

**Objective:** Review and correct the draft test cases before final artifact creation.

## 1. Verify Coverage

- Compare test cases against confirmed requirements, acceptance criteria, the manual testing checklist, and identified risks.
- Identify missing positive, negative, boundary, authorization, and regression scenarios where relevant.
- Ensure every relevant checklist item is covered or explicitly marked as unresolved or not applicable, with a reason.
- **Do not** claim complete coverage when relevant gaps remain.

## 2. Verify Test Case Quality

Check that every test case has:

- A specific, unique title and a distinct scenario.
- Complete preconditions and independently executable steps.
- Concrete, correctly ordered actions and appropriate test data.
- Observable expected results.
- Consistent preconditions, inputs, steps, and expected results.

_Note:_ Correct ambiguous, incomplete, redundant, or unnecessarily complex cases.

## 3. Verify Accuracy

- Validate expected results and test data against confirmed requirements, authoritative contracts, and available fixtures.
- **Do not** treat implementation behavior as correct when it conflicts with requirements.
- Remove unsupported assumptions and invented business rules, error messages, status codes, or outcomes.
- Flag implementation discrepancies and unresolved questions instead of inventing expected behavior.
- Add missing cases only when their expected behavior is sufficiently established.

## 4. Verify Traceability

- Map each test case to a relevant requirement, acceptance criterion, or checklist item.
- Preserve existing requirement references and follow the convention in `04-create-and-verify-artifact.md`.
- Verify that all test case IDs are unique and every initial status is `Not Run`.
- **Do not** imply that tests were executed or passed.

## 5. Final Review

- Correct all issues that can be resolved using available evidence.
- Keep unresolved requirements, affected scenarios, and coverage gaps documented.
- Preserve valid test cases for confirmed behavior even when other scenarios need clarification.
- Pass the reviewed draft to `04-create-and-verify-artifact.md`. **Do not** block artifact creation solely because some requirements remain unresolved.

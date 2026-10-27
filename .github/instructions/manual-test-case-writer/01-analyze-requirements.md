---
name: analyze-requirements
description: Instructions for gathering context and analyzing requirements before writing test cases.
---

# Requirements Analysis Instructions

**Objective:** Understand what must be tested, identify the relevant implementation and contracts, and establish a reliable basis for manual test case design.

## 1. Locate Relevant Context

- Read the task description and any explicitly provided acceptance criteria.
- Use `search` to locate the relevant implementation plan and manual testing checklist.
- Inspect related documentation, API contracts, source files, and existing tests when available.
- Follow references from the plan and checklist to identify the relevant application modules.
- Reuse existing project conventions and test data where applicable.
- **Do not** assume that a file exists merely because the implementation plan references it.

## 2. Analyze Requirements and Checklist

Identify:

- Confirmed functional and non-functional requirements.
- Acceptance criteria and observable expected behavior.
- Every relevant item in the manual testing checklist.
- Existing behavior that must remain unchanged.
- Relevant validation rules, permissions, error handling, and boundary conditions.
- Unresolved questions or conflicting requirements that may affect testing.

_Note:_ Use the checklist as the baseline for coverage, not as the only source of test scenarios. If no checklist exists, derive the initial testing scope from the task description, acceptance criteria, and verified codebase context. **Do not** invent missing requirements.

## 3. Inspect the Implementation

When implementation is available:

- Trace the relevant execution flow through the affected modules.
- Inspect applicable resolvers, controllers, services, DTOs, validation rules, authorization policies, data models, and UI components.
- Review existing tests to understand established contracts and known scenarios.
- Identify actual input constraints, supported formats, defaults, error-handling behavior, and observable outputs.
- Identify integration points and dependencies that may introduce relevant failure scenarios.
- Inspect only the code needed to understand the requested functionality and its relevant regression risks.
- **Do not** treat current implementation behavior as proof of intended behavior. Compare it with the requirements and documented contracts. Record discrepancies for review rather than silently adopting implementation behavior as correct.

If implementation is missing or incomplete, identify what can be established from available evidence and what remains unknown.

## 4. Establish Expected Behavior

Classify findings as:

- **Confirmed:** Explicitly stated in requirements or supported by an authoritative contract.
- **Implementation detail:** Verified behavior or constraints observed in the current code.
- **Assumption:** A reasonable interpretation that is not explicitly confirmed.
- **Open Question:** Missing or conflicting information that could change the expected result.

- Resolve uncertainties through code and documentation inspection where possible.
- **Do not** invent business rules, UI elements, endpoints, permissions, error messages, or expected results.
- When a requirement conflicts with the implementation, preserve the requirement as the expected behavior and flag the discrepancy. **Do not** design a test that treats a potential defect as correct behavior.

## 5. Identify Testing Risks

Determine which areas require deeper test coverage based on the feature and its dependencies, including where relevant:

- Main successful flows and meaningful alternatives.
- Invalid, missing, or boundary inputs.
- Authentication and authorization.
- Error handling and dependency failures.
- Data integrity and persistence.
- State transitions and pagination.
- Regression risks to existing functionality.

_Note:_ Include only areas relevant to the task. **Do not** generate test cases in this step.

## 6. Prepare Findings for Test Design

Before proceeding to test case design, establish:

- The confirmed scope of the feature.
- The relevant checklist items and acceptance criteria.
- The source files and contracts that define expected behavior.
- The existing behavior that requires regression coverage.
- Relevant test data or fixtures available in the repository.
- Identified risks, implementation discrepancies, assumptions, and open questions.

Keep the findings concise and use them as the basis for the next instruction module. **Do not** create test case IDs, detailed execution steps, or the final test case artifact in this step.

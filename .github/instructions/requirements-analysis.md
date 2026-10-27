# Requirements Analysis

## Objective

Analyze the business task, define the testing scope, and identify requirements that need verification.

## Procedure

### 1. Analyze requirements

Identify:

- Business objective and expected behavior.
- Acceptance criteria and constraints.
- Existing behavior that must remain unchanged.
- Affected user flows, components, and dependencies.

Break the task into individually testable requirements and assign unique references for coverage tracking.

### 2. Inspect the implementation

When repository access is available:

- Locate relevant code and existing tests.
- Verify implementation details, validation rules, defaults, and state transitions.
- Identify dependencies and regression risks.

Treat business requirements and implementation findings as separate sources. Existing implementation does not prove that requirements are satisfied.

### 3. Identify gaps and risks

Document unresolved ambiguities, missing information, required test data, and potential failure risks.

Do not invent requirements or expected behavior. Continue with verifiable requirements and explicitly flag unresolved questions.

### 4. Define testing scope

Identify applicable functional, negative, boundary, integration, and regression scenarios. Track automated testing requirements separately from manual test cases.

### 5. Prepare analysis output

Provide:

- Testable requirements and their references.
- Relevant implementation findings.
- Preconditions and test data.
- Key risks and regression concerns.
- Unresolved ambiguities.
- Automated testing requirements.

Use this analysis in `instructions/test-case-design.md`.

## Rules

- Analyze the complete task before designing test cases.
- Never invent requirements or claim unverified findings.
- Do not modify application code.

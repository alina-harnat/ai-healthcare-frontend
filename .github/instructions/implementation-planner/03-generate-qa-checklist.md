---
name: generate-qa-checklist
description: Generate a concise, high-level manual testing checklist grounded in confirmed requirements and the implementation plan.
---

# Manual Testing Checklist Instructions

**Objective:** Create a concise checklist of mandatory testing areas and observable behaviors based on the task requirements, acceptance criteria, and implementation plan. This checklist defines what must be tested, not detailed test procedures.

## 1. Use This Structure

Follow this Markdown template. Include only sections relevant to the task. **Do not** leave empty sections or include irrelevant testing categories.

```md
# <Feature Name> — Manual Testing Checklist

## Functional Scenarios

- [ ] **Verify** [core functionality or important behavior].
- [ ] **Verify** [another relevant behavior].

## Validation and Error Handling

- [ ] **Verify** [relevant input validation or error handling].

## Permissions and Access

- [ ] **Verify** [relevant authorization behavior].

## Regression Checks

- [ ] **Verify** [existing behavior that must remain unchanged].
```

## 2. Define Checklist Scope

- Identify the mandatory testing areas based on the task requirements, acceptance criteria, affected functionality, and relevant risks.
- Cover the main successful flow, important variations, meaningful negative scenarios, and regression behavior as applicable.
- Include validation, authorization, boundary conditions, and error handling when relevant to the task.
- Group related checks into broad, independently understandable checklist items.
- Keep each item specific enough to communicate what must be verified without prescribing detailed test procedures.
- Prioritize meaningful coverage over checklist length.
- **Do not** expand every testing area into an exhaustive list of individual scenarios.
- **Do not** automatically include unrelated categories such as responsive design, accessibility, performance, or security testing unless they are relevant to the task.
- **Do not** generate detailed test cases; leave scenario decomposition, test data, execution steps, and expected results to the dedicated manual test-case generation workflow.

## 3. Ground Expected Behavior

- Derive expected behavior from explicit requirements, acceptance criteria, and verified codebase contracts.
- Use the implementation plan to identify affected functionality, but **do not** treat assumptions in the plan as confirmed requirements.
- **Do not** invent business rules, UI states, error messages, permissions, or expected results.
- Resolve uncertainties through code inspection when possible.
- If an unresolved question affects testing, clearly mark the relevant item as pending clarification or document the question separately.
- **Do not** assume the planned feature is already implemented.

## 4. Keep It Manual and High-Level

- Describe observable outcomes that a tester can verify manually.
- Prefer broad checks such as: "Verify that an authorized user can successfully search for a medication using an image."
- **Do not** write low-level, step-by-step test procedures.
- **Do not** include test case IDs, priorities, preconditions, detailed steps, test data tables, or separate expected-result fields.
- Exclude unit tests, code-level assertions, and implementation tasks.
- Include backend, persistence, logging, or infrastructure checks only when they are relevant and can be verified manually with available access.
- **Do not** claim that any scenario has been executed.

## 5. Validate Consistency

Before finalizing the checklist:

- Ensure the checklist aligns with the requirements and implementation plan.
- Ensure all important acceptance criteria are represented by one or more checklist items.
- Verify that each item describes a meaningful testing area or observable behavior.
- Remove redundant, overly granular, irrelevant, or unsupported items.
- Ensure regression checks cover existing behavior that the task requires preserving.
- Ensure unresolved requirements are clearly identified rather than presented as confirmed behavior.
- Keep the checklist concise and suitable as input for a dedicated manual test-case generation workflow.

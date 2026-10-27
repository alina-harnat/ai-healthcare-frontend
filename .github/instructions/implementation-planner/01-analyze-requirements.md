---
name: analyze-requirements
description: Inspect task requirements and relevant codebase context; identify confirmed requirements, assumptions, and open questions.
---

# Requirements Analysis

## Objective

Understand the requested change and identify the relevant codebase context before drafting the implementation plan.

## 1. Gather Context

- Read the task description and any provided acceptance criteria.
- Use `search` and `read` to inspect relevant source files, tests, API contracts, types, configuration, and project conventions.
- Trace the existing execution flow only as far as needed to understand the requested change.
- Identify the affected modules and architectural layers.
- Reuse established project patterns where appropriate.
- Distinguish existing behavior from requested changes.

Do not inspect unrelated modules or assume that every task requires database, backend, and frontend changes.

## 2. Analyze Requirements

Identify:

- Explicit functional and non-functional requirements.
- Relevant API contracts, data models, validation rules, and authorization policies.
- Existing behavior that must remain unchanged.
- Relevant error handling, loading states, empty states, and boundary conditions.
- Dependencies or architectural constraints that affect implementation.

Include only findings relevant to the requested task.

## 3. Handle Missing Information

- Resolve uncertainties through code inspection before documenting them.
- Base assumptions on verified codebase patterns or explicit task context.
- Label assumptions clearly; never present them as confirmed requirements.
- Record unresolved decisions as Open Questions and explain their impact.
- Do not invent API contracts, business rules, expected behavior, or acceptance criteria.
- Do not block planning solely because information is missing. Produce the best grounded plan possible and identify where clarification may be needed.

If the task does not require assumptions or open questions, omit those sections rather than adding filler.

## 4. Prepare Findings

Use the findings to inform the implementation plan's Goal, Technical Approach, Tasks, Files, Verification, and any relevant Assumptions or Open Questions sections.

Do not reproduce the full analysis in the plan. Include only information needed to understand, implement, or verify the change.

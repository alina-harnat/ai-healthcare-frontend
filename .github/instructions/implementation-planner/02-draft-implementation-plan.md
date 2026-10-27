---
name: draft-implementation-plan
description: Generate concise, actionable implementation plans grounded in requirements and verified codebase context.
---

# Implementation Plan Instructions

**Objective:** Create an actionable implementation plan based on task requirements and findings from requirements analysis.

## 1. Use This Structure

Follow this Markdown template. Omit optional sections when they are not relevant.

```md
# <Feature Name> Implementation Plan

## Goal

[Describe the expected outcome and key acceptance criteria.]

## Technical Approach

[Explain the proposed solution at a high level. Identify relevant existing functionality, architectural decisions, and important constraints.]

## Tasks

1. [Task Name]: [Brief description of the phase.]

## Files

- `path/to/file.ts` — [Describe the intended change.]
- `path/to/another-file.ts` (proposed) — [Describe the intended change.]

## Verification

- [Describe relevant automated tests and quality checks.]
- [Describe important behaviors and regressions to verify.]

## Assumptions

- [Clearly labeled assumption, if needed.]

## Open Questions

- [Unresolved question and its impact, if needed.]

## Blockers

- **Issue:** [Unresolved decision or missing information.]
- **Impact:** [What cannot be determined or planned reliably.]
- **Required action:** [Specific clarification or decision needed.]
```

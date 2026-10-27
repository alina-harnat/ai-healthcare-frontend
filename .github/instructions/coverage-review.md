# Coverage Review

## Objective

Verify that the generated test suite completely and flawlessly covers the business requirements and relevant risks.

## Procedure

### 1. Check requirements coverage

- Map each requirement and acceptance criterion to one or more test case IDs.
- Identify requirements with missing or insufficient coverage.
- Verify that existing behavior requiring regression protection is covered.

### 2. Evaluate scenario coverage

- Identify missing scenarios for meaningful risks, alternative flows, and component interactions.
- Check whether relevant negative, boundary, and state-transition scenarios are covered.
- Detect redundant cases that add no distinct verification value.

### 3. Resolve coverage gaps

- Add missing test cases or improve existing ones.
- Do not invent requirements or expected behavior.
- Record unresolved ambiguities and uncovered requirements separately.

## Output

Return the reviewed test suite and a concise list of remaining coverage gaps or unresolved ambiguities.

Proceed to `instructions/excel-export.md` only when Excel export is requested.

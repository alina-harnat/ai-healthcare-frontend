---
name: artifact-management
description: Define naming, creation, linking, and verification rules for implementation plans and manual testing checklists.
---

# Artifact Management Instructions

**Objective:** Create and verify exactly two Markdown artifacts for each planning task.

## 1. Required Artifacts

Create these files:

1. Implementation plan: `docs/plans/YYYY-MM-DD-<feature-name>.md`
2. Manual testing checklist: `docs/testing-checklists/YYYY-MM-DD-<feature-name>-testing-checklist.md`

**Do not** create additional planning artifacts unless explicitly requested.

## 2. Naming Rules

- Determine the current date and use `YYYY-MM-DD` format.
- Use a concise, descriptive, `kebab-case` feature name.
- Use the exact same date and feature name in both filenames.
- Create the destination directories if they do not exist and the available tools permit it.
- Inspect existing files before writing. **Do not** overwrite unrelated or previous artifacts silently.
- If a target file already exists, inspect its contents and avoid overwriting existing work without an explicit reason.

## 3. Link the Artifacts

- Add a relative Markdown link to the testing checklist at the bottom of the implementation plan.
- Use the path relative to the implementation plan's location.

Example:

```md
[Manual Testing Checklist](../testing-checklists/YYYY-MM-DD-<feature-name>-testing-checklist.md)
```

- Replace the example date and feature name with the actual values.
- Verify that the link points to the exact checklist created for the same task.

## 4. Create the Files

- Use the available `edit` tool to create or update the artifacts in the workspace.
- Save the implementation plan to `docs/plans/`.
- Save the checklist to `docs/testing-checklists/`.
- **Do not** substitute chat output for workspace files.
- **Do not** claim that a file was created unless the available tools confirm the operation.

## 5. Verify the Results

After writing both files:

- Verify that both files exist at the expected paths, if the available tools support verification.
- Check that the filenames use the same date and feature name.
- Check that the implementation plan contains a valid relative link to the checklist.
- Check that both files describe the same feature and have no contradictory requirements.
- If file creation or verification fails, report the limitation accurately. **Do not** claim success without evidence.

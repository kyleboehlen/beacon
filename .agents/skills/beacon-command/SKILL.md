---
name: beacon-command
description: Map Beacon command requests to repo-local .agents/commands files. Use when the user invokes /command <name>, says command <name>, asks to run a Beacon command by name, or refers to workflows such as vitest, xunit, fsd, storybook, accessibility, docs, http-tests, or backend-architecture.
---

# Beacon Command

Use this skill as a wrapper for Beacon repo commands stored in `.agents/commands`.

## Workflow

1. Resolve the current repository root from the working directory.
2. Resolve the requested command name to `.agents/commands/<name>.md`.
3. If the exact file exists, read it and follow its instructions as the source of truth.
4. If the command name is missing, ambiguous, or no exact file exists, list available commands from `.agents/commands/*.md` and ask the user to choose one.
5. If the selected command asks for scope selection, ask the user before analysis or edits.
6. Follow any project-level instructions and referenced README files in addition to the command file.

## Command Resolution

Accept these forms:

- `/command vitest`
- `command vitest`
- `run the vitest command`
- `use the fsd command`
- `check storybook`

Map only to files that exist in `.agents/commands`. Do not invent commands.

## Examples

- `vitest` maps to `.agents/commands/vitest.md`
- `xunit` maps to `.agents/commands/xunit.md`
- `fsd` maps to `.agents/commands/fsd.md`
- `storybook` maps to `.agents/commands/storybook.md`
- `accessibility` maps to `.agents/commands/accessibility.md`
- `docs` maps to `.agents/commands/docs.md`
- `http-tests` maps to `.agents/commands/http-tests.md`
- `backend-architecture` maps to `.agents/commands/backend-architecture.md`

## Missing Commands

When a command is missing, run or infer the equivalent of:

```bash
find .agents/commands -maxdepth 1 -type f -name '*.md'
```

Then present the command names without the `.md` extension.

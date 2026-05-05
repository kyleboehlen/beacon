# Docs — Comment & Documentation Coverage Checker

You check that code comments are accurate and explain the "why", and that all markdown documentation (READMEs, specs, Claude commands) is up to date.
You recommend documentation changes but always prompt the user for final verbiage before writing.

## Scope Selection (for code comment analysis; you always check all markdown docs)

Before doing any analysis, ask the user what scope to check using AskUserQuestion with these options:

1. **Specific area** — Check a single feature, component, or controller. If selected, ask a follow-up question for the name.
2. **Modified git files** — Check only files modified on the current branch (use `git diff --name-only master...HEAD`).
3. **Whole project** — Full scan of all source code.

Regardless of scope selection, always check both frontend (Vue/TS) and backend (.NET/C#) code for comment coverage.

## Part 1: Code Comment Analysis

### Step 1: Discover source files in scope

Based on the selected scope, find all source files:
- Frontend: `frontend/src/**/*.{vue,ts}` (exclude `*.spec.ts`, `*.stories.ts`, generated files in `shared/models/generated/`)
- Backend: `backend/**/*.cs` (exclude `obj/`, `bin/`, migrations)

### Step 2: Check comment coverage

For each file, evaluate:

1. **Functions/methods** — Public and exported functions should have a comment explaining *why* they exist or what non-obvious purpose they serve. Simple getters, standard CRUD, and self-documenting one-liners do not need comments.
2. **Complex logic** — Any block with branching, non-obvious calculations, or workarounds should have an inline comment explaining *why*, not *what*.
3. **TODOs** — Flag any `// TODO` comments and report them. Check if they are still relevant or stale.
4. **Misleading comments** — Flag comments that don't match what the code actually does (e.g., comment says "returns X" but code returns Y, or comment references old behavior after a refactor).
5. **Redundant comments** — Flag comments that just restate the code (e.g., `// increment counter` above `counter++`). These should be removed, not added.

### Step 3: Report comment coverage

Present findings grouped by file:

```
## frontend/src/features/rules-wizard/ui/RulesWizard.vue
- Line 42: Complex conditional lacks explanation of WHY this fallback exists
- Line 78: TODO is stale — references ticket #55 which is closed

## backend/Controllers/Rules/RulesController.cs
- Line 11: Comment says "returns hydrated config" but method also validates permissions (misleading)
```

### Step 4: Offer to add/fix comments

For each issue found, ask the user (via AskUserQuestion) if they want to:
1. **Add/fix the comment** — You draft the comment, then prompt the user for final verbiage before writing it
2. **Skip it** — Mark as intentionally uncommented and update this command's conventions
3. **Remove it** — If the comment is redundant or misleading and should just be deleted

When drafting a comment, always present your suggestion and ask the user to confirm or rephrase before writing. The user controls the final wording.

### Voice matching

Before drafting any comment text, read a sample of existing comments in the codebase (both frontend and backend) to understand the user's writing style — tone, capitalization, punctuation, verbosity level, use of humor or directness.
Draft all suggested comments in that same voice.
If the user rephrases your suggestion, note the style difference and apply it to subsequent suggestions in the same session.

## Part 2: Annotation Coverage (TSDoc / XML Doc Comments)

Annotations are structured documentation on public/exported members that power IDE tooltips and auto-generated docs. They are separate from inline "why" comments.

### Frontend — TSDoc

Uses `/** */` block comments with TSDoc tags. Expected on all public/exported members:
- Exported functions and composables
- Component props (via `defineProps` — annotate the interface/type)
- Component emits (via `defineEmits` — annotate the interface/type)
- Public store actions and getters
- Exported utility functions
- Exported types and interfaces

```typescript
/**
 * Fetches and returns the default rules configuration from the API.
 * @returns The hydrated rules config with all rule options populated
 */
export function useRulesApi() { ... }
```

Common tags: `@param`, `@returns`, `@throws`, `@example`, `@see`

### Backend — XML Documentation Comments

Uses `/// <summary>` style comments. Expected on all public members:
- Controller action methods
- Public service methods
- Public model/DTO properties (when the name isn't self-explanatory)
- Public extension methods
- Request/response classes

```csharp
/// <summary>
/// Returns the default rules configuration with all available rule options.
/// </summary>
/// <returns>A BeaconResponse containing the hydrated rules config.</returns>
[HttpGet("HydrateRulesConfig")]
public BeaconResponse<HydrateRulesConfigResponse> HydrateRulesConfig() { ... }
```

Common tags: `<summary>`, `<param name="">`, `<returns>`, `<remarks>`, `<exception cref="">`

### Analysis steps

1. **Find missing annotations** — For each public/exported member in scope, check if a TSDoc or XML doc comment exists
2. **Verify existing annotations** — Check that `@param`/`<param>` names match actual parameter names, `@returns`/`<returns>` descriptions match actual return behavior, and descriptions still reflect what the code does
3. **Report findings** — same format as code comments, grouped by file with line numbers
4. **Offer to add/fix** — Draft the annotation, prompt user for final verbiage. Use the voice matching approach from Part 1.

### Annotations are NOT expected on:
- Private/internal members
- Constructor parameters that are just DI injection (C# primary constructors)
- Test files (`.spec.ts`, `.stories.ts`)
- Generated code (`shared/models/generated/`)
- Override methods where the base class already documents the contract

## Part 3: Markdown Documentation Analysis

### Step 1: Discover all documentation files

Find all markdown files that serve as documentation:
- Project READMEs: `**/README.md`
- Claude specs: `.claude/specs/*.md`
- Claude commands: `.claude/commands/*.md`

### Step 2: Check documentation accuracy

For each markdown file:

1. **Read the document** and understand what it claims
2. **Cross-reference with actual code** — Verify that file paths, class names, endpoint routes, component names, and described behaviors still match the codebase
3. **Check for staleness** — Look for references to files that no longer exist, features that were renamed, or workflows that changed
4. **Check for completeness** — Are there new files, endpoints, or features in the codebase that should be documented but aren't mentioned?

### Step 3: Report documentation findings

Present findings grouped by file:

```
## backend/README.md
- References `GameController` but the controller was renamed to `ScenarioController`
- Missing documentation for the new Rules endpoints

## .claude/commands/http-tests.md
- Test files table is missing `scenarios.http` which was added recently
```

### Step 4: Offer to update documentation

For each issue found, present your recommended change and ask the user for final verbiage using AskUserQuestion before writing. Options for each finding:

1. **Update with your wording** — User approves your suggested text as-is
2. **Update with custom wording** — User provides their preferred phrasing (use the "Other" option)
3. **Skip** — Leave as-is

## Comment Conventions (self-updating)

These conventions define what does and does not need comments.
When the user says something does or does not need a comment during a session, update this section to reflect their preference.

### Comments ARE expected on:
- Non-obvious business logic or domain-specific rules
- Workarounds or hacks with a reason why they exist
- Complex conditionals or algorithms
- Public API methods in controllers (brief purpose)
- Configuration or environment-specific behavior

### Comments are NOT expected on:
- Self-documenting simple functions (getters, setters, standard CRUD)
- Import statements
- Declarative Vue template markup
- Type definitions and interfaces (the types are self-documenting)
- Simple event handler wiring
- Test files (`.spec.ts`, `.stories.ts`)
- Generated code (`shared/models/generated/`)

## Workflow

1. Ask for scope selection
2. Scan all source files in scope for comment coverage issues (both frontend and backend)
3. Report code comment findings with line numbers
4. Offer to add/fix/remove comments, prompting user for final verbiage on each
5. Check annotation coverage (TSDoc for frontend, XML doc comments for backend)
6. Report missing or inaccurate annotations with line numbers
7. Offer to add/fix annotations, prompting user for final verbiage on each
8. Scan all markdown documentation files for accuracy
9. Cross-reference docs against actual codebase
10. Report documentation findings
11. Offer to update docs, prompting user for final verbiage on each
12. If the user says something does or does not need a comment or annotation, update the conventions sections of this command to reflect that preference for future runs
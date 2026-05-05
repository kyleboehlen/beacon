# Vitest — Frontend Unit Test Runner

You run frontend unit tests using the `beacon-vitest` Docker container and report results.

You also check test coverage, and write missing tests after asking if you should write that test.

## Scope Selection (for writing tests, you always check all tests for failures)

Before doing any analysis, ask the user what scope to check using AskUserQuestion with these options:

1. **Specific feature** — Check a single feature. If selected, ask a follow-up question for the feature name.
2. **Modified git files** — Check only files modified on the current branch (use `git diff --name-only master...HEAD` to find them, then filter files).
3. **Whole project** — Full scan of all frontend features and components.

## How to Run Tests

The vitest container runs in watch mode. To see current test output:

```bash
docker logs beacon-vitest --tail 100
```

Container will automatically pick up test changes.

Wait a few seconds for tests to execute, then read logs again without `-f` to capture the output.

## Troubleshooting

### Container not running
Check if the container exists and prompt to restart it via Rider start config.

```bash
docker ps -a --filter name=beacon-vitest --format "{{.Status}}"
```

### Tests not picking up changes
Restart the container to force vitest to re-scan:

```bash
docker compose -f beacon-infra/docker-compose-develop.yml restart frontend-test
```

### Dependency changes (new packages added)
Prompt to troubleshoot container, possibly remove image, and restart it via Rider start config.

## Test Conventions

- Test files: `ComponentName.spec.ts`, co-located with the component
- Framework: Vitest + @vue/test-utils
- Use `data-testid` attributes for DOM queries
- Organize tests with `describe` blocks: Rendering, Navigation, Accessibility, Edge Cases
- Use `beforeEach` with `mount()` for component setup
- Test behavior (events, state changes), not static content
- Include accessibility assertions: roles, ARIA attributes, keyboard events
- For Pinia stores: use `createPinia()` and `setActivePinia()` in `beforeEach` using test Pinia

## Workflow

1. Read the container logs to get current test status
2. If tests are failing, read the failing test file and the component under test
3. Identify the issue and report findings
4. If asked to fix, make changes
5. Read logs again to confirm the fix
6. If I tell you about a test I want, or a test I don't want, you update this documentation to reflect that for the future
7. You verify that tests and documentation (comments and READMEs) match

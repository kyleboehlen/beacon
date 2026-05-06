# xUnit — Backend Unit Test Runner

You run backend unit tests using the `beacon-xunit` Docker container and report results.

You also check test coverage against service methods and pure logic, and write missing tests after asking if you should write them.

## Scope Selection (for writing tests, you always check all tests for failures)

Before doing any analysis, ask the user what scope to check using AskUserQuestion with these options:

1. **Specific feature** — Check a single feature's services/models. If selected, ask a follow-up question for the feature name.
2. **Modified git files** — Check only files modified on the current branch (use `git diff --name-only master...HEAD` to find them, then filter to backend files).
3. **Whole project** — Full scan of all backend features and services.

## How to Run Tests

The xunit container runs in watch mode. To see current test output:

```bash
docker logs beacon-xunit --tail 100
```

The container will automatically pick up test file changes.

Wait a few seconds after file changes for tests to re-run, then read logs again.

## Troubleshooting

### Container not running
Check if the container exists and prompt to restart it via Rider start config.

```bash
docker ps -a --filter name=beacon-xunit --format "{{.Status}}"
```

### Tests not picking up changes
Restart the container to force a re-scan:

```bash
docker compose -f beacon-infra/docker-compose-develop.yml restart backend-test
```

## Test Conventions

- **Test files**: `{Feature}Tests.cs`, placed flat in `backend.Tests/` (no subdirectory required; group by feature)
- **Framework**: xUnit — `[Fact]` for single cases, `[Theory]` + `[InlineData]` for parameterized cases
- **No test class setup method** — xUnit uses constructors; prefer simple `[Fact]` methods
- **Arrange / Act / Assert** structure, no comments needed if the test name is clear
- **Assertions**: Use `Assert.Equal`, `Assert.Contains`, `Assert.DoesNotContain`, `Assert.Empty`, `Assert.NotEmpty`, `Assert.True`, `Assert.False`
- **Test names**: Descriptive sentences — `ValidReferenceNumbers_ShouldParseCorrectly`, `CreateRulesConfig_WithMissingField_ShouldReturnNull`

## What to Test

Focus on **pure business logic** — anything testable without a running database or HTTP server:

- **Service methods** that transform or validate data (e.g. parsing, mapping, calculation)
- **Model constructors and defaults** — e.g. `new RulesConfig()` produces correct default values
- **Utility/parser classes** — e.g. `ReferenceNumberParser`
- **Validation logic** — e.g. reference number validation against `ValidReferenceNumbers.txt`
- **Domain rules** — e.g. game state transitions, rules config invariants

## What NOT to Test

- **HTTP endpoints** — covered by `http-tests` (JetBrains HTTP Client)
- **MongoDB queries** — skip database integration tests unless explicitly asked; they require a live DB
- **Controllers** — they are thin wrappers; no business logic to test
- **DI registration** — not worth unit testing

## Coverage Analysis

### Step 1: Discover services and logic classes

Find all service files in `backend/Features/*/Services/` and any utility/parser classes in the feature directories. For each, identify public methods with meaningful business logic.

### Step 2: Find matching test files

Test files live in `backend.Tests/`. Read each `.cs` file and identify which service methods or logic classes have test coverage.

### Step 3: Report coverage

Present a coverage table:

| Class | Method / Behavior | Has Test |
|-------|-------------------|----------|

Summarize: "X of Y testable behaviors have xUnit tests."

### Step 4: Offer to write missing tests

For each uncovered method or behavior, ask the user (via AskUserQuestion) if you should write a test for it. If yes:

1. Read the source class to understand the logic
2. Read the existing test file(s) for style reference (especially `ReferenceNumberValidationTests.cs`)
3. Write the test using the conventions above
4. Read container logs to confirm the test passes

## Workflow

1. Read container logs to get current test status
2. If tests are failing, read the failing test file and the class under test
3. Identify the issue and report findings
4. If asked to fix, make changes
5. Read logs again to confirm the fix
6. Perform coverage analysis for the selected scope
7. Report coverage table and offer to write missing tests
8. If user approves writing tests, write them, wait for re-run, and confirm they pass
9. If the user tells you about a test they want or don't want, update this documentation to reflect that for the future
10. Verify that tests and documentation (comments, READMEs) stay in sync
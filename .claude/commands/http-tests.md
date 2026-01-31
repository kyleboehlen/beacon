# HTTP Tests — Backend API Integration Test Runner

You run JetBrains HTTP Client tests using the `beacon-http-test-dev` Docker container and report results. These tests verify backend API endpoints work correctly.

You also check test coverage against controller endpoints, and write missing tests after asking if you should write them.

## Scope Selection (for coverage analysis and writing tests; you always run all tests for failures)

Before doing any coverage analysis, ask the user what scope to check using AskUserQuestion with these options:

1. **Specific controller** — Check a single controller's endpoints. If selected, ask a follow-up question for the controller name (list discovered controllers as options).
2. **Modified git files** — Check only controllers modified on the current branch (use `git diff --name-only master...HEAD` to find them, then filter for `*Controller.cs` files).
3. **Whole project** — Full scan of all backend controllers.

## How to Run Tests

### Step 1: Ensure the backend is running and healthy

The backend must be up before HTTP tests can run. Check its status:

```bash
docker ps --filter name=beacon-backend-dev --format "{{.Status}}"
```

If the backend needs a restart (e.g. after code changes):

```bash
docker compose -f beacon-infra/docker-compose-develop.yml restart backend-dev
```

Wait for the backend to be ready by checking logs:

```bash
docker logs beacon-backend-dev --tail 20
```

Look for the "Now listening on" message indicating the server is ready.

### Step 2: Run the HTTP tests

Restart the HTTP test container to trigger a fresh test run:

```bash
docker compose -f beacon-infra/docker-compose-develop.yml restart http-test
```

### Step 3: Read test output

```bash
docker logs beacon-http-test-dev --tail 100
```

## Coverage Analysis

After running tests and reporting results, perform coverage analysis for the selected scope.

### Step 1: Discover controller endpoints

Find all controllers in `backend/Controllers/` matching the selected scope. For each controller file, identify all action methods by looking for `[Http*]` attributes (`[HttpGet]`, `[HttpPost]`, `[HttpPut]`, `[HttpDelete]`, `[HttpPatch]`). Build a list of every endpoint: controller name, HTTP method, route, and action method name.

### Step 2: Find matching HTTP test files

Test files live in `backend/Http/` and are named in kebab-case matching the controller (e.g., `RulesController` -> `rules.http`, `HealthCheckController` -> `health-check.http`). Read each relevant `.http` file and identify which endpoints have test requests by matching the HTTP method and URL path.

### Step 3: Report coverage

Present a coverage table:

| Controller | Endpoint | HTTP Method | Route | Has Test |
|------------|----------|-------------|-------|----------|

Mark each endpoint as covered or missing. Summarize: "X of Y endpoints have HTTP tests."

### Step 4: Offer to write missing tests

For each uncovered endpoint, ask the user (via AskUserQuestion) if you should write a test for it. If yes:

1. Read the controller action method and its request/response DTOs to understand the expected behavior
2. Read existing `.http` test files in the same controller's test file for style reference
3. Write the test following the conventions below
4. If no `.http` file exists for this controller, create one and add a `run` entry to `run-all.http`
5. After writing, rebuild the backend if needed and re-run all tests to verify

## Test Files

All test files are in `backend/Http/`:

| File | Purpose |
|------|---------|
| `run-all.http` | Runs all test files in sequence |
| `health-check.http` | Health check endpoint tests |
| `rules.http` | Rules CRUD endpoint tests (hydrate, create, get, update, delete) |

## Environment Configuration

Environments are defined in `backend/Http/http-client.env.json`:

| Environment | Base URL |
|-------------|----------|
| `dev` | `http://localhost:5002` |
| `docker-dev` | `http://backend-dev:8080` |
| `preview` | `http://localhost:5003` |
| `docker-preview` | `http://backend-preview:8080` |
| `production` | `https://beaconconsole.net` |

The Docker container uses the `docker-dev` environment.

## Test Conventions

HTTP test files use the JetBrains HTTP Client format:

```http
GET {{baseUrl}}/api/Rules/HydrateRulesConfig/
Accept: application/json

> {%
    client.test("Request executed successfully", function() {
        client.assert(response.status === 200, "Response status is not 200");
    });

    client.test("Response has success field", function() {
        client.assert(response.body.success === true, "Success should be true");
    });
%}
```

Key patterns:
- `client.test()` defines a named test case
- `client.assert()` performs assertions
- `client.global.set()` stores values between requests (e.g. created IDs for chained CRUD tests)
- All responses follow `BeaconResponse<T>` format with `success` and `payload` fields
- Test names follow `"ControllerName - Action description"` format (e.g. `"Rules - Hydrate default RulesConfig"`)
- Separate requests with `###`
- Always include `Accept: application/json`
- For POST/PUT requests, include `Content-Type: application/json` and a request body matching the request DTO
- Every test should at minimum assert: status code, `success` field, and `payload` structure
- For CRUD flows, chain tests using `client.global.set()` to store created IDs and use them in subsequent get/update/delete requests

## Troubleshooting

### Backend not responding
Restart and rebuild the backend:

```bash
docker compose -f beacon-infra/docker-compose-develop.yml up --build backend-dev
```

### HTTP test container exiting immediately
The test container runs once and exits. Check its exit code and logs:

```bash
docker ps -a --filter name=beacon-http-test-dev --format "{{.Status}}"
docker logs beacon-http-test-dev
```

### Tests failing after schema changes
If DTOs or endpoints changed, ensure:
1. Backend is rebuilt: `docker compose -f beacon-infra/docker-compose-develop.yml up --build backend-dev`
2. Wait for it to be healthy
3. Re-run tests: `docker compose -f beacon-infra/docker-compose-develop.yml restart http-test`

## Workflow

1. Check that `beacon-backend-dev` is running and healthy
2. Restart the backend if code changes need to be picked up
3. Restart `beacon-http-test-dev` to run tests
4. Read the container logs for test results
5. If tests fail, read the relevant `.http` file and the corresponding controller/service
6. Report which tests passed/failed with details
7. If not all of the logs are shown (with 'Running IntelliJ HTTP Client with') at the top, the number of lines to be tailed in this command needs to be increased
8. Perform coverage analysis for the selected scope
9. Report coverage table and offer to write missing tests
10. If user approves writing tests, write them, re-run, and confirm they pass
11. If the user tells you about a test they want, or a test they don't want, update this documentation to reflect that for the future
# HTTP API Tests

This directory contains JetBrains HTTP Client files for testing API endpoints.

## Usage

### In Rider

**Run individual tests:**
1. Open any `.http` file
2. Select environment from dropdown (dev/docker/production)
3. Click the green play button next to any request
4. View response and test results in the tool window

**Run all tests at once:**
1. Open `run-all.http`
2. Select environment from dropdown
3. Click "Run All Requests in File"

OR

1. Right-click on the `Http` directory
2. Select "Run All HTTP Requests in Directory"

### From Command Line

**Using Docker (Recommended):**
```bash
# From the beacon-infra directory
cd beacon-infra

# Run HTTP tests against the dev environment
docker compose -f docker-compose-develop.yml up http-test

# Run with build to pick up changes
docker compose -f docker-compose-develop.yml up --build http-test
```

**Using the run script locally:**
```bash
cd backend/Http
./run-tests.sh dev
```

**Using ijhttp CLI directly:**
```bash
# Install the HTTP Client CLI (if not already installed)
# https://www.jetbrains.com/help/idea/http-client-cli.html

# Run all tests
ijhttp --env-name dev --env-file http-client.env.json health-check.http
ijhttp --env-name dev --env-file http-client.env.json rules.http

# Run in CI/CD
ijhttp --env-name docker-dev --env-file http-client.env.json --log-level VERBOSE health-check.http
```

## Environments

The `http-client.env.json` file defines these environments:
- `dev` - For local development, points to `http://localhost:5002`
- `docker-dev` - For running tests inside Docker containers (dev), points to `http://backend-dev:8080`
- `preview` - For preview environment, points to `http://localhost:5003`
- `docker-preview` - For running tests inside Docker containers (preview), points to `http://beacon-backend-preview:8080`
- `production` - For production, points to `https://beaconconsole.net`

## Adding New Tests

1. Create a new `.http` file or add to an existing one
2. Use `{{baseUrl}}` for the base URL (defined in `http-client.env.json`)
3. Add test assertions using the `> {% %}` blocks
4. If creating a new `.http` file please add it to `run-all.http`

Example:
```http
### My New Endpoint
GET {{baseUrl}}/api/my-endpoint
Accept: application/json

> {%
    client.test("Returns 200", function() {
        client.assert(response.status === 200);
    });
%}
```
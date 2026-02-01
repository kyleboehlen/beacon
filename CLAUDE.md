# BEACON

You should always reference any README.md files and follow them.
If README.md files are out of date, or can be improved, you should suggest that along with changes.
When working in the frontend you may use the fsd agent to verify architecture.
When working with shared frontend components you may use the storybook, vitest, and accessibility agents to verify the components are being created properly.

## Frontend testing
Frontend tests run inside the `beacon-vitest` Docker container (watch mode). **Never run `npx vitest` directly.** Use the `/vitest` skill or read container logs manually:
```bash
docker logs beacon-vitest --tail 100
```
Wait a few seconds after file changes for tests to re-run, then read logs again.

## Backend specific
Backend architecture can be verified by reading the ProjectStructure.md file in the root of the backend directory.
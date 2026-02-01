# BEACON

You should always reference any README.md files and follow them.
If README.md files are out of date, or can be improved, you should suggest that along with changes.
When working in the frontend you may use the fsd agent to verify architecture.
When working with shared frontend components you may use the storybook, vitest, and accessibility agents to verify the components are being created properly.

## Frontend package management
This project uses **pnpm** as its package manager. Never use `npm` or `yarn`. Always use `pnpm` for installing dependencies, running scripts, etc:
```bash
pnpm install
pnpm add <package>
pnpm run <script>
```

## Frontend testing
Frontend tests run inside the `beacon-vitest` Docker container (watch mode). **Never run `npx vitest` directly.** Use the `/vitest` skill or read container logs manually:
```bash
docker logs beacon-vitest --tail 100
```
Wait a few seconds after file changes for tests to re-run, then read logs again.

## Frontend type re-exports
When adding or modifying generated TypeScript types (from `shared/models/generated/`), always re-export them from the owning entity's `models/types.ts` file.
Consumers should import from the entity barrel (`@/entities/<entity>`) rather than directly from `shared/models/generated/`.
This includes the store within the entity the type belongs to.

## Backend specific
Backend architecture can be verified by reading the ProjectStructure.md file in the root of the backend directory.
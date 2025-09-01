# BEACON
The Battlefield Economy And Combat Operations Network allows you to streamline bookkeeping, battles, and tech trees<br>
for the game Space Empires 4X (SE4X) by GMT games. The biggest complaint about this game is the bookkeeping and <br>
this project hopes to relieve that problem.

## Tech Stack

### Frontend
The frontend is an offline first PWA web app that leverages local storage.

- Typescript
- pnpm as a package manager
- Vue3 with the composition API
    - Tailwind for styling
    - Pinia for stores
    - Vitest for unit tests
    - Playwright for e2e testing
    - Storybook for component development
    - TODO: Determine linting strategy

### Backend
- .NET Core API using C# and controllers
- TODO: JetBrains http runners
- TODO: Determine a unit testing solution

### Infra

### Deploy

## Development

The project is set up to be used with JetBrains Rider/Webstorm. For example, it uses JetBrains http runner files as <br>
well as linting config, debug configuration for the backend, etc.

The project is containerized using Docker and Docker Compose, however, the development environment does not match the <br>
production environment. In order to run the API you must debug the API using the DockerfileDev, and start the<br>
development docker-compose file for the frontend and TODO: determine MongoDB or Azureite Emulator in local development.

After cloning the repo, the following steps should get you started (as long as you have the relevant pre-requisites<br>
for example, Docker Desktop or Docker in WSL).

`TODO: Add the docker compose command here`

`TODO: Add the debug configuration for the backend here, be sure to save it to source control in Rider`
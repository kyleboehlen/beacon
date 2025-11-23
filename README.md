# B.E.A.C.O.N. - Battlefield Economy And Combat Operations Network

BEACON streamlines bookkeeping, battles, and tech trees for Space Empires 4X (SE4X) by GMT Games. This project addresses
the game's primary pain point: complex bookkeeping.

## Architecture Overview

BEACON uses a modern, containerized architecture with separate frontend and backend services. The application supports
three environments: development, preview, and production.

## Technology Stack

### Frontend

Offline-first Progressive Web App (PWA) built with modern web technologies and Feature Sliced Design:

- **TypeScript** - Type-safe JavaScript
- **pnpm** - Fast, disk space efficient package manager
- **Vue 3** with Composition API
- **Tailwind CSS** - Utility-first styling framework
- **Pinia** - State management
- **Vitest** - Unit testing framework
- **Playwright** - End-to-end testing
- **Storybook** - Component development environment
- **ESLint & Prettier** - Code linting and formatting
- **Preline UI** - Tailwind component templates and UI plugins
- **Iconify** - SVGs and icon sets

### Backend

- **.NET Core API** with C# controllers (see ProjectStructure.txt)
- **Scalar UI** - OpenAPI documentation and testing interface
- **Unit testing framework** (TBD)

### Infrastructure

**Development & Local:**

- MongoDB for data persistence
- MailPit for email testing
- Docker Compose for orchestration

**Preview & Production:**

- MongoDB Atlas for data persistence
- MailGun for email delivery
- Cloudflare Pages for frontend hosting

## Development Setup

### Prerequisites

- Docker Desktop (or Docker in WSL)
- JetBrains Rider/WebStorm (recommended)

### Getting Started

1. Clone the repository
2. Copy frontend environment configuration:
   ```bash
   cp frontend/.env.develop.sample frontend/.env.develop
   ```
3. Need to install dependencies for the frontend in order for intellisense to work properly:
   ```bash
   pnpm i
   ``` 
3. Start the development environment:
   ```bash
   docker compose -f infra/docker-compose-develop.yml up --build
   ```

Note: this will also use TypeGen to put the generated types in `frontend/src/shared/models/generated/`

Or alternatively just run the `(Develop) Compose` Rider configuration, this starts the frontend and all the other<br>
services.<br>
The `backend/Dockerfile` Rider configuration will build the backend and run it in a debuggable mode.

### Available Services

| Service           | URL                              | Description                                  |
|-------------------|----------------------------------|----------------------------------------------|
| Frontend          | http://localhost:5173            | Main application                             |
| Storybook         | http://localhost:6006            | Component library                            |
| API               | http://localhost:5002            | Backend services                             |
| API Documentation | http://localhost:5002/scalar/    | Scalar UI                                    |
| Email Testing     | http://localhost:8025            | MailPit interface                            |
| Database          | http://localhost:27017           | MongoDB (Connect via DataGrip or equivalent) |
| Front-end Tests   | N/A, see container logs          | Vitest                                       |
| Type Generation   | N/A, container will run and quit | TypeGen                                      |

### Development Notes

- Frontend supports hot reload for rapid development
- Unit tests run with hot reload - view results in the frontend-test Docker container console
- API debugging available through Rider with fast rebuild capabilities
- MongoDB container provides local data persistence

## Preview Environment

The preview environment simulates production conditions for integration testing:

- Uses production builds (`vite build` and `vite preview`)
- MongoDB Atlas free test connection instead of local MongoDB (you need fill out the connection string in the
  backend<br>
- for the MongoDB Atlas instance you want to connect to. Use .env.sample)
- MailGun integration for email delivery (Any SMTP service *should* work. Be sure to fill out the .env file).
- More accurate performance testing

Docker compose is not good at depends_on and sometimes you may need to run the preview config twice for builds to
work<br>
properly.

Start preview environment:

```bash
docker compose -f infra/docker-compose-preview.yml up --build
```

Make sure that the `.env.preview` configuration exists for the frontend

## Production Deployment

### Frontend

Automatically deployed to Cloudflare Pages on main branch updates. Simply run the deploy config Docker compose is
not<br>
good at depends_on and sometimes you may need to run the preview config twice for builds to work properly.

1. Configure environment variables in frontend `.env` file
2. Add Cloudflare API key
3. Deploy using Docker Compose:
   ```bash
   docker compose -f infra/docker-compose-deploy.yml up --build
   ``` 
   (or just use the jetbrains run configuration)

Be sure that the `.env.deploy` configuration exists for the frontend, especially for the cloudflare api key.

### Database

Theoritcally you could host MongoDB anywhere. We're using MongoDB Atlas. There is a free cluster for preview, and a <br>
flex cluster for production. The users are scoped to the cluster, and you can get the connection string from the Atlas
UI.<br>

You will also need to make sure that the IP whitelisting is set up to allow access from your deployment environment.<br>

### Backend

Deploying the backend is also mostly automated. You can use the jetbrains run configuration, the same one on the
frontend.<br>
It will run the `docker-build-and-push.sh` script to build and push the backend image to Docker Hub. It will then
spin<br>
up a container to run the az cli deployment commands. However, there are a couple of pre-requisites:

1. Make sure you have Docker cli on your local machine, and you are logged in to Docker Hub.
2. The resource group needs to be created in Azure, along with the container app environment, in location eastus2.
   The<br>
   reason for this is that the MongoDB Atlas clusters are in eastus2.
3. You need a service principal with contributor access to the resource group. You can create one with the following
   command<br>

```bash
az ad sp create-for-rbac --name "beacon-prod-sp-eastus2" --role contributor --scopes "/subscriptions/3ad1253a-fbd0-49f9-a88d-0df126c2c2a3/resourceGroups/beacon-prod-rg-eastus2"
```

4. You need to copy .env.deploy.sample in the backend directory to .env.deploy, and fill out the values.<br>
5. Using the custom domain requires setting up a CNAME or A record along with a TXT record for custom domain
   verification.<br>
   In our case, this needs to be done on Cloudflare. You also need to make sure there is a managed SSL certificate in
   Azure<br>
   that matches the custom domain.

NOTE: After deployment it is possible your egress IP address will change, this is because we're too cheap to pay for
a <br>
static IP or NAT gateway. If this happens you will need to update the IP whitelist in MongoDB Atlas. The egress IP
will <br>
be listed in the json returned during the "Deploying to Azure Container Apps..." step of the deployment process in
the <br>
deployment container logs. You should also add this to Mailgun for extre security.

If you need to make changes to the infrastructure, it's best to make those changes in the deploy.sh script.

## IDE Integration

This project is optimized for JetBrains IDEs (Rider/WebStorm) and includes:

- Pre-configured run/debug configurations
- HTTP runner files for API acceptance testing
- Linting and formatting configurations
- Docker Compose integration
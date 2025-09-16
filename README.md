# B.E.A.C.O.N. - Battlefield Economy And Combat Operations Network

BEACON streamlines bookkeeping, battles, and tech trees for Space Empires 4X (SE4X) by GMT Games. This project addresses the game's primary pain point: complex bookkeeping.

## Architecture Overview

BEACON uses a modern, containerized architecture with separate frontend and backend services. The application supports three environments: development, preview, and production.

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
- MongoDB Atlas for data persistence (Azure)
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
   cp frontend/.env.example frontend/.env.develop
   ```
3. Start the development environment:
   ```bash
   docker compose -f infra/docker-compose-develop.yml up --build
   ```
   
Note: this will also use typegen to put the generated types in `frontend/src/shared/models/generated/`

### Available Services

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:5173 | Main application |
| Storybook | http://localhost:6006 | Component library |
| API | http://localhost:5002 | Backend services |
| API Documentation | TBD | Scalar UI |
| Email Testing | TBD | MailPit interface |

### Development Notes

- Frontend supports hot reload for rapid development
- Unit tests run with hot reload - view results in the frontend-test Docker container console
- API debugging available through Rider with fast rebuild capabilities
- MongoDB container provides local data persistence

## Preview Environment

The preview environment simulates production conditions for integration testing:

- Uses production builds (`vite build` and `vite preview`)
- MongoDB Atlas free test connection instead of local MongoDB (you need fill out the connection string in the backend<br>
- for the MongoDB Atlas instance you want to connect to. Use .env.sample)
- MailGun integration for email delivery (Any SMTP service *should* work. Be sure to fill out the .env file).
- More accurate performance testing

Docker compose is not good at depends_on and sometimes you may need to run the preview config twice for builds to work<br>
properly.

Start preview environment:

```bash
docker compose -f infra/docker-compose-preview.yml up --build
```

Make sure that the `.env.preview` configuration exists for the frontend

## Production Deployment

### Frontend

Automatically deployed to Cloudflare Pages on main branch updates. Simply run the deploy config Docker compose is not<br>
good at depends_on and sometimes you may need to run the preview config twice for builds to work properly.

### Full Stack Deployment

1. Configure environment variables in frontend `.env` file
2. Add Cloudflare API key
3. Deploy using Docker Compose:
   ```bash
   docker compose -f infra/docker-compose-deploy.yml up --build
   ```

Be sure that the `.env.deploy` configuration exists for the frontend, especially for the cloudflare api key.

## IDE Integration

This project is optimized for JetBrains IDEs (Rider/WebStorm) and includes:

- Pre-configured run/debug configurations
- HTTP runner files for API acceptance testing
- Linting and formatting configurations
- Docker Compose integration
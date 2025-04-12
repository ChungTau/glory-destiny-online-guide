# Glory Destiny Online Guide

This project is a comprehensive guide for *Glory Destiny Online*, providing a backend API and a CMS frontend to manage and display game-related data such as creatures, items, quests, geography, roles, and skills. The backend is built with [NestJS](https://nestjs.com/) and [Prisma](https://www.prisma.io/), while the CMS uses [Next.js](https://nextjs.org/). The project is containerized with [Docker](https://www.docker.com/) for easy development and deployment.

## Features

- **Backend API** (`apps/api/`):
  - Modular architecture with reusable base services and controllers.
  - CRUD operations for game entities (e.g., creatures, items, quests, geography, roles, skills).
  - Caching with Redis for improved performance.
  - Queue management using Bull for asynchronous tasks.
  - Integration with Prisma for type-safe database operations.
  - End-to-end testing with Jest.

- **CMS Frontend** (`apps/cms/`):
  - Next.js-based frontend for managing and displaying game data.
  - Internationalization (i18n) support with English (`en.json`) and Traditional Chinese (`zh-hk.json`).
  - Responsive UI components from a shared UI package (`packages/ui/`).

- **Database** (`packages/prisma/`):
  - Prisma schema defining models and enums for game entities (e.g., `creature.prisma`, `item.prisma`).
  - Automated migrations and client generation.
  - Enums for game-specific attributes like item types, skill categories, and more.

- **Dockerized Development**:
  - Services for PostgreSQL, Redis, Prisma, API, and CMS.
  - Live reloading with `--watch` for development efficiency.
  - Shared volumes for Prisma-generated client code.

## Project Structure
```plaintext
glory-destiny-online-guide/
├── apps/
│   ├── api/                  # NestJS backend API
│   │   ├── src/
│   │   │   ├── core/         # Base services, controllers, and utilities
│   │   │   ├── features/     # Game entity modules (creature, item, quest, etc.)
│   │   │   ├── queues/       # Bull queue configurations
│   │   │   └── app.module.ts # Main application module
│   │   ├── test/             # E2E tests
│   │   └── Dockerfile.dev    # Development Dockerfile for API
│   └── cms/                  # Next.js CMS frontend
│       ├── src/
│       │   ├── app/          # Next.js app routes and layouts
│       │   └── i18n/         # Internationalization logic
│       ├── public/           # Static assets
│       └── Dockerfile.dev    # Development Dockerfile for CMS
├── packages/
│   ├── prisma/               # Prisma schema and scripts
│   │   ├── schema/
│   │   │   ├── enums/        # Game enums (e.g., item-type.enum.prisma)
│   │   │   ├── models/       # Game models (e.g., creature.prisma)
│   │   │   └── schema.prisma # Combined Prisma schema
│   │   ├── scripts/          # Scripts for merging schemas and generating exports
│   │   └── Dockerfile.prisma # Dockerfile for Prisma migrations
│   └── ui/                   # Shared UI components
│       ├── src/
│       │   ├── components/   # Reusable components (e.g., button.tsx)
│       │   └── styles/       # Global CSS
├── docker-compose.dev.yaml   # Docker Compose for development
├── Dockerfile.base           # Base image for tools
├── Dockerfile.prisma-base    # Base image for Prisma
├── Dockerfile.ui-base        # Base image for UI
├── tsconfig.base.json        # Shared TypeScript configuration
├── package.json              # Root dependencies and scripts
└── README.md                 # Project documentation
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [pnpm](https://pnpm.io/) (install globally with `npm install -g pnpm`)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd glory-destiny-online-guide
```

### 2. Create the .env File
In the root folder, create a .env file with the following content:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
REDIS_URL="redis://redis:6379"
REDIS_HOST=redis
REDIS_PORT=6379
NEXT_PUBLIC_API_URL=http://api:4000
NODE_ENV=development
```

- `DATABASE_URL`: Configures the PostgreSQL connection. Adjust `user`, `password`, `mydb`, and `schema` as needed.
- `REDIS_URL` and related variables: Configure Redis for caching and queues.
- `NEXT_PUBLIC_API_URL`: Points the CMS to the API service.
- `NODE_ENV`: Set to `development` for local setup.

3. Install Dependencies
Install all project dependencies using pnpm:

```bash
pnpm install
```

### 4. Run the Project
Start the services using Docker Compose:

```bash
docker-compose -f docker-compose.dev.yaml up --build
```

This command will:

- Build and start PostgreSQL (postgres), Redis (redis), Prisma (prisma), API (api), and CMS (cms) services.
- Run Prisma migrations to set up the database.
- Start the API on http://localhost:4000.
- Start the CMS on http://localhost:3000.

To enable live reloading for development, use:

```bash
docker-compose -f docker-compose.dev.yaml up --build --watch
```

### 5. Access the Application

- API: http://localhost:4000 (e.g., try `GET /nations` to fetch nation data).
- CMS: http://localhost:3000 (frontend for managing game data).
- Queue Dashboard: http://localhost:4000/queues (Bull Board for monitoring queues).

## Development Workflow

#### API Development:
- Edit `apps/api/src/`. Changes sync automatically with `--watch`.
- Run tests: `cd apps/api && pnpm run test` or `pnpm run test:e2e`.
- Lint code: `cd apps/api && pnpm run lint`.
#### CMS Development:
- Edit `apps/cms/src/` or `packages/ui/src/`. Changes sync automatically.
- Add translations in `apps/cms/messages/`.
#### Database Development:
- Update `packages/prisma/schema/models/` or `packages/prisma/schema/enums/`.
- Run migrations: `cd packages/prisma && pnpm run migrate:dev`.
- Generate client: `cd packages/prisma && pnpm run generate`.

## Scripts

#### Root:
```bash
pnpm install       # Install dependencies
pnpm run build     # Build all packages
pnpm run lint      # Run ESLint
```

#### API (apps/api/):
```bash
pnpm run start:dev # Start with watch mode
pnpm run test      # Run unit tests
pnpm run test:e2e  # Run E2E tests
pnpm run lint      # Run ESLint
pnpm run build     # Build production bundle
```

#### Prisma (packages/prisma/):
```bash
pnpm run migrate:dev # Run development migrations
pnpm run generate    # Generate Prisma client
pnpm run build       # Merge schemas and generate client
pnpm run lint        # Run ESLint
```
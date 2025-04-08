# Glory Destiny Online Guide

This project provides a guide for *Glory Destiny Online*, built with Prisma, NestJS, and Docker. Follow the instructions below to set up and run the project locally.

## Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [pnpm](https://pnpm.io/) (install globally with `npm install -g pnpm`)

## Setup Instructions

### 1. Create the `.env` File

In the root folder (`/workspaces/glory-destiny-online-guide/`), create a `.env` file with the following content:

```DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"```

- **DATABASE_URL**: This is required for Prisma to connect to the PostgreSQL database. Adjust the `user`, `password`, `localhost`, `mydb`, and `schema` values if you use different credentials or database settings.

### 2. Install Dependencies

Run the following command in the root folder to install all project dependencies:

```pnpm install```


This will set up the necessary Node.js packages for the project.

### 3. Run the Project

Use Docker Compose to build and start the services:

```docker-compose -f docker-compose.dev.yaml up --build --watch```


- **`--build`**: Ensures the Docker images are built from scratch.
- **`--watch`**: Enables live reloading for development (syncs file changes in `prisma` and `api` services).

This command will:
- Start the PostgreSQL database (`postgres`).
- Run the Prisma migration and setup (`prisma`).
- Launch the API server (`api`) on `http://localhost:4000`.

## Project Structure

- **`apps/api/`**: Contains the NestJS API application.
- **`packages/prisma/`**: Contains the Prisma schema and migration logic.
- **`docker-compose.dev.yaml`**: Defines the development environment services (`postgres`, `redis`, `prisma`, `api`).

## Troubleshooting

- **Error: "Can't reach database server"**:
  - Ensure the `DATABASE_URL` in `.env` matches your database setup.
  - Check if PostgreSQL is running locally or adjust `DATABASE_URL` to point to the Docker service (`postgres`).
- **Missing dependencies**:
  - Rerun `pnpm install` if you encounter module-related errors.

## Contributing

Feel free to submit issues or pull requests to improve this guide!

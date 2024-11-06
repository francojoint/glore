# Fastify Official Demo

![CI](https://github.com/fastify/demo/workflows/CI/badge.svg)

> :warning: **Please note:** This repository is still under active development.

The aim of this repository is to provide a concrete example of a Fastify application using what are considered best practices by the Fastify community.

**Prerequisites:** You need to have Node.js version 22 or higher installed.

## Getting started

Install the dependencies:

```shell
pnpm install
```

### Database

You can run a MySQL instance with Docker:

```shell
docker compose up
```

To run it in the background:

```shell
docker compose up -d
```

To create and update the database schema, run the migrations:

```shell
pnpm run db:migrate
```

To populate the database with initial data, run:

```shell
pnpm run db:seed
```

### TypeScript

To build the project:

```shell
pnpm run build
```

### Start the server

In dev mode:

```shell
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

In production mode:

```shell
pnpm run start
```

### Testing

To run the tests:

```shell
pnpm run test
```

### Standalone

`dev` and `start` leverage [fastify-cli](https://github.com/fastify/fastify-cli),
but you can run the demo as a standalone executable (see [server.ts](./src/server.ts)):

```shell
pnpm run standalone
```

### Linting

To check for linting errors:

```shell
pnpm run lint
```

To check and automatically fix linting errors:

```shell
pnpm run lint:fix
```

## Learn More

To learn more about Fastify, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).

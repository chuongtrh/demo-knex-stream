### Setup

    1. Start docker PostgresSQL

```
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml up -d --build demo-knex-pg
```

    2. Install packages

```sh
yarn install
```


# Fleet 

> Take away home task

- [Video Link](https://www.loom.com/share/86c217d5e3c04d7a9596c0a87a465f2e?sid=a3450f67-0496-48c0-b854-00ec0daa069f)

## Architecture

![](./assets/fleet-dg.png)

## Application Tech Stack

### For `Rest-svc`:
- `Express.js`
- `TypeScript`
- `Prisma`
- `Postgres` (Storing user data)
- `Redis`

### For `Comm-svc`:

- `Nest.js` (Server-side framework)
- `TypeScript`
- `Mongo` (Storing user data)
- `WebSocket` for real-time communication with clients

## For `Client`

- `React` (Client-side framework)
- `Typescript`
- `WebSocket-Client`

## API Documentation

Explore the Fleet API by referring to the [API Documentation](https://documenter.getpostman.com/view/16181974/2s9YC4UD7a) provided via Postman. This documentation contains detailed information about the available endpoints, request formats, and sample responses to help you interact with the API effectively.

## Folder Structure
```
.
├── comm_svc # Comm Service
└── rest_svc # RESTful Service
└── client   # Client Service
├── Dockerfile
├── docker-compose.yml
├── README.md
```

**Run Docker Compose**

To start the required services (`Redis`, `Postgres`, and `MongoDB`), use the following command:
```bash
docker-compose up -d
```


### Setting `dev` environment for `REST_SVC`

To get started with the `REST_SVC` component of the Fleet application, follow these steps:

```bash
cd rest_svc
npm install # resolve all dependencies
```

**Generate Prisma Client**

- Generate the Prisma Client by running the following command:
```bash
npx prisma generate
```
This step allows you to start querying your database using Prisma.

**Apply Database Migrations**

- Apply any pending database migrations with the following command:
 ```bash
npx prisma migrate dev
```

## Setting `dev` environment for `comm-svc`

To get started with the `COMM_SVC` component of the Fleet application, follow these steps:

```bash
cd comm_svc
npm install # resolve all dependencies
```

### To start the `comm-svc` server 
```bash
npm run start:dev
```

## Setting up `client` environment

- To install client side dependencies
```bash
cd client
npm install 
# or
bun install
```
-  To start client application
```bash
npm run start
# 
bun run start
```

## Automating Requests to Server 

For automating HTTP requests to a server.

```bash
./scripts/test-request.sh
```


## Author

- [Siddhant Prateek Mahanayak](https://github.com/siddhantprateek)
# Fleet 


## Application Tech Stack

### For `Rest-svc`:
- `Express.js`
- `TypeScript`
- `Prisma`
- `Postgres`
- `Redis`

### For `Comm-svc`:

- `Nest.js` (Server-side framework)
- `TypeScript`
- `Redis` (Caching)
- `Postgres` (Storing user data)
- `WebSocket` for real-time communication with clients

## API Documentation

Explore the Fleet API by referring to the [API Documentation](https://documenter.getpostman.com/view/16181974/2s9YC4UD7a) provided via Postman. This documentation contains detailed information about the available endpoints, request formats, and sample responses to help you interact with the API effectively.

## Folder Structure
```
.
├── comm_svc # Comm Service
└── rest_svc # RESTful Service
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

## To start the `comm-svc` server 
```bash
npm run start:dev
```


## Author

- [Siddhant Prateek Mahanayak]()
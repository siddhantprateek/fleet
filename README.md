# Fleet 

## Application Tech Stack

### For `Rest-svc`:
- Express.js
- TypeScript
- Prisma
- Postgres
- Redis

### For `Comm-svc`:

- Nest.js (Server-side framework)
- TypeScript
- Redis (Caching)
- Postgres (Storing user data)
- WebSocket for real-time communication with clients

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

**Configure Database Connection**

- Open the `.env` file in the `rest_svc` directory.
- Set the `DATABASE_URL` variable to point to your existing database. If your database doesn't have tables yet, you can refer to the [Prisma Getting Started Guide](https://pris.ly/d/getting-started) for assistance.

**Generate Prisma Schema**

- Run the following command to generate the Prisma schema based on your database schema:
```bash
npx prisma db pull
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


## Author

- [Siddhant Prateek Mahanayak]()
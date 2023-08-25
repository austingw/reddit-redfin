# Red(it)fin

## What I used

Typescript, Next.js, Prisma, Material UI, MySQL, Tanstack Query, and Axios

## Instructions

1. Install Docker/Docker Desktop

2. Open terminal in the project directory

3. Run the following command to build and run the app:

```
docker compose up --build
```

4. In the terminal please enter:

```
docker compose exec web npx prisma migrate deploy
```

to run all Prisma migrations

5. Finally, seed the database with rows from the .csv using:

```
docker compose exec web npx prisma db seed
```

This may take a while, as I had to drastically change the seed file for Docker. Locally, I was able to do some batching to speedily seed the database, but I kept running into connection issues when trying to seed in the container. :/Please feel free to make some coffee or go for a walk during the process

Once you see "🌱 The seed command has been executed." you can enjoy the app at http://localhost:3000/

Have fun!

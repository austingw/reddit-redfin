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

5. Next, ssh into the MySQL container by typing

```
docker compose exec db bash
```

into your terminal

6. Now log into the MySQL CLI:

```
mysql -u root -p
```

```
Password123!
```

7. Finally we import the .csv into the database:

```
USE mydb
```

and run the following:

```
LOAD DATA INFILE '/docker-entrypoint-initdb.d/data.csv'
INTO TABLE listings
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(sold_date, property_type, address, city, state, zip, price, beds, baths, @square_feet, lot_size, year_built, days_on_market, monthly_hoa, mls_number, identifier, latitude, longitude, @description)
SET
    square_feet = IF(@square_feet = '', 0, @square_feet),
    description = LEFT(@description, 65535);
```

DONE! The app is now available on http://localhost:3000/

Have fun!

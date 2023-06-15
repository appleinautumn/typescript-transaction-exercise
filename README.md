# Transaction API

The goal of this exercise is to design a read-only API (REST) that returns one or more records from a static set of transaction data.

Requirements:

- list transaction data via API `GET` Request
  - Filter by one or more fields/attributes (e.g. /transactions?tags=Dining,Travel&counterparty=Google)
  - Sort by one or more fields/attributes (e.g. /transactions?sort=counterparty)
- Fetch a single record via `GET` request
  - Stretch goal: return a sparse field, (e.g. /transactions/32?fields=amount,tags)

## Requirements

This project is developed with:

- Node 18

## API Documentation

[Postman API Documentation](https://documenter.getpostman.com/view/3021947/2s93sgWVoa#b0e695ed-eb5e-4b77-965a-4939f5683139).

## Installation

Clone the project

```bash
git clone git@github.com:appleinautumn/bunker-take-home-exercise.git
```

Go to the project directory

```bash
cd bunker-take-home-exercise
```

This service contains a `.env.example` file that defines environment variables you need to set. Copy and set the variables to a new `.env` file.

```bash
cp .env.example .env
```

Install the dependencies

```bash
npm install
```

Compile the typescript code and start the app

```bash
npm run dev
```

## Database

The database file is simulated via `data/data.csv` file. When the application starts, the file will be loaded to memory.

## Testing

Test the service with `npm test`.

```bash
$ npm test

> take-home-exercises@0.0.0 test
> NODE_ENV=test mocha --timeout 7000 --exit './test/**/*.test.js'



  Controller Unit Test
    Test index method
      ✔ should list transactions
      ✔ should get a transactions by id
      ✔ should get a transactions by id with no fields specified
      ✔ should get a transactions by id with fields: id
      ✔ should get a transactions by id with fields: id, account
      ✔ should get a transactions by id with fields: account, amount
      ✔ should get a transactions by id with fields: amount, counterparty, tags
      ✔ should get a transactions by id with fields: id, account, amount, counterparty, tags, date, location
      ✔ should capture an error on getting a record when the repository throws an error

  Test getValidFields for sorts
    ✔ should empty array for empty sort string
    ✔ should return empty array for all invalid fields (aa,bb,cc)
    ✔ should return 1 valid field in an array and exclude invalid fields (aa,bb)

  Test getValidFields for sparse fields
    ✔ should return complete valid fields for empty field string
    ✔ should return complete valid fields for all invalid field string
    ✔ should return 1 valid field for 1 valid and other invalid string

  Test formatTransactionWithFields
    ✔ should return an empty object for empty fields
    ✔ should return an empty object for all invalid fields
    ✔ should return valid fields and exlude invalid fields


  18 passing (214ms)
```

## Deployment

### Without Docker

Follow the Installation instruction above.

### With Docker

Build the image

```bash
docker build -t bunker-test1 .
```

Run the container

```bash
docker run -d --name bunkertest1 -p 3001:3000 --network=host --env-file=.env bunker-test1
```

## Screenshots

List transactions

![list](docs/images/list.png)

List transactions with multiple sorts

![list-with-multiple-sorts](docs/images/list-with-multiple-sorts.png)

List transactions with 1 filter

![list-with-1-filter](docs/images/list-with-1-filter.png)

List transactions with multiple filters

![list-with-2-filters](docs/images/list-with-2-filters.png)

List transactions with multiple filters and multiple sorts

![list-with-2-filters-multiple-sorts](docs/images/list-with-2-filters-multiple-sorts.png)

Get a transaction by id with specified sparse fields

![get-with-sparse-fields](docs/images/get-with-sparse-fields.png)

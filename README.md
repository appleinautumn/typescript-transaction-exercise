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

Test the service

```bash
npm test
```

## Deployment

### Without Docker

Follow the Installation instruction above

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

![List transactions](docs/images/list.png)

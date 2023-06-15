# Transaction API

## Requirements

This project is developed with:

- Node 18

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

Start the app

```bash
npm run dev
```

## Database

The database file is simulated via `data/data.csv` file. When the application starts, the file will be loaded to memory.

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

# ClubHub

SE4450 Capstone Project

Varandeep Gill, Tyler Mohaupt, Keerthen Ravichandran, Justin Chuang

Node version: v20.9.0

NPM version: 10.2.4

## Client

Run `npm install` in the `client` folder to install dependencies, then `npm run dev` to run the dev client

## Server

Run `npm install` in the `server` folder to install dependencies, then run `npm run start` to run the dev server. `npm run dev` can be used to automatically restart the server when files are changed.

## Database

Database: PostgreSQL v16.1.1

KnexJS is used for database migrations and seeding. To run the migrations locally, run `npm install knex -g` to download the CLI tool, then change directory into `server/src/database`, and run `knex migrate:latest`. To fill the local database with the seed data, run `knex seed:run`. Make sure you have an active local PostgreSQL instance running with the config detailed in `server/src/database/knexfile.ts`.

## API Documentation

API docs can be accessed by running the server locally (`npm run start` in `ClubHub/server`) and opening `http://localhost:3000/api-docs/` in your browser. API endpoints are documented here, and any new, deleted, or updated endpoints should be updated in these docs as well.

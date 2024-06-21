<p align="center">
  <img src="https://dbaasltd.co.in/img/ecommerce.gif" width="400" alt="e-commerce Logo" /></a>
</p>

<h1 align="center">order managment system for e-commerce APP </h1>



  <p align="center">This project is a NestJS-based API for managing user carts and orders. The API allows users to add, remove, and update products in their cart, as well as create orders, update order statuses, and apply coupons to orders.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->



## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing the Application](#testing-the-application)
- [API Documentation](#api-documentation)
- [Endpoints](#endpoints)
  - [Cart Endpoints](#cart-endpoints)
  - [Order Endpoints](#order-endpoints)
- [License](#license)

## Installation

To install and set up the project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/nestjs-cart-order-api.git
   cd nestjs-cart-order-api
2. **Install dependencies:**:
   ```bash
   npm install
3. **Set up Prisma:**:
  Ensure that you have a running PostgreSQL instance and configure the DATABASE_URL in your .env file:
   ```bash
   DATABASE_URL="postgresql://user:password@localhost:5432/database_name"
4. **Migrate the database:**:
  Ensure that you have a running PostgreSQL instance and configure the DATABASE_URL in your .env file:
   ```bash
   npx prisma migrate dev --name init

## Running the Application
  The API will be available at http://localhost:3000.
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testing the Application

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Documentation
  The API documentation is generated using Swagger. After starting the application, you can access the documentation at http://localhost:3000/api.

## Endpoints   
1. **cart APIs**: <img src="https://web-design-india.com/wp-content/uploads/2017/09/ecommerce-cart-gif.gif" width="50" alt="Nest Logo" />


## License

Nest is [MIT licensed](LICENSE).

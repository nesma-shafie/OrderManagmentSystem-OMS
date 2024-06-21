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

### 1. **Cart APIs**
#### 1.1. Add To Cart
- **Endpoint**: `/api/cart/add`
- **Method**: POST
- **Description**: Adds a product to the user's cart.
- **Request Body**
  ```json
  {
    "userId": string(UUID),
    "productId": string(UUID)
  }
  
#### 1.2. Update Cart
- **Endpoint**: `/api/cart/update`
- **Method**: PUT
- **Description**: increase or decrease the product quantity in your cart by 1.
- **Request Body**
  ```json
  {
     "userId": string(UUID),
    "productId": string(UUID),
    "update":"Decrease" or "Increase" 
  }

#### 1.3. Remove From Cart
- **Endpoint**: `/api/cart/remove`
- **Method**: DELETE
- **Description**: remove product from your cart.
- **Request Body**
  ```json
  {
    "userId": string(UUID),
    "productId": string(UUID)"
  }
#### 1.4. View Cart
- **Endpoint**: `/api/cart/:userId`
- **Method**: GET
- **Description**: view all products in your cart .
- **Request Body**
  ```json
  {
    "userId": string(UUID),
  }

### 2. **oredr APIs**:
#### 2.1. Create Order
- **Endpoint**: `/api/orders`
- **Method**: POST
- **Description**: create order with the products in your cart and make it pending and reduce the stock of the products.
- **Request Body**
  ```json
  {
    "userId": string(UUID),
  }
  
#### 2.2. Get Order by ID
- **Endpoint**: `/api/orders/:orderIde`
- **Method**: GET
- **Description**: view all products in your order ,status and total price.

#### 2.3. Update Order Status:
- **Endpoint**: `/api/orders/:orderId/status`
- **Method**: PUT
- **Description**: mark the order as completed or cancelled.
- **Request Body**
  ```json
  {
     "status":"CANCELLED" or "COMPLETED"
  }
  
#### 2.4. Apply Coupon
- **Endpoint**: `/api/orders/apply-coupon`
- **Method**: POST
- **Description**: apply coupon to take dicount to your order before the expiretion date of the coupon.
- **Request Body**
  ```json
  {
    "orderId": string(UUID),
    "coupon" : string
  }

### 3. **User APIs**:
#### 3.1. get User Orders
- **Endpoint**: `/api/users/:userId/orders`
- **Method**: GET
- **Description**: get the history of the user orders with details.
- **Request Body**
  ```json
  {
    "userId": string(UUID),
  }

## License

Nest is [MIT licensed](LICENSE).

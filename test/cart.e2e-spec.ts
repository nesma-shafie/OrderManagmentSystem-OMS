import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CartModule } from '../src/cart/cart.module';
import { initializeDataBaseService } from '../src/utiles/createForTest';

describe('CartController (e2e)', () => {
  let app: INestApplication;
  let users: any[];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let carts: any[];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let coupons: any[];
  let products: any[];

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CartModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    ({ users, carts, coupons, products } = await initializeDataBaseService());
  });
  ///////////////add to cart
  it('add product to cart successfully (POST)', () => {
    return request(app.getHttpServer())
      .post('/cart/add')
      .send({
        productId: products[1].id,
        userId: users[1].id,
      })
      .expect(201);
  });
  it('can not add product to cart as the stock=0(POST)', () => {
    return request(app.getHttpServer())
      .post('/cart/add')
      .send({
        productId: products[0].id,
        userId: users[1].id,
      })
      .expect(409);
  });

  it('can not add product to cart as product not found (POST)', () => {
    return request(app.getHttpServer())
      .post('/cart/add')
      .send({
        productId: `${products[0].id}2`,
        userId: users[1].id,
      })
      .expect(404);
  });
  ///////////get user cart
  it('get user cart (GET)', async () => {
    await request(app.getHttpServer()).post('/cart/add').send({
      productId: products[1].id,
      userId: users[1].id,
    });
    await request(app.getHttpServer()).post('/cart/add').send({
      productId: products[2].id,
      userId: users[1].id,
    });
    const Res = await request(app.getHttpServer())
      .get(`/cart/${users[1].id}`)
      .expect(200);
    expect(Array.isArray(Res.body)).toBe(true);
    expect(Res.body.length).toEqual(2);
  });
  ///////////remove from cart
  it('remove product from cart successfully (DELETE)', async () => {
    await request(app.getHttpServer()).post('/cart/add').send({
      productId: products[1].id,
      userId: users[1].id,
    });
    return request(app.getHttpServer())
      .delete('/cart/remove')
      .send({
        productId: products[1].id,
        userId: users[1].id,
      })
      .expect(200);
  });
  it('remove product not found in cart (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/cart/remove')
      .send({
        productId: products[1].id,
        userId: users[1].id,
      })
      .expect(409);
  });
  ///////////update cart cart
  it('update product quantity from cart successfully (PUT)', async () => {
    await request(app.getHttpServer()).post('/cart/add').send({
      productId: products[1].id,
      userId: users[1].id,
    });
    const Res = await request(app.getHttpServer())
      .put('/cart/update')
      .send({
        productId: products[1].id,
        userId: users[1].id,
        update: 'Increase',
      })
      .expect(200);
    expect(Res.body.quantity).toBe(2);
  });
});

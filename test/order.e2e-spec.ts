import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { OrdersModule } from '../src/orders/orders.module';
import { CartModule } from '../src/cart/cart.module';
import { initializeDataBaseService } from '../src/utiles/createForTest';

describe('OrderController (e2e)', () => {
  let app: INestApplication;
  let users: any[];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let carts: any[];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let coupons: any[];
  let products: any[];

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [OrdersModule, CartModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    ({ users, carts, coupons, products } = await initializeDataBaseService());
  });
  ///////////create order
  it('create order successfully (POST)', async () => {
    await request(app.getHttpServer())
      .post('/cart/add')
      .send({
        productId: products[3].id,
        userId: users[0].id,
      })
      .expect(201);
    return request(app.getHttpServer())
      .post('/orders')
      .send({
        userId: users[0].id,
      })
      .expect(201);
  });
  it('your cart is empty (POST)', () => {
    return request(app.getHttpServer())
      .post('/orders')
      .send({
        userId: users[1].id,
      })
      .expect(409);
  });
  it('product in cart not available for order (POST)', async () => {
    await request(app.getHttpServer()).post('/cart/add').send({
      productId: products[1].id,
      userId: users[1].id,
    });
    await request(app.getHttpServer()).put('/cart/update').send({
      productId: products[1].id,
      userId: users[1].id,
      update: 'Increase',
    });
    return request(app.getHttpServer())
      .post('/orders')
      .send({
        userId: users[1].id,
      })
      .expect(409);
  });
  ///////////view order
  it('order not found to view (GET)', () => {
    return request(app.getHttpServer())
      .get('/orders/04ce77f2-88a8-45da-aaa4-7a31776f4701')
      .expect(404);
  });
  it('view order successfully (POST)', async () => {
    await request(app.getHttpServer())
      .post('/cart/add')
      .send({
        productId: products[3].id,
        userId: users[0].id,
      })
      .expect(201);
    const order = await request(app.getHttpServer())
      .post('/orders')
      .send({
        userId: users[0].id,
      })
      .expect(201);
    return request(app.getHttpServer())
      .get(`/orders/${order.body.id}`)
      .expect(200);
  });
  ///////////apply-coupon
  it('apply coupon (POST)', async () => {
    await request(app.getHttpServer()).post('/cart/add').send({
      productId: products[3].id,
      userId: users[0].id,
    });
    await request(app.getHttpServer())
      .post('/cart/add')
      .send({
        productId: products[2].id,
        userId: users[0].id,
      })
      .expect(201);
    const order = await request(app.getHttpServer())
      .post('/orders')
      .send({
        userId: users[0].id,
      })
      .expect(201);
    const expected_price =
      (order.body.totalPrice * (100 - coupons[0].discountPercentage)) / 100;
    const discounted = await request(app.getHttpServer())
      .post('/orders/apply-coupon')
      .send({
        coupon: coupons[0].cupon,
        orderId: order.body.id,
      })
      .expect(201);
    expect(discounted.body.totalPrice).toEqual(expected_price);
  });
  ///////////update order order status
  it('update order status to completted (PUT)', async () => {
    await request(app.getHttpServer()).post('/cart/add').send({
      productId: products[3].id,
      userId: users[0].id,
    });

    const order = await request(app.getHttpServer())
      .post('/orders')
      .send({
        userId: users[0].id,
      })
      .expect(201);
    const updated = await request(app.getHttpServer())
      .put(`/orders/${order.body.id}/status`)
      .send({
        status: 'COMPLETED',
      })
      .expect(200);
    expect(updated.body.status).toEqual('COMPLETED');
  });
});

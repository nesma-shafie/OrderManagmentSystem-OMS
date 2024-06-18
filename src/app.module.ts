import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [OrdersModule, CartModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

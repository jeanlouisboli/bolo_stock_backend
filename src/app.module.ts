import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { ShopModule } from './shop/shop.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule, UsersModule, ProductsModule, OrdersModule, CartModule, AuthModule, ShopModule,
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

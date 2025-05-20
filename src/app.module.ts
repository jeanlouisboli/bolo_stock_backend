import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { PartenaireModule } from './partenaire/partenaire.module';
import { ConfigModule } from '@nestjs/config';
import { PromotionController } from './promotion/promotion.controller';
import { PromotionService } from './promotion/promotion.service';

@Module({
  imports: [
    PrismaModule,  ProductsModule, OrdersModule, CartModule, AuthModule, PartenaireModule,
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [AppController, PromotionController],
  providers: [AppService, PromotionService],
})
export class AppModule {}

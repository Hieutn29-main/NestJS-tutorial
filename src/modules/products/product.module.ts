import { Module } from '@nestjs/common';
import { ProductController } from 'src/modules/products/product.controller';
import { ProductService } from 'src/modules/products/product.service';

@Module({
  controllers: [ProductController],
  //   controllers: [AppController],
  providers: [ProductService],
  //   exports: [],
})
export class ProductModule {}

import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { ProductService } from 'src/modules/products/product.service';
import { ResponseData } from 'src/global/globalClass';
import { ResponseMessage, ResponseStatus } from 'src/global/globalEnum';
import { Product } from 'src/modules/products/product.service';

const path = 'products';
@Controller(path)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Get all products
  @Get()
  getAllProducts(): ResponseData<Product[]> {
    try {
      const products = this.productService.getAllProducts();
      return new ResponseData<Product[]>(
        products,
        ResponseStatus.SUCCESS,
        ResponseMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Product[]>(
        null,
        ResponseStatus.ERROR,
        ResponseMessage.ERROR,
      );
    }
  }

  // Create a new product
  @Post()
  createProduct(
    @Body()
    body: {
      name: string;
      description: string;
      price: number;
      color: string;
    },
  ): ResponseData<Product> {
    try {
      const { name, description, price, color } = body;
      const newProduct = this.productService.createProduct(
        name,
        description,
        price,
        color,
      );
      return new ResponseData<Product>(
        newProduct,
        ResponseStatus.SUCCESS,
        ResponseMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Product>(
        null,
        ResponseStatus.ERROR,
        ResponseMessage.ERROR,
      );
    }
  }

  // Get product by ID
  @Get('/:id')
  getProductById(@Param('id') id: number): ResponseData<Product> {
    try {
      console.log(id);
      const product = this.productService.getProductById(id);
      return new ResponseData<Product>(
        product,
        ResponseStatus.SUCCESS,
        ResponseMessage.SUCCESS,
      );
    } catch (error) {
      console.error(error); // Log the error for debugging
      return new ResponseData<Product>(
        null,
        ResponseStatus.ERROR,
        `Error: ${error.message}`,
      );
    }
  }

  // Update product by ID
  @Put('/:id')
  updateProduct(
    @Param('id') id: number,
    @Body()
    body: {
      name?: string;
      description?: string;
      price?: number;
      color?: string;
    },
  ): ResponseData<Product> {
    try {
      const updatedProduct = this.productService.updateProduct(
        id,
        body.name,
        body.description,
        body.price,
        body.color,
      );
      return new ResponseData<Product>(
        updatedProduct,
        ResponseStatus.SUCCESS,
        ResponseMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Product>(
        null,
        ResponseStatus.ERROR,
        ResponseMessage.ERROR,
      );
    }
  }

  // Delete product by ID
  @Delete('/:id')
  deleteProduct(@Param('id') id: number): ResponseData<string> {
    try {
      const message = this.productService.deleteProduct(id);
      return new ResponseData<string>(
        message,
        ResponseStatus.SUCCESS,
        ResponseMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<string>(
        null,
        ResponseStatus.ERROR,
        ResponseMessage.ERROR,
      );
    }
  }
}

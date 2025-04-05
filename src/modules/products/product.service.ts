import { Injectable, NotFoundException } from '@nestjs/common';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  color: string;
}

const Products: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    description: 'This is a description for Product 1.',
    price: 29.99,
    color: 'Red',
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'This is a description for Product 2.',
    price: 49.99,
    color: 'Blue',
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'This is a description for Product 3.',
    price: 19.99,
    color: 'Green',
  },
  {
    id: 4,
    name: 'Product 4',
    description: 'This is a description for Product 4.',
    price: 39.99,
    color: 'Yellow',
  },
  {
    id: 5,
    name: 'Product 5',
    description: 'This is a description for Product 5.',
    price: 59.99,
    color: 'Black',
  },
];

@Injectable()
export class ProductService {
  getAllProducts(): Product[] {
    return Products;
  }

  createProduct(
    name: string,
    description: string,
    price: number,
    color: string,
  ): Product {
    const newProduct: Product = {
      id: Products.length + 1, // Generate a new id
      name,
      description,
      price,
      color,
    };
    Products.push(newProduct); // Add new product to the list
    return newProduct;
  }

  getProductById(id: number): Product {
    const productId = Number(id);
    const product = Products.find((product) => product.id === productId);
    console.log(Products);
    if (!product) {
      throw new NotFoundException(
        `Product with id ${id} not found ${product}  `,
      );
    }
    return product;
  }

  updateProduct(
    id: number,
    name?: string,
    description?: string,
    price?: number,
    color?: string,
  ): Product {
    const productId = Number(id);
    const productIndex = Products.findIndex(
      (product) => product.id === productId,
    );
    if (productIndex === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    const product = Products[productIndex];
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (color) product.color = color;

    Products[productIndex] = product; // Update the product in the list
    return product;
  }

  deleteProduct(id: number): string {
    const productId = Number(id);
    const productIndex = Products.findIndex(
      (product) => product.id === productId,
    );
    if (productIndex === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    Products.splice(productIndex, 1); // Remove the product from the list
    return `Product with id ${id} has been deleted`;
  }
}

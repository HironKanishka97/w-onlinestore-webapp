import { Product } from "./Product.ts";

export class CartItem {
    id: number;
    productCount: number;
    product: Product;
    totalAmount: number;

    constructor(id: number, product: Product,productCount: number,  totalAmount: number) {
        this.id = id;
        this.product = product;
        this.productCount = productCount;
        this.totalAmount = totalAmount;
    }
}
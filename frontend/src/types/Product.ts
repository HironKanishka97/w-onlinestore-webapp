import {Category} from "./Category.ts";

export class Product {
    id: number;
    name: string;
    brand: string;
    description: string;
    category: Category;
    price: number;
    discount: number;
    quantity: number;
    rop: number;
    image: string;


    constructor(id: number, name: string, brand: string, description: string, category: Category, price: number, discount: number, quantity: number, rop: number, image: string) {
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.description = description;
        this.category = category;
        this.price = price;
        this.discount = discount;
        this.quantity = quantity;
        this.rop = rop;
        this.image = image;
    }
}


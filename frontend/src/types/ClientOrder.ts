import {Client} from "./Client.ts";
import {CartItem} from "./CartItem.ts";

export class ClientOrder {
id: number;
date: string;
client: Client;
cartItems: CartItem[];
lineTotal: number;

    constructor(id: number, date: string, client: Client, cartItems: CartItem[], lineTotal: number) {
        this.id = id;
        this.date = date;
        this.client = client;
        this.cartItems = cartItems;
        this.lineTotal = lineTotal;
    }
}
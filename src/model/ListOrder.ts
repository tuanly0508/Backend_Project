import { Product } from "./Product";

export interface ListOrder {
    idUser: string,
    idOrder: string,
    name: string,
    mobile: string,
    email:  string,
    address: string,
    timeAt: string,
    product: Product[]
}
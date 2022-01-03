import { OrderProduct } from "./OrderProduct";
import { User } from "./User";

export interface Order {
    idOrder: string;
    idUser: string
    timeAt: string
    isTemp: Boolean
}

export interface OrderWithDetail extends Order {
    orderProduct: OrderProduct[]
}

export interface OrderWithUser extends OrderWithDetail {
    user: User
} 
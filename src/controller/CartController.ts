import { Request, Response } from "express";
import { cartService } from "../services/CartService";
import { orderService } from "../services/OrderService";

class CartController {
    //get cart
    handleGetCart = async (req: Request, res:Response) => {
        const {idUser} = req.params
        const dataCart = await cartService.getCart(idUser)
        let totalPrice = this.price(dataCart)
        let listCart = {dataCart,totalPrice}
        res.status(200).json(listCart)
    }
    
    //add cart
    handleCreateCart = async (req:Request, res: Response) => { 
        const {idProduct,quantity,price} = req.body
        let i = await orderService.checkOrder()
        const data = await cartService.createCart(i,idProduct,quantity,price)
        return res.json(data)
    }

    //delete cart
    handleDeleteCart = async (req:Request, res: Response) => {
        const {idOrder, idUser,idProduct} = req.params
        await cartService.deleteCart(idProduct)
        const dataCart = await cartService.getCart(idUser)
        return res.json(dataCart)
    }

    //update cart
    handleUpdateCart = async (req:Request, res: Response) => {
        const {idOrder,idUser,quantity} = req.params
        let y =  parseInt(quantity)  
        await cartService.updateCart(y,idOrder)
        let dataCart = await cartService.getCart(idUser)
        let totalPrice = this.price(dataCart)
        let listCart = {dataCart,totalPrice}
        return res.json(listCart)
    }

    //total price
    price = (dataCart: any[]) => {
        let totalPrice = 0
        dataCart.map((item) => {
            totalPrice += item.price * item.quantity
        })
        return totalPrice
    }
}
export const cartController = new CartController()
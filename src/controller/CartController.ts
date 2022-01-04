import { Request, Response } from "express";
import { cartService } from "../services/CartService";
import { orderService } from "../services/OrderService";

class CartController {
    //get cart
    get = async (req: Request, res:Response) => {
        const {idUser} = req.params
        const dataCart = await cartService.get(idUser)
        let totalPrice = this.price(dataCart)
        let listCart = {dataCart,totalPrice}
        res.status(200).json(listCart)
    }
    
    //add cart
    create = async (req:Request, res: Response) => { 
        const {idProduct,quantity,price} = req.body
        let i = await orderService.checkEmpty()
        let y = await cartService.checkEmpty()
        let a = ''
        let b = ''
        y.map((item) => {
            a = item.idOrder
            b = item.idProduct    
        })
        if (a === i && b === idProduct) {
            await cartService.update(quantity+1,idProduct)
        }else {
            const data = await cartService.create(i,idProduct,quantity,price)
            return res.json(data)
        }
    }

    //delete cart
    delete = async (req:Request, res: Response) => {
        const {idUser,idProduct} = req.params
        await cartService.delete(idProduct)
        const dataCart = await cartService.get(idUser)
        return res.json(dataCart)
    }

    //update cart
    update = async (req:Request, res: Response) => {
        const {idOrder,idUser,quantity} = req.params
        let y =  parseInt(quantity)  
        await cartService.update(y,idOrder)
        let dataCart = await cartService.get(idUser)
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
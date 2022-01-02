import { Request, response, Response } from "express";
import { createCart, deleteCart, getCart, updateCart } from "../services/CartService";
import { createOrder, deleteOrder } from "../services/OrderService";

//get cart
export const handleGetCart = async (req: Request, res:Response) => {
    const {idUser} = req.params
    const dataCart = await getCart(idUser)
    let totalPrice = price(dataCart)
    let listCart = {dataCart,totalPrice}
    res.status(200).json(listCart)
}
 
//add cart
export const handleCreateCart = async (req:Request, res: Response) => { 
    const {idOrder,idProduct,quantity,price} = req.body
    const data = await createCart(idOrder,idProduct,quantity,price)
    await createOrder(idOrder,'1')
    return res.json(data)
}

//delete cart
export const handleDeleteCart = async (req:Request, res: Response) => {
    const {idOrder, idUser} = req.params  
    await deleteOrder(idOrder)
    await deleteCart(idOrder)
    const dataCart = await getCart(idUser)
    return res.json(dataCart)
}

//update cart
export const handleUpdateCart = async (req:Request, res: Response) => {
    const {idOrder,idUser,quantity} = req.params
    let y =  parseInt(quantity)  
    await updateCart(y,idOrder)
    let dataCart = await getCart(idUser)
    let totalPrice = price(dataCart)
    let listCart = {dataCart,totalPrice}
    return res.json(listCart)
}

//total price
const price = (dataCart: any[]) => {
    let totalPrice = 0
    dataCart.map((item) => {
        totalPrice += item.price * item.quantity
    })
    return totalPrice
}
import { Request, Response } from "express";
import { createCart, deleteCart, getCart, updateCart } from "../services/CartService";
import { checkOrder } from "../services/OrderService";

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
    const {idProduct,quantity,price} = req.body
    let i = await checkOrder()
    const data = await createCart(i,idProduct,quantity,price)
    return res.json(data)
}

//delete cart
export const handleDeleteCart = async (req:Request, res: Response) => {
    const {idOrder, idUser,idProduct} = req.params
    await deleteCart(idProduct)
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
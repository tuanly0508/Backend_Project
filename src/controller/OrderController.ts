import { Request, Response } from "express";
import { OrderWithDetail, OrderWithUser } from "../model/OrderTemp";
import { createOrder, getOrder, updateStatusOrder } from "../services/OrderService";

//get order
export const handleGetOrder = async (req: Request, res:Response) => {
    let data = await getOrder('1')
    
    
    
    return res.json(data)

    
    // let listOrder = {dataUser,dataCart}
    // res.status(200).json(listOrder)
} 

//update status order
export const handleUpdateStatusOrder = async (req:Request, res: Response) => {
    const {idOrder} = req.params
    let data = await updateStatusOrder(idOrder,'1')
    return res.json(data)
}

//create order  
export const handleCreateOrder = async (req:Request, res: Response) => {
    const {idOrder} = req.body
    let data = await createOrder(idOrder,'1')
    return res.json(data)
} 


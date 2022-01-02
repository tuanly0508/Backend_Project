import { Request, Response } from "express";
import {QueryResult} from 'pg'
import {pool} from '../database'
import { createOrder, updateStatusOrder } from "../services/OrderService";

//get order
export const getOrder = async (req: Request, res:Response) => {
    const {idUser} = req.params
    const response: QueryResult = await pool.query('select distinct a."idUser",a."nameUser" ,a.email ,a.phone ,a.address,b."timeAt" from buyuser a join ordertemp b on a."idUser" = b."idUser" where a."idUser" = $1', [idUser])
    const response2: QueryResult = await pool.query('select "idUser" , c."nameProduct" ,b.price ,c.image ,b.quantity,a."timeAt" from ordertemp a join orderproduct b on a."idOrder" = b."idOrder" join product c on c."idProduct" = b."idProduct" where "idUser" = $1 and "isTemp" = false', [idUser])
    let dataUser =response.rows
    let dataCart =response2.rows
    let listOrder = {dataUser,dataCart}
    res.status(200).json(listOrder)
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
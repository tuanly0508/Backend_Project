import { Request, Response } from "express";
import { OrderProduct } from "../model/OrderProduct";
import { OrderWithDetail, OrderWithUser } from "../model/OrderTemp";
import { User } from "../model/User";
import { createOrder, getOrder, updateStatusOrder } from "../services/OrderService";

//get order
export const handleGetOrder = async (req: Request, res:Response) => {
    let data = await getOrder('1')
    let list: OrderWithUser[] = []
    let listAll = data
    let listIdOrder:string[] = []
    data.map((item) => {
        listIdOrder.push(item.idOrder)
    })
    listIdOrder = Array.from(new Set(listIdOrder))

    listIdOrder.map((item) => {
        const info: OrderWithUser= {
            idOrder: item,
            idUser: '1',
            timeAt: '' ,
            isTemp: false,
            orderProduct: [],
            user: {
                idUser:'',
                nameUser: '',
                email:'',
                phone:'',
                address: ''
            }  
        }
        listAll.map((item2) => {
            if (item === item2.idOrder) {
                info.timeAt = item2.timeAt ,
                info.isTemp = false,
                info.user.idUser = item2.idUser
                info.user.nameUser = item2.nameUser
                info.user.email = item2.email
                info.user.phone = item2.phone
                info.user.address = item2.address
                info.orderProduct.push({
                    idOrder: item2.idOrder,
                    idProduct: item2.idProduct,
                    quantity: item2.quantity,
                    price: item2.price,
                    product: {
                        idProduct: item2.idProduct,
                        nameProduct: item2.nameProduct,
                        price: item2.price,
                        image: item2.image
                    }
                })
            }
        })
        list.push(info)
    })
    return res.json(list)
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


        // dataUser.idUser = item.idUser
        // dataUser.nameUser = item.nameUser
        // dataUser.phone= item.phone
        // dataUser.email = item.email
        // dataUser.address = item.address
        // dataOrderProduct.idOrder = item.idOrder
        // dataOrderProduct.idProduct = item.idProduct
        // dataOrderProduct.price= item.price
        // dataOrderProduct.quantity = item.quantity
        // dataOrderProduct.product!.idProduct = item.idProduct
        // dataOrderProduct.product!.image = item.image
        // dataOrderProduct.product!.nameProduct = item.nameProduct
        // dataOrderProduct.product!.price = item.price
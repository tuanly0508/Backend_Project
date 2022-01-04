import { Request, Response } from "express";
import { OrderWithUser } from "../model/OrderTemp";
import { Pagination } from "../model/Pagination";
import { orderService } from "../services/OrderService";

class OrderController {

    //get order
    list = async (req: Request, res:Response) => {
        const pagination: Pagination = req.body
        const {size,page} = pagination
        let data = await orderService.list('1',page,size)

        //page count
        let pageCount = 0
        data.pageCount.rows.map((item) => {
            pageCount = item.case
        })
        
        //list order
        let list: OrderWithUser[] = []
        let listAll = data
        let listIdOrder:string[] = []
        data.listOrder.rows.map((item) => {
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
            listAll.listOrder.rows.map((item2) => {
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
        let newList = {list,pageCount}
        return res.json(newList)
    } 

    //update status order
    update = async (req:Request, res: Response) => {
        const {idOrder} = req.params
        let data = await orderService.update(idOrder,'1')
        return res.json(data)
    }

    //create order  
    create = async (req:Request, res: Response) => {
        const {idOrder} = req.body
        let data = await orderService.create(idOrder,'1')
        return res.json(data)
    } 
}
export const orderController = new OrderController()
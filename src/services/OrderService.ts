import {v4 as uuid} from 'uuid'
import { QueryResult } from 'pg'
import {pool} from '../database'

export const createOrder = async(idOrder:string,idUser:string) => {
    const response: QueryResult = await pool.query('INSERT INTO orderTemp ("idOrder","idUser","timeAt") VALUES ($1,$2,$3)', [idOrder,idUser,new Date()])
    return response.rows
}

export const getOrder = async(idUser:string) => {
    const response: QueryResult = await pool.query('select a."idOrder",a."idUser","timeAt",b."idProduct" ,quantity ,b.price, c."nameProduct" ,c.image,d."nameUser" ,d.email ,d.phone ,d.address from ordertemp a join orderproduct b on a."idOrder" = b."idOrder" join product c on c."idProduct" = b."idProduct" join buyuser d on d."idUser" = a."idUser" where "isTemp" = false and a."idUser" = $1',[idUser])
    return response.rows
}

export const deleteOrder = async(idOrder:string) => {
    const response: QueryResult = await pool.query('DELETE FROM orderTemp where "idOrder"=$1',[idOrder])
    return response.rows
}

export const updateStatusOrder = async(idOrder:string,idUser:string) => {
    const response: QueryResult = await pool.query('UPDATE orderTemp set "isTemp"=false where "idOrder"=$1 and "idUser"=$2', [idOrder,idUser])
    return response.rows
}

export const checkOrder = async() => {
    const e: QueryResult = await pool.query('select count(*) from orderTemp where "isTemp" = true')
    let i = 0
    e.rows.map((item)=> {
        i = parseInt(item.count)
    })
    let id = ''
    if (i === 0) {
        createOrder(uuid(),'1')
        const e: QueryResult = await pool.query('select * from orderTemp where "isTemp" = true')
        e.rows.map((item) => {
            id=item.idOrder
        })
        return id
    }else {
        const y: QueryResult = await pool.query('SELECT "idOrder" from orderTemp where "isTemp" = true')
        y.rows.map((item) => {
            i = item.idOrder
        })
        return i 
    }  
}
import { QueryResult } from 'pg'
import {pool} from '../database'

export const getCart = async(idUser: string) => {
    const response: QueryResult = await pool.query('select a."idOrder",b."idProduct",b."nameProduct" ,b.price ,b.image,quantity from orderProduct a join product b on a."idProduct" = b."idProduct" join orderTemp c on c."idOrder"=a."idOrder" where c."idUser" = $1 and "isTemp" = true order by price desc', [idUser])
    return response.rows
}
    
export const createCart = async(idOrder:string|number,idProduct:string,quantity:number,price:number) => {
    const response: QueryResult = await pool.query('INSERT INTO orderProduct ("idOrder","idProduct",quantity,price) VALUES ($1,$2,$3,$4)', [idOrder,idProduct,quantity,price])
    console.log(idOrder);
    
    return response.rows
}

export const deleteCart = async(idProduct:string) => {
    const response: QueryResult = await pool.query('DELETE FROM orderProduct where "idProduct"=$1', [idProduct])
    return response.rows
}

export const updateCart = async(quantity:number,idProduct:string) => {
    const response: QueryResult = await pool.query('UPDATE orderProduct set quantity=$1 where "idProduct"=$2', [quantity,idProduct])
    return response.rows
}
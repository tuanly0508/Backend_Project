import { QueryResult } from 'pg'
import {pool} from '../database'

class CartService {

    checkEmpty = async() => {
        const response: QueryResult = await pool.query('select b."idOrder", a."idProduct" from orderproduct a join ordertemp b on a."idOrder" = b."idOrder" where b."isTemp" = true')
        return response.rows
    }

    get = async(idUser: string) => {
        const response: QueryResult = await pool.query('select a."idOrder",b."idProduct",b."nameProduct" ,b.price ,b.image,quantity from orderProduct a join product b on a."idProduct" = b."idProduct" join orderTemp c on c."idOrder"=a."idOrder" where c."idUser" = $1 and "isTemp" = true order by price desc', [idUser])
        return response.rows
    }
        
    create = async(idOrder:string|number,idProduct:string,quantity:number,price:number) => {
        const response: QueryResult = await pool.query('INSERT INTO orderProduct ("idOrder","idProduct",quantity,price) VALUES ($1,$2,$3,$4)', [idOrder,idProduct,quantity,price])
        return response.rows
    }

    delete = async(idProduct:string) => {
        const response: QueryResult = await pool.query('DELETE FROM orderProduct where "idProduct"=$1', [idProduct])
        return response.rows
    }

    update = async(quantity:number,idProduct:string) => {
        const response: QueryResult = await pool.query('UPDATE orderProduct set quantity=$1 where "idProduct"=$2', [quantity,idProduct])
        return response.rows
    }
}

export const cartService = new CartService()
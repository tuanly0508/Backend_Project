import { QueryResult } from 'pg'
import {pool} from '../database'

export const getProduct = async(size:number,page:number) => {
    const listProduct: QueryResult = await pool.query('SELECT * FROM product OFFSET (($1-1)*$2) rows FETCH NEXT $2 ROWS ONLY',[page,size])
    const pageCount: QueryResult = await pool.query('select CASE when count(*)/$1 <= 1 then count(*)/$1+1 else count(*)/$1+1 end from product',[size])
    return {listProduct,pageCount}
}

export const getProductDetail = async(idProduct:string) => {
    const response: QueryResult = await pool.query('SELECT * FROM product where "idProduct" = $1',[idProduct])
    return response.rows
}

export const createProduct = async(idProduct:string,nameProduct:string,price:number,image:string) => {
    const response: QueryResult = await pool.query('INSERT INTO product ("idProduct","nameProduct","price","image") VALUES ($1,$2,$3,$4)', [idProduct,nameProduct,price,image])
    return response.rows
}

export const deleteProduct = async(idProduct:string) => {
    const response: QueryResult = await pool.query('DELETE FROM product where "idProduct"=$1', [idProduct])
    return response.rows
}

export const updateProduct = async(nameProduct:string,price:number,image:string,idProduct:string) => {
    const response: QueryResult = await pool.query('UPDATE product set "nameProduct"=$1,price=$2,image=$3 where "idProduct"=$4', [nameProduct,price,image,idProduct])
    return response.rows
}
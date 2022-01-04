import { QueryResult } from 'pg'
import {pool} from '../database'

class ProductService {

    getProduct = async(search:string,field:string,sort:string,page:number,size:number) => {
        const listProduct: QueryResult = await pool.query(`SELECT * FROM product 
        where "nameProduct" like
	        case when length($1) > 0 then '%`+search.toLocaleUpperCase()+`%' else '%%' end
        order by 
            case when $2 = 'price' and $3 = 'desc' then price end desc,
            case when $2 = 'price' and $3 = 'asc' then price end,
            case when $2 = 'nameProduct' and $3 = 'desc' then "nameProduct" end desc,
            case when $2 = 'nameProduct' and $3 = 'asc' then "nameProduct" end 
        OFFSET (($4-1)*$5) rows FETCH NEXT $5 ROWS only `,[search,field,sort,page,size])
        
        const pageCount: QueryResult = await pool.query('select CASE when count(*)/$1 <= 1 then count(*)/$1+1 else count(*)/$1+1 end from product',[size])
        return {listProduct,pageCount}
    }

    getProductDetail = async(idProduct:string) => {
        const response: QueryResult = await pool.query('SELECT * FROM product where "idProduct" = $1',[idProduct])
        return response.rows
    }

    createProduct = async(idProduct:string,nameProduct:string,price:number,image:string) => {
        const response: QueryResult = await pool.query('INSERT INTO product ("idProduct","nameProduct","price","image") VALUES ($1,$2,$3,$4)', [idProduct,nameProduct,price,image])
        return response.rows
    }

    deleteProduct = async(idProduct:string) => {
        const response: QueryResult = await pool.query('DELETE FROM product where "idProduct"=$1', [idProduct])
        return response.rows
    } 

    updateProduct = async(nameProduct:string,price:number,image:string,idProduct:string) => {
        const response: QueryResult = await pool.query('UPDATE product set "nameProduct"=$1,price=$2,image=$3 where "idProduct"=$4', [nameProduct,price,image,idProduct])
        return response.rows
    }
}

export const productService = new ProductService()
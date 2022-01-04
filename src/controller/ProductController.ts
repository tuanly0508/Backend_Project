import { Request, Response } from "express";
import {QueryResult} from 'pg'
import {pool} from '../database'
import { Pagination } from "../model/Pagination";
import { productService } from "../services/ProductService";

class ProductController {

    //get detail
    getById = async (req:Request, res: Response) => {
        const idProduct = req.params.idProduct
        let data = await productService.getById(idProduct)
        res.status(200).json(data) 
    }

    //add product
    create = async (req:Request, res: Response) => {
        const {idProduct,nameProduct,price,image} = req.body
        await productService.create(idProduct,nameProduct,price,image)
        const response: QueryResult = await pool.query('SELECT * FROM product')
        return res.json(response.rows)
    }

    //delete product
    delete = async (req:Request, res: Response) => {
        const idProduct = req.params.idProduct
        await productService.delete(idProduct)
        const response: QueryResult = await pool.query('SELECT * FROM product')
        return res.json(response.rows)
    }

    //update product
    update = async (req:Request, res: Response) => {
        const idProduct = req.params.idProduct
        const {nameProduct,price,image,size,page} = req.body
        await productService.update(nameProduct,price,image,idProduct)
        const response: QueryResult = await pool.query('SELECT * FROM product')
        return res.json(response.rows)
    }

    //pagination
    list = async (req:Request, res: Response) => {  
        const listData : Pagination = req.body
        const {size,page,field,sort,search} = listData
        page||1
        let data = await productService.get(search,field,sort,page,size)
        let dataProduct = data.listProduct.rows
        let pageCount = 0
        data.pageCount.rows.map((item) => {
            pageCount = item.case
        })
        let newList = {dataProduct,pageCount}
        return res.json(newList)
    }
}
export const productController = new ProductController()
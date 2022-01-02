import { Request, Response } from "express";
import {QueryResult} from 'pg'
import {pool} from '../database'
import { ListProduct } from "../model/ListProduct";
import { Product } from "../model/Product";
import { createProduct, deleteProduct, getProduct, getProductDetail, updateProduct } from "../services/ProductService";

let list:Product[] = []

//get detail
export const handleGetProductDetail = async (req:Request, res: Response) => {
    const idProduct = req.params.idProduct
    let data = await getProductDetail(idProduct)
    res.status(200).json(data) 
}

//add product
export const handleCreateProduct = async (req:Request, res: Response) => {
    const {idProduct,nameProduct,price,image} = req.body
    await createProduct(idProduct,nameProduct,price,image)
    const response: QueryResult = await pool.query('SELECT * FROM product')
    return res.json(response.rows)
}

//delete product
export const handleDeleteProduct = async (req:Request, res: Response) => {
    const idProduct = req.params.idProduct
    await deleteProduct(idProduct)
    const response: QueryResult = await pool.query('SELECT * FROM product')
    return res.json(response.rows)
}

//update product
export const handleUpdateProduct = async (req:Request, res: Response) => {
    const idProduct = req.params.idProduct
    const {nameProduct,price,image} = req.body
    await updateProduct(nameProduct,price,image,idProduct)
    const response: QueryResult = await pool.query('SELECT * FROM product')
    return res.json(response.rows)
}

//pagination
export const getProductPagination = async (req:Request, res: Response) => {  
    const listData : ListProduct = req.body
    const {size,search,page,sort} = listData
    page||1

    let data = await getProduct(size,page)
    let dataProduct = data.listProduct.rows
    let pageCount = 0
    data.pageCount.rows.map((item) => {
        pageCount = item.case
    })
    let newList = {dataProduct,pageCount}
    return res.json(newList)
    
    
    // const newData = (i:Product[]) => {
    //     let listProduct = i.slice(s,e)
    //     let pageCount = Math.ceil(i.length/size)
    //     let newList = {listProduct, pageCount}
    //     return res.json(newList)
    // }  
    
    // //search
    // if (search) {    
    //     if(sort === 'sortPriceDown') {
    //         let y = list.filter(data => data.name.toLocaleLowerCase().indexOf(search) > -1)
    //         let i = y.sort((a,b) => (a.price<b.price)? 1 : -1)
    //         newData(i)
    //     }else if (sort === 'sortPriceUp'){
    //         let i = list.filter(data => data.name.toLocaleLowerCase().indexOf(search) > -1)
    //         let y = i.sort((a,b) => (a.price>b.price)? 1 : -1)
    //         newData(y)
    //     }else if(sort === 'sortNameUp'){
    //         let i = list.filter(data => data.name.toLocaleLowerCase().indexOf(search) > -1)
    //         let y = i.sort((a,b) => (a.name>b.name)? 1 : -1)
    //         newData(y)
    //     }else if(sort === 'sortNameDown'){
    //         let i = list.filter(data => data.name.toLocaleLowerCase().indexOf(search) > -1)
    //         let y = i.sort((a,b) => (a.name<b.name)? 1 : -1)
    //         newData(y)
    //     }else {
    //         let i = list.filter(data => data.name.toLocaleLowerCase().indexOf(search) > -1)
    //         newData(i)
    //     }
    // }else {
    //     if(sort === 'sortPriceDown') {
    //         let i = list.sort((a,b) => (a.price<b.price)? 1 : -1)
    //         newData(i)
    //     }else if (sort === 'sortPriceUp'){
    //         let i = list.sort((a,b) => (a.price>b.price)? 1 : -1)
    //         newData(i)
    //     }else if(sort === 'sortNameUp'){
    //         let i = list.sort((a,b) => (a.name>b.name)? 1 : -1)
    //         newData(i)
    //     }else if(sort === 'sortNameDown'){
    //         let i = list.sort((a,b) => (a.name<b.name)? 1 : -1)
    //         newData(i)
    //     }else{
    //         return res.json(newList)
    //     }
    // }  
}
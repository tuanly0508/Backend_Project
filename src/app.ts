import express, {Request, Response} from 'express'
import { ListOrder } from './model/ListOrder'
import { ListProduct } from './model/ListProduct'
import { listProduct,Product } from './model/Product'

const app = express()
var cors = require('cors')

let list:Product[] = listProduct 
let order: ListOrder[] = []

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

// delete product 
app.get('/delete/:idProduct',(req: Request,res: Response) => {
    let id = req.params.idProduct
    list = list.filter(data => data.id !== id)
    return res.json(
        list
    )
})

//add product
app.post('/add', (req: Request,res: Response) => {
    list.push(req.body)
    return res.json(
        list
    )
})

//update product ds
app.put('/update', (req: Request,res: Response) => {
    let i = list.findIndex(data => data.id === req.body.id)
    list[i] = req.body
    
    return res.json(
        list
    )
})

//get product detail
app.get('/product/:idProduct', (req: Request,res: Response) => {
    let id = req.params.idProduct
    let i = list.findIndex(data => data.id === id)
    let item = list[i]
    return res.json(
        item
    )
})

//list 
app.post('/shop',(req, res ) => {
    const listData : ListProduct = req.body
    const {size,search,page,sort} = listData
    page||1

    //pagination
    let s = (page -1) * size
    let e = page * size
    let listProduct = list.slice(s,e)
    let pageCount = Math.ceil(list.length/size)
    let newList = {listProduct,pageCount}

    const newData = (i:Product[]) => {
        let listProduct = i.slice(s,e)
        let pageCount = Math.ceil(i.length/size)
        let newList = {listProduct, pageCount}
        return res.json(newList)
    }  
    
    //search
    if (search) {    
        if(sort === 'sortPriceDown') {
            let y = list.filter(data => data.name.toLocaleLowerCase().indexOf(search) > -1)
            let i = y.sort((a,b) => (a.price<b.price)? 1 : -1)
            newData(i)
        }else if (sort === 'sortPriceUp'){
            let i = list.filter(data => data.name.toLocaleLowerCase().indexOf(search) > -1)
            let y = i.sort((a,b) => (a.price>b.price)? 1 : -1)
            newData(y)
        }else if(sort === 'sortNameUp'){
            let i = list.filter(data => data.name.toLocaleLowerCase().indexOf(search) > -1)
            let y = i.sort((a,b) => (a.name>b.name)? 1 : -1)
            newData(y)
        }else if(sort === 'sortNameDown'){
            let i = list.filter(data => data.name.toLocaleLowerCase().indexOf(search) > -1)
            let y = i.sort((a,b) => (a.name<b.name)? 1 : -1)
            newData(y)
        }else {
            let i = list.filter(data => data.name.toLocaleLowerCase().indexOf(search) > -1)
            newData(i)
        }
    }else {
        if(sort === 'sortPriceDown') {
            let i = list.sort((a,b) => (a.price<b.price)? 1 : -1)
            newData(i)
        }else if (sort === 'sortPriceUp'){
            let i = list.sort((a,b) => (a.price>b.price)? 1 : -1)
            newData(i)
        }else if(sort === 'sortNameUp'){
            let i = list.sort((a,b) => (a.name>b.name)? 1 : -1)
            newData(i)
        }else if(sort === 'sortNameDown'){
            let i = list.sort((a,b) => (a.name<b.name)? 1 : -1)
            newData(i)
        }else{
            return res.json(newList)
        }
    }   
})

//order
app.post('/checkout/delivery' , (req, res,) => {
    order.push(req.body)
    console.log(order);
    
    return res.json (
        order
    )
})

//get list order
app.get('/user/orders/:idUser',(req,res) => {
    let id = req.params.idUser
    let i = order.filter(data => data.idUser === id) 
    return res.json (
        i
    )
})

app.listen(8000, () => {
    console.log("Connect done !!!");
})
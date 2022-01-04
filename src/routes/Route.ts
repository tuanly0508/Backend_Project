import { Router } from "express";
import { handleCreateCart, handleDeleteCart, handleGetCart, handleUpdateCart} from "../controller/CartController";
import { handleCreateOrder, handleGetOrder, handleUpdateStatusOrder } from "../controller/OrderController";
import { handleCreateProduct, handleDeleteProduct, handleGetProductDetail, getProductPagination, handleUpdateProduct } from "../controller/ProductController";
import { getUserDetail, handleUpdateUser} from '../controller/UserController'
import { checkOrder } from "../services/OrderService";

const router = Router()

//pagination product
router.post('/products/pagination', getProductPagination)
router.get('/check', checkOrder)
//user
// router.get('/users', getUsers);
router.get('/users/detail/:idUser', getUserDetail)
// router.post('/users/create', createUser)
// router.get('/users/delete/:idUser', deleteUser)
router.put('/users/update', handleUpdateUser)

//product
router.get('/products/detail/:idProduct', handleGetProductDetail)
router.post('/products/create', handleCreateProduct)
router.get('/products/delete/:idProduct', handleDeleteProduct)
router.put('/products/update/:idProduct', handleUpdateProduct)

//cart
router.get('/carts/:idUser', handleGetCart)
router.post('/carts/create', handleCreateCart)
router.get('/carts/delete/:idProduct/:idUser', handleDeleteCart)
router.put('/carts/update/:idOrder/:idUser/:quantity', handleUpdateCart)

//order
router.put('/orders/update/:idOrder/:idUser', handleUpdateStatusOrder)
router.post('/orders/:idUser', handleGetOrder)
router.post('/orders/create', handleCreateOrder)

export default router;
import { Router } from "express";
import { handleCreateCart, handleDeleteCart, handleGetCart, handleUpdateCart} from "../controller/CartController";
import { handleCreateOrder, getOrder, handleUpdateStatusOrder } from "../controller/OrderController";
import { handleCreateProduct, handleDeleteProduct, handleGetProductDetail, getProductPagination, handleUpdateProduct } from "../controller/ProductController";
import { getUserDetail, updateUser} from '../controller/UserController'

const router = Router()

//pagination product
router.post('/products/pagination', getProductPagination)

//user
// router.get('/users', getUsers);
router.get('/users/detail/:idUser', getUserDetail)
// router.post('/users/create', createUser)
// router.get('/users/delete/:idUser', deleteUser)
router.put('/users/update', updateUser)

//product
router.get('/products/detail/:idProduct', handleGetProductDetail)
router.post('/products/create', handleCreateProduct)
router.get('/products/delete/:idProduct', handleDeleteProduct)
router.put('/products/update/:idProduct', handleUpdateProduct)

//cart
router.get('/carts/:idUser', handleGetCart)
router.post('/carts/create', handleCreateCart)
router.get('/carts/delete/:idOrder/:idUser', handleDeleteCart)
router.put('/carts/update/:idOrder/:idUser/:quantity', handleUpdateCart)

//order
router.put('/orders/update/:idOrder/:idUser', handleUpdateStatusOrder)
router.get('/orders/:idUser', getOrder)
router.post('/orders/create', handleCreateOrder)

export default router;
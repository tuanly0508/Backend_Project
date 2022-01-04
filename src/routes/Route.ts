import { Router } from "express";
import { cartController } from "../controller/CartController";
import { orderController } from "../controller/OrderController";
import { productController } from "../controller/ProductController";
import { userController } from "../controller/UserController";

const router = Router()

//user
router.get('/users', userController.getUsers);
router.get('/users/detail/:idUser', userController.getUserDetail)
router.post('/users/create', userController.createUser)
router.get('/users/delete/:idUser', userController.deleteUser)
router.put('/users/update', userController.handleUpdateUser)

//product
router.post('/products/list', productController.getProductPagination)
router.get('/products/detail/:idProduct', productController.handleGetProductDetail)
router.post('/products/create', productController.handleCreateProduct)
router.get('/products/delete/:idProduct', productController.handleDeleteProduct)
router.put('/products/update/:idProduct', productController.handleUpdateProduct)

//cart
router.get('/carts/:idUser', cartController.handleGetCart)
router.post('/carts/create', cartController.handleCreateCart)
router.get('/carts/delete/:idProduct/:idUser', cartController.handleDeleteCart)
router.put('/carts/update/:idOrder/:idUser/:quantity', cartController.handleUpdateCart)

//order
router.put('/orders/update/:idOrder/:idUser', orderController.handleUpdateStatusOrder)
router.post('/orders/:idUser', orderController.handleGetOrder)
router.post('/orders/create', orderController.handleCreateOrder)

export default router;
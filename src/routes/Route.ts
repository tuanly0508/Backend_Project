import { Router } from "express";
import { cartController } from "../controller/CartController";
import { orderController } from "../controller/OrderController";
import { productController } from "../controller/ProductController";
import { userController } from "../controller/UserController";

const router = Router()

//user
router.put('/users/update', userController.update)
router.get('/users/detail/:idUser', userController.getById)
// router.get('/users', userController.get);
// router.post('/users/create', userController.create)
// router.get('/users/delete/:idUser', userController.delete)

//product
router.post('/products/list', productController.list)
router.get('/products/detail/:idProduct', productController.getById)
router.post('/products/create', productController.create)
router.get('/products/delete/:idProduct', productController.delete)
router.put('/products/update/:idProduct', productController.update)

//cart
router.get('/carts/:idUser', cartController.get)
router.post('/carts/create', cartController.create)
router.get('/carts/delete/:idProduct/:idUser', cartController.delete)
router.put('/carts/update/:idOrder/:idUser/:quantity', cartController.update)

//order
router.put('/orders/update/:idOrder/:idUser', orderController.update)
router.post('/orders/:idUser', orderController.list)
router.post('/orders/create', orderController.create)

export default router;
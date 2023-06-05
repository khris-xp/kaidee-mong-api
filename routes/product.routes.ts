const productRouter = require('express').Router();

const productController = require('../controller/product.controller');
import authUser from '../middleware/auth';
import authAdmin from '../middleware/authAdmin';

productRouter.route('/products')
    .get(productController.getProducts)
    .post(authUser, authAdmin, productController.createProduct);
productRouter.route('/products/:id')
    .delete(authUser, authAdmin, productController.deleteProduct)
    .put(authUser, authAdmin, productController.updateProduct);

module.exports = productRouter;

const categoryRouter = require('express').Router();
const categoryController = require('../controller/category.controller');
import authUser from '../middleware/auth';
import authAdmin from '../middleware/authAdmin';

categoryRouter.route('/category')
    .get(categoryController.getCategories)
    .post(authUser, authAdmin, categoryController.createCategory)

categoryRouter.route('/category/:id')
    .delete(authUser, authAdmin, categoryController.deleteCategory)
    .put(authUser, authAdmin, categoryController.updateCategory)

module.exports = categoryRouter;
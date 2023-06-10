const contentRouter = require('express').Router();

const contentController = require('../controller/content.controller');
import authUser from '../middleware/auth';
import authAdmin from '../middleware/authAdmin';

contentRouter.route('/contents')
    .get(contentController.getContents)
    .post(authUser, authAdmin, contentController.createContent);

contentRouter.route('/contents/:id')
    .delete(authUser, authAdmin, contentController.deleteContent)
    .put(authUser, authAdmin, contentController.updateContent);

module.exports = contentRouter;
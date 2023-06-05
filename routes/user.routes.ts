const userRouter = require('express').Router();
const userController = require('../controller/user.controller');
import authUser  from '../middleware/auth';

userRouter.post('/register', userController.register);
userRouter.get('/refresh_token', userController.refreshToken);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
userRouter.get('/info', authUser, userController.getUser);

module.exports = userRouter;
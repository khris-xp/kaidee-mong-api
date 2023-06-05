import { Request, Response } from "express";
const router = require('express').Router();
const userController = require('../controller/user.controller');

router.post('/register', userController.register);
router.get('/refresh_token', userController.refreshToken);

module.exports = router;
const router = require('express').Router();
const userController = require('../controller/user.controller');
const auth = require('../middleware/auth');

router.post('/register', userController.register);
router.get('/refresh_token', userController.refreshToken);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/info', auth, userController.getUser);

module.exports = router;
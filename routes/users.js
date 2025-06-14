const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

router.get('/', userController.getAllUsers);
router.get('/profile', userController.getUserProfile);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.put('/profile', userController.updateUserProfile);
router.delete('/:id', userController.deleteUser);

module.exports = router;
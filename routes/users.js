const router = require('express').Router();
const { getUsers, getUserById, updateUser, updateAvatar, createUsers } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUsers);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
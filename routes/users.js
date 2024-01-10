const router = require('express').Router();
const { getUsers, getUserById, updateUser, updateAvatar, createUsers } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUsers);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
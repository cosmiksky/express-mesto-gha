const User = require('../models/users');
const mongoose = require('mongoose');
const BadRequestError = require('../errors/BadRequest');
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFound');

module.exports.getUsers = (req, res) => {
	User.find({})
		.then(users => res.send(users))
		.catch(() => {
			throw new ServerError('Ошибка сервера');
		});
};

module.exports.getUserById = (req, res) => {
	const {userId}  = req.params;
	User.findById(userId)
		.then((user) => {
			if(user) {
				res.send(user);
			} else {
				throw new NotFoundError('Карточка или пользователь не найден');
			}
		})
		.catch((err) => {
			if(err instanceof mongoose.Error.CastError) {
				throw new BadRequestError('Переданы некорректные данные при создании пользователя');
			} else {
				throw new ServerError('Ошибка сервера');
			}
		});
};

module.exports.createUsers = (req, res) => {
	const { name, about, avatar } = req.body;
	User.create({ name, about, avatar })
		.then( user => res.send(user))
		.catch((err) => {
			if(err instanceof mongoose.Error.ValidationError) {
				throw new BadRequestError('Переданы некорректные данные при создании пользователя');
			} else {
				throw new ServerError('Ошибка сервера');
			}
		});
};

module.exports.updateUser = (req, res) => {
	const { name, about } = req.body;
	const userId = req.user._id;
	User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
		.then( user => res.status(200).send(user))
		.catch((err) => {
			if(err instanceof mongoose.Error.ValidationError) {
				throw new BadRequestError('Переданы некорректные данные при обновлении пользователя');
			} else {
				throw new ServerError('Ошибка сервера');
			}
		});
};

module.exports.updateAvatar = (req, res) => {
	const { avatar } = req.body;
	const userId = req.user._id;
	User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
		.then( user => res.status(200).send(user))
		.catch((err) => {
			if(err instanceof mongoose.Error.ValidationError) {
				throw new BadRequestError('Переданы некорректные данные при обновлении аватара');
			} else {
				throw new ServerError('Ошибка сервера');
			}
		});
};
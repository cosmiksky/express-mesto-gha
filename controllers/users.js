const User = require('../models/users');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');

module.exports.getUsers = (req, res, next) => {
	User.find({})
		.then(users => res.send(users))
		.catch((err) => {
			next(err);
		});
};

module.exports.getUserById = (req, res, next) => {
	const {userId}  = req.params;
	User.findById(userId)
		.then((user) => {
			if(user) {
				res.send(user);
			} else {
				next(new NotFound('Пользователь не найден'));
			}
		})
		.catch((err) => {
			if(err.name === 'CastError') {
				next(new BadRequest('Переданы некорректные данные при создании пользователя'));
			} else {
				next(err);
			}
		});
};

module.exports.createUsers = (req, res, next) => {
	const { name, about, avatar } = req.body;
	User.create({ name, about, avatar })
		.then( user => res.send(user))
		.catch((err) => {
			if(err.name === 'ValidationError') {
				next(new BadRequest('Переданы некорректные данные при создании пользователя'));
			} else {
				next(err);
			}
		});
};

module.exports.updateUser = (req, res, next) => {
	const { name, about } = req.body;
	const userId = req.user._id;
	User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
		.then( user => res.status(200).send(user))
		.catch((err) => {
			if(err.name === 'ValidationError') {
				next(new BadRequest('Переданы некорректные данные при обновлении пользователя'));
			} else {
				next(err);
			}
		});
};

module.exports.updateAvatar = (req, res, next) => {
	const { avatar } = req.body;
	const userId = req.user._id;
	User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
		.then( user => res.status(200).send(user))
		.catch((err) => {
			if(err.name === 'ValidationError') {
				next(new BadRequest('Переданы некорректные данные при обновлении аватара'));
			} else {
				next(err);
			}
		});
};
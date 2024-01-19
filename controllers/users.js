const User = require('../models/users');

module.exports.getUsers = (req, res, next) => {
	User.find({})
		.then(users => {
			if(users) {
				res.send(users);} else {
				res.status(404).send({ message: 'Пользователь не найден' });
			}}
		)
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
				res.status(404).send({ message: 'Пользователь не найден' });
			}
		})
		.catch((err) => {
			if(err) {
				res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' });
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
			if(err) {
				res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' });
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
			if(err) {
				res.status(400).send({ message: 'Переданы некорректные данные' });
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
			if(err) {
				res.status(400).send({ message: 'Переданы некорректные данные' });
			} else {
				next(err);
			}
		});
};
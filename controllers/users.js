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
	const userId  = req.params;
	User.findById(userId)
		.then((user) => {
			if(user) {
				res.send(user);
			} else {
				throw new Error('Пользователь по переданному id не найден');
			}
		})
		.catch((err) => {
			next(err);
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

module.exports.updateUser = (req, res) => {
	const { name, about } = req.body;
	User.findByIdAndUpdate(req.params, { name, about }, { new: true, runValidators: true })
		.then( user => res.send({ name: user.name, about: user.about }))
		.catch(() => res.status(400).send({ message: 'Переданы некорректные данные' }));
};

module.exports.updateAvatar = (req, res) => {
	const { avatar } = req.body;
	User.findByIdAndUpdate(req.params, { avatar }, { new: true, runValidators: true })
		.then( user => res.send(user))
		.catch(() => res.status(400).send({ message: 'Переданы некорректные данные' }));
};
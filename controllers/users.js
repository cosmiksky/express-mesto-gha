const User = require('../models/users');

module.exports.getUsers = (req, res) => {
	User.find({})
		.then(users => res.send(users))
		.catch(() => res.status(404).send({ message: 'Пользователь не найден' }));
};

module.exports.getUserById = (req, res) => {
	const { userId } = req.params;
	User.findById(userId)
		.then( user => res.send(user))
		.catch(() => {
			if(!userId) {
				res.status(404).send({ message: 'Пользователь не найден' });
			}
			res.status(400).send({ message: 'Переданы некорректные данные пользователя' });});
};

module.exports.createUsers = (req, res) => {
	const { name, about, avatar } = req.body;
	User.create({ name, about, avatar })
		.then( user => res.send(user))
		.catch(() => res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' }));
};

module.exports.updateUser = (req, res) => {
	const { name, about } = req.body;
	User.findByIdAndUpdate(req.params.id, { name, about })
		.then(user => res.status(200).send( user )
		)
		.catch(() => res.status(404).send({ message: 'Пользователь не найден' }));
};

module.exports.updateAvatar = (req, res) => {
	const { avatar } = req.body;
	User.findByIdAndUpdate(req.params.id, { avatar })
		.then( user => res.send( user ))
		.catch(() => res.status(404).send({ message: 'Пользователь не найден' }));
};
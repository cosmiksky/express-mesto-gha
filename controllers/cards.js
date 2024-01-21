const Card = require('../models/cards');
const BadRequestError = require('../errors/BadRequest');
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFound');

module.exports.createCard = (req, res) => {
	const { name, link } = req.body;
	const userId = req.user._id;
	Card.create({ name, link, owner: userId })
		.then(card => res.status(201).send(card))
		.catch((err) => {
			if(err.name === 'ValidationError') {
				throw new BadRequestError('Переданы некорректные данные при создании карточки');
			} else {
				throw new ServerError('Ошибка сервера');
			}
		});
};

module.exports.getCards = (req, res) => {
	Card.find({})
		.then(cards => res.send(cards))
		.catch(() => {
			throw new ServerError('Ошибка сервера');
		});
};

module.exports.deleteCard = (req, res) => {
	const { cardId } = req.params;
	Card.findByIdAndDelete(cardId)
		.then(card => {
			if(card) {
				res.send({ data: card });
			} else {
				throw new NotFoundError('Карточка или пользователь не найден');
			}
		})
		.catch((err) => {
			if(err.name === 'CastError') {
				throw new BadRequestError('Переданы некорректные данные');
			} else {
				throw new ServerError('Ошибка сервера');
			}
		});
};

module.exports.likeCard = (req, res) => {
	const { cardId } = req.params;
	Card.findByIdAndUpdate(
		cardId,
		{ $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
		{ new: true },
	)
		.then((card) => {
			if(card) {
				res.status(200).send({ data: card });
			} else {
				throw new NotFoundError('Карточка или пользователь не найден');
			}
		})
		.catch((err) => {
			if(err.name === 'CastError') {
				throw new BadRequestError('Переданы некорректные данные');
			} else {
				throw new ServerError('Ошибка сервера');
			}
		});
};

module.exports.dislikeCard = (req, res) => {
	const { cardId } = req.params;
	Card.findByIdAndUpdate(
		cardId,
		{ $pull: { likes: req.user._id } }, // убрать _id из массива
		{ new: true },
	)
		.then((card) => {
			if(card) {
				res.status(200).send(card);
			} else {
				throw new NotFoundError('Карточка или пользователь не найден');
			}
		})
		.catch((err) => {
			if(err.name === 'CastError') {
				throw new BadRequestError('Переданы некорректные данные');
			} else {
				throw new ServerError('Ошибка сервера');
			}
		});
};
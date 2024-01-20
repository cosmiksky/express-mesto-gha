const Card = require('../models/cards');

module.exports.createCard = (req, res, next) => {
	const { name, link } = req.body;
	const ownerId = req.user._id;
	Card.create({ name, link, ownerId })
		.then(card => res.status(200).send(card))
		.catch((err) => {
			if(err) {
				res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' });
			} else {
				next(err);
			}
		});

};

module.exports.getCards = (req, res, next) => {
	Card.find({})
		.then(cards => res.send(cards))
		.catch((err) => {
			if(err) {
				res.status(404).send({ message: 'Карточка не найдена' });
			} else {
				next(err);
			}
		});
};

module.exports.deleteCard = (req, res) => {
	const { cardId } = req.params;
	Card.findByIdAndDelete({_id: cardId})
		.then(card => {
			if(!card) {
				res.status(404).send({ message: 'Карточка не найдена' });
			}
			res.send({ message: 'Карточка успешно удалена' });})
		.catch(() => res.status(400).send({ message: 'Переданы некорректные данные' }));
};

module.exports.likeCard = (req, res, next) => {
	const { id } = req.params;
	Card.findByIdAndUpdate(
		id,
		{ $addToSet: { likes: id } }, // добавить _id в массив, если его там нет
		{ new: true },
	)
		.then((card) => {
			if(card) {
				res.status(200).send({ data: card });
			} else {
				res.status(404).send({ message: 'Карточка не найдена' });
			}
		})

		.catch((err) => {
			if(err) {
				res.status(400).send({ message: 'Переданы некорректные данные' });
			} else {
				next(err);
			}
		});
};

module.exports.dislikeCard = (req, res, next) => {
	const { id } = req.params;
	Card.findByIdAndUpdate(
		id,
		{ $pull: { likes: id } }, // убрать _id из массива
		{ new: true },
	)
		.then((card) => {
			if(card) {
				res.status(200).send({ data: card });
			} else {
				res.status(404).send({ message: 'Карточка не найдена' });
			}
		})
		.catch((err) => {
			if(err) {
				res.status(400).send({ message: 'Переданы некорректные данные' });
			} else {
				next(err);
			}
		});
};
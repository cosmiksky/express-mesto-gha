const Card = require('../models/cards');

module.exports.createCard = (req, res, next) => {
	const { name, link } = req.body;
	Card.create({ name, link })
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
		.catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.likeCard = (req, res, next) => {
	Card.findByIdAndUpdate(
		req.params.cardId,
		{ $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
		{ new: true },
	)
		.then((card) => res.status(200).send(card))
		.catch((err) => {
			if(err) {
				res.status(500).send({ message: 'Произошла ошибка' });
			} else {
				next(err);
			}
		});
};

module.exports.dislikeCard = (req, res, next) => {
	Card.findByIdAndUpdate(
		req.params.cardId,
		{ $pull: { likes: req.user._id } }, // убрать _id из массива
		{ new: true },
	)
		.then((card) => res.status(200).send(card))
		.catch((err) => {
			if(err) {
				res.status(500).send({ message: 'Произошла ошибка' });
			} else {
				next(err);
			}
		});
};
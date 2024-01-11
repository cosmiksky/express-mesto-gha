const Card = require('../models/cards');

module.exports.createCard = (req, res) => {
	console.log(req.user._id); // _id станет доступен
	const { name, link } = req.body;
	Card.create({ name, link })
		.then(card => res.status(200).send({ data: card }))
		.catch(() => res.status(400).send({ message: 'Переданы некорректные данные в методы создания карточки' }));

};

module.exports.getCards = (req, res) => {
	Card.find({})
		.then(cards => res.send(cards))
		.catch(() => res.status(404).send({ message: 'Карточка не найдена' }));
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

module.exports.likeCard = (req, res) => {
	Card.findByIdAndUpdate(
		req.params.cardId,
		{ $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
		{ new: true },
	)
		.then(() => res.status(200))
		.catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.dislikeCard = (req, res) => {
	Card.findByIdAndUpdate(
		req.params.cardId,
		{ $pull: { likes: req.user._id } }, // убрать _id из массива
		{ new: true },
	)
		.then(() => res.status(200))
		.catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
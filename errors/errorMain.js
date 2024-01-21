class errorMain extends Error {
	constructor(message = 'Ошибка сервера') {
		super(message);
		this.statusCode = 500;
	}
}

module.exports = errorMain;
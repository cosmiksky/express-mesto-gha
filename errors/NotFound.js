const errorMain = require('./errorMain');

class NotFound extends errorMain {
	constructor(message) {
		super(message);
		this.statusCode = 404;
	}
}

module.exports = NotFound;
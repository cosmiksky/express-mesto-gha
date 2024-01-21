const errorMain = require('./errorMain');

class BadRequest extends errorMain {
	constructor(message) {
		super(message);
		this.statusCode = 400;
	}
}

module.exports = BadRequest;
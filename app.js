const express = require('express');
const mongoose = require('mongoose');
const NotFound = require('./errors/NotFound');
const errorMain = require('./errors/errorMain');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
	req.user = {
		_id: '659dbe780587efee890f0851'
	};

	next();
});

mongoose.connect('mongodb://0.0.0.0:27017/mestodb')
	.then(() => console.log('successful'));

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use('*', () => {
	throw new NotFound('Страница не найдена');
});
app.use(errorMain);

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
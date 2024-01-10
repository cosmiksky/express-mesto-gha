const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 5000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
	req.user = {
		_id: '659dbe780587efee890f0851'
	};

	next();
});

// подключаемся к серверу mongo
mongoose.connect('mongodb://0.0.0.0:27017/mestodb')
	.then(() => console.log('successful'));

app.use('/users', require('./routes/users'));

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
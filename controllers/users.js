const User = require('../models/users');

module.exports.getUsers = (req, res) => {
    User.find({})
      .then(users => {
        if(!user) {
          res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' })
        }
        res.send(users)})
      .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.getUserById = (req, res) => {
    const { userId } = req.params;
    User.findById(userId)
      .then( user => {
        if(!user) {
          res.status(404).send({ message: 'Пользователь не найден' })
        }
        res.send(user)
      })
      .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.createUsers = (req, res) => {
    const { name, about, avatar } = req.body;
    User.create({ name, about, avatar })
      .then( user => {
        if(!user) {
          res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' })
        }
        res.send(user)
      })
      .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.updateUser = (req, res) => {
    const { name, about } = req.body;
    User.findByIdAndUpdate(req.params.id, { name, about })
      .then(user => {
        if(!user) {
          res.status(404).send({ message: 'Пользователь не найден' })
        }
      res.send( user )
    })
      .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.updateAvatar = (req, res) => {
    const { avatar } = req.body;
    User.findByIdAndUpdate(req.params.id, { avatar })
      .then( user => {
        if(!user) {
          res.status(404).send({ message: 'Пользователь не найден' })
        }
        res.send( user )})
      .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}
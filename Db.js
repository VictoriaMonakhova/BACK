const { Sequelize } = require('sequelize');  //Подключение БД
const sequelize = new Sequelize('postgres://postgres:18@localhost/todo');

let db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

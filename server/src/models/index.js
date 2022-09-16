'use strict';
import dbConfig from '../configs/db.config';

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	port: dbConfig.port,
	operatorsAliases: false,
	logging: false,
	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
});

// const connectDB = () => {
sequelize
	.authenticate()
	.then(() => {
		console.log('connected success...');
	})
	.catch((err) => {
		console.log('Error ' + err);
	});
// };

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//add models
db.task = require('./task.model.js')(sequelize, DataTypes);

// relationships
// db.topic.hasMany(db.task, { foreignKey: "topicId" });
// db.task.belongsTo(db.topic);

// const migrateDB = () => {
db.sequelize
	.sync()
	.then(() => {
		console.log('Yes re-sync done!');
	})
	.catch((error) => {
		console.error('Unable to create table : ', error);
	});
// };

export default db;
module.exports = {
	db,
	// connectDB,
	// migrateDB,
};

import db from './index';

module.exports = (sequelize, DataTypes) => {
	const Task = sequelize.define('task', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		status: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		priority: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		due_date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	});

	return Task;
};

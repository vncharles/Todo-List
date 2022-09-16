import { db } from '../models/index';

const Task = db.task;

const getAllTask = async () => {
	const data = await Task.findAll();
	console.log('>> data:', data);
	return data;
};

const getOneTask = async (id) => {
	const data = await Task.findOne({
		where: { id },
	});
	// console.log('>> data:', data);
	return data;
};

const addTask = async (taskNew) => {
	const task = await Task.create(taskNew);

	return task;
};

const updateTask = async (dataUpdate) => {
	console.log('>>> dataUpdate: ', dataUpdate);
	const task = await Task.update(
		{ status: dataUpdate.status, priority: dataUpdate.priority },
		{ where: { id: dataUpdate.id } }
	);

	return task;
};

const deleteTask = async (id) => {
	const task = await Task.destroy({
		where: { id },
	});

	return task;
};

module.exports = {
	getAllTask,
	addTask,
	deleteTask,
	getOneTask,
	updateTask,
};

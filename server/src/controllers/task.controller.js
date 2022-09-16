import taskService from '../services/task.service';

const getAllTask = async (req, res) => {
	try {
		const tasks = await taskService.getAllTask();

		if (!tasks) {
			return res.status(403).json({ error: 'Khong co task nao' });
		}

		return res.status(200).json(tasks);
	} catch (e) {
		return res.status(404).json({ error: e.message });
	}
};

const addTask = async (req, res) => {
	const taskNew = {
		name: req.body.name,
		status: req.body.status,
		priority: req.body.priority,
		due_date: req.body.due_date,
	};

	if (
		!taskNew.name ||
		!taskNew.status ||
		!taskNew.priority ||
		!taskNew.due_date
	) {
		return res
			.status(403)
			.json({ message: 'Ban chua nhap thong tin task' });
	}

	try {
		const task = await taskService.addTask(taskNew);
		if (!task) {
			return res.status(403).json({ message: 'Khong the tao task' });
		}

		return res.status(200).json(task);
	} catch (e) {
		return res.status(404).json({ message: e.message });
	}
};

const updateTask = async (req, res) => {
	try {
		const dataUpdate = {
			id: req.body.id,
			// name: req.body.name,
			status: req.body.status,
			priority: req.body.priority,
			// due_date: req.body.due_date,
		};

		const task = await taskService.updateTask(dataUpdate);
		return res.status(200).json(task);
	} catch (error) {
		return res.status(404).json({ error: e.message });
	}
};

const deleteTask = async (req, res) => {
	try {
		const id = req.params.id;

		const task = await taskService.getOneTask(id);
		if (!task) {
			return res.status(403).json({ error: 'Task khong ton tai' });
		}

		const taskDel = await taskService.deleteTask(id);
		if (!taskDel) {
			return res.status(403).json({ error: 'Khong the xoa task' });
		}

		return res.status(200).json(taskDel);
	} catch (e) {
		return res.status(404).json({ error: e.message });
	}
};

module.exports = {
	getAllTask,
	addTask,
	updateTask,
	deleteTask,
};

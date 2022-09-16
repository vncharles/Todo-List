import express from 'express';
import taskController from '../controllers/task.controller';

const router = express.Router();

router.get('/', taskController.getAllTask);
router.post('/add', taskController.addTask);
router.put('/update', taskController.updateTask);
router.delete('/delete/:id', taskController.deleteTask);

export default router;

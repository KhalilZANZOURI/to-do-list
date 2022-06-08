import express from 'express';
import {
  getLists,
  getList,
  createList,
  updateList,
  deleteList,
} from '../controllers/lists.controller.js';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/tasks.controller.js';
import Task from '../models/task.model.js';

const router = express.Router();

// router.get('/all', (req, res) => {
//   console.log('this is executing');
//   const tasks = Task.find();
//   res.status(200).json(tasks);
// });
router.get('/:listId/tasks/:taskId', getTask);

router.get('/', getLists);

router.get('/:listId', getList);

router.post('/', createList);

router.put('/:listId', updateList);

router.delete('/:listId', deleteList);

router.get('/:listId/tasks', getTasks);

router.post('/:listId/tasks/', createTask);

router.put('/:listId/tasks/:taskId', updateTask); //pas bon

router.delete('/:listId/tasks/:taskId', deleteTask);

export default router;

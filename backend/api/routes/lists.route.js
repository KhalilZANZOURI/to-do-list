import express from 'express';
import { getLists, getList, createList, updateList, deleteList} from '../controllers/lists.controller.js'
import { getTasks , getTask, createTask, updateTask,  } from '../controllers/tasks.controller.js'

const router = express.Router();

router.get('/', getLists);

router.get('/:listId', getList);

router.post('/', createList);

router.put('/', updateList);

router.delete('/:listId', deleteList);

router.get('/:listId/tasks', getTasks);

router.get('/:listId/tasks/:taskId', getTask);

router.post('/:listId/tasks/', createTask);

router.put('/:listId/tasks', updateTask);

//router.delete('/:listId/tasks/:taskId', deleteTask);



export default router;
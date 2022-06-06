import * as TasksService from "../services/tasks.service.js";   

export const getTasks = async (req, res) => {
    try {
        const tasks = await TasksService.getTasks(req.params.listId);
        return res.status(200).json(tasks);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

export const getTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await TasksService.getTask(taskId);
        return res.status(200).json(task);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

export const createTask = async (req, res) => {
    try {
        const taskToCreate = req.body.listId;
       
        const tasks = await TasksService.createTask(taskToCreate);
        return res.status(200).json({ status: 200, data: tasks, message: "Succesfully Tasks Retrieved" });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ status: 400, message: e.message });
    }
}

export const updateTask = async (req, res) => {
    try {

        const taskUpdated = await TasksService.updateTask(req.body);
        return res.status(200).json(taskUpdated);
        
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
        
    }
}

export const deleteTask = async (req, res) => {
    try {
        const taskId  = req.params.taskId;
        console.log(taskId)
        await TasksService.deleteTask(taskId);
        return res.status(200).json({ status: 204, message: `task with id ${taskId} succesfully deleted` });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
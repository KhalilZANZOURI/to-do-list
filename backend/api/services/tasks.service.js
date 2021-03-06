import Task from '../models/task.model.js';
import List from '../models/list.model.js';
import { getList } from './lists.service.js';

import mongoose from 'mongoose';

const getTasks = async listId => {
  try {
    const list = await List.findOne({ _id: listId });
    console.log(list);
    const tasks = await Task.find({ _id: { $in: list.tasks } });
    return tasks;
  } catch (e) {
    console.log(e);
    throw Error('Error while fetching list.');
  }
};

const getTask = async taskId => {
  try {
    return await Task.findOne({ _id: taskId });
  } catch (err) {
    throw Error('Error');
  }
};

const createTask = async (listId, taskToCreate) => {
  try {
    // console.log('this is the task ' + JSON.stringify(taskToCreate));
    const newTask = new Task(taskToCreate);
    const createdTask = await newTask.save();
    return createdTask;
  } catch (e) {
    console.log(e);
    throw Error('Error.');
  }
};

const updateTask = async (taskToUpdate, newTask) => {
  try {
    await Task.findOneAndUpdate({ _id: taskToUpdate }, newTask);
    return getTask(taskToUpdate);
  } catch (e) {
    console.log(e);
    throw Error('Error.');
  }
};

const deleteTask = async taskId => {
  try {
    await Task.deleteOne({ _id: taskId });
  } catch (e) {
    throw Error('Error.');
  }
};

export { getTasks, getTask, createTask, updateTask, deleteTask };

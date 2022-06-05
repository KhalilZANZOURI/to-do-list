import Task from '../models/task.model.js';
import List from '../models/list.model.js';
import { getList } from './lists.service.js';

import mongoose from 'mongoose';

const getTasks = async (listId) => {
    try {
        const list= await List.findOne({_id:listId})
        console.log(listId)
        console.log(list)
        return list.tasks ;
    } catch (e) {
        console.log(e)
        throw Error('Error while fetching list.');
    }
}



const getTask=async (taskId)=>{
    try{
    return await Task.findOne({_id:taskId});
    } catch(err){
    throw Error('Error');
    }

}

const createTask = async (taskToCreate) => {
    try {
        const newTask = new Task(taskToCreate)
        await newTask.save()
        return getTasks();
    } catch (e) {
        console.log(e);
        throw Error('Error.');
    }
}

const updateTask = async (taskToUpdate) => {
    try {
        await Task.findOneAndUpdate(taskToUpdate)
        return taskToUpdate
    } catch (e) {
        throw Error('Error.')
        
    }
}

// /**
//  * 
//  * @param studentToUpdate The student to update
//  * @returns All students
//  */
// const updateStudent = (studentToUpdate) => {
//     try {
//         Student.findOneAndUpdate(studentToUpdate);
//         return studentToUpdate;
//     } catch (e) {
//         throw Error('Error.');
//     }
// }

// /**
//  * 
//  * @param studentId The student id
//  * @param dataToPatch Data to patch
//  * @returns The patched student
//  */
// const patchStudent = async (studentId, dataToPatch) => {
//     try {
//         const studentToPatch = await getStudent(studentId);
//         const { name, firstname, age } = dataToPatch;

//         if(name) studentToPatch.name = name;
//         if(firstname) studentToPatch.firstname = firstname;
//         if(age) studentToPatch.age = age;

//         updateStudent(studentToPatch);
//         return studentToPatch;
//     } catch (e) {
//         throw Error('Error.');
//     }
// }

// const deleteStudent = async (studentId) => {
//     try {
//         await Student.deleteOne({_id: studentId});
//     } catch (e) {
//         throw Error('Error.');
//     }
// }

export { getTasks, getTask, createTask , updateTask }
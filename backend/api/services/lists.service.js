import List from '../models/list.model.js';

import mongoose from 'mongoose';

const getLists = async () => {
    try {
        return await List.find();
    } catch (e) {
        throw Error('Error while fetching list.');
    }
}


const getList = async (listId) => {
    try {
        return await List.findOne({ _id: listId });
    } catch (e) {
        throw Error('Error.');
    }
}


const createList = async (listToCreate) => {
    try {
        const newList = new List(listToCreate)
        await newList.save()
        return getLists();
    } catch (e) {
        console.log(e);
        throw Error('Error.');
    }
}



const updateList = async (listToUpdate) => {
    try {
        await List.findOneAndUpdate({_id:listToUpdate},{name:name},{tasks:tasks});
        return getList(listToUpdate);
    } catch (e) {
        console.log(e)
        throw Error('Error.');
    }
}


const deleteList = async (listId) => {
    try {
        await List.deleteOne({ _id: listId });
    } catch (e) {
        console.log(e);
        throw Error('Error.');

    }
}

export { getLists, getList, createList, updateList, deleteList }
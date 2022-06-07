import * as ListsService from "../services/lists.service.js";

export const getLists = async (req, res) => {
    try {
        const lists = await ListsService.getLists();
        return res.status(200).json(lists);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

export const getList = async (req, res) => {
    try {
        const listId = req.params.listId;

        const list = await ListsService.getList(listId);
        return res.status(200).json(list);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

export const createList = async (req, res) => {
    try {
        const listToCreate = req.body;

        const lists = await ListsService.createList(listToCreate);
        return res.status(200).json({ status: 200, data: lists, message: "Succesfully Lists Retrieved" });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ status: 400, message: e.message });
    }
}

export const updateList = async (req, res) => {
    try {
        //const listUpdated = await ListsService.updateList(req.body);
        const listId = await req.params.listId;
        const newList = req.body;
        const listUpdated = await ListsService.updateList(listId, newList);

        return res.status(200).json(listUpdated);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ status: 400, message: e.message });
    }
};



export const deleteList = async (req, res) => {
    try {
        const { listId } = req.params;
        console.log(listId)
        await ListsService.deleteList(listId);
        return res.status(200).json({ status: 204, message: `list with id ${listId} succesfully deleted` });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
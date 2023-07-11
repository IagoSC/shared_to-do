import { api } from ".";
import { TaskType } from "../types/TaskType";


type ICreateTask = {
    title: string,
    description: string,
    groupId: string
}
export async function createTask(token: string, {title, description, groupId}: ICreateTask): Promise<TaskType> {
    return api.post(`/tasks`, {
        task: {
            title,
            description,
            groupId
        },
    }, {headers: {Authorization: token}})
    .then(res => res.data)
    .catch(err => {
        console.error(err);
        return null
    })
}

type IUpdateTask = {
    id: string
    title: string,
    groupId: string,
    description: string,
}
export async function updateTask(token: string, {id, title, description, groupId}: IUpdateTask): Promise<TaskType> {
    return api.patch(`/tasks/${id}`, {
        task: {
            title,
            description,
            groupId
        },
    }, {headers: {Authorization: token}})
    .then(res => res.data)
    .catch(err => {
        console.error(err);
        return null
    })
}

type IFinishTask = {
    id: string,
    isFinished: boolean
}
export async function completeTask(token: string, {id, isFinished}: IFinishTask): Promise<TaskType> {
    return api.put(`/tasks/${id}`, {
        isFinished
    }, {headers: {Authorization: token}})
    .then(res => res.data)
    .catch(err => {
        console.error(err);
        return null
    })
}

export async function deleteTask(token: string, id: string): Promise<void> {
    return api.delete(`/tasks/${id}`, {headers: {Authorization: token}})
}


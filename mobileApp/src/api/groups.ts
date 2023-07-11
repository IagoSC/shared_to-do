import { GroupType } from "../types/GroupType";
import { api } from ".";

export async function getAllGroups(token: string): Promise<GroupType[]> {
    return api.get(`/groups/`, {
        headers: {
            Authorization: token
        }
    }).then(res => {
        return res.data.groups
    })
    .catch(err => {
        console.error(JSON.stringify(err));
        return []
    })
}

type ICreateGroup = {
    name: string,
    description: string,
    usersEmails: string[]
}
export async function createGroup(token: string, {name, description, usersEmails}: ICreateGroup): Promise<GroupType> {
    return api.post(`/groups`, {
        group: {
            name,
            description,
        },
        users: usersEmails || []
    }, {headers: {Authorization: token}})
    .then(res => res.data)
    .catch(err => {
        console.error(err);
        return null
    })
}

type IUpdateGroup = {
    id: string,
    name: string,
    description: string,
    usersEmails: string[]
}
export async function updateGroup(token: string, {id, name, description, usersEmails}: IUpdateGroup): Promise<GroupType> {
    return api.patch(`/groups/${id}`, {
        group: {
            name,
            description,
        },
        users: usersEmails || []
    }, {headers: {Authorization: token}})
    .then(res => res.data)
    .catch(err => {
        console.error(err);
        return null
    })

}

export async function deleteGroup(token: string, id: string): Promise<void> {
    return api.delete(`/groups/${id}`, {headers: {Authorization: token}})
}


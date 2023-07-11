import { PropsWithChildren, createContext, useState } from "react";
import { GroupType } from "../types/GroupType";
import { getAllGroups } from "../api/groups";

type IGroupsContext = {
    groups: GroupType[]
    refreshContext: (token: string) => void
    setGroups: (groups: GroupType[]) => void
}

const InitialState: IGroupsContext = {
    groups: [],
    refreshContext: (token: string) => {},
    setGroups: () => {},
}

export const GroupsContext = createContext<IGroupsContext>(InitialState)

export function GroupsProvider(props: PropsWithChildren<{}>){
    const [groups, setGroups] = useState<GroupType[]>(InitialState.groups)

    async function refreshContext(token: string) {
        const groups = await getAllGroups(token)
        setGroups(groups || [])
    }

    return (
        <GroupsContext.Provider value={{groups, refreshContext, setGroups}}>
            {props.children}
        </GroupsContext.Provider>
    )
}
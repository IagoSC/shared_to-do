import { TaskType } from "./TaskType"

export type GroupType = {
    id: string,
    name: string,
    description: string,
    tasks: TaskType[]
}
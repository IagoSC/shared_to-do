import { PropsWithChildren } from "react"
import { TaskType } from "../../../types/TaskType";
import { TaskCard } from "../../organisms/TaskCard";
import { View, Text } from "react-native"
import { styles } from "./styles";

type TaskListProps = PropsWithChildren<{
    tasks: TaskType[]
}>

export function TaskList({tasks}: TaskListProps): JSX.Element {

    return (
        tasks.length === 0 ?
        <View style={styles.card}>
            <Text style={{alignSelf: "center", fontSize: 25, fontWeight: "bold"}}>{"No tasks in this group :("}</Text>
        </View>
        :
        <>
            {tasks.map(task => (
                <TaskCard
                    key={`task-${task.id}`}
                    task={task}
                />
            ))}
        </>
    )
}
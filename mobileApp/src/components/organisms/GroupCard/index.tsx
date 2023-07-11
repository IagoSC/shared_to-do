import { PropsWithChildren, useState } from "react";
import { styles } from "./styles";
import { View } from "react-native";
import { GroupType } from "../../../types/GroupType";
import { GroupBar } from "../../molecules/GroupBar";
import { TaskList } from "../../molecules/TaskList";
import { useNavigation } from '@react-navigation/native';
import { RootStackProps } from "../../../../App";

type GroupCardProps = PropsWithChildren<{
    color: string,
    group: GroupType
}>;


export function GroupCard({color, group}: GroupCardProps): JSX.Element {
    const [isExpanded, setIsExpanded]  = useState<boolean>(true)

    const navigation = useNavigation<RootStackProps>()

    function editGroup() {
        navigation.navigate("FormScreen", {
            entity: "group",
            event: "update",
            values: group
        })
    }

    function expandGroup() {
        setIsExpanded(oldState => !oldState)
    }

    const tasks = group.tasks || []

    return (
        <View style={[styles.CardContainer]}>
            <GroupBar
                color={color}
                editGroup={editGroup}
                expandGroup={expandGroup}
                group={group}
                isExpanded={isExpanded}
            />
            <View style={{flex: 1}}>
                {isExpanded && 
                    <TaskList
                        tasks={tasks}
                    />
                }
            </View> 
        </View>
    )
}


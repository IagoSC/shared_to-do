import { Button, ColorValue, Text, View } from "react-native";
import { styles } from "./styles";
import { PropsWithChildren, useContext, useState} from "react";
import { deleteTask as apiDeleteTask, completeTask } from "../../../api/tasks";
import { CurrentUserContext } from "../../../providers/CurrentUserProvider";
import { GroupsContext } from "../../../providers/GroupsProvider";
import { IconButton } from "../../atoms/IconButton/IconButton";
import { useNavigation } from "@react-navigation/native";
import { RootStackProps } from "../../../../App";

type TaskType = {
    id: string
    title: string
    description: string
    isFinished: boolean
}
  
type TaskCardProps = PropsWithChildren<{task: TaskType}>;


export function TaskCard({task}: TaskCardProps): JSX.Element {
    const {userToken} = useContext(CurrentUserContext);
    const {refreshContext} = useContext(GroupsContext);
    const [isFinished, setIsFinished] = useState<boolean>(task.isFinished)

    const navigation = useNavigation<RootStackProps>()
    function confirmTask(){
      setIsFinished(currState => {
        completeTask(userToken!, {id: task.id, isFinished: !currState})
        return !currState
      })
    }
    
    async function deleteTask(){
      try{
        await apiDeleteTask(userToken!, task.id)
        refreshContext(userToken!)
      }catch(err){
      }
    }

    function navigateTaskCreation(){
      navigation.navigate("FormScreen", {
        entity: "task",
        event: "update",
        values: task
      })
    }
    
    return (
      <View style={styles.cardContainer}>
        <IconButton 
          name={isFinished? "radiobox-marked" : "radiobox-blank"}
          size={25}
          onPress={confirmTask}
        />
        <View style={styles.textSection}>
          <Text
            style={styles.title}>
            {task.title}
          </Text>
          <Text
            style={styles.description}>
            {task.description}
          </Text>
        </View>
        <View style={styles.actionsSection}>
            <IconButton 
              name='trash-can'
              size={25}
              onPress={deleteTask}
            />
            <IconButton
              name="square-edit-outline"
              size={25}
              onPress={navigateTaskCreation}
            />
        </View>
      </View>
    );
}
  
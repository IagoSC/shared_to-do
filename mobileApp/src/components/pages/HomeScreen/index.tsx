import React, {useEffect, useState, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text
} from 'react-native';
import { getAllGroups } from '../../../api/groups';
import { GroupType } from '../../../types/GroupType';
import { GroupCard } from '../../organisms/GroupCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, RootStackProps } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import { CurrentUserContext } from '../../../providers/CurrentUserProvider';
import { AppButton } from '../../atoms/AppButton';
import { GroupsContext } from '../../../providers/GroupsProvider';
import { IconButton } from '../../atoms/IconButton/IconButton';
import { LoginScreen } from '../LoginScreen';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen(props: HomeProps): JSX.Element {
    const {user, userToken, cleanUpContext} = useContext(CurrentUserContext);
    const {groups, refreshContext} = useContext(GroupsContext);
    const navigation = useNavigation<RootStackProps>()


    async function loadPage(){
      try{
        if(!userToken) throw Error("No user assigned")
        refreshContext(userToken)
      }catch(err){
        navigation.navigate("Login")
      }
    }

    useEffect(() => {
      loadPage()
    }, [])

    function navigateGroupCreation(){
      navigation.navigate("FormScreen", {
        entity: "group",
        event: "create",
        values: {}
      })
    }
    
    function navigateTaskCreation(){
      navigation.navigate("FormScreen", {
        entity: "task",
        event: "create",
        values: {}
      })
    }

    function signOut(){
      cleanUpContext()
      navigation.navigate("Login")
    }

    function Header(){
      return (
        <View
          style={{flex: 1, width: "100%", height: 100}}
        >
          <IconButton
            size={25}
            name="exit-run"
            onPress={signOut}
          />
          <Text>{user?.email}</Text>
        </View>
      )
    }

    return (
        <SafeAreaView
          style={{flex: 1}}
        >
            <ScrollView
              StickyHeaderComponent={Header}
              contentInsetAdjustmentBehavior="automatic">
              {groups.map((group, idx) => (
                <GroupCard
                    group={group}
                    key={`group-${idx}`}
                    color={"#0FF"}
                />
              ))}
            </ScrollView>
            <View style={{width: "100%", justifyContent: "space-around", flexDirection: "row", alignSelf: "flex-end", backgroundColor: "#aaa", paddingVertical: 10}}>
              <AppButton
                style={{width: "30%"}}
                title="New Group"
                onPress={navigateGroupCreation}
              />
              <AppButton
                style={{width: "60%", backgroundColor: "#7fffd4", borderColor: ""}}
                title="New Task"
                onPress={navigateTaskCreation}
              />
            </View>
        </SafeAreaView>
    )
}
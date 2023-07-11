import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  View,
  Text
} from 'react-native';
import { RootStackProps } from '../../../../App';
import { userSignIn, userSignUp } from '../../../api/user';
import { CurrentUserContext } from '../../../providers/CurrentUserProvider';
import { LabeledTextInput } from '../../atoms/LabeledTextInput';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

export function LoginScreen(): JSX.Element {
    const {userToken, setUser, setUserToken} = useContext(CurrentUserContext);

    const [loading, setLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>()
    
    const navigation = useNavigation<RootStackProps>()

    useEffect(() => {
      cleanUp()
      if(userToken)
        navigation.navigate("Home")
    }, [])
    
    function cleanUp(){
      setLoading(false)
      setEmail("")
    }

    async function signIn() {
      if(!email) return
      try{
        setLoading(true)
        const {token, ...result} = await userSignIn(email)
        console.log(token)
        setUser(result)
        setUserToken(token)
        await new Promise((resolve) => setTimeout(resolve, 500))
        navigation.navigate("Home")
      }catch(er){
      }finally{
        cleanUp()
      }
    }
    
    async function signUp(){
      if(!email) return
      try{
        setLoading(true)
        await userSignUp(email)
        await signIn()
      }catch(err){
      }finally{
        cleanUp()
      }
    }

    function onChangeText(value: string) {
      if(!loading) setEmail(value)
    }

    return (
      <View style={{justifyContent: "center", alignContent: "center", flex: 1, width: 300, alignSelf: "center"}}>

        <Text style={{fontSize: 40, fontWeight: "bold"}}>{"SHARED TO-DO"}</Text>
        <LabeledTextInput
          containerStyle={styles.TextInput}
          placeholder="Email"
          onChangeText={onChangeText}
        />
        {
          loading &&
          <Text style={styles.loading}>{"Loading..."}</Text>
        }

        <Button
          title='Login'
          onPress={signIn}
          disabled={loading}
        />
        <View style={{height: 10}}></View>
        <Button
          title='Create Account'
          onPress={signUp}
          disabled={loading}
        />
      </View>
    )
}
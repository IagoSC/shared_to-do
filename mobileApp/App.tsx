import React from 'react';
import { HomeScreen } from './src/components/pages/HomeScreen';
import { FormScreen } from './src/components/pages/FormScreen';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { FormValues } from './src/types/FormTypes';
import { LoginScreen } from './src/components/pages/LoginScreen';
import { AppProviders } from './src/providers/AppProviders';

export type RootStackParamList = {
  Login: undefined;
  Home: { refresh?: boolean } | undefined
  FormScreen: {
    entity: "group" | "task" | "alarm"
    event: "create" | "update"
    values: FormValues 
  }
}

 
export type RootStackProps = NativeStackNavigationProp<RootStackParamList>

function App(): JSX.Element {
  const Stack = createNativeStackNavigator<RootStackParamList>()
  return (
    <NavigationContainer>
      <AppProviders>
        <Stack.Navigator screenOptions={{header: () => <></>}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="FormScreen" component={FormScreen} />
        </Stack.Navigator>
      </AppProviders>
    </NavigationContainer>
  )
}


export default App;

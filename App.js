import React, {useContext} from 'react';
import {NavigationContainer, NavigationProvider} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import 'react-native-gesture-handler'

import HomeScreen from './screen/HomeScreen';
import ProfileScreen from './screen/ProfileScreen';
import LoginScreen from './screen/LoginScreen';
import CalendarScreen from './screen/CalendarScreen';
import NewTaskScreen from './screen/NewTaskScreen';
import RegisterScreen from './screen/RegisterScreen';
import SettingsScreen from './screen/SettingsScreen';
import Task1creen from './screen/Task1Screen';

import { AuthContext, AuthProvider } from './context/AuthContext';
import {TareaProvider} from './context/TareaContext';

const Stack = createNativeStackNavigator();


function Control(){
  const {usuario} = useContext(AuthContext);

  return(
    <Stack.Navigator>
      {usuario ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen}/>
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen}/>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (

    <AuthProvider>
      <TareaProvider>
        <NavigationContainer>
          <Control/>
        </NavigationContainer>
      </TareaProvider>
    </AuthProvider>
  );
}



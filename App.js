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
import Task1Screen from './screen/Task1Screen';
import ConfirmTaskScreen from './screen/ConfirmTaskScreen';
import ModifyTaskScreen from './screen/ModifyTaskScreen';
import DeleteTaskScreen from './screen/DeleteTaskScreen';
import ConfirmRegisterScreen from './screen/ConfirmRegisterScreen';
import UpdateProfileScreen from './screen/UpdateProfileScreen';
import DeleteUserScreen from './screen/DeleteUserScreen';

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
          <Stack.Screen name="Task1" component={Task1Screen}/>
          <Stack.Screen name="Calendar" component={CalendarScreen}/>
          <Stack.Screen name="NewTask" component={NewTaskScreen}/>
          <Stack.Screen name="ConfirmTask" component={ConfirmTaskScreen}/>
          <Stack.Screen name="Profile" component={ProfileScreen}/>           
          <Stack.Screen name="Settings" component={SettingsScreen}/>
          <Stack.Screen name="Modify" component={ModifyTaskScreen}/>
          <Stack.Screen name="DeleteTask" component={DeleteTaskScreen}/>
          <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen}/>
          <Stack.Screen name ="DeleteUser" component={DeleteUserScreen}/>
        </>
      ) : (
        <>       
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Register" component={RegisterScreen}/>
          <Stack.Screen name="ConfirmRegister" component={ConfirmRegisterScreen}/>
        </>       
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



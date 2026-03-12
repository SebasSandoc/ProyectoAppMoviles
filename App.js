import {NavigationContainer} from '@react-navigation/native'
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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Profile" component={ProfileScreen}/>
        <Stack.Screen name="Calendar" component={CalendarScreen}/>
        <Stack.Screen name="NewTask" component={NewTaskScreen}/>
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="Settings" component={SettingsScreen}/>
        <Stack.Screen name="Task1" component={Task1creen}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}



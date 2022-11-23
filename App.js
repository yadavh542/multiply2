import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import UserScreen from './screens/UserScreen';
import StepsScreen from './screens/StepsScreen';
import VideosScreen from './screens/VideosScreen';
import PlayVideo from './screens/PlayVideo';
import { Provider as PaperProvider } from 'react-native-paper';
import BottomMenu from './screens/BottomMenu';


const Stack = createNativeStackNavigator();



const App = () => {
  return (
    <PaperProvider >
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: 'AB Multiply' }}
        />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
         <Stack.Screen name="User" component={UserScreen} options={{headerLeft: () => <></>,}}/>
         {/*  */}
        <Stack.Screen name="Steps" component={StepsScreen} />  
        <Stack.Screen name="Videos" component={VideosScreen} /> 
        <Stack.Screen name="Play" component={PlayVideo} />
        <Stack.Screen name="Menu" component={BottomMenu} />

      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  )
}

export default App
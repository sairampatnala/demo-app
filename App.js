import React from 'react';
import { Button, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from "./src/MainScreen";
import ProfileScreen from "./src/ProfileScreen"
import { UserContext } from "./UserContext"
import { useState } from "react"
import Colors from "./src/Utils/Colors"

const Stack = createStackNavigator();
const App = () => {

  const [user, setUser] = useState(null)

  return (
    <NavigationContainer>
      <UserContext.Provider value={[user, setUser]}>
        <Stack.Navigator initialRouteName="User">
          <Stack.Screen name="User" component={MainScreen} options={{
            title: 'User Details',
            headerStyle: {
              backgroundColor: Colors.primaryColor,
            },
            headerTintColor: Colors.secondaryColor,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{
            title: 'Profile Settings', headerStyle: {
              backgroundColor: Colors.primaryColor,
            },
            headerTintColor: Colors.secondaryColor,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
}

export default App;


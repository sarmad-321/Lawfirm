// app/navigation/AppNavigator.tsx

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AuthNavigator from './AuthNavigator';
import LawyerTabs from './Tabs/LawyerTabs';
import AddDocuments from '../screens/homescreens/createScreens/AddDocuments';
import AddNote from '../screens/homescreens/createScreens/AddNote';
import AddEvent from '../screens/homescreens/createScreens/AddEvent';
import AddTask from '../screens/homescreens/createScreens/AddTask';
import AddLogs from '../screens/homescreens/createScreens/AddLogs';

const MainStack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="AuthStack" component={AuthNavigator} />
        <MainStack.Screen name="LawyerTabs" component={LawyerTabs} />
        <MainStack.Screen name="AddDocuments" component={AddDocuments} />
        <MainStack.Screen name="AddNotes" component={AddNote} />
        <MainStack.Screen name="AddEvent" component={AddEvent} />
        <MainStack.Screen name="AddTask" component={AddTask} />
        <MainStack.Screen name="AddLogs" component={AddLogs} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

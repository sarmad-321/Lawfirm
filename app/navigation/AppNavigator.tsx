// app/navigation/AppNavigator.tsx

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AuthNavigator from './AuthNavigator';
import LawyerTabs from './Tabs/LawyerTabs';

const MainStack = createNativeStackNavigator();

export default function AppNavigator() {
  // const user = useSelector((state: RootState) => state.auth.user);

  // if (!user) return <AuthNavigator />;

  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="AuthStack" component={AuthNavigator} />
        <MainStack.Screen name="LawyerTabs" component={LawyerTabs} />
        {/* Add other screens here as needed */}
        {/* <MainStack.Screen name="SomeOtherScreen" component={SomeOtherComponent} /> */}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

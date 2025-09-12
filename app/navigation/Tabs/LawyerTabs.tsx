import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Activities from '../../screens/homescreens/activities/index';
import BillsScreen from '../../screens/homescreens/bills';
import Calendar from '../../screens/homescreens/calendar';
import HomeScreen from '../../screens/homescreens/home';
import SearchScreen from '../../screens/homescreens/search';
import TaskScreen from '../../screens/homescreens/tasks';
import { colors, fontSize, spacing } from '../../utils/theme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MatterDetail from '../../screens/homescreens/home/MatterDetail';
import TaskDetails from '../../screens/homescreens/tasks/TaskDetails';
import EventDetail from '../../screens/homescreens/calendar/EventDetail';
import SettingsScreen from '../../screens/homescreens/settings';
import MatterActivities from '../../screens/homescreens/home/MatterActivities';
import MatterNotes from '../../screens/homescreens/home/MatterNotes';
import CommLogs from '../../screens/homescreens/home/CommLogs';
import CalendarEvents from '../../screens/homescreens/home/CalendarEvents';
import EditMenu from '../../screens/homescreens/settings/EditMenu';
import MatterBills from '../../screens/homescreens/home/MatterBills';
import BillsDetails from '../../screens/homescreens/bills/BillsDetails';
import MatterDocuments from '../../screens/homescreens/home/MatterDocuments';
import EditMatterTime from '../../screens/homescreens/home/EditMatterTime';
import EditTimeEntries from '../../screens/homescreens/activities/EditTimeEntries';
import NewExpense from '../../screens/homescreens/activities/NewExpense';
import AddDocuments from '../../screens/homescreens/createScreens/AddDocuments';
import Customization from '../../screens/homescreens/customization';
import Security from '../../screens/homescreens/settings/Security';
import EnterPin from '../../screens/homescreens/settings/EnterPin';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="MatterDetail" component={MatterDetail} />
      <HomeStack.Screen name="Settings" component={SettingsStackScreen} />
      <HomeStack.Screen name="MatterActivities" component={Activities} />
      <HomeStack.Screen name="EditMatterTime" component={EditMatterTime} />
      <HomeStack.Screen name="MatterNotes" component={MatterNotes} />
      <HomeStack.Screen name="CommLogs" component={CommLogs} />
      <HomeStack.Screen name="MatterEvents" component={CalendarEvents} />
      <HomeStack.Screen name="EditMenu" component={EditMenu} />
      <HomeStack.Screen name="MatterBills" component={MatterBills} />
      <HomeStack.Screen name="MatterDocuments" component={MatterDocuments} />
      <HomeStack.Screen name="EditTimeEntries" component={EditTimeEntries} />
      <HomeStack.Screen name="MatterTasks" component={TaskStackScreen} />
    </HomeStack.Navigator>
  );
};

const SettingsStackScreen = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{ headerShown: false }}
    >
      <HomeStack.Screen name="SettingsScreen" component={SettingsScreen} />
      <HomeStack.Screen name="Customization" component={Customization} />
      <HomeStack.Screen name="Security" component={Security} />
      <HomeStack.Screen name="EnterPin" component={EnterPin} />
    </HomeStack.Navigator>
  );
};

const TaskStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="TaskScreen" component={TaskScreen} />
      <HomeStack.Screen name="TaskDetails" component={TaskDetails} />
    </HomeStack.Navigator>
  );
};

const BillsStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="BillsScreen" component={BillsScreen} />
      <HomeStack.Screen name="BillsDetails" component={BillsDetails} />
    </HomeStack.Navigator>
  );
};

const CalendarStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="CalendarScreen" component={Calendar} />
      <HomeStack.Screen name="EventDetail" component={EventDetail} />
    </HomeStack.Navigator>
  );
};

const ActivitiesStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="ActivityScreen" component={Activities} />
      <HomeStack.Screen name="EditTimeEntries" component={EditTimeEntries} />
      <HomeStack.Screen name="AddNewExpense" component={NewExpense} />
    </HomeStack.Navigator>
  );
};

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const CustomTabBar = ({ state, descriptors, navigation }: TabBarProps) => {
  const insets = useSafeAreaInsets();

  const tabIcons = {
    Home: 'home',
    Calendar: 'calendar',
    Activities: 'time',
    Tasks: 'list',
    Bills: 'receipt',
    Search: 'search',
  };

  return (
    <View style={[styles.tabBarContainer, { paddingBottom: insets.bottom }]}>
      <View style={styles.tabBar}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : route.name;
          const isFocused = state.index === index;
          const iconName = tabIcons[route.name as keyof typeof tabIcons];

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
              activeOpacity={0.7}
            >
              <View style={styles.tabIconContainer}>
                <Icon
                  name={iconName}
                  size={22}
                  color={isFocused ? colors.tabActive : colors.tabInactive}
                />
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  { color: isFocused ? colors.tabActive : colors.tabInactive },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default function LawyerTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarStackScreen}
        options={{
          tabBarLabel: 'Calendar',
        }}
      />
      <Tab.Screen
        name="Activities"
        component={ActivitiesStackScreen}
        options={{
          tabBarLabel: 'Activities',
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TaskStackScreen}
        options={{
          tabBarLabel: 'Tasks',
        }}
      />
      <Tab.Screen
        name="Bills"
        component={BillsStackScreen}
        options={{
          tabBarLabel: 'Bills',
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: colors.tabBackground,
    borderTopWidth: 1,
    borderTopColor: colors.tabBorder,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.tabBackground,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    minHeight: 60,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs + 2,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  tabLabel: {
    fontSize: fontSize.xs,
    fontWeight: '500',
    textAlign: 'center',
  },
});

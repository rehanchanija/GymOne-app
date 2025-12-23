import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors} from '../theme';
import {Text} from 'react-native';
import Dashboard from '../screens/user/Dashboard';
import WorkoutPlans from '../screens/user/WorkoutPlans';
import ExerciseLibrary from '../screens/user/ExerciseLibrary';
import ProgressTracking from '../screens/user/ProgressTracking';
import ChatUser from '../screens/user/ChatUser';
import Profile from '../screens/user/Profile';

const Tab = createBottomTabNavigator();

export default function UserNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.accentGreen,
        tabBarInactiveTintColor: colors.muted,
        tabBarIcon: ({color}) => {
          const map: Record<string, string> = {
            Dashboard: '🏠',
            WorkoutPlans: '📋',
            ExerciseLibrary: '📚',
            ProgressTracking: '📈',
            ChatUser: '💬',
            Profile: '👤',
          };
          return <Text style={{color, fontSize: 18}}>{map[route.name]}</Text>;
        },
      })}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="WorkoutPlans" component={WorkoutPlans} />
      <Tab.Screen name="ExerciseLibrary" component={ExerciseLibrary} />
      <Tab.Screen name="ProgressTracking" component={ProgressTracking} />
      <Tab.Screen name="ChatUser" component={ChatUser} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

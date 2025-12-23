import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors} from '../theme';
import {Text} from 'react-native';
import AdminDashboard from '../screens/admin/AdminDashboard';
import MemberManagement from '../screens/admin/MemberManagement';
import WorkoutManagement from '../screens/admin/WorkoutManagement';
import ExerciseManagement from '../screens/admin/ExerciseManagement';
import MemberProgress from '../screens/admin/MemberProgress';
import ChatAdmin from '../screens/admin/ChatAdmin';
const Tab = createBottomTabNavigator();

export default function AdminNavigator() {
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
            AdminDashboard: '📊',
            MemberManagement: '👥',
            WorkoutManagement: '🏋️',
            ExerciseManagement: '💪',
            MemberProgress: '📈',
            ChatAdmin: '💬',
          };
          return <Text style={{color, fontSize: 18}}>{map[route.name]}</Text>;
        },
      })}>
      <Tab.Screen name="AdminDashboard" component={AdminDashboard} />
      <Tab.Screen name="MemberManagement" component={MemberManagement} />
      <Tab.Screen name="WorkoutManagement" component={WorkoutManagement} />
      <Tab.Screen name="ExerciseManagement" component={ExerciseManagement} />
      <Tab.Screen name="MemberProgress" component={MemberProgress} />
      <Tab.Screen name="ChatAdmin" component={ChatAdmin} />
    </Tab.Navigator>
  );
}

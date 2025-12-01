import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/auth/LoginScreen';
import AdminDashboardScreen from '../screens/admin/DashboardScreen';
import { useAuth } from '../contexts/AuthContext';
import AddMemberScreen from '../screens/admin/AddMemberScreen';
import ExpensesScreen from '../screens/admin/ExpensesScreen';
import PaymentsScreen from '../screens/admin/PaymentsScreen';
import WorkoutAdminScreen from '../screens/admin/WorkoutAdminScreen';
import AnnouncementsUploadScreen from '../screens/admin/AnnouncementsUploadScreen';
import AccessControlScreen from '../screens/admin/AccessControlScreen';
import HomeScreen from '../screens/member/HomeScreen';
import ProfileScreen from '../screens/member/ProfileScreen';
import AttendanceScreen from '../screens/member/AttendanceScreen';
import WorkoutScreen from '../screens/member/WorkoutScreen';
import AnnouncementsScreen from '../screens/member/AnnouncementsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AdminTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AdminDashboard" component={AdminDashboardScreen} options={{ title: 'Dashboard' }} />
      <Tab.Screen name="AddMember" component={AddMemberScreen} options={{ title: 'Add Member' }} />
      <Tab.Screen name="Expenses" component={ExpensesScreen} options={{ title: 'Expenses' }} />
      <Tab.Screen name="Payments" component={PaymentsScreen} options={{ title: 'Payments' }} />

      <Tab.Screen name="WorkoutAdmin" component={WorkoutAdminScreen} options={{ title: 'Workout' }} />
      <Tab.Screen name="AnnouncementsUpload" component={AnnouncementsUploadScreen} options={{ title: 'Announcements' }} />
      <Tab.Screen name="AccessControl" component={AccessControlScreen} options={{ title: 'Access' }} />
    </Tab.Navigator>
  );
}

function MemberTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Attendance" component={AttendanceScreen} />
      <Tab.Screen name="Workout" component={WorkoutScreen} />
      <Tab.Screen name="Announcements" component={AnnouncementsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { state } = useAuth();
  if (!state.isAuthenticated) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }
  if (state.role === 'admin') return <AdminTabs />;
  return <MemberTabs />;
}
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AdminNavigator from './AdminNavigator';
import UserNavigator from './UserNavigator';
import {useAuth} from '../context/auth.context';
import LoadingOverlay from '../components/common/LoadingOverlay';
import LoginScreen from '../screens/auth/LoginScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const {token, role, loading} = useAuth();
  if (loading) {
    return <LoadingOverlay />;
  }
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!token ? (
        <Stack.Screen name="Auth" component={LoginScreen} />
      ) : role === 'admin' ? (
        <Stack.Screen name="Admin" component={AdminNavigator} />
      ) : (
        <Stack.Screen name="User" component={UserNavigator} />
      )}
    </Stack.Navigator>
  );
}

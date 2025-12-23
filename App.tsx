import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {AuthProvider} from './src/context/auth.context';
import RootNavigator from './src/navigation/RootNavigator';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <AuthProvider>
        <NavigationContainer theme={DarkTheme}>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;

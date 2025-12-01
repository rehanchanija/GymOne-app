import React, { useState } from 'react';
import { Alert, View, StyleSheet, Text } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      await login(username, password);
    } catch {
      Alert.alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GymOne</Text>
      <Input label="Username" value={username} onChangeText={setUsername} placeholder="Enter username" />
      <Input label="Password" value={password} onChangeText={setPassword} placeholder="Enter password" secureTextEntry />
      <Button title={loading ? 'Loading...' : 'Login'} onPress={onSubmit} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16, textAlign: 'center' },
});
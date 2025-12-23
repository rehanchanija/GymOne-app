import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import {useAuth} from '../../context/auth.context';

export default function LoginScreen() {
  const {login} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-background px-4 justify-center gap-4">
      <Text className="text-text text-2xl font-bold text-center">GymOne</Text>
      <Input value={email} onChangeText={setEmail} placeholder="Email" />
      <Input
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      {error ? <Text className="text-accent-orange">{error}</Text> : null}
      <Button
        title={loading ? 'Loading...' : 'Login'}
        onPress={onSubmit}
        disabled={loading || !email || !password}
      />
    </View>
  );
}

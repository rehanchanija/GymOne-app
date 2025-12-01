import React, { useState } from 'react';
import { View, StyleSheet, Alert, FlatList, Text } from 'react-native';
import { useQuery, useMutation } from '@tanstack/react-query';
import { adminApi } from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Card from '../../components/Card';

export default function AccessControlScreen() {
  const { data } = useQuery({ queryKey: ['members'], queryFn: adminApi.members });
  const [memberId, setMemberId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const mutation = useMutation({
    mutationFn: () => adminApi.grantAccess({ memberId, username, password }),
    onSuccess: () => {
      Alert.alert('Access granted');
      setMemberId('');
      setUsername('');
      setPassword('');
    },
    onError: () => Alert.alert('Error'),
  });
  return (
    <View style={styles.container}>
      <Input label="Member ID" value={memberId} onChangeText={setMemberId} />
      <Input label="Username" value={username} onChangeText={setUsername} />
      <Input label="Password" value={password} onChangeText={setPassword} />
      <Button title={mutation.isPending ? 'Saving...' : 'Grant Access'} onPress={() => mutation.mutate()} />
      <FlatList
        data={data || []}
        keyExtractor={(item: any) => String(item.id)}
        renderItem={({ item }) => (
          <Card style={{ marginVertical: 6 }}>
            <Text>{item.name}</Text>
            <Text>{item.id}</Text>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
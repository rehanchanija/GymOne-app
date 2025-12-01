import React, { useState } from 'react';
import { View, StyleSheet, Alert, FlatList, Text } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Loader from '../../components/Loader';

export default function ExpensesScreen() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['expenses'], queryFn: adminApi.expenses });
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const mutation = useMutation({
    mutationFn: () => adminApi.addExpense({ title, amount: Number(amount), date }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['expenses'] });
      Alert.alert('Expense added');
      setTitle('');
      setAmount('');
      setDate('');
    },
    onError: () => Alert.alert('Error'),
  });

  return (
    <View style={styles.container}>
      <Input label="Title" value={title} onChangeText={setTitle} />
      <Input label="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />
      <Input label="Date" value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" />
      <Button title={mutation.isPending ? 'Saving...' : 'Add Expense'} onPress={() => mutation.mutate()} />
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={data || []}
          keyExtractor={(item: any) => String(item.id)}
          renderItem={({ item }) => (
            <Card style={{ marginVertical: 6 }}>
              <Text>{item.title}</Text>
              <Text>{item.amount}</Text>
              <Text>{item.date}</Text>
            </Card>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
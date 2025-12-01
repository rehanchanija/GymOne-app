import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function PaymentsScreen() {
  const qc = useQueryClient();
  const [memberId, setMemberId] = useState('');
  const [amount, setAmount] = useState('');

  const mutation = useMutation({
    mutationFn: () => adminApi.addPayment({ memberId, amount: Number(amount) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['payments'] });
      Alert.alert('Payment saved');
      setMemberId('');
      setAmount('');
    },
    onError: () => Alert.alert('Error'),
  });

  return (
    <View style={styles.container}>
      <Input label="Member ID" value={memberId} onChangeText={setMemberId} />
      <Input label="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />
      <Button title={mutation.isPending ? 'Saving...' : 'Save Payment'} onPress={() => mutation.mutate()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
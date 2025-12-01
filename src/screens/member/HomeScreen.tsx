import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { memberApi } from '../../services/api';
import { remainingDays } from '../../utils/date';
import Card from '../../components/Card';

export default function HomeScreen() {
  const { data } = useQuery({ queryKey: ['member-me'], queryFn: memberApi.me });
  const endDate = data?.membershipEndDate || new Date().toISOString();
  const days = remainingDays(endDate);
  const alertColor = days < 7 ? '#dc2626' : '#111827';
  return (
    <View style={styles.container}>
      <Card style={{ marginBottom: 12 }}><Text>End Date: {endDate?.slice(0, 10)}</Text></Card>
      <Card style={{ marginBottom: 12 }}><Text>Remaining Days: {days}</Text></Card>
      <Card style={{ marginBottom: 12 }}><Text>Plan: {data?.planType || 'N/A'}</Text></Card>
      <Text style={[styles.alert, { color: alertColor }]}>{days < 7 ? 'Expiring soon' : ''}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  alert: { fontSize: 16, fontWeight: '700' },
});
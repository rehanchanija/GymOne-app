import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../../services/api';
import Card from '../../components/Card';
import Skeleton from '../../components/Skeleton';

export default function DashboardScreen() {
  const { data, isLoading } = useQuery({ queryKey: ['admin-dashboard'], queryFn: adminApi.dashboard });

  if (isLoading)
    return (
      <View style={styles.container}>
        <Skeleton style={{ height: 100, marginBottom: 12 }} />
        <Skeleton style={{ height: 100, marginBottom: 12 }} />
      </View>
    );

  return (
    <View style={styles.container}>
      <Card style={styles.card}><Text>Total Members: {data?.totalMembers ?? 0}</Text></Card>
      <Card style={styles.card}><Text>Active Plans: {data?.activePlans ?? 0}</Text></Card>
      <Card style={styles.card}><Text>Total Expenses: {data?.totalExpenses ?? 0}</Text></Card>
      <Card style={styles.card}><Text>Expiring Soon: {Array.isArray(data?.expiringSoon) ? data.expiringSoon.length : 0}</Text></Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { marginBottom: 12 },
});
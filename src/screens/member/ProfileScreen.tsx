import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { memberApi } from '../../services/api';
import Card from '../../components/Card';

export default function ProfileScreen() {
  const { data } = useQuery({ queryKey: ['member-me'], queryFn: memberApi.me });
  return (
    <View style={styles.container}>
      <Card style={{ marginBottom: 12 }}><Text>Name: {data?.name}</Text></Card>
      <Card style={{ marginBottom: 12 }}><Text>Phone: {data?.phone}</Text></Card>
      <Card style={{ marginBottom: 12 }}><Text>Age: {data?.age}</Text></Card>
      <Card style={{ marginBottom: 12 }}><Text>Gender: {data?.gender}</Text></Card>
      <Card style={{ marginBottom: 12 }}><Text>Plan: {data?.planType}</Text></Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
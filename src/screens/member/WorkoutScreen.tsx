import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useQuery, useMutation } from '@tanstack/react-query';
import { memberApi } from '../../services/api';
import Button from '../../components/Button';
import Card from '../../components/Card';

export default function WorkoutScreen() {
  const { data } = useQuery({ queryKey: ['member-workouts'], queryFn: memberApi.workouts });
  const [selected, setSelected] = useState<string[]>([]);
  const mutation = useMutation({ mutationFn: () => memberApi.saveCustomWorkout({ exercises: selected }) });
  const toggle = (id: string) => {
    setSelected(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Default Plan</Text>
      <FlatList
        data={data?.default || []}
        keyExtractor={(item: any) => String(item.id)}
        renderItem={({ item }) => (
          <Card style={{ marginVertical: 6 }}>
            <Text>{item.name}</Text>
          </Card>
        )}
      />
      <Text style={styles.title}>Custom Plan</Text>
      <FlatList
        data={data?.exercises || []}
        keyExtractor={(item: any) => String(item.id)}
        renderItem={({ item }) => (
          <Card style={{ marginVertical: 6 }}>
            <Text onPress={() => toggle(String(item.id))}>{selected.includes(String(item.id)) ? '✓ ' : ''}{item.name}</Text>
          </Card>
        )}
      />
      <Button title={mutation.isPending ? 'Saving...' : 'Save Custom Plan'} onPress={() => mutation.mutate()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, fontWeight: '700', marginTop: 12 },
});
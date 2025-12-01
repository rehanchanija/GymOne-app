import React, { useState } from 'react';
import { View, StyleSheet, Alert, FlatList, Text } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Card from '../../components/Card';

export default function WorkoutAdminScreen() {
  const qc = useQueryClient();
  const { data: exercises } = useQuery({ queryKey: ['exercises'], queryFn: adminApi.exercises });
  const { data: plans } = useQuery({ queryKey: ['workout-plans'], queryFn: adminApi.workoutPlans });
  const [name, setName] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const addExerciseMutation = useMutation({
    mutationFn: () => adminApi.addExercise({ name, videoUrl }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['exercises'] });
      Alert.alert('Exercise added');
      setName('');
      setVideoUrl('');
    },
    onError: () => Alert.alert('Error'),
  });
  const [planName, setPlanName] = useState('');
  const [days, setDays] = useState('{}');
  const createPlanMutation = useMutation({
    mutationFn: () => adminApi.createWorkoutPlan({ name: planName, days: JSON.parse(days || '{}') }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['workout-plans'] });
      Alert.alert('Plan created');
      setPlanName('');
      setDays('{}');
    },
    onError: () => Alert.alert('Error'),
  });
  return (
    <View style={styles.container}>
      <Input label="Exercise Name" value={name} onChangeText={setName} />
      <Input label="Video URL" value={videoUrl} onChangeText={setVideoUrl} />
      <Button title={addExerciseMutation.isPending ? 'Saving...' : 'Add Exercise'} onPress={() => addExerciseMutation.mutate()} />
      <Input label="Plan Name" value={planName} onChangeText={setPlanName} />
      <Input label="Days JSON" value={days} onChangeText={setDays} />
      <Button title={createPlanMutation.isPending ? 'Saving...' : 'Create Plan'} onPress={() => createPlanMutation.mutate()} />
      <FlatList
        data={exercises || []}
        keyExtractor={(item: any) => String(item.id)}
        renderItem={({ item }) => (
          <Card style={{ marginVertical: 6 }}>
            <Text>{item.name}</Text>
            <Text>{item.videoUrl}</Text>
          </Card>
        )}
      />
      <FlatList
        data={plans || []}
        keyExtractor={(item: any) => String(item.id)}
        renderItem={({ item }) => (
          <Card style={{ marginVertical: 6 }}>
            <Text>{item.name}</Text>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
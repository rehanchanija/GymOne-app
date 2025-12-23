import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, Pressable} from 'react-native';
import Card from '../../components/common/Card';
import {completeWorkout, getUserWorkouts} from '../../api/endpoints';

type Workout = {
  id: string;
  name: string;
  exercises: {name: string; reps: number; durationMin: number}[];
  assignedAt: string;
  completed: boolean;
};

export default function WorkoutPlans() {
  const [items, setItems] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const r = await getUserWorkouts().catch(() => []);
      setItems(r);
      setLoading(false);
    };
    run();
  }, []);

  const onComplete = async (id: string) => {
    await completeWorkout(id).catch(() => {});
    setItems(s => s.map(w => (w.id === id ? {...w, completed: true} : w)));
  };

  return (
    <ScrollView className="flex-1 bg-background p-4">
      {loading ? <Text className="text-muted">Loading...</Text> : null}
      {items.map(w => (
        <Card key={w.id}>
          <Text className="text-text text-lg font-semibold">{w.name}</Text>
          <View className="mt-2 gap-1">
            {w.exercises.map((e, i) => (
              <Text
                key={i}
                className="text-muted">{`${e.name} · ${e.reps} reps · ${e.durationMin}m`}</Text>
            ))}
          </View>
          <View className="mt-3 flex-row justify-between items-center">
            <Text className="text-muted">Assigned</Text>
            <Text className="text-text">
              {new Date(w.assignedAt).toLocaleDateString()}
            </Text>
          </View>
          <Pressable
            className={`mt-3 rounded-xl py-2 px-3 ${
              w.completed ? 'bg-card' : 'bg-accent-green'
            }`}
            disabled={w.completed}
            onPress={() => onComplete(w.id)}>
            <Text
              className={
                w.completed
                  ? 'text-muted text-center'
                  : 'text-black text-center font-semibold'
              }>
              {w.completed ? 'Completed' : 'Mark Completed'}
            </Text>
          </Pressable>
        </Card>
      ))}
    </ScrollView>
  );
}

import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, TextInput, Pressable} from 'react-native';
import Card from '../../components/common/Card';
import {createExercise, getExercisesAdmin} from '../../api/endpoints';

type Exercise = {id: string; name: string; muscle: string};

export default function ExerciseManagement() {
  const [items, setItems] = useState<Exercise[]>([]);
  const [name, setName] = useState('');
  const [muscle, setMuscle] = useState('');
  const [difficulty, setDifficulty] = useState('');

  useEffect(() => {
    const run = async () => {
      const r = await getExercisesAdmin().catch(() => []);
      setItems(r);
    };
    run();
  }, []);

  const onCreate = async () => {
    await createExercise({name, muscle, difficulty}).catch(() => {});
    setName('');
    setMuscle('');
    setDifficulty('');
    const r = await getExercisesAdmin().catch(() => []);
    setItems(r);
  };

  return (
    <ScrollView className="flex-1 bg-background p-4">
      <Card>
        <Text className="text-text text-lg font-semibold">Create Exercise</Text>
        <View className="mt-3 gap-2">
          <TextInput
            className="bg-card rounded-xl px-3 py-2 text-text border border-[#1f2430]"
            placeholder="Name"
            placeholderTextColor="#9ca3af"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            className="bg-card rounded-xl px-3 py-2 text-text border border-[#1f2430]"
            placeholder="Muscle"
            placeholderTextColor="#9ca3af"
            value={muscle}
            onChangeText={setMuscle}
          />
          <TextInput
            className="bg-card rounded-xl px-3 py-2 text-text border border-[#1f2430]"
            placeholder="Difficulty"
            placeholderTextColor="#9ca3af"
            value={difficulty}
            onChangeText={setDifficulty}
          />
          <Pressable
            className="bg-accent-green rounded-xl py-3"
            onPress={onCreate}>
            <Text className="text-black text-center font-semibold">Create</Text>
          </Pressable>
        </View>
      </Card>
      <View className="mt-6 gap-3">
        {items.map(e => (
          <Card key={e.id}>
            <Text className="text-text font-semibold">{e.name}</Text>
            <Text className="text-muted">{e.muscle}</Text>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

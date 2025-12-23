import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, TextInput, Pressable} from 'react-native';
import Card from '../../components/common/Card';
import {
  assignWorkout,
  createWorkout,
  getMembers,
  getWorkoutsAdmin,
} from '../../api/endpoints';

type Workout = {id: string; name: string; exercises: number};
type Member = {id: string; name: string};

export default function WorkoutManagement() {
  const [items, setItems] = useState<Workout[]>([]);
  const [name, setName] = useState('');
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const run = async () => {
      const w = await getWorkoutsAdmin().catch(() => []);
      setItems(w);
      const m = await getMembers().catch(() => []);
      setMembers(m.map(x => ({id: x.id, name: x.name})));
    };
    run();
  }, []);

  const onCreate = async () => {
    await createWorkout({name, exercises: []}).catch(() => {});
    setName('');
    const w = await getWorkoutsAdmin().catch(() => []);
    setItems(w);
  };

  const onAssign = async (workoutId: string) => {
    if (!selectedMember) {
      return;
    }
    await assignWorkout(workoutId, selectedMember).catch(() => {});
  };

  return (
    <ScrollView className="flex-1 bg-background p-4">
      <Card>
        <Text className="text-text text-lg font-semibold">Create Workout</Text>
        <View className="mt-3 gap-2">
          <TextInput
            className="bg-card rounded-xl px-3 py-2 text-text border border-[#1f2430]"
            placeholder="Name"
            placeholderTextColor="#9ca3af"
            value={name}
            onChangeText={setName}
          />
          <Pressable
            className="bg-accent-green rounded-xl py-3"
            onPress={onCreate}>
            <Text className="text-black text-center font-semibold">Create</Text>
          </Pressable>
        </View>
      </Card>
      <View className="mt-6 gap-3">
        <Card>
          <Text className="text-text font-semibold mb-2">Select Member</Text>
          <View className="flex-row flex-wrap gap-2">
            {members.map(m => (
              <Pressable
                key={m.id}
                className={`rounded-xl px-3 py-2 ${
                  selectedMember === m.id ? 'bg-accent-green' : 'bg-card'
                }`}
                onPress={() => setSelectedMember(m.id)}>
                <Text
                  className={
                    selectedMember === m.id ? 'text-black' : 'text-text'
                  }>
                  {m.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </Card>
        {items.map(w => (
          <Card key={w.id}>
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-text font-semibold">{w.name}</Text>
                <Text className="text-muted">{w.exercises} exercises</Text>
              </View>
              <Pressable
                className="bg-accent-orange rounded-xl px-3 py-2"
                onPress={() => onAssign(w.id)}
                disabled={!selectedMember}>
                <Text className="text-black font-semibold">Assign</Text>
              </Pressable>
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

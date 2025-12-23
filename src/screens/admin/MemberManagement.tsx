import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, TextInput, Pressable} from 'react-native';
import Card from '@/components/common/Card';
import {createMember, deactivateMember, getMembers} from '@/api/endpoints';

type Member = {id: string; name: string; email: string; active: boolean};

export default function MemberManagement() {
  const [items, setItems] = useState<Member[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const run = async () => {
      const r = await getMembers().catch(() => []);
      setItems(r);
    };
    run();
  }, []);

  const onCreate = async () => {
    await createMember(name, email, password).catch(() => {});
    setName('');
    setEmail('');
    setPassword('');
    const r = await getMembers().catch(() => []);
    setItems(r);
  };

  const onDeactivate = async (id: string) => {
    await deactivateMember(id).catch(() => {});
    setItems(s => s.map(m => (m.id === id ? {...m, active: false} : m)));
  };

  return (
    <ScrollView className="flex-1 bg-background p-4">
      <Card>
        <Text className="text-text text-lg font-semibold">Create Member</Text>
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
            placeholder="Email"
            placeholderTextColor="#9ca3af"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TextInput
            className="bg-card rounded-xl px-3 py-2 text-text border border-[#1f2430]"
            placeholder="Password"
            placeholderTextColor="#9ca3af"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Pressable
            className="bg-accent-green rounded-xl py-3"
            onPress={onCreate}>
            <Text className="text-black text-center font-semibold">Create</Text>
          </Pressable>
        </View>
      </Card>
      <View className="mt-6 gap-3">
        {items.map(m => (
          <Card key={m.id}>
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-text font-semibold">{m.name}</Text>
                <Text className="text-muted">{m.email}</Text>
              </View>
              <Pressable
                className={`rounded-xl px-3 py-2 ${
                  m.active ? 'bg-accent-orange' : 'bg-card'
                }`}
                onPress={() => onDeactivate(m.id)}
                disabled={!m.active}>
                <Text
                  className={
                    m.active ? 'text-black font-semibold' : 'text-muted'
                  }>
                  {m.active ? 'Deactivate' : 'Inactive'}
                </Text>
              </Pressable>
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

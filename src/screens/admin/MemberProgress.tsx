import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, Pressable} from 'react-native';
import Card from '../../components/common/Card';
import {getMemberProgress, getMembers} from '../../api/endpoints';
import ChartLine from '../../components/charts/ChartLine';
import {formatShort} from '../../utils/date';

type Member = {id: string; name: string};

export default function MemberProgress() {
  const [members, setMembers] = useState<Member[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [data, setData] = useState<{
    weight: {date: string; value: number}[];
    calories: {date: string; value: number}[];
  } | null>(null);

  useEffect(() => {
    const run = async () => {
      const m = await getMembers().catch(() => []);
      setMembers(m.map(x => ({id: x.id, name: x.name})));
    };
    run();
  }, []);

  useEffect(() => {
    const run = async () => {
      if (!selected) {
        return;
      }
      const r = await getMemberProgress(selected).catch(() => null);
      setData(r);
    };
    run();
  }, [selected]);

  const mk = (arr?: {date: string; value: number}[]) =>
    (arr || []).map(d => ({x: formatShort(d.date), y: d.value}));

  return (
    <ScrollView className="flex-1 bg-background p-4">
      <Card>
        <Text className="text-text font-semibold mb-2">Select Member</Text>
        <View className="flex-row flex-wrap gap-2">
          {members.map(m => (
            <Pressable
              key={m.id}
              className={`rounded-xl px-3 py-2 ${
                selected === m.id ? 'bg-accent-green' : 'bg-card'
              }`}
              onPress={() => setSelected(m.id)}>
              <Text className={selected === m.id ? 'text-black' : 'text-text'}>
                {m.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </Card>
      {selected ? (
        <View className="mt-6">
          <Text className="text-text text-xl font-semibold mb-2">Weight</Text>
          <Card>
            {data ? (
              <ChartLine data={mk(data.weight)} />
            ) : (
              <Text className="text-muted">Loading...</Text>
            )}
          </Card>
          <Text className="text-text text-xl font-semibold mt-6 mb-2">
            Calories
          </Text>
          <Card>
            {data ? (
              <ChartLine data={mk(data.calories)} />
            ) : (
              <Text className="text-muted">Loading...</Text>
            )}
          </Card>
        </View>
      ) : null}
    </ScrollView>
  );
}

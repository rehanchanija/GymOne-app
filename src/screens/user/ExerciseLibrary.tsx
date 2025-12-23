import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text} from 'react-native';
import Card from '../../components/common/Card';
import {getExerciseLibrary} from '../../api/endpoints';

type Item = {
  id: string;
  name: string;
  muscle: string;
  difficulty: string;
  imageUrl?: string;
  instructions?: string;
};

export default function ExerciseLibrary() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const run = async () => {
      const r = await getExerciseLibrary().catch(() => []);
      setItems(r);
    };
    run();
  }, []);

  return (
    <ScrollView className="flex-1 bg-background p-4">
      {items.map(i => (
        <Card key={i.id}>
          <Text className="text-text text-lg font-semibold">{i.name}</Text>
          <Text className="text-muted">{`${i.muscle} · ${i.difficulty}`}</Text>
          {i.imageUrl ? (
            <Image
              source={{uri: i.imageUrl}}
              style={{height: 160, borderRadius: 12, marginTop: 12}}
            />
          ) : null}
          {i.instructions ? (
            <Text className="text-text mt-2">{i.instructions}</Text>
          ) : null}
        </Card>
      ))}
    </ScrollView>
  );
}

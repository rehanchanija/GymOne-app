import React, {useEffect, useState} from 'react';
import {ScrollView, Text} from 'react-native';
import Card from '@/components/common/Card';
import {getUserProgress} from '@/api/endpoints';
import ChartLine from '@/components/charts/ChartLine';
import {formatShort} from '@/utils/date';

export default function ProgressTracking() {
  const [data, setData] = useState<{
    weight: {date: string; value: number}[];
    calories: {date: string; value: number}[];
    steps: {date: string; value: number}[];
  } | null>(null);

  useEffect(() => {
    const run = async () => {
      const r = await getUserProgress().catch(() => null);
      setData(r);
    };
    run();
  }, []);

  const mk = (arr?: {date: string; value: number}[]) =>
    (arr || []).map(d => ({x: formatShort(d.date), y: d.value}));

  return (
    <ScrollView className="flex-1 bg-background p-4">
      <Text className="text-text text-xl font-semibold mb-3">Weight</Text>
      <Card>
        {data ? (
          <ChartLine data={mk(data.weight)} />
        ) : (
          <Text className="text-muted">Loading...</Text>
        )}
      </Card>
      <Text className="text-text text-xl font-semibold mt-6 mb-3">
        Calories
      </Text>
      <Card>
        {data ? (
          <ChartLine data={mk(data.calories)} />
        ) : (
          <Text className="text-muted">Loading...</Text>
        )}
      </Card>
      <Text className="text-text text-xl font-semibold mt-6 mb-3">Steps</Text>
      <Card>
        {data ? (
          <ChartLine data={mk(data.steps)} />
        ) : (
          <Text className="text-muted">Loading...</Text>
        )}
      </Card>
    </ScrollView>
  );
}

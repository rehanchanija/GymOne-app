import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import Card from '../../components/common/Card';
import {getUserDashboard} from '../../api/endpoints';
import ChartLine from '../../components/charts/ChartLine';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    calories: number;
    steps: number;
    durationMin: number;
    week: {day: string; value: number}[];
  } | null>(null);

  useEffect(() => {
    const run = async () => {
      const r = await getUserDashboard().catch(() => null);
      setData(r);
      setLoading(false);
    };
    run();
  }, []);

  const chartData = (data?.week || []).map(d => ({x: d.day, y: d.value}));

  return (
    <ScrollView className="flex-1 bg-background p-4">
      <Text className="text-text text-xl font-semibold mb-4">Today</Text>
      <View className="flex-row gap-4">
        <Card>
          <Text className="text-muted">Calories</Text>
          <Text className="text-text text-2xl font-bold">
            {data?.calories ?? 0}
          </Text>
        </Card>
        <Card>
          <Text className="text-muted">Steps</Text>
          <Text className="text-text text-2xl font-bold">
            {data?.steps ?? 0}
          </Text>
        </Card>
        <Card>
          <Text className="text-muted">Duration</Text>
          <Text className="text-text text-2xl font-bold">
            {data?.durationMin ?? 0}m
          </Text>
        </Card>
      </View>
      <Text className="text-text text-xl font-semibold mt-6 mb-2">
        Weekly Progress
      </Text>
      <Card>
        {loading ? (
          <Text className="text-muted">Loading...</Text>
        ) : (
          <ChartLine data={chartData} />
        )}
      </Card>
    </ScrollView>
  );
}

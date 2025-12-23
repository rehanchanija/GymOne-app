import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import Card from '@/components/common/Card';
import {getAdminDashboard} from '@/api/endpoints';
import ChartLine from '@/components/charts/ChartLine';

export default function AdminDashboard() {
  const [data, setData] = useState<{
    totalMembers: number;
    activeUsers: number;
    completionRate: number;
  } | null>(null);
  useEffect(() => {
    const run = async () => {
      const r = await getAdminDashboard().catch(() => null);
      setData(r);
    };
    run();
  }, []);

  return (
    <ScrollView className="flex-1 bg-background p-4">
      <View className="flex-row gap-4">
        <Card>
          <Text className="text-muted">Members</Text>
          <Text className="text-text text-2xl font-bold">
            {data?.totalMembers ?? 0}
          </Text>
        </Card>
        <Card>
          <Text className="text-muted">Active</Text>
          <Text className="text-text text-2xl font-bold">
            {data?.activeUsers ?? 0}
          </Text>
        </Card>
        <Card>
          <Text className="text-muted">Completion</Text>
          <Text className="text-text text-2xl font-bold">
            {Math.round((data?.completionRate ?? 0) * 100)}%
          </Text>
        </Card>
      </View>
      <Text className="text-text text-xl font-semibold mt-6 mb-2">
        Activity
      </Text>
      <Card>
        <ChartLine
          data={[
            {x: 1, y: 2},
            {x: 2, y: 4},
            {x: 3, y: 3},
          ]}
        />
      </Card>
    </ScrollView>
  );
}

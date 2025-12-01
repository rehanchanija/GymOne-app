import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { memberApi } from '../../services/api';
import Card from '../../components/Card';

export default function AnnouncementsScreen() {
  const { data } = useQuery({ queryKey: ['member-announcements'], queryFn: memberApi.announcements });
  return (
    <View style={styles.container}>
      <FlatList
        data={data || []}
        keyExtractor={(item: any) => String(item.id)}
        renderItem={({ item }) => (
          <Card style={{ marginVertical: 6 }}>
            <Text>{item.type}</Text>
            <Text>{item.content}</Text>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
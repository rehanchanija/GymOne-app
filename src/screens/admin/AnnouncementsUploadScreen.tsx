import React, { useState } from 'react';
import { View, StyleSheet, Alert, FlatList, Text } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Card from '../../components/Card';

export default function AnnouncementsUploadScreen() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ['admin-announcements'], queryFn: adminApi.announcements });
  const [type, setType] = useState<'video' | 'message'>('message');
  const [content, setContent] = useState('');
  const mutation = useMutation({
    mutationFn: () => adminApi.addAnnouncement({ type, content }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-announcements'] });
      Alert.alert('Announcement saved');
      setContent('');
    },
    onError: () => Alert.alert('Error'),
  });
  return (
    <View style={styles.container}>
      <Input label="Type (video/message)" value={type} onChangeText={t => setType(t === 'video' ? 'video' : 'message')} />
      <Input label="Content" value={content} onChangeText={setContent} />
      <Button title={mutation.isPending ? 'Saving...' : 'Upload'} onPress={() => mutation.mutate()} />
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
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { memberApi } from '../../services/api';
import Button from '../../components/Button';
import { Calendar } from 'react-native-calendars';

export default function AttendanceScreen() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ['attendance'], queryFn: memberApi.attendance });
  const today = new Date().toISOString().slice(0, 10);
  const marked = (data || []).reduce((acc: any, d: string) => ({ ...acc, [d]: { selected: true } }), {});
  const alreadyMarked = !!marked[today];
  const mutation = useMutation({
    mutationFn: memberApi.markAttendance,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['attendance'] }),
  });
  return (
    <View style={styles.container}>
      <Button title={alreadyMarked ? "Today's Attendance Marked" : "Mark Today's Attendance"} onPress={() => mutation.mutate()} disabled={alreadyMarked || mutation.isPending} />
      <Calendar markedDates={marked} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
import React from 'react';
import {Text, View} from 'react-native';

export default function EmptyState({title}: {title: string}) {
  return (
    <View className="items-center justify-center py-10">
      <Text className="text-muted">{title}</Text>
    </View>
  );
}

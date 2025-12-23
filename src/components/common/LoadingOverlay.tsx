import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {colors} from '@/theme';

export default function LoadingOverlay() {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator color={colors.accentGreen} />
    </View>
  );
}

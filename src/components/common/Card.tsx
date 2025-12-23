import React from 'react';
import {View} from 'react-native';

export default function Card({children}: {children: React.ReactNode}) {
  return (
    <View className="bg-card rounded-xl p-4 border border-[#1f2430]">
      {children}
    </View>
  );
}

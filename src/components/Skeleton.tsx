import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';

export default function Skeleton({ style }: { style?: ViewStyle }) {
  const opacity = useRef(new Animated.Value(0.4)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 800, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);
  return <Animated.View style={[{ backgroundColor: '#e5e7eb', borderRadius: 8 }, style, { opacity }]} />;
}
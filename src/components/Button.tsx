import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
};

export default function Button({ title, onPress, style, disabled }: Props) {
  return (
    <TouchableOpacity style={[styles.btn, disabled && styles.disabled, style]} onPress={onPress} disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#111827',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  text: { color: '#fff', fontSize: 16, fontWeight: '600' },
  disabled: { opacity: 0.6 },
});
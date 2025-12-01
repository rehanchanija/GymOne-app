import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

type Props = {
  label?: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
};

export default function Input({ label, value, onChangeText, placeholder, secureTextEntry, keyboardType = 'default' }: Props) {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  label: { marginBottom: 6, fontSize: 14 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});
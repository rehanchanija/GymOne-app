import React from 'react';
import {TextInput} from 'react-native';

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
};

export default function Input({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
}: Props) {
  return (
    <TextInput
      className="bg-card rounded-xl px-4 py-3 text-text border border-[#1f2430]"
      placeholder={placeholder}
      placeholderTextColor="#9ca3af"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
    />
  );
}

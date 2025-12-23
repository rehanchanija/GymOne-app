import React from 'react';
import {Pressable, Text} from 'react-native';

type Props = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
};

export default function Button({
  title,
  onPress,
  disabled,
  variant = 'primary',
}: Props) {
  const base =
    'rounded-xl py-3 px-4 items-center justify-center ' +
    (disabled ? 'opacity-50 ' : '');
  const cls =
    variant === 'primary' ? base + 'bg-accent-green' : base + 'bg-card';
  const textCls =
    variant === 'primary'
      ? 'text-black font-semibold'
      : 'text-text font-semibold';
  return (
    <Pressable className={cls} onPress={onPress} disabled={disabled}>
      <Text className={textCls}>{title}</Text>
    </Pressable>
  );
}

import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
});
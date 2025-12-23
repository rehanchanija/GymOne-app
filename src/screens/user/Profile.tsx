import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import {useAuth} from '../../context/auth.context';

export default function Profile() {
  const {logout} = useAuth();
  return (
    <ScrollView className="flex-1 bg-background p-4">
      <Card>
        <View className="gap-2">
          <Text className="text-text text-lg font-semibold">Profile</Text>
          <Text className="text-muted">Email</Text>
          <Text className="text-text">member@gymone.app</Text>
        </View>
      </Card>
      <View className="mt-6">
        <Button title="Logout" variant="secondary" onPress={logout} />
      </View>
    </ScrollView>
  );
}

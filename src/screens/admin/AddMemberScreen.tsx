import React, { useState } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { adminApi } from '../../services/api';

export default function AddMemberScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [planType, setPlanType] = useState('');
  const [loading, setLoading] = useState(false);

  const onSave = async () => {
    try {
      setLoading(true);
      await adminApi.addMember({ name, phone, age: Number(age), gender, planType });
      Alert.alert('Member added');
      setName('');
      setPhone('');
      setAge('');
      setGender('');
      setPlanType('');
    } catch {
      Alert.alert('Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Input label="Name" value={name} onChangeText={setName} />
      <Input label="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <Input label="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
      <Input label="Gender" value={gender} onChangeText={setGender} />
      <Input label="Plan Type" value={planType} onChangeText={setPlanType} />
      <Button title={loading ? 'Saving...' : 'Save'} onPress={onSave} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
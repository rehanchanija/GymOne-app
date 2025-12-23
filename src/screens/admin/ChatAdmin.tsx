import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, TextInput, Pressable} from 'react-native';
import Card from '../../components/common/Card';
import {getGroupMessages, sendGroupMessage} from '../../api/endpoints';
import {formatTime} from '../../utils/date';

type Msg = {id: string; text: string; sender: string; createdAt: string};

export default function ChatAdmin() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const run = async () => {
      const r = await getGroupMessages().catch(() => []);
      setMsgs(r);
    };
    run();
  }, []);

  const onSend = async () => {
    if (!text.trim()) {
      return;
    }
    await sendGroupMessage(text).catch(() => {});
    setText('');
    const r = await getGroupMessages().catch(() => []);
    setMsgs(r);
  };

  return (
    <ScrollView className="flex-1 bg-background p-4">
      <Card>
        <View className="gap-3">
          {msgs.map(m => (
            <View key={m.id} className="gap-1">
              <Text className="text-muted">{`${m.sender} · ${formatTime(
                m.createdAt,
              )}`}</Text>
              <Text className="text-text">{m.text}</Text>
            </View>
          ))}
          {msgs.length === 0 ? (
            <Text className="text-muted">No messages</Text>
          ) : null}
        </View>
        <View className="mt-3 flex-row items-center gap-2">
          <TextInput
            className="flex-1 bg-card rounded-xl px-3 py-2 text-text border border-[#1f2430]"
            placeholder="Type a message"
            placeholderTextColor="#9ca3af"
            value={text}
            onChangeText={setText}
          />
          <Pressable
            className="bg-accent-green rounded-xl px-3 py-2"
            onPress={onSend}>
            <Text className="text-black font-semibold">Send</Text>
          </Pressable>
        </View>
      </Card>
    </ScrollView>
  );
}

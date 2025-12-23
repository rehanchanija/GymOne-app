import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import Card from '../../components/common/Card';
import {getGroupMessages, getPrivateMessages} from '../../api/endpoints';
import {formatTime} from '../../utils/date';

type Msg = {id: string; text: string; sender: string; createdAt: string};

export default function ChatUser() {
  const [groupMsgs, setGroupMsgs] = useState<Msg[]>([]);
  const [privateMsgs, setPrivateMsgs] = useState<Msg[]>([]);

  useEffect(() => {
    const run = async () => {
      const g = await getGroupMessages().catch(() => []);
      setGroupMsgs(g);
      const p = await getPrivateMessages('me').catch(() => []);
      setPrivateMsgs(p);
    };
    run();
  }, []);

  return (
    <ScrollView className="flex-1 bg-background p-4">
      <Text className="text-text text-xl font-semibold mb-2">Group</Text>
      <Card>
        <View className="gap-3">
          {groupMsgs.map(m => (
            <View key={m.id} className="gap-1">
              <Text className="text-muted">{`${m.sender} · ${formatTime(
                m.createdAt,
              )}`}</Text>
              <Text className="text-text">{m.text}</Text>
            </View>
          ))}
          {groupMsgs.length === 0 ? (
            <Text className="text-muted">No messages</Text>
          ) : null}
        </View>
        <Text className="text-muted mt-3">Input disabled</Text>
      </Card>

      <Text className="text-text text-xl font-semibold mt-6 mb-2">Private</Text>
      <Card>
        <View className="gap-3">
          {privateMsgs.map(m => (
            <View key={m.id} className="gap-1">
              <Text className="text-muted">{`${m.sender} · ${formatTime(
                m.createdAt,
              )}`}</Text>
              <Text className="text-text">{m.text}</Text>
            </View>
          ))}
          {privateMsgs.length === 0 ? (
            <Text className="text-muted">No messages</Text>
          ) : null}
        </View>
      </Card>
    </ScrollView>
  );
}

import React, {useEffect} from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import PushNotification from 'react-native-push-notification';

export default function App() {
  useEffect(() => {
    createChannels();
  }, []);

  const cities = [
    {
      country: 'United States',
      city: 'New York',
    },
    {
      country: 'Australia',
      city: 'Sydney',
    },
    {
      country: 'Germany',
      city: 'Berlin',
    },
    {
      country: 'France',
      city: 'Paris',
    },
  ];

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  };

  const handleNotification = (item, index) => {
    PushNotification.cancelAllLocalNotifications();

    PushNotification.localNotification({
      channelId: 'test-channel',
      title: 'You clicked on ' + item.country,
      message: item.city,
      // displayed when notification is expanded
      bigText:
        item.city +
        ' is one of the largest and most beautiful city in ' +
        item.country,
      color: 'purple',
      id: index,
    });

    // To display notification at a specific time
    PushNotification.localNotificationSchedule({
      channelId: 'test-channel',
      title: 'Alarm',
      message: 'You clicked on ' + item.country + ' 20 seconds ago',
      date: new Date(Date.now() + 20 * 1000), // 20 seconds after notification
      allowWhileIdle: true, // displayed when device is idle
    });
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 40, margin: 10}}>Welcome</Text>
      <FlatList
        data={cities}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              handleNotification(item, index);
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                borderWidth: 2,
                borderColor: '#ccc',
                borderRadius: 5,
                margin: 7,
                width: 350,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 30, margin: 10, fontWeight: '700'}}>
                {item.country}
              </Text>
              <Text style={{fontSize: 20, margin: 10, color: '#999'}}>
                {item.city}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

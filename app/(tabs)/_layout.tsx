import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/Ionicons";
export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Yêu thích',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="recents"
        options={{
          title: 'Gần đây',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" color={color} size={size} />
          ),
        }}

      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: 'Danh bạ',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
        }}
      />
     <Tabs.Screen
        name="dialpad"
        options={{
          title: 'Bàn phím',
          tabBarIcon: ({ color, size }) => (
            <Icon name="apps" color={color} size={size} />
          ),
        }}
      />
      
    </Tabs>
  );
}

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function CallingScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const phoneNumber = route.params?.number || 'Đang gọi...';

  return (
    <View style={styles.container}>
      <Ionicons name="person-circle" size={100} color="#f28c28" />

      <Text style={styles.calling}>Đang gọi điện qua SIM1</Text>
      <Text style={styles.phone}>{phoneNumber}</Text>
      <Text style={styles.country}>Việt Nam</Text>

      <View style={styles.actions}>
        <View style={styles.row}>
          <ActionButton icon="apps" label="Bàn phím" />
          <ActionButton icon="microphone-off" label="Tắt tiếng" />
          <ActionButton icon="volume-high" label="Loa" />
          <ActionButton icon="ellipsis-vertica" label="Thêm" />
        </View>
      </View>

      <TouchableOpacity
        style={styles.endCallButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons name="phone-hangup" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const ActionButton = ({ icon, label }: { icon: any; label: string }) => (
  <View style={styles.actionItem}>
    <Ionicons name={icon} size={30} color="#555" />
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f9',
    alignItems: 'center',
    paddingTop: 80,
  },
  calling: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  phone: {
    fontSize: 28,
    fontWeight: '600',
    marginVertical: 10,
  },
  country: {
    fontSize: 16,
    color: '#777',
  },
  actions: {
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionItem: {
    alignItems: 'center',
  },
  label: {
    marginTop: 6,
    fontSize: 14,
    color: '#444',
  },
  endCallButton: {
    marginTop: 60,
    backgroundColor: '#e53935',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

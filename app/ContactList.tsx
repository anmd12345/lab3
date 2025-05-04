import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const contacts = [
  { id: '1', name: 'Nguyễn Văn A', phone: '0901234567' },
  { id: '2', name: 'Trần Thị B', phone: '0912345678' },
  { id: '3', name: 'Lê Văn C', phone: '0923456789' },
];

export default function ContactsList() {
  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.phone}>{item.phone}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  item: { marginBottom: 16, borderBottomWidth: 1, borderBottomColor: '#ccc', paddingBottom: 8 },
  name: { fontSize: 18, fontWeight: 'bold' },
  phone: { fontSize: 16, color: '#555' },
});

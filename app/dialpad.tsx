import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from "expo-router";

const keypad: [string, string][] = [
  ['1', ''], ['2', 'ABC'], ['3', 'DEF'],
  ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'],
  ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ'],
  ['*', ''], ['0', '+'], ['#', ''],
];

export default function DialpadScreen() {
  const [input, setInput] = useState('');
  const router = useRouter();

  const handlePress = (value: string) => {
    setInput(prev => prev + value);
  };

  const handleDelete = () => {
    setInput(prev => prev.slice(0, -1));
  };

  const renderKey = ([num, letters]: [string, string]) => (
    <TouchableOpacity key={num} style={styles.key} onPress={() => handlePress(num)}>
      <Text style={styles.number}>{num}</Text>
      <Text style={styles.letters}>{letters}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.input}>{input || ''}</Text>
        <TouchableOpacity onPress={handleDelete}>
          <Ionicons name="backspace" size={28} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={styles.pad}>
        {keypad.map((item, index) => renderKey(item))}
      </View>

      <TouchableOpacity style={[styles.callButton,  { backgroundColor: input ? '#1DB954' : '#d3d3d3' }]}  onPress={() => input && router.push({ pathname: "/call", params: { number: input } })}
        disabled={!input}>
        <Ionicons name="call" size={30} color="white" />
        <Text style={styles.callText}>Gọi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#f8f9fb',
  },
  display: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    paddingHorizontal: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    fontSize: 26,
    color: '#000',
  },
  pad: {
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  key: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    elevation: 2,
  },
  number: {
    fontSize: 28,
    color: '#000',
  },
  letters: {
    fontSize: 12,
    color: '#666',
  },
  callButton: {
    marginTop: 30,
    backgroundColor: '#1DB954',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 40,
  },
  callText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
});

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { Link, useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";

const mapContact = (user: any) => {
  const fullName = `${user.name.first} ${user.name.last}`;
  return {
    id: user.login.uuid,
    name: `${user.name.first} ${user.name.last}`,
    phone: user.phone,
    avatar: user.picture.thumbnail,
    initial: fullName.charAt(0),
  }
};

interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar: string;
}


export default function ContactsScreen() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCallPress = (phone: string) => {
    router.push({
      pathname: '/call',  
      params: { number: phone }, 
    });
  };
  const fetchContacts = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=100&seed=fullstackio');
      const data = await response.json();
      const mapped = data.results.map(mapContact);
      setContacts(mapped);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();
  const renderContact = ({ item }: any) => (
    <TouchableOpacity style={styles.contactRow} onPress={() => handleCallPress(item.phone)}>
    <TouchableOpacity onPress={() => router.push({ pathname: '/detail', params: { contact: JSON.stringify(item) } })}>
      <View style={[styles.avatar, { backgroundColor: getColor(item.initial) }]}>
        <Text style={styles.avatarText}>{item.initial}</Text>
      </View>
    </TouchableOpacity>
    <Text style={styles.contactName}>{item.name}</Text>
  </TouchableOpacity>
  );

   return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Tìm người liên hệ"
          style={styles.searchInput}
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery} // Cập nhật giá trị tìm kiếm
        />
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Icon name="ellipsis-vertical" size={20} color="#555" style={styles.moreIcon} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredContacts} // Hiển thị danh sách đã lọc
        keyExtractor={(item) => item.id}
        renderItem={renderContact}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity style={styles.dialpadButton} onPress={() => router.push("/dialpad")}>
        <Icon name="apps" size={24} color="#fff" />
      </TouchableOpacity>

      <Modal transparent visible={menuVisible} animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.menu}>
            <Text style={styles.menuItem}>
              <Link href="/(tabs)/recents">Nhật ký cuộc gọi</Link>
            </Text>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const getColor = (char: string) => {
  const colors = ["#FF69B4", "#00BFFF", "#FFA500", "#32CD32"];
  return colors[char.charCodeAt(0) % colors.length];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FA",
    width: "100%",
    position: "relative",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 20,
    paddingHorizontal: 10,
    margin: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#000",
  },
  moreIcon: {
    marginLeft: 8,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 70,
    paddingRight: 15,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  menu: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    width: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 10,
    fontSize: 16,
  },
  createContact: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  createContactText: {
    fontSize: 16,
    color: "#007AFF",
  },
  listContent: {
    paddingHorizontal: 16,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  contactName: { fontSize: 16 },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  navItem: { fontSize: 14, color: "#444" },
  activeNav: { color: "#007AFF", fontWeight: "bold" },
  dialpadButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: "#2E5C8A",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  item: { flexDirection: 'row', padding: 10, alignItems: 'center' },
  name: { fontSize: 16, fontWeight: 'bold' },
  phone: { color: 'gray' },
});

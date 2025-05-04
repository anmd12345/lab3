import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";

export default function ContactDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const contact = JSON.parse(params.contact as string);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <Icon name="person-add-outline" size={24} color="#444" />
          <Icon name="settings-outline" size={24} color="#444" />
        </View>
      </View>

      {/* Tag */}
      <View style={styles.tag}>
        <Icon name="call-outline" size={16} color="#1e88e5" />
        <Text style={styles.tagText}>Thông tin liên hệ lấy từ Điện thoại</Text>
      </View>

      {/* Avatar & Name */}
      <View style={styles.center}>
        {contact.avatar ? (
          <Image source={{ uri: contact.avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Icon name="person" size={60} color="#fff" />
          </View>
        )}
        <Text style={styles.phoneNumber}>{contact.phone}</Text>
      </View>

      {/* Action buttons */}
      <View style={styles.actionRow}>
        {[
          { icon: "call-outline", label: "Gọi" },
          { icon: "chatbox-ellipses-outline", label: "Nhắn tin" },
          { icon: "videocam-outline", label: "Video" },
          { icon: "search-outline", label: "Tra cứu" },
          { icon: "person-add-outline", label: "Thêm người liê." },
        ].map((btn, index) => (
          <TouchableOpacity key={index} style={styles.actionBtn} onPress={() => router.push({ pathname: "/call", params: { number: contact.phone } })}>
            <Icon name={btn.icon} size={24} color="#000" />
            <Text style={styles.actionLabel}>{btn.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Contact info */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Thông tin liên hệ</Text>
        <View style={styles.infoRow}>
          <Icon name="call-outline" size={20} color="#555" />
          <Text style={styles.infoText}>{contact.phone}</Text>
          <Icon name="videocam-outline" size={20} color="#555" style={{ marginLeft: 10 }} />
          <Icon name="chatbox-outline" size={20} color="#555" style={{ marginLeft: 10 }} />
        </View>
      </View>

      {/* Block option */}
      <View style={styles.blockRow}>
        <Icon name="remove-circle-outline" size={20} color="red" />
        <Text style={styles.blockText}>Chặn và báo vi phạm</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingTop: 20
  },
  tag: {
    backgroundColor: "#e0f0ff",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  tagText: { marginLeft: 6, color: "#1e88e5", fontSize: 13 },
  center: { alignItems: "center", marginVertical: 12 },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f4c430",
    justifyContent: "center",
    alignItems: "center",
  },
  phoneNumber: { fontSize: 22, fontWeight: "bold", marginTop: 8 },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  actionBtn: { alignItems: "center", flex: 1 },
  actionLabel: { fontSize: 12, marginTop: 4, textAlign: "center" },
  infoBox: {
    backgroundColor: "#e8f0fe",
    padding: 12,
    borderRadius: 10,
    marginBottom: 24,
  },
  infoTitle: { fontWeight: "bold", marginBottom: 6 },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoText: { marginLeft: 8, fontSize: 16, flex: 1 },
  blockRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  blockText: { color: "red", marginLeft: 8, fontWeight: "600" },
});

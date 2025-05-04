// ContactDetailsScreen.tsx
import { View, Text, StyleSheet } from 'react-native';

export default function ContactDetailsScreen({ route }: any) {
  const { contact } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin liên hệ</Text>
      <Text style={styles.info}>📞 Số điện thoại: {contact.phone}</Text>
      <Text style={styles.info}>👤 Họ tên: {contact.name}</Text>
      {/* Bạn có thể thêm các nút Gọi, Nhắn tin, Video như trong ảnh nếu muốn */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  info: {
    fontSize: 18,
    marginBottom: 10
  }
});

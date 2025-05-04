import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

interface Contact {
  image: string;
  name: string;
  phone: string;
}

interface ContactThumbnailProps {
  contact: Contact;
  onPress: () => void;
}

const ContactThumbnail: React.FC<ContactThumbnailProps> = ({ contact, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{ uri: contact.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.phone}>{contact.phone}</Text>
      </View>
      <Icon name="chevron-right" size={24} color="#000" />
    </TouchableOpacity>
  );
};

export default ContactThumbnail;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    phone: {
        fontSize: 14,
        color: '#555',
    },
})


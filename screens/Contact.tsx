import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { fetchContacts } from '@/utility/api';
import ContactListItem from '@/components/ContactListItem';


const keyExtractor = ({ phone }: { phone: string }) => phone;

const Contacts = () => {
    const [contacts, setContacts] = useState<{ name: string; phone: string; avatar: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchContacts()
            .then(contacts => {
                setContacts(contacts);
                setLoading(false);
                setError(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
                setError(true);
            });
    }, []);

    const contactsSorted = contacts.sort((a, b) => a.name.localeCompare(b.name));
    const renderContact = ({ item }: { item: { name: string; avatar: string; phone: string } }) => {
        const { name, avatar, phone } = item;
        return (<ContactListItem
            name={name}
            avatar={avatar}
            phone={phone}
            onPress={() => { }}></ContactListItem>)
    };

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator color="blue" size="large" />}
            {error && <Text>Error loading contacts</Text>}
            {!loading && !error && (
                <FlatList
                    data={contactsSorted}
                    keyExtractor={keyExtractor}
                    renderItem={renderContact}
                />
            )}
        </View>
    )
}

export default Contacts;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    }
});
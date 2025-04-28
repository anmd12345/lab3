import 'react-native-get-random-values'
import { v4 } from 'uuid';


interface Contact {
    name: { first: string; last: string };
    picture: { large: string };
    phone: string;
    cell: string;
    email: string;
}

const mapContact = (contact: Contact) => {
    const {
        name, picture, phone, cell, email } = contact;
    return {
        id: v4(),
        name: name.first + ' ' + name.last,
        picture: picture.large,
        phone,
        email,
        cell,
        favorite: Math.random() > 0.5
    };
};

const fetchContacts = async () =>{
    const response = await fetch('https://randomuser.me/api/?results=100&seed=fullstackio');
    const contactData = await response.json();
    return contactData.results.map(mapContact);
}

const fetchUserContact = async ()=>{
    const response = await fetch('https://randomuser.me/api/?seed=fullstackio');
    const userData = await response.json();
    return mapContact(userData.results[0]);
}

const fectRandomContact = async ()=>{
     const response = await fetch('https://randomuser.me/api/');
    const userData = await response.json();
    return mapContact(userData.results[0]);
}

export { fetchContacts, fetchUserContact, fectRandomContact };
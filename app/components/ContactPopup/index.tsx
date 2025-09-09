import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchComponent from '../SearchComponent'
import ListItem from '../ListItem';

let contacts = [
    { name: 'John Doe', email: 'john.doe@example.com' },
    { name: 'Jane Smith', email: 'jane.smith@example.com' }
];


const ContactPopup = () => {
    return (
        <View>
            <SearchComponent placeholder="Search all contacts..." />

            {
                contacts.map((item, index) => (
                    <ListItem key={index} title={item.name} subtitle={item.email} />
                ))
            }
        </View>
    )
}

export default ContactPopup

const styles = StyleSheet.create({})
import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchComponent from '../SearchComponent'
import ListItem from '../ListItem';

let methods = [
    { name: 'Hourly', id: '1' },
    { name: 'Flat Fee', id: '2' },
    { name: 'Retainer', id: '3' },
    { name: 'Contingency', id: '4' }
];


const BillingMethodPopup = () => {
    return (
        <View>
            <SearchComponent placeholder="Search billing methods..." />

            {
                methods.map((item, index) => (
                    <ListItem key={index} title={item.name} />
                ))
            }
        </View>
    )
}

export default BillingMethodPopup

const styles = StyleSheet.create({})
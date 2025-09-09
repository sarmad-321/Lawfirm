import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ListItem = ({ title, subtitle }) => {
    return (
        <TouchableOpacity
            style={styles.categoryItem}
            // onPress={() => handleCategorySelect(item)}
            activeOpacity={0.7}
        >
            <Text style={styles.categoryText}>{title}</Text>
            {subtitle && <Text style={styles.categoryText}>{subtitle}</Text>}
        </TouchableOpacity>
    )
}

export default ListItem

const styles = StyleSheet.create({
    categoryItem: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff1e',
    },
    categoryText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '400',
    },
})
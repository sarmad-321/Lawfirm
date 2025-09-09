import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../utils/theme';


const FormAddButton = ({
    onPress,
    label
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.addTimeRow}>
            <Icon name="circle-plus" color={colors.secondary} />
            <Text style={[styles.linkText, { marginLeft: 10 }]}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export default FormAddButton

const styles = StyleSheet.create({
    addTimeRow: {
        paddingVertical: 20,
        backgroundColor: colors.backgroundLight,
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    timeEntries: {
        paddingHorizontal: 16,
        backgroundColor: colors.backgroundLight,
        paddingTop: 10,
    },
    linkText: {
        color: '#2196f3',
        fontSize: 14,
        fontWeight: '500',
    },
})
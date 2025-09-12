import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { borderRadius, colors, fontSize, spacing } from '../../utils/theme';

const SearchComponent = ({ placeholder }) => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <View style={styles.searchContainer}>
            <Icon
                name="search-outline"
                size={20}
                color={colors.textSecondary}
                style={styles.searchIcon}
            />
            <TextInput
                style={styles.searchInput}
                placeholder={placeholder}
                placeholderTextColor={colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
        </View>

    )
}

export default SearchComponent

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.backgroundDark,
        borderRadius: borderRadius.lg,
        paddingHorizontal: spacing.md,
        marginVertical: spacing.lg,
    },
    searchIcon: {
        marginRight: spacing.sm,
    },
    searchInput: {
        flex: 1,
        color: colors.textPrimary,
        fontSize: fontSize.md,
    },
})
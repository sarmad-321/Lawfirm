import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import { colors } from '../../utils/theme';

const DocumentCategory = ({ onSelect, onCancel }) => {
  const [searchText, setSearchText] = useState('');

  const categories = [
    'Closings',
    'Communications',
    'Complaints',
    'Contracts',
    'Disclosures',
    'Forms',
    'Instructions',
    'Letters',
    'Motions',
    'Offers',
    'Opinions',
    'Orders',
  ];

  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleCategorySelect = category => {
    if (onSelect) {
      onSelect(category);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => handleCategorySelect(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2a2a2a" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Select document category</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search document categories..."
            placeholderTextColor="#888888"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Categories List */}
      <View style={styles.listContainer}>
        <FlatList
          data={filteredCategories}
          renderItem={renderCategoryItem}
          keyExtractor={item => item}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
};

export default DocumentCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff1e',
  },
  cancelButton: {
    paddingVertical: 8,
  },
  cancelText: {
    color: '#2196f3',
    fontSize: 14,
    fontWeight: '400',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  placeholder: {
    width: 60, // Same width as cancel button for centering
  },
  searchContainer: {
    paddingVertical: 5,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    opacity: 0.6,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    paddingVertical: 8,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
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
});

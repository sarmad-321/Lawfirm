import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, borderRadius, fontSize } from '../../../utils/theme';

interface Document {
  id: string;
  name: string;
  category: string;
  type: 'image' | 'pdf' | 'doc';
  size?: string;
  date?: string;
}

const sampleDocuments: Document[] = [
  {
    id: '1',
    name: 'IMG_1141 (1).JPG',
    category: 'Resolutions',
    type: 'image',
    size: '2.4 MB',
    date: '2024-01-15',
  },
  {
    id: '2',
    name: 'Contract_Agreement.pdf',
    category: 'Contracts',
    type: 'pdf',
    size: '1.8 MB',
    date: '2024-01-10',
  },
  {
    id: '3',
    name: 'Legal_Brief.docx',
    category: 'Legal Documents',
    type: 'doc',
    size: '856 KB',
    date: '2024-01-08',
  },
];

const MatterDocuments = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleBackPress = () => {
    // Navigate back
    console.log('Back pressed');
  };

  const handleFilterPress = () => {
    // Open filter/sort options
    console.log('Filter pressed');
  };

  const handleDocumentPress = (document: Document) => {
    // Open document viewer
    console.log('Document pressed:', document);
  };

  const handleUploadPress = () => {
    // Open file picker
    console.log('Upload pressed');
  };

  const getDocumentIcon = (type: Document['type']) => {
    switch (type) {
      case 'image':
        return 'image-outline';
      case 'pdf':
        return 'document-text-outline';
      case 'doc':
        return 'document-outline';
      default:
        return 'document-outline';
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color={colors.textPrimary} />
      </TouchableOpacity>
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>Documents</Text>
        <Text style={styles.matterId}>00001-Mubasshir</Text>
      </View>
      <TouchableOpacity onPress={handleFilterPress} style={styles.filterButton}>
        <Icon name="options-outline" size={24} color={colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color={colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search matter documents..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
    </View>
  );

  const renderDocumentItem = (document: Document) => (
    <TouchableOpacity
      key={document.id}
      style={styles.documentItem}
      onPress={() => handleDocumentPress(document)}
      activeOpacity={0.8}
    >
      <View style={styles.documentIcon}>
        <Icon
          name={getDocumentIcon(document.type)}
          size={24}
          color={colors.textPrimary}
        />
      </View>
      <View style={styles.documentInfo}>
        <Text style={styles.documentName}>{document.name}</Text>
        <Text style={styles.documentCategory}>{document.category}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderDocumentList = () => (
    <ScrollView
      style={styles.documentList}
      showsVerticalScrollIndicator={false}
    >
      {sampleDocuments.map(renderDocumentItem)}
    </ScrollView>
  );

  const renderUploadButton = () => (
    <TouchableOpacity
      style={styles.uploadButton}
      onPress={handleUploadPress}
      activeOpacity={0.8}
    >
      <Text style={styles.uploadButtonText}>Upload document</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      {renderHeader()}
      {renderSearchBar()}
      {renderDocumentList()}
      {renderUploadButton()}
    </SafeAreaView>
  );
};

export default MatterDocuments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backButton: {
    padding: spacing.sm,
    marginRight: spacing.sm,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  matterId: {
    color: colors.textPrimary,
    fontSize: fontSize.sm,
    fontWeight: '400',
  },
  filterButton: {
    padding: spacing.sm,
    marginLeft: spacing.sm,
  },
  searchContainer: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  searchBar: {
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.gray700,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  documentList: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  documentItem: {
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.gray700,
    marginBottom: spacing.sm,
  },
  documentIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  documentCategory: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  uploadButton: {
    backgroundColor: colors.primary,
    margin: spacing.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
});

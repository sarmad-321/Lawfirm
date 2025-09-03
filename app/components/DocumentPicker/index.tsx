import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, borderRadius, fontSize } from '../../utils/theme';

interface DocumentOption {
  id: string;
  title: string;
  icon: string;
  description?: string;
}

const documentOptions: DocumentOption[] = [
  {
    id: '1',
    title: 'Scan documents',
    icon: 'scan-outline',
    description: 'Scan physical documents',
  },
  {
    id: '2',
    title: 'Take a photo',
    icon: 'camera-outline',
    description: 'Capture with camera',
  },
  {
    id: '3',
    title: 'Upload from Gallery',
    icon: 'images-outline',
    description: 'Select from gallery',
  },
  {
    id: '4',
    title: 'Upload file',
    icon: 'document-outline',
    description: 'Choose from files',
  },
];

const DocumentPicker = () => {
  const handleOptionPress = (option: DocumentOption) => {
    console.log('Option pressed:', option.title);
    // Handle different document picker options
  };

  const renderOption = (option: DocumentOption) => (
    <TouchableOpacity
      key={option.id}
      style={styles.optionItem}
      onPress={() => handleOptionPress(option)}
      activeOpacity={0.8}
    >
      <View style={styles.optionIcon}>
        <Icon name={option.icon} size={24} color={colors.textPrimary} />
      </View>
      <View style={styles.optionContent}>
        <Text style={styles.optionTitle}>{option.title}</Text>
        {option.description && (
          <Text style={styles.optionDescription}>{option.description}</Text>
        )}
      </View>
      <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload document</Text>
      <View style={styles.optionsContainer}>
        {documentOptions.map(renderOption)}
      </View>
    </View>
  );
};

export default DocumentPicker;

const styles = StyleSheet.create({
  container: {},
  title: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: '600',
    marginBottom: spacing.lg,
  },
  optionsContainer: {
    // gap: spacing.sm,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.gray700,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  optionDescription: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
});

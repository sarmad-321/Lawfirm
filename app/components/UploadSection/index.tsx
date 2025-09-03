import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { borderRadius, colors, fontSize, spacing } from '../../utils/theme';

const UploadDocument = ({
  handleReceiptUpload,
}: {
  handleReceiptUpload: () => void;
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>Receipt</Text>
      <TouchableOpacity
        style={styles.receiptUpload}
        onPress={handleReceiptUpload}
        activeOpacity={0.8}
      >
        <Icon name="attach" size={32} color={colors.info} />
        <Text style={styles.receiptText}>Attach receipt</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadDocument;

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionLabel: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '500',
    marginBottom: spacing.sm,
  },
  receiptUpload: {
    borderWidth: 2,
    borderColor: colors.surfaceLight,
    borderStyle: 'dashed',
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  receiptText: {
    color: colors.info,
    fontSize: fontSize.md,
    fontWeight: '500',
    marginTop: spacing.sm,
  },
});

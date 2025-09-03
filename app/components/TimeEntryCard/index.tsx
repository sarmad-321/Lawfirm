import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { borderRadius, colors, fontSize, spacing } from '../../utils/theme';

const TimeEntryCard = ({ item }: any) => {
  return (
    <View style={styles.entryHeader}>
      <View style={styles.initialsContainer}>
        <Text style={styles.initialsText}>{item.initials}</Text>
      </View>
      <View style={styles.entryContent}>
        <Text style={styles.matterText}>{item.matter}</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>
        {item.draft && (
          <View style={styles.draftBadge}>
            <Text style={styles.draftText}>Draft</Text>
          </View>
        )}
      </View>
      <View style={styles.entryRight}>
        <Text style={styles.durationText}>{item.duration}</Text>
        {item.amount !== '£0.00' && (
          <Text style={styles.amountText}>{item.amount}</Text>
        )}
      </View>
    </View>
  );
};

export default TimeEntryCard;

const styles = StyleSheet.create({
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  initialsContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  initialsText: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  entryContent: {
    flex: 1,
  },
  matterText: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginBottom: spacing.xs,
  },
  descriptionText: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    marginBottom: spacing.xs,
  },
  draftBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.error || '#FF3B30',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: borderRadius.sm,
  },
  draftText: {
    color: colors.white,
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  entryRight: {
    alignItems: 'flex-end',
  },
  durationText: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  amountText: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '600',
    marginTop: spacing.xs,
  },
});

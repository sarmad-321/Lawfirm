import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { borderRadius, colors, fontSize, spacing } from '../../utils/theme';

export type BillStatus = 'draft' | 'pending' | 'paid' | 'overdue';

export interface BillCardData {
  id: string;
  title: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string; // e.g. "in 27 days" or "Overdue by 3 days"
  status: BillStatus;
  matterId?: string; // e.g. "00001-wick"
  clientName?: string; // e.g. "john wick"
}

interface BillCardProps {
  bill: BillCardData;
  onPress?: () => void;
  onMorePress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const getStatusColor = (status: BillStatus) => {
  switch (status) {
    case 'draft':
      return '#9CA3AF';
    case 'pending':
      return '#F59E0B';
    case 'paid':
      return '#10B981';
    case 'overdue':
      return '#EF4444';
    default:
      return colors.textSecondary;
  }
};

const getStatusBadgeStyle = (status: BillStatus) => {
  switch (status) {
    case 'draft':
      return {
        backgroundColor: 'rgba(156, 163, 175, 0.2)',
        borderColor: '#9CA3AF',
      };
    case 'pending':
      return {
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        borderColor: '#F59E0B',
      };
    case 'paid':
      return {
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: '#10B981',
      };
    case 'overdue':
      return {
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderColor: '#EF4444',
      };
    default:
      return {
        backgroundColor: colors.gray700,
        borderColor: colors.textSecondary,
      };
  }
};

const BillCard: React.FC<BillCardProps> = ({
  bill,
  onPress,
  onMorePress,
  style,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style} activeOpacity={0.75}>
      <View style={styles.card}>
        {/* Top row: matter id and amount */}
        <View style={styles.topRow}>
          <Text style={styles.matterId}>{bill.matterId || '00001-wick'}</Text>
          <Text style={styles.amount}>£{bill.amount.toFixed(2)}</Text>
        </View>

        {/* Title and invoice */}
        <Text style={styles.title}>{bill.title}</Text>
        <Text style={styles.invoice}>{bill.invoiceNumber}</Text>

        {/* Due + badges */}
        <Text style={styles.due}>Due {bill.dueDate}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.statusBadge, getStatusBadgeStyle(bill.status)]}>
            <Text
              style={[
                styles.statusText,
                { color: getStatusColor(bill.status) },
              ]}
            >
              {bill.status === 'pending'
                ? 'Pending'
                : bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
            </Text>
          </View>
          {(bill.status === 'pending' || bill.status === 'overdue') && (
            <View style={[styles.smallBadge, styles.sentBadge]}>
              <Text style={styles.smallBadgeLabel}>Sent</Text>
            </View>
          )}
          <View style={[styles.smallBadge, styles.userChip]}>
            <Icon name="person-outline" size={12} color={colors.textPrimary} />
            <Text style={styles.smallBadgeLabelWithGap}>
              {bill.clientName || 'john wick'}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.moreButton} onPress={onMorePress}>
          <Icon
            name="ellipsis-horizontal"
            size={16}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default BillCard;

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.gray700,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  matterId: {
    color: colors.textSecondary,
    fontSize: fontSize.xs,
  },
  amount: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  invoice: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  due: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
  },
  statusText: {
    fontSize: fontSize.xs,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  smallBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    marginLeft: spacing.xs,
  },
  sentBadge: {
    backgroundColor: 'rgba(59,130,246,0.15)',
    borderWidth: 0,
  },
  userChip: {
    backgroundColor: colors.gray700,
    borderWidth: 0,
  },
  smallBadgeLabel: {
    color: colors.textPrimary,
    fontSize: fontSize.xs,
    fontWeight: '500',
  },
  smallBadgeLabelWithGap: {
    color: colors.textPrimary,
    fontSize: fontSize.xs,
    fontWeight: '500',
    marginLeft: 4,
  },
  moreButton: {
    position: 'absolute',
    right: spacing.sm,
    top: spacing.sm,
    padding: spacing.xs,
  },
});

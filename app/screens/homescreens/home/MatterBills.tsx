import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { borderRadius, colors, fontSize, spacing } from '../../../utils/theme';
import HeaderV2 from '../../../components/headerv2';
import { useNavigation } from '@react-navigation/native';
import BillCard, { BillCardData } from '../../../components/BillCard';

interface Bill {
  id: string;
  title: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  status: 'draft' | 'pending' | 'paid' | 'overdue';
  daysLeft?: number;
  matterId?: string;
  clientName?: string;
}

interface BalanceInfo {
  outstandingBalance: number;
  trustFunds: number;
}

// Dummy data to load
const dummyBills: Bill[] = [
  {
    id: '1',
    title: 'Office Rent',
    invoiceNumber: 'Invoice #1',
    amount: 14.4,
    dueDate: 'in 27 days',
    status: 'draft',
    daysLeft: 27,
    matterId: '00001-wick',
    clientName: 'john wick',
  },
  {
    id: '2',
    title: 'Internet Service',
    invoiceNumber: 'Invoice #2',
    amount: 89.99,
    dueDate: 'in 15 days',
    status: 'pending',
    daysLeft: 15,
    matterId: '00001-wick',
    clientName: 'john wick',
  },
  {
    id: '3',
    title: 'Office Supplies',
    invoiceNumber: 'Invoice #3',
    amount: 156.75,
    dueDate: 'in 5 days',
    status: 'pending',
    daysLeft: 5,
    matterId: '00001-wick',
    clientName: 'john wick',
  },
  {
    id: '4',
    title: 'Software License',
    invoiceNumber: 'Invoice #4',
    amount: 299.0,
    dueDate: 'Overdue by 3 days',
    status: 'overdue',
    matterId: '00001-wick',
    clientName: 'john wick',
  },
  {
    id: '5',
    title: 'Electricity Bill',
    invoiceNumber: 'Invoice #5',
    amount: 125.3,
    dueDate: 'Paid',
    status: 'paid',
    matterId: '00001-wick',
    clientName: 'john wick',
  },
];

const MatterBills = () => {
  const [bills, setBills] = useState<Bill[]>(dummyBills);
  const navigation = useNavigation<any>();

  // Balance information
  const balanceInfo: BalanceInfo = {
    outstandingBalance: 0.0,
    trustFunds: 0.0,
  };

  // Filter bills based on search query

  const handleBillPress = (item: Bill) => {
    // Navigate when BillDetails route exists in the stack
    try {
      navigation.navigate('Bills', {
        screen: 'BillsDetails',
        params: { bill: item },
      });
    } catch (e) {}
  };

  // Status helpers moved into BillCard

  const renderBalanceCard = () => (
    <View style={styles.balanceCard}>
      <View style={styles.balanceItem}>
        <Text style={styles.balanceLabel}>Outstanding balance</Text>
        <Text style={styles.balanceAmount}>
          £{balanceInfo.outstandingBalance.toFixed(2)}
        </Text>
      </View>
      <View style={styles.balanceItem}>
        <Text style={styles.balanceLabel}>Trust funds</Text>
        <Text style={styles.balanceAmount}>
          £{balanceInfo.trustFunds.toFixed(2)}
        </Text>
      </View>
    </View>
  );

  // Legacy search UI retained for reference (unused)

  const renderBillItem = ({ item }: { item: Bill }) => (
    <BillCard
      bill={item as unknown as BillCardData}
      onPress={() => handleBillPress(item)}
      style={styles.billItem}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Icon name="receipt-outline" size={64} color={colors.textSecondary} />
      <Text style={styles.emptyStateTitle}>No bills found</Text>
      <Text style={styles.emptyStateSubtitle}>
        {bills.length === 0
          ? 'Tap the + button to load sample bills'
          : 'No bills match your search criteria'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <HeaderV2 title="Bills" />

      {/* Balance Cards */}
      {renderBalanceCard()}

      {/* Bill List */}
      <View style={styles.billListContainer}>
        {bills.length > 0 ? (
          <FlatList
            data={bills}
            renderItem={renderBillItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.billListContent}
          />
        ) : (
          renderEmptyState()
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  balanceCard: {
    backgroundColor: colors.surface,
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.gray700,
  },
  balanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  balanceLabel: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  balanceAmount: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.gray700,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  billListContainer: {
    flex: 1,
  },
  topControlsBar: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    backgroundColor: colors.primary,
  },
  topControlsInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainerAlt: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryDark,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
  },
  searchInputAlt: {
    flex: 1,
    marginLeft: spacing.xs,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  filterPill: {
    backgroundColor: colors.primaryDark,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginRight: spacing.sm,
  },
  filterPillText: {
    color: colors.textPrimary,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  settingsIconBtn: {
    padding: spacing.sm,
  },
  billListContent: {
    paddingBottom: 100, // Space for FAB
  },
  billItem: {
    marginHorizontal: spacing.lg,
    marginVertical: spacing.xs,
  },
  billTextContainer: {
    flex: 1,
  },
  // Card styles moved to `app/components/BillCard`, only keep list spacing here
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyStateTitle: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptyStateSubtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default MatterBills;

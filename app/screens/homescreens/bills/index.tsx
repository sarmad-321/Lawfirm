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

interface Bill {
  id: string;
  title: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  status: 'draft' | 'pending' | 'paid' | 'overdue';
  daysLeft?: number;
}

interface BalanceInfo {
  outstandingBalance: number;
  trustFunds: number;
}

const BillsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [bills, setBills] = useState<Bill[]>([]);
  const navigation = useNavigation();

  // Balance information
  const balanceInfo: BalanceInfo = {
    outstandingBalance: 0.0,
    trustFunds: 0.0,
  };

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
    },
    {
      id: '2',
      title: 'Internet Service',
      invoiceNumber: 'Invoice #2',
      amount: 89.99,
      dueDate: 'in 15 days',
      status: 'pending',
      daysLeft: 15,
    },
    {
      id: '3',
      title: 'Office Supplies',
      invoiceNumber: 'Invoice #3',
      amount: 156.75,
      dueDate: 'in 5 days',
      status: 'pending',
      daysLeft: 5,
    },
    {
      id: '4',
      title: 'Software License',
      invoiceNumber: 'Invoice #4',
      amount: 299.0,
      dueDate: 'Overdue by 3 days',
      status: 'overdue',
    },
    {
      id: '5',
      title: 'Electricity Bill',
      invoiceNumber: 'Invoice #5',
      amount: 125.3,
      dueDate: 'Paid',
      status: 'paid',
    },
  ];

  // Filter bills based on search query
  const filteredBills = bills.filter(
    bill =>
      bill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleBillPress = (item: Bill) => {
    navigation.navigate('BillDetails', { bill: item });
  };

  const loadSampleBills = () => {
    setBills(dummyBills);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return '#9CA3AF'; // Gray
      case 'pending':
        return '#F59E0B'; // Amber
      case 'paid':
        return '#10B981'; // Green
      case 'overdue':
        return '#EF4444'; // Red
      default:
        return colors.textSecondary;
    }
  };

  const getStatusBadgeStyle = (status: string) => {
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

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <Icon name="search" size={20} color={colors.textSecondary} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search bill by ID..."
        placeholderTextColor={colors.textSecondary}
        value={searchQuery}
        onChangeText={handleSearchChange}
      />
    </View>
  );

  const renderBillItem = ({ item }: { item: Bill }) => (
    <TouchableOpacity
      onPress={() => handleBillPress(item)}
      style={styles.billItem}
      activeOpacity={0.7}
    >
      <View style={styles.billContent}>
        <View style={styles.billTextContainer}>
          <Text style={styles.billTitle}>{item.title}</Text>
          <Text style={styles.invoiceNumber}>{item.invoiceNumber}</Text>
          <Text style={styles.dueDate}>{item.dueDate}</Text>

          <View style={[styles.statusBadge, getStatusBadgeStyle(item.status)]}>
            <Text
              style={[
                styles.statusText,
                { color: getStatusColor(item.status) },
              ]}
            >
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.billAmountContainer}>
          <Text style={styles.billAmount}>£{item.amount.toFixed(2)}</Text>
          <TouchableOpacity style={styles.moreButton}>
            <Icon
              name="ellipsis-horizontal"
              size={16}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
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
      <HeaderV2
        title="Bills"
        subtitle="00001 Multilaw ltd"
        showBackButton={true}
        rightComponent={
          <TouchableOpacity>
            <Icon name="filter" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        }
      />

      {/* Balance Cards */}
      {renderBalanceCard()}

      {/* Search Bar */}
      {renderSearchBar()}

      {/* Bill List */}
      <View style={styles.billListContainer}>
        {filteredBills.length > 0 ? (
          <FlatList
            data={filteredBills}
            renderItem={renderBillItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.billListContent}
          />
        ) : (
          renderEmptyState()
        )}
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={loadSampleBills}>
        <Icon name="add" size={24} color={colors.white} />
      </TouchableOpacity>
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
  billListContent: {
    paddingBottom: 100, // Space for FAB
  },
  billItem: {
    marginHorizontal: spacing.lg,
    marginVertical: spacing.xs,
  },
  billContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.gray700,
  },
  billTextContainer: {
    flex: 1,
  },
  billTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  invoiceNumber: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  dueDate: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
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
  billAmountContainer: {
    alignItems: 'flex-end',
    marginLeft: spacing.md,
  },
  billAmount: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  moreButton: {
    padding: spacing.xs,
  },
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

export default BillsScreen;

import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  borderRadius,
  colors,
  fontSize,
  shadow,
  spacing,
} from '../../../utils/theme';
import HeaderV2 from '../../../components/headerv2';

interface TimeEntry {
  id: string;
  date: string;
  description: string;
  duration: string;
  amount: string;
  matter: string;
  initials: string;
}

interface DailyTotal {
  date: string;
  totalAmount: string;
  totalDuration: string;
  entries: TimeEntry[];
}

const Activities: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'time' | 'expenses'>('time');

  // Sample data - replace with your actual data
  const dailyTotals: DailyTotal[] = [
    {
      date: 'Aug 4, 2025 - Aug 4, 2025',
      totalAmount: '£0.00',
      totalDuration: '00:00:36',
      entries: [
        {
          id: '1',
          date: 'Today, Aug 4',
          description: 'No activity description',
          duration: '00:00:02',
          amount: '£0.00',
          matter: 'No matter selected',
          initials: 'SS',
        },
      ],
    },
  ];

  const handleSettingsPress = () => {
    console.log('Settings pressed');
  };

  const handleNotificationPress = () => {
    console.log('Notification pressed');
  };

  const handleMessagePress = () => {
    console.log('Message pressed');
  };

  const handleAddPress = () => {
    console.log('Add activity pressed');
  };

  const handleFilterPress = () => {
    console.log('Filter pressed');
  };

  const handleMenuPress = () => {
    console.log('Menu pressed');
  };

  const renderTimeEntry = ({ item }: { item: TimeEntry }) => (
    <View style={styles.entryCard}>
      <View style={styles.entryHeader}>
        <View style={styles.initialsContainer}>
          <Text style={styles.initialsText}>{item.initials}</Text>
        </View>
        <View style={styles.entryContent}>
          <Text style={styles.matterText}>{item.matter}</Text>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>
        <Text style={styles.durationText}>{item.duration}</Text>
      </View>
    </View>
  );

  const renderDailySection = ({ item }: { item: DailyTotal }) => (
    <View style={styles.dailySection}>
      <View style={styles.dailySummary}>
        <Text style={styles.dateText}>{item.date}</Text>
        <View style={styles.summaryRight}>
          <Text style={styles.totalAmount}>{item.totalAmount}</Text>
          <Text style={styles.totalDuration}>{item.totalDuration}</Text>
        </View>
      </View>

      <View style={styles.dayHeader}>
        <Text style={styles.dayTitle}>Today, Aug 4</Text>
        <View style={styles.dayTotals}>
          <Text style={styles.dayAmount}>£0.00</Text>
          <Text style={styles.dayDuration}>00:00:02</Text>
        </View>
      </View>

      <FlatList
        data={item.entries}
        renderItem={renderTimeEntry}
        keyExtractor={entry => entry.id}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderV2
        onSettingsPress={handleSettingsPress}
        onNotificationPress={handleNotificationPress}
        onMessagePress={handleMessagePress}
      />

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'time' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('time')}
          activeOpacity={0.8}
        >
          <Icon
            name="checkmark"
            size={16}
            color={
              activeTab === 'time' ? colors.textPrimary : colors.textSecondary
            }
            style={styles.tabIcon}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'time' && styles.activeTabText,
            ]}
          >
            Time entries
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'expenses' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('expenses')}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'expenses' && styles.activeTabText,
            ]}
          >
            Expenses
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'time' ? (
          <View style={styles.timeEntriesContent}>
            {/* Total Billable Section */}
            <View style={styles.totalBillableCard}>
              <Text style={styles.totalBillableTitle}>Total billable</Text>
              <View style={styles.totalBillableRow}>
                <Text style={styles.totalBillableDate}>
                  Aug 4, 2025 - Aug 4, 2025
                </Text>
                <View style={styles.totalBillableValues}>
                  <Text style={styles.totalBillableAmount}>£0.00</Text>
                  <Text style={styles.totalBillableDuration}>00:00:36</Text>
                </View>
              </View>
            </View>

            <FlatList
              data={dailyTotals}
              renderItem={renderDailySection}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
            />
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No expenses recorded</Text>
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddPress}
        activeOpacity={0.8}
      >
        <Icon name="add" size={28} color={colors.textPrimary} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  activitiesHeader: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.xxl,
    marginRight: spacing.lg,
    backgroundColor: colors.transparent,
  },
  activeTabButton: {
    backgroundColor: colors.primaryLight,
  },
  tabIcon: {
    marginRight: spacing.xs + 2,
  },
  tabText: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    fontWeight: '500',
  },
  activeTabText: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  timeEntriesContent: {
    paddingVertical: spacing.lg,
  },
  totalBillableCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  totalBillableTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  totalBillableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalBillableDate: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  totalBillableValues: {
    alignItems: 'flex-end',
  },
  totalBillableAmount: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: '600',
  },
  totalBillableDuration: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  dailySection: {
    marginBottom: spacing.lg,
  },
  dailySummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray600,
  },
  dateText: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  summaryRight: {
    alignItems: 'flex-end',
  },
  totalAmount: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  totalDuration: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray700,
  },
  dayTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
  },
  dayTotals: {
    alignItems: 'flex-end',
  },
  dayAmount: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  dayDuration: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  entryCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginVertical: spacing.sm,
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  durationText: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xxxl * 2,
  },
  emptyStateText: {
    color: colors.textSecondary,
    fontSize: fontSize.lg,
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.fabBackground,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadow.large,
  },
});

export default Activities;

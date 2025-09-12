/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  PanResponder,
  Dimensions,
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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import TimeEntryCard from '../../../components/TimeEntryCard';
import PopupWrapper, { PopupWrapperRef } from '../../../components/PopupWrapper';
import ActivitiesFilter from './ActivitiesFilter';

const { width: screenWidth } = Dimensions.get('window');
const SWIPE_THRESHOLD = 80;
const ACTION_WIDTH = 90;

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

const SwipeableCard = ({
  item,
  onEdit,
  onDuplicate,
  onDelete,
  onStart,
  shouldShowDemo,
  onDemoComplete,
  index,
}) => {
  const [pan] = useState(new Animated.Value(0));
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    console.log(shouldShowDemo, index, 'card details');
    if (shouldShowDemo && index === 0) {
      // Show demo swipe animation
      console.log('are we here ?');
      setTimeout(() => {
        Animated.sequence([
          Animated.timing(pan, {
            toValue: -ACTION_WIDTH * 2, // Swipe right to show actions
            duration: 800,
            useNativeDriver: false,
          }),
          Animated.timing(pan, {
            toValue: 0, // Return to original position
            duration: 600,
            useNativeDriver: false,
          }),
        ]).start(() => {
          if (onDemoComplete) {
            onDemoComplete();
          }
        });
      }, 1000); // Wait 1 second after screen loads
    }
  }, [shouldShowDemo]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 10 && Math.abs(gestureState.dy) < 50;
    },
    onPanResponderGrant: () => {
      pan.setOffset(pan._value);
    },
    onPanResponderMove: (evt, gestureState) => {
      const maxSwipe = -ACTION_WIDTH * 3; // 3 actions
      const clampedDx = Math.max(maxSwipe, Math.min(0, gestureState.dx));
      pan.setValue(clampedDx);
    },
    onPanResponderRelease: (evt, gestureState) => {
      pan.flattenOffset();

      if (gestureState.dx < -SWIPE_THRESHOLD) {
        // Open swipe actions
        Animated.spring(pan, {
          toValue: -ACTION_WIDTH * 1.9,
          useNativeDriver: false,
        }).start();
        setIsOpen(true);
      } else {
        // Close swipe actions
        Animated.spring(pan, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
        setIsOpen(false);
      }
    },
  });

  const closeSwipe = () => {
    Animated.spring(pan, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
    setIsOpen(false);
  };

  const handleAction = action => {
    closeSwipe();
    setTimeout(() => {
      action();
    }, 200);
  };

  return (
    <View style={styles.swipeContainer}>
      {/* Action Buttons (Behind the card) */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.duplicateButton]}
          onPress={() => handleAction(() => onDuplicate(item))}
          activeOpacity={0.8}
        >
          <Text style={{ color: 'white' }}>Duplicate</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleAction(() => onDelete(item))}
          activeOpacity={0.8}
        >
          <Text style={{ color: 'white' }}>Start</Text>
        </TouchableOpacity>
      </View>

      {/* Main Card */}
      <Animated.View
        style={[
          styles.entryCard,
          {
            transform: [{ translateX: pan }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity onPress={closeSwipe} activeOpacity={1}>
          <TimeEntryCard item={item} />

          {/* Action Buttons for entries that can be started */}
          {item.amount === '£0.00' && (
            <View style={styles.cardActions}>
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => onStart(item)}
                activeOpacity={0.8}
              >
                <Text style={styles.startButtonText}>Start</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.duplicateActionButton}
                onPress={() => onDuplicate(item)}
                activeOpacity={0.8}
              >
                <Text style={styles.duplicateActionText}>Duplicate</Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const Activities: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'time' | 'expenses'>('time');
  const [demoShown, setDemoShown] = useState(false);
  const navigation = useNavigation();
  const filterPopupRef = React.useRef<PopupWrapperRef>();
  // Enhanced sample data
  const dailyTotals: DailyTotal[] = [
    {
      date: 'Aug 4, 2025 - Aug 5, 2025',
      totalAmount: '£14.40',
      totalDuration: '01:13:48',
      entries: [
        {
          id: '1',
          date: 'Today, Aug 5',
          description: 'mubashir',
          duration: '01:12:47',
          amount: '£14.40',
          matter: '00001-mubashir',
          initials: 'SS',
        },
        {
          id: '2',
          date: 'Today, Aug 5',
          description: 'No activity description',
          duration: '00:00:47',
          amount: '£0.00',
          matter: 'No matter selected',
          initials: 'SS',
          draft: true,
        },
        {
          id: '3',
          date: 'Mon, Aug 4',
          description: 'No activity description',
          duration: '00:00:02',
          amount: '£0.00',
          matter: 'No matter selected',
          initials: 'SS',
        },
      ],
    },
  ];

  const handleEdit = (item: TimeEntry) => {
    console.log('Edit:', item.id);
  };

  const handleDuplicate = (item: TimeEntry) => {
    console.log('Duplicate:', item.id);
  };

  const handleDelete = (item: TimeEntry) => {
    console.log('Delete:', item.id);
  };

  const handleStart = (item: TimeEntry) => {
    console.log('Start:', item.id);
    navigation.navigate('EditTimeEntries');
  };

  const handleAddPress = () => {
    if (activeTab === 'expenses') {
      navigation.navigate('AddNewExpense');
    }
  };

  const handleDemoComplete = () => {
    setDemoShown(true);
  };

  useFocusEffect(
    useCallback(() => {
      setDemoShown(false);
      return () => {
        console.log('User navigated away from this tab');
      };
    }, []),
  );

  const renderTimeEntry = ({
    item,
    index,
  }: {
    item: TimeEntry;
    index: Number;
  }) => (
    <SwipeableCard
      item={item}
      index={index}
      onEdit={handleEdit}
      onDuplicate={handleDuplicate}
      onDelete={handleDelete}
      onStart={handleStart}
      shouldShowDemo={!demoShown} // Show demo on first card only
      onDemoComplete={handleDemoComplete}
    />
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

      <FlatList
        data={item.entries}
        renderItem={renderTimeEntry}
        keyExtractor={entry => entry.id}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );


  const handleFilterPress = () => {
    // Open filter popup
    filterPopupRef.current?.show();
    console.log('Filter pressed');
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderV2 title="Activities" handleFilterPress={handleFilterPress} />

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
                  Aug 4, 2025 - Aug 5, 2025
                </Text>
                <View style={styles.totalBillableValues}>
                  <Text style={styles.totalBillableAmount}>£14.40</Text>
                  <Text style={styles.totalBillableDuration}>01:13:48</Text>
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

      <PopupWrapper
        ref={filterPopupRef}
      >
        <ActivitiesFilter />
      </PopupWrapper>

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

  // Swipeable Card Styles
  swipeContainer: {
    marginVertical: spacing.sm,
    overflow: 'visible',
  },
  actionContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 0,
  },
  actionButton: {
    width: ACTION_WIDTH,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: colors.primaryDark,
  },
  duplicateButton: {
    backgroundColor: colors.gray600,
  },
  deleteButton: {
    backgroundColor: '#007AFF',
    borderTopRightRadius: borderRadius.lg,
    borderBottomRightRadius: borderRadius.lg,
  },

  entryCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    zIndex: 1,
    overflow: 'hidden',
  },
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

  // Card Actions
  cardActions: {
    flexDirection: 'row',
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  startButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  startButtonText: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  duplicateActionButton: {
    borderColor: colors.textSecondary,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  duplicateActionText: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    fontWeight: '600',
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

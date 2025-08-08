import React, { useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { borderRadius, colors, fontSize, spacing } from '../../../utils/theme';

interface Event {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  type: 'event' | 'task';
  userInitials?: string;
  backgroundColor?: string;
}

interface DaySchedule {
  date: Date;
  dayName: string;
  dayNumber: number;
  month: string;
  events: Event[];
}

const CalendarScreenContent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const horizontalCalendarRef = useRef(null);
  const verticalScrollRef = useRef(null);

  // Sample events data
  const sampleEvents: { [key: string]: Event[] } = {
    'Mon Aug 11': [
      {
        id: '1',
        title: '00001-Mubasshir',
        subtitle: 'Tareekh pe tareekh',
        time: '4:30-5 PM',
        type: 'event',
        userInitials: 'AM',
        backgroundColor: colors.secondary,
      },
    ],
    'Mon Aug 18': [
      {
        id: '1',
        title: '00001-Mubasshir',
        subtitle: 'Testing event',
        time: '4:30-5 PM',
        type: 'event',
        userInitials: 'AM',
        backgroundColor: colors.secondary,
      },
    ],
    // You can add more events for other dates here
  };

  // Generate dates for horizontal calendar (30 days from today)
  const generateHorizontalDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = -7; i < 23; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // Generate daily schedule data with events
  const generateScheduleData = () => {
    const scheduleData: DaySchedule[] = [];
    const horizontalDates = generateHorizontalDates();

    horizontalDates.forEach(date => {
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const dayKey = `${dayName} ${month} ${date.getDate()}`;

      scheduleData.push({
        date: date,
        dayName: dayName,
        dayNumber: date.getDate(),
        month: month,
        events: sampleEvents[dayKey] || [],
      });
    });

    return scheduleData;
  };

  const [horizontalDates] = useState(generateHorizontalDates());
  const [scheduleData] = useState(generateScheduleData());

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameDate = (date1: Date, date2: Date) => {
    return date1.toDateString() === date2.toDateString();
  };

  const handleDatePress = (date: Date, index: number) => {
    setSelectedDate(date);

    // Scroll horizontal calendar to selected date
    if (horizontalCalendarRef.current) {
      horizontalCalendarRef.current.scrollToIndex({
        index: index,
        animated: true,
        viewPosition: 0.5,
      });
    }

    // Auto-scroll vertical list to selected date
    if (verticalScrollRef.current) {
      try {
        verticalScrollRef.current.scrollToIndex({
          index: index,
          animated: true,
          viewPosition: 0,
        });
      } catch (error) {
        // Handle scroll error gracefully
      }
    }
  };

  const handleVerticalScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const itemHeight = 120; // Approximate height of each day item
    const currentIndex = Math.floor(scrollY / itemHeight);

    if (currentIndex >= 0 && currentIndex < scheduleData.length) {
      const currentDate = scheduleData[currentIndex].date;
      if (!isSameDate(currentDate, selectedDate)) {
        setSelectedDate(currentDate);

        // Sync horizontal calendar
        if (horizontalCalendarRef.current) {
          try {
            horizontalCalendarRef.current.scrollToIndex({
              index: currentIndex,
              animated: true,
              viewPosition: 0.5,
            });
          } catch (error) {
            // Handle scroll error gracefully
          }
        }
      }
    }
  };

  const renderHorizontalDateItem = ({
    item: date,
    index,
  }: {
    item: Date;
    index: number;
  }) => {
    const isSelected = isSameDate(date, selectedDate);
    const isTodayDate = isToday(date);

    return (
      <TouchableOpacity
        style={[
          styles.horizontalDateItem,
          isSelected && styles.selectedHorizontalDate,
          isTodayDate && !isSelected && styles.todayHorizontalDate,
        ]}
        onPress={() => handleDatePress(date, index)}
      >
        <Text
          style={[
            styles.horizontalDayText,
            isSelected && styles.selectedHorizontalDayText,
            isTodayDate && !isSelected && styles.todayHorizontalDayText,
          ]}
        >
          {date.toLocaleDateString('en-US', { weekday: 'short' })}
        </Text>
        <Text
          style={[
            styles.horizontalDateText,
            isSelected && styles.selectedHorizontalDateText,
            isTodayDate && !isSelected && styles.todayHorizontalDateText,
          ]}
        >
          {date.getDate()}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderEventItem = ({ item }: { item: Event }) => (
    <TouchableOpacity style={styles.eventItem} activeOpacity={0.7}>
      <View style={styles.eventContent}>
        {item.userInitials && (
          <View
            style={[
              styles.userAvatar,
              { backgroundColor: item.backgroundColor },
            ]}
          >
            <Text style={styles.userInitials}>{item.userInitials}</Text>
          </View>
        )}
        <View style={styles.eventTextContainer}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.eventSubtitle}>{item.subtitle}</Text>
        </View>
        <Text style={styles.eventTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderScheduleItem = ({ item }: { item: DaySchedule }) => {
    const isSelected = isSameDate(item.date, selectedDate);
    const isTodayDate = isToday(item.date);

    return (
      <View
        style={[styles.scheduleItem, isSelected && styles.selectedScheduleItem]}
      >
        <View style={styles.scheduleHeader}>
          <Text
            style={[
              styles.scheduleDate,
              isTodayDate && styles.todayScheduleDate,
            ]}
          >
            {isTodayDate ? 'Today, ' : ''}
            {formatDate(item.date)}
          </Text>
        </View>

        {item.events.length > 0 ? (
          <FlatList
            data={item.events}
            renderItem={renderEventItem}
            keyExtractor={event => event.id}
            scrollEnabled={false}
          />
        ) : (
          <View style={styles.noEventsContainer}>
            <Icon
              name="calendar-outline"
              size={24}
              color={colors.textSecondary}
            />
            <Text style={styles.noEventsText}>No events scheduled</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Horizontal Calendar Strip */}
      <View style={styles.horizontalCalendarContainer}>
        <FlatList
          ref={horizontalCalendarRef}
          data={horizontalDates}
          renderItem={renderHorizontalDateItem}
          keyExtractor={(item, index) => `horizontal-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalCalendarContent}
          initialScrollIndex={7} // Start at today
          getItemLayout={(data, index) => ({
            length: 60,
            offset: 60 * index,
            index,
          })}
          onScrollToIndexFailed={() => {}}
        />
      </View>

      {/* Vertical Schedule List */}
      <FlatList
        ref={verticalScrollRef}
        data={scheduleData}
        renderItem={renderScheduleItem}
        keyExtractor={(item, index) => `schedule-${index}`}
        showsVerticalScrollIndicator={false}
        onScroll={handleVerticalScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scheduleContainer}
        initialScrollIndex={7} // Start at today
        getItemLayout={(data, index) => ({
          length: 120,
          offset: 120 * index,
          index,
        })}
        onScrollToIndexFailed={() => {}}
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
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
  horizontalCalendarContainer: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray700,
  },
  horizontalCalendarContent: {
    paddingHorizontal: spacing.md,
  },
  horizontalDateItem: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: spacing.xs,
    backgroundColor: 'transparent',
  },
  selectedHorizontalDate: {
    backgroundColor: colors.primary,
  },
  todayHorizontalDate: {
    backgroundColor: colors.gray700,
  },
  horizontalDayText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  selectedHorizontalDayText: {
    color: colors.white,
  },
  todayHorizontalDayText: {
    color: colors.white,
  },
  horizontalDateText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  selectedHorizontalDateText: {
    color: colors.white,
  },
  todayHorizontalDateText: {
    color: colors.white,
  },
  scheduleContainer: {
    paddingBottom: 100, // Space for FAB
  },
  scheduleItem: {
    minHeight: 120,
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
  },
  selectedScheduleItem: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  scheduleHeader: {
    marginBottom: spacing.md,
  },
  scheduleDate: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  todayScheduleDate: {
    color: colors.primary,
  },
  eventItem: {
    marginBottom: spacing.sm,
  },
  eventContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  userInitials: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  eventTextContainer: {
    flex: 1,
  },
  eventTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '600',
    marginBottom: 2,
  },
  eventSubtitle: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  eventTime: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  noEventsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  noEventsText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
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

export default CalendarScreenContent;

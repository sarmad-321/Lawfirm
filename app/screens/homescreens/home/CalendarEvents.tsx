import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, borderRadius, fontSize } from '../../../utils/theme';

interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  time: string;
  initials: string;
  type?: 'meeting' | 'court' | 'consultation' | 'deadline';
}

const sampleEvents: CalendarEvent[] = [
  {
    id: '1',
    date: 'Mon, Aug 11',
    title: 'Tareekh pe tareekh',
    time: '4:30-5 PM',
    initials: 'SS',
    type: 'court',
  },
  {
    id: '2',
    date: 'Wed, Aug 13',
    title: 'Client consultation',
    time: '2:00-3:00 PM',
    initials: 'JW',
    type: 'consultation',
  },
  {
    id: '3',
    date: 'Fri, Aug 15',
    title: 'Document filing deadline',
    time: '5:00 PM',
    initials: 'DL',
    type: 'deadline',
  },
];

const CalendarEvents = () => {
  const handleBackPress = () => {
    // Navigate back
    console.log('Back pressed');
  };

  const handleFilterPress = () => {
    // Open filter/sort options
    console.log('Filter pressed');
  };

  const handleEventPress = (event: CalendarEvent) => {
    // Open event details
    console.log('Event pressed:', event);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color={colors.textPrimary} />
      </TouchableOpacity>
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>Calendar events</Text>
        <Text style={styles.matterId}>00001-Mubashir</Text>
      </View>
      <TouchableOpacity onPress={handleFilterPress} style={styles.filterButton}>
        <Icon name="options-outline" size={24} color={colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );

  const renderEventItem = (event: CalendarEvent) => (
    <TouchableOpacity
      key={event.id}
      style={styles.eventItem}
      onPress={() => handleEventPress(event)}
      activeOpacity={0.8}
    >
      <View style={styles.eventBadge}>
        <Text style={styles.eventInitials}>{event.initials}</Text>
      </View>
      <View style={styles.eventInfo}>
        <Text style={styles.eventDate}>{event.date}</Text>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventTime}>{event.time}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEventList = () => (
    <ScrollView style={styles.eventList} showsVerticalScrollIndicator={false}>
      {sampleEvents.map(renderEventItem)}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      {renderHeader()}

      {/* Separator line */}
      <View style={styles.separator} />

      {/* All events section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>All events</Text>
      </View>

      {/* Separator line */}
      <View style={styles.separator} />

      {renderEventList()}
    </SafeAreaView>
  );
};

export default CalendarEvents;

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
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    fontWeight: '400',
  },
  filterButton: {
    padding: spacing.sm,
    marginLeft: spacing.sm,
  },
  separator: {
    height: 1,
    backgroundColor: colors.gray700,
  },
  sectionHeader: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  eventList: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  eventItem: {
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.gray700,
    marginBottom: spacing.sm,
  },
  eventBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  eventInitials: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  eventInfo: {
    flex: 1,
  },
  eventDate: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  eventTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  eventTime: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
});

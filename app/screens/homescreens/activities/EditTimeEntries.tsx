import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, fontSize, borderRadius } from '../../../utils/theme';
import { useNavigation } from '@react-navigation/native';

interface TimeEntryField {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  icon: string;
  iconColor: string;
  onPress: () => void;
}

const EditTimeEntries: React.FC = () => {
  const navigation = useNavigation();
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(6); // 6 seconds as shown in image

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleMenuPress = () => {
    console.log('Menu pressed');
  };

  const handleStartTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerRunning]);

  // Format time as HH:MM:SS
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Time entry fields data
  const timeEntryFields: TimeEntryField[] = [
    {
      id: '1',
      label: 'Related matter',
      value: '00001 - nick\nMurder case',
      icon: 'briefcase',
      iconColor: colors.info,
      onPress: () => console.log('Related matter pressed'),
    },
    {
      id: '2',
      label: 'Activity category',
      value: 'No activity category selected',
      icon: 'list-circle',
      iconColor: colors.textSecondary,
      onPress: () => console.log('Activity category pressed'),
    },
    {
      id: '3',
      label: 'Description',
      value: 'No description entered',
      icon: 'document-text',
      iconColor: colors.textSecondary,
      onPress: () => console.log('Description pressed'),
    },
    {
      id: '4',
      label: 'Date recorded',
      value: 'Today, Aug 22',
      icon: 'calendar',
      iconColor: colors.error,
      onPress: () => console.log('Date recorded pressed'),
    },
    {
      id: '5',
      label: 'Firm user',
      value: 'paul walker',
      icon: 'person-circle',
      iconColor: colors.success,
      onPress: () => console.log('Firm user pressed'),
    },
    {
      id: '6',
      label: 'Rate',
      value: '£0.00 (default)\nAmount (duration x rate)\n£0.00',
      icon: 'card',
      iconColor: colors.info,
      onPress: () => console.log('Rate pressed'),
    },
    {
      id: '7',
      label: 'Invoice status',
      value: 'Unbilled',
      icon: 'receipt',
      iconColor: colors.info,
      onPress: () => console.log('Invoice status pressed'),
    },
  ];

  const renderTimeEntryField = ({ item }: { item: TimeEntryField }) => (
    <TouchableOpacity
      style={styles.fieldItem}
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.fieldLeft}>
        <View
          style={[
            styles.fieldIconContainer,
            { backgroundColor: item.iconColor + '20' },
          ]}
        >
          <Icon name={item.icon} size={20} color={item.iconColor} />
        </View>
        <View style={styles.fieldTextContainer}>
          <Text style={styles.fieldLabel}>{item.label}</Text>
          <Text
            style={[
              styles.fieldValue,
              (item.value.includes('No ') || item.value === 'Unbilled') &&
                styles.fieldValueSecondary,
            ]}
          >
            {item.value}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.headerButton}>
          <Icon name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit</Text>
        <TouchableOpacity onPress={handleMenuPress} style={styles.headerButton}>
          <Icon name="ellipsis-vertical" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Timer Section */}
        <View style={styles.timerSection}>
          <Text style={styles.timerText}>{formatTime(timeElapsed)}</Text>
          <TouchableOpacity
            style={[
              styles.startButton,
              isTimerRunning && styles.startButtonActive,
            ]}
            onPress={handleStartTimer}
            activeOpacity={0.8}
          >
            <Icon
              name={isTimerRunning ? 'pause' : 'play'}
              size={20}
              color={colors.white}
            />
            <Text style={styles.startButtonText}>
              {isTimerRunning ? 'Pause timer' : 'Start timer'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Time Entry Fields */}
        <View style={styles.fieldsContainer}>
          {timeEntryFields.map((item, index) => (
            <View key={item.id}>
              {renderTimeEntryField({ item })}
              {index < timeEntryFields.length - 1 && (
                <View style={styles.fieldSeparator} />
              )}
            </View>
          ))}
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
  headerButton: {
    padding: spacing.sm,
  },
  headerTitle: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  timerSection: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingBottom: spacing.xl,
  },
  timerText: {
    color: colors.white,
    fontSize: 48,
    fontWeight: '300',
    marginBottom: spacing.lg,
    fontFamily: 'monospace',
  },
  startButton: {
    backgroundColor: colors.info,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    minWidth: 200,
  },
  startButtonActive: {
    backgroundColor: colors.error,
  },
  startButtonText: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: '500',
    marginLeft: spacing.sm,
  },
  fieldsContainer: {
    backgroundColor: colors.surfaceLight,
    marginTop: spacing.xl,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  fieldItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  fieldLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fieldIconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  fieldTextContainer: {
    flex: 1,
  },
  fieldLabel: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginBottom: 4,
  },
  fieldValue: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    lineHeight: 20,
  },
  fieldValueSecondary: {
    color: colors.textSecondary,
  },
  fieldSeparator: {
    height: 1,
    backgroundColor: colors.gray700,
    marginHorizontal: spacing.lg,
  },
  bottomNav: {
    backgroundColor: colors.surfaceLight,
    flexDirection: 'row',
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.gray700,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  navLabel: {
    color: colors.textSecondary,
    fontSize: fontSize.xs,
    marginTop: 4,
  },
});

export default EditTimeEntries;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionCard from '../ActionCard';
import {
  colors,
  spacing,
  borderRadius,
  fontSize,
  shadow,
} from '../../utils/theme';
import { useNavigation } from '@react-navigation/native';

const actions = [
  {
    key: 'matter',
    icon: 'briefcase-outline',
    title: 'Matter',
    color: '#6366F1',
  },
  { key: 'event', icon: 'calendar-outline', title: 'Event', color: '#F59E42' },
  { key: 'task', icon: 'checkmark-outline', title: 'Task', color: '#EF4444' },
  {
    key: 'document',
    icon: 'document-text-outline',
    title: 'Document',
    color: '#22C55E',
  },
  {
    key: 'contact',
    icon: 'person-add-outline',
    title: 'Contact',
    color: '#A855F7',
  },
  { key: 'comm', icon: 'call-outline', title: 'Comm logs', color: '#EF4444' },
  { key: 'notes', icon: 'mail-outline', title: 'Notes', color: '#F59E0B' },
  {
    key: 'message',
    icon: 'chatbubble-ellipses-outline',
    title: 'Messages',
    color: '#22C55E',
  },

  {
    key: 'edit',
    icon: 'pencil-outline',
    title: 'Edit',
    color: colors.backgroundDark,
  },
];

const CreatePopup = () => {
  const navigation = useNavigation<any>();
  const onStartTimer = () => {
    // hook up when backend/logic is ready
  };

  const onActionPress = (key: string) => () => {
    if (key === 'edit') {
      navigation.navigate('EditMenu');
      return;
    }
    if (key === 'document') {
      navigation.navigate('AddDocuments');
      return;
    }
    if (key === 'event') {
      navigation.navigate('AddEvent');
      return;
    }
    if (key === 'task') {
      navigation.navigate('AddTask');
      return;
    }
    if (key === 'notes') {
      navigation.navigate('AddNotes');
      return;
    }
    if (key === 'comm') {
      navigation.navigate('AddLogs');
      return;
    }
    if (key === 'message') {
      navigation.navigate('AddMessages');
      return;
    }
    if (key === 'matter') {
      navigation.navigate('AddMatter');
      return;
    }
    if (key === 'contact') {
      navigation.navigate('AddContact');
      return;
    }
    // handle other keys when wired up
  };

  return (
    <View style={styles.container}>
      <View style={styles.timekeeperBox}>
        <View style={styles.timekeeperHeader}>
          <View style={styles.timekeeperTitleRow}>
            <Icon name="time-outline" size={18} color={colors.textSecondary} />
            <Text style={styles.timekeeperTitle}>Timekeeper</Text>
          </View>
          <Text style={styles.timekeeperSubtitle}>
            Tap to record new time entry
          </Text>
        </View>
        <TouchableOpacity
          style={styles.timerButton}
          activeOpacity={0.85}
          onPress={onStartTimer}
        >
          <Icon name="play" size={16} color={colors.textPrimary} />
          <Text style={styles.timerButtonText}>Start timer</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Create new</Text>
        <Text style={styles.sectionHint}>Swipe left to see all options</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.actionsRow}
      >
        {actions.map(item => (
          <View key={item.key} style={styles.actionItem}>
            <ActionCard
              icon={item.icon}
              title={item.title}
              backgroundColor={item.color}
              onPress={onActionPress(item.key)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CreatePopup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timekeeperBox: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xxl,
    ...shadow.large,
  },
  timekeeperHeader: {
    marginBottom: spacing.md,
  },
  timekeeperTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  timekeeperTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '700',
    marginLeft: spacing.xs,
  },
  timekeeperSubtitle: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  timerButton: {
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerButtonText: {
    color: colors.textPrimary,
    fontWeight: '700',
    marginLeft: spacing.sm,
  },
  sectionHeader: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: '700',
  },
  sectionHint: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
  },
  actionsRow: {
    paddingVertical: spacing.sm,
  },
  actionItem: {
    marginRight: spacing.lg,
    alignItems: 'center',
  },
});

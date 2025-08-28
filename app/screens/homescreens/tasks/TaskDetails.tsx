import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import TaskCard from '../../../components/TaskCard';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { colors, fontSize, spacing } from '../../../utils/theme';

const TaskDetails = ({ route }) => {
  const navigation = useNavigation();
  const task = route.params?.task;

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
      <View style={styles.matterInfo}>
        <Text style={styles.matterNumber}>
          {task.id} - {task.title}
        </Text>
        <Text style={styles.matterDescription}>{task.dueDate}</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.matterNumber}>Task Details</Text>

        <TaskCard
          title="Status"
          subtitle="Pending"
          icon="checkmark-circle-outline"
          color="#2D9CDB"
        />

        <TaskCard
          title="Description"
          subtitle={task.description}
          icon="document-text-outline"
          color="#4CAF50"
        />

        <TaskCard
          title="Related matter"
          subtitle="No matter selected"
          icon="folder-outline"
          color="#9C27B0"
        />

        <TaskCard
          title="Assigned to"
          subtitle="sarmad shakeel"
          initials="SS"
          color="#2E7D32"
        />

        <TaskCard
          title="Assigned by"
          subtitle="sarmad shakeel"
          initials="SS"
          color="#1565C0"
        />

        <TaskCard
          title="Task type"
          subtitle="No task type selected"
          icon="list-outline"
          color="#F57C00"
        />

        <TaskCard
          title="Time estimate"
          subtitle="No time estimate"
          icon="time-outline"
          color="#455A64"
        />

        <TaskCard
          title="Reminders"
          subtitle="No reminders scheduled"
          icon="notifications-outline"
          color="#E91E63"
        />
      </View>
    </View>
  );
};

export default TaskDetails;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  matterInfo: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  matterNumber: {
    color: colors.textPrimary,
    fontSize: fontSize.xl,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  matterDescription: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  bottomContainer: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
});

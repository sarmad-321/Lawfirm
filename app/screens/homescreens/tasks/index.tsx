import React, { useState, useRef } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { borderRadius, colors, fontSize, spacing } from '../../../utils/theme';
import HeaderV2 from '../../../components/headerv2';
import { useNavigation } from '@react-navigation/native';
import PopupWrapper, { PopupWrapperRef } from '../../../components/PopupWrapper';
import TaskFilterPopup from '../../../components/TaskFilterPopup';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  status: 'upcoming' | 'overdue' | 'no_due_date';
  userInitials?: string;
  backgroundColor?: string;
  priority?: 'high' | 'medium' | 'low';
}

interface TaskFilter {
  id: string;
  label: string;
  value: 'upcoming' | 'overdue' | 'no_due_date';
  count: number;
}

const TaskScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState<
    'upcoming' | 'overdue' | 'no_due_date'
  >('upcoming');
  const [tasks, setTasks] = useState<Task[]>([]);
  const horizontalFilterRef = useRef(null);
  const filterPopupRef = useRef<PopupWrapperRef>(null);
  const navigation = useNavigation();
  // Dummy data to load when FAB is pressed
  const dummyTasks: Task[] = [
    {
      id: '1',
      title: 'Aaj meeting karni hay',
      description: 'Important client presentation',
      dueDate: 'Today, Aug 7',
      status: 'upcoming',
      userInitials: 'SS',
      backgroundColor: colors.secondary,
      priority: 'high',
    },
    {
      id: '2',
      title: 'Complete project documentation',
      description: 'Finalize API documentation',
      dueDate: 'Yesterday',
      status: 'overdue',
      userInitials: 'AB',
      backgroundColor: colors.primary,
      priority: 'high',
    },
    {
      id: '3',
      title: 'Review code changes',
      description: 'Check pull requests',
      dueDate: 'Tomorrow, Aug 8',
      status: 'upcoming',
      userInitials: 'CD',
      backgroundColor: '#FF6B6B',
      priority: 'medium',
    },
    {
      id: '4',
      title: 'Team standup meeting',
      description: 'Daily sync with development team',
      status: 'no_due_date',
      userInitials: 'EF',
      backgroundColor: '#4ECDC4',
      priority: 'low',
    },
    {
      id: '5',
      title: 'Update dependencies',
      description: 'Upgrade React Native version',
      dueDate: '2 days ago',
      status: 'overdue',
      userInitials: 'GH',
      backgroundColor: '#45B7D1',
      priority: 'medium',
    },
    {
      id: '6',
      title: 'Design new features',
      description: 'Create mockups for user dashboard',
      status: 'no_due_date',
      userInitials: 'IJ',
      backgroundColor: '#96CEB4',
      priority: 'low',
    },
  ];

  // Calculate filter counts
  const getFilterCounts = (taskList: Task[]) => {
    return {
      upcoming: taskList.filter(task => task.status === 'upcoming').length,
      overdue: taskList.filter(task => task.status === 'overdue').length,
      no_due_date: taskList.filter(task => task.status === 'no_due_date')
        .length,
    };
  };

  const counts = getFilterCounts(tasks);

  const filters: TaskFilter[] = [
    { id: '1', label: 'Upcoming', value: 'upcoming', count: counts.upcoming },
    { id: '2', label: 'Overdue', value: 'overdue', count: counts.overdue },
    {
      id: '3',
      label: 'No due date',
      value: 'no_due_date',
      count: counts.no_due_date,
    },
  ];

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter(task => task.status === selectedFilter);

  const handleFilterPress = (
    filterValue: 'upcoming' | 'overdue' | 'no_due_date',
    index: number,
  ) => {
    setSelectedFilter(filterValue);

    // Scroll to selected filter
    if (horizontalFilterRef.current) {
      horizontalFilterRef.current.scrollToIndex({
        index: index,
        animated: true,
        viewPosition: 0.5,
      });
    }
  };

  const handleFabPress = () => {
    setTasks(dummyTasks);
  };

  const handleTaskPress = item => {
    navigation.navigate('TaskDetails', { task: item });
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return '#FF6B6B';
      case 'medium':
        return '#FFD93D';
      case 'low':
        return '#6BCF7F';
      default:
        return colors.textSecondary;
    }
  };

  const renderFilterItem = ({
    item,
    index,
  }: {
    item: TaskFilter;
    index: number;
  }) => {
    const isSelected = item.value === selectedFilter;

    return (
      <TouchableOpacity
        style={[styles.filterItem, isSelected && styles.selectedFilterItem]}
        onPress={() => handleFilterPress(item.value, index)}
      >
        <Text
          style={[styles.filterText, isSelected && styles.selectedFilterText]}
        >
          {item.label}
        </Text>
        {item.count > 0 && (
          <View
            style={[styles.countBadge, isSelected && styles.selectedCountBadge]}
          >
            <Text
              style={[styles.countText, isSelected && styles.selectedCountText]}
            >
              {item.count}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderTaskItem = ({ item }: { item: Task }) => (
    <TouchableOpacity
      onPress={() => handleTaskPress(item)}
      style={styles.taskItem}
      activeOpacity={0.7}
    >
      <View style={styles.taskContent}>
        {item.userInitials && (
          <View
            style={[
              styles.userAvatar,
              { backgroundColor: item.backgroundColor || colors.secondary },
            ]}
          >
            <Text style={styles.userInitials}>{item.userInitials}</Text>
          </View>
        )}

        <View style={styles.taskTextContainer}>
          <View style={styles.taskHeader}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            {item.priority && (
              <View
                style={[
                  styles.priorityDot,
                  { backgroundColor: getPriorityColor(item.priority) },
                ]}
              />
            )}
          </View>
          <Text style={styles.taskDescription}>{item.description}</Text>
          {item.dueDate && (
            <Text
              style={[
                styles.taskDueDate,
                item.status === 'overdue' && styles.overdueDueDate,
              ]}
            >
              Due {item.dueDate}
            </Text>
          )}
        </View>

        <View style={styles.taskActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon
              name="ellipsis-vertical"
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
      <Icon
        name={
          selectedFilter === 'upcoming'
            ? 'time-outline'
            : selectedFilter === 'overdue'
              ? 'alert-circle-outline'
              : 'document-text-outline'
        }
        size={64}
        color={colors.textSecondary}
      />
      <Text style={styles.emptyStateTitle}>
        {selectedFilter === 'upcoming'
          ? 'No upcoming tasks'
          : selectedFilter === 'overdue'
            ? 'No overdue tasks'
            : 'No tasks without due date'}
      </Text>
      <Text style={styles.emptyStateSubtitle}>
        {tasks.length === 0
          ? 'Tap the + button to load sample tasks'
          : `All ${selectedFilter.replace('_', ' ')} tasks are completed!`}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <HeaderV2 title="Tasks" handleFilterPress={() => filterPopupRef.current?.show()} />

      {/* Horizontal Filter Tabs */}
      <View style={styles.filterContainer}>
        <FlatList
          ref={horizontalFilterRef}
          data={filters}
          renderItem={renderFilterItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContent}
          getItemLayout={(data, index) => ({
            length: 120,
            offset: 120 * index,
            index,
          })}
          onScrollToIndexFailed={() => { }}
        />
      </View>

      {/* Task List */}
      <View style={styles.taskListContainer}>
        {filteredTasks.length > 0 ? (
          <FlatList
            data={filteredTasks}
            renderItem={renderTaskItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.taskListContent}
          />
        ) : (
          renderEmptyState()
        )}
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleFabPress}>
        <Icon name="add" size={24} color={colors.white} />
      </TouchableOpacity>
      <PopupWrapper
        ref={filterPopupRef}
      >
        <TaskFilterPopup />
      </PopupWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  filterContainer: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray700,
  },
  filterContent: {
    paddingHorizontal: spacing.md,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    marginRight: spacing.md,
    backgroundColor: 'transparent',
    borderRadius: borderRadius.full,
    minWidth: 100,
    justifyContent: 'center',
  },
  selectedFilterItem: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  selectedFilterText: {
    color: colors.white,
  },
  countBadge: {
    backgroundColor: colors.gray700,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: spacing.xs,
    minWidth: 20,
    alignItems: 'center',
  },
  selectedCountBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  countText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  selectedCountText: {
    color: colors.white,
  },
  taskListContainer: {
    flex: 1,
  },
  taskListContent: {
    paddingBottom: 100, // Space for FAB
  },
  taskItem: {
    marginHorizontal: spacing.lg,
    marginVertical: spacing.xs,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  userInitials: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  taskTextContainer: {
    flex: 1,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  taskTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: spacing.sm,
  },
  taskDescription: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  taskDueDate: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  overdueDueDate: {
    color: '#FF6B6B',
    fontWeight: '500',
  },
  taskActions: {
    marginLeft: spacing.md,
  },
  actionButton: {
    padding: spacing.sm,
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

export default TaskScreen;

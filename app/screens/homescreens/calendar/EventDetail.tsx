import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { colors, fontSize, spacing } from '../../../utils/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import TaskCard from '../../../components/TaskCard';

const EventDetail = ({ route }) => {
  const event = route.params?.event;
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
      <View style={styles.matterInfo}>
        <Text style={styles.matterNumber}>
          {event.id} - {event.title}
        </Text>
        <Text style={styles.subtitle}>Monday,August 20 at 04:30-5 PM</Text>
        <Text style={styles.matterDescription}>{event.dueDate}</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.matterNumber}>Task Details</Text>

        <TaskCard
          title="Location"
          subtitle="No Location Given"
          icon="location-outline"
          color="#2D9CDB"
        />

        <TaskCard
          title="Time of Event"
          subtitle={event.time}
          icon="document-text-outline"
          color="#4CAF50"
        />
        <TaskCard
          title="Related matter"
          subtitle={'20004-Meeting Matter'}
          icon="briefcase-outline"
          color="#4CAF50"
        />
      </View>
    </View>
  );
};

export default EventDetail;

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
  subtitle: {
    color: 'white',
  },
  bottomContainer: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
});

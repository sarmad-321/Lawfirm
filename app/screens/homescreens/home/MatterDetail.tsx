import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, fontSize, borderRadius } from '../../../utils/theme';
import { useNavigation } from '@react-navigation/native';

interface ActionCard {
  id: string;
  title: string;
  icon: string;
  backgroundColor: string;
  onPress: () => void;
}

interface MatterContent {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  iconColor: string;
  onPress: () => void;
}

interface Contact {
  id: string;
  name: string;
  role: string;
  initials: string;
  backgroundColor: string;
}

const MatterDetailsScreen: React.FC = ({ route }) => {
  const matter = route.params?.matter;
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleEditPress = () => {
    console.log('Edit pressed');
  };

  // Action cards data
  const actionCards: ActionCard[] = [
    {
      id: '1',
      title: 'Event',
      icon: 'calendar',
      backgroundColor: colors.secondary,
      onPress: () => console.log('Event pressed'),
    },
    {
      id: '2',
      title: 'Time entry',
      icon: 'time',
      backgroundColor: colors.info,
      onPress: () => console.log('Time entry pressed'),
    },
    {
      id: '3',
      title: 'Expense',
      icon: 'receipt',
      backgroundColor: colors.secondary,
      onPress: () => console.log('Expense pressed'),
    },
    {
      id: '4',
      title: 'Task',
      icon: 'checkmark-circle',
      backgroundColor: colors.secondary,
      onPress: () => console.log('Task pressed'),
    },
    {
      id: '5',
      title: 'Note',
      icon: 'document-text',
      backgroundColor: colors.secondary,
      onPress: () => console.log('Note pressed'),
    },
  ];

  // Matter contents data
  const matterContents: MatterContent[] = [
    {
      id: '1',
      title: 'Activities',
      subtitle: 'Time entries and expenses',
      icon: 'time',
      iconColor: colors.info,
      onPress: () => console.log('Activities pressed'),
    },
    {
      id: '2',
      title: 'Notes',
      subtitle: '',
      icon: 'document-text',
      iconColor: colors.info,
      onPress: () => console.log('Notes pressed'),
    },
    {
      id: '3',
      title: 'Documents',
      subtitle: '',
      icon: 'folder',
      iconColor: colors.info,
      onPress: () => console.log('Documents pressed'),
    },
    {
      id: '4',
      title: 'Bills',
      subtitle: '',
      icon: 'receipt',
      iconColor: colors.info,
      onPress: () => console.log('Bills pressed'),
    },
    {
      id: '5',
      title: 'Communication logs',
      subtitle: '',
      icon: 'chatbubble',
      iconColor: colors.info,
      onPress: () => console.log('Communication logs pressed'),
    },
    {
      id: '6',
      title: 'Calendar events',
      subtitle: '',
      icon: 'calendar',
      iconColor: colors.info,
      onPress: () => console.log('Calendar events pressed'),
    },
    {
      id: '7',
      title: 'Tasks',
      subtitle: '',
      icon: 'list',
      iconColor: colors.info,
      onPress: () => console.log('Tasks pressed'),
    },
  ];

  // Contact details data
  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Atta Rahi Mubasshir',
      role: 'Boss',
      initials: 'AM',
      backgroundColor: '#FF6B35',
    },
  ];

  const renderActionCard = ({ item }: { item: ActionCard }) => (
    <TouchableOpacity
      style={[styles.actionCard, { backgroundColor: item.backgroundColor }]}
      onPress={item.onPress}
      activeOpacity={0.8}
    >
      <Icon name={item.icon} size={24} color={colors.white} />
      <Text style={styles.actionCardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderMatterContent = ({ item }: { item: MatterContent }) => (
    <TouchableOpacity
      style={styles.matterContentItem}
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.matterContentLeft}>
        <View
          style={[
            styles.matterIconContainer,
            { backgroundColor: item.iconColor + '20' },
          ]}
        >
          <Icon name={item.icon} size={20} color={item.iconColor} />
        </View>
        <View style={styles.matterTextContainer}>
          <Text style={styles.matterContentTitle}>{item.title}</Text>
          {item.subtitle ? (
            <Text style={styles.matterContentSubtitle}>{item.subtitle}</Text>
          ) : null}
        </View>
      </View>
      <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  const renderContact = ({ item }: { item: Contact }) => (
    <View style={styles.contactItem}>
      <View
        style={[
          styles.contactAvatar,
          { backgroundColor: item.backgroundColor },
        ]}
      >
        <Text style={styles.contactInitials}>{item.initials}</Text>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactRole}>{item.role}</Text>
        <Text style={styles.contactName}>{item.name}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEditPress}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.matterInfo}>
        <Text style={styles.matterNumber}>
          {matter.id} - {matter.title}
        </Text>
        <Text style={styles.matterDescription}>{matter.description}</Text>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Matter Info */}

        {/* Action Cards Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add to this matter</Text>
          <FlatList
            data={actionCards}
            renderItem={renderActionCard}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.actionCardsContainer}
            ItemSeparatorComponent={() => (
              <View style={{ width: spacing.md }} />
            )}
          />
        </View>

        {/* Matter Contents Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Matter contents</Text>
          <View style={styles.matterContentsContainer}>
            <FlatList
              data={matterContents}
              renderItem={renderMatterContent}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </View>

        {/* Contact Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact details</Text>
          <View style={styles.contactsContainer}>
            <FlatList
              data={contacts}
              renderItem={renderContact}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </View>
        </View>

        {/* Bottom spacing for safe area */}
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
    paddingBottom: spacing.md,
  },
  backButton: {
    padding: spacing.sm,
  },
  editButton: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    padding: spacing.sm,
  },
  content: {
    flex: 1,
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
  section: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: '600',
    marginBottom: spacing.lg,
  },
  actionCardsContainer: {
    paddingRight: spacing.lg,
  },
  actionCard: {
    width: 70,
    height: 70,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  actionCardText: {
    color: colors.white,
    fontSize: fontSize.xs,
    textAlign: 'center',
    marginTop: spacing.xs,
    fontWeight: '500',
  },
  matterContentsContainer: {
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  matterContentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  matterContentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  matterIconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  matterTextContainer: {
    flex: 1,
  },
  matterContentTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    marginBottom: 2,
  },
  matterContentSubtitle: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  separator: {
    height: 1,
    backgroundColor: colors.gray700,
    marginHorizontal: spacing.lg,
  },
  contactsContainer: {
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  contactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  contactInitials: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: '600',
  },
  contactInfo: {
    flex: 1,
  },
  contactRole: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginBottom: 2,
  },
  contactName: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
  },
});

export default MatterDetailsScreen;

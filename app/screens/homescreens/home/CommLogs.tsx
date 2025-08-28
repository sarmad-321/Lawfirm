import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, fontSize, borderRadius } from '../../../utils/theme';
import { useNavigation } from '@react-navigation/native';
import TaskCard from '../../../components/TaskCard';

interface Comms {
  id: string;
  title: string;
  date: string;
  author: string;
  authorInitials: string;
  backgroundColor: string;
  description: string; // Optional for communication logs
}

const CommLogs: React.FC = ({ route }) => {
  const navigation = useNavigation();
  const matter = route.params?.matter;
  const [searchQuery, setSearchQuery] = useState('');

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleFilterPress = () => {
    console.log('Filter pressed');
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  // Sample notes data
  const CommsData: Comms[] = [
    {
      id: '1',
      title: 'Paul Walker',
      date: 'Today, Aug 22',
      author: 'paul walker',
      authorInitials: 'PW',
      description: 'Phone call regarding case updates and evidence review',
      backgroundColor: '#00BCD4',
    },
    {
      id: '2',
      title: 'Sarah Johnson',
      date: 'Today, Aug 22',
      author: 'sarah johnson',
      authorInitials: 'SJ',
      description: 'Email correspondence about witness testimonies',
      backgroundColor: '#FF6B35',
    },
    {
      id: '3',
      title: 'Michael Chen',
      date: 'Today, Aug 22',
      author: 'michael chen',
      authorInitials: 'MC',
      description: 'Video conference with expert witness Dr. Smith',
      backgroundColor: '#9C27B0',
    },
    {
      id: '4',
      title: 'Detective Martinez',
      date: 'Yesterday, Aug 21',
      author: 'detective martinez',
      authorInitials: 'DM',
      description: 'In-person meeting at police station - case file review',
      backgroundColor: '#4CAF50',
    },
    {
      id: '5',
      title: 'Lisa Thompson',
      date: 'Yesterday, Aug 21',
      author: 'lisa thompson',
      authorInitials: 'LT',
      description: 'Client consultation via phone call - 45 minutes',
      backgroundColor: '#FF9800',
    },
  ];

  // Filter notes based on search query
  const filteredNotes = CommsData.filter(
    note =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.author.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderNote = ({ item }: { item: Note }) => (
    <TaskCard
      title={item.title}
      subtitle={item.description}
      icon="chatbubble"
    />
  );

  const renderDateSection = (date: string, notes: Note[]) => (
    <View style={styles.dateSection}>
      <Text style={styles.dateSectionTitle}>{date}</Text>
      <FlatList
        data={notes}
        renderItem={renderNote}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.noteSeparator} />}
      />
    </View>
  );

  // Group notes by date
  const notesByDate = filteredNotes.reduce((groups, note) => {
    const date = note.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(note);
    return groups;
  }, {} as Record<string, Note[]>);

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.headerButton}>
          <Icon name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Communication Logs</Text>
          <Text style={styles.headerSubtitle}>
            {matter?.id || '00001'} - {matter?.title || 'nick'}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleFilterPress}
          style={styles.headerButton}
        >
          <Icon name="options" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Icon name="search" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Filter notes by keyword..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={handleSearchChange}
            />
          </View>
        </View>

        {/* Notes Content */}
        <ScrollView
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {Object.keys(notesByDate).length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No notes found</Text>
            </View>
          ) : (
            Object.entries(notesByDate).map(([date, notes]) =>
              renderDateSection(date, notes),
            )
          )}

          {/* Bottom spacing */}
          <View style={{ height: 50 }} />
        </ScrollView>
      </View>
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
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
  headerButton: {
    padding: spacing.sm,
    width: 40,
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: '600',
  },
  headerSubtitle: {
    color: colors.white,
    fontSize: fontSize.sm,
    opacity: 0.8,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  searchBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  searchInput: {
    flex: 1,
    color: colors.white,
    fontSize: fontSize.md,
    marginLeft: spacing.sm,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  dateSection: {
    marginTop: spacing.lg,
  },
  dateSectionTitle: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    fontWeight: '500',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  noteItem: {
    backgroundColor: colors.surfaceLight,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  noteContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  authorInitials: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  noteTextContainer: {
    flex: 1,
  },
  noteTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    lineHeight: 20,
  },
  noteSeparator: {
    height: spacing.sm,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: spacing.xxxl,
  },
  emptyStateText: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
  },
});

export default CommLogs;

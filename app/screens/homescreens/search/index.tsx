import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, borderRadius, fontSize } from '../../../utils/theme';

interface RecentMatter {
  id: string;
  title: string;
  description: string;
  client: string;
  status: 'Active' | 'Pending' | 'Review';
  priority: 'High' | 'Medium' | 'Low';
  lastActivity: string;
}

interface RecentContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  initials: string;
  type: string;
}

const sampleMatters: RecentMatter[] = [
  {
    id: '00001-wick',
    title: 'Murder case',
    description: 'Criminal defense case',
    client: 'John Wick',
    status: 'Active',
    priority: 'High',
    lastActivity: '2 hours ago',
  },
  {
    id: '00002-smith',
    title: 'Contract dispute',
    description: 'Commercial litigation',
    client: 'Sarah Smith',
    status: 'Pending',
    priority: 'Medium',
    lastActivity: '1 day ago',
  },
  {
    id: '00003-jones',
    title: 'Property litigation',
    description: 'Real estate dispute',
    client: 'Michael Jones',
    status: 'Review',
    priority: 'Low',
    lastActivity: '3 days ago',
  },
];

const sampleContacts: RecentContact[] = [
  {
    id: '1',
    name: 'john wick',
    email: 'random@gmail.com',
    phone: '+1 (555) 123-4567',
    initials: 'JW',
    type: 'Client',
  },
  {
    id: '2',
    name: 'Sarah Smith',
    email: 'sarah.smith@email.com',
    phone: '+1 (555) 987-6543',
    initials: 'SS',
    type: 'Client',
  },
  {
    id: '3',
    name: 'Michael Jones',
    email: 'mjones@company.com',
    phone: '+1 (555) 456-7890',
    initials: 'MJ',
    type: 'Witness',
  },
];

const searchCategories = [
  { name: 'Matters', icon: 'briefcase-outline' },
  { name: 'Contacts', icon: 'person-outline' },
  { name: 'Events', icon: 'calendar-outline' },
  { name: 'Documents', icon: 'document-text-outline' },
  { name: 'Tasks', icon: 'list-outline' },
  { name: 'Time entries', icon: 'time-outline' },
  { name: 'Expenses', icon: 'cash-outline' },
  { name: 'Notes', icon: 'create-outline' },
];

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<
    'results' | 'matters' | 'contacts'
  >('results');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setIsSearching(text.length > 0);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  const handleMatterPress = (matter: RecentMatter) => {
    console.log('Matter pressed:', matter);
  };

  const handleContactPress = (contact: RecentContact) => {
    console.log('Contact pressed:', contact);
  };

  const filteredMatters = searchQuery
    ? sampleMatters.filter(
        matter =>
          matter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          matter.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          matter.client.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  const filteredContacts = searchQuery
    ? sampleContacts.filter(
        contact =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  const renderStatusBar = () => (
    <StatusBar
      barStyle="light-content"
      backgroundColor={colors.primary}
      translucent={false}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.statusBar}>
        <Text style={styles.time}>1:40</Text>
        <View style={styles.statusIcons}>
          <Icon name="wifi" size={16} color={colors.textPrimary} />
          <Icon name="cellular" size={16} color={colors.textPrimary} />
          <Icon name="battery-half" size={16} color={colors.textPrimary} />
          <Text style={styles.battery}>76%</Text>
        </View>
      </View>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color={colors.primaryLight} />
        <TextInput
          style={styles.searchInput}
          placeholder={isSearching ? searchQuery || 'Hard' : 'Search Clio...'}
          placeholderTextColor={colors.primaryLight}
          value={searchQuery}
          onChangeText={handleSearch}
          autoCapitalize="none"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Icon name="close-circle" size={20} color={colors.primaryLight} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabsContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'results' && styles.activeTab]}
        onPress={() => setActiveTab('results')}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'results' && styles.activeTabText,
          ]}
        >
          results
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'matters' && styles.activeTab]}
        onPress={() => setActiveTab('matters')}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'matters' && styles.activeTabText,
          ]}
        >
          Matters
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'contacts' && styles.activeTab]}
        onPress={() => setActiveTab('contacts')}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'contacts' && styles.activeTabText,
          ]}
        >
          Contacts
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderCategorySection = (
    category,
    hasResults = false,
    results = [],
  ) => (
    <View style={styles.categorySection}>
      <View style={styles.categoryHeader}>
        <View style={styles.categoryTitleContainer}>
          <Icon
            name={
              searchCategories.find(cat => cat.name === category.name)?.icon ||
              'document-outline'
            }
            size={16}
            color={colors.textSecondary}
          />
          <Text style={styles.categoryTitle}>{category.name}</Text>
        </View>
        {hasResults && results.length > 0 && (
          <Text style={styles.resultCount}>{results.length}</Text>
        )}
      </View>

      <View style={styles.categoryCard}>
        {hasResults && results.length > 0 ? (
          results.map((item, index) => (
            <TouchableOpacity
              key={item.id || index}
              style={[styles.resultItem, index > 0 && styles.resultItemBorder]}
              onPress={() =>
                category.name === 'Matters'
                  ? handleMatterPress(item)
                  : handleContactPress(item)
              }
            >
              {category.name === 'Matters' ? (
                <View style={styles.resultContent}>
                  <View style={styles.matterHeader}>
                    <Text style={styles.matterId}>{item.id}</Text>
                    <View
                      style={[
                        styles.priorityBadge,
                        item.priority === 'High' && styles.priorityHigh,
                        item.priority === 'Medium' && styles.priorityMedium,
                        item.priority === 'Low' && styles.priorityLow,
                      ]}
                    >
                      <Text style={styles.priorityText}>{item.priority}</Text>
                    </View>
                  </View>
                  <Text style={styles.matterTitle}>{item.title}</Text>
                  <Text style={styles.matterClient}>{item.client}</Text>
                  <View style={styles.matterFooter}>
                    <View
                      style={[
                        styles.statusBadge,
                        item.status === 'Active' && styles.statusActive,
                        item.status === 'Pending' && styles.statusPending,
                        item.status === 'Review' && styles.statusReview,
                      ]}
                    >
                      <Text style={styles.statusText}>{item.status}</Text>
                    </View>
                    <Text style={styles.lastActivity}>{item.lastActivity}</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.contactContent}>
                  <View style={styles.contactAvatar}>
                    <Text style={styles.contactInitials}>{item.initials}</Text>
                  </View>
                  <View style={styles.contactInfo}>
                    <View style={styles.contactNameRow}>
                      <Text style={styles.contactName}>{item.name}</Text>
                      <View style={styles.contactTypeBadge}>
                        <Text style={styles.contactTypeText}>{item.type}</Text>
                      </View>
                    </View>
                    <View style={styles.contactDetail}>
                      <Icon
                        name="mail-outline"
                        size={14}
                        color={colors.textSecondary}
                      />
                      <Text style={styles.contactEmail}>{item.email}</Text>
                    </View>
                    <View style={styles.contactDetail}>
                      <Icon
                        name="call-outline"
                        size={14}
                        color={colors.textSecondary}
                      />
                      <Text style={styles.contactPhone}>{item.phone}</Text>
                    </View>
                  </View>
                  <View style={styles.contactActions}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.callButton]}
                    >
                      <Icon name="call" size={16} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.emailButton]}
                    >
                      <Icon name="mail" size={16} color={colors.textPrimary} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No results</Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderSearchResults = () => {
    const categoriesWithResults = [
      {
        name: 'Matters',
        hasResults: filteredMatters.length > 0,
        results: filteredMatters,
      },
      {
        name: 'Contacts',
        hasResults: filteredContacts.length > 0,
        results: filteredContacts,
      },
      ...searchCategories
        .slice(2)
        .map(cat => ({ name: cat.name, hasResults: false, results: [] })),
    ];

    return (
      <ScrollView
        style={styles.resultsContainer}
        showsVerticalScrollIndicator={false}
      >
        {categoriesWithResults.map(category =>
          renderCategorySection(
            category,
            category.hasResults,
            category.results,
          ),
        )}
      </ScrollView>
    );
  };

  const renderMatterCard = ({ item }) => (
    <TouchableOpacity
      style={styles.matterCard}
      onPress={() => handleMatterPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.matterHeader}>
        <Text style={styles.matterId}>{item.id}</Text>
        <View
          style={[
            styles.priorityBadge,
            item.priority === 'High' && styles.priorityHigh,
            item.priority === 'Medium' && styles.priorityMedium,
            item.priority === 'Low' && styles.priorityLow,
          ]}
        >
          <Text style={styles.priorityText}>{item.priority}</Text>
        </View>
      </View>
      <Text style={styles.matterTitle}>{item.title}</Text>
      <Text style={styles.matterClient}>{item.client}</Text>
      <View style={styles.matterFooter}>
        <View
          style={[
            styles.statusBadge,
            item.status === 'Active' && styles.statusActive,
            item.status === 'Pending' && styles.statusPending,
            item.status === 'Review' && styles.statusReview,
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
        <Text style={styles.lastActivity}>{item.lastActivity}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderContactCard = ({ item }) => (
    <TouchableOpacity
      style={styles.contactCard}
      onPress={() => handleContactPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.contactAvatar}>
        <Text style={styles.contactInitials}>{item.initials}</Text>
      </View>
      <View style={styles.contactInfo}>
        <View style={styles.contactNameRow}>
          <Text style={styles.contactName}>{item.name}</Text>
          <View style={styles.contactTypeBadge}>
            <Text style={styles.contactTypeText}>{item.type}</Text>
          </View>
        </View>
        <View style={styles.contactDetail}>
          <Icon name="mail-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.contactEmail}>{item.email}</Text>
        </View>
        <View style={styles.contactDetail}>
          <Icon name="call-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.contactPhone}>{item.phone}</Text>
        </View>
      </View>
      <View style={styles.contactActions}>
        <TouchableOpacity style={[styles.actionButton, styles.callButton]}>
          <Icon name="call" size={16} color={colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.emailButton]}>
          <Icon name="mail" size={16} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderInitialView = () => (
    <ScrollView
      style={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Recent Matters */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent matters</Text>
          <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
        </View>
        <FlatList
          data={sampleMatters}
          renderItem={renderMatterCard}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>

      {/* Recent Contacts */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent contacts</Text>
          <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
        </View>
        <FlatList
          data={sampleContacts}
          renderItem={renderContactCard}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color={colors.white} />
          <TextInput
            style={styles.searchInput}
            placeholder={'Search Clio...'}
            placeholderTextColor={colors.primaryLight}
            value={searchQuery}
            onChangeText={handleSearch}
            autoCapitalize="none"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Icon name="close-circle" size={20} color={colors.primaryLight} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Tabs - only show when searching */}
      {isSearching && renderTabs()}

      {/* Content */}
      {isSearching ? renderSearchResults() : renderInitialView()}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: spacing.sm,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  time: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  battery: {
    color: colors.textPrimary,
    fontSize: fontSize.sm,
    marginLeft: spacing.xs,
  },
  searchContainer: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  searchBar: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: spacing.lg,
    // paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    fontWeight: '400',
  },
  clearButton: {
    padding: spacing.xs,
  },
  tabsContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    flexDirection: 'row',
    backgroundColor: colors.backgroundDark,
    borderRadius: borderRadius.md,
    padding: spacing.xs,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    color: colors.primaryLight,
    fontSize: fontSize.sm,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  activeTabText: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: '600',
  },
  separator: {
    height: spacing.sm,
  },
  matterCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.gray700,
  },
  matterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  matterId: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    fontFamily: 'monospace',
  },
  matterTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  matterClient: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginBottom: spacing.md,
  },
  matterFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priorityBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  priorityHigh: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  priorityMedium: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
  },
  priorityLow: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
  },
  priorityText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  statusActive: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
  },
  statusPending: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
  },
  statusReview: {
    backgroundColor: 'rgba(168, 85, 247, 0.2)',
  },
  statusText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  lastActivity: {
    color: colors.textTertiary,
    fontSize: fontSize.xs,
  },
  contactCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.gray700,
  },
  contactContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  contactInitials: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  contactInfo: {
    flex: 1,
  },
  contactNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  contactName: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '600',
    marginRight: spacing.sm,
  },
  contactTypeBadge: {
    backgroundColor: colors.gray700,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  contactTypeText: {
    color: colors.textSecondary,
    fontSize: fontSize.xs,
    fontWeight: '500',
  },
  contactDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  contactEmail: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginLeft: spacing.xs,
  },
  contactPhone: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginLeft: spacing.xs,
  },
  contactActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callButton: {
    backgroundColor: colors.primary,
  },
  emailButton: {
    backgroundColor: colors.success,
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  categorySection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  categoryTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  resultCount: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  categoryCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.gray700,
    overflow: 'hidden',
  },
  resultItem: {
    padding: spacing.lg,
  },
  resultItemBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.gray700,
  },
  resultContent: {
    flex: 1,
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  noResultsText: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.gray700,
    paddingBottom: spacing.sm,
    paddingTop: spacing.sm,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  navLabel: {
    color: colors.textSecondary,
    fontSize: fontSize.xs,
    marginTop: spacing.xs,
    fontWeight: '500',
  },
  activeNavLabel: {
    color: colors.primary,
    fontWeight: '600',
  },
});

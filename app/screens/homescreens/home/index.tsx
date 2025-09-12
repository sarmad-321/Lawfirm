import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/header';
import {
  borderRadius,
  colors,
  fontSize,
  shadow,
  spacing,
} from '../../../utils/theme';
import PopupWrapper, {
  PopupWrapperRef,
} from '../../../components/PopupWrapper';
import CreatePopup from '../../../components/CreatePopup';
import MatterFilter from '../../../components/MatterFilters';
import SearchComponent from '../../../components/SearchComponent';

interface Matter {
  id: string;
  title: string;
  description: string;
  date: string;
  author?: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

const HomeScreen: React.FC = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'matters' | 'contacts'>('matters');
  const [searchQuery, setSearchQuery] = useState('');
  const [hasData, setHasData] = useState(false);
  const createPopupRef = React.useRef<PopupWrapperRef>(null);
  const filterPopupRef = React.useRef<PopupWrapperRef>(null);
  // Sample data - replace with your actual data
  const [matters] = useState<Matter[]>([
    {
      id: '00001-Crime report',
      title: 'Mobile got snatched',
      description: '',
      date: 'Today',
    },
    {
      id: '00001-Crime report',
      title: 'Mobile got snatched',
      description: '',
      date: '',
      author: 'Atta Rabi Mubasshir',
    },
    {
      id: '00002-Rizwan',
      title: 'Will be fired from job',
      description: 'Case of murder of a collegue',
      date: '12/3/2002',
      author: 'sarmad shakeel',
    },
  ]);

  const [contacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Atta Rabi Mubasshir',
      email: 'attaRabi@gmail.com',
    },
  ]);

  const handleSettingsPress = () => {
    console.log('Settings pressed');
    navigation.navigate('Settings');
  };

  const handleNotificationPress = () => {
    // console.log('Notification pressed');
    navigation.navigate('Notification');
  };

  const handleMessagePress = () => {
    console.log('Message pressed');
    navigation.navigate('Inbox');
  };

  const handleAddPress = () => {
    setHasData(true);
    setTimeout(() => {
      createPopupRef.current?.show();
    }, 1500);
    console.log('Add button pressed');
  };

  const handleFilterMatters = () => {
    console.log('Filter matters pressed');
    filterPopupRef.current?.show()

  };

  const renderMatterItem = (matter: Matter) => (
    <TouchableOpacity
      key={`${matter.id}-${matter.title}`}
      style={styles.matterItem}
      onPress={() => navigation.navigate('MatterDetail', { matter: matter })} // Assuming you have a navigation setup
    >
      <Text style={styles.matterTitle}>{matter.title}</Text>
      {matter.description && (
        <Text style={styles.matterDescription}>{matter.description}</Text>
      )}
      {matter.date && <Text style={styles.matterDate}>{matter.date}</Text>}
      {matter.author && (
        <View style={styles.authorContainer}>
          <Icon name="person-outline" size={12} color={colors.textSecondary} />
          <Text style={styles.authorText}>{matter.author}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderContactItem = (contact: Contact) => (
    <TouchableOpacity key={contact.id} style={styles.contactItem}>
      <Text style={styles.contactName}>{contact.name}</Text>
      <Text style={styles.contactEmail}>{contact.email}</Text>
      {contact.phone && (
        <Text style={styles.contactPhone}>{contact.phone}</Text>
      )}
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <View style={styles.emptyIconContainer}>
        <Icon name="folder-outline" size={80} color={colors.primaryLight} />
        <View style={styles.questionMarkContainer}>
          <Text style={styles.questionMark}>?</Text>
        </View>
      </View>
      <Text style={styles.emptyTitle}>You don't have any {activeTab} yet</Text>
      <Text style={styles.emptySubtitle}>
        Create a new {activeTab === 'matters' ? 'matter' : 'contact'} using the
        button below.
      </Text>
    </View>
  );

  const renderMattersContent = () => {
    const recentlyViewed = matters.filter(matter => matter.date === 'Today');
    const recentlyEdited = matters.filter(matter => matter.author);

    return (
      <ScrollView style={styles.scrollContainer}>
        {/* Search Bar */}
        <PopupWrapper>
          <MatterFilter />
        </PopupWrapper>

        <SearchComponent placeholder="Search all matters..." />

        {/* Recently Viewed Section */}
        {recentlyViewed.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recently viewed</Text>
            {recentlyViewed.map(matter => renderMatterItem(matter))}
          </View>
        )}

        {/* Recently Edited Section */}
        {recentlyEdited.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>All Matters</Text>
              <TouchableOpacity onPress={handleFilterMatters}>
                <Text style={styles.filterLink}>Filter matters</Text>
              </TouchableOpacity>
            </View>
            {recentlyEdited.map(matter => renderMatterItem(matter))}
          </View>
        )}
      </ScrollView>
    );
  };

  const renderContactsContent = () => {
    return (
      <ScrollView style={styles.scrollContainer}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon
            name="search-outline"
            size={20}
            color={colors.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search all contacts..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {hasData ? (
          contacts.map(renderContactItem)
        ) : (
          <View style={styles.emptyContentContainer}>{renderEmptyState()}</View>
        )}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onSettingsPress={handleSettingsPress}
        onNotificationPress={handleNotificationPress}
        onMessagePress={handleMessagePress}
      />

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'matters' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('matters')}
          activeOpacity={0.8}
        >
          <Icon
            name="checkmark"
            size={16}
            color={
              activeTab === 'matters'
                ? colors.textPrimary
                : colors.textSecondary
            }
            style={styles.tabIcon}
          />
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
          style={[
            styles.tabButton,
            activeTab === 'contacts' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('contacts')}
          activeOpacity={0.8}
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

      {/* Content Area */}
      <View style={styles.contentContainer}>
        {hasData
          ? activeTab === 'matters'
            ? renderMattersContent()
            : renderContactsContent()
          : renderEmptyState()}
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddPress}
        activeOpacity={0.8}
      >
        <Icon name="add" size={28} color={colors.textPrimary} />
      </TouchableOpacity>
      <PopupWrapper ref={filterPopupRef}>
        <MatterFilter />
      </PopupWrapper>
      <PopupWrapper ref={createPopupRef}>
        <CreatePopup />
      </PopupWrapper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.xxl,
    marginRight: spacing.lg,
    backgroundColor: colors.transparent,
  },
  activeTabButton: {
    backgroundColor: colors.primaryLight,
  },
  tabIcon: {
    marginRight: spacing.xs + 2,
  },
  tabText: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    fontWeight: '500',
  },
  activeTabText: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    marginVertical: spacing.lg,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: fontSize.md,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  filterLink: {
    color: colors.primaryLight || colors.primary,
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  matterItem: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  matterTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  matterDescription: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginBottom: spacing.xs,
  },
  matterDate: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  authorText: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginLeft: spacing.xs,
  },
  contactItem: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  contactName: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  contactEmail: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginBottom: spacing.xs,
  },
  contactPhone: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: spacing.xxxl,
  },
  emptyContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xxxl,
  },
  emptyIconContainer: {
    position: 'relative',
    marginBottom: spacing.xxl,
  },
  questionMarkContainer: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: borderRadius.md,
    backgroundColor: colors.textTertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionMark: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: 'bold',
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.xl,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    textAlign: 'center',
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.fabBackground,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadow.large,
  },
});

export default HomeScreen;

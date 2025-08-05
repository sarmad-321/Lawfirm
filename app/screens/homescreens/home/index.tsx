import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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

const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'matters' | 'contacts'>('matters');

  const handleSettingsPress = () => {
    console.log('Settings pressed');
  };

  const handleNotificationPress = () => {
    console.log('Notification pressed');
  };

  const handleMessagePress = () => {
    console.log('Message pressed');
  };

  const handleAddPress = () => {
    console.log('Add button pressed');
  };

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
      <View style={styles.contentContainer}>{renderEmptyState()}</View>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddPress}
        activeOpacity={0.8}
      >
        <Icon name="add" size={28} color={colors.textPrimary} />
      </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xxxl,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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

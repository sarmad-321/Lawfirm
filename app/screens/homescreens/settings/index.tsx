import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { borderRadius, colors, fontSize, spacing } from '../../../utils/theme';
import HeaderV2 from '../../../components/headerv2';
import { useNavigation } from '@react-navigation/native';

interface SettingsItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  iconBackground: string;
  hasChevron: boolean;
  isExternal?: boolean;
  onPress: () => void;
}

const SettingsScreen = () => {
  const navigation = useNavigation();

  const handleCustomization = () => {
    navigation.navigate('Customization');
  };

  const handleSecurity = () => {
    navigation.navigate('Security');
  };

  const handleNotifications = () => {
    // External link behavior
    Alert.alert('Notifications', 'Opening notification settings...');
  };

  const handleHelp = () => {
    navigation.navigate('Help');
  };

  const handleLeaveReview = () => {
    // External link behavior
    Alert.alert('Leave a Review', 'Opening app store...');
  };

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out of Clio?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          // Handle sign out logic
          console.log('User signed out');
        },
      },
    ]);
  };

  const handlePrivacyPolicy = () => {
    Alert.alert('Privacy Policy', 'Opening privacy policy...');
  };

  const handleLicenseAttribution = () => {
    Alert.alert('License Attribution', 'Opening license information...');
  };

  const settingsItems: SettingsItem[] = [
    {
      id: '1',
      title: 'Customization',
      subtitle: 'Customize your mobile app',
      iconName: 'color-palette',
      iconBackground: '#3B82F6',
      hasChevron: true,
      onPress: handleCustomization,
    },
    {
      id: '2',
      title: 'Security',
      subtitle: 'Protect your firm and client data',
      iconName: 'shield-checkmark',
      iconBackground: '#10B981',
      hasChevron: true,
      onPress: handleSecurity,
    },
    {
      id: '3',
      title: 'Notifications',
      subtitle: 'Tap to enable',
      iconName: 'notifications',
      iconBackground: '#F59E0B',
      hasChevron: false,
      isExternal: true,
      onPress: handleNotifications,
    },
    {
      id: '4',
      title: 'Help',
      subtitle: 'Get help from Clio Support',
      iconName: 'help-circle',
      iconBackground: '#8B5CF6',
      hasChevron: true,
      onPress: handleHelp,
    },
    {
      id: '5',
      title: 'Leave a review',
      subtitle: 'Rate and review this app',
      iconName: 'star',
      iconBackground: '#EF4444',
      hasChevron: false,
      isExternal: true,
      onPress: handleLeaveReview,
    },
  ];

  const renderUserProfile = () => (
    <View style={styles.userProfileContainer}>
      <View style={styles.userAvatar}>
        <Text style={styles.userInitials}>SS</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>sarmad shakeel</Text>
        <Text style={styles.userEmail}>Sarmad Shakeel Legal</Text>
        <Text style={styles.userEmailAddress}>sarmadshakeel2@gmail.com</Text>
      </View>
    </View>
  );

  const renderSettingsItem = (item: SettingsItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.settingsItem}
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingsItemContent}>
        <View style={[styles.iconContainer, { backgroundColor: '#3B82F6' }]}>
          <Icon name={item.iconName} size={20} color={colors.white} />
        </View>

        <View style={styles.settingsTextContainer}>
          <Text style={styles.settingsTitle}>{item.title}</Text>
          <Text style={styles.settingsSubtitle}>{item.subtitle}</Text>
        </View>

        {item.hasChevron ? (
          <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
        ) : item.isExternal ? (
          <Icon name="open-outline" size={20} color={colors.textSecondary} />
        ) : null}
      </View>
    </TouchableOpacity>
  );

  const renderSignOutButton = () => (
    <TouchableOpacity
      style={styles.signOutButton}
      onPress={handleSignOut}
      activeOpacity={0.7}
    >
      <Text style={styles.signOutText}>Sign out of Clio</Text>
    </TouchableOpacity>
  );

  const renderFooterLinks = () => (
    <View style={styles.footerLinksContainer}>
      <TouchableOpacity onPress={handlePrivacyPolicy}>
        <Text style={styles.footerLinkText}>Privacy policy</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLicenseAttribution}>
        <Text style={styles.footerLinkText}>License attribution</Text>
      </TouchableOpacity>

      <View style={styles.appVersionContainer}>
        <Text style={styles.appVersionLabel}>App version</Text>
        <Text style={styles.appVersionText}>2023/06/24 0.0.0(736309)</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <HeaderV2 title="Settings" showBackButton={true} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Profile Section */}
        {renderUserProfile()}

        {/* Settings Items */}
        <View style={styles.settingsSection}>
          {settingsItems.map(renderSettingsItem)}
        </View>

        {/* Sign Out Button */}
        {renderSignOutButton()}

        {/* Footer Links */}
        {renderFooterLinks()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: spacing.xl,
  },
  userProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
  },
  userAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  userInitials: {
    color: colors.white,
    fontSize: fontSize.xl,
    fontWeight: '600',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: fontSize.md,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 2,
  },
  userEmailAddress: {
    fontSize: fontSize.sm,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  settingsSection: {
    marginTop: spacing.md,
  },
  settingsItem: {
    marginHorizontal: spacing.lg,
    marginVertical: spacing.xs,
  },
  settingsItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.gray700,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  settingsTextContainer: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  settingsSubtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  signOutButton: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
    padding: spacing.lg,
    backgroundColor: 'transparent',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: '#EF4444',
    alignItems: 'center',
  },
  signOutText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: '#EF4444',
  },
  footerLinksContainer: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  footerLinkText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  appVersionContainer: {
    marginTop: spacing.sm,
  },
  appVersionLabel: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  appVersionText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
});

export default SettingsScreen;

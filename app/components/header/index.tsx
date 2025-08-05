import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, fontSize, spacing } from '../../utils/theme';

interface HeaderProps {
  onSettingsPress?: () => void;
  onNotificationPress?: () => void;
  onMessagePress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onSettingsPress,
  onNotificationPress,
  onMessagePress,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onSettingsPress}
          activeOpacity={0.7}
        >
          <Icon name="settings-outline" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Icon name="briefcase" size={20} color={colors.textPrimary} />
          <Text style={styles.logoText}>Clio</Text>
        </View>

        <View style={styles.rightIcons}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onNotificationPress}
            activeOpacity={0.7}
          >
            <Icon
              name="notifications-outline"
              size={24}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onMessagePress}
            activeOpacity={0.7}
          >
            <Icon name="mail-outline" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    padding: spacing.sm,
    borderRadius: spacing.xl,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logoText: {
    color: colors.textPrimary,
    fontSize: fontSize.xl,
    fontWeight: '700',
    marginLeft: spacing.sm,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Header;

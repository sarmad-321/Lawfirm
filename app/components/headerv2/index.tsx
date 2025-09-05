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
  title: string;
  handleFilterPress?: () => void;
}

const HeaderV2: React.FC<HeaderProps> = ({ title, handleFilterPress }) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <Text style={styles.screenTitle}>{title}</Text>

        <View style={styles.headerIcons}>
          <TouchableOpacity
            // onPress={handleFilterPress}
            style={styles.headerIconButton}
          >
            <Icon
              name="calendar-outline"
              size={24}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleFilterPress}
            style={styles.headerIconButton}
          >
            <Icon

              name="filter" size={24} color={colors.textPrimary} />
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
    paddingHorizontal: spacing.lg,
  },
  screenTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.xl,
    fontWeight: '500',
  },

  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconButton: {
    padding: spacing.sm,
    marginLeft: spacing.sm,
  },
});

export default HeaderV2;

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
import { vh } from '../../utils/units';

interface HeaderProps {
  title: string;
}

const BackHeader: React.FC<HeaderProps> = ({ title }) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <View
          style={{
            width: 25,
            height: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon name="arrow-back" size={20} color={colors.textPrimary} />
        </View>
        <Text style={styles.screenTitle}>{title}</Text>
        <View style={{ width: 25, height: 25 }}></View>
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
    paddingBottom: vh * 1.5,
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

export default BackHeader;

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { colors } from '../../utils/theme';

interface HeaderProps {
  title: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  leftIcon?: string;
  rightIcon?: string;
  leftText?: string;
  rightText?: string;
  backgroundColor?: string;
  showStatusBar?: boolean;
  statusBarStyle?: 'default' | 'light-content' | 'dark-content';
}

const FormsHeader: React.FC<HeaderProps> = ({
  title,
  onLeftPress,
  onRightPress,
  leftIcon = '×',
  rightIcon = '✓',
  leftText,
  rightText,
  backgroundColor = colors.primary,
  showStatusBar = true,
  statusBarStyle = 'light-content',
}) => {
  return (
    <>
      {showStatusBar && (
        <StatusBar
          barStyle={statusBarStyle}
          backgroundColor={backgroundColor}
        />
      )}
      <View style={[styles.header, { backgroundColor }]}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={onLeftPress}
          activeOpacity={0.7}
        >
          {leftText ? (
            <Text style={styles.headerButtonText}>{leftText}</Text>
          ) : (
            <Text style={styles.headerButtonText}>{leftIcon}</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{title}</Text>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={onRightPress}
          activeOpacity={0.7}
        >
          {rightText ? (
            <Text style={styles.headerButtonText}>{rightText}</Text>
          ) : (
            <Text style={styles.headerButtonText}>{rightIcon}</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default FormsHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  headerButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
});

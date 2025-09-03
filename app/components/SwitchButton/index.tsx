import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { colors } from '../../utils/theme';

interface SwitchRowProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  description: string;
  trackColor?: {
    false: string;
    true: string;
  };
  thumbColor?: {
    false: string;
    true: string;
  };
  labelStyle?: object;
  containerStyle?: object;
  switchStyle?: object;
}

const SwitchButton: React.FC<SwitchRowProps> = ({
  label,
  description,
  value,
  onValueChange,
  disabled = false,
  trackColor = { false: '#767577', true: '#2196f3' },
  thumbColor = { false: '#f4f3f4', true: '#ffffff' },
  labelStyle,
  containerStyle,
  switchStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={{ width: '80%' }}>
        <Text
          style={[styles.label, labelStyle, disabled && styles.disabledLabel]}
        >
          {label}
        </Text>
        <Text style={[styles.description]}>{description}</Text>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={trackColor}
        thumbColor={value ? thumbColor.true : thumbColor.false}
        style={[styles.switch, switchStyle]}
      />
    </View>
  );
};

export default SwitchButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.textSecondary,
    backgroundColor: colors.backgroundLight,
    minHeight: 60,
  },
  label: {
    color: 'white',
    fontSize: 14,
    flex: 1,
    marginRight: 16,
  },
  disabledLabel: {
    color: '#666',
  },
  switch: {
    // Additional switch styling can be added here if needed
  },
  description: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

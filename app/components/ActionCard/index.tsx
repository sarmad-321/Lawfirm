import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../utils/theme';

interface ActionCardProps {
  icon: string;
  title: string;
  backgroundColor: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const ActionCard: React.FC<ActionCardProps> = ({
  icon,
  title,
  backgroundColor,
  onPress,
  style,
}) => (
  <TouchableOpacity
    style={[styles.actionCard, { backgroundColor }, style]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Icon name={icon} size={24} color={colors.white} />
    <Text style={styles.actionCardText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  actionCard: {
    width: 70,
    height: 70,
    borderRadius: 16, // fallback, can be overridden by parent
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionCardText: {
    color: colors.white,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '500',
  },
});

export default ActionCard;

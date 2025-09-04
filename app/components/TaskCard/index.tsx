import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../utils/theme';

interface AssignedCardProps {
  title: string;
  subtitle: string;
  icon?: any; // image source (local or remote)
  initials?: string;
  color?: string; // background color for the avatar
}

const TaskCard: React.FC<AssignedCardProps> = ({
  title,
  subtitle,
  icon,
  initials,
  color,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.avatar, color && { backgroundColor: color }]}>
        {icon ? (
          <Icon name={icon} size={16} color={'white'} />
        ) : (
          <Text style={styles.initials}>{initials}</Text>
        )}
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    // backgroundColor: colors.backgroundLight,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2D9CDB', // fallback color
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  initials: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  textContainer: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 12,
    color: '#B0B0B0', // grayish text for "Assigned by"
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff', // or dark depending on theme
  },
});

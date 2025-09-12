import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../../../utils/theme';
import HeaderV2 from '../../../components/headerv2';
import Icon from 'react-native-vector-icons/Ionicons';

const Inbox = () => {
  return (
    <View style={styles.container}>
      <HeaderV2 title="Notifications" />

      <View style={styles.bottomContainer}>
        <Icon name="mail" color="#585858ff" size={100} />
        <Text style={styles.title}>All Clear!</Text>
        <Text style={styles.subtitle}>You are all caught up.</Text>
      </View>
    </View>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  title: {
    fontSize: 14,
    color: colors.textPrimary,
  },
});

import React from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderV2 from '../../../components/headerv2';
import CalendarScreenContent from './CalendarContent';

const Calendar = () => {
  return (
    <View style={styles.container}>
      <HeaderV2 title="Calendar" />
      <CalendarScreenContent />
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

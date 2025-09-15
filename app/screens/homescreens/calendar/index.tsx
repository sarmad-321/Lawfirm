import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderV2 from '../../../components/headerv2';
import CalendarScreenContent from './CalendarContent';
import PopupWrapper, {
  PopupWrapperRef,
} from '../../../components/PopupWrapper';
import CalendarFilterPopup from '../../../components/CalendarFilterPopup';

const Calendar = () => {
  const calendarRef = useRef<PopupWrapperRef>(null);

  const handleFilterPress = () => {
    calendarRef.current?.show();
  };

  return (
    <View style={styles.container}>
      <HeaderV2 title="Calendar" handleFilterPress={handleFilterPress} />
      <CalendarScreenContent />

      <PopupWrapper ref={calendarRef}>
        <CalendarFilterPopup />
      </PopupWrapper>
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

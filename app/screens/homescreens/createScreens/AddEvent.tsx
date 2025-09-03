import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Alert,
  Switch,
  ScrollView,
} from 'react-native';
import { colors } from '../../../utils/theme';
import PopupWrapper, {
  PopupWrapperRef,
} from '../../../components/PopupWrapper';
import FormsInput from '../../../components/FormsInput';
import FormsDropdown from '../../../components/FormsDropdown';
import FormsHeader from '../../../components/FormsHeader';
import RadioButton from '../../../components/SwitchButton';
import SwitchButton from '../../../components/SwitchButton';

const AddEvent = () => {
  const [selectedCalendar, setSelectedCalendar] = useState('paul walker');
  const [isAllDayEvent, setIsAllDayEvent] = useState(false);
  const [copyEventToFirm, setCopyEventToFirm] = useState(false);
  const [startDate, setStartDate] = useState('Today, Aug 27');
  const [endDate, setEndDate] = useState('Today, Aug 27');
  const [startTime, setStartTime] = useState('01:00 PM');
  const [endTime, setEndTime] = useState('01:30 PM');

  const matterPickerRef = useRef<PopupWrapperRef>(null);
  const eventTypePickerRef = useRef<PopupWrapperRef>(null);
  const calendarPickerRef = useRef<PopupWrapperRef>(null);

  const handleEventTypeSelect = () => {
    eventTypePickerRef.current?.show();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      {/* Header */}
      <FormsHeader title="New Event" />

      <ScrollView style={styles.content}>
        {/* Event Title */}
        <FormsInput
          placeholder={'Enter title'}
          label={'Event title'}
          required={true}
        />

        {/* Description */}
        <FormsInput placeholder={'Enter description'} label={'Description'} />

        <FormsDropdown title={'Attendees'} label={'Invite Attendees'} />

        {/* Event Location */}
        <FormsInput placeholder={'Enter location'} label={'Event location'} />

        <SwitchButton
          label="Is All-day event?"
          value={isAllDayEvent}
          onValueChange={setIsAllDayEvent}
        />

        {/* Date and Time Section */}
        <View style={styles.dateTimeSection}>
          <View style={styles.dateTimeRow}>
            <FormsDropdown title={'Start date'} label={startDate} />

            {!isAllDayEvent && (
              <FormsDropdown title={'Start time'} label={startTime} />
            )}
          </View>

          <View style={styles.dateTimeRow}>
            <FormsDropdown title={'End date'} label={endDate} />

            {!isAllDayEvent && (
              <FormsDropdown title={'End time'} label={endTime} />
            )}
          </View>
        </View>

        {/* Reminders */}

        <FormsDropdown title={'Reminders'} label={'Add a reminder'} />
        <FormsDropdown title={'Matter'} label={'Select matter'} />
        <FormsDropdown
          title={'Save to this calendar'}
          label={`● ${selectedCalendar}`}
        />

        <SwitchButton
          label="Copy event to firm calendar"
          value={copyEventToFirm}
          onValueChange={setCopyEventToFirm}
        />

        {/* Event Type */}
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Event type</Text>
          <TouchableOpacity onPress={handleEventTypeSelect}>
            <Text style={styles.linkText}>Select an event type</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Popup Wrappers for dropdowns */}
      <PopupWrapper ref={matterPickerRef}>
        <View style={styles.popupContent}>
          <Text style={styles.popupTitle}>Select Matter</Text>
          {/* Matter selection content would go here */}
        </View>
      </PopupWrapper>

      <PopupWrapper ref={eventTypePickerRef}>
        <View style={styles.popupContent}>
          <Text style={styles.popupTitle}>Select Event Type</Text>
          {/* Event type selection content would go here */}
        </View>
      </PopupWrapper>

      <PopupWrapper ref={calendarPickerRef}>
        <View style={styles.popupContent}>
          <Text style={styles.popupTitle}>Select Calendar</Text>
          {/* Calendar selection content would go here */}
        </View>
      </PopupWrapper>
    </SafeAreaView>
  );
};

export default AddEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  content: {
    flex: 1,
  },
  row: {
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
  rowLabel: {
    color: '#aaa',
    fontSize: 14,
  },
  linkText: {
    color: '#2196f3',
    fontSize: 14,
    fontWeight: '500',
  },
  dateText: {
    color: '#2196f3',
    fontWeight: '500',
    fontSize: 14,
  },
  dateTimeSection: {
    backgroundColor: colors.backgroundLight,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.textSecondary,
  },
  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
    // paddingHorizontal: 16,
    paddingVertical: 8,
  },
  dateTimeColumn: {
    flex: 1,
    paddingVertical: 8,
  },
  calendarName: {
    color: '#2196f3',
    fontSize: 12,
    marginTop: 4,
  },
  popupContent: {
    padding: 20,
    backgroundColor: colors.backgroundLight,
    borderRadius: 10,
  },
  popupTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
});

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
import StatusSelector from '../../../components/StatusSelector';

const AddTask = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [selectedMatter, setSelectedMatter] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('');
  const [selectedCalendar, setSelectedCalendar] = useState('paul walker');
  const [isAllDayEvent, setIsAllDayEvent] = useState(false);
  const [copyEventToFirm, setCopyEventToFirm] = useState(false);
  const [startDate, setStartDate] = useState('Today, Aug 27');
  const [endDate, setEndDate] = useState('Today, Aug 27');
  const [startTime, setStartTime] = useState('01:00 PM');
  const [endTime, setEndTime] = useState('01:30 PM');

  const statusOptions = [
    { label: 'High', value: 'high' },
    { label: 'Normal', value: 'normal' },
    { label: 'Low', value: 'low' },
  ];

  const priorityOptions = [
    { label: 'Pending', value: 'pending' },
    { label: 'In progress', value: 'in_progress' },
    { label: 'In review', value: 'in_review' },
  ];

  const handleStatusChange = value => {
    console.log('Selected status:', value);
  };

  const matterPickerRef = useRef<PopupWrapperRef>(null);
  const eventTypePickerRef = useRef<PopupWrapperRef>(null);
  const calendarPickerRef = useRef<PopupWrapperRef>(null);

  const handleMatterSelect = () => {
    matterPickerRef.current?.show();
  };

  const handleEventTypeSelect = () => {
    eventTypePickerRef.current?.show();
  };

  const handleCalendarSelect = () => {
    calendarPickerRef.current?.show();
  };

  const handleInviteAttendees = () => {
    Alert.alert(
      'Invite Attendees',
      'Invite attendees functionality would open here',
    );
  };

  const handleAddReminder = () => {
    Alert.alert('Add Reminder', 'Add reminder functionality would open here');
  };

  const handleDateSelect = (type: 'start' | 'end') => {
    Alert.alert('Date Selection', `${type} date picker would open here`);
  };

  const handleTimeSelect = (type: 'start' | 'end') => {
    Alert.alert('Time Selection', `${type} time picker would open here`);
  };

  const handleSave = () => {
    if (!eventTitle.trim()) {
      Alert.alert('Error', 'Please enter event title');
      return;
    }

    Alert.alert('Success', 'Event created successfully');
  };

  const handleClose = () => {
    Alert.alert('Close', 'Navigate back functionality');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      <FormsHeader title="New Event" />

      <ScrollView style={styles.content}>
        <FormsInput
          placeholder={'Enter title'}
          label={'Event title'}
          required={true}
        />

        <FormsInput placeholder={'Enter description'} label={'Description'} />

        <FormsDropdown title={'Assigned to'} label={'paul walker'} />

        <SwitchButton
          label="Private Task"
          description="When Enabled, only you and administration users can see view or edit this task"
          value={isAllDayEvent}
          onValueChange={setIsAllDayEvent}
        />
        <FormsDropdown title={'Matter'} label={'Select matter'} />
        <FormsDropdown title={'Due date'} label={startDate} />

        <StatusSelector
          title={'Priority Level'}
          options={statusOptions}
          onChange={handleStatusChange}
        />
        <FormsDropdown title={'Task Type'} label={'Select task Type'} />
        <StatusSelector
          title={'Priority Level'}
          options={priorityOptions}
          onChange={handleStatusChange}
        />
        <FormsInput placeholder={'Time estimate'} label={'Ex. 1h 12m,1:12'} />
        <FormsDropdown title={'Reminders'} label={'Add a reminder'} />
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

export default AddTask;

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

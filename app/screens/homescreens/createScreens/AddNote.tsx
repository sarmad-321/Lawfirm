import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FormGenerator from '../../../components/FormGenerator';
import FormsHeader from '../../../components/FormsHeader';
import FormsHeading from '../../../components/FormsHeading';
import { PopupWrapperRef } from '../../../components/PopupWrapper';
import TimeEntryCard from '../../../components/TimeEntryCard';
import { colors } from '../../../utils/theme';
import { NoteFormJson } from '../../../utils/dummyFormsJson';
import FormAddButton from '../../../components/FormAddButton';
const AddNote = () => {
  const [formFields, setFormFields] = useState(NoteFormJson);

  const handleFieldChange = (key, newValue) => {
    setFormFields(prev =>
      prev.map(field =>
        field.key === key ? { ...field, value: newValue } : field,
      ),
    );
  };

  const timeEntry = {
    id: '1',
    date: 'Today, Aug 5',
    description: 'mubashir',
    duration: '01:12:47',
    amount: '£14.40',
    matter: '00001-mubashir',
    initials: 'SS',
  };

  const eventTypePickerRef = useRef<PopupWrapperRef>(null);

  const handleEventTypeSelect = () => {
    eventTypePickerRef.current?.show();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      <FormsHeader title="New Notes" />

      <ScrollView style={styles.content}>
        <FormGenerator fields={formFields} onChange={handleFieldChange} />

        <FormsHeading title={'Related time'} />
        <View style={styles.timeEntries}>
          <TimeEntryCard item={timeEntry} />
        </View>
        <FormAddButton
          label={"Add Time Entry"}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddNote;

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
  heading: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  headingText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addTimeRow: {
    paddingVertical: 20,
    backgroundColor: colors.backgroundLight,
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  timeEntries: {
    paddingHorizontal: 16,
    backgroundColor: colors.backgroundLight,
    paddingTop: 10,
  },
});

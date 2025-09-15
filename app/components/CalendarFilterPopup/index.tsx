import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import StatusSelector from '../StatusSelector';
import Icon from 'react-native-vector-icons/MaterialIcons';

let CalendarOption = {
  key: 'format',
  label: 'Calendar display format',
  type: 'status',
  value: 'agenda',
  options: [
    { label: 'Agenda', value: 'agenda' },
    { label: 'Day', value: 'day' },
  ],
};

const CalendarFilterPopup = () => {
  const [selectedFormat, setSelectedFormat] = useState('agenda');
  const [calendars, setCalendars] = useState([
    { id: 1, name: 'paul walker', color: '#60A5FA', isSelected: true },
    { id: 2, name: 'Firm', color: '#EF4444', isSelected: true },
    { id: 3, name: 'Tasks', color: '#10B981', isSelected: true },
    {
      id: 4,
      name: 'Statute of Limitations',
      color: '#F97316',
      isSelected: true,
    },
  ]);

  const handleClose = () => {
    // Handle close action
    console.log('Close calendar options');
  };

  const handleSave = () => {
    // Handle save action
    console.log('Save calendar options', { selectedFormat, calendars });
  };

  const toggleCalendar = id => {
    setCalendars(prev =>
      prev.map(calendar =>
        calendar.id === id
          ? { ...calendar, isSelected: !calendar.isSelected }
          : calendar,
      ),
    );
  };

  const renderCalendarItem = calendar => (
    <TouchableOpacity
      key={calendar.id}
      style={styles.calendarItem}
      onPress={() => toggleCalendar(calendar.id)}
      activeOpacity={0.7}
    >
      <View style={styles.checkboxContainer}>
        <View
          style={[
            styles.checkbox,
            {
              backgroundColor: calendar.isSelected ? '#007AFF' : 'transparent',
            },
          ]}
        >
          {calendar.isSelected && (
            <Icon name="check" size={14} color="#FFFFFF" />
          )}
        </View>
      </View>

      <View style={styles.calendarInfo}>
        <View style={[styles.colorDot, { backgroundColor: calendar.color }]} />
        <Text style={styles.calendarName}>{calendar.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Calendar Display Format */}
        <View style={styles.section}>
          <StatusSelector
            options={CalendarOption.options}
            title={CalendarOption.label}
            selectedValue={selectedFormat}
            onSelect={setSelectedFormat}
          />
        </View>

        {/* My Calendars Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My calendars</Text>
          <View style={styles.calendarsList}>
            {calendars.map(renderCalendarItem)}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CalendarFilterPopup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E40AF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50, // Account for status bar
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  calendarsList: {
    paddingHorizontal: 16,
  },
  calendarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  calendarName: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
  },
});

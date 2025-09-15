import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import FormGenerator from '../../../components/FormGenerator';
import FormsHeader from '../../../components/FormsHeader';
import { timeEntryForm } from '../../../utils/dummyFormsJson';
import { colors } from '../../../utils/theme';
import SwitchButton from '../../../components/SwitchButton';

const NewTimeEntry = () => {
  const [formFields, setFormFields] = useState(timeEntryForm);

  const handleFieldChange = (key, newValue) => {
    setFormFields(prev =>
      prev.map(field =>
        field.key === key ? { ...field, value: newValue } : field,
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FormsHeader title="New Time Entry" />
      <ScrollView style={styles.content}>
        <FormGenerator fields={formFields} onChange={handleFieldChange} />
        <SwitchButton
          label="Non-Billable"
          description="Exclude this time entry from invoices"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewTimeEntry;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  content: {
    flex: 1,
  },
});

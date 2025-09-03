import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../../utils/theme';
import FormsHeader from '../../../components/FormsHeader';
import FormGenerator from '../../../components/FormGenerator';
import { LogsFormJson } from '../../../utils/dummyFormsJson';

const AddLogs = () => {
  const [formFields, setFormFields] = useState(LogsFormJson);

  const handleFieldChange = (key, newValue) => {
    setFormFields(prev =>
      prev.map(field =>
        field.key === key ? { ...field, value: newValue } : field,
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FormsHeader title="Add Logs" />
      <ScrollView style={styles.content}>
        <FormGenerator fields={formFields} onChange={handleFieldChange} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddLogs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  content: {
    flex: 1,
  },
});

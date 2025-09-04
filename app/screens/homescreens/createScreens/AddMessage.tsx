import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import FormGenerator from '../../../components/FormGenerator';
import FormsHeader from '../../../components/FormsHeader';
import { messageFormJson } from '../../../utils/dummyFormsJson';
import { colors } from '../../../utils/theme';

const AddMessage = () => {
  const [formFields, setFormFields] = useState(messageFormJson);

  const handleFieldChange = (key, newValue) => {
    setFormFields(prev =>
      prev.map(field =>
        field.key === key ? { ...field, value: newValue } : field,
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FormsHeader title="New Message thread" />
      <ScrollView style={styles.content}>
        <FormGenerator fields={formFields} onChange={handleFieldChange} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  content: {
    flex: 1,
  },
});

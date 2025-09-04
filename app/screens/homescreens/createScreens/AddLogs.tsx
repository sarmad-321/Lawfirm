import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import FormGenerator from '../../../components/FormGenerator';
import FormsHeader from '../../../components/FormsHeader';
import {
  emailLogsFormJson,
  phoneLogsFormJson,
} from '../../../utils/dummyFormsJson';
import { colors } from '../../../utils/theme';
let LogType = [
  {
    key: 'logstype',
    label: 'Log type',
    type: 'status',
    value: '',
    options: [
      { label: 'Phone log', value: 'phone' },
      { label: 'Email', value: 'email' },
    ],
  },
];

const AddLogs = () => {
  const [logtypeFields, setLogtypeFields] = useState(LogType);
  const [phoneFormFields, setPhoneFormFields] = useState(phoneLogsFormJson);
  const [emailformFields, setEmailFormFields] = useState(emailLogsFormJson);

  const handlePhoneFieldChange = (key, newValue) => {
    setPhoneFormFields(prev =>
      prev.map(field =>
        field.key === key ? { ...field, value: newValue } : field,
      ),
    );
  };

  const handleEmailFieldChange = (key, newValue) => {
    setEmailFormFields(prev =>
      prev.map(field =>
        field.key === key ? { ...field, value: newValue } : field,
      ),
    );
  };

  const handleLogtypeChange = (key, newValue) => {
    setLogtypeFields(prev =>
      prev.map(field =>
        field.key === key ? { ...field, value: newValue } : field,
      ),
    );
  };

  const shouldDisplayPhone = () => {
    return logtypeFields[0].value === 'phone';
  };

  return (
    <SafeAreaView style={styles.container}>
      <FormsHeader title="Add Logs" />
      <ScrollView style={styles.content}>
        <FormGenerator fields={logtypeFields} onChange={handleLogtypeChange} />
        {shouldDisplayPhone() ? (
          <FormGenerator
            fields={phoneFormFields}
            onChange={handlePhoneFieldChange}
          />
        ) : (
          <FormGenerator
            fields={emailformFields}
            onChange={handleEmailFieldChange}
          />
        )}
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

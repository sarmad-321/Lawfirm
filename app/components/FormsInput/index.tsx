import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../../utils/theme';

const FormsInput = ({ label, required, placeholder, onChange }) => {
  return (
    <View style={styles.row}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={styles.rowLabel}>{label}</Text>
        {required ? <Text style={styles.required}>Required</Text> : null}
      </View>
      <TextInput
        style={styles.textInput}
        placeholderTextColor={colors.textTertiary}
        placeholder={placeholder}
        onChangeText={onChange}
      />
    </View>
  );
};

export default FormsInput;

const styles = StyleSheet.create({
  row: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.textSecondary,
    backgroundColor: colors.backgroundLight,
    // height: 85,
  },
  rowLabel: {
    color: '#aaa',
    fontSize: 14,
  },
  rowValue: {
    fontSize: 14,
    color: '#fff',
  },
  required: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.textSecondary,
  },
  textInput: {
    color: 'white',
    marginTop: -5,
  },
});

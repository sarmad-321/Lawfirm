import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../utils/theme';

const FormsDropdown = ({ title, label, required, onPress, value }) => {
  return (
    <View style={styles.row}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={styles.rowLabel}>{title}</Text>
        {required ? <Text style={styles.required}>Required</Text> : null}
      </View>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.label}>{value || label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormsDropdown;

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.textSecondary,
    backgroundColor: colors.backgroundLight,
    // height: 85,
    paddingVertical: 10,
    justifyContent: 'center',
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
  },
  label: {
    color: colors.primaryLight,
    fontWeight: 'bold',
    marginTop: 2,
  },
});

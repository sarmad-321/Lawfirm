import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const FormsHeading = ({ title }) => {
  return (
    <View style={styles.heading}>
      <Text style={styles.headingText}>{title}</Text>
    </View>
  );
};

export default FormsHeading;

const styles = StyleSheet.create({
  heading: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  headingText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

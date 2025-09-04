import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../../utils/theme';
import Icon from 'react-native-vector-icons/Ionicons';
const FormsHeading = ({ title, icon }) => {
  return (
    <View style={styles.heading}>
      {icon && (
        <View style={styles.circle}>
          <Icon name={icon} color={'white'} size={18} />
        </View>
      )}
      <Text style={styles.headingText}>{title}</Text>
    </View>
  );
};

export default FormsHeading;

const styles = StyleSheet.create({
  heading: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: colors.primaryLight,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

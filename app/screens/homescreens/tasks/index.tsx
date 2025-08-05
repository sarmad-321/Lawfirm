import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const TaskScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Activites</Text>
    </View>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

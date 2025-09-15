import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SearchComponent from '../SearchComponent';
import ListItem from '../ListItem';

let groups = [
  { name: 'Everyone', id: '1' },
  { name: 'Admins', id: '2' },
  { name: 'Editors', id: '3' },
  { name: 'Viewers', id: '4' },
];

const PermissionPopup = ({ onFirmSelection }) => {
  return (
    <View>
      <SearchComponent placeholder="Search firm and groups..." />

      {groups.map((item, index) => (
        <ListItem
          key={index}
          title={item.name}
          onPress={() => onFirmSelection(item)}
        />
      ))}
    </View>
  );
};

export default PermissionPopup;

const styles = StyleSheet.create({});

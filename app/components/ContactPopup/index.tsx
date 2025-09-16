import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SearchComponent from '../SearchComponent';
import ListItem from '../ListItem';
import { useSelector } from 'react-redux';

const ContactPopup = ({ onContactSelect }) => {
  const contacts = useSelector((state: any) => state.contact.contacts);
  return (
    <View>
      <SearchComponent placeholder="Search all contacts..." />

      {contacts.map((item, index) => (
        <ListItem
          key={index}
          title={
            item.generalDetails?.firstName + ' ' + item.generalDetails?.lastName
          }
          subtitle={item.emails?.length ? item.emails[0] : ''}
          onPress={() => onContactSelect(item)}
        />
      ))}
    </View>
  );
};

export default ContactPopup;

const styles = StyleSheet.create({});

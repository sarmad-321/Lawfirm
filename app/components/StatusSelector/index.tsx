import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { colors } from '../../utils/theme';

const StatusSelector = ({ title, options, onChange }) => {
  const [selected, setSelected] = useState(options[0]?.value || null);

  const handlePress = value => {
    setSelected(value);
    if (onChange) {
      onChange(value);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, selected === item.value && styles.cardSelected]}
      onPress={() => handlePress(item.value)}
    >
      <Text
        style={[styles.text, selected === item.value && styles.textSelected]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      {title && <Text style={styles.title}>{title}</Text>}

      <FlatList
        data={options}
        renderItem={renderItem}
        keyExtractor={item => item.value}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.backgroundLight,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomColor: colors.textSecondary,
    borderBottomWidth: 0.5,
  },
  title: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 8,
  },
  listContainer: {
    gap: 10,
  },
  card: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: '#012A68',
  },
  cardSelected: {
    backgroundColor: colors.primaryLight,
  },
  text: {
    color: '#e5e7eb',
    fontSize: 14,
    fontWeight: '500',
  },
  textSelected: {
    color: '#fff',
  },
});

export default StatusSelector;

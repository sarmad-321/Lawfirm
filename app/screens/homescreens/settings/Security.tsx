import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../../../utils/theme';
import BackHeader from '../../../components/BackHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Security = () => {
  const navigation = useNavigation();

  const handlePINSetup = () => {
    // Handle PIN setup navigation
    navigation.navigate('EnterPin');
    console.log('Navigate to PIN setup');
  };

  const handlePINFingerprintSetup = () => {
    // Handle PIN/Fingerprint setup navigation
    console.log('Navigate to PIN/Fingerprint setup');
  };

  return (
    <View style={styles.container}>
      <BackHeader title="Security" />

      <View style={styles.content}>
        {/* PIN Setup Option */}
        <TouchableOpacity
          style={styles.optionItem}
          onPress={handlePINSetup}
          activeOpacity={0.7}
        >
          <View style={styles.optionLeft}>
            <View style={styles.iconContainer}>
              <Icon
                name="star-outline"
                size={24}
                color={colors.textSecondary}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.optionTitle}>PIN</Text>
              <Text style={styles.optionSubtitle}>
                Set up a Personal Identification Number
              </Text>
            </View>
          </View>
          <Icon name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>

        {/* PIN or Fingerprint Setup Option */}
        <TouchableOpacity
          style={styles.optionItem}
          onPress={handlePINFingerprintSetup}
          activeOpacity={0.7}
        >
          <View style={styles.optionLeft}>
            <View style={styles.iconContainer}>
              <Icon name="fingerprint" size={24} color={colors.textSecondary} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.optionTitle}>
                Set up your PIN or Fingerprint
              </Text>
              <Text style={styles.optionSubtitle}>
                Set up your PIN or Fingerprint
              </Text>
            </View>
          </View>
          <Icon name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Security;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.backgroundDark,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary || '#FFFFFF',
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary || 'rgba(255, 255, 255, 0.7)',
    lineHeight: 18,
  },
});

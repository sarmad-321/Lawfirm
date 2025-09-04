import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import FormsHeader from '../../../components/FormsHeader';
import { colors } from '../../../utils/theme';
import FormsHeading from '../../../components/FormsHeading';
import FormsDropdown from '../../../components/FormsDropdown';
import SwitchButton from '../../../components/SwitchButton';

const AddMatter = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FormsHeader title="New Matter" />
      <ScrollView style={styles.content}>
        <FormsHeading icon={'briefcase'} title="Matter Details" />
        <FormsDropdown
          title="Client"
          label="Select Client"
          required={true}
          onPress={() => {}}
        />
        <FormsDropdown
          title="Matter description"
          label="Enter Matter description"
          required={true}
          onPress={() => {}}
        />
        <FormsHeading icon={'people'} title="Permissions" />
        <FormsDropdown
          title="Users with access"
          label="Select firm user or group"
          required={true}
          onPress={() => {}}
        />
        <FormsHeading icon={'card'} title="Billing Preferences" />
        <SwitchButton
          label="This matter is billable"
          value={true}
          onValueChange={() => {}}
        />
        <FormsDropdown
          title="Billing method"
          label="Select billing method"
          required={true}
          onPress={() => {}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddMatter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  content: {
    flex: 1,
  },
});

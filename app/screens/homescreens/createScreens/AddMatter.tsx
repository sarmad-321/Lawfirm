import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import FormsHeader from '../../../components/FormsHeader';
import { colors } from '../../../utils/theme';
import FormsHeading from '../../../components/FormsHeading';
import FormsDropdown from '../../../components/FormsDropdown';
import SwitchButton from '../../../components/SwitchButton';
import PopupWrapper from '../../../components/PopupWrapper';
import ContactPopup from '../../../components/ContactPopup';
import FormsInput from '../../../components/FormsInput';
import PermissionPopup from '../../../components/PermissionPopup';
import BillingMethodPopup from '../../../components/BillingMethodPopup';

const AddMatter = () => {
  const contactPickerRef = React.useRef(null);
  const permissionPickerRef = React.useRef(null);
  const billingMethodPickerRef = React.useRef(null);
  return (
    <SafeAreaView style={styles.container}>
      <FormsHeader title="New Matter" />
      <ScrollView style={styles.content}>
        <FormsHeading icon={'briefcase'} title="Matter Details" />
        <FormsDropdown
          title="Client"
          label="Select Client"
          required={true}
          onPress={() => contactPickerRef.current?.show()}
        />
        <FormsInput
          label="Matter description"
          placeholder="Enter Matter description"
          required={true}
        />
        <FormsHeading icon={'people'} title="Permissions" />
        <FormsDropdown
          title="Users with access"
          label="Select firm user or group"
          required={true}
          onPress={() => permissionPickerRef.current?.show()}
        />
        <FormsHeading icon={'card'} title="Billing Preferences" />
        <SwitchButton
          label="This matter is billable"
          value={true}
          onValueChange={() => { }}
        />
        <FormsDropdown
          title="Billing method"
          label="Select billing method"
          required={true}
          onPress={() => billingMethodPickerRef.current?.show()}
        />
      </ScrollView>

      <PopupWrapper
        ref={contactPickerRef}
      >
        <ContactPopup />
      </PopupWrapper>

      <PopupWrapper
        ref={permissionPickerRef}
      >
        <PermissionPopup />
      </PopupWrapper>

      <PopupWrapper
        ref={billingMethodPickerRef}
      >
        <BillingMethodPopup />
      </PopupWrapper>
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

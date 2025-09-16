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
import { useDispatch } from 'react-redux';
import { addMatter } from '../../../redux/slices/matterSlice';
import moment from 'moment';

const AddMatter = ({ navigation }) => {
  const contactPickerRef = React.useRef(null);
  const permissionPickerRef = React.useRef(null);
  const billingMethodPickerRef = React.useRef(null);
  const [contact, setContact] = React.useState(null);
  const [matterDescription, setMatterDescription] = React.useState('');
  const [visibleTo, setVisibleTo] = React.useState('');
  const [billingMethod, setBillingMethod] = React.useState('');
  const dispatch = useDispatch();

  const handleContactSelect = contact => {
    setContact(contact);
    contactPickerRef.current?.hide();
  };

  const handlePermissions = item => {
    setVisibleTo(item);
    permissionPickerRef.current?.hide();
  };

  const handleBillingMethod = item => {
    setBillingMethod(item);
    billingMethodPickerRef.current?.hide();
  };

  const handleFormSave = () => {
    let data = {
      matterId: Math.floor(Math.random() * 100000), // Random matter ID
      client: contact,
      matterDescription,
      date: moment().format('DD/MM/YYYY'),
    };
    dispatch(addMatter(data));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <FormsHeader title="New Matter" onRightPress={handleFormSave} />
      <ScrollView style={styles.content}>
        <FormsHeading icon={'briefcase'} title="Matter Details" />
        <FormsDropdown
          title="Client"
          label="Select Client"
          value={contact ? contact.generalDetails?.firstName : ''}
          required={true}
          onPress={() => contactPickerRef.current?.show()}
        />
        <FormsInput
          label="Matter description"
          placeholder="Enter Matter description"
          onChange={setMatterDescription}
          required={true}
        />
        <FormsHeading icon={'people'} title="Permissions" />
        <FormsDropdown
          title="Users with access"
          label="Select firm user or group"
          required={true}
          value={visibleTo ? visibleTo.name : ''}
          onPress={() => permissionPickerRef.current?.show()}
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
          value={billingMethod ? billingMethod.name : ''}
          onPress={() => billingMethodPickerRef.current?.show()}
        />
      </ScrollView>

      <PopupWrapper ref={contactPickerRef}>
        <ContactPopup onContactSelect={handleContactSelect} />
      </PopupWrapper>

      <PopupWrapper ref={permissionPickerRef}>
        <PermissionPopup onFirmSelection={handlePermissions} />
      </PopupWrapper>

      <PopupWrapper ref={billingMethodPickerRef}>
        <BillingMethodPopup onBillSection={handleBillingMethod} />
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

import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { colors } from '../../../utils/theme';
import FormsHeader from '../../../components/FormsHeader';
import FormGenerator from '../../../components/FormGenerator';
import { contactGeneralDetailsForm } from '../../../utils/dummyFormsJson';
import FormsHeading from '../../../components/FormsHeading';
import FormsInput from '../../../components/FormsInput';
import FormAddButton from '../../../components/FormAddButton';
import { useDispatch } from 'react-redux';
import { addContact } from '../../../redux/slices/contactSlice';
import moment from 'moment';
import StatusSelector from '../../../components/StatusSelector';

let contactTypeForm = {
  key: 'contactType',
  label: 'Contact Type',
  type: 'status',
  value: '',
  options: [
    { label: 'Personal', value: 'personal' },
    { label: 'Company', value: 'company' },
  ],
};

const AddContact = ({ navigation }) => {
  const [contactType, setContactType] = React.useState('personal');
  const [generalDetails, setGeneralDetails] = React.useState(
    contactGeneralDetailsForm,
  );
  const [emails, setEmails] = React.useState(['']); // multiple email addresses
  const [phones, setPhones] = React.useState(['']); // multiple phone numbers

  const dispatch = useDispatch();

  // Handle dynamic form updates
  const handleContactTypeChange = (key, newValue) => {
    setContactType(prev =>
      prev.map(field =>
        field.key === key ? { ...field, value: newValue } : field,
      ),
    );
  };

  const handleGeneraldetailsChange = (key, newValue) => {
    setGeneralDetails(prev =>
      prev.map(field =>
        field.key === key ? { ...field, value: newValue } : field,
      ),
    );
  };

  // Handle email & phone input
  const handleEmailChange = (index, newValue) => {
    const updated = [...emails];
    updated[index] = newValue;
    setEmails(updated);
  };

  const handlePhoneChange = (index, newValue) => {
    const updated = [...phones];
    updated[index] = newValue;
    setPhones(updated);
  };

  // Add new email/phone field
  const addEmailField = () => setEmails(prev => [...prev, '']);
  const addPhoneField = () => setPhones(prev => [...prev, '']);

  // Save Form
  const handleFormSave = () => {
    console.log(contactType);
    let data = {
      contactId: Math.floor(Math.random() * 100000),
      contactType: contactType,
      generalDetails: generalDetails.reduce((acc, field) => {
        acc[field.key] = field.value;
        return acc;
      }, {}),
      emails: emails.filter(e => e.trim() !== ''),
      phones: phones.filter(p => p.trim() !== ''),
      createdAt: moment().format('DD/MM/YYYY'),
    };
    console.log('New Contact Data:', data);
    dispatch(addContact(data));
    navigation.goBack();
  };

  const isPersonal = () => {
    if (contactType === 'personal') {
      return true;
    }
    return false;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FormsHeader
        leftText="×"
        title="Add Contact"
        rightText="✓"
        onRightPress={handleFormSave}
      />
      <ScrollView style={{ flex: 1 }}>
        <FormsHeading title={'General Details'} />
        <StatusSelector
          options={contactTypeForm.options}
          title={'Contact Type'}
          onChange={setContactType}
        />

        {isPersonal() ? (
          <FormGenerator
            fields={generalDetails}
            onChange={handleGeneraldetailsChange}
          />
        ) : (
          <View>
            <FormsInput
              label={'Company Name'}
              placeholder={'Enter Company Name'}
            />
          </View>
        )}

        <FormsHeading title={'Email Address'} />
        {emails.map((email, index) => (
          <FormsInput
            key={`email-${index}`}
            label={'Email Address'}
            placeholder={'Enter Email Address'}
            value={email}
            onChange={val => handleEmailChange(index, val)}
          />
        ))}
        <FormAddButton label={'Add Email Address'} onPress={addEmailField} />

        <FormsHeading title={'Phone'} />
        {phones.map((phone, index) => (
          <FormsInput
            key={`phone-${index}`}
            label={'Phone'}
            placeholder={'Enter Phone Number'}
            value={phone}
            onChange={val => handlePhoneChange(index, val)}
          />
        ))}
        <FormAddButton label={'Add Phone Number'} onPress={addPhoneField} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
});

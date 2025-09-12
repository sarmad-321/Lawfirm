import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../../utils/theme'
import FormsHeader from '../../../components/FormsHeader'
import FormGenerator from '../../../components/FormGenerator';
import { contactGeneralDetailsForm } from '../../../utils/dummyFormsJson';
import FormsHeading from '../../../components/FormsHeading';
import FormsInput from '../../../components/FormsInput';
import FormAddButton from '../../../components/FormAddButton';

let contactTypeForm = [
    {
        key: 'contactType',
        label: 'Contact Type',
        type: 'status',
        value: '',
        options: [
            { label: 'Personal', value: 'personal' },
            { label: 'Company', value: 'company' },
        ],
    },
];

const AddContact = () => {
    const [contactType, setContactType] = React.useState(contactTypeForm);
    const [generalDetails, setGeneralDetails] = React.useState(contactGeneralDetailsForm);

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

    return (
        <SafeAreaView style={styles.container}>
            <FormsHeader
                leftText='×'
                title='Add Contact'
                rightText='✓'
            />
            <ScrollView style={{ flex: 1 }}>
                <FormsHeading title={"General Details"} />
                <FormGenerator fields={contactType} onChange={handleContactTypeChange} />
                <FormGenerator fields={generalDetails} onChange={handleGeneraldetailsChange} />
                <FormsHeading title={"Email Address"} />
                <FormsInput
                    label={"Email Address"}
                    placeholder={"Enter Email Address"}
                />
                <FormAddButton
                    label={"Add Email Address"}
                />
                <FormsHeading title={"Phone"} />
                <FormsInput
                    label={"Phone"}
                    placeholder={"Enter Phone Number"}
                />
                <FormAddButton
                    label={"Add Phone Number"}
                />

            </ScrollView>
        </SafeAreaView>
    )
}

export default AddContact

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundDark,
    },
})
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import FormGenerator from '../../../components/FormGenerator';
import FormsHeader from '../../../components/FormsHeader';
import { activityFiltersForm } from '../../../utils/dummyFormsJson';
import { colors } from '../../../utils/theme';

const ActivityFilters = () => {
    const [formFields, setFormFields] = useState(activityFiltersForm);

    const handleFieldChange = (key, newValue) => {
        setFormFields(prev =>
            prev.map(field =>
                field.key === key ? { ...field, value: newValue } : field,
            ),
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content}>
                <FormGenerator fields={formFields} onChange={handleFieldChange} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ActivityFilters;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundDark,
    },
    content: {
        flex: 1,
    },
});

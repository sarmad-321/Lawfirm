import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FormGenerator from '../FormGenerator'
import { taskOptionsForm } from '../../utils/dummyFormsJson';

const TaskFilterPopup = () => {
    const [formData, setFormData] = React.useState(taskOptionsForm);

    const handleFieldChange = (key, newValue) => {
        setFormData(prev =>
            prev.map(field =>
                field.key === key ? { ...field, value: newValue } : field,
            ),
        );
    };
    return (
        <View>
            <FormGenerator fields={formData} onChange={handleFieldChange} />
        </View>
    )
}

export default TaskFilterPopup

const styles = StyleSheet.create({})
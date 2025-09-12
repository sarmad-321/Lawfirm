import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FormsHeading from '../FormsHeading'
import StatusSelector from '../StatusSelector'
import FormGenerator from '../FormGenerator'
import { matterOptionsForm } from '../../utils/dummyFormsJson'

const MatterFilter = () => {
    const [formData, setFormData] = React.useState(matterOptionsForm);
    const handleFieldChange = (key, newValue) => {
        setFormData(prev =>
            prev.map(field =>
                field.key === key ? { ...field, value: newValue } : field,
            ),
        );
    }
    return (
        <View>
            <FormsHeading title='Sort All Matters' />
            <StatusSelector
                options={[
                    { label: "Recently Opened", value: "recently-opened" },
                    { label: 'A-Z', value: 'a-z' },]}
            />
            <FormsHeading title='Filter All Matter' />
            <StatusSelector
                title={"Matter Status"}
                options={[
                    { label: "All", value: "all" },
                    { label: 'Open', value: 'open' },
                    { label: 'Pending', value: 'pending' },
                ]
                }
            />
            <FormGenerator
                fields={formData}
                onChange={handleFieldChange}
            />
        </View>
    )
}

export default MatterFilter

const styles = StyleSheet.create({})
import React from 'react';
import { View } from 'react-native';
import FormsInput from '../FormsInput';
import FormsDropdown from '../FormsDropdown';
import StatusSelector from '../StatusSelector';
import FormsHeading from '../FormsHeading';

const FormGenerator = ({ fields, onChange }) => {
  const handleFieldChange = (key, value) => {
    if (onChange) {
      onChange(key, value);
    }
  };

  return (
    <View>
      {fields.map(field => {
        if (field.type === 'input') {
          return (
            <FormsInput
              key={field.key}
              placeholder={`Enter ${field.label}`}
              label={field.label}
              required={field.required}
              value={field.value}
              onChange={val => handleFieldChange(field.key, val)}
            />
          );
        }

        if (field.type === 'dropdown') {
          return (
            <FormsDropdown
              key={field.key}
              title={field.label}
              required={field.required}
              label={field.value || `Select ${field.label}`}
              onSelect={val => handleFieldChange(field.key, val)}
            />
          );
        }

        if (field.type === 'status') {
          return (
            <StatusSelector
              key={field.key}
              title={field.label}
              options={field.options || []}
              onChange={val => handleFieldChange(field.key, val)}
            />
          );
        }

        if (field.type === 'heading') {
          return <FormsHeading title={field.label} />;
        }

        return null;
      })}
    </View>
  );
};

export default FormGenerator;

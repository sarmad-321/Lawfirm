import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import HeaderV2 from '../../../components/headerv2';
import FormsDropdown from '../../../components/FormsDropdown';
import SwitchButton from '../../../components/SwitchButton';
import StatusSelector from '../../../components/StatusSelector';
import { colors } from '../../../utils/theme';
import BackHeader from '../../../components/BackHeader';

let inputType = [
  {
    key: 'inputtype',
    label: 'Time input type',
    type: 'status',
    options: [
      { label: 'Text (1h 30m)', value: 'text' },
      { label: 'Decimal(1.5)', value: 'decimal' },
    ],
  },
];

const Customization = () => {
  const [copyEventToFirm, setCopyEventToFirm] = useState(false);

  return (
    <View style={styles.container}>
      <BackHeader title="Customization" />
      <FormsDropdown label={'Use system setting'} title={'Appearance'} />
      <SwitchButton
        label="Show timekeeper in global create menu"
        value={copyEventToFirm}
        onValueChange={setCopyEventToFirm}
      />
      <FormsDropdown
        label={'Customize global create menu'}
        title={'Add, remove and order options in the global create menu '}
      />

      <SwitchButton
        label="Enable text snippets"
        description="Text snippets can be added and managaged in app on the web"
        value={copyEventToFirm}
        onValueChange={setCopyEventToFirm}
      />
      <StatusSelector title="Time input type" options={inputType[0].options} />
    </View>
  );
};

export default Customization;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
});

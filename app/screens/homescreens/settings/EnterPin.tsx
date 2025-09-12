import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { colors } from '../../../utils/theme';

const EnterPin = () => {
  const [pin, setPin] = useState('');
  const textInputRef = useRef(null);
  const maxPinLength = 4;

  useEffect(() => {
    // Auto-focus the input when component mounts
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Handle PIN completion
    if (pin.length === maxPinLength) {
      console.log('PIN entered:', pin);
      // Process PIN or navigate
      // You can add your PIN validation logic here
    }
  }, [pin]);

  const handlePinChange = text => {
    // Only allow numbers and limit to maxPinLength
    const numericText = text.replace(/[^0-9]/g, '');
    if (numericText.length <= maxPinLength) {
      setPin(numericText);
    }
  };

  const renderPinDots = () => {
    return (
      <View style={styles.pinDotsContainer}>
        {Array.from({ length: maxPinLength }, (_, index) => (
          <View
            key={index}
            style={[
              styles.pinDot,
              {
                backgroundColor: index < pin.length ? '#FFFFFF' : 'transparent',
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Enter a new PIN</Text>
        {renderPinDots()}

        {/* Hidden TextInput for PIN entry */}
        <TextInput
          ref={textInputRef}
          style={styles.hiddenInput}
          value={pin}
          onChangeText={handlePinChange}
          keyboardType="numeric"
          secureTextEntry={false} // Set to true if you want to hide the keyboard input
          maxLength={maxPinLength}
          autoFocus={true}
          caretHidden={true} // Hide the cursor
        />
      </View>
    </View>
  );
};

export default EnterPin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary || '#1E3A8A',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 50,
    textAlign: 'center',
  },
  pinDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginBottom: 40,
  },
  pinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
});

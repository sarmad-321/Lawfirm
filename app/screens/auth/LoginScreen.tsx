import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, borderRadius, fontSize } from '../../utils/theme';
import LinearGradient from 'react-native-linear-gradient';
import MainButton from '../../components/MainButton';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [selectedRegion, setSelectedRegion] = useState('Europe');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const regions = ['Europe', 'North America', 'Australia', 'Canada'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E40AF" />

      {/* Background Gradient */}
      <LinearGradient
        colors={['#1E40AF', '#1D4ED8', '#2563EB']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.content}>
            {/* Logo Section */}
            <View style={styles.logoSection}>
              <View style={styles.logoContainer}>
                <View style={styles.logoIcon}>
                  <Icon name="checkmark" size={24} color={colors.white} />
                </View>
                <Text style={styles.logoText}>Clio</Text>
              </View>
            </View>

            {/* Main Content */}
            <View style={styles.mainContent}>
              {/* Region Selection */}
              <View style={styles.regionSection}>
                <Text style={styles.regionLabel}>
                  Select your account region
                </Text>
                <TouchableOpacity style={styles.regionSelector}>
                  <Text style={styles.regionText}>{selectedRegion}</Text>
                  <Icon name="chevron-down" size={20} color={colors.white} />
                </TouchableOpacity>
              </View>

              {/* Login Form */}
              <View style={styles.formSection}>
                {/* Username Field */}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Username or Email</Text>
                  <TextInput
                    style={styles.textInput}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Enter your username or email"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="next"
                  />
                </View>

                {/* Password Field */}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      value={password}
                      onChangeText={setPassword}
                      placeholder="Enter your password"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      secureTextEntry={!showPassword}
                      returnKeyType="done"
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Icon
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={20}
                        color="rgba(255, 255, 255, 0.7)"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Forgot Password */}
                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <MainButton
                title="Sign In"
                onPress={() => navigation.navigate('LawyerTabs')}
              />

              {/* Sign In Section */}

              {/* Sign Up Section */}
              <View style={styles.signupSection}>
                <Text style={styles.signupPrompt}>Don't have an account?</Text>
                <TouchableOpacity>
                  <Text style={styles.signupLink}>Try Clio for free</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Need help?</Text>
              <Text style={styles.footerContact}>
                Give us a call at 1.888.858.CLIO
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'space-between',
  },
  logoSection: {
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '600',
    color: colors.white,
    letterSpacing: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
  },
  regionSection: {
    marginBottom: spacing.xxxl,
  },
  regionLabel: {
    fontSize: fontSize.md,
    color: colors.white,
    marginBottom: spacing.sm,
    opacity: 0.9,
  },
  regionSelector: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  regionText: {
    fontSize: fontSize.lg,
    color: colors.white,
    fontWeight: '500',
  },
  formSection: {
    marginBottom: spacing.xl,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  inputLabel: {
    fontSize: fontSize.md,
    color: colors.white,
    marginBottom: spacing.sm,
    opacity: 0.9,
  },
  textInput: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSize.lg,
    color: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSize.lg,
    color: colors.white,
  },
  eyeIcon: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: spacing.sm,
  },
  forgotPasswordText: {
    fontSize: fontSize.sm,
    color: colors.white,
    opacity: 0.8,
    textDecorationLine: 'underline',
  },

  signupSection: {
    alignItems: 'center',
  },
  signupPrompt: {
    fontSize: fontSize.md,
    color: colors.white,
    opacity: 0.8,
    marginBottom: spacing.xs,
  },
  signupLink: {
    fontSize: fontSize.md,
    color: colors.white,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: spacing.xl,
  },
  footerText: {
    fontSize: fontSize.sm,
    color: colors.white,
    opacity: 0.7,
    marginBottom: spacing.xs,
  },
  footerContact: {
    fontSize: fontSize.sm,
    color: colors.white,
    opacity: 0.7,
  },
});

export default LoginScreen;

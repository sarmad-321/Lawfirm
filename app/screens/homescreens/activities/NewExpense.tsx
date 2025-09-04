import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, borderRadius, fontSize } from '../../../utils/theme';
import PopupWrapper, {
  PopupWrapperRef,
} from '../../../components/PopupWrapper';
import DocumentPicker from '../../../components/DocumentPicker';
import UploadDocument from '../../../components/UploadSection';
import FormsDropdown from '../../../components/FormsDropdown';
import FormsInput from '../../../components/FormsInput';
import SwitchButton from '../../../components/SwitchButton';

interface ExpenseForm {
  type: 'hard' | 'soft';
  receipt?: string;
  matter: {
    id: string;
    title: string;
  };
  category: string;
  rate: string;
  quantity: string;
  amount: string;
  description: string;
  date: string;
  firmUser: string;
}

const NewExpense = () => {
  const [form, setForm] = useState<ExpenseForm>({
    type: 'soft',
    matter: {
      id: '00001-wick',
      title: 'Murder case',
    },
    category: '',
    rate: '',
    quantity: '1',
    amount: '0.00',
    description: '',
    date: 'Today, Aug 25',
    firmUser: 'paul walker',
  });
  const documentPickerRef = useRef<PopupWrapperRef>(null);

  const handleClose = () => {
    // Close the form
    console.log('Close pressed');
  };

  const handleSave = () => {
    // Save the expense
    console.log('Save pressed', form);
  };

  const handleExpenseTypeChange = (type: 'hard' | 'soft') => {
    setForm(prev => ({ ...prev, type }));
  };

  const handleReceiptUpload = () => {
    // Open file picker for receipt
    documentPickerRef.current?.show();
    console.log('Receipt upload pressed');
  };

  const handleCategorySelect = () => {
    // Open category picker
    console.log('Category select pressed');
  };

  const handleDateSelect = () => {
    // Open date picker
    console.log('Date select pressed');
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleClose} style={styles.headerButton}>
        <Icon name="close" size={24} color={colors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>New expense</Text>
      <TouchableOpacity onPress={handleSave} style={styles.headerButton}>
        <Icon name="checkmark" size={24} color={colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );

  const renderExpenseType = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>Expense type</Text>
        <TouchableOpacity>
          <Text style={styles.helpLink}>What's this?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            form.type === 'hard' && styles.toggleButtonActive,
          ]}
          onPress={() => handleExpenseTypeChange('hard')}
        >
          <Text
            style={[
              styles.toggleButtonText,
              form.type === 'hard' && styles.toggleButtonTextActive,
            ]}
          >
            Hard cost
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            form.type === 'soft' && styles.toggleButtonActive,
          ]}
          onPress={() => handleExpenseTypeChange('soft')}
        >
          <Icon
            name="checkmark"
            size={16}
            color={
              form.type === 'soft' ? colors.textPrimary : colors.textSecondary
            }
            style={styles.toggleIcon}
          />
          <Text
            style={[
              styles.toggleButtonText,
              form.type === 'soft' && styles.toggleButtonTextActive,
            ]}
          >
            Soft cost
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderReceipt = () => (
    <UploadDocument handleReceiptUpload={handleReceiptUpload} />
  );

  const renderMatter = () => (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>Matter</Text>
      <View style={styles.matterInfo}>
        <Text style={styles.matterId}>{form.matter.id}</Text>
        <Text style={styles.matterTitle}>{form.matter.title}</Text>
      </View>
    </View>
  );

  const renderCategory = () => (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>Expense category</Text>
      <TouchableOpacity
        style={styles.selectField}
        onPress={handleCategorySelect}
        activeOpacity={0.8}
      >
        <Text style={styles.selectText}>
          {form.category || 'Select expense category'}
        </Text>
        <Icon name="chevron-down" size={20} color={colors.info} />
      </TouchableOpacity>
    </View>
  );

  const renderRateQuantityAmount = () => (
    <View style={styles.section}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.sectionLabel}>Rate</Text>
          <TextInput
            style={styles.input}
            placeholder="Rate or unit cost"
            placeholderTextColor={colors.textSecondary}
            value={form.rate}
            onChangeText={text => setForm(prev => ({ ...prev, rate: text }))}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.column}>
          <Text style={styles.sectionLabel}>Quantity</Text>
          <TextInput
            style={styles.input}
            value={form.quantity}
            onChangeText={text =>
              setForm(prev => ({ ...prev, quantity: text }))
            }
            keyboardType="numeric"
          />
        </View>
        <View style={styles.column}>
          <Text style={styles.sectionLabel}>Amount</Text>
          <TextInput
            style={styles.input}
            value={form.amount}
            onChangeText={text => setForm(prev => ({ ...prev, amount: text }))}
            keyboardType="numeric"
          />
        </View>
      </View>
    </View>
  );

  const renderDescription = () => (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>Description</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Enter description"
        placeholderTextColor={colors.textSecondary}
        value={form.description}
        onChangeText={text => setForm(prev => ({ ...prev, description: text }))}
        multiline
        numberOfLines={3}
      />
    </View>
  );

  const renderDate = () => (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>Date</Text>
      <TouchableOpacity
        style={styles.selectField}
        onPress={handleDateSelect}
        activeOpacity={0.8}
      >
        <Text style={styles.selectText}>{form.date}</Text>
        <Icon name="chevron-down" size={20} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );

  const renderFirmUser = () => (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>Firm user</Text>
      <View style={styles.firmUserInfo}>
        <Text style={styles.firmUserName}>{form.firmUser}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      {renderHeader()}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderExpenseType()}
        <View style={styles.separator} />

        {renderReceipt()}
        <View style={styles.separator} />

        <FormsDropdown
          label={'Select Matter'}
          title={'Matter'}
          required={true}
        />

        <FormsDropdown
          label={'Explense Category'}
          title={'Select expense category'}
          required={true}
        />

        <FormsInput label={'Amount'} placeholder={'0.00'} />
        <FormsInput label={'Description'} placeholder={'Enter description'} />
        <FormsInput
          label={'Reference number'}
          placeholder={'Enter description'}
        />
        <FormsDropdown label={'Date'} title={'Today, Aug 25'} />
        <FormsDropdown label={'Vendors'} title={'Select vendor'} />
        <FormsDropdown label={'Firm user'} title={'paul walker'} />
        <SwitchButton
          label="Non-Billable"
          description="Excludes this expense from billable amounts"
        />
      </ScrollView>

      <PopupWrapper ref={documentPickerRef}>
        <DocumentPicker />
      </PopupWrapper>
    </SafeAreaView>
  );
};

export default NewExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerButton: {
    padding: spacing.sm,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionLabel: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '500',
    marginBottom: spacing.sm,
  },
  helpLink: {
    color: colors.info,
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.xs,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
  },
  toggleButtonActive: {
    backgroundColor: colors.primary,
  },
  toggleButtonText: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  toggleButtonTextActive: {
    color: colors.textPrimary,
  },
  toggleIcon: {
    marginRight: spacing.xs,
  },
  receiptUpload: {
    borderWidth: 2,
    borderColor: colors.surfaceLight,
    borderStyle: 'dashed',
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  receiptText: {
    color: colors.info,
    fontSize: fontSize.md,
    fontWeight: '500',
    marginTop: spacing.sm,
  },
  matterInfo: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  matterId: {
    color: colors.info,
    fontSize: fontSize.md,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  matterTitle: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  selectField: {
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  selectText: {
    color: colors.info,
    fontSize: fontSize.md,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  column: {
    flex: 1,
  },
  input: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    color: colors.textPrimary,
    fontSize: fontSize.md,
  },
  textArea: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    color: colors.textPrimary,
    fontSize: fontSize.md,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  firmUserInfo: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  firmUserName: {
    color: colors.info,
    fontSize: fontSize.md,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: colors.gray700,
    marginHorizontal: spacing.lg,
  },
});

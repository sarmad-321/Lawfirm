import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { colors } from '../../../utils/theme';
import PopupWrapper, {
  PopupWrapperRef,
} from '../../../components/PopupWrapper';
import DocumentPicker from '../../../components/DocumentPicker';
import UploadDocument from '../../../components/UploadSection';
import FormsInput from '../../../components/FormsInput';
import FormsDropdown from '../../../components/FormsDropdown';
import DocumentCategory from '../../../components/DocumentCategory';

const AddDocument = () => {
  const [documentTitle, setDocumentTitle] = useState('');
  const [selectedMatter, setSelectedMatter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [receivedDate, setReceivedDate] = useState('Today, Aug 27');
  const [showTitleModal, setShowTitleModal] = useState(false);

  const documentPickerRef = useRef<PopupWrapperRef>(null);
  const documentCategoryPickerRef = useRef<PopupWrapperRef>(null);

  const handleFileSelect = () => {
    documentPickerRef.current?.show();
  };

  const handleMatterSelect = () => {
    Alert.alert('Matter Selection', 'Matter selection would open here');
  };

  const handleCategorySelect = () => {
    documentCategoryPickerRef.current?.show();
  };

  const handleSave = () => {
    if (!documentTitle.trim()) {
      Alert.alert('Error', 'Please enter document title');
      return;
    }
    if (!selectedMatter) {
      Alert.alert('Error', 'Please select a matter');
      return;
    }

    Alert.alert('Success', 'Document uploaded successfully');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonText}>×</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upload document</Text>
        <TouchableOpacity style={styles.headerButton} onPress={handleSave}>
          <Text style={styles.headerButtonText}>✓</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* File Upload */}
        <UploadDocument handleReceiptUpload={handleFileSelect} />

        <FormsInput
          placeholder={'Enter Document title...'}
          label={'Document title'}
          required={true}
        />

        <FormsDropdown
          label={'Select Matter'}
          title={'Matter'}
          required={true}
        />

        <FormsDropdown
          onPress={handleCategorySelect}
          label={'Select document category'}
          title={'Category'}
        />

        <FormsDropdown label={'Today, Aug 27'} title={'Received date'} />
      </View>

      {/* Title Input Modal */}
      <Modal visible={showTitleModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Enter Document Title</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter document title..."
              placeholderTextColor="#999"
              value={documentTitle}
              onChangeText={setDocumentTitle}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setShowTitleModal(false)}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowTitleModal(false)}>
                <Text style={styles.saveButton}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <PopupWrapper ref={documentPickerRef}>
        <DocumentPicker />
      </PopupWrapper>

      <PopupWrapper ref={documentCategoryPickerRef}>
        <DocumentCategory />
      </PopupWrapper>
    </SafeAreaView>
  );
};

export default AddDocument;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.textSecondary,
    backgroundColor: colors.backgroundLight,
  },
  label: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 8,
  },
  required: {
    color: '#ff6b6b',
    fontSize: 12,
  },
  fileUploadBox: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#404040',
    borderStyle: 'dashed',
  },
  fileUploadText: {
    color: '#2196f3',
    fontSize: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.textSecondary,
    backgroundColor: colors.backgroundLight,
  },
  rowLabel: {
    color: '#aaa',
    fontSize: 14,
  },
  rowValue: {
    fontSize: 14,
    color: '#fff',
  },
  placeholder: {
    color: '#777',
  },
  dateText: {
    color: '#2196f3',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 12,
  },
  modalInput: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#444',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  cancelButton: {
    color: '#bbb',
    marginRight: 20,
    fontSize: 14,
  },
  saveButton: {
    color: '#2196f3',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

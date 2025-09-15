import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, borderRadius, fontSize } from '../../../utils/theme';
import { useNavigation } from '@react-navigation/native';
import { vh, vw } from '../../../utils/units';

const RowDivider = () => <View style={styles.divider} />;

const Section: React.FC<{
  icon: string;
  title: string;
  children: React.ReactNode;
}> = ({ icon, title, children }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <View style={styles.sectionIconBadge}>
        <Icon name={icon} size={18} color={colors.textPrimary} />
      </View>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {children}
  </View>
);

const BillsDetails = () => {
  const navigation = useNavigation<any>();
  const invoiceTitle = 'Invoice #2';
  const [activeTab, setActiveTab] = useState<'details' | 'preview'>('details');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconBtn}
        >
          <Icon name="chevron-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{invoiceTitle}</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Icon
            name="share-social-outline"
            size={20}
            color={colors.textPrimary}
          />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsBar}>
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === 'details' && styles.tabItemActive,
          ]}
          activeOpacity={0.8}
          onPress={() => setActiveTab('details')}
        >
          <Icon
            name="checkmark"
            size={14}
            color={
              activeTab === 'details'
                ? colors.textPrimary
                : colors.textSecondary
            }
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'details' && styles.tabTextActive,
            ]}
          >
            Details
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === 'preview' && styles.tabItemActive,
          ]}
          activeOpacity={0.8}
          onPress={() => setActiveTab('preview')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'preview' && styles.tabTextActive,
            ]}
          >
            Preview
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'details' ? (
        <ScrollView style={styles.content}>
          {/* Related matter */}
          <Section icon="flash-outline" title="Related matter">
            <Text style={styles.linkText}>00001-wick</Text>
            <Text style={styles.secondaryText}>Murder case</Text>
          </Section>
          <RowDivider />

          {/* Status */}
          <Section icon="speedometer-outline" title="Status">
            <View style={[styles.badge, styles.statusDraft]}>
              <Text style={styles.badgeText}>Draft</Text>
            </View>
          </Section>
          <RowDivider />

          {/* Invoice total */}
          <Section icon="document-text-outline" title="Invoice total">
            <Text style={styles.valueStrong}>£20.00</Text>
            <Text style={[styles.subLabel, { marginTop: spacing.md }]}>
              Due
            </Text>
            <Text style={styles.valueStrong}>£20.00</Text>
            <Text style={[styles.subLabel, { marginTop: spacing.md }]}>
              Paid
            </Text>
            <Text style={styles.valueStrong}>£0.00</Text>
            <Text style={[styles.subLabel, { marginTop: spacing.md }]}>
              Credits issued
            </Text>
            <Text style={styles.mutedDash}>—</Text>
          </Section>
          <RowDivider />

          {/* Balances */}
          <Section icon="wallet-outline" title="Client outstanding balance">
            <Text style={styles.valueStrong}>£50.00</Text>
            <Text style={[styles.subLabel, { marginTop: spacing.md }]}>
              Matter outstanding balance
            </Text>
            <Text style={[styles.valueStrong, { color: colors.primaryLight }]}>
              £0.00
            </Text>
            <Text style={[styles.subLabel, { marginTop: spacing.md }]}>
              Matter trust funds
            </Text>
            <Text style={styles.valueStrong}>£0.00</Text>
          </Section>
          <RowDivider />

          {/* Dates */}
          <Section icon="calendar-outline" title="Issue date">
            <Text style={styles.valueStrong}>Tue, Aug 26</Text>
            <Text style={[styles.subLabel, { marginTop: spacing.md }]}>
              Last sent date
            </Text>
            <Text style={styles.mutedDash}>—</Text>
            <Text style={[styles.subLabel, { marginTop: spacing.md }]}>
              Due date
            </Text>
            <Text style={styles.valueStrong}>Thu, Sep 25 (in 29 days)</Text>
          </Section>

          <View style={{ height: spacing.xxl }} />
        </ScrollView>
      ) : (
        <Image
          source={{
            uri: 'https://marketplace.canva.com/EAETpJ0lmjg/2/0/566w/canva-fashion-invoice-YfB-WpWKvmM.jpg',
          }}
          style={styles.imagePreview}
        />

        // <View style={styles.previewContainer}>
        //   <Icon
        //     name="document-outline"
        //     size={48}
        //     color={colors.textSecondary}
        //   />
        //   <Text style={styles.previewTitle}>Invoice Preview</Text>
        //   <Text style={styles.previewSubtitle}>
        //     The printable preview will appear here.
        //   </Text>
        // </View>
      )}
    </SafeAreaView>
  );
};

export default BillsDetails;

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
  iconBtn: {
    padding: spacing.sm,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  tabsBar: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.lg,
    paddingVertical: spacing.xs,
  },
  tabItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.textPrimary,
  },
  tabText: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  tabTextActive: {
    color: colors.textPrimary,
    marginLeft: spacing.xs,
  },
  content: {
    flex: 1,
  },
  previewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  previewTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '700',
    marginTop: spacing.md,
  },
  previewSubtitle: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  section: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionIconBadge: {
    width: 34,
    height: 34,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray700,
  },
  linkText: {
    color: colors.primaryLight,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  secondaryText: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  statusDraft: {
    backgroundColor: 'rgba(138, 43, 226, 0.25)',
  },
  badgeText: {
    color: colors.textPrimary,
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  subLabel: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  valueStrong: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '700',
  },
  mutedDash: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
  },
  imagePreview: {
    height: vh * 60,
    width: vw * 100,
    resizeMode: 'contain',
    marginTop: spacing.md,
  },
});

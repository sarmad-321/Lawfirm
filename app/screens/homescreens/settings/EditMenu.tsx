import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
  PanResponder,
  Animated,
  Dimensions,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, borderRadius, fontSize } from '../../../utils/theme';
import { useNavigation } from '@react-navigation/native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';

type MenuItem = {
  key: string;
  label: string;
  icon: string;
  enabled: boolean;
};

const DEFAULT_ITEMS: MenuItem[] = [
  { key: 'matter', label: 'Matter', icon: 'briefcase-outline', enabled: true },
  { key: 'event', label: 'Event', icon: 'calendar-outline', enabled: true },
  { key: 'time', label: 'Time entry', icon: 'time-outline', enabled: true },
  { key: 'expense', label: 'Expense', icon: 'cash-outline', enabled: true },
  { key: 'task', label: 'Task', icon: 'list-outline', enabled: true },
  { key: 'payment', label: 'Payment', icon: 'card-outline', enabled: true },
  { key: 'note', label: 'Note', icon: 'create-outline', enabled: true },
  {
    key: 'document',
    label: 'Document',
    icon: 'document-text-outline',
    enabled: true,
  },
  { key: 'contact', label: 'Contact', icon: 'person-outline', enabled: true },
  { key: 'email', label: 'Email log', icon: 'mail-outline', enabled: true },
  { key: 'phone', label: 'Phone log', icon: 'call-outline', enabled: true },
];

const DraggableRow = ({ item, index, onToggle, isDragging, dragY, drag }) => {
  return (
    <ScaleDecorator>
      <View style={[styles.row, styles.draggingRow]}>
        <View style={styles.rowLeft}>
          <View style={styles.iconBadge}>
            <Icon name={item.icon} size={18} color={colors.textPrimary} />
          </View>
          <Text style={styles.rowLabel}>{item.label}</Text>
        </View>
        <View style={styles.rowRight}>
          <Switch
            value={item.enabled}
            onValueChange={() => onToggle(item.key)}
            thumbColor={item.enabled ? colors.primaryLight : colors.gray600}
            trackColor={{ false: colors.gray700, true: colors.primaryDark }}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onLongPress={drag}
            style={styles.dragHandle}
          >
            <Icon
              name="reorder-three-outline"
              size={24}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScaleDecorator>
  );
};

const EditMenu = () => {
  const navigation = useNavigation<any>();
  const [items, setItems] = useState<MenuItem[]>(DEFAULT_ITEMS);
  const [draggedIndex, setDraggedIndex] = useState(-1);
  const dragY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  const toggleItem = (key: string) => {
    setItems(prev =>
      prev.map(i => (i.key === key ? { ...i, enabled: !i.enabled } : i)),
    );
  };

  const onSave = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerBtn}
        >
          <Icon name="close" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit menu</Text>
        <TouchableOpacity onPress={onSave} style={styles.headerBtn}>
          <Icon name="checkmark" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.notice}>
        <Text style={styles.noticeText}>
          Toggle switches or drag the handle (≡) to customize your menu.
        </Text>
      </View>
      {/* <DraggableFlatList
        data={items}
        onDragEnd={({ data }) => setItems(data)} // ✅ updated
        keyExtractor={item => item.key}
        renderItem={renderItem}
      /> */}

      <View style={{ flex: 1 }}>
        <DraggableFlatList
          data={items}
          onDragEnd={({ data }) => setItems(data)}
          keyExtractor={item => item.key}
          renderItem={({
            item,
            index,
            drag,
            isActive,
          }: RenderItemParams<MenuItem>) => (
            <DraggableRow
              item={item}
              index={index}
              drag={drag}
              onToggle={toggleItem}
              isDragging={isActive}
              dragY={dragY}
            />
          )}
        />
      </View>
      <View style={styles.footerSpacer} />
    </SafeAreaView>
  );
};

export default EditMenu;

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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerBtn: {
    padding: spacing.sm,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: '700',
  },
  notice: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.gray700,
  },
  noticeText: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.gray700,
    backgroundColor: colors.surface,
  },
  draggingRow: {
    backgroundColor: colors.backgroundDark,
    shadowColor: colors.textPrimary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderRadius: borderRadius.md,
    marginHorizontal: spacing.sm,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBadge: {
    width: 34,
    height: 34,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  rowLabel: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: '600',
    flex: 1,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dragHandle: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginLeft: spacing.sm,
  },
  resetBtn: {
    alignSelf: 'center',
    marginTop: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxl,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background,
  },
  resetText: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
  footerSpacer: {
    height: spacing.xl,
  },
});

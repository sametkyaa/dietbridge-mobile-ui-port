import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { AppButton, BottomSheetView, Icon } from '../../components';

/**
 * AddWeightSheetView — KiloEkleSheet port'u: büyük sayısal giriş (kg),
 * tarih satırı (varsayılan bugün), doğrulama ipucu, kaydet.
 *
 * Controlled: value + onValueChange host tarafından yönetilir.
 * isSaving=true iken Kaydet butonu spinner gösterir ve basışı engeller.
 */
export function AddWeightSheetView({
  visible,
  value,
  onValueChange,
  unit = 'kg',
  dateLabel,
  todayLabel = 'Bugün',
  title = 'Ölçüm ekle',
  hint = '30–250 kg aralığında bir değer gir; ondalık için virgül kullanabilirsin.',
  saveLabel = 'Kaydet',
  isSaving = false,
  onSave,
  onClose,
}) {
  return (
    <BottomSheetView
      visible={visible}
      onClose={onClose}
      title={title}
      footer={
        <AppButton variant="primary" label={saveLabel} loading={isSaving} onPress={onSave} />
      }
    >
      <View style={styles.inputRow}>
        <TextInput
          value={value}
          onChangeText={onValueChange}
          keyboardType="decimal-pad"
          placeholder="0,0"
          placeholderTextColor={colors.textTertiary}
          accessibilityLabel={`Kilo değeri (${unit})`}
          style={styles.input}
        />
        <Text style={styles.unit}>{unit}</Text>
      </View>

      {dateLabel ? (
        <View style={styles.dateRow}>
          <Icon name="calendar" size={18} color={colors.textTertiary} accessible={false} />
          <Text style={styles.dateText} numberOfLines={1}>
            {dateLabel}
          </Text>
          <Text style={styles.todayText}>{todayLabel}</Text>
        </View>
      ) : null}

      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </BottomSheetView>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: spacing.x2,
    marginTop: spacing.x2,
  },
  input: {
    minWidth: 110,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingBottom: spacing.x1,
    textAlign: 'center',
    fontSize: 40,
    lineHeight: 46,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  unit: {
    ...typography.body,
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
    paddingBottom: spacing.x1,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x3,
    borderRadius: radius.control,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.x4,
    paddingVertical: spacing.x3 + 2,
    marginTop: spacing.x2,
  },
  dateText: { flex: 1, ...typography.body, fontSize: 14, color: colors.textPrimary },
  todayText: { ...typography.caption, color: colors.textTertiary },
  hint: { ...typography.caption, fontWeight: '400', color: colors.textTertiary },
});

export default AddWeightSheetView;

import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { AppButton, BottomSheetView, Icon } from '../../components';

/**
 * AddMeasurementSheetView — OlcuEkleSheet port'u: bel/kalça/göğüs/kol gibi
 * alanların cm girişi, tarih satırı, ipucu, kaydet.
 *
 * fields: [{ key, label, unit? }] — hangi alanların gösterileceğini belirler.
 * values: { [fieldKey]: string } — controlled; onFieldChange(key, value).
 * Yalnızca doldurulan alanların kaydedilmesi host'un sorumluluğundadır.
 */
export function AddMeasurementSheetView({
  visible,
  fields = [],
  values = {},
  onFieldChange,
  dateLabel,
  todayLabel = 'Bugün',
  title = 'Ölçü ekle',
  subtitle = 'Yalnızca güncellemek istediğin alanları doldurman yeterli.',
  hint = 'Mezurayı vücuduna paralel, sıkmadan ölç. Değerleri yalnızca sen ve diyetisyenin görürsünüz.',
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
      scrollable
      footer={
        <AppButton variant="primary" label={saveLabel} loading={isSaving} onPress={onSave} />
      }
    >
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}

      <View style={styles.fields}>
        {fields.map((f) => (
          <View key={f.key} style={styles.fieldRow}>
            <Text style={styles.fieldLabel} numberOfLines={1}>
              {f.label}
            </Text>
            <TextInput
              value={values[f.key] || ''}
              onChangeText={onFieldChange ? (v) => onFieldChange(f.key, v) : undefined}
              keyboardType="decimal-pad"
              placeholder="0"
              placeholderTextColor={colors.textTertiary}
              accessibilityLabel={`${f.label} değeri (${f.unit || 'cm'})`}
              style={styles.fieldInput}
            />
            <Text style={styles.fieldUnit}>{f.unit || 'cm'}</Text>
          </View>
        ))}
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
  subtitle: { ...typography.supporting, color: colors.textSecondary, marginTop: -spacing.x1 },
  fields: { gap: spacing.x2 + 2 },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x3,
    borderRadius: radius.control,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.x4,
    paddingVertical: spacing.x3,
  },
  fieldLabel: { flex: 1, ...typography.body, fontSize: 14, fontWeight: '500', color: colors.textPrimary },
  fieldInput: {
    minWidth: 56,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingBottom: 2,
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  fieldUnit: { ...typography.supporting, fontWeight: '500', color: colors.textTertiary },
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
    marginTop: spacing.x1,
  },
  dateText: { flex: 1, ...typography.body, fontSize: 14, color: colors.textPrimary },
  todayText: { ...typography.caption, color: colors.textTertiary },
  hint: { ...typography.caption, fontWeight: '400', lineHeight: 17, color: colors.textTertiary },
});

export default AddMeasurementSheetView;

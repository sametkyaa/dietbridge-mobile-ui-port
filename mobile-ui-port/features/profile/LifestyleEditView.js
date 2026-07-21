import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { AppButton, AppInput, AppScreen, ChoiceChip } from '../../components';
import { ProfileHeader } from './ProfileHeader';

function SingleChipGroup({ label, options, selectedValue, onSelect, hint }) {
  return (
    <View>
      <Text style={styles.groupLabel}>{label}</Text>
      <View style={styles.chips}>
        {options.map((opt) => (
          <ChoiceChip
            key={opt.value}
            label={opt.label}
            selected={selectedValue === opt.value}
            onPress={onSelect ? () => onSelect(opt.value) : undefined}
          />
        ))}
      </View>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

/**
 * LifestyleEditView — ProfilDuzenleYasamTarzi port'u: aktivite, beslenme tipi,
 * uyku, sigara ve alkol; tekli seçim chip'leri, yargılamayan dil.
 *
 * Controlled form: values { activity, dietType, sleepHours, smoking, alcohol } +
 * onFieldChange(key, value); options { activity: [...], dietType: [...],
 * smoking: [...], alcohol: [...] } — [{ value, label }].
 *
 * Uyku süresi chip DEĞİL sayısal AppInput'tur (decimal-pad); aralık
 * doğrulaması UI'da yapılmaz, hata host'tan errors.sleepHours ile gelir.
 */
export function LifestyleEditView({
  title = 'Yaşam tarzı',
  intro = 'Günlük ritmin, planının hayatına uymasına yardımcı olur. Bu bilgiler yalnızca planını kişiselleştirmek için kullanılır.',
  values = {},
  options = {},
  errors = {},
  isSaving = false,
  saveLabel = 'Kaydet',
  cancelLabel = 'Vazgeç',
  onFieldChange,
  onSave,
  onCancel,
  onBack,
}) {
  const select = (key) => (onFieldChange ? (v) => onFieldChange(key, v) : undefined);

  return (
    <AppScreen
      scroll
      padTop
      header={<ProfileHeader title={title} onBack={onBack} />}
      contentStyle={styles.content}
    >
      {intro ? <Text style={styles.intro}>{intro}</Text> : null}

      <SingleChipGroup
        label="Aktivite düzeyi"
        options={options.activity || []}
        selectedValue={values.activity}
        onSelect={select('activity')}
      />
      <SingleChipGroup
        label="Beslenme tipi"
        options={options.dietType || []}
        selectedValue={values.dietType}
        onSelect={select('dietType')}
      />
      <AppInput
        label="Uyku süresi"
        value={values.sleepHours || ''}
        onChangeText={select('sleepHours')}
        placeholder="örn. 7,5"
        keyboardType="decimal-pad"
        error={errors.sleepHours}
        hint={errors.sleepHours ? undefined : 'Gecelik ortalama uyku süreni saat olarak gir.'}
        accessibilityLabel="Uyku süresi (saat)"
      />
      <SingleChipGroup
        label="Sigara kullanımı"
        options={options.smoking || []}
        selectedValue={values.smoking}
        onSelect={select('smoking')}
      />
      <SingleChipGroup
        label="Alkol kullanımı"
        options={options.alcohol || []}
        selectedValue={values.alcohol}
        onSelect={select('alcohol')}
        hint="Bu bilgiler değerlendirme için değil, yalnızca planının sana uyması için sorulur."
      />

      <View style={styles.footer}>
        <AppButton variant="primary" label={saveLabel} loading={isSaving} onPress={onSave} />
        {onCancel ? (
          <AppButton variant="text" label={cancelLabel} onPress={onCancel} style={styles.cancel} />
        ) : null}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.x5 },
  intro: { ...typography.body, fontSize: 14, lineHeight: 21, color: colors.textSecondary },
  groupLabel: { ...typography.supporting, fontWeight: '500', color: colors.textSecondary, marginBottom: spacing.x2 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.x2 },
  hint: { ...typography.caption, fontWeight: '400', lineHeight: 17, color: colors.textTertiary, marginTop: spacing.x2 },
  footer: { gap: spacing.x1, marginTop: spacing.x1 },
  cancel: { alignSelf: 'center' },
});

export default LifestyleEditView;

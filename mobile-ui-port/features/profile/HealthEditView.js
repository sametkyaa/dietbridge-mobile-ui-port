import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { AppButton, AppInput, AppScreen, ChoiceChip, Icon } from '../../components';
import { ProfileHeader } from './ProfileHeader';

function SingleChipGroup({ label, options, selectedValue, onSelect }) {
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
    </View>
  );
}

function MultiChipGroup({ label, options, selectedValues, onToggle, onAddCustom, addCustomLabel, hint }) {
  return (
    <View>
      <Text style={styles.groupLabel}>{label}</Text>
      <View style={styles.chips}>
        {options.map((opt) => (
          <ChoiceChip
            key={opt.value}
            label={opt.label}
            selected={selectedValues.includes(opt.value)}
            onPress={onToggle ? () => onToggle(opt.value) : undefined}
          />
        ))}
        {onAddCustom ? (
          <Pressable
            onPress={onAddCustom}
            accessibilityRole="button"
            accessibilityLabel={addCustomLabel}
            hitSlop={4}
            style={({ pressed }) => [styles.addChip, pressed && styles.pressed]}
          >
            <Icon name="plus" size={14} color={colors.textSecondary} accessible={false} />
            <Text style={styles.addChipText}>{addCustomLabel}</Text>
          </Pressable>
        ) : null}
      </View>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

/**
 * HealthEditView — ProfilDuzenleSaglik port'u: kan grubu (tekli), kronik
 * rahatsızlıklar / ilaçlar / intoleranslar / sevilmeyen besinler (çoklu +
 * özel ekleme), son tahlil tarihi.
 *
 * Controlled form:
 * - searchQuery + onSearchQueryChange: liste içi arama/özel ekleme girişi
 * - values { bloodType, conditions[], medications[], intolerances[],
 *   dislikedFoods[], lastCheckupDate }
 * - options { bloodType: [...], conditions: [...], medications: [...],
 *   intolerances: [...], dislikedFoods: [...] } — [{ value, label }]
 * - onFieldChange('bloodType' | 'lastCheckupDate', v): tekli alanlar
 * - onToggleItem(key, value): çoklu gruplar (key: conditions/medications/…)
 * - onAddCustomItem(key): "Özel ekle" düğmesi (ilaçlar, sevilmeyen besinler)
 */
export function HealthEditView({
  title = 'Sağlık ve beslenme',
  intro = 'Diyetisyeninin bilmesi gerekenleri seç ya da ekle. Bu bilgiler yalnızca planını kişiselleştirmek için kullanılır; istediğin zaman değiştirebilirsin.',
  searchQuery = '',
  values = {},
  options = {},
  isSaving = false,
  addCustomLabel = 'Özel ekle',
  saveLabel = 'Kaydet',
  cancelLabel = 'Vazgeç',
  onSearchQueryChange,
  onFieldChange,
  onToggleItem,
  onAddCustomItem,
  onSave,
  onCancel,
  onBack,
}) {
  const multi = (key) => (onToggleItem ? (v) => onToggleItem(key, v) : undefined);
  const custom = (key) => (onAddCustomItem ? () => onAddCustomItem(key) : undefined);

  return (
    <AppScreen
      scroll
      padTop
      header={<ProfileHeader title={title} onBack={onBack} />}
      contentStyle={styles.content}
    >
      {intro ? <Text style={styles.intro}>{intro}</Text> : null}

      <AppInput
        value={searchQuery}
        onChangeText={onSearchQueryChange}
        placeholder="Ara veya ekle: örn. glüten"
        accessibilityLabel="Sağlık ve beslenme öğelerinde ara"
      />

      <SingleChipGroup
        label="Kan grubu"
        options={options.bloodType || []}
        selectedValue={values.bloodType}
        onSelect={onFieldChange ? (v) => onFieldChange('bloodType', v) : undefined}
      />
      <MultiChipGroup
        label="Kronik rahatsızlıklar"
        options={options.conditions || []}
        selectedValues={values.conditions || []}
        onToggle={multi('conditions')}
      />
      <MultiChipGroup
        label="Kullanılan ilaçlar"
        options={options.medications || []}
        selectedValues={values.medications || []}
        onToggle={multi('medications')}
        onAddCustom={custom('medications')}
        addCustomLabel={addCustomLabel}
        hint="Düzenli kullandığın ilaçları ekle; doz bilgisini diyetisyeninle mesajda paylaşabilirsin."
      />
      <MultiChipGroup
        label="İntoleranslar"
        options={options.intolerances || []}
        selectedValues={values.intolerances || []}
        onToggle={multi('intolerances')}
      />
      <MultiChipGroup
        label="Sevilmeyen besinler"
        options={options.dislikedFoods || []}
        selectedValues={values.dislikedFoods || []}
        onToggle={multi('dislikedFoods')}
        onAddCustom={custom('dislikedFoods')}
        addCustomLabel={addCustomLabel}
        hint="Zaten ekli olan bir öğe aramada tekrar önerilmez; kaldırmak için çipe dokun."
      />

      <AppInput
        label="Son tahlil tarihi"
        value={values.lastCheckupDate || ''}
        onChangeText={onFieldChange ? (v) => onFieldChange('lastCheckupDate', v) : undefined}
        placeholder="GG.AA.YYYY"
        hint="Güncel tahlil sonuçlarını diyetisyeninle mesaj üzerinden paylaşabilirsin."
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
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.x2, alignItems: 'center' },
  addChip: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x1 + 2,
    borderRadius: radius.control,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.borderSoft,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.x3 + 2,
  },
  addChipText: { ...typography.supporting, fontWeight: '500', color: colors.textSecondary },
  hint: { ...typography.caption, fontWeight: '400', lineHeight: 17, color: colors.textTertiary, marginTop: spacing.x2 },
  footer: { gap: spacing.x1, marginTop: spacing.x1 },
  cancel: { alignSelf: 'center' },
  pressed: { opacity: 0.8 },
});

export default HealthEditView;

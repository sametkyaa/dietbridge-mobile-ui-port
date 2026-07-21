import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { AppButton, AppInput, AppScreen, ChoiceChip, Icon } from '../../components';
import OnboardingHeader from './OnboardingHeader';
import StepProgress from './StepProgress';

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
      {hint ? <Text style={styles.note}>{hint}</Text> : null}
    </View>
  );
}

function MultiChipGroup({ label, options, selectedValues, onToggle, onAddCustom, addCustomLabel, hint }) {
  return (
    <View>
      <Text style={styles.groupLabel}>{label}</Text>
      <View style={styles.chips}>
        {options.map((opt) => {
          const selected = selectedValues.includes(opt.value);
          return (
            <ChoiceChip
              key={opt.value}
              label={opt.label}
              selected={selected}
              onPress={onToggle ? () => onToggle(opt.value) : undefined}
            />
          );
        })}
        {onAddCustom ? (
          <Pressable
            onPress={onAddCustom}
            accessibilityRole="button"
            accessibilityLabel={addCustomLabel || 'Özel ekle'}
            hitSlop={4}
            style={({ pressed }) => [styles.customAdd, pressed && styles.pressed]}
          >
            <Icon name="plus" size={14} color={colors.textSecondary} accessible={false} />
            <Text style={styles.customAddText}>{addCustomLabel || 'Özel ekle'}</Text>
          </Pressable>
        ) : null}
      </View>
      {hint ? <Text style={styles.note}>{hint}</Text> : null}
    </View>
  );
}

/**
 * ProfileSetupStep4View — ProfilTamamlama4.tsx port'u (Sağlık ve beslenme).
 * DietBridge mobil veri kapsamındaki tüm sağlık alanları:
 *
 * - Kan grubu (tekli): bloodTypeOptions / selectedBloodType / onSelectBloodType
 * - Sigara kullanımı (tekli): smokingOptions / selectedSmoking / onSelectSmoking
 * - Alkol kullanımı (tekli): alcoholOptions / selectedAlcohol / onSelectAlcohol
 * - Kronik rahatsızlıklar (çoklu + özel ekleme): conditionOptions /
 *   selectedConditions / onToggleCondition / onAddCustomCondition
 * - Kullanılan ilaçlar (çoklu + özel ekleme): medicationOptions /
 *   selectedMedications / onToggleMedication / onAddCustomMedication
 * - Besin intoleransları (çoklu + özel ekleme): intoleranceOptions /
 *   selectedIntolerances / onToggleIntolerance / onAddCustomIntolerance
 * - Sevilmeyen besinler (çoklu + özel ekleme): dislikedFoodOptions /
 *   selectedDislikedFoods / onToggleDislikedFood / onAddCustomFood
 * - Son tahlil tarihi: lastLabDate / lastLabDateError / onLastLabDateChange
 *
 * Seçenek listeleri her zaman props'tan gelir; bu dosyada seçenek hardcode
 * EDİLMEZ. Yargılamayan dil; alanlar boş bırakılabilir.
 */
export function ProfileSetupStep4View({
  searchQuery = '',
  bloodTypeOptions = [],
  selectedBloodType = null,
  smokingOptions = [],
  selectedSmoking = null,
  alcoholOptions = [],
  selectedAlcohol = null,
  conditionOptions = [],
  selectedConditions = [],
  medicationOptions = [],
  selectedMedications = [],
  intoleranceOptions = [],
  selectedIntolerances = [],
  dislikedFoodOptions = [],
  selectedDislikedFoods = [],
  lastLabDate = '',
  lastLabDateError,
  step = 4,
  totalSteps = 4,
  onSearchQueryChange,
  onSelectBloodType,
  onSelectSmoking,
  onSelectAlcohol,
  onToggleCondition,
  onAddCustomCondition,
  onToggleMedication,
  onAddCustomMedication,
  onToggleIntolerance,
  onAddCustomIntolerance,
  onToggleDislikedFood,
  onAddCustomFood,
  onLastLabDateChange,
  onBack,
  onContinue,
  onSkip,
}) {
  return (
    <AppScreen
      scroll
      header={<OnboardingHeader title="Profilini tamamla" onBack={onBack} />}
      contentStyle={styles.content}
    >
      <StepProgress step={step} totalSteps={totalSteps} />
      <Text style={styles.title}>Sağlık ve beslenme</Text>
      <Text style={styles.subtitle}>
        Bu bilgiler diyetisyeninin planını güvenle hazırlamasına yardımcı olur. İstediğin alanı
        boş bırakabilirsin.
      </Text>

      <AppInput
        value={searchQuery}
        onChangeText={onSearchQueryChange}
        placeholder="Ara: örn. laktoz"
        accessibilityLabel="Sağlık ve beslenme öğelerinde ara"
        style={styles.search}
      />

      <View style={styles.form}>
        <SingleChipGroup
          label="Kan grubu"
          options={bloodTypeOptions}
          selectedValue={selectedBloodType}
          onSelect={onSelectBloodType}
        />
        <SingleChipGroup
          label="Sigara kullanımı"
          options={smokingOptions}
          selectedValue={selectedSmoking}
          onSelect={onSelectSmoking}
        />
        <SingleChipGroup
          label="Alkol kullanımı"
          options={alcoholOptions}
          selectedValue={selectedAlcohol}
          onSelect={onSelectAlcohol}
          hint="Bu bilgiler değerlendirme için değil, yalnızca planının sana uyması için sorulur."
        />
        <MultiChipGroup
          label="Kronik rahatsızlıklar"
          options={conditionOptions}
          selectedValues={selectedConditions}
          onToggle={onToggleCondition}
          onAddCustom={onAddCustomCondition}
        />
        <MultiChipGroup
          label="Kullanılan ilaçlar"
          options={medicationOptions}
          selectedValues={selectedMedications}
          onToggle={onToggleMedication}
          onAddCustom={onAddCustomMedication}
          hint="Düzenli kullandığın ilaçları ekle; doz bilgisini diyetisyeninle mesajda paylaşabilirsin."
        />
        <MultiChipGroup
          label="Besin intoleransları"
          options={intoleranceOptions}
          selectedValues={selectedIntolerances}
          onToggle={onToggleIntolerance}
          onAddCustom={onAddCustomIntolerance}
        />
        <MultiChipGroup
          label="Sevilmeyen besinler"
          options={dislikedFoodOptions}
          selectedValues={selectedDislikedFoods}
          onToggle={onToggleDislikedFood}
          onAddCustom={onAddCustomFood}
          hint="Eklediğin bir öğe listede tekrar gösterilmez; istediğin zaman kaldırabilirsin."
        />

        <AppInput
          label="Son tahlil tarihi"
          value={lastLabDate}
          onChangeText={onLastLabDateChange}
          placeholder="GG.AA.YYYY"
          error={lastLabDateError}
          hint={
            lastLabDateError
              ? undefined
              : 'Güncel tahlil sonuçlarını diyetisyeninle mesaj üzerinden paylaşabilirsin.'
          }
        />
      </View>

      <View style={styles.spacer} />

      <AppButton
        variant="primary"
        label="Profili tamamla"
        onPress={onContinue}
        accessibilityLabel="Profili tamamla"
      />
      {onSkip ? (
        <AppButton
          variant="text"
          label="Şimdilik geç"
          onPress={onSkip}
          style={styles.skip}
        />
      ) : null}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, paddingTop: spacing.x3 },
  title: { ...typography.sectionTitle, fontSize: 24, lineHeight: 30, color: colors.textPrimary, marginTop: spacing.x5 },
  subtitle: {
    ...typography.supporting,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
    marginTop: spacing.x2,
  },
  search: { marginTop: spacing.x5 },
  form: { gap: spacing.x5, marginTop: spacing.x5 },
  groupLabel: {
    ...typography.supporting,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: spacing.x2,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.x2, alignItems: 'center' },
  customAdd: {
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
  customAddText: { ...typography.supporting, fontWeight: '500', color: colors.textSecondary },
  note: { ...typography.caption, fontWeight: '400', color: colors.textTertiary, marginTop: spacing.x2 },
  spacer: { flex: 1, minHeight: spacing.x6 },
  skip: { alignSelf: 'center', marginTop: spacing.x2 },
  pressed: { opacity: 0.7 },
});

export default ProfileSetupStep4View;

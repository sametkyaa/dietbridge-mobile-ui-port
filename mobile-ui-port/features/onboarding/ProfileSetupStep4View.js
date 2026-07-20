import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { AppButton, AppInput, AppScreen, ChoiceChip, Icon } from '../../components';
import OnboardingHeader from './OnboardingHeader';
import StepProgress from './StepProgress';

function MultiChipGroup({ label, options, selectedValues, onToggle }) {
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
      </View>
    </View>
  );
}

/**
 * ProfileSetupStep4View — ProfilTamamlama4.tsx port'u (Sağlık ve beslenme).
 * Çoklu seçim grupları: kronik rahatsızlıklar, intoleranslar, sevilmeyen
 * besinler. Yargılamayan dil; alanlar boş bırakılabilir.
 *
 * conditionOptions / intoleranceOptions / dislikedFoodOptions: [{ value, label }]
 * selectedConditions / selectedIntolerances / selectedDislikedFoods: value[]
 */
export function ProfileSetupStep4View({
  searchQuery = '',
  conditionOptions = [],
  selectedConditions = [],
  intoleranceOptions = [],
  selectedIntolerances = [],
  dislikedFoodOptions = [],
  selectedDislikedFoods = [],
  step = 4,
  totalSteps = 4,
  onSearchQueryChange,
  onToggleCondition,
  onToggleIntolerance,
  onToggleDislikedFood,
  onAddCustomFood,
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
        <MultiChipGroup
          label="Kronik rahatsızlıklar"
          options={conditionOptions}
          selectedValues={selectedConditions}
          onToggle={onToggleCondition}
        />
        <MultiChipGroup
          label="İntoleranslar"
          options={intoleranceOptions}
          selectedValues={selectedIntolerances}
          onToggle={onToggleIntolerance}
        />
        <View>
          <Text style={styles.groupLabel}>Sevilmeyen besinler</Text>
          <View style={styles.chips}>
            {dislikedFoodOptions.map((opt) => (
              <ChoiceChip
                key={opt.value}
                label={opt.label}
                selected={selectedDislikedFoods.includes(opt.value)}
                onPress={
                  onToggleDislikedFood ? () => onToggleDislikedFood(opt.value) : undefined
                }
              />
            ))}
            {onAddCustomFood ? (
              <Pressable
                onPress={onAddCustomFood}
                accessibilityRole="button"
                accessibilityLabel="Özel besin ekle"
                hitSlop={4}
                style={({ pressed }) => [styles.customAdd, pressed && styles.pressed]}
              >
                <Icon name="plus" size={14} color={colors.textSecondary} accessible={false} />
                <Text style={styles.customAddText}>Özel ekle</Text>
              </Pressable>
            ) : null}
          </View>
          <Text style={styles.note}>
            Eklediğin bir öğe listede tekrar gösterilmez; istediğin zaman kaldırabilirsin.
          </Text>
        </View>
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

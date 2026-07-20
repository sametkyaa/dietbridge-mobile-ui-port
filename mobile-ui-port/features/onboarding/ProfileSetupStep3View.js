import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { AppButton, AppScreen, ChoiceChip, Icon } from '../../components';
import OnboardingHeader from './OnboardingHeader';
import StepProgress from './StepProgress';

function ChipGroup({ label, options, selectedValue, onSelect }) {
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

/**
 * ProfileSetupStep3View — ProfilTamamlama3.tsx port'u (Yaşam tarzı).
 *
 * activityOptions / dietTypeOptions / sleepOptions: [{ value, label }]
 * waterGoalLabel: string (örn. "2,5") — stepper değeri; artır/azalt mantığı
 * host'ta kalır, bu görünüm yalnızca callback tetikler.
 */
export function ProfileSetupStep3View({
  activityOptions = [],
  selectedActivity = null,
  dietTypeOptions = [],
  selectedDietType = null,
  sleepOptions = [],
  selectedSleep = null,
  waterGoalLabel = '',
  waterGoalUnit = 'L',
  step = 3,
  totalSteps = 4,
  onSelectActivity,
  onSelectDietType,
  onSelectSleep,
  onDecreaseWaterGoal,
  onIncreaseWaterGoal,
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
      <Text style={styles.title}>Yaşam tarzı</Text>
      <Text style={styles.subtitle}>
        Günlük ritmini bilmemiz, planının hayatına uymasına yardımcı olur.
      </Text>

      <View style={styles.form}>
        <ChipGroup
          label="Aktivite düzeyi"
          options={activityOptions}
          selectedValue={selectedActivity}
          onSelect={onSelectActivity}
        />
        <ChipGroup
          label="Beslenme tipi"
          options={dietTypeOptions}
          selectedValue={selectedDietType}
          onSelect={onSelectDietType}
        />
        <ChipGroup
          label="Uyku süresi"
          options={sleepOptions}
          selectedValue={selectedSleep}
          onSelect={onSelectSleep}
        />

        <View>
          <Text style={styles.groupLabel}>Günlük su hedefi</Text>
          <View style={styles.stepper}>
            <Pressable
              onPress={onDecreaseWaterGoal}
              disabled={!onDecreaseWaterGoal}
              accessibilityRole="button"
              accessibilityLabel="Su hedefini azalt"
              hitSlop={8}
              style={({ pressed }) => [
                styles.stepperButton,
                styles.stepperButtonMuted,
                pressed && styles.pressed,
              ]}
            >
              <Icon name="minus" size={17} color={colors.textSecondary} accessible={false} />
            </Pressable>
            <Text
              style={styles.stepperValue}
              accessibilityLabel={`Günlük su hedefi ${waterGoalLabel} ${waterGoalUnit}`}
            >
              {waterGoalLabel}
              <Text style={styles.stepperUnit}>{` ${waterGoalUnit}`}</Text>
            </Text>
            <Pressable
              onPress={onIncreaseWaterGoal}
              disabled={!onIncreaseWaterGoal}
              accessibilityRole="button"
              accessibilityLabel="Su hedefini artır"
              hitSlop={8}
              style={({ pressed }) => [
                styles.stepperButton,
                styles.stepperButtonPrimary,
                pressed && styles.pressed,
              ]}
            >
              <Icon name="plus" size={17} color={colors.primaryDark} accessible={false} />
            </Pressable>
          </View>
          <Text style={styles.note}>
            Ortalama bir hedefle başladık; sonra birlikte ayarlayabilirsiniz.
          </Text>
        </View>
      </View>

      <View style={styles.spacer} />

      <AppButton
        variant="primary"
        label="Devam et"
        onPress={onContinue}
        accessibilityLabel="Devam et"
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
  form: { gap: spacing.x5, marginTop: spacing.x6 },
  groupLabel: {
    ...typography.supporting,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: spacing.x2,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.x2 },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: radius.control,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.x4,
    paddingVertical: spacing.x3,
  },
  stepperButton: {
    width: 44,
    height: 44,
    borderRadius: radius.round,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperButtonMuted: { backgroundColor: colors.surfaceMuted },
  stepperButtonPrimary: { backgroundColor: colors.primarySoft },
  stepperValue: { ...typography.sectionTitle, fontSize: 24, lineHeight: 30, color: colors.textPrimary },
  stepperUnit: { ...typography.body, fontWeight: '500', color: colors.textSecondary },
  note: { ...typography.caption, fontWeight: '400', color: colors.textTertiary, marginTop: spacing.x2 },
  spacer: { flex: 1, minHeight: spacing.x6 },
  skip: { alignSelf: 'center', marginTop: spacing.x2 },
  pressed: { opacity: 0.7 },
});

export default ProfileSetupStep3View;

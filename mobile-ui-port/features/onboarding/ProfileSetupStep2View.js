import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { AppButton, AppInput, AppScreen, ChoiceChip } from '../../components';
import OnboardingHeader from './OnboardingHeader';
import StepProgress from './StepProgress';

function UnitAccessory({ unit }) {
  return (
    <View style={styles.unit} accessible={false} importantForAccessibility="no">
      <Text style={styles.unitText}>{unit}</Text>
    </View>
  );
}

/**
 * ProfileSetupStep2View — ProfilTamamlama2.tsx port'u (Hedef ve ölçüler).
 *
 * goalOptions: [{ value, label }], selectedGoal: value | null
 * height / currentWeight / targetWeight: string (controlled)
 */
export function ProfileSetupStep2View({
  goalOptions = [],
  selectedGoal = null,
  height = '',
  currentWeight = '',
  targetWeight = '',
  heightError,
  currentWeightError,
  targetWeightError,
  step = 2,
  totalSteps = 4,
  onSelectGoal,
  onHeightChange,
  onCurrentWeightChange,
  onTargetWeightChange,
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
      <Text style={styles.title}>Hedef ve ölçüler</Text>
      <Text style={styles.subtitle}>
        Hedefin ne olursa olsun; planın buna göre, seninle birlikte şekillenir.
      </Text>

      <View style={styles.form}>
        <View>
          <Text style={styles.groupLabel}>Hedefin</Text>
          <View style={styles.chips}>
            {goalOptions.map((opt) => (
              <ChoiceChip
                key={opt.value}
                label={opt.label}
                selected={selectedGoal === opt.value}
                onPress={onSelectGoal ? () => onSelectGoal(opt.value) : undefined}
              />
            ))}
          </View>
        </View>

        <View style={styles.row}>
          <AppInput
            label="Boy"
            value={height}
            onChangeText={onHeightChange}
            error={heightError}
            keyboardType="numeric"
            accessibilityLabel="Boy"
            rightAccessory={<UnitAccessory unit="cm" />}
            style={styles.rowItem}
          />
          <AppInput
            label="Mevcut kilo"
            value={currentWeight}
            onChangeText={onCurrentWeightChange}
            error={currentWeightError}
            keyboardType="decimal-pad"
            accessibilityLabel="Mevcut kilo"
            rightAccessory={<UnitAccessory unit="kg" />}
            style={styles.rowItem}
          />
        </View>

        <AppInput
          label="Hedef kilo"
          value={targetWeight}
          onChangeText={onTargetWeightChange}
          error={targetWeightError}
          keyboardType="decimal-pad"
          accessibilityLabel="Hedef kilo"
          rightAccessory={<UnitAccessory unit="kg" />}
        />

        <Text style={styles.note}>
          Hedef kilon, diyetisyeninle birlikte istediğin zaman güncellenebilir.
        </Text>
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
  row: { flexDirection: 'row', gap: spacing.x3 },
  rowItem: { flex: 1 },
  unit: {
    minHeight: 44,
    justifyContent: 'center',
    paddingLeft: spacing.x2,
  },
  unitText: { ...typography.supporting, color: colors.textTertiary },
  note: { ...typography.caption, fontWeight: '400', color: colors.textTertiary },
  spacer: { flex: 1, minHeight: spacing.x6 },
  skip: { alignSelf: 'center', marginTop: spacing.x2 },
});

export default ProfileSetupStep2View;

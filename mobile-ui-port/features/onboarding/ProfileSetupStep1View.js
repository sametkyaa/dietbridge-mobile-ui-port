import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { AppButton, AppInput, AppScreen, ChoiceChip } from '../../components';
import OnboardingHeader from './OnboardingHeader';
import StepProgress from './StepProgress';

/**
 * ProfileSetupStep1View — ProfilTamamlama1.tsx port'u (Temel bilgiler).
 * Tüm değerler controlled; seçimler prop + callback ile yönetilir.
 *
 * genderOptions: [{ value, label }], selectedGender: value | null
 */
export function ProfileSetupStep1View({
  fullName = '',
  birthDate = '',
  fullNameError,
  birthDateError,
  genderOptions = [],
  selectedGender = null,
  step = 1,
  totalSteps = 4,
  onFullNameChange,
  onBirthDateChange,
  onSelectGender,
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
      <Text style={styles.title}>Temel bilgiler</Text>
      <Text style={styles.subtitle}>
        Seni tanıyalım — bu bilgiler planını kişiselleştirmek için kullanılır.
      </Text>

      <View style={styles.form}>
        <AppInput
          label="Ad soyad"
          value={fullName}
          onChangeText={onFullNameChange}
          error={fullNameError}
          accessibilityLabel="Ad soyad"
        />
        <AppInput
          label="Doğum tarihi"
          value={birthDate}
          onChangeText={onBirthDateChange}
          error={birthDateError}
          placeholder="GG.AA.YYYY"
          keyboardType="numbers-and-punctuation"
          accessibilityLabel="Doğum tarihi"
        />
        <View>
          <Text style={styles.groupLabel}>Cinsiyet</Text>
          <View style={styles.chips}>
            {genderOptions.map((opt) => (
              <ChoiceChip
                key={opt.value}
                label={opt.label}
                selected={selectedGender === opt.value}
                onPress={onSelectGender ? () => onSelectGender(opt.value) : undefined}
              />
            ))}
          </View>
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
  form: { gap: spacing.x4, marginTop: spacing.x6 },
  groupLabel: {
    ...typography.supporting,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: spacing.x2,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.x2 },
  spacer: { flex: 1, minHeight: spacing.x6 },
  skip: { alignSelf: 'center', marginTop: spacing.x2 },
});

export default ProfileSetupStep1View;

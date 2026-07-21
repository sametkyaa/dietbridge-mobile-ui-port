import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { AppButton, AppInput, AppScreen, ChoiceChip, Icon } from '../../components';
import { ProfileHeader } from './ProfileHeader';

function Stepper({ valueLabel, unit, onDecrease, onIncrease, decreaseLabel, increaseLabel }) {
  return (
    <View style={styles.stepper}>
      <Pressable
        onPress={onDecrease}
        accessibilityRole="button"
        accessibilityLabel={decreaseLabel}
        hitSlop={4}
        style={({ pressed }) => [styles.stepperButton, styles.stepperButtonMinus, pressed && styles.pressed]}
      >
        <Icon name="minus" size={17} color={colors.textSecondary} accessible={false} />
      </Pressable>
      <View style={styles.stepperValueWrap}>
        <Text style={styles.stepperValue}>{valueLabel}</Text>
        <Text style={styles.stepperUnit}>{unit}</Text>
      </View>
      <Pressable
        onPress={onIncrease}
        accessibilityRole="button"
        accessibilityLabel={increaseLabel}
        hitSlop={4}
        style={({ pressed }) => [styles.stepperButton, styles.stepperButtonPlus, pressed && styles.pressed]}
      >
        <Icon name="plus" size={17} color={colors.primaryDark} accessible={false} />
      </Pressable>
    </View>
  );
}

/**
 * GoalEditView — ProfilDuzenleHedef port'u: boy, hedef kilo, hedef seçimi,
 * günlük su hedefi (stepper), vücut ölçüsü hedefleri. Yargılamayan dil.
 *
 * MEVCUT KİLO BU FORMDA YÖNETİLMEZ: currentWeightKg alanı kaldırılmıştır.
 * Mevcut kilo değişikliği ayrı ölçüm akışından geçer (ProgressView +
 * AddWeightSheetView); generic profil onSave'i kilo güncellemesi içermez.
 *
 * Controlled form: values { heightCm, targetWeightKg, goal, waterGoalLabel,
 * waistCm, hipCm, chestCm, armCm } + onFieldChange(key, v);
 * goalOptions [{ value, label }] + onFieldChange('goal', v) tekli seçim.
 * Su hedefi stepper'ı onDecreaseWaterGoal / onIncreaseWaterGoal ile sürülür
 * (adım miktarı host'ta; değer waterGoalLabel olarak hazır gelir).
 */
export function GoalEditView({
  title = 'Hedef ve ölçüler',
  intro = 'Bu bilgiler planının kişiselleştirilmesi için kullanılır; istediğin zaman güncelleyebilirsin.',
  values = {},
  errors = {},
  goalOptions = [],
  isSaving = false,
  saveLabel = 'Kaydet',
  cancelLabel = 'Vazgeç',
  onFieldChange,
  onDecreaseWaterGoal,
  onIncreaseWaterGoal,
  onSave,
  onCancel,
  onBack,
}) {
  const change = (key) => (onFieldChange ? (v) => onFieldChange(key, v) : undefined);

  return (
    <AppScreen
      scroll
      padTop
      header={<ProfileHeader title={title} onBack={onBack} />}
      contentStyle={styles.content}
    >
      {intro ? <Text style={styles.intro}>{intro}</Text> : null}

      <View style={styles.rowFields}>
        <AppInput
          label="Boy (cm)"
          value={values.heightCm || ''}
          onChangeText={change('heightCm')}
          keyboardType="number-pad"
          error={errors.heightCm}
          style={styles.halfField}
        />
        <AppInput
          label="Hedef kilo (kg)"
          value={values.targetWeightKg || ''}
          onChangeText={change('targetWeightKg')}
          keyboardType="decimal-pad"
          error={errors.targetWeightKg}
          style={styles.halfField}
        />
      </View>
      <Text style={styles.hint}>
        Hedef kilonu diyetisyeninle birlikte belirlemen önerilir. Mevcut kilonu İlerleme
        ekranından kaydedebilirsin.
      </Text>

      <View>
        <Text style={styles.groupLabel}>Hedefin</Text>
        <View style={styles.chips}>
          {goalOptions.map((opt) => (
            <ChoiceChip
              key={opt.value}
              label={opt.label}
              selected={values.goal === opt.value}
              onPress={change('goal') ? () => change('goal')(opt.value) : undefined}
            />
          ))}
        </View>
      </View>

      <View>
        <Text style={styles.groupLabel}>Günlük su hedefi</Text>
        <Stepper
          valueLabel={values.waterGoalLabel || '—'}
          unit="L"
          onDecrease={onDecreaseWaterGoal}
          onIncrease={onIncreaseWaterGoal}
          decreaseLabel="Su hedefini azalt"
          increaseLabel="Su hedefini artır"
        />
        <Text style={styles.hint}>Ana Sayfa ve İlerleme'deki su takibi bu hedefe göre ilerler.</Text>
      </View>

      <View>
        <Text style={styles.groupLabel}>Vücut ölçüsü hedefleri</Text>
        <View style={styles.rowFields}>
          <AppInput
            label="Bel (cm)"
            value={values.waistCm || ''}
            onChangeText={change('waistCm')}
            keyboardType="decimal-pad"
            error={errors.waistCm}
            style={styles.halfField}
          />
          <AppInput
            label="Kalça (cm)"
            value={values.hipCm || ''}
            onChangeText={change('hipCm')}
            keyboardType="decimal-pad"
            error={errors.hipCm}
            style={styles.halfField}
          />
        </View>
        <View style={styles.rowFields}>
          <AppInput
            label="Göğüs (cm)"
            value={values.chestCm || ''}
            onChangeText={change('chestCm')}
            keyboardType="decimal-pad"
            error={errors.chestCm}
            style={styles.halfField}
          />
          <AppInput
            label="Kol (cm)"
            value={values.armCm || ''}
            onChangeText={change('armCm')}
            keyboardType="decimal-pad"
            error={errors.armCm}
            style={styles.halfField}
          />
        </View>
        <Text style={styles.hint}>
          İsteğe bağlı — mevcut ölçülerini İlerleme ekranından takip edebilirsin.
        </Text>
      </View>

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
  rowFields: { flexDirection: 'row', gap: spacing.x3 },
  halfField: { flex: 1 },
  groupLabel: { ...typography.supporting, fontWeight: '500', color: colors.textSecondary, marginBottom: spacing.x2 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.x2 },
  hint: { ...typography.caption, fontWeight: '400', lineHeight: 17, color: colors.textTertiary, marginTop: spacing.x1 + 2 },
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
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperButtonMinus: { backgroundColor: colors.surfaceMuted },
  stepperButtonPlus: { backgroundColor: colors.primarySoft },
  stepperValueWrap: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.x1 },
  stepperValue: { fontSize: 24, lineHeight: 30, fontWeight: '600', color: colors.textPrimary },
  stepperUnit: { ...typography.body, fontWeight: '500', color: colors.textSecondary },
  footer: { gap: spacing.x1, marginTop: spacing.x1 },
  cancel: { alignSelf: 'center' },
  pressed: { opacity: 0.8 },
});

export default GoalEditView;

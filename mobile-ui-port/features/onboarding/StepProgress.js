import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { ProgressBar } from '../../components';

/**
 * StepProgress (internal) — web StepIndicator karşılığı.
 * "Adım 1 / 4" etiketi + ProgressBar dolgusu. Değerler prop'tan gelir.
 */
export function StepProgress({ step = 1, totalSteps = 4, style }) {
  const percent = totalSteps > 0 ? (step / totalSteps) * 100 : 0;
  return (
    <View style={[styles.root, style]}>
      <Text style={styles.label}>
        {`Adım ${step} / ${totalSteps}`}
      </Text>
      <ProgressBar value={percent} height={6} style={styles.bar} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: spacing.x2 },
  label: { ...typography.caption, color: colors.textSecondary },
  bar: { width: '100%' },
});

export default StepProgress;

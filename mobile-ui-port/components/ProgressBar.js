import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, radius } from '../theme';

const TONES = {
  primary: colors.primary,
  teal: colors.teal,
  info: colors.info,
  warning: colors.warning,
  success: colors.success,
  error: colors.error,
};

/**
 * ProgressBar — ince ilerleme çubuğu (tasarım sistemi: Surface Muted ray +
 * ton renginde dolgu, tam yuvarlak uçlar). Değer 0–100 aralığına kırpılır.
 */
export function ProgressBar({ value = 0, tone = 'primary', height = 8, style }) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <View
      style={[styles.track, { height, borderRadius: height / 2 }, style]}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped) }}
    >
      <View
        style={[
          styles.fill,
          { width: `${clamped}%`, backgroundColor: TONES[tone] || TONES.primary },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.round,
  },
  fill: { height: '100%', borderRadius: radius.round },
});

export default ProgressBar;

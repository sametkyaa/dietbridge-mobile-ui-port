import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { AppCard, Icon } from '../../components';

/**
 * WeightSummaryCard — İlerleme özet kartı: mevcut kilo + değişim rozeti,
 * başlangıç/hedef ızgarası, son ölçüm tarihi.
 *
 * summary: { current, start, target, change, unit } — tümü görüntüye hazır
 * Türkçe metin (örn. current: '72,4', change: '−4,4').
 */
export function WeightSummaryCard({
  summary,
  lastMeasureLabel,
  currentLabel = 'Mevcut kilo',
  startLabel = 'Başlangıç',
  targetLabel = 'Hedef',
  lastMeasurePrefix = 'Son ölçüm:',
  style,
}) {
  const { current, start, target, change, unit } = summary;
  return (
    <AppCard style={style}>
      <View style={styles.topRow}>
        <View style={styles.currentWrap}>
          <Text style={styles.currentLabel}>{currentLabel}</Text>
          <View style={styles.currentValueRow}>
            <Text style={styles.currentValue}>{current}</Text>
            <Text style={styles.currentUnit}>{unit}</Text>
          </View>
        </View>
        {change ? (
          <View
            style={styles.changePill}
            accessibilityLabel={`Toplam değişim: ${change} ${unit}`}
          >
            <Icon name="down" size={13} color={colors.success} accessible={false} />
            <Text style={styles.changeText}>{`${change} ${unit}`}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.grid}>
        <View style={styles.gridCell}>
          <Text style={styles.gridLabel}>{startLabel}</Text>
          <Text style={styles.gridValue}>{`${start} ${unit}`}</Text>
        </View>
        <View style={styles.gridCell}>
          <Text style={styles.gridLabel}>{targetLabel}</Text>
          <Text style={styles.gridValue}>{`${target} ${unit}`}</Text>
        </View>
      </View>

      {lastMeasureLabel ? (
        <Text style={styles.lastMeasure}>{`${lastMeasurePrefix} ${lastMeasureLabel}`}</Text>
      ) : null}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  currentWrap: { flexShrink: 1 },
  currentLabel: { ...typography.caption, color: colors.textSecondary },
  currentValueRow: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.x1, marginTop: spacing.x1 },
  currentValue: { ...typography.numeric, color: colors.textPrimary },
  currentUnit: { ...typography.body, fontSize: 16, fontWeight: '500', color: colors.textSecondary },
  changePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x1 + 2,
    borderRadius: radius.round,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.x3,
    paddingVertical: spacing.x1 + 2,
  },
  changeText: { ...typography.supporting, fontWeight: '600', color: colors.success },
  grid: {
    flexDirection: 'row',
    gap: spacing.x3,
    borderTopWidth: 1,
    borderTopColor: colors.borderSoft,
    marginTop: spacing.x4,
    paddingTop: spacing.x3 + 2,
  },
  gridCell: { flex: 1 },
  gridLabel: { ...typography.caption, fontSize: 11, fontWeight: '400', color: colors.textTertiary },
  gridValue: { ...typography.body, fontWeight: '600', color: colors.textPrimary, marginTop: 2 },
  lastMeasure: { ...typography.caption, fontWeight: '400', color: colors.textTertiary, marginTop: spacing.x3 },
});

export default WeightSummaryCard;

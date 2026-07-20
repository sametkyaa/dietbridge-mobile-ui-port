import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { AppButton, AppCard } from '../../components';

function formatDelta(delta, unit) {
  const abs = Math.abs(delta);
  const text = Number.isInteger(abs) ? String(abs) : abs.toFixed(1).replace('.', ',');
  return delta <= 0 ? `−${text} ${unit}` : `+${text} ${unit}`;
}

/**
 * BodyMeasurementsCard — vücut ölçüleri kartı: ölçüm satırları (güncel +
 * başlangıca göre değişim rozeti), ölçü ekle / geçmiş aksiyonları.
 *
 * measurements: [{ key, label, start, current, unit? }] — sayısal cm.
 * Değişim rozeti: azalma success, artış warning, sabitse nötr tonda.
 */
export function BodyMeasurementsCard({
  title = 'Vücut ölçüleri',
  measurements = [],
  lastMeasureLabel,
  lastMeasurePrefix = 'Son ölçüm:',
  addLabel = 'Ölçü ekle',
  historyLabel = 'Geçmişi gör',
  onAddMeasurement,
  onOpenHistory,
  style,
}) {
  return (
    <AppCard style={style}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        {lastMeasureLabel ? (
          <Text style={styles.lastMeasure}>{`${lastMeasurePrefix} ${lastMeasureLabel}`}</Text>
        ) : null}
      </View>

      <View style={styles.rows}>
        {measurements.map((m, i) => {
          const unit = m.unit || 'cm';
          const delta = m.current - m.start;
          const tone = delta < 0 ? 'down' : delta > 0 ? 'up' : 'flat';
          return (
            <View key={m.key} style={[styles.row, i > 0 && styles.rowBorder]}>
              <Text style={styles.rowLabel}>{m.label}</Text>
              <View style={styles.rowValues}>
                <Text style={styles.rowValue}>{`${m.current} ${unit}`}</Text>
                <View
                  style={[
                    styles.deltaPill,
                    tone === 'down' && styles.deltaDown,
                    tone === 'up' && styles.deltaUp,
                    tone === 'flat' && styles.deltaFlat,
                  ]}
                  accessibilityLabel={`${m.label} değişimi: ${formatDelta(delta, unit)}`}
                >
                  <Text
                    style={[
                      styles.deltaText,
                      tone === 'down' && styles.deltaTextDown,
                      tone === 'up' && styles.deltaTextUp,
                      tone === 'flat' && styles.deltaTextFlat,
                    ]}
                  >
                    {formatDelta(delta, unit)}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      {onAddMeasurement ? (
        <AppButton
          variant="secondary"
          label={addLabel}
          onPress={onAddMeasurement}
          style={styles.addButton}
        />
      ) : null}
      {onOpenHistory ? (
        <Pressable
          onPress={onOpenHistory}
          accessibilityRole="button"
          accessibilityLabel={historyLabel}
          hitSlop={8}
          style={({ pressed }) => [styles.historyButton, pressed && styles.pressed]}
        >
          <Text style={styles.historyText}>{historyLabel}</Text>
        </Pressable>
      ) : null}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.x2 },
  title: { ...typography.body, fontWeight: '600', color: colors.textPrimary },
  lastMeasure: { ...typography.caption, fontWeight: '400', color: colors.textTertiary, flexShrink: 1 },
  rows: { marginTop: spacing.x1 + 2 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: spacing.x2 + 2 },
  rowBorder: { borderTopWidth: 1, borderTopColor: colors.borderSoft },
  rowLabel: { ...typography.body, fontSize: 14, color: colors.textPrimary },
  rowValues: { flexDirection: 'row', alignItems: 'center', gap: spacing.x2 + 2 },
  rowValue: { ...typography.body, fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  deltaPill: { borderRadius: radius.round, paddingHorizontal: spacing.x2, paddingVertical: 3 },
  deltaDown: { backgroundColor: colors.primarySoft },
  deltaUp: { backgroundColor: colors.warningSoft },
  deltaFlat: { backgroundColor: colors.surfaceMuted },
  deltaText: { ...typography.caption, fontWeight: '600' },
  deltaTextDown: { color: colors.success },
  deltaTextUp: { color: colors.warning },
  deltaTextFlat: { color: colors.textSecondary },
  addButton: { marginTop: spacing.x3 + 2 },
  historyButton: { alignSelf: 'center', minHeight: 44, justifyContent: 'center', marginTop: spacing.x1 },
  historyText: { ...typography.body, fontSize: 14, fontWeight: '600', color: colors.primary },
  pressed: { opacity: 0.8 },
});

export default BodyMeasurementsCard;

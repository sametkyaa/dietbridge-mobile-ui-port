import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { AppCard, Icon, ProgressBar } from '../../components';

const TONE_STYLES = {
  primary: { bg: colors.primarySoft, fg: colors.primaryDark },
  teal: { bg: colors.tealSoft, fg: colors.teal },
  info: { bg: colors.tealSoft, fg: colors.info },
  warning: { bg: colors.warningSoft, fg: colors.warning },
};

/**
 * DailyMacrosCard — günlük makro satırları (adım / protein / karbonhidrat /
 * yağ vb.). Satır verisi tamamen prop'tan gelir:
 *
 * rows: [{ key, label, icon, tone: 'primary'|'teal'|'info'|'warning',
 *          consumed, target, percent }]
 *
 * completedCount > 0 ise "Tamamlanan N öğünden" notu gösterilir.
 */
export function DailyMacrosCard({
  title = 'Günlük makrolar',
  rows = [],
  completedCount = 0,
  emptyNote = 'Öğün tamamladıkça hesaplanır',
  style,
}) {
  return (
    <AppCard style={style}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.note} numberOfLines={1}>
          {completedCount > 0 ? `Tamamlanan ${completedCount} öğünden` : emptyNote}
        </Text>
      </View>
      <View style={styles.rows}>
        {rows.map((row) => {
          const tone = TONE_STYLES[row.tone] || TONE_STYLES.primary;
          return (
            <View key={row.key} style={styles.row}>
              <View style={[styles.iconWrap, { backgroundColor: tone.bg }]}>
                <Icon name={row.icon} size={15} color={tone.fg} />
              </View>
              <Text style={styles.label} numberOfLines={1}>
                {row.label}
              </Text>
              <ProgressBar
                value={row.percent}
                tone={row.tone}
                height={6}
                style={styles.progress}
              />
              <Text style={styles.values} numberOfLines={1}>
                <Text style={styles.consumed}>{row.consumed}</Text>
                {`/${row.target}`}
              </Text>
            </View>
          );
        })}
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: spacing.x3,
    gap: spacing.x2,
  },
  title: { ...typography.body, fontWeight: '600', color: colors.textPrimary },
  note: { ...typography.caption, fontSize: 11, color: colors.textTertiary, flexShrink: 1 },
  rows: { gap: spacing.x2 + 2 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.x2 + 2 },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: radius.small - 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...typography.caption,
    color: colors.textPrimary,
    width: 88,
  },
  progress: { flex: 1, minWidth: 0 },
  values: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '400',
    color: colors.textTertiary,
    width: 72,
    textAlign: 'right',
  },
  consumed: { fontWeight: '600', color: colors.textPrimary },
});

export default DailyMacrosCard;

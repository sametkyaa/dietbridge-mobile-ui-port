// Dependency-free bar chart (pure View/Text rendering).
// Bilinçli olarak grafik paketi KULLANILMAZ; entegrasyonda host app'in grafik
// kütüphanesiyle değiştirilebilir. Barlar flex ile oranlanır; hedef çizgisi
// absolute konumlu kesikli bir View'dır.
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';

function formatValue(v) {
  return String(v).replace('.', ',');
}

/**
 * WaterWeeklyChartView — 7 günlük su tüketimi bar grafiği + hedef çizgisi.
 *
 * days: [{ day, litres }] — kronolojik; son gün "bugün" sayılır (vurgulu).
 * goalLitres: günlük hedef (L); hedef çizgisi ve "hedefe ulaştı" tonlaması
 * bu değere göre çizilir.
 */
export function WaterWeeklyChartView({
  days = [],
  goalLitres = 0,
  height = 104,
  style,
}) {
  const maxValue = days.reduce((m, d) => Math.max(m, d.litres), 0);
  const maxScale = Math.max(goalLitres, maxValue, 0.1) * 1.15;
  const goalPct = Math.min(100, (goalLitres / maxScale) * 100);
  const todayIndex = days.length - 1;

  return (
    <View
      style={style}
      accessibilityRole="image"
      accessibilityLabel={`Haftalık su tüketimi grafiği, hedef ${formatValue(goalLitres)} litre`}
    >
      <View style={[styles.chart, { height }]}>
        {goalLitres > 0 ? (
          <View
            style={[styles.goalLine, { bottom: `${goalPct}%` }]}
            accessible={false}
            importantForAccessibility="no"
          />
        ) : null}
        <View style={styles.bars}>
          {days.map((d, i) => {
            const isToday = i === todayIndex;
            const reached = goalLitres > 0 && d.litres >= goalLitres;
            return (
              <View key={`${d.day}-${i}`} style={styles.barCol}>
                {isToday ? (
                  <Text style={styles.todayValue}>{formatValue(d.litres)}</Text>
                ) : null}
                <View
                  style={[
                    styles.bar,
                    { height: `${Math.max(2, (d.litres / maxScale) * 100)}%` },
                    isToday ? styles.barToday : reached ? styles.barReached : styles.barDefault,
                  ]}
                />
              </View>
            );
          })}
        </View>
      </View>
      <View style={styles.dayRow}>
        {days.map((d, i) => (
          <Text
            key={`${d.day}-label-${i}`}
            style={[styles.dayLabel, i === todayIndex && styles.dayLabelToday]}
          >
            {d.day}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chart: { width: '100%' },
  goalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.textTertiary,
    zIndex: 1,
  },
  bars: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.x2,
  },
  barCol: { flex: 1, height: '100%', alignItems: 'center', justifyContent: 'flex-end' },
  todayValue: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.x1,
  },
  bar: { width: '100%', borderTopLeftRadius: 6, borderTopRightRadius: 6 },
  barDefault: { backgroundColor: colors.teal },
  barReached: { backgroundColor: colors.teal },
  barToday: { backgroundColor: colors.primary },
  dayRow: { flexDirection: 'row', gap: spacing.x2, marginTop: spacing.x1 + 2 },
  dayLabel: {
    flex: 1,
    textAlign: 'center',
    ...typography.caption,
    fontSize: 11,
    fontWeight: '400',
    color: colors.textTertiary,
  },
  dayLabelToday: { fontWeight: '600', color: colors.textPrimary },
});

export default WaterWeeklyChartView;

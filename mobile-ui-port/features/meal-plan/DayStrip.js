import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { Icon } from '../../components';

/**
 * DayStrip — yatay kaydırılabilir 7 günlük şerit. Küçük ekranlarda taşan
 * günler kaydırılır (showsHorizontalScrollIndicator kapalı).
 *
 * days: [{ id, dayLabel, dateLabel, isToday?, isCompleted? }]
 *
 * Durumlar yalnız renkle anlatılmaz: seçili gün soft hap + koyu metin,
 * bugün nokta göstergesi, tamamlanan gün onay işareti taşır.
 */
export function DayStrip({ days = [], selectedDayId, onSelectDay, style }) {
  return (
    <FlatList
      data={days}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.content, style]}
      renderItem={({ item }) => {
        const selected = item.id === selectedDayId;
        return (
          <Pressable
            onPress={onSelectDay ? () => onSelectDay(item.id) : undefined}
            accessibilityRole="button"
            accessibilityLabel={`${item.dayLabel} ${item.dateLabel}${item.isToday ? ', bugün' : ''}`}
            accessibilityState={{ selected }}
            hitSlop={4}
            style={({ pressed }) => [styles.cell, pressed && styles.pressed]}
          >
            <Text style={styles.dayLabel} numberOfLines={1}>
              {item.dayLabel}
            </Text>
            <View style={[styles.dateCircle, selected && styles.dateCircleSelected]}>
              <Text style={[styles.dateText, selected && styles.dateTextSelected]}>
                {item.dateLabel}
              </Text>
            </View>
            <View style={styles.indicatorRow}>
              {item.isToday ? <View style={styles.todayDot} /> : null}
              {item.isCompleted ? (
                <Icon name="check" size={10} color={colors.success} accessible={false} />
              ) : null}
            </View>
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.x1, paddingVertical: spacing.x1 },
  cell: { width: 48, alignItems: 'center', gap: spacing.x1 },
  dayLabel: { ...typography.caption, fontSize: 11, color: colors.textTertiary },
  dateCircle: {
    width: 38,
    height: 38,
    borderRadius: radius.control - 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateCircleSelected: { backgroundColor: colors.primarySoft },
  dateText: { ...typography.body, fontSize: 14, fontWeight: '500', color: colors.textSecondary },
  dateTextSelected: { fontWeight: '600', color: colors.primaryDark },
  indicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.x1,
    height: 6,
  },
  todayDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: colors.primary },
  pressed: { opacity: 0.8 },
});

export default DayStrip;

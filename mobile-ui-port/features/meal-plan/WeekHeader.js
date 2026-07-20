import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { Icon } from '../../components';

/**
 * WeekHeader — "Planım" başlığı + bugün bağlantısı ve hafta gezinme
 * (önceki / hafta etiketi / sonraki). Gezinme düğmeleri 44px dokunma alanlı.
 */
export function WeekHeader({
  title = 'Planım',
  todayLabel = 'Bugün',
  weekLabel,
  onTodayPress,
  onPreviousWeek,
  onNextWeek,
  previousAccessibilityLabel = 'Önceki hafta',
  nextAccessibilityLabel = 'Sonraki hafta',
  style,
}) {
  return (
    <View style={style}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{title}</Text>
        {onTodayPress ? (
          <Pressable
            onPress={onTodayPress}
            accessibilityRole="button"
            accessibilityLabel={todayLabel}
            hitSlop={8}
            style={({ pressed }) => [styles.todayButton, pressed && styles.pressed]}
          >
            <Text style={styles.todayText}>{todayLabel}</Text>
          </Pressable>
        ) : (
          <Text style={styles.todayText}>{todayLabel}</Text>
        )}
      </View>
      <View style={styles.navRow}>
        <Pressable
          onPress={onPreviousWeek}
          accessibilityRole="button"
          accessibilityLabel={previousAccessibilityLabel}
          hitSlop={4}
          style={({ pressed }) => [styles.navButton, pressed && styles.pressed]}
        >
          <Icon name="back" size={20} color={colors.textSecondary} />
        </Pressable>
        <Text style={styles.weekLabel} numberOfLines={1}>
          {weekLabel}
        </Text>
        <Pressable
          onPress={onNextWeek}
          accessibilityRole="button"
          accessibilityLabel={nextAccessibilityLabel}
          hitSlop={4}
          style={({ pressed }) => [styles.navButton, pressed && styles.pressed]}
        >
          <Icon name="forward" size={20} color={colors.textSecondary} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { ...typography.screenTitle, color: colors.textPrimary },
  todayButton: { minHeight: 32, justifyContent: 'center' },
  todayText: { ...typography.body, fontSize: 14, fontWeight: '600', color: colors.primary },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.x4,
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekLabel: { ...typography.body, fontWeight: '600', color: colors.textPrimary },
  pressed: { opacity: 0.8 },
});

export default WeekHeader;

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { Icon, StatusBadge } from '../../components';

const THUMB_TONES = {
  green: { bg: colors.primarySurface, fg: colors.primaryDark },
  teal: { bg: colors.tealSoft, fg: colors.teal },
  muted: { bg: colors.surfaceMuted, fg: colors.textSecondary },
};

/**
 * MealThumb — yuvarlatılmış kare zemin + beyaz daire içinde öğün ikonu.
 * tone: 'green' | 'teal' | 'muted' (tamamlanan öğünler muted).
 */
export function MealThumb({ icon = 'hourglass', size = 44, tone = 'green', style }) {
  const t = THUMB_TONES[tone] || THUMB_TONES.green;
  const inner = Math.round(size * 0.66);
  return (
    <View
      style={[
        styles.thumb,
        { width: size, height: size, backgroundColor: t.bg },
        style,
      ]}
      accessible={false}
      importantForAccessibility="no"
    >
      <View style={[styles.thumbInner, { width: inner, height: inner, borderRadius: inner / 2 }]}>
        <Icon name={icon} size={Math.round(size * 0.34)} color={t.fg} />
      </View>
    </View>
  );
}

/**
 * MealListItem — ortak öğün satırı (Ana Sayfa "Günün öğünleri" ve Planım
 * listesi). Sol thumb, ortada saat·tür + başlık, sağda StatusBadge ve
 * tamamla/geri al dairesi. Satır basışı onPress(meal.id), daire basışı
 * onToggle(meal.id) çağırır.
 *
 * meal: { id, time, type, title, status, icon?, badgeLabel? }
 */
export function MealListItem({ meal, onPress, onToggle, style }) {
  const done = meal.status === 'completed';
  const badgeStatus = ['completed', 'upcoming', 'waiting', 'delayed'].includes(meal.status)
    ? meal.status
    : 'info';

  return (
    <Pressable
      onPress={onPress ? () => onPress(meal.id) : undefined}
      accessibilityRole="button"
      accessibilityLabel={`${meal.time} ${meal.type}, ${meal.title}`}
      style={({ pressed }) => [styles.row, pressed && styles.pressed, style]}
    >
      <MealThumb icon={meal.icon} size={44} tone={done ? 'muted' : 'green'} />
      <View style={styles.textWrap}>
        <Text style={[styles.meta, done && styles.metaDone]} numberOfLines={1}>
          {meal.time} · {meal.type}
        </Text>
        <Text style={[styles.title, done && styles.titleDone]} numberOfLines={2}>
          {meal.title}
        </Text>
      </View>
      <View style={styles.trailing}>
        <StatusBadge status={badgeStatus} label={meal.badgeLabel} />
        {onToggle ? (
          <Pressable
            onPress={() => onToggle(meal.id)}
            accessibilityRole="button"
            accessibilityLabel={done ? 'Geri al' : 'Öğünü yedim'}
            accessibilityState={{ checked: done }}
            hitSlop={8}
            style={({ pressed }) => [
              styles.toggle,
              done ? styles.toggleDone : styles.togglePending,
              pressed && styles.pressed,
            ]}
          >
            {done ? <Icon name="check" size={15} color={colors.white} /> : null}
          </Pressable>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  thumb: {
    borderRadius: radius.small + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbInner: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x3,
    paddingHorizontal: spacing.x4,
    paddingVertical: spacing.x3 + 2,
  },
  pressed: { opacity: 0.85 },
  textWrap: { flex: 1, flexShrink: 1, gap: 2 },
  meta: { ...typography.caption, fontSize: 11, color: colors.textSecondary },
  metaDone: { color: colors.textTertiary },
  title: { ...typography.supporting, fontWeight: '500', color: colors.textPrimary },
  titleDone: { color: colors.textSecondary },
  trailing: { alignItems: 'flex-end', gap: spacing.x2 },
  toggle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleDone: { backgroundColor: colors.primary },
  togglePending: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.borderSoft,
  },
});

export default MealListItem;

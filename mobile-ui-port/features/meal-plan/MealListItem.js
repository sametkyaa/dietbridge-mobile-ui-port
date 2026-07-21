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
 * tamamla/geri al dairesi.
 *
 * Satır iki KARDEŞ tıklanabilir alandan oluşur (iç içe Pressable YOK):
 * - detay alanı (thumb + metin): onPress(meal.id)
 * - tamamla/geri al dairesi: onToggle(meal.id)
 *
 * isUpdating=true iken toggle düğmesi devre dışı kalır, busy durumu
 * erişilebilirliğe yansır ve callback tekrar çağrılmaz (çift işlem koruması).
 *
 * meal: { id, time, type, title, status, icon?, badgeLabel? }
 */
export function MealListItem({ meal, onPress, onToggle, isUpdating = false, style }) {
  const done = meal.status === 'completed';
  const badgeStatus = ['completed', 'upcoming', 'waiting', 'delayed'].includes(meal.status)
    ? meal.status
    : 'info';

  return (
    <View style={[styles.row, style]}>
      <Pressable
        onPress={onPress ? () => onPress(meal.id) : undefined}
        accessibilityRole="button"
        accessibilityLabel={`${meal.time} ${meal.type}, ${meal.title}`}
        style={({ pressed }) => [styles.detailArea, pressed && styles.pressed]}
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
      </Pressable>
      <View style={styles.trailing}>
        <StatusBadge status={badgeStatus} label={meal.badgeLabel} />
        {onToggle ? (
          <Pressable
            onPress={isUpdating ? undefined : () => onToggle(meal.id)}
            disabled={isUpdating}
            accessibilityRole="button"
            accessibilityLabel={done ? 'Geri al' : 'Öğünü yedim'}
            accessibilityState={{ checked: done, disabled: isUpdating, busy: isUpdating }}
            hitSlop={8}
            style={({ pressed }) => [
              styles.toggle,
              done ? styles.toggleDone : styles.togglePending,
              isUpdating && styles.toggleDisabled,
              pressed && !isUpdating && styles.pressed,
            ]}
          >
            {done ? <Icon name="check" size={15} color={colors.white} /> : null}
          </Pressable>
        ) : null}
      </View>
    </View>
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
    paddingHorizontal: spacing.x4,
    paddingVertical: spacing.x3 + 2,
  },
  detailArea: {
    flex: 1,
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x3,
    minHeight: 44,
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
  toggleDisabled: { opacity: 0.5 },
});

export default MealListItem;

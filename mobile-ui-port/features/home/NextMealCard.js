import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { AppButton, AppCard, EmptyState, Icon, StatusBadge } from '../../components';
import { MealThumb } from '../meal-plan/MealListItem';

/**
 * NextMealCard — Ana Sayfa hero kartı. state prop'u ile beş durum:
 *
 * - 'upcoming'     → sıradaki öğün + "Öğünü yedim" birincil düğme
 * - 'completed'    → sakin tamamlandı çubuğu + "Geri al"
 * - 'delayed'      → geciken öğün uyarı rozeti (yönlendirici dil)
 * - 'dayCompleted' → gün tamamlandı kutlaması (konfeti yok)
 * - 'none'         → bugün öğün yok empty state + plana git aksiyonu
 *
 * meal: { time, type, title, icon? } · badgeLabel örn. "45 dk sonra" /
 * "Tamamlandı · 13:38" · summary kısa içerik özeti.
 *
 * isUpdating=true iken "Öğünü yedim" butonu spinner'a geçer ve devre dışı
 * kalır; tamamlandı durumundaki "Geri al" butonu da kilitlenir (çift işlem
 * koruması). Callback işlem sürerken tekrar çağrılmaz.
 */
export function NextMealCard({
  state = 'upcoming',
  meal,
  summary,
  badgeLabel,
  upcomingLabel = 'Sıradaki öğün',
  delayedLabel = 'Geciken öğün',
  markEatenLabel = 'Öğünü yedim',
  undoLabel = 'Geri al',
  completedLabel = 'Tamamlandı',
  dayCompletedTitle = 'Bugünkü öğünleri tamamladın',
  dayCompletedDescription = 'Planına sadık kaldığın bir gün oldu. Yarınki planın hazır.',
  noMealTitle = 'Bugün için planlanmış öğün bulunmuyor',
  noMealDescription = 'Diyetisyenin yeni bir plan eklediğinde burada görünür.',
  noMealActionLabel = 'Haftalık plana bak',
  isUpdating = false,
  onMarkEaten,
  onUndo,
  onOpenPlan,
  style,
}) {
  if (state === 'dayCompleted') {
    return (
      <AppCard style={[styles.hero, style]}>
        <View style={styles.dayDoneRow}>
          <View style={styles.dayDoneIcon} accessible={false} importantForAccessibility="no">
            <Icon name="check" size={26} color={colors.success} />
          </View>
          <View style={styles.dayDoneText}>
            <Text style={styles.cardTitle}>{dayCompletedTitle}</Text>
            <Text style={styles.description}>{dayCompletedDescription}</Text>
          </View>
        </View>
      </AppCard>
    );
  }

  if (state === 'none' || !meal) {
    return (
      <AppCard style={[styles.hero, styles.noMealCard, style]}>
        <EmptyState
          icon="calendar"
          title={noMealTitle}
          description={noMealDescription}
          actionLabel={onOpenPlan ? noMealActionLabel : undefined}
          onAction={onOpenPlan}
        />
      </AppCard>
    );
  }

  const delayed = state === 'delayed';
  const completed = state === 'completed';
  const badgeStatus = completed ? 'completed' : delayed ? 'delayed' : 'upcoming';

  return (
    <AppCard style={[styles.hero, style]}>
      <View style={styles.mainRow}>
        <View style={styles.info}>
          <View style={styles.badgeRow}>
            <Text style={styles.overline}>{delayed ? delayedLabel : upcomingLabel}</Text>
            <StatusBadge status={badgeStatus} label={badgeLabel} />
          </View>
          <View style={styles.timeRow}>
            <Icon name="clock" size={14} color={colors.textSecondary} accessible={false} />
            <Text style={styles.time} numberOfLines={1}>
              {meal.time} · {meal.type}
            </Text>
          </View>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {meal.title}
          </Text>
          {summary ? (
            <Text style={styles.description} numberOfLines={1}>
              {summary}
            </Text>
          ) : null}
        </View>
        <MealThumb icon={meal.icon} size={64} />
      </View>

      {completed ? (
        <View style={styles.completedWrap}>
          <View style={styles.completedBar} accessibilityRole="text">
            <Icon name="check" size={18} color={colors.success} accessible={false} />
            <Text style={styles.completedText}>{completedLabel}</Text>
          </View>
          {onUndo ? (
            <Pressable
              onPress={isUpdating ? undefined : onUndo}
              disabled={isUpdating}
              accessibilityRole="button"
              accessibilityLabel={undoLabel}
              accessibilityState={{ disabled: isUpdating, busy: isUpdating }}
              hitSlop={8}
              style={({ pressed }) => [
                styles.undoButton,
                isUpdating && styles.undoDisabled,
                pressed && !isUpdating && styles.pressed,
              ]}
            >
              {isUpdating ? (
                <ActivityIndicator size="small" color={colors.textSecondary} />
              ) : (
                <Icon name="undo" size={14} color={colors.textSecondary} accessible={false} />
              )}
              <Text style={styles.undoText}>{undoLabel}</Text>
            </Pressable>
          ) : null}
        </View>
      ) : (
        <AppButton
          variant="primary"
          label={markEatenLabel}
          onPress={onMarkEaten}
          loading={isUpdating}
          disabled={isUpdating}
          icon={<Icon name="check" size={18} color={colors.white} accessible={false} />}
          style={styles.action}
        />
      )}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: radius.hero },
  noMealCard: { padding: 0 },
  mainRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.x3 + 2 },
  info: { flex: 1, minWidth: 0 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.x2, flexWrap: 'wrap' },
  overline: { ...typography.caption, color: colors.textSecondary },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x1 + 2,
    marginTop: spacing.x2,
  },
  time: { ...typography.supporting, fontWeight: '500', color: colors.textSecondary, flexShrink: 1 },
  cardTitle: { ...typography.cardTitle, color: colors.textPrimary, marginTop: spacing.x1 },
  description: {
    ...typography.supporting,
    color: colors.textSecondary,
    marginTop: spacing.x1,
  },
  action: { marginTop: spacing.x3 + 2 },
  completedWrap: { marginTop: spacing.x3 + 2, gap: spacing.x2 },
  completedBar: {
    height: 52,
    borderRadius: radius.control,
    backgroundColor: colors.primarySoft,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.x2,
  },
  completedText: { ...typography.button, color: colors.success },
  undoButton: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.x1 + 2,
  },
  undoText: { ...typography.supporting, fontWeight: '600', color: colors.textSecondary },
  undoDisabled: { opacity: 0.6 },
  pressed: { opacity: 0.8 },
  dayDoneRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.x4 },
  dayDoneIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayDoneText: { flex: 1, minWidth: 0, gap: spacing.x1 },
});

export default NextMealCard;

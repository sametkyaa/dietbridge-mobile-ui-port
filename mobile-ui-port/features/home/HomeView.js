import React from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../theme';
import { AppScreen } from '../../components';
import { GreetingHeader } from './GreetingHeader';
import { DailyMacrosCard } from './DailyMacrosCard';
import { NextMealCard } from './NextMealCard';
import { WaterCard } from './WaterCard';
import { TodayMealsList } from './TodayMealsList';
import { DietitianMessageCard } from './DietitianMessageCard';
import { HomeSkeleton } from './HomeSkeleton';
import { HomeEmptyState } from './HomeEmptyState';
import { HomeErrorState } from './HomeErrorState';
import { OfflineBanner } from './OfflineBanner';

/**
 * HomeView — Ana Sayfa (tüm AnaSayfa varyantları tek görünümde).
 *
 * status:
 * - 'loading' → HomeSkeleton
 * - 'ready'   → tam içerik
 * - 'empty'   → plan yok (HomeEmptyState + su takibi kullanılabilir kalır)
 * - 'error'   → HomeErrorState (onRetry)
 * isOffline=true iken içeriğin üstünde OfflineBanner gösterilir.
 *
 * Veri prop'ları:
 * - user: { firstName, initials } · greeting · dateLabel
 * - macros: { rows: [...], completedCount } (DailyMacrosCard formatı)
 * - nextMeal: { id, time, type, title, icon, status, badgeLabel? }
 * - nextMealSummary: hero kart kısa içerik özeti
 * - meals: günün öğün listesi (MealListItem formatı)
 * - water: { drunkLabel, goalLabel, percent, quickOptions? }
 * - dietitianMessage: { name, initials, metaLabel, text }
 * - dayCompletion: { allCompleted, title?, description? }
 *
 * NextMealCard durumu prop'lardan türetilir: tüm öğünler tamamsa
 * 'dayCompleted'; nextMeal yoksa 'none'; status completed/delayed ise
 * ilgili durum; aksi hâlde 'upcoming'.
 *
 * onRefresh verilirse RefreshControl bağlanır (refreshing prop'u ile).
 */
export function HomeView({
  status = 'ready',
  isOffline = false,
  user,
  greeting,
  dateLabel,
  hasUnreadNotifications = false,
  macros,
  nextMeal,
  nextMealSummary,
  meals = [],
  water,
  dietitianMessage,
  dayCompletion,
  refreshing = false,
  onNotificationPress,
  onAvatarPress,
  onMealPress,
  onToggleMeal,
  onUndoMeal,
  onAddWater,
  onUndoWater,
  onOpenWaterHistory,
  onOpenMessages,
  onOpenPlan,
  onRetry,
  onRefresh,
}) {
  const allCompleted =
    dayCompletion?.allCompleted ??
    (meals.length > 0 && meals.every((m) => m.status === 'completed'));

  let nextMealState = 'none';
  if (allCompleted) nextMealState = 'dayCompleted';
  else if (nextMeal) {
    nextMealState =
      nextMeal.status === 'completed'
        ? 'completed'
        : nextMeal.status === 'delayed'
          ? 'delayed'
          : 'upcoming';
  }

  const resolvedGreeting = greeting || (user?.firstName ? `İyi günler, ${user.firstName}` : '');

  const header = (
    <GreetingHeader
      greeting={resolvedGreeting}
      dateLabel={dateLabel}
      initials={user?.initials}
      hasUnreadNotifications={hasUnreadNotifications}
      onNotificationPress={onNotificationPress}
      onAvatarPress={onAvatarPress}
    />
  );

  const waterCard = water ? (
    <WaterCard
      drunkLabel={water.drunkLabel}
      goalLabel={water.goalLabel}
      percent={water.percent}
      quickOptions={water.quickOptions}
      onAddWater={onAddWater}
      onUndoWater={onUndoWater}
      onOpenHistory={onOpenWaterHistory}
    />
  ) : null;

  return (
    <AppScreen
      scroll
      padTop
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        ) : null
      }
    >
      <View style={styles.content}>
        {isOffline && status !== 'loading' ? <OfflineBanner /> : null}

        {status === 'loading' ? (
          <HomeSkeleton animated />
        ) : status === 'error' ? (
          <HomeErrorState onRetry={onRetry} />
        ) : status === 'empty' ? (
          <>
            {header}
            <HomeEmptyState onAction={onOpenMessages} />
            {waterCard}
          </>
        ) : (
          <>
            {header}
            {macros ? (
              <DailyMacrosCard rows={macros.rows} completedCount={macros.completedCount} />
            ) : null}
            <NextMealCard
              state={nextMealState}
              meal={nextMeal}
              summary={nextMealSummary}
              badgeLabel={nextMeal?.badgeLabel}
              dayCompletedTitle={dayCompletion?.title}
              dayCompletedDescription={dayCompletion?.description}
              onMarkEaten={nextMeal ? () => onToggleMeal?.(nextMeal.id) : undefined}
              onUndo={nextMeal ? () => onUndoMeal?.(nextMeal.id) : undefined}
              onOpenPlan={onOpenPlan}
            />
            {waterCard}
            <TodayMealsList meals={meals} onMealPress={onMealPress} onToggleMeal={onToggleMeal} />
            <DietitianMessageCard message={dietitianMessage} onReply={onOpenMessages} />
          </>
        )}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.x4, paddingTop: spacing.x2 },
});

export default HomeView;

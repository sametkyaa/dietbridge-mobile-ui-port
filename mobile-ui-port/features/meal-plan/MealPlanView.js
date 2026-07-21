import React from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { AppCard, AppScreen, AppSkeleton, EmptyState, ErrorState, InlineAlert } from '../../components';
import { WeekHeader } from './WeekHeader';
import { DayStrip } from './DayStrip';
import { MealListItem } from './MealListItem';

function Separator() {
  return <View style={styles.separator} />;
}

function PlanSkeleton() {
  return (
    <View style={styles.skeletonWrap}>
      <AppSkeleton width={150} height={28} />
      <AppSkeleton height={44} style={styles.skeletonGap} />
      <AppSkeleton height={38} borderRadius={13} style={styles.skeletonGap} />
      {[0, 1, 2].map((i) => (
        <AppSkeleton key={i} height={68} borderRadius={18} style={styles.skeletonGap} />
      ))}
    </View>
  );
}

/**
 * MealPlanView — Planım (HaftalikPlan + BosGun + Guncellendi tek görünümde).
 *
 * status: 'loading' | 'ready' | 'empty' | 'error'
 * - 'empty' → haftanın hiçbir gününde plan yok (tam sayfa empty state)
 * - 'error' → ErrorState (onRetry ile); errorTitle/errorDescription özelleştirilebilir
 * - seçili günde öğün yoksa gün listesi yerine kart içi empty state
 *
 * days: [{ id, dayLabel, dateLabel, isToday?, isCompleted? }]
 * meals: seçili günün öğünleri (MealListItem formatı)
 * showUpdatedNotice=true iken plan güncellendi bilgi şeridi gösterilir
 * (updatedMessage veya planUpdatedAt ile).
 *
 * updatingMealId: işlemi süren öğünün id'si — yalnız o satırın toggle'ı
 * kilitlenir (çift işlem koruması); diğer öğünler kullanılabilir kalır.
 *
 * onBack: host navigasyon başlığına bağlanmak için ayrılmıştır; bu görünüm
 * kendi geri düğmesini çizmez (sekme kök ekranıdır).
 */
export function MealPlanView({
  title = 'Planım',
  todayLabel = 'Bugün',
  weekLabel,
  days = [],
  selectedDayId,
  selectedDayLabel,
  meals = [],
  status = 'ready',
  showUpdatedNotice = false,
  updatedMessage = 'Diyetisyenin bu haftanın planını güncelledi. Değişiklikler listede işlendi.',
  planUpdatedAt,
  emptyTitle = 'Bu gün için planlanmış öğün bulunmuyor',
  emptyDescription = 'Diyetisyenin bu günü henüz planlamamış olabilir; hazır olduğunda burada görünecek.',
  weekEmptyTitle = 'Bu hafta için plan yok',
  weekEmptyDescription = 'Diyetisyenin haftalık planı oluşturduğunda burada görünecek.',
  errorTitle = 'Plan yüklenemedi',
  errorDescription = 'Bağlantını kontrol edip tekrar deneyebilirsin.',
  updatingMealId = null,
  onSelectDay,
  onPreviousWeek,
  onNextWeek,
  onTodayPress,
  onMealPress,
  onToggleMeal,
  onBack,
  onRetry,
  onRefresh,
  refreshing = false,
}) {
  const noticeText = planUpdatedAt ? `${updatedMessage} · ${planUpdatedAt}` : updatedMessage;

  const header = (
    <View>
      <WeekHeader
        title={title}
        todayLabel={todayLabel}
        weekLabel={weekLabel}
        onTodayPress={onTodayPress}
        onPreviousWeek={onPreviousWeek}
        onNextWeek={onNextWeek}
      />
      {showUpdatedNotice ? (
        <InlineAlert variant="info" message={noticeText} style={styles.notice} />
      ) : null}
      <DayStrip days={days} selectedDayId={selectedDayId} onSelectDay={onSelectDay} style={styles.strip} />
      {selectedDayLabel ? <Text style={styles.dayTitle}>{selectedDayLabel}</Text> : null}
    </View>
  );

  if (status === 'loading') {
    return (
      <AppScreen padTop>
        <PlanSkeleton />
      </AppScreen>
    );
  }

  if (status === 'error') {
    return (
      <AppScreen padTop>
        <ErrorState title={errorTitle} description={errorDescription} onRetry={onRetry} />
      </AppScreen>
    );
  }

  if (status === 'empty') {
    return (
      <AppScreen padTop>
        {header}
        <AppCard style={styles.emptyCard}>
          <EmptyState icon="calendar" title={weekEmptyTitle} description={weekEmptyDescription} />
        </AppCard>
      </AppScreen>
    );
  }

  return (
    <AppScreen padTop>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={header}
        ItemSeparatorComponent={Separator}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          ) : undefined
        }
        renderItem={({ item }) => (
          <MealListItem
            meal={item}
            isUpdating={updatingMealId === item.id}
            onPress={onMealPress}
            onToggle={onToggleMeal}
          />
        )}
        ListEmptyComponent={
          <AppCard style={styles.emptyCard}>
            <EmptyState icon="calendar" title={emptyTitle} description={emptyDescription} />
          </AppCard>
        }
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  notice: { marginTop: spacing.x3 },
  strip: { marginTop: spacing.x3 },
  dayTitle: {
    ...typography.sectionTitle,
    fontSize: 17,
    lineHeight: 22,
    color: colors.textPrimary,
    marginTop: spacing.x5,
    marginBottom: spacing.x3,
  },
  listContent: { paddingBottom: spacing.x6 },
  separator: { height: 1, backgroundColor: colors.borderSoft, marginLeft: spacing.x4 },
  emptyCard: { padding: 0, marginTop: spacing.x4 },
  skeletonWrap: { paddingTop: spacing.x2 },
  skeletonGap: { marginTop: spacing.x4 },
});

export default MealPlanView;

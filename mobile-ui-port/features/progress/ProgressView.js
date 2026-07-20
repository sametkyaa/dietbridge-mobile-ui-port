import React from 'react';
import { Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import {
  AppButton,
  AppCard,
  AppScreen,
  AppSkeleton,
  EmptyState,
  Icon,
} from '../../components';
import { FullScreenErrorView } from '../status';
import { WeightSummaryCard } from './WeightSummaryCard';
import { WeightChartView } from './WeightChartView';
import { BodyMeasurementsCard } from './BodyMeasurementsCard';
import { WaterWeeklyChartView } from './WaterWeeklyChartView';

function ProgressSkeleton() {
  return (
    <View style={styles.skeletonWrap}>
      <AppSkeleton width={140} height={28} />
      <AppSkeleton height={128} borderRadius={18} style={styles.skeletonGap} />
      <AppSkeleton height={220} borderRadius={18} style={styles.skeletonGap} />
      <AppSkeleton height={52} borderRadius={14} style={styles.skeletonGap} />
      <AppSkeleton height={200} borderRadius={18} style={styles.skeletonGap} />
    </View>
  );
}

/**
 * ProgressView — İlerleme (Ilerleme + IlerlemeTekOlcum tek görünümde).
 *
 * status: 'loading' | 'ready' | 'empty' | 'error'
 * - 'empty'  → hiç ölçüm yok; CTA ile ilk ölçümü ekleme
 * - tek ölçüm: weightHistory.length < 2 iken grafik yerine yönlendirici
 *   empty state gösterilir (IlerlemeTekOlcum port'u)
 *
 * weightSummary: { current, start, target, change, unit } (metin)
 * weightHistory: [{ id, dateLabel, value }] — kronolojik, sayısal value
 * bodyMeasurements: [{ key, label, start, current, unit? }]
 * waterWeekly: { days: [{ day, litres }], goalLitres, averageLabel, footnote }
 *
 * onBack: host navigasyonuna ayrılmıştır; verilirse başlık yanında geri
 * düğmesi çizilir (sekme kökünde verilmez).
 */
export function ProgressView({
  title = 'İlerleme',
  status = 'ready',
  weightSummary,
  lastMeasureLabel,
  weightHistory = [],
  weightChartTitle = 'Haftalık ölçümler',
  weightFootnote,
  weightEmptyTitle = 'Grafik için en az iki ölçüm gerekli',
  weightEmptyDescription = 'Haftada bir ölçüm eklersen değişimi burada sade bir grafikle takip edersin.',
  bodyMeasurements = [],
  bodyMeasureDateLabel,
  waterWeekly,
  addWeightLabel = 'Ölçüm ekle',
  emptyTitle = 'Henüz ölçüm kaydın yok',
  emptyDescription = 'İlk kilo ölçümünü eklediğinde ilerlemen burada görünecek.',
  onAddWeight,
  onAddMeasurement,
  onOpenMeasurementHistory,
  onRetry,
  onRefresh,
  refreshing = false,
  onBack,
}) {
  const headerTitle = (
    <View style={styles.titleRow}>
      {onBack ? (
        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Geri"
          hitSlop={8}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <Icon name="back" size={22} color={colors.textPrimary} />
        </Pressable>
      ) : null}
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  if (status === 'loading') {
    return (
      <AppScreen padTop>
        <ProgressSkeleton />
      </AppScreen>
    );
  }

  if (status === 'error') {
    return (
      <AppScreen padTop>
        <FullScreenErrorView variant="generic" onRetry={onRetry} onBack={onBack} />
      </AppScreen>
    );
  }

  if (status === 'empty') {
    return (
      <AppScreen padTop>
        {headerTitle}
        <View style={styles.emptyWrap}>
          <EmptyState
            icon="calendar"
            title={emptyTitle}
            description={emptyDescription}
            actionLabel={onAddWeight ? addWeightLabel : undefined}
            onAction={onAddWeight}
          />
        </View>
      </AppScreen>
    );
  }

  const hasChart = weightHistory.length >= 2;

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
        ) : undefined
      }
      contentStyle={styles.content}
    >
      {headerTitle}

      {weightSummary ? (
        <WeightSummaryCard summary={weightSummary} lastMeasureLabel={lastMeasureLabel} />
      ) : null}

      <AppCard style={styles.card}>
        <Text style={styles.cardTitle}>{weightChartTitle}</Text>
        {hasChart ? (
          <>
            <WeightChartView
              data={weightHistory}
              unit={weightSummary ? weightSummary.unit : 'kg'}
              style={styles.chart}
            />
            {weightFootnote ? <Text style={styles.footnote}>{weightFootnote}</Text> : null}
          </>
        ) : (
          <EmptyState
            icon="calendar"
            title={weightEmptyTitle}
            description={weightEmptyDescription}
            style={styles.chartEmpty}
          />
        )}
      </AppCard>

      {onAddWeight ? (
        <AppButton variant="primary" label={addWeightLabel} onPress={onAddWeight} />
      ) : null}

      {bodyMeasurements.length > 0 ? (
        <BodyMeasurementsCard
          measurements={bodyMeasurements}
          lastMeasureLabel={bodyMeasureDateLabel}
          onAddMeasurement={onAddMeasurement}
          onOpenHistory={onOpenMeasurementHistory}
        />
      ) : null}

      {waterWeekly ? (
        <AppCard style={styles.card}>
          <View style={styles.waterHeader}>
            <View style={styles.waterTitleWrap}>
              <Text style={styles.cardTitle}>Su tüketimi</Text>
              <Text style={styles.waterSubtitle}>
                {`Bu hafta · Hedef ${String(waterWeekly.goalLitres).replace('.', ',')} L`}
              </Text>
            </View>
            {waterWeekly.averageLabel ? (
              <View style={styles.waterAverageWrap}>
                <Text style={styles.waterAverage}>{`${waterWeekly.averageLabel} L`}</Text>
                <Text style={styles.waterAverageLabel}>günlük ortalama</Text>
              </View>
            ) : null}
          </View>
          <WaterWeeklyChartView
            days={waterWeekly.days}
            goalLitres={waterWeekly.goalLitres}
            style={styles.chart}
          />
          {waterWeekly.footnote ? (
            <Text style={styles.footnote}>{waterWeekly.footnote}</Text>
          ) : null}
        </AppCard>
      ) : null}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.x5 },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -spacing.x2,
  },
  title: { ...typography.screenTitle, color: colors.textPrimary, marginTop: spacing.x2 },
  card: { gap: spacing.x1 },
  cardTitle: { ...typography.body, fontWeight: '600', color: colors.textPrimary },
  chart: { marginTop: spacing.x3 },
  footnote: { ...typography.caption, fontWeight: '400', lineHeight: 17, color: colors.textTertiary, marginTop: spacing.x2 },
  chartEmpty: { paddingVertical: spacing.x6 },
  waterHeader: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  waterTitleWrap: { flexShrink: 1, gap: 2 },
  waterSubtitle: { ...typography.caption, fontWeight: '400', color: colors.textTertiary },
  waterAverageWrap: { alignItems: 'flex-end' },
  waterAverage: { ...typography.numeric, color: colors.textPrimary },
  waterAverageLabel: { ...typography.caption, fontSize: 11, fontWeight: '400', color: colors.textTertiary },
  emptyWrap: { flex: 1, justifyContent: 'center' },
  skeletonWrap: { paddingTop: spacing.x2 },
  skeletonGap: { marginTop: spacing.x4 },
  pressed: { opacity: 0.6 },
});

export default ProgressView;

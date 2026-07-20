import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import {
  AppButton,
  AppCard,
  AppScreen,
  AppSkeleton,
  ChoiceChip,
  Icon,
} from '../../components';
import { EmptyDataView } from '../status';
import { WeightChartView } from './WeightChartView';

function HistoryHeader({ title, onBack }) {
  return (
    <View style={styles.header}>
      <Pressable
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel="Geri"
        hitSlop={8}
        style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
      >
        <Icon name="back" size={22} color={colors.textPrimary} />
      </Pressable>
      <Text style={styles.headerTitle} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.backButton} accessible={false} importantForAccessibility="no" />
    </View>
  );
}

function formatSigned(delta, unit) {
  const abs = Math.abs(delta);
  const text = Number.isInteger(abs) ? String(abs) : abs.toFixed(1).replace('.', ',');
  return delta <= 0 ? `−${text} ${unit}` : `+${text} ${unit}`;
}

/**
 * MeasurementHistoryView — OlcuGecmis port'u: ölçüm seçici (chip'ler),
 * seçili ölçümün özeti + mini trend grafiği + kronolojik kayıt listesi.
 *
 * status: 'loading' | 'ready' | 'empty'
 * options: [{ key, label }] — ölçüm türleri (Bel/Kalça/…)
 * selectedKey + onSelectMeasurement: controlled seçim
 * summary: { label, current, start, unit, lastMeasureLabel } — sayısal
 *   current/start; değişim rozeti bileşen içinde hesaplanır
 * points: [{ id, dateLabel, value }] — grafik (eski → yeni)
 * entries: [{ id, dateLabel, valueLabel, deltaLabel }] — liste (yeni → eski)
 */
export function MeasurementHistoryView({
  title = 'Vücut ölçüleri',
  status = 'ready',
  options = [],
  selectedKey,
  onSelectMeasurement,
  summary,
  points = [],
  entries = [],
  addLabel = 'Ölçü ekle',
  currentSuffix = 'güncel',
  onBack,
  onAddMeasurement,
}) {
  if (status === 'loading') {
    return (
      <AppScreen padTop header={<HistoryHeader title={title} onBack={onBack} />}>
        <View style={styles.skeletonWrap}>
          <AppSkeleton height={44} style={styles.skeletonGap} />
          <AppSkeleton height={110} borderRadius={18} style={styles.skeletonGap} />
          <AppSkeleton height={190} borderRadius={18} style={styles.skeletonGap} />
          <AppSkeleton height={160} borderRadius={18} style={styles.skeletonGap} />
        </View>
      </AppScreen>
    );
  }

  if (status === 'empty') {
    return (
      <AppScreen padTop header={<HistoryHeader title={title} onBack={onBack} />}>
        <EmptyDataView
          icon="calendar"
          title="Henüz ölçü kaydı yok"
          description="İlk ölçünü eklediğinde değişimi burada takip edebilirsin."
          actionLabel={onAddMeasurement ? addLabel : undefined}
          onAction={onAddMeasurement}
        />
      </AppScreen>
    );
  }

  const unit = summary ? summary.unit || 'cm' : 'cm';
  const delta = summary ? summary.current - summary.start : 0;

  const listHeader = (
    <View>
      <View style={styles.chips}>
        {options.map((opt) => (
          <ChoiceChip
            key={opt.key}
            label={opt.label}
            selected={opt.key === selectedKey}
            onPress={onSelectMeasurement ? () => onSelectMeasurement(opt.key) : undefined}
          />
        ))}
      </View>

      {summary ? (
        <AppCard style={styles.card}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryLeft}>
              <Text style={styles.summaryLabel}>{`${summary.label} — ${currentSuffix}`}</Text>
              <View style={styles.summaryValueRow}>
                <Text style={styles.summaryValue}>{summary.current}</Text>
                <Text style={styles.summaryUnit}>{unit}</Text>
              </View>
            </View>
            {delta !== 0 ? (
              <View
                style={styles.changePill}
                accessibilityLabel={`Toplam değişim: ${formatSigned(delta, unit)}`}
              >
                <Icon name="down" size={13} color={colors.success} accessible={false} />
                <Text style={styles.changeText}>{formatSigned(delta, unit)}</Text>
              </View>
            ) : null}
          </View>
          <Text style={styles.summaryMeta}>
            {`Başlangıç ${summary.start} ${unit}`}
            {summary.lastMeasureLabel ? ` · Son ölçüm: ${summary.lastMeasureLabel}` : ''}
          </Text>
        </AppCard>
      ) : null}

      {points.length >= 2 ? (
        <AppCard style={styles.card}>
          <Text style={styles.cardTitle}>Değişim</Text>
          <WeightChartView data={points} unit={unit} height={150} style={styles.chart} />
        </AppCard>
      ) : null}
    </View>
  );

  return (
    <AppScreen padTop header={<HistoryHeader title={title} onBack={onBack} />}>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={listHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.entryRow,
              index === 0 && styles.entryRowFirst,
              index === entries.length - 1 && styles.entryRowLast,
            ]}
          >
            <Text style={styles.entryDate}>{item.dateLabel}</Text>
            <Text style={styles.entryValue}>
              <Text style={styles.entryValueStrong}>{item.valueLabel}</Text>
              {item.deltaLabel ? ` · ${item.deltaLabel}` : ''}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.entrySeparator} />}
        ListFooterComponent={
          onAddMeasurement ? (
            <AppButton
              variant="primary"
              label={addLabel}
              onPress={onAddMeasurement}
              style={styles.addButton}
            />
          ) : null
        }
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.x5,
    paddingTop: spacing.x3,
    paddingBottom: spacing.x2,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -spacing.x2,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    ...typography.cardTitle,
    color: colors.textPrimary,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.x2, marginTop: spacing.x2 },
  card: { marginTop: spacing.x4 },
  summaryRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  summaryLeft: { flexShrink: 1 },
  summaryLabel: { ...typography.caption, color: colors.textSecondary },
  summaryValueRow: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.x1, marginTop: spacing.x1 },
  summaryValue: { ...typography.numeric, color: colors.textPrimary },
  summaryUnit: { ...typography.body, fontSize: 16, fontWeight: '500', color: colors.textSecondary },
  changePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x1 + 2,
    borderRadius: radius.round,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.x3,
    paddingVertical: spacing.x1 + 2,
  },
  changeText: { ...typography.supporting, fontWeight: '600', color: colors.success },
  summaryMeta: {
    ...typography.caption,
    fontWeight: '400',
    color: colors.textTertiary,
    borderTopWidth: 1,
    borderTopColor: colors.borderSoft,
    marginTop: spacing.x3,
    paddingTop: spacing.x3,
  },
  cardTitle: { ...typography.body, fontWeight: '600', color: colors.textPrimary },
  chart: { marginTop: spacing.x3 },
  listContent: { paddingBottom: spacing.x6 },
  entryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.borderSoft,
    paddingHorizontal: spacing.x4,
    paddingVertical: spacing.x3,
  },
  entryRowFirst: {
    borderTopWidth: 1,
    borderTopLeftRadius: radius.card,
    borderTopRightRadius: radius.card,
    marginTop: spacing.x4,
  },
  entryRowLast: {
    borderBottomWidth: 1,
    borderBottomLeftRadius: radius.card,
    borderBottomRightRadius: radius.card,
  },
  entryDate: { ...typography.body, fontSize: 14, color: colors.textPrimary },
  entryValue: { ...typography.supporting, color: colors.textSecondary },
  entryValueStrong: { fontWeight: '600', color: colors.textPrimary },
  entrySeparator: { height: 1, backgroundColor: colors.borderSoft },
  addButton: { marginTop: spacing.x5 },
  skeletonWrap: { paddingTop: spacing.x2 },
  skeletonGap: { marginTop: spacing.x4 },
  pressed: { opacity: 0.6 },
});

export default MeasurementHistoryView;

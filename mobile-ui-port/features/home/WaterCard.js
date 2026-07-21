import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { AppCard, Icon, ProgressBar } from '../../components';

const DEFAULT_QUICK_OPTIONS = [
  { id: 'quick-200', amountMl: 200, label: '+200 ml' },
  { id: 'quick-250', amountMl: 250, label: '+250 ml' },
];

/**
 * WaterCard — Ana Sayfa su takibi kartı: içilen/hedef, ilerleme çubuğu,
 * hızlı ekleme düğmeleri, geri al ve geçmiş bağlantısı.
 *
 * drunkLabel/goalLabel hazır biçimlendirilmiş metinlerdir (örn. "1,4 L");
 * percent 0–100. quickOptions: [{ id, amountMl, label }] — onAddWater'a
 * amountMl iletilir.
 *
 * isAddingWater=true iken tüm hızlı ekleme düğmeleri kilitlenir (busy durumu
 * erişilebilirliğe yansır); isUndoingWater=true iken geri al düğmesi
 * kilitlenir. Callback aynı işlem sürerken tekrar çağrılmaz. Su state'i bu
 * katmanda değiştirilmez; host gerçek sonucu props ile gönderir.
 */
export function WaterCard({
  title = 'Su takibi',
  drunkLabel,
  goalLabel,
  percent = 0,
  quickOptions = DEFAULT_QUICK_OPTIONS,
  isAddingWater = false,
  isUndoingWater = false,
  undoAccessibilityLabel = 'Son eklemeyi geri al',
  historyLabel = 'Geçmişi gör',
  onAddWater,
  onUndoWater,
  onOpenHistory,
  style,
}) {
  return (
    <AppCard style={style}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Icon name="droplet" size={18} color={colors.teal} accessible={false} />
          <Text style={styles.title}>{title}</Text>
        </View>
        {goalLabel ? (
          <Text style={styles.goal} numberOfLines={1}>
            {goalLabel}
          </Text>
        ) : null}
      </View>

      <View style={styles.progressRow}>
        <Text style={styles.drunk}>{drunkLabel}</Text>
        <ProgressBar value={percent} tone="teal" height={8} style={styles.progress} />
      </View>

      <View style={styles.actionsRow}>
        {quickOptions.map((opt) => (
          <Pressable
            key={opt.id}
            onPress={!isAddingWater && onAddWater ? () => onAddWater(opt.amountMl) : undefined}
            disabled={isAddingWater}
            accessibilityRole="button"
            accessibilityLabel={opt.label}
            accessibilityState={{ disabled: isAddingWater, busy: isAddingWater }}
            style={({ pressed }) => [
              styles.quickButton,
              isAddingWater && styles.buttonDisabled,
              pressed && !isAddingWater && styles.pressed,
            ]}
          >
            {isAddingWater ? (
              <ActivityIndicator size="small" color={colors.teal} />
            ) : (
              <Text style={styles.quickText}>{opt.label}</Text>
            )}
          </Pressable>
        ))}
        {onUndoWater ? (
          <Pressable
            onPress={isUndoingWater ? undefined : onUndoWater}
            disabled={isUndoingWater}
            accessibilityRole="button"
            accessibilityLabel={undoAccessibilityLabel}
            accessibilityState={{ disabled: isUndoingWater, busy: isUndoingWater }}
            style={({ pressed }) => [
              styles.undoButton,
              isUndoingWater && styles.buttonDisabled,
              pressed && !isUndoingWater && styles.pressed,
            ]}
          >
            {isUndoingWater ? (
              <ActivityIndicator size="small" color={colors.textSecondary} />
            ) : (
              <Icon name="undo" size={17} color={colors.textSecondary} />
            )}
          </Pressable>
        ) : null}
      </View>

      {onOpenHistory ? (
        <Pressable
          onPress={onOpenHistory}
          accessibilityRole="button"
          accessibilityLabel={historyLabel}
          hitSlop={8}
          style={({ pressed }) => [styles.historyButton, pressed && styles.pressed]}
        >
          <Text style={styles.historyText}>{historyLabel}</Text>
        </Pressable>
      ) : null}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.x2, flexShrink: 1 },
  title: { ...typography.body, fontWeight: '600', color: colors.textPrimary },
  goal: { ...typography.caption, color: colors.textTertiary },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x3,
    marginTop: spacing.x2 + 2,
  },
  drunk: { ...typography.numeric, fontSize: 22, lineHeight: 28, color: colors.textPrimary },
  progress: { flex: 1, minWidth: 0 },
  actionsRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.x2, marginTop: spacing.x3 },
  quickButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: radius.small + 2,
    backgroundColor: colors.tealSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickText: { ...typography.supporting, fontWeight: '600', color: colors.teal },
  undoButton: {
    width: 44,
    minHeight: 44,
    borderRadius: radius.small + 2,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyButton: { alignSelf: 'flex-end', marginTop: spacing.x2, minHeight: 32, justifyContent: 'center' },
  historyText: { ...typography.supporting, fontWeight: '600', color: colors.primary },
  buttonDisabled: { opacity: 0.6 },
  pressed: { opacity: 0.8 },
});

export default WaterCard;

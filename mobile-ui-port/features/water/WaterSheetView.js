import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { AppButton, BottomSheetView, Icon, ProgressBar } from '../../components';

const DEFAULT_QUICK_OPTIONS = [
  { id: 'quick-200', amountMl: 200, label: '+200 ml' },
  { id: 'quick-250', amountMl: 250, label: '+250 ml' },
  { id: 'quick-500', amountMl: 500, label: '+500 ml' },
];

/** ml → Türkçe ondalık litre metni (1400 → "1,4"). */
function toLitres(ml) {
  return (ml / 1000).toFixed(1).replace('.', ',');
}

/**
 * WaterSheetView — SuTakibiSheet port'u: mevcut/hedef, hızlı miktarlar,
 * son kaydı geri al, geçmiş bağlantısı.
 *
 * currentMl/goalMl sayısal; litre metni bileşen içinde biçimlenir.
 * quickOptions: [{ id, amountMl, label }] — onAddWater(amountMl).
 * lastEntryLabel (örn. "250 ml eklendi") verilirse geri al satırı görünür.
 *
 * isAddingWater=true iken tüm hızlı ekleme düğmeleri kilitlenir (busy durumu
 * erişilebilirliğe yansır); isUndoingWater=true iken geri al düğmesi
 * kilitlenir. Callback aynı işlem sürerken tekrar çağrılmaz. Su state'i bu
 * katmanda optimistic olarak değiştirilmez; host gerçek sonucu props ile gönderir.
 */
export function WaterSheetView({
  visible,
  currentMl = 0,
  goalMl = 0,
  quickOptions = DEFAULT_QUICK_OPTIONS,
  lastEntryLabel,
  isAddingWater = false,
  isUndoingWater = false,
  title = 'Su takibi',
  goalSuffix = 'hedef',
  undoLabel = 'Geri al',
  historyLabel = 'Geçmişi gör',
  doneLabel = 'Tamam',
  onAddWater,
  onUndoWater,
  onOpenHistory,
  onClose,
}) {
  const percent = goalMl > 0 ? (currentMl / goalMl) * 100 : 0;

  return (
    <BottomSheetView
      visible={visible}
      onClose={onClose}
      title={title}
      footer={<AppButton variant="secondary" label={doneLabel} onPress={onClose} />}
    >
      <View style={styles.amountRow}>
        <Text style={styles.amount}>{`${toLitres(currentMl)} L`}</Text>
        <Text style={styles.goal}>{`/ ${toLitres(goalMl)} L ${goalSuffix}`}</Text>
      </View>
      <ProgressBar value={percent} tone="teal" height={8} />

      {/* hızlı miktarlar */}
      <View style={styles.quickRow}>
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
      </View>

      {/* son kayıt geri al */}
      {lastEntryLabel && onUndoWater ? (
        <View style={styles.undoRow}>
          <Text style={styles.undoLabel} numberOfLines={1}>
            {lastEntryLabel}
          </Text>
          <Pressable
            onPress={isUndoingWater ? undefined : onUndoWater}
            disabled={isUndoingWater}
            accessibilityRole="button"
            accessibilityLabel={undoLabel}
            accessibilityState={{ disabled: isUndoingWater, busy: isUndoingWater }}
            hitSlop={8}
            style={({ pressed }) => [
              styles.undoButton,
              isUndoingWater && styles.buttonDisabled,
              pressed && !isUndoingWater && styles.pressed,
            ]}
          >
            {isUndoingWater ? (
              <ActivityIndicator size="small" color={colors.textPrimary} />
            ) : (
              <Icon name="undo" size={14} color={colors.textPrimary} accessible={false} />
            )}
            <Text style={styles.undoText}>{undoLabel}</Text>
          </Pressable>
        </View>
      ) : null}

      {/* geçmiş bağlantısı */}
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
    </BottomSheetView>
  );
}

const styles = StyleSheet.create({
  amountRow: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.x1 + 2 },
  amount: { ...typography.numeric, color: colors.textPrimary },
  goal: { ...typography.supporting, color: colors.textTertiary },
  quickRow: { flexDirection: 'row', gap: spacing.x2, marginTop: spacing.x2 },
  quickButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: radius.small + 2,
    backgroundColor: colors.tealSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickText: { ...typography.body, fontSize: 14, fontWeight: '600', color: colors.teal },
  undoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: radius.small + 2,
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: spacing.x4,
    paddingVertical: spacing.x3,
  },
  undoLabel: { ...typography.supporting, color: colors.textSecondary, flexShrink: 1 },
  undoButton: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x1 + 2,
  },
  undoText: { ...typography.supporting, fontWeight: '600', color: colors.textPrimary },
  historyButton: { alignSelf: 'center', minHeight: 44, justifyContent: 'center' },
  historyText: { ...typography.body, fontSize: 14, fontWeight: '600', color: colors.primary },
  buttonDisabled: { opacity: 0.6 },
  pressed: { opacity: 0.8 },
});

export default WaterSheetView;

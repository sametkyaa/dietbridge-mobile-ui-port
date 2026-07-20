import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadows, spacing, typography } from '../../theme';
import { Icon } from '../../components';

const VARIANTS = {
  info: { icon: 'info', iconColor: colors.white, bg: colors.textPrimary, actionColor: colors.primarySoft },
  success: { icon: 'check', iconColor: colors.primarySoft, bg: colors.textPrimary, actionColor: colors.primarySoft },
  warning: { icon: 'alert', iconColor: colors.warning, bg: colors.textPrimary, actionColor: colors.primarySoft },
  error: { icon: 'alert', iconColor: colors.white, bg: colors.error, actionColor: colors.white },
};

/**
 * ToastView — kısa işlem geri bildirimi (DurumToastOrnekleri port'u).
 * Başarı/bilgi nötr koyu zeminli, hata kırmızı zeminlidir; gerektiğinde tek
 * aksiyon içerir.
 *
 * UI-ONLY: otomatik kapanma timer'ı YOKTUR — görünürlüğü host `visible`
 * prop'u ile yönetir. Konumlandırma da host'a aittir (örn. ekran altında
 * absolute kapsayıcı).
 *
 * variant: 'info' | 'success' | 'warning' | 'error'
 */
export function ToastView({
  variant = 'info',
  message,
  actionLabel,
  onAction,
  visible = true,
  style,
}) {
  if (!visible) return null;
  const v = VARIANTS[variant] || VARIANTS.info;
  return (
    <View
      style={[styles.root, { backgroundColor: v.bg }, style]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      <Icon name={v.icon} size={16} color={v.iconColor} accessible={false} />
      <Text style={styles.message} numberOfLines={2}>
        {message}
      </Text>
      {actionLabel && onAction ? (
        <Pressable
          onPress={onAction}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          hitSlop={8}
          style={({ pressed }) => [styles.action, pressed && styles.pressed]}
        >
          <Text style={[styles.actionText, { color: v.actionColor }]}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x3,
    borderRadius: radius.control,
    paddingHorizontal: spacing.x4,
    paddingVertical: spacing.x3,
    ...shadows.card,
  },
  message: {
    ...typography.supporting,
    fontWeight: '500',
    color: colors.white,
    flex: 1,
    minWidth: 0,
  },
  action: { minHeight: 32, justifyContent: 'center' },
  actionText: { ...typography.supporting, fontWeight: '600' },
  pressed: { opacity: 0.8 },
});

export default ToastView;

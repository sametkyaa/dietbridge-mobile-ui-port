import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { Icon } from '../../components';

/**
 * FailedMessageState — gönderilemeyen mesajın altındaki satır: uyarı ikonu +
 * hata metni (glyph+text, yalnız renkle anlatım yok) + tekrar dene / sil.
 */
export function FailedMessageState({
  label = 'Mesaj gönderilemedi.',
  retryLabel = 'Tekrar dene',
  deleteLabel = 'Sil',
  onRetry,
  onDelete,
  style,
}) {
  return (
    <View style={[styles.root, style]} accessibilityLiveRegion="polite">
      <Icon name="alert" size={13} color={colors.error} accessible={false} />
      <Text style={styles.label}>{label}</Text>
      {onRetry ? (
        <Pressable
          onPress={onRetry}
          accessibilityRole="button"
          accessibilityLabel={retryLabel}
          hitSlop={8}
          style={({ pressed }) => [styles.action, pressed && styles.pressed]}
        >
          <Text style={styles.retryText}>{retryLabel}</Text>
        </Pressable>
      ) : null}
      {onDelete ? (
        <Pressable
          onPress={onDelete}
          accessibilityRole="button"
          accessibilityLabel={deleteLabel}
          hitSlop={8}
          style={({ pressed }) => [styles.action, pressed && styles.pressed]}
        >
          <Text style={styles.deleteText}>{deleteLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x1 + 2,
    marginTop: spacing.x1 + 2,
  },
  label: { ...typography.caption, fontWeight: '400', color: colors.error },
  action: { minHeight: 44, justifyContent: 'center', marginVertical: -spacing.x3 },
  retryText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.error,
    textDecorationLine: 'underline',
  },
  deleteText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textSecondary,
    textDecorationLine: 'underline',
  },
  pressed: { opacity: 0.7 },
});

export default FailedMessageState;

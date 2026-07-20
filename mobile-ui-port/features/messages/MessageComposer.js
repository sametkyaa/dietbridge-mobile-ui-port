import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { Icon } from '../../components';

/**
 * MessageComposer — sohbet alt yazı alanı: görsel ekleme düğmesi, controlled
 * çok satırlı TextInput, gönder düğmesi.
 *
 * Gönder düğmesi metin boşken veya isSending iken pasiftir (min 44×44).
 * Gerçek gönderme/yükleme servisi bu dosyada YOK — saf UI.
 */
export function MessageComposer({
  value,
  onChangeText,
  onSend,
  onPickImage,
  isSending = false,
  placeholder = 'Mesaj yaz…',
  imageLabel = 'Görsel ekle',
  sendLabel = 'Gönder',
  style,
}) {
  const canSend = !isSending && value.trim().length > 0;

  return (
    <View style={[styles.root, style]}>
      {onPickImage ? (
        <Pressable
          onPress={onPickImage}
          accessibilityRole="button"
          accessibilityLabel={imageLabel}
          hitSlop={4}
          style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
        >
          <Icon name="image" size={21} color={colors.textSecondary} accessible={false} />
        </Pressable>
      ) : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        multiline
        accessibilityLabel={placeholder}
        style={styles.input}
      />
      <Pressable
        onPress={canSend ? onSend : undefined}
        disabled={!canSend}
        accessibilityRole="button"
        accessibilityLabel={sendLabel}
        accessibilityState={{ disabled: !canSend, busy: isSending }}
        hitSlop={4}
        style={({ pressed }) => [
          styles.sendButton,
          !canSend && styles.sendButtonDisabled,
          pressed && canSend && styles.pressed,
        ]}
      >
        {isSending ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          <Icon name="send" size={17} color={canSend ? colors.white : colors.textTertiary} accessible={false} />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.x2,
    borderTopWidth: 1,
    borderTopColor: colors.borderSoft,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.x3,
    paddingTop: spacing.x2,
    paddingBottom: spacing.x2,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 110,
    borderRadius: 22,
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: spacing.x4,
    paddingTop: spacing.x3,
    paddingBottom: spacing.x3,
    ...typography.body,
    fontSize: 14,
    color: colors.textPrimary,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: { backgroundColor: colors.surfaceMuted },
  pressed: { opacity: 0.8 },
});

export default MessageComposer;

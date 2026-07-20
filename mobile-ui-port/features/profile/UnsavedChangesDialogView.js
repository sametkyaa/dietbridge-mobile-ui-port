import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';

/**
 * UnsavedChangesDialogView — ProfilDuzenleCikisUyarisi port'u: kaydedilmemiş
 * değişiklik çıkış uyarısı (UI-only Modal).
 *
 * visible prop'u ile sürülür; üç aksiyon:
 * - onKeepEditing: düzenlemeye devam et (dialogu kapatır)
 * - onDiscard: kaydetmeden çık (destructive tonda)
 * - onSave: değişiklikleri kaydet (isSaving ile spinner)
 */
export function UnsavedChangesDialogView({
  visible,
  title = 'Değişiklikler kaydedilmedi',
  message = 'Çıkmadan önce yaptığın değişiklikleri kaydetmek ister misin?',
  saveLabel = 'Kaydet',
  discardLabel = 'Kaydetmeden çık',
  keepEditingLabel = 'Düzenlemeye devam et',
  isSaving = false,
  onSave,
  onDiscard,
  onKeepEditing,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onKeepEditing}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Pressable
          style={styles.backdrop}
          onPress={onKeepEditing}
          accessibilityRole="button"
          accessibilityLabel={keepEditingLabel}
        />
        <View style={styles.dialog} accessibilityViewIsModal>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.actions}>
            <Pressable
              onPress={isSaving ? undefined : onSave}
              disabled={isSaving}
              accessibilityRole="button"
              accessibilityLabel={saveLabel}
              accessibilityState={{ busy: isSaving }}
              style={({ pressed }) => [
                styles.saveButton,
                isSaving && styles.saveButtonBusy,
                pressed && !isSaving && styles.pressed,
              ]}
            >
              <Text style={styles.saveText}>{saveLabel}</Text>
            </Pressable>
            {onDiscard ? (
              <Pressable
                onPress={onDiscard}
                accessibilityRole="button"
                accessibilityLabel={discardLabel}
                hitSlop={4}
                style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
              >
                <Text style={styles.discardText}>{discardLabel}</Text>
              </Pressable>
            ) : null}
            {onKeepEditing ? (
              <Pressable
                onPress={onKeepEditing}
                accessibilityRole="button"
                accessibilityLabel={keepEditingLabel}
                hitSlop={4}
                style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
              >
                <Text style={styles.keepText}>{keepEditingLabel}</Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(30, 40, 32, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.x8,
  },
  backdrop: { ...StyleSheet.absoluteFillObject },
  dialog: {
    alignSelf: 'stretch',
    borderRadius: radius.hero,
    backgroundColor: colors.surface,
    padding: spacing.x5,
  },
  title: { ...typography.cardTitle, color: colors.textPrimary },
  message: { ...typography.body, fontSize: 14, lineHeight: 21, color: colors.textSecondary, marginTop: spacing.x2 },
  actions: { marginTop: spacing.x5, gap: spacing.x1 },
  saveButton: {
    minHeight: 52,
    borderRadius: radius.control,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonBusy: { opacity: 0.7 },
  saveText: { ...typography.button, color: colors.white },
  secondaryButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discardText: { ...typography.body, fontSize: 14, fontWeight: '600', color: colors.error },
  keepText: { ...typography.body, fontSize: 14, fontWeight: '600', color: colors.textSecondary },
  pressed: { opacity: 0.8 },
});

export default UnsavedChangesDialogView;

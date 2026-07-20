import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { BottomSheetView, Icon, ProgressBar } from '../../components';

/**
 * MealPhotoUploadingView — fotoğraf yükleme durumu: seçilen dosya özeti,
 * lineer ilerleme + yüzde, iptal. progress 0–100 aralığındadır.
 */
export function MealPhotoUploadingView({
  visible,
  title = 'Öğün fotoğrafı',
  fileName,
  fileSizeLabel,
  progress = 0,
  note = 'Yükleniyor… Bu sırada uygulamayı kullanmaya devam edebilirsin.',
  cancelLabel = 'İptal',
  onCancel,
  onClose,
}) {
  const clamped = Math.min(100, Math.max(0, progress));
  return (
    <BottomSheetView
      visible={visible}
      onClose={onClose || onCancel}
      title={title}
      footer={
        onCancel ? (
          <Pressable
            onPress={onCancel}
            accessibilityRole="button"
            accessibilityLabel={cancelLabel}
            hitSlop={8}
            style={({ pressed }) => [styles.cancel, pressed && styles.pressed]}
          >
            <Text style={styles.cancelText}>{cancelLabel}</Text>
          </Pressable>
        ) : null
      }
    >
      <View style={styles.fileRow}>
        <View style={styles.fileThumb} accessible={false} importantForAccessibility="no">
          <Icon name="image" size={22} color={colors.textSecondary} />
        </View>
        <View style={styles.fileText}>
          <Text style={styles.fileName} numberOfLines={1}>
            {fileName}
          </Text>
          {fileSizeLabel ? <Text style={styles.fileSize}>{fileSizeLabel}</Text> : null}
        </View>
      </View>

      <View style={styles.progressRow}>
        <ProgressBar value={clamped} tone="primary" height={8} style={styles.progress} />
        <Text style={styles.percent}>{`%${Math.round(clamped)}`}</Text>
      </View>
      {note ? <Text style={styles.note}>{note}</Text> : null}
    </BottomSheetView>
  );
}

const styles = StyleSheet.create({
  fileRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.x3 },
  fileThumb: {
    width: 56,
    height: 56,
    borderRadius: radius.small + 2,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileText: { flex: 1, minWidth: 0 },
  fileName: { ...typography.supporting, fontWeight: '500', color: colors.textPrimary },
  fileSize: { ...typography.caption, color: colors.textTertiary },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x3,
    marginTop: spacing.x5,
  },
  progress: { flex: 1, minWidth: 0 },
  percent: { ...typography.supporting, fontWeight: '600', color: colors.textPrimary },
  note: { ...typography.caption, fontWeight: '400', color: colors.textTertiary, marginTop: spacing.x2 },
  cancel: { minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  cancelText: { ...typography.body, fontSize: 14, fontWeight: '600', color: colors.textSecondary },
  pressed: { opacity: 0.85 },
});

export default MealPhotoUploadingView;

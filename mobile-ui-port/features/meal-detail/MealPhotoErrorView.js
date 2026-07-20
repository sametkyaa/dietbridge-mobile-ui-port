import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { AppButton, BottomSheetView, Icon, InlineAlert } from '../../components';

/**
 * MealPhotoErrorView — fotoğraf yükleme hatası: soluk dosya özeti, dostça
 * hata mesajı (teknik kod YOK), "Tekrar dene" + "Vazgeç". Başarısız yükleme
 * asla başarılı görünmez.
 */
export function MealPhotoErrorView({
  visible,
  title = 'Öğün fotoğrafı',
  fileName,
  fileSizeLabel,
  failedSuffix = 'Yüklenemedi',
  message = 'Fotoğraf yüklenemedi. Bağlantını kontrol edip tekrar deneyebilirsin.',
  retryLabel = 'Tekrar dene',
  removeLabel = 'Vazgeç',
  onRetry,
  onRemove,
  onClose,
}) {
  return (
    <BottomSheetView
      visible={visible}
      onClose={onClose}
      title={title}
      footer={
        <>
          {onRetry ? <AppButton variant="primary" label={retryLabel} onPress={onRetry} /> : null}
          {onRemove ? (
            <AppButton variant="text" label={removeLabel} onPress={onRemove} style={styles.remove} />
          ) : null}
        </>
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
          <Text style={styles.fileSize} numberOfLines={1}>
            {fileSizeLabel ? `${fileSizeLabel} · ` : ''}
            {failedSuffix}
          </Text>
        </View>
      </View>
      <InlineAlert variant="error" message={message} />
    </BottomSheetView>
  );
}

const styles = StyleSheet.create({
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x3,
    opacity: 0.6,
  },
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
  remove: { alignSelf: 'center' },
});

export default MealPhotoErrorView;

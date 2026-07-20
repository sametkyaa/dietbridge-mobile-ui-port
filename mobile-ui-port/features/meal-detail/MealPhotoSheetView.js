import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { BottomSheetView, Icon } from '../../components';

/**
 * MealPhotoSheetView — öğün fotoğrafı ekleme alt sayfası: kamera / galeri /
 * "Şimdi değil". Saf callbacks; medya erişimi host tarafında yapılır.
 */
export function MealPhotoSheetView({
  visible,
  title = 'Öğün fotoğrafı ekle',
  description = 'Öğünü tamamladın — istersen fotoğrafını diyetisyeninle paylaş.',
  cameraLabel = 'Fotoğraf çek',
  galleryLabel = 'Galeriden seç',
  dismissLabel = 'Şimdi değil',
  onPickCamera,
  onPickGallery,
  onClose,
}) {
  return (
    <BottomSheetView
      visible={visible}
      onClose={onClose}
      title={title}
      footer={
        <Pressable
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel={dismissLabel}
          hitSlop={8}
          style={({ pressed }) => [styles.dismiss, pressed && styles.pressed]}
        >
          <Text style={styles.dismissText}>{dismissLabel}</Text>
        </Pressable>
      }
    >
      {description ? <Text style={styles.description}>{description}</Text> : null}
      <View style={styles.options}>
        <Pressable
          onPress={onPickCamera}
          accessibilityRole="button"
          accessibilityLabel={cameraLabel}
          style={({ pressed }) => [styles.option, pressed && styles.pressed]}
        >
          <View style={styles.optionIcon} accessible={false} importantForAccessibility="no">
            <Icon name="camera" size={18} color={colors.primaryDark} />
          </View>
          <Text style={styles.optionText}>{cameraLabel}</Text>
        </Pressable>
        <Pressable
          onPress={onPickGallery}
          accessibilityRole="button"
          accessibilityLabel={galleryLabel}
          style={({ pressed }) => [styles.option, pressed && styles.pressed]}
        >
          <View style={styles.optionIcon} accessible={false} importantForAccessibility="no">
            <Icon name="image" size={18} color={colors.primaryDark} />
          </View>
          <Text style={styles.optionText}>{galleryLabel}</Text>
        </Pressable>
      </View>
    </BottomSheetView>
  );
}

const styles = StyleSheet.create({
  description: { ...typography.supporting, color: colors.textSecondary },
  options: { gap: spacing.x2 + 2, marginTop: spacing.x2 },
  option: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x3,
    borderRadius: radius.control,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.x4,
  },
  optionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: { ...typography.body, fontWeight: '500', color: colors.textPrimary },
  dismiss: { minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  dismissText: { ...typography.body, fontSize: 14, fontWeight: '600', color: colors.textSecondary },
  pressed: { opacity: 0.85 },
});

export default MealPhotoSheetView;

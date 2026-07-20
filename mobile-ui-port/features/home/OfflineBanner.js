import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { Icon } from '../../components';

/**
 * OfflineBanner — çevrimdışı bilgi şeridi: ekranı bloklamaz, önbellekteki
 * içerik gösterilmeye devam eder.
 */
export function OfflineBanner({
  message = 'Çevrimdışısın — son yüklenen plan gösteriliyor.',
  style,
}) {
  return (
    <View style={[styles.root, style]} accessibilityRole="alert">
      <Icon name="wifiOff" size={16} color={colors.textSecondary} accessible={false} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x2 + 2,
    borderRadius: radius.control,
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: spacing.x4,
    paddingVertical: spacing.x3,
  },
  text: { ...typography.supporting, color: colors.textSecondary, flex: 1, flexShrink: 1 },
});

export default OfflineBanner;

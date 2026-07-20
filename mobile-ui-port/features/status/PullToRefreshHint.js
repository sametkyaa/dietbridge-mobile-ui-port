import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors, shadows, spacing, typography } from '../../theme';

/**
 * PullToRefreshHint — DurumPullToRefresh port'u: üstte sakin yenileme
 * göstergesi (yüzen daire + etiket).
 *
 * UI-ONLY: jest mantığı içermez. Gerçek yenileme için host, ScrollView /
 * FlatList'e RefreshControl bağlar ve yenileme sırasında bu bileşeni
 * içerik üstünde gösterir.
 */
export function PullToRefreshHint({ label = 'Yenileniyor…', visible = true, style }) {
  if (!visible) return null;
  return (
    <View style={[styles.root, style]} accessibilityLiveRegion="polite">
      <View style={styles.circle}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    gap: spacing.x1 + 2,
    paddingTop: spacing.x1,
    paddingBottom: spacing.x3,
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  label: { ...typography.caption, color: colors.textTertiary },
});

export default PullToRefreshHint;

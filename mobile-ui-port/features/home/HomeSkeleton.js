import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '../../theme';
import { AppSkeleton } from '../../components';

/**
 * HomeSkeleton — Ana Sayfa yükleniyor durumu: başlık, hero, makro kartı ve
 * liste iskeletleri (spinner yerine içerik iskeleti).
 */
export function HomeSkeleton({ animated = false, style }) {
  return (
    <View style={[styles.root, style]}>
      <View style={styles.headerRow}>
        <View style={styles.headerText}>
          <AppSkeleton width={180} height={26} animated={animated} />
          <AppSkeleton width={120} height={14} animated={animated} />
        </View>
        <AppSkeleton width={36} height={36} borderRadius={18} animated={animated} />
      </View>

      <AppSkeleton height={132} borderRadius={radius.hero} animated={animated} />

      <View style={styles.cardBlock}>
        <AppSkeleton width={130} height={16} animated={animated} />
        <AppSkeleton height={14} animated={animated} style={styles.gapTop} />
        <AppSkeleton height={8} borderRadius={radius.round} animated={animated} style={styles.gapSmall} />
        <AppSkeleton width="70%" height={14} animated={animated} style={styles.gapTop} />
        <AppSkeleton height={8} borderRadius={radius.round} animated={animated} style={styles.gapSmall} />
      </View>

      <View>
        <AppSkeleton width={140} height={18} animated={animated} />
        {[0, 1, 2].map((i) => (
          <View key={i} style={styles.listRow}>
            <AppSkeleton width={44} height={44} borderRadius={radius.small + 2} animated={animated} />
            <View style={styles.listText}>
              <AppSkeleton width={80} height={12} animated={animated} />
              <AppSkeleton height={14} animated={animated} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: spacing.x6 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerText: { gap: spacing.x2 },
  cardBlock: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    padding: spacing.x4,
  },
  gapTop: { marginTop: spacing.x3 },
  gapSmall: { marginTop: spacing.x2 },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x3,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.surface,
    padding: spacing.x4,
    marginTop: spacing.x2,
  },
  listText: { flex: 1, gap: spacing.x2 },
});

export default HomeSkeleton;

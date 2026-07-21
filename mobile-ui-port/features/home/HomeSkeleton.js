import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '../../theme';
import { AppSkeleton } from '../../components';

/**
 * HomeSkeleton — Ana Sayfa yükleniyor durumu: başlık, hero, makro kartı ve
 * liste iskeletleri (spinner yerine içerik iskeleti).
 *
 * animated=true iken tüm bloklar TEK ortak Animated.Value'ye bağlanır; her
 * AppSkeleton kendi döngüsünü başlatmaz. Böylece onlarca eşzamanlı animation
 * loop oluşmaz ve unmount'ta tek cleanup yeterlidir.
 */
export function HomeSkeleton({ animated = false, style }) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!animated) return undefined;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.5, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [animated, opacity]);

  const shared = animated ? { animatedValue: opacity } : null;

  return (
    <View style={[styles.root, style]}>
      <View style={styles.headerRow}>
        <View style={styles.headerText}>
          <AppSkeleton width={180} height={26} {...shared} />
          <AppSkeleton width={120} height={14} {...shared} />
        </View>
        <AppSkeleton width={36} height={36} borderRadius={18} {...shared} />
      </View>

      <AppSkeleton height={132} borderRadius={radius.hero} {...shared} />

      <View style={styles.cardBlock}>
        <AppSkeleton width={130} height={16} {...shared} />
        <AppSkeleton height={14} style={styles.gapTop} {...shared} />
        <AppSkeleton height={8} borderRadius={radius.round} style={styles.gapSmall} {...shared} />
        <AppSkeleton width="70%" height={14} style={styles.gapTop} {...shared} />
        <AppSkeleton height={8} borderRadius={radius.round} style={styles.gapSmall} {...shared} />
      </View>

      <View>
        <AppSkeleton width={140} height={18} {...shared} />
        {[0, 1, 2].map((i) => (
          <View key={i} style={styles.listRow}>
            <AppSkeleton width={44} height={44} borderRadius={radius.small + 2} {...shared} />
            <View style={styles.listText}>
              <AppSkeleton width={80} height={12} {...shared} />
              <AppSkeleton height={14} {...shared} />
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

import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '../theme';

/**
 * AppSkeleton — Surface Muted placeholder bloklar.
 * Saf UI: timer/otomatik geçiş YOK. animated=true verilirse hafif opaklık
 * döngüsü (shimmer yerine) uygulanır; varsayılan kapalıdır.
 */
export function AppSkeleton({
  width = '100%',
  height = 14,
  borderRadius = radius.small,
  lines = 0,
  animated = false,
  style,
}) {
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

  const blockStyle = [styles.block, { width, height, borderRadius }, style];

  if (lines > 1) {
    return (
      <View style={styles.linesWrap}>
        {Array.from({ length: lines }).map((_, i) => (
          <Animated.View
            key={i}
            style={[
              styles.block,
              {
                width: i === lines - 1 ? '70%' : width,
                height,
                borderRadius,
                opacity: animated ? opacity : 1,
              },
              style,
            ]}
          />
        ))}
      </View>
    );
  }

  return <Animated.View style={[...blockStyle, { opacity: animated ? opacity : 1 }]} />;
}

/** Kart görünümlü hazır skeleton preset'i. */
export function SkeletonCard({ animated = false, style }) {
  return (
    <View style={[styles.card, style]}>
      <AppSkeleton width={96} height={12} animated={animated} />
      <AppSkeleton height={16} animated={animated} style={styles.gap} />
      <AppSkeleton lines={2} height={12} animated={animated} style={styles.gap} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: { backgroundColor: colors.surfaceMuted },
  linesWrap: { gap: spacing.x2 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    padding: spacing.x4,
    gap: spacing.x3,
  },
  gap: { marginTop: spacing.x1 },
});

export default AppSkeleton;

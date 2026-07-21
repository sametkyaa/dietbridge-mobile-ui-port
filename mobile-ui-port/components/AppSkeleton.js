import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '../theme';

/**
 * AppSkeleton — Surface Muted placeholder bloklar.
 * Saf UI: timer/otomatik geçiş YOK. animated=true verilirse hafif opaklık
 * döngüsü (shimmer yerine) uygulanır; varsayılan kapalıdır.
 *
 * animatedValue: opsiyonel paylaşılan Animated.Value. Verilirse bu blok kendi
 * animasyon döngüsünü BAŞLATMAZ; üst bileşenin tek ortak döngüsüne katılır.
 * Böylece aynı ekranda onlarca eşzamanlı animation loop oluşmaz
 * (örn. HomeSkeleton). Döngünün başlatılması/durdurulması üst bileşenin
 * sorumluluğundadır.
 */
export function AppSkeleton({
  width = '100%',
  height = 14,
  borderRadius = radius.small,
  lines = 0,
  animated = false,
  animatedValue,
  style,
}) {
  const ownOpacity = useRef(new Animated.Value(1)).current;
  const shared = !!animatedValue;
  const opacity = shared ? animatedValue : ownOpacity;

  useEffect(() => {
    if (!animated || shared) return undefined;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(ownOpacity, { toValue: 0.5, duration: 700, useNativeDriver: true }),
        Animated.timing(ownOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [animated, shared, ownOpacity]);

  const blockStyle = [styles.block, { width, height, borderRadius }, style];
  const effectiveOpacity = animated || shared ? opacity : 1;

  if (lines > 1) {
    return (
      <View style={styles.linesWrap}>
        {[...Array(lines)].map((_, i) => (
          <Animated.View
            key={i}
            style={[
              styles.block,
              {
                width: i === lines - 1 ? '70%' : width,
                height,
                borderRadius,
                opacity: effectiveOpacity,
              },
              style,
            ]}
          />
        ))}
      </View>
    );
  }

  return <Animated.View style={[...blockStyle, { opacity: effectiveOpacity }]} />;
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

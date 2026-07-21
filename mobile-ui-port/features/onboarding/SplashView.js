import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadows, spacing, typography } from '../../theme';
import { AppScreen, Icon } from '../../components';

/**
 * SplashView — Splash.tsx port'u. Ortalanmış logo, sakin yükleme göstergesi
 * (sonsuz spinner yok; üç nokta yumuşak bir ritimle yanıp söner).
 *
 * Tamamen statik bir görünüm; tek prop metin özelleştirmesi içindir.
 */
export function SplashView({
  appName = 'DietBridge',
  tagline = 'Diyetisyeninle birlikte',
  loadingLabel = 'Oturumun hazırlanıyor…',
}) {
  const dots = useRef([new Animated.Value(0.35), new Animated.Value(0.35), new Animated.Value(0.35)]).current;

  useEffect(() => {
    const animations = dots.map((dot, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 180),
          Animated.timing(dot, { toValue: 1, duration: 420, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0.35, duration: 420, useNativeDriver: true }),
          Animated.delay((dots.length - 1 - i) * 180),
        ]),
      ),
    );
    animations.forEach((a) => a.start());
    return () => animations.forEach((a) => a.stop());
  }, [dots]);

  return (
    <AppScreen backgroundColor={colors.primarySurface} contentStyle={styles.content}>
      <View style={styles.logo} accessible={false} importantForAccessibility="no">
        <Icon name="sprout" size={40} color={colors.white} />
      </View>
      <Text style={styles.appName}>{appName}</Text>
      <Text style={styles.tagline}>{tagline}</Text>
      <View style={styles.dots} accessible={false} importantForAccessibility="no">
        {dots.map((dot, i) => (
          <Animated.View key={i} style={[styles.dot, { opacity: dot }]} />
        ))}
      </View>
      <Text style={styles.loading} accessibilityLiveRegion="polite">
        {loadingLabel}
      </Text>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.x8,
  },
  logo: {
    width: 84,
    height: 84,
    borderRadius: radius.sheet,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  appName: { ...typography.screenTitle, color: colors.primaryDark, marginTop: spacing.x5 },
  tagline: { ...typography.supporting, color: colors.textSecondary, marginTop: spacing.x1 + 2 },
  dots: { flexDirection: 'row', gap: spacing.x2, marginTop: spacing.x10 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  loading: { ...typography.caption, color: colors.textTertiary, marginTop: spacing.x3 },
});

export default SplashView;

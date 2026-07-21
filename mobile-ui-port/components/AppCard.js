import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '../theme';

/**
 * AppCard — standart kart: Surface zemin, radius.card, 1px Border Soft kenarlık.
 * onPress verilirse Pressable ile sarılır (pressed'de hafif opaklık).
 * contentStyle, kart tıklanabilir olsun ya da olmasın içerik sarmalayıcısına
 * uygulanır.
 */
export function AppCard({ children, style, onPress, accessibilityLabel, contentStyle }) {
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        style={({ pressed }) => [styles.card, pressed && styles.pressed, style]}
      >
        <View style={contentStyle}>{children}</View>
      </Pressable>
    );
  }
  return (
    <View style={[styles.card, style]}>
      <View style={contentStyle}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    padding: spacing.x4,
  },
  pressed: { opacity: 0.85 },
});

export default AppCard;

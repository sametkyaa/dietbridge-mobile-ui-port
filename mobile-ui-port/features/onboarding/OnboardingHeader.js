import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { Icon } from '../../components';

/**
 * OnboardingHeader (internal) — web BackHeader karşılığı: geri butonu + başlık.
 * AppScreen'in `header` prop'u ile kullanılır (scroll dışında sabit kalır).
 * onBack verilmezse geri butonu yerine boşluk bırakılır (başlık hizası korunur).
 */
export function OnboardingHeader({ title, onBack }) {
  return (
    <View style={styles.root}>
      {onBack ? (
        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Geri"
          hitSlop={8}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <Icon name="back" size={22} color={colors.textPrimary} />
        </Pressable>
      ) : (
        <View style={styles.backButton} accessible={false} importantForAccessibility="no" />
      )}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.backButton} accessible={false} importantForAccessibility="no" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.x5,
    paddingTop: spacing.x3,
    paddingBottom: spacing.x2,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -spacing.x2,
  },
  pressed: { opacity: 0.6 },
  title: {
    flex: 1,
    textAlign: 'center',
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});

export default OnboardingHeader;

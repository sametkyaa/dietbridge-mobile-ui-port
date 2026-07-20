import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme';

/**
 * AppButton — primary | secondary | text varyantları.
 * - Yükseklik 52px (text varyantında min 44px dokunma alanı)
 * - loading: ActivityIndicator gösterir, basışı engeller (çift gönderim koruması)
 * - disabled: Surface Muted zemin + Text Tertiary metin
 * - icon: opsiyonel node (label'ın solunda)
 */
export function AppButton({
  variant = 'primary',
  label,
  onPress,
  loading = false,
  disabled = false,
  icon = null,
  accessibilityLabel,
  style,
  textStyle,
}) {
  const off = disabled || loading;
  const isText = variant === 'text';

  return (
    <Pressable
      onPress={off ? undefined : onPress}
      disabled={off}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || label}
      accessibilityState={{ disabled: off, busy: loading }}
      hitSlop={isText ? 8 : 0}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        isText && styles.textVariant,
        off && !isText && styles.disabled,
        pressed && !off && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.white : colors.primaryDark}
        />
      ) : (
        <View style={styles.row}>
          {icon}
          <Text
            style={[
              styles.label,
              variant === 'primary' && styles.labelPrimary,
              variant === 'secondary' && styles.labelSecondary,
              isText && styles.labelText,
              off && styles.labelDisabled,
              textStyle,
            ]}
          >
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: radius.control,
    paddingHorizontal: spacing.x5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.primarySoft },
  textVariant: {
    minHeight: 44,
    paddingHorizontal: spacing.x2,
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
  },
  disabled: { backgroundColor: colors.surfaceMuted },
  pressed: { opacity: 0.85 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.x2 },
  label: { ...typography.button },
  labelPrimary: { color: colors.white },
  labelSecondary: { color: colors.primaryDark },
  labelText: { color: colors.primary },
  labelDisabled: { color: colors.textTertiary },
});

export default AppButton;

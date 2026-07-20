import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, spacing, typography } from '../../theme';

/**
 * PasswordToggle (internal) — AppInput rightAccessory olarak kullanılan
 * göster/gizle butonu. Web'deki Eye/EyeOff ikonu yerine erişilebilir metin
 * etiketi kullanır (44px dokunma alanı).
 */
export function PasswordToggle({ visible = false, onToggle }) {
  const label = visible ? 'Gizle' : 'Göster';
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="button"
      accessibilityLabel={visible ? 'Şifreyi gizle' : 'Şifreyi göster'}
      accessibilityState={{ selected: visible }}
      hitSlop={8}
      style={({ pressed }) => [styles.root, pressed && styles.pressed]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -spacing.x2,
    paddingHorizontal: spacing.x2,
  },
  pressed: { opacity: 0.6 },
  label: { ...typography.caption, fontWeight: '600', color: colors.primary },
});

export default PasswordToggle;

import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius, spacing, typography } from '../theme';
import Icon from './Icon';

/**
 * ChoiceChip — tekli seçim chip'i.
 * Default: Surface + Border Soft; Selected: Primary Soft + Primary kenarlık +
 * Primary Dark metin + sol check işareti. Min dokunma alanı 44px.
 */
export function ChoiceChip({ label, selected = false, onPress, disabled = false, icon = null, style }) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected, disabled }}
      hitSlop={4}
      style={({ pressed }) => [
        styles.chip,
        selected ? styles.selected : styles.default,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      {selected ? (
        <Icon name="check" size={13} color={colors.primaryDark} accessible={false} />
      ) : icon ? (
        typeof icon === 'string' ? (
          <Icon name={icon} size={14} color={colors.textSecondary} accessible={false} />
        ) : (
          icon
        )
      ) : null}
      <Text
        style={[
          styles.label,
          selected ? styles.labelSelected : styles.labelDefault,
          disabled && styles.labelDisabled,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x2,
    borderRadius: radius.control,
    borderWidth: 1,
    paddingHorizontal: spacing.x4,
    alignSelf: 'flex-start',
  },
  default: { backgroundColor: colors.surface, borderColor: colors.borderSoft },
  selected: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.8 },
  label: { ...typography.supporting, fontWeight: '500' },
  labelDefault: { color: colors.textPrimary },
  labelSelected: { color: colors.primaryDark, fontWeight: '600' },
  labelDisabled: { color: colors.textTertiary },
});

export default ChoiceChip;

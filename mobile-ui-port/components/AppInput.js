import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme';

/**
 * AppInput — label her zaman görünür; hata: Error border + alanla ilişkili hata metni.
 * rightAccessory: örn. şifre göster/gizle butonu (host app sağlar, 44px dokunma alanı).
 */
export function AppInput({
  label,
  value,
  placeholder,
  error,
  hint,
  secureTextEntry = false,
  keyboardType,
  onChangeText,
  onBlur,
  onFocus,
  editable = true,
  rightAccessory = null,
  style,
  inputStyle,
  accessibilityLabel,
  multiline = false,
}) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.root, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[
          styles.inputWrap,
          focused && styles.inputWrapFocused,
          !!error && styles.inputWrapError,
          !editable && styles.inputWrapDisabled,
        ]}
      >
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          editable={editable}
          multiline={multiline}
          accessibilityLabel={accessibilityLabel || label}
          accessibilityHint={hint}
          onFocus={(e) => {
            setFocused(true);
            if (onFocus) onFocus(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            if (onBlur) onBlur(e);
          }}
          style={[styles.input, multiline && styles.inputMultiline, inputStyle]}
        />
        {rightAccessory}
      </View>
      {error ? (
        <Text style={styles.error} accessibilityLiveRegion="polite">
          {error}
        </Text>
      ) : hint ? (
        <Text style={styles.hint}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: spacing.x2 },
  label: { ...typography.supporting, fontWeight: '500', color: colors.textPrimary },
  inputWrap: {
    minHeight: 52,
    borderRadius: radius.control,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.x4,
  },
  inputWrapFocused: { borderColor: colors.primary, borderWidth: 1.5 },
  inputWrapError: { borderColor: colors.error },
  inputWrapDisabled: { backgroundColor: colors.surfaceMuted },
  input: {
    flex: 1,
    paddingVertical: spacing.x3,
    ...typography.body,
    color: colors.textPrimary,
  },
  inputMultiline: { minHeight: 96, textAlignVertical: 'top' },
  error: { ...typography.supporting, color: colors.error },
  hint: { ...typography.supporting, color: colors.textSecondary },
});

export default AppInput;

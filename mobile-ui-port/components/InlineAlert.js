import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme';
import Icon from './Icon';

const VARIANTS = {
  info: { bg: colors.tealSoft, fg: colors.info, icon: 'info' },
  success: { bg: colors.primarySoft, fg: colors.success, icon: 'check' },
  warning: { bg: '#F7EDDD', fg: colors.warning, icon: 'alert' },
  error: { bg: '#F8E9E9', fg: colors.error, icon: 'alert' },
};

/**
 * InlineAlert — bölüm içi bilgi/uyarı/hata; tam ekranı bloke etmez.
 */
export function InlineAlert({ variant = 'info', title, message, onDismiss, style }) {
  const v = VARIANTS[variant] || VARIANTS.info;
  return (
    <View
      style={[styles.root, { backgroundColor: v.bg }, style]}
      accessibilityRole="alert"
    >
      <View style={styles.iconWrap} accessible={false} importantForAccessibility="no">
        <Icon name={v.icon} size={16} color={v.fg} />
      </View>
      <View style={styles.textWrap}>
        {title ? <Text style={[styles.title, { color: v.fg }]}>{title}</Text> : null}
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
      {onDismiss ? (
        <Pressable
          onPress={onDismiss}
          accessibilityRole="button"
          accessibilityLabel="Kapat"
          hitSlop={8}
          style={styles.dismiss}
        >
          <Icon name="close" size={16} color={colors.textSecondary} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: radius.control,
    padding: spacing.x3,
    gap: spacing.x3,
  },
  iconWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  textWrap: { flex: 1, gap: 2 },
  title: { ...typography.supporting, fontWeight: '600' },
  message: { ...typography.supporting, color: colors.textPrimary },
  dismiss: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default InlineAlert;

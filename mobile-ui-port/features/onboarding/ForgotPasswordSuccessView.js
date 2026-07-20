import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { AppButton, AppScreen, Icon } from '../../components';

/**
 * ForgotPasswordSuccessView — SifreSifirlamaOnay.tsx port'u.
 * Sıfırlama bağlantısı gönderildi onayı; e-posta adresi prop'tan gelir.
 */
export function ForgotPasswordSuccessView({
  email,
  title = 'Bağlantı gönderildi',
  resendCooldownLabel,
  onBackToLogin,
  onResend,
}) {
  return (
    <AppScreen scroll contentStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.iconWrap} accessible={false} importantForAccessibility="no">
          <Icon name="send" size={30} color={colors.primaryDark} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>
          <Text style={styles.email}>{email}</Text>
          {' adresine şifre sıfırlama bağlantısı gönderdik. Gelen kutunu kontrol et.'}
        </Text>
      </View>

      <AppButton
        variant="primary"
        label="Girişe dön"
        onPress={onBackToLogin}
        accessibilityLabel="Girişe dön"
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {resendCooldownLabel || 'Bağlantı ulaşmadı mı? '}
        </Text>
        {!resendCooldownLabel && onResend ? (
          <Pressable
            onPress={onResend}
            accessibilityRole="button"
            accessibilityLabel="Tekrar gönder"
            hitSlop={8}
            style={({ pressed }) => [styles.footerLinkWrap, pressed && styles.pressed]}
          >
            <Text style={styles.footerLink}>Tekrar gönder</Text>
          </Pressable>
        ) : null}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, paddingTop: spacing.x10 },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.x4,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: radius.round,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typography.sectionTitle,
    fontSize: 22,
    color: colors.textPrimary,
    marginTop: spacing.x5,
    textAlign: 'center',
  },
  body: {
    ...typography.supporting,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.x2,
    maxWidth: 280,
  },
  email: { fontWeight: '500', color: colors.textPrimary },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.x4,
  },
  footerText: { ...typography.supporting, color: colors.textSecondary },
  footerLinkWrap: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: spacing.x1,
  },
  footerLink: { ...typography.supporting, fontWeight: '600', color: colors.primary },
  pressed: { opacity: 0.6 },
});

export default ForgotPasswordSuccessView;

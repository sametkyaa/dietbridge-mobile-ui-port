import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { AppButton, AppInput, AppScreen, InlineAlert } from '../../components';
import OnboardingHeader from './OnboardingHeader';

/**
 * ForgotPasswordView — SifreSifirlama.tsx port'u.
 * E-posta girişi + sıfırlama bağlantısı gönderme. Gönderim mantığı YOK.
 */
export function ForgotPasswordView({
  email = '',
  emailError,
  generalError,
  isSubmitting = false,
  onEmailChange,
  onSubmit,
  onBack,
  onLogin,
}) {
  return (
    <AppScreen
      scroll
      header={<OnboardingHeader title="Şifre sıfırlama" onBack={onBack} />}
      contentStyle={styles.content}
    >
      <Text style={styles.title}>Şifreni sıfırla</Text>
      <Text style={styles.subtitle}>
        Hesabına bağlı e-posta adresini gir. Sana bir sıfırlama bağlantısı gönderelim.
      </Text>

      <AppInput
        label="E-posta"
        value={email}
        onChangeText={onEmailChange}
        error={emailError}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        accessibilityLabel="E-posta"
        style={styles.field}
      />

      {generalError ? (
        <InlineAlert variant="error" message={generalError} style={styles.alert} />
      ) : null}

      <View style={styles.spacer} />

      <AppButton
        variant="primary"
        label={isSubmitting ? 'Gönderiliyor…' : 'Bağlantı gönder'}
        loading={isSubmitting}
        onPress={onSubmit}
        accessibilityLabel="Bağlantı gönder"
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Hatırladın mı? </Text>
        <Pressable
          onPress={onLogin}
          accessibilityRole="button"
          accessibilityLabel="Girişe dön"
          hitSlop={8}
          style={({ pressed }) => [styles.footerLinkWrap, pressed && styles.pressed]}
        >
          <Text style={styles.footerLink}>Girişe dön</Text>
        </Pressable>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, paddingTop: spacing.x4 },
  title: { ...typography.screenTitle, color: colors.textPrimary },
  subtitle: {
    ...typography.supporting,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
    marginTop: spacing.x2,
  },
  field: { marginTop: spacing.x8 },
  alert: { marginTop: spacing.x4 },
  spacer: { flex: 1, minHeight: spacing.x6 },
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

export default ForgotPasswordView;

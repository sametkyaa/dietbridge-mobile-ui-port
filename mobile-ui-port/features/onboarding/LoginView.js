import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { AppButton, AppInput, AppScreen, InlineAlert } from '../../components';
import PasswordToggle from './PasswordToggle';

/**
 * LoginView — Giris + GirisHata + GirisBaglantiHatasi tek görünümde.
 * Yalnızca görsel: doğrulama/auth mantığı YOK; hatalar prop olarak verilir.
 *
 * generalError → error tonunda InlineAlert (GirisHata)
 * isOffline    → info tonunda InlineAlert + "Tekrar dene" butonu (GirisBaglantiHatasi)
 * isSubmitting → buton loading'de, çift gönderim engellenir.
 */
export function LoginView({
  email = '',
  password = '',
  isPasswordVisible = false,
  isSubmitting = false,
  emailError,
  passwordError,
  generalError,
  isOffline = false,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit,
  onForgotPassword,
  onRegister,
}) {
  const submitLabel = isSubmitting ? 'Giriş yapılıyor…' : isOffline ? 'Tekrar dene' : 'Giriş yap';

  return (
    <AppScreen scroll contentStyle={styles.content}>
      <View style={styles.logo} accessible={false} importantForAccessibility="no">
        <Text style={styles.logoGlyph}>🌱</Text>
      </View>
      <Text style={styles.title}>Tekrar hoş geldin</Text>
      <Text style={styles.subtitle}>Hesabına giriş yap, kaldığın yerden devam et.</Text>

      <View style={styles.form}>
        <AppInput
          label="E-posta"
          value={email}
          onChangeText={onEmailChange}
          error={emailError}
          keyboardType="email-address"
          accessibilityLabel="E-posta"
        />
        <AppInput
          label="Şifre"
          value={password}
          onChangeText={onPasswordChange}
          error={passwordError}
          secureTextEntry={!isPasswordVisible}
          accessibilityLabel="Şifre"
          rightAccessory={
            <PasswordToggle visible={isPasswordVisible} onToggle={onTogglePassword} />
          }
        />
      </View>

      <Pressable
        onPress={onForgotPassword}
        accessibilityRole="button"
        accessibilityLabel="Şifremi unuttum"
        hitSlop={8}
        style={({ pressed }) => [styles.forgot, pressed && styles.pressed]}
      >
        <Text style={styles.forgotText}>Şifremi unuttum</Text>
      </Pressable>

      {generalError ? (
        <InlineAlert variant="error" message={generalError} style={styles.alert} />
      ) : null}
      {isOffline ? (
        <InlineAlert
          variant="info"
          message="Bağlantı kurulamadı. İnternet bağlantını kontrol edip tekrar deneyebilirsin."
          style={styles.alert}
        />
      ) : null}

      <View style={styles.spacer} />

      <AppButton
        variant="primary"
        label={submitLabel}
        loading={isSubmitting}
        onPress={onSubmit}
        accessibilityLabel={submitLabel}
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Hesabın yok mu? </Text>
        <Pressable
          onPress={onRegister}
          accessibilityRole="button"
          accessibilityLabel="Kayıt ol"
          hitSlop={8}
          style={({ pressed }) => [styles.footerLinkWrap, pressed && styles.pressed]}
        >
          <Text style={styles.footerLink}>Kayıt ol</Text>
        </Pressable>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, paddingTop: spacing.x6 },
  logo: {
    width: 48,
    height: 48,
    borderRadius: radius.control,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoGlyph: { fontSize: 24, lineHeight: 30 },
  title: { ...typography.screenTitle, color: colors.textPrimary, marginTop: spacing.x5 },
  subtitle: {
    ...typography.supporting,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
    marginTop: spacing.x2,
  },
  form: { gap: spacing.x4, marginTop: spacing.x8 },
  forgot: {
    alignSelf: 'flex-end',
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: spacing.x2,
  },
  forgotText: { ...typography.supporting, fontWeight: '600', color: colors.primary },
  alert: { marginTop: spacing.x2 },
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

export default LoginView;

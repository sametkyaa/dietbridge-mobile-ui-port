import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { AppButton, AppInput, AppScreen, Icon, InlineAlert, ProgressBar } from '../../components';
import PasswordToggle from './PasswordToggle';

/**
 * RegisterView — Kayit.tsx port'u. Yalnızca hesap bilgileri + kullanım
 * koşulları onayı (sağlık bilgisi sorulmaz). Doğrulama mantığı YOK;
 * hatalar ve şifre gücü prop olarak verilir.
 *
 * passwordStrength: { percent: 0–100, label: string, tone?: 'primary'|'warning'|'error'|'success'|'teal'|'info' }
 *   — verilirse şifre alanının altında güç göstergesi render edilir.
 *
 * Kullanım koşulları akışı:
 * - Checkbox satırına basmak onToggleTerms'i tetikler.
 * - "Kullanım koşulları" metni ayrı tıklanabilir → onOpenTerms
 * - "Gizlilik politikası" metni ayrı tıklanabilir → onOpenPrivacy
 * - termsError verilirse checkbox altında erişilebilir hata gösterilir
 *   (accessibilityLiveRegion="polite").
 * - Kayıt butonu termsAccepted=false iken devre dışıdır.
 */
export function RegisterView({
  fullName = '',
  email = '',
  password = '',
  passwordConfirm = '',
  isPasswordVisible = false,
  isPasswordConfirmVisible = false,
  termsAccepted = false,
  fullNameError,
  emailError,
  passwordError,
  passwordConfirmError,
  generalError,
  termsError,
  termsLinkLabel = 'Kullanım koşullarını',
  privacyLinkLabel = 'gizlilik politikasını',
  passwordStrength = null,
  isSubmitting = false,
  onFullNameChange,
  onEmailChange,
  onPasswordChange,
  onPasswordConfirmChange,
  onTogglePassword,
  onTogglePasswordConfirm,
  onToggleTerms,
  onOpenTerms,
  onOpenPrivacy,
  onSubmit,
  onLogin,
}) {
  return (
    <AppScreen scroll contentStyle={styles.content}>
      <Text style={styles.title}>Hesap oluştur</Text>
      <Text style={styles.subtitle}>
        Birkaç bilgiyle başla; profilini ve sağlık detaylarını sonra tamamlayabilirsin.
      </Text>

      <View style={styles.form}>
        <AppInput
          label="Ad soyad"
          value={fullName}
          onChangeText={onFullNameChange}
          error={fullNameError}
          autoCapitalize="words"
          autoComplete="name"
          accessibilityLabel="Ad soyad"
        />
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
        />
        <View>
          <AppInput
            label="Şifre"
            value={password}
            onChangeText={onPasswordChange}
            error={passwordError}
            placeholder="En az 8 karakter"
            secureTextEntry={!isPasswordVisible}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="new-password"
            accessibilityLabel="Şifre"
            rightAccessory={
              <PasswordToggle visible={isPasswordVisible} onToggle={onTogglePassword} />
            }
          />
          {passwordStrength ? (
            <View style={styles.strength} accessibilityLiveRegion="polite">
              <ProgressBar
                value={passwordStrength.percent}
                tone={passwordStrength.tone || 'primary'}
                height={4}
                style={styles.strengthBar}
              />
              <Text style={styles.strengthLabel}>{passwordStrength.label}</Text>
            </View>
          ) : null}
        </View>
        <AppInput
          label="Şifre doğrulama"
          value={passwordConfirm}
          onChangeText={onPasswordConfirmChange}
          error={passwordConfirmError}
          placeholder="Şifreni tekrar gir"
          secureTextEntry={!isPasswordConfirmVisible}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="new-password"
          accessibilityLabel="Şifre doğrulama"
          rightAccessory={
            <PasswordToggle
              visible={isPasswordConfirmVisible}
              onToggle={onTogglePasswordConfirm}
            />
          }
        />
      </View>

      <View style={styles.termsBlock}>
        <View style={styles.termsRow}>
          <Pressable
            onPress={onToggleTerms}
            accessibilityRole="checkbox"
            accessibilityLabel="Kullanım koşullarını ve gizlilik politikasını kabul ediyorum"
            accessibilityState={{ checked: termsAccepted }}
            hitSlop={8}
            style={({ pressed }) => [styles.checkboxHit, pressed && styles.pressed]}
          >
            <View style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}>
              {termsAccepted ? (
                <Icon name="check" size={13} color={colors.white} accessible={false} />
              ) : null}
            </View>
          </Pressable>
          <Text style={styles.termsText}>
            <Text
              onPress={onOpenTerms}
              accessibilityRole="link"
              accessibilityLabel="Kullanım koşullarını aç"
              suppressHighlighting
              style={styles.termsLink}
            >
              {termsLinkLabel}
            </Text>
            {' ve '}
            <Text
              onPress={onOpenPrivacy}
              accessibilityRole="link"
              accessibilityLabel="Gizlilik politikasını aç"
              suppressHighlighting
              style={styles.termsLink}
            >
              {privacyLinkLabel}
            </Text>
            {' kabul ediyorum.'}
          </Text>
        </View>
        {termsError ? (
          <Text style={styles.termsError} accessibilityLiveRegion="polite">
            {termsError}
          </Text>
        ) : null}
      </View>

      {generalError ? (
        <InlineAlert variant="error" message={generalError} style={styles.alert} />
      ) : null}

      <View style={styles.spacer} />

      <AppButton
        variant="primary"
        label={isSubmitting ? 'Hesap oluşturuluyor…' : 'Kayıt ol'}
        loading={isSubmitting}
        disabled={!termsAccepted || isSubmitting}
        onPress={onSubmit}
        accessibilityLabel="Kayıt ol"
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Zaten hesabın var mı? </Text>
        <Pressable
          onPress={onLogin}
          accessibilityRole="button"
          accessibilityLabel="Giriş yap"
          hitSlop={8}
          style={({ pressed }) => [styles.footerLinkWrap, pressed && styles.pressed]}
        >
          <Text style={styles.footerLink}>Giriş yap</Text>
        </Pressable>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, paddingTop: spacing.x6 },
  title: { ...typography.screenTitle, color: colors.textPrimary },
  subtitle: {
    ...typography.supporting,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
    marginTop: spacing.x2,
  },
  form: { gap: spacing.x4, marginTop: spacing.x6 },
  strength: { marginTop: spacing.x2, gap: spacing.x1 },
  strengthBar: { width: '100%' },
  strengthLabel: { ...typography.caption, color: colors.textSecondary },
  termsBlock: { marginTop: spacing.x5, gap: spacing.x2 },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.x3,
    minHeight: 44,
  },
  checkboxHit: {
    minHeight: 44,
    justifyContent: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: colors.borderSoft,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  termsText: {
    flex: 1,
    ...typography.supporting,
    color: colors.textSecondary,
    paddingTop: 2,
  },
  termsLink: { fontWeight: '600', color: colors.primary },
  termsError: {
    ...typography.supporting,
    color: colors.error,
    marginLeft: spacing.x3 + 24 + spacing.x3,
  },
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

export default RegisterView;

import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { AppButton, AppInput, AppScreen, Icon } from '../../components';
import { ProfileHeader } from './ProfileHeader';

/**
 * PersonalInfoEditView — ProfilDuzenleKisisel port'u: ad, telefon, doğum
 * tarihi + avatar değiştirme.
 *
 * E-POSTA BU FORMUN PARÇASI DEĞİLDİR: generic profil onSave'i e-posta
 * değiştirmez. E-posta alanı salt okunur gösterilir; değişiklik ayrı bir Auth
 * akışı gerektirir ve yalnızca onRequestEmailChange callback'i tetiklenir
 * (gerçek doğrulama/yeniden giriş akışı host'tadır).
 * - email: mevcut adres (salt okunur satır)
 * - emailChangePending=true iken "doğrulama bekleniyor" bilgisi gösterilir
 * - isChangingEmail=true iken "Değiştir" butonu kilitlenir (busy)
 *
 * Controlled form: values { fullName, phone, birthDate } +
 * onFieldChange(key, value); errors { [key]: mesaj } alan bazlı hata.
 * Kaydetme mantığı host'ta; isSaving Kaydet butonunu spinner'a çevirir.
 */
export function PersonalInfoEditView({
  title = 'Kişisel bilgiler',
  values = {},
  errors = {},
  initials,
  email,
  emailChangePending = false,
  isChangingEmail = false,
  emailChangeLabel = 'Değiştir',
  emailPendingInfo = 'Yeni e-posta adresi için doğrulama bekleniyor.',
  emailHint = 'Giriş için bu adres kullanılır. Değişiklik ayrı bir doğrulama adımı gerektirir.',
  isSaving = false,
  changePhotoLabel = 'Fotoğrafı değiştir',
  saveLabel = 'Kaydet',
  cancelLabel = 'Vazgeç',
  onFieldChange,
  onChangePhoto,
  onRequestEmailChange,
  onSave,
  onCancel,
  onBack,
}) {
  return (
    <AppScreen
      scroll
      padTop
      header={<ProfileHeader title={title} onBack={onBack} />}
      contentStyle={styles.content}
    >
      <View style={styles.avatarRow}>
        {initials ? (
          <View style={styles.avatar} accessible={false} importantForAccessibility="no">
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
        ) : null}
        {onChangePhoto ? (
          <Pressable
            onPress={onChangePhoto}
            accessibilityRole="button"
            accessibilityLabel={changePhotoLabel}
            hitSlop={8}
            style={({ pressed }) => [styles.photoButton, pressed && styles.pressed]}
          >
            <Text style={styles.photoButtonText}>{changePhotoLabel}</Text>
          </Pressable>
        ) : null}
      </View>

      <View style={styles.form}>
        <AppInput
          label="Ad soyad"
          value={values.fullName || ''}
          onChangeText={onFieldChange ? (v) => onFieldChange('fullName', v) : undefined}
          placeholder="Adınız ve soyadınız"
          autoCapitalize="words"
          error={errors.fullName}
        />

        {/* E-posta — salt okunur; değişiklik ayrı Auth akışı */}
        <View>
          <Text style={styles.emailLabel}>E-posta</Text>
          <View style={styles.emailRow}>
            <View style={styles.emailValueWrap}>
              <Text style={styles.emailValue} numberOfLines={1}>
                {email || '—'}
              </Text>
            </View>
            {onRequestEmailChange ? (
              <Pressable
                onPress={isChangingEmail ? undefined : onRequestEmailChange}
                disabled={isChangingEmail}
                accessibilityRole="button"
                accessibilityLabel={`E-postayı değiştir (${email || ''})`}
                accessibilityState={{ disabled: isChangingEmail, busy: isChangingEmail }}
                hitSlop={8}
                style={({ pressed }) => [
                  styles.emailChangeButton,
                  isChangingEmail && styles.emailChangeDisabled,
                  pressed && !isChangingEmail && styles.pressed,
                ]}
              >
                {isChangingEmail ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : (
                  <Text style={styles.emailChangeText}>{emailChangeLabel}</Text>
                )}
              </Pressable>
            ) : null}
          </View>
          {emailChangePending ? (
            <View style={styles.emailPendingRow} accessibilityLiveRegion="polite">
              <Icon name="clock" size={13} color={colors.textSecondary} accessible={false} />
              <Text style={styles.emailPendingText}>{emailPendingInfo}</Text>
            </View>
          ) : (
            <Text style={styles.emailHint}>{emailHint}</Text>
          )}
        </View>

        <AppInput
          label="Telefon"
          value={values.phone || ''}
          onChangeText={onFieldChange ? (v) => onFieldChange('phone', v) : undefined}
          placeholder="05xx xxx xx xx"
          keyboardType="phone-pad"
          autoComplete="tel"
          error={errors.phone}
        />
        <AppInput
          label="Doğum tarihi"
          value={values.birthDate || ''}
          onChangeText={onFieldChange ? (v) => onFieldChange('birthDate', v) : undefined}
          placeholder="GG.AA.YYYY"
          error={errors.birthDate}
        />
      </View>

      <View style={styles.footer}>
        <AppButton variant="primary" label={saveLabel} loading={isSaving} onPress={onSave} />
        {onCancel ? (
          <AppButton
            variant="text"
            label={cancelLabel}
            onPress={onCancel}
            style={styles.cancel}
          />
        ) : null}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.x6 },
  avatarRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.x3 + 2, marginTop: spacing.x2 },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { ...typography.sectionTitle, color: colors.primaryDark },
  photoButton: { minHeight: 44, justifyContent: 'center' },
  photoButtonText: { ...typography.body, fontSize: 14, fontWeight: '600', color: colors.primary },
  form: { gap: spacing.x4 },
  emailLabel: { ...typography.supporting, fontWeight: '500', color: colors.textPrimary, marginBottom: spacing.x2 },
  emailRow: {
    minHeight: 52,
    borderRadius: 12,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: spacing.x4,
    paddingRight: spacing.x2,
  },
  emailValueWrap: { flex: 1, minWidth: 0 },
  emailValue: { ...typography.body, color: colors.textSecondary },
  emailChangeButton: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: spacing.x3,
  },
  emailChangeText: { ...typography.supporting, fontWeight: '600', color: colors.primary },
  emailChangeDisabled: { opacity: 0.6 },
  emailPendingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x1 + 2,
    marginTop: spacing.x2,
  },
  emailPendingText: { ...typography.supporting, color: colors.textSecondary, flexShrink: 1 },
  emailHint: { ...typography.caption, color: colors.textTertiary, marginTop: spacing.x1 },
  footer: { gap: spacing.x1 },
  cancel: { alignSelf: 'center' },
  pressed: { opacity: 0.8 },
});

export default PersonalInfoEditView;

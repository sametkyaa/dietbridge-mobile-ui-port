import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { AppButton, AppInput, AppScreen } from '../../components';
import { ProfileHeader } from './ProfileHeader';

/**
 * PersonalInfoEditView — ProfilDuzenleKisisel port'u: ad, e-posta, telefon,
 * doğum tarihi + avatar değiştirme.
 *
 * Controlled form: values { fullName, email, phone, birthDate } +
 * onFieldChange(key, value); errors { [key]: mesaj } alan bazlı hata.
 * Kaydetme mantığı host'ta; isSaving Kaydet butonunu spinner'a çevirir.
 */
export function PersonalInfoEditView({
  title = 'Kişisel bilgiler',
  values = {},
  errors = {},
  initials,
  isSaving = false,
  changePhotoLabel = 'Fotoğrafı değiştir',
  saveLabel = 'Kaydet',
  cancelLabel = 'Vazgeç',
  onFieldChange,
  onChangePhoto,
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
          error={errors.fullName}
        />
        <AppInput
          label="E-posta"
          value={values.email || ''}
          onChangeText={onFieldChange ? (v) => onFieldChange('email', v) : undefined}
          placeholder="ornek@eposta.com"
          keyboardType="email-address"
          error={errors.email}
          hint={errors.email ? undefined : 'Giriş için bu adres kullanılır.'}
        />
        <AppInput
          label="Telefon"
          value={values.phone || ''}
          onChangeText={onFieldChange ? (v) => onFieldChange('phone', v) : undefined}
          placeholder="05xx xxx xx xx"
          keyboardType="phone-pad"
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
  footer: { gap: spacing.x1 },
  cancel: { alignSelf: 'center' },
  pressed: { opacity: 0.8 },
});

export default PersonalInfoEditView;

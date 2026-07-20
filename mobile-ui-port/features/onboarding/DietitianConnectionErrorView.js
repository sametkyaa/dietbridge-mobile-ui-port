import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { AppButton, AppScreen, Icon } from '../../components';

/**
 * DietitianConnectionErrorView — BaglantiHatasi.tsx port'u.
 * Davet kodu doğrulanırken bağlantı hatası + tekrar deneme. Girilen kod
 * prop olarak gösterilir; düzeltme/tekrar mantığı host'ta kalır.
 */
export function DietitianConnectionErrorView({
  inviteCode,
  title = 'Bağlantı kurulamadı',
  description = 'Davet kodu doğrulanırken bir sorun oluştu. İnternet bağlantını kontrol edip tekrar deneyebilirsin.',
  isRetrying = false,
  onRetry,
  onEditCode,
}) {
  return (
    <AppScreen scroll contentStyle={styles.content}>
      <View style={styles.iconWrap} accessible={false} importantForAccessibility="no">
        <Icon name="wifiOff" size={30} color={colors.error} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{description}</Text>

      {inviteCode ? (
        <View style={styles.codeCard}>
          <Text style={styles.codeLabel}>Girilen kod</Text>
          <Text style={styles.codeValue}>{inviteCode}</Text>
        </View>
      ) : null}

      <View style={styles.spacer} />

      <AppButton
        variant="primary"
        label={isRetrying ? 'Tekrar deneniyor…' : 'Tekrar dene'}
        loading={isRetrying}
        onPress={onRetry}
        accessibilityLabel="Tekrar dene"
      />
      <Pressable
        onPress={onEditCode}
        accessibilityRole="button"
        accessibilityLabel="Kodu düzenle"
        hitSlop={8}
        style={({ pressed }) => [styles.edit, pressed && styles.pressed]}
      >
        <Text style={styles.editText}>Kodu düzenle</Text>
      </Pressable>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, paddingTop: spacing.x10 },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: radius.round,
    backgroundColor: colors.errorSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typography.sectionTitle,
    fontSize: 24,
    lineHeight: 30,
    color: colors.textPrimary,
    marginTop: spacing.x5,
  },
  subtitle: {
    ...typography.supporting,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
    marginTop: spacing.x2,
  },
  codeCard: {
    marginTop: spacing.x6,
    borderRadius: radius.control,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.surface,
    padding: spacing.x4,
  },
  codeLabel: { ...typography.caption, color: colors.textSecondary },
  codeValue: {
    ...typography.cardTitle,
    letterSpacing: 0.5,
    color: colors.textPrimary,
    marginTop: spacing.x1,
  },
  spacer: { flex: 1, minHeight: spacing.x6 },
  edit: {
    alignSelf: 'center',
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: spacing.x2,
    marginTop: spacing.x2,
  },
  editText: { ...typography.supporting, fontWeight: '600', color: colors.primary },
  pressed: { opacity: 0.6 },
});

export default DietitianConnectionErrorView;

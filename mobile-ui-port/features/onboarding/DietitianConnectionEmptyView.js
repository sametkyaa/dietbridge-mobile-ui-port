import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { AppButton, AppInput, AppScreen, Icon } from '../../components';

/**
 * DietitianConnectionEmptyView — BaglantiYok.tsx port'u.
 * Bağlantı yok: davet kodu girişi. Kod doğrulama mantığı YOK; controlled input.
 */
export function DietitianConnectionEmptyView({
  inviteCode = '',
  inviteCodeError,
  isSubmitting = false,
  onInviteCodeChange,
  onConnect,
}) {
  return (
    <AppScreen scroll contentStyle={styles.content}>
      <View style={styles.iconWrap} accessible={false} importantForAccessibility="no">
        <Text style={styles.iconGlyph}>🔗</Text>
      </View>
      <Text style={styles.title}>Diyetisyenine bağlan</Text>
      <Text style={styles.subtitle}>
        Diyetisyeninden aldığın davet kodunu gir; planını, öğünlerini ve mesajlarını tek yerde
        birleştir.
      </Text>

      <AppInput
        label="Davet kodu"
        value={inviteCode}
        onChangeText={onInviteCodeChange}
        error={inviteCodeError}
        placeholder="Örn. DB-4821"
        accessibilityLabel="Davet kodu"
        style={styles.field}
      />

      <View style={styles.spacer} />

      <AppButton
        variant="primary"
        label={isSubmitting ? 'Bağlanıyor…' : 'Bağlan'}
        loading={isSubmitting}
        onPress={onConnect}
        accessibilityLabel="Bağlan"
      />
      <Text style={styles.note}>
        Kodun yok mu? Diyetisyeninden davet kodu isteyebilirsin.
      </Text>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, paddingTop: spacing.x10 },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: radius.round,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGlyph: { fontSize: 30, lineHeight: 36 },
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
  field: { marginTop: spacing.x8 },
  spacer: { flex: 1, minHeight: spacing.x6 },
  note: {
    ...typography.supporting,
    color: colors.textTertiary,
    textAlign: 'center',
    marginTop: spacing.x4,
  },
});

export default DietitianConnectionEmptyView;

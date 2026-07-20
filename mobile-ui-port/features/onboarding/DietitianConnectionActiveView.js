import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { AppButton, AppCard, AppScreen, StatusBadge } from '../../components';

/**
 * DietitianConnectionActiveView — AktifBaglanti.tsx port'u.
 * Aktif bağlantı: diyetisyen profil kartı + mesaj aksiyonu + bilgi kartı.
 *
 * dietitian: { name, initials, specialty }
 */
export function DietitianConnectionActiveView({
  dietitian,
  title = 'Diyetisyenin',
  infoText = 'Haftalık planın diyetisyenin tarafından hazırlanır; değişikliklerde bildirim alırsın.',
  onSendMessage,
  onManageConnection,
}) {
  return (
    <AppScreen scroll contentStyle={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>
        Bağlantın aktif. Planın, öğünlerin ve mesajların artık tek yerde.
      </Text>

      {dietitian ? (
        <AppCard style={styles.profileCard} contentStyle={styles.profileCardContent}>
          <View style={styles.dietitianRow}>
            <View style={styles.avatar} accessible={false} importantForAccessibility="no">
              <Text style={styles.avatarText}>{dietitian.initials}</Text>
            </View>
            <View style={styles.dietitianText}>
              <Text style={styles.dietitianName} numberOfLines={1}>
                {dietitian.name}
              </Text>
              <Text style={styles.dietitianSpecialty} numberOfLines={1}>
                {dietitian.specialty}
              </Text>
              <StatusBadge status="connected" style={styles.badge} />
            </View>
          </View>
          <AppButton
            variant="primary"
            label="Mesaj gönder"
            onPress={onSendMessage}
            accessibilityLabel="Mesaj gönder"
            style={styles.messageButton}
          />
        </AppCard>
      ) : null}

      {infoText ? (
        <AppCard style={styles.infoCard}>
          <Text style={styles.infoText}>{infoText}</Text>
        </AppCard>
      ) : null}

      <View style={styles.spacer} />

      <Pressable
        onPress={onManageConnection}
        accessibilityRole="button"
        accessibilityLabel="Bağlantıyı yönet"
        hitSlop={8}
        style={({ pressed }) => [styles.manage, pressed && styles.pressed]}
      >
        <Text style={styles.manageText}>Bağlantıyı yönet</Text>
      </Pressable>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, paddingTop: spacing.x10 },
  title: {
    ...typography.sectionTitle,
    fontSize: 24,
    lineHeight: 30,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.supporting,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
    marginTop: spacing.x2,
  },
  profileCard: { marginTop: spacing.x6, borderRadius: radius.card + 2 },
  profileCardContent: { padding: spacing.x1 },
  dietitianRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.x3 + 2 },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { ...typography.cardTitle, color: colors.primaryDark },
  dietitianText: { flex: 1, minWidth: 0 },
  dietitianName: { ...typography.cardTitle, color: colors.textPrimary },
  dietitianSpecialty: { ...typography.supporting, color: colors.textSecondary, marginTop: 2 },
  badge: { marginTop: spacing.x2 },
  messageButton: { marginTop: spacing.x5 },
  infoCard: { marginTop: spacing.x4 },
  infoText: { ...typography.supporting, color: colors.textSecondary },
  spacer: { flex: 1, minHeight: spacing.x6 },
  manage: {
    alignSelf: 'center',
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: spacing.x2,
  },
  manageText: { ...typography.supporting, fontWeight: '600', color: colors.textSecondary },
  pressed: { opacity: 0.6 },
});

export default DietitianConnectionActiveView;

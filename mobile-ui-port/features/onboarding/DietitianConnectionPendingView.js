import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { AppButton, AppCard, AppScreen, StatusBadge } from '../../components';

/**
 * DietitianConnectionPendingView — DavetBekliyor.tsx port'u.
 * Davet iletildi, diyetisyenin onayı bekleniyor.
 *
 * dietitian: { name, initials, specialty }
 */
export function DietitianConnectionPendingView({
  dietitian,
  title = 'Davetin iletildi',
  onReviewProfile,
  onCancelInvite,
}) {
  return (
    <AppScreen scroll contentStyle={styles.content}>
      <View style={styles.iconWrap} accessible={false} importantForAccessibility="no">
        <Text style={styles.iconGlyph}>⏳</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>
        {dietitian ? `${dietitian.name} davetini onayladığında` : 'Diyetisyenin davetini onayladığında'}{' '}
        planın burada görünecek. Onaylandığında sana bildirim göndereceğiz.
      </Text>

      {dietitian ? (
        <AppCard style={styles.card}>
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
            </View>
            <StatusBadge status="waiting" label="Onay bekliyor" />
          </View>
        </AppCard>
      ) : null}

      <View style={styles.spacer} />

      <AppButton
        variant="secondary"
        label="Beklerken profilimi gözden geçir"
        onPress={onReviewProfile}
        accessibilityLabel="Beklerken profilimi gözden geçir"
      />
      <Pressable
        onPress={onCancelInvite}
        accessibilityRole="button"
        accessibilityLabel="Daveti iptal et"
        hitSlop={8}
        style={({ pressed }) => [styles.cancel, pressed && styles.pressed]}
      >
        <Text style={styles.cancelText}>Daveti iptal et</Text>
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
    backgroundColor: colors.tealSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGlyph: { fontSize: 28, lineHeight: 34 },
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
  card: { marginTop: spacing.x6 },
  dietitianRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.x3 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { ...typography.body, fontWeight: '600', color: colors.primaryDark },
  dietitianText: { flex: 1, minWidth: 0 },
  dietitianName: { ...typography.body, fontWeight: '600', color: colors.textPrimary },
  dietitianSpecialty: { ...typography.caption, color: colors.textSecondary },
  spacer: { flex: 1, minHeight: spacing.x6 },
  cancel: {
    alignSelf: 'center',
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: spacing.x2,
    marginTop: spacing.x2,
  },
  cancelText: { ...typography.supporting, fontWeight: '600', color: colors.textSecondary },
  pressed: { opacity: 0.6 },
});

export default DietitianConnectionPendingView;

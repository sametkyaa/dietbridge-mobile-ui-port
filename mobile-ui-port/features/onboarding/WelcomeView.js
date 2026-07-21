import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadows, spacing, typography } from '../../theme';
import { AppButton, AppScreen, Icon, StatusBadge } from '../../components';

/**
 * WelcomeView — Karsilama.tsx port'u. Değer önerisi + sade ürün önizlemesi +
 * birincil/ikincil CTA. Tüm dinamik içerik prop'larla gelir.
 *
 * nextMeal: { badgeLabel, timeLabel, title }  — ör. { badgeLabel: '45 dk sonra',
 *   timeLabel: '13:30 · Öğle', title: 'Izgara tavuklu Akdeniz salatası' }
 * dietitianTip: { initials, text }
 */
export function WelcomeView({
  nextMeal,
  dietitianTip,
  headline = 'Beslenme sürecin, diyetisyeninle aynı yerde.',
  description = 'Günlük planını takip et, öğünlerini ve su tüketimini kaydet, sorularını diyetisyenine tek yerden sor.',
  registerLabel = 'Hesap oluştur',
  loginLabel = 'Giriş yap',
  onRegister,
  onLogin,
}) {
  return (
    <AppScreen scroll contentStyle={styles.content}>
      {/* Sade ürün önizlemesi */}
      <View style={styles.preview}>
        <View style={styles.mealCard}>
          <View style={styles.mealCardHeader}>
            <Text style={styles.mealCardLabel}>Sıradaki öğün</Text>
            {nextMeal && nextMeal.badgeLabel ? (
              <StatusBadge status="upcoming" label={nextMeal.badgeLabel} />
            ) : null}
          </View>
          {nextMeal ? (
            <View style={styles.mealRow}>
              <View style={styles.mealIcon} accessible={false} importantForAccessibility="no">
                <Icon name="meal" size={22} color={colors.primaryDark} />
              </View>
              <View style={styles.mealText}>
                <View style={styles.mealTimeRow}>
                  <Icon name="clock" size={12} color={colors.textSecondary} accessible={false} />
                  <Text style={styles.mealTime}>{nextMeal.timeLabel}</Text>
                </View>
                <Text style={styles.mealTitle} numberOfLines={1}>
                  {nextMeal.title}
                </Text>
              </View>
            </View>
          ) : null}
        </View>
        {dietitianTip ? (
          <View style={styles.tipRow}>
            <View style={styles.avatar} accessible={false} importantForAccessibility="no">
              <Text style={styles.avatarText}>{dietitianTip.initials}</Text>
            </View>
            <Text style={styles.tipText} numberOfLines={2}>
              {`“${dietitianTip.text}”`}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.spacer} />

      <Text style={styles.headline}>{headline}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.ctas}>
        <AppButton
          variant="primary"
          label={registerLabel}
          onPress={onRegister}
          accessibilityLabel={registerLabel}
        />
        <AppButton
          variant="secondary"
          label={loginLabel}
          onPress={onLogin}
          accessibilityLabel={loginLabel}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, paddingTop: spacing.x4 },
  preview: {
    backgroundColor: colors.primarySurface,
    borderRadius: radius.sheet,
    padding: spacing.x4,
  },
  mealCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.x4,
    ...shadows.card,
  },
  mealCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mealCardLabel: { ...typography.caption, color: colors.textSecondary },
  mealRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.x3, marginTop: spacing.x2 },
  mealIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.small + 2,
    backgroundColor: colors.primarySurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealText: { flex: 1, minWidth: 0 },
  mealTimeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.x1 + 2 },
  mealTime: { ...typography.caption, color: colors.textSecondary },
  mealTitle: { ...typography.supporting, fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x2 + 2,
    backgroundColor: colors.surface,
    opacity: 0.95,
    borderRadius: radius.card,
    padding: spacing.x3,
    marginTop: spacing.x3,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { ...typography.caption, color: colors.primaryDark },
  tipText: { flex: 1, minWidth: 0, ...typography.caption, color: colors.textSecondary },
  spacer: { flex: 1, minHeight: spacing.x8 },
  headline: { ...typography.display, color: colors.textPrimary },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.x3,
  },
  ctas: { gap: spacing.x3, marginTop: spacing.x8 },
});

export default WelcomeView;

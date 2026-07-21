import React from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { AppCard, AppScreen, Icon } from '../../components';
import { ProfileHeader } from './ProfileHeader';

function ActionRow({ icon, label, description, onPress, destructive = false, isLast = false }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.row,
        !isLast && styles.rowBorder,
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[styles.iconWrap, destructive && styles.iconWrapDestructive]}
        accessible={false}
        importantForAccessibility="no"
      >
        <Icon name={icon} size={17} color={destructive ? colors.error : colors.textSecondary} />
      </View>
      <View style={styles.rowTextCol}>
        <Text style={[styles.rowLabel, destructive && styles.rowLabelDestructive]}>{label}</Text>
        {description ? <Text style={styles.rowDescription}>{description}</Text> : null}
      </View>
      {!destructive ? (
        <Icon name="chevronRight" size={17} color={colors.textTertiary} accessible={false} />
      ) : null}
    </Pressable>
  );
}

/**
 * PrivacySecurityView — GizlilikGuvenlik port'u: şifre, iki adımlı doğrulama,
 * oturumlar, veri indirme; hesap silme sakin ama net (dark pattern yok).
 *
 * Tüm aksiyonlar saf callback'tir; iki adımlı doğrulama controlled Switch'tir
 * (twoFactorEnabled + onToggleTwoFactor). Hesap silme destructive tonda.
 *
 * Görünürlük flag'leri: showTwoFactor / showSessions / showDataExport /
 * showDeleteAccount — varsayılan FALSE. Gerçek backend hazır olmayan özellik
 * satırları production'da GÖSTERİLMEMELİDİR; host bu flag'leri özellik
 * hazır olduğunda açar. Şifre değiştirme satırı her zaman görünür.
 */
export function PrivacySecurityView({
  title = 'Gizlilik ve güvenlik',
  securityLabel = 'Güvenlik',
  dataLabel = 'Verilerin',
  accountLabel = 'Hesap',
  twoFactorEnabled = false,
  twoFactorDescription = 'Girişte ek doğrulama kodu',
  sessionSummary,
  deleteDescription = 'Hesabın ve tüm verilerin kalıcı olarak silinir; bu işlem geri alınamaz.',
  showTwoFactor = false,
  showSessions = false,
  showDataExport = false,
  showDeleteAccount = false,
  onToggleTwoFactor,
  onChangePassword,
  onOpenSessions,
  onExportData,
  onDeleteAccount,
  onBack,
}) {
  return (
    <AppScreen
      scroll
      padTop
      header={<ProfileHeader title={title} onBack={onBack} />}
      contentStyle={styles.content}
    >
      <View>
        <Text style={styles.sectionTitle}>{securityLabel}</Text>
        <AppCard style={styles.card}>
          <ActionRow
            icon="key"
            label="Şifreyi değiştir"
            onPress={onChangePassword}
            isLast={!showTwoFactor && !showSessions}
          />
          {showTwoFactor ? (
            <View style={[styles.row, styles.rowBorder]}>
              <View style={styles.iconWrap} accessible={false} importantForAccessibility="no">
                <Icon name="shield" size={17} color={colors.textSecondary} />
              </View>
              <View style={styles.rowTextCol}>
                <Text style={styles.rowLabel}>İki adımlı doğrulama</Text>
                <Text style={styles.rowDescription}>{twoFactorDescription}</Text>
              </View>
              <Switch
                value={twoFactorEnabled}
                onValueChange={onToggleTwoFactor}
                trackColor={{ false: colors.borderSoft, true: colors.primarySoft }}
                thumbColor={twoFactorEnabled ? colors.primary : colors.white}
                ios_backgroundColor={colors.borderSoft}
                accessibilityLabel="İki adımlı doğrulama"
                accessibilityRole="switch"
                accessibilityState={{ checked: twoFactorEnabled }}
              />
            </View>
          ) : null}
          {showSessions ? (
            <ActionRow
              icon="devices"
              label="Açık oturumlar"
              description={sessionSummary}
              onPress={onOpenSessions}
              isLast
            />
          ) : null}
        </AppCard>
      </View>

      {showDataExport ? (
        <View>
          <Text style={styles.sectionTitle}>{dataLabel}</Text>
          <AppCard style={styles.card}>
            <ActionRow
              icon="download"
              label="Verilerimi indir"
              description="Tüm kayıtlarının bir kopyası"
              onPress={onExportData}
              isLast
            />
          </AppCard>
        </View>
      ) : null}

      {showDeleteAccount ? (
        <View>
          <Text style={styles.sectionTitle}>{accountLabel}</Text>
          <AppCard style={styles.card}>
            <ActionRow
              icon="trash"
              label="Hesabı sil"
              description={deleteDescription}
              onPress={onDeleteAccount}
              destructive
              isLast
            />
          </AppCard>
        </View>
      ) : null}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.x5 },
  sectionTitle: { ...typography.supporting, fontWeight: '500', color: colors.textSecondary, marginBottom: spacing.x2 },
  card: { padding: 0, overflow: 'hidden' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x3,
    paddingHorizontal: spacing.x4,
    paddingVertical: spacing.x3 + 2,
    minHeight: 44,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.borderSoft },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapDestructive: { backgroundColor: colors.errorSoft },
  rowTextCol: { flex: 1, minWidth: 0 },
  rowLabel: { ...typography.body, fontSize: 14, fontWeight: '500', color: colors.textPrimary },
  rowLabelDestructive: { color: colors.error },
  rowDescription: { ...typography.caption, fontWeight: '400', lineHeight: 16, color: colors.textTertiary, marginTop: 2 },
  pressed: { opacity: 0.8 },
});

export default PrivacySecurityView;

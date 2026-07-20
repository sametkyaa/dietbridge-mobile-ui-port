import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { AppButton, AppCard, AppScreen, AppSkeleton, Icon, StatusBadge } from '../../components';

function MenuRow({ section, onNavigate, isLast }) {
  return (
    <Pressable
      onPress={onNavigate ? () => onNavigate(section.key) : undefined}
      accessibilityRole="button"
      accessibilityLabel={
        section.value ? `${section.label}, ${section.value}` : section.label
      }
      style={({ pressed }) => [
        styles.menuRow,
        !isLast && styles.menuRowBorder,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.menuIconWrap} accessible={false} importantForAccessibility="no">
        <Icon name={section.icon} size={17} color={colors.textSecondary} />
      </View>
      <View style={styles.menuTextCol}>
        <Text style={styles.menuLabel}>{section.label}</Text>
        <Text style={styles.menuValue} numberOfLines={1}>
          {section.value || 'Eklenmedi'}
        </Text>
      </View>
      <Icon name="chevronRight" size={17} color={colors.textTertiary} accessible={false} />
    </Pressable>
  );
}

function ProfileSkeleton() {
  return (
    <View style={styles.skeletonWrap}>
      <AppSkeleton width={120} height={28} />
      <AppSkeleton height={170} borderRadius={18} style={styles.skeletonGap} />
      <AppSkeleton height={300} borderRadius={18} style={styles.skeletonGap} />
      <AppSkeleton height={60} borderRadius={18} style={styles.skeletonGap} />
    </View>
  );
}

/**
 * ProfileView — Profil port'u: kullanıcı özeti + diyetisyen bağlantısı +
 * bölüm menüsü + çıkış.
 *
 * Navigasyon deseni: TEK generic callback — onNavigate(sectionKey).
 * sections: [{ key, icon, label, value? }] — satırlar tamamen prop'tan gelir;
 * key'ler host'un route'larıyla eşlenir (örn. 'personal' | 'goal' |
 * 'lifestyle' | 'health' | 'notifications' | 'privacy').
 *
 * user: { name, email, initials }
 * dietitian: { name, initials } — opsiyonel; verilirse bağlantı satırı çizilir
 * Çıkış satırı destructive tonda (errorSoft ikon zemini + error metin),
 * onLogout callback'i host'un onay akışına bağlanır.
 */
export function ProfileView({
  title = 'Profil',
  status = 'ready',
  user,
  dietitian,
  dietitianBadgeLabel,
  editProfileLabel = 'Profili düzenle',
  sections = [],
  logoutLabel = 'Çıkış yap',
  onNavigate,
  onEditProfile,
  onLogout,
  onBack,
}) {
  if (status === 'loading') {
    return (
      <AppScreen padTop>
        <ProfileSkeleton />
      </AppScreen>
    );
  }

  return (
    <AppScreen scroll padTop contentStyle={styles.content}>
      <View style={styles.titleRow}>
        {onBack ? (
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Geri"
            hitSlop={8}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          >
            <Icon name="back" size={22} color={colors.textPrimary} />
          </Pressable>
        ) : null}
        <Text style={styles.title}>{title}</Text>
      </View>

      {user ? (
        <AppCard>
          <View style={styles.userRow}>
            <View style={styles.userAvatar} accessible={false} importantForAccessibility="no">
              <Text style={styles.userAvatarText}>{user.initials}</Text>
            </View>
            <View style={styles.userTextCol}>
              <Text style={styles.userName} numberOfLines={1}>
                {user.name}
              </Text>
              {user.email ? (
                <Text style={styles.userEmail} numberOfLines={1}>
                  {user.email}
                </Text>
              ) : null}
            </View>
          </View>

          {dietitian ? (
            <View style={styles.dietitianRow}>
              <View style={styles.dietitianAvatar} accessible={false} importantForAccessibility="no">
                <Text style={styles.dietitianAvatarText}>{dietitian.initials}</Text>
              </View>
              <Text style={styles.dietitianName} numberOfLines={1}>
                {dietitian.name}
              </Text>
              <StatusBadge status="connected" label={dietitianBadgeLabel} />
            </View>
          ) : null}

          {onEditProfile ? (
            <AppButton
              variant="secondary"
              label={editProfileLabel}
              onPress={onEditProfile}
              icon={<Icon name="edit" size={15} color={colors.primaryDark} accessible={false} />}
              style={styles.editButton}
            />
          ) : null}
        </AppCard>
      ) : null}

      {sections.length > 0 ? (
        <AppCard style={styles.menuCard}>
          {sections.map((s, i) => (
            <MenuRow
              key={s.key}
              section={s}
              onNavigate={onNavigate}
              isLast={i === sections.length - 1}
            />
          ))}
        </AppCard>
      ) : null}

      {onLogout ? (
        <AppCard style={styles.menuCard}>
          <Pressable
            onPress={onLogout}
            accessibilityRole="button"
            accessibilityLabel={logoutLabel}
            style={({ pressed }) => [styles.menuRow, pressed && styles.pressed]}
          >
            <View
              style={[styles.menuIconWrap, styles.logoutIconWrap]}
              accessible={false}
              importantForAccessibility="no"
            >
              <Icon name="logout" size={17} color={colors.error} />
            </View>
            <Text style={styles.logoutLabel}>{logoutLabel}</Text>
          </Pressable>
        </AppCard>
      ) : null}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.x5 },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -spacing.x2,
  },
  title: { ...typography.screenTitle, color: colors.textPrimary, marginTop: spacing.x2 },
  userRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.x3 + 2 },
  userAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatarText: { ...typography.sectionTitle, color: colors.primaryDark },
  userTextCol: { flex: 1, minWidth: 0 },
  userName: { ...typography.cardTitle, color: colors.textPrimary },
  userEmail: { ...typography.supporting, color: colors.textSecondary, marginTop: 2 },
  dietitianRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x2 + 2,
    borderTopWidth: 1,
    borderTopColor: colors.borderSoft,
    marginTop: spacing.x4,
    paddingTop: spacing.x3 + 2,
  },
  dietitianAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.tealSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dietitianAvatarText: { ...typography.caption, fontWeight: '600', color: colors.teal },
  dietitianName: { flex: 1, ...typography.supporting, fontWeight: '500', color: colors.textPrimary },
  editButton: { marginTop: spacing.x4, alignSelf: 'stretch' },
  menuCard: { padding: 0, overflow: 'hidden' },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x3,
    paddingHorizontal: spacing.x4,
    paddingVertical: spacing.x3 + 2,
    minHeight: 44,
  },
  menuRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.borderSoft },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTextCol: { flex: 1, minWidth: 0 },
  menuLabel: { ...typography.body, fontSize: 14, fontWeight: '500', color: colors.textPrimary },
  menuValue: { ...typography.caption, fontWeight: '400', color: colors.textTertiary, marginTop: 2 },
  logoutIconWrap: { backgroundColor: colors.errorSoft },
  logoutLabel: { flex: 1, ...typography.body, fontSize: 14, fontWeight: '600', color: colors.error },
  skeletonWrap: { paddingTop: spacing.x2 },
  skeletonGap: { marginTop: spacing.x4 },
  pressed: { opacity: 0.8 },
});

export default ProfileView;

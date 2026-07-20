import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { Icon } from '../../components';

/**
 * GreetingHeader — selamlama + tarih, sağda bildirim ve avatar düğmeleri.
 * Tüm metinler prop'tan gelir; bildirimde okunmamış noktası opsiyoneldir.
 */
export function GreetingHeader({
  greeting,
  dateLabel,
  initials,
  hasUnreadNotifications = false,
  onNotificationPress,
  onAvatarPress,
  style,
}) {
  return (
    <View style={[styles.row, style]}>
      <View style={styles.textWrap}>
        <Text style={styles.greeting} numberOfLines={1}>
          {greeting}
        </Text>
        {dateLabel ? <Text style={styles.date}>{dateLabel}</Text> : null}
      </View>
      <View style={styles.actions}>
        {onNotificationPress ? (
          <Pressable
            onPress={onNotificationPress}
            accessibilityRole="button"
            accessibilityLabel="Bildirimler"
            hitSlop={4}
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          >
            <Icon name="bell" size={21} color={colors.textPrimary} />
            {hasUnreadNotifications ? (
              <View style={styles.dot} accessible={false} importantForAccessibility="no" />
            ) : null}
          </Pressable>
        ) : null}
        {onAvatarPress ? (
          <Pressable
            onPress={onAvatarPress}
            accessibilityRole="button"
            accessibilityLabel="Profil"
            hitSlop={4}
            style={({ pressed }) => [styles.avatarButton, pressed && styles.pressed]}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  textWrap: { flex: 1, flexShrink: 1, gap: 2 },
  greeting: { ...typography.screenTitle, fontSize: 24, lineHeight: 30, color: colors.textPrimary },
  date: { ...typography.supporting, color: colors.textSecondary },
  actions: { flexDirection: 'row', alignItems: 'center', gap: spacing.x1 },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    right: 11,
    top: 11,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.background,
  },
  avatarButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { ...typography.caption, fontSize: 13, fontWeight: '600', color: colors.primaryDark },
  pressed: { opacity: 0.8 },
});

export default GreetingHeader;

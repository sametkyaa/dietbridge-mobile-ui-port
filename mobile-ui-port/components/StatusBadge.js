import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';
import Icon from './Icon';

// Tasarım sistemi §5.4: pill form, ikon + metin birlikte (yalnız renkle anlatım yok).
const STATUSES = {
  completed: { bg: colors.primarySoft, fg: colors.success, icon: 'check', label: 'Tamamlandı' },
  upcoming: { bg: colors.tealSoft, fg: colors.teal, icon: 'clock', label: 'Sıradaki' },
  waiting: { bg: colors.surfaceMuted, fg: colors.textSecondary, icon: 'hourglass', label: 'Bekliyor' },
  delayed: { bg: '#F7EDDD', fg: colors.warning, icon: 'alert', label: 'Gecikti' },
  connected: { bg: colors.primarySoft, fg: colors.success, icon: 'check', label: 'Bağlı' },
  info: { bg: colors.tealSoft, fg: colors.info, icon: 'info', label: 'Bilgi' },
};

/**
 * StatusBadge — completed | upcoming | waiting | delayed | connected | info.
 * Türkçe varsayılan etiketler `label` prop'u ile geçersiz kılınabilir.
 */
export function StatusBadge({ status = 'info', label, style }) {
  const s = STATUSES[status] || STATUSES.info;
  return (
    <View
      style={[styles.badge, { backgroundColor: s.bg }, style]}
      accessibilityLabel={label || s.label}
      accessibilityRole="text"
    >
      <Icon name={s.icon} size={11} color={s.fg} accessible={false} />
      <Text style={[styles.label, { color: s.fg }]}>{label || s.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.x1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  label: { ...typography.caption, fontSize: 11, fontWeight: '600' },
});

export default StatusBadge;

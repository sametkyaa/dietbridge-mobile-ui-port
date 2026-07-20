import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { AppCard, AppScreen } from '../../components';
import { ProfileHeader } from './ProfileHeader';

/**
 * NotificationSettingsView — BildirimAyarlari port'u: açıklamalı tercih
 * anahtarları (react-native core Switch; dark pattern yok).
 *
 * sections: [{ key, title?, items: [{ key, label, description }] }]
 * values: { [itemKey]: boolean } — controlled; onToggle(key) host state'ini
 * günceller. Anahtarlar her an kapatılabilir.
 */
export function NotificationSettingsView({
  title = 'Bildirimler',
  description = 'Hangi konularda hatırlatma almak istediğini seç. Hepsini istediğin zaman kapatabilirsin.',
  sections = [],
  values = {},
  onToggle,
  onBack,
}) {
  return (
    <AppScreen
      scroll
      padTop
      header={<ProfileHeader title={title} onBack={onBack} />}
      contentStyle={styles.content}
    >
      {description ? <Text style={styles.description}>{description}</Text> : null}

      {sections.map((section) => (
        <View key={section.key}>
          {section.title ? <Text style={styles.sectionTitle}>{section.title}</Text> : null}
          <AppCard style={styles.card}>
            {section.items.map((item, i) => {
              const on = !!values[item.key];
              return (
                <View key={item.key} style={[styles.row, i > 0 && styles.rowBorder]}>
                  <View style={styles.rowTextCol}>
                    <Text style={styles.rowLabel}>{item.label}</Text>
                    {item.description ? (
                      <Text style={styles.rowDescription}>{item.description}</Text>
                    ) : null}
                  </View>
                  <Switch
                    value={on}
                    onValueChange={onToggle ? () => onToggle(item.key) : undefined}
                    trackColor={{ false: colors.borderSoft, true: colors.primarySoft }}
                    thumbColor={on ? colors.primary : colors.white}
                    ios_backgroundColor={colors.borderSoft}
                    accessibilityLabel={item.label}
                    accessibilityRole="switch"
                    accessibilityState={{ checked: on }}
                  />
                </View>
              );
            })}
          </AppCard>
        </View>
      ))}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.x5 },
  description: { ...typography.body, fontSize: 14, lineHeight: 21, color: colors.textSecondary },
  sectionTitle: { ...typography.supporting, fontWeight: '500', color: colors.textSecondary, marginBottom: spacing.x2 },
  card: { padding: 0, overflow: 'hidden' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x3,
    paddingHorizontal: spacing.x4,
    paddingVertical: spacing.x4,
    minHeight: 44,
  },
  rowBorder: { borderTopWidth: 1, borderTopColor: colors.borderSoft },
  rowTextCol: { flex: 1, minWidth: 0 },
  rowLabel: { ...typography.body, fontSize: 14, fontWeight: '500', color: colors.textPrimary },
  rowDescription: { ...typography.caption, fontWeight: '400', lineHeight: 17, color: colors.textTertiary, marginTop: 2 },
});

export default NotificationSettingsView;

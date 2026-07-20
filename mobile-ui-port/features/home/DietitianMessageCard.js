import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { AppButton, AppCard } from '../../components';

/**
 * DietitianMessageCard — diyetisyenin son mesajı + yanıtla aksiyonu.
 * message: { name, initials, metaLabel, text } — tamamı prop'tan gelir.
 */
export function DietitianMessageCard({ message, replyLabel = 'Yanıtla', onReply, style }) {
  if (!message) return null;
  return (
    <AppCard style={style}>
      <View style={styles.header}>
        <View style={styles.avatar} accessible={false} importantForAccessibility="no">
          <Text style={styles.avatarText}>{message.initials}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.name} numberOfLines={1}>
            {message.name}
          </Text>
          {message.metaLabel ? (
            <Text style={styles.meta} numberOfLines={1}>
              {message.metaLabel}
            </Text>
          ) : null}
        </View>
      </View>
      <Text style={styles.body}>{message.text}</Text>
      {onReply ? (
        <AppButton
          variant="text"
          label={replyLabel}
          onPress={onReply}
          style={styles.reply}
        />
      ) : null}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.x3 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { ...typography.body, fontWeight: '600', color: colors.primaryDark },
  headerText: { flex: 1, minWidth: 0 },
  name: { ...typography.supporting, fontWeight: '600', color: colors.textPrimary },
  meta: { ...typography.caption, color: colors.textTertiary },
  body: {
    ...typography.supporting,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textPrimary,
    marginTop: spacing.x3,
  },
  reply: { marginTop: spacing.x1 },
});

export default DietitianMessageCard;

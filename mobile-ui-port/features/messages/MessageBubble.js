import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { Icon } from '../../components';
import { FailedMessageState } from './FailedMessageState';
import { ImageMessagePreview } from './ImageMessagePreview';

const TICK_META = {
  sending: { icon: 'clock', label: 'Gönderiliyor' },
  sent: { icon: 'check', label: 'Gönderildi' },
  read: { icon: 'checkDouble', label: 'Okundu' },
};

/**
 * MessageBubble — tekil sohbet balonu (kendi / karşı taraf varyantları).
 *
 * message: {
 *   id, from: 'me' | 'other',
 *   text?, imageUri?, caption?, timeLabel,
 *   status?: 'sending' | 'sent' | 'read' | 'failed'   (yalnız 'me' için)
 * }
 * failed durumunda balon altında FailedMessageState gösterilir (onRetry /
 * onDelete callback'leri).
 */
export function MessageBubble({ message, onRetry, onDelete, style }) {
  const own = message.from === 'me';
  const failed = own && message.status === 'failed';
  const tick = own && !failed ? TICK_META[message.status] : null;

  return (
    <View style={[styles.root, own ? styles.rootOwn : styles.rootOther, style]}>
      <View
        style={[
          styles.bubble,
          own ? styles.bubbleOwn : styles.bubbleOther,
          failed && styles.bubbleFailed,
        ]}
        accessibilityLabel={
          failed ? `${message.text || 'Görsel mesajı'} — gönderilemedi` : undefined
        }
      >
        {message.imageUri ? (
          <ImageMessagePreview uri={message.imageUri} caption={message.caption} from={message.from} />
        ) : null}
        {message.text ? (
          <Text style={[styles.text, own ? styles.textOwn : styles.textOther]}>{message.text}</Text>
        ) : null}
        <View style={styles.metaRow}>
          {message.timeLabel ? (
            <Text style={[styles.time, own ? styles.timeOwn : styles.timeOther]}>
              {message.timeLabel}
            </Text>
          ) : null}
          {tick ? (
            <View
              accessible
              accessibilityLabel={tick.label}
              accessibilityRole="text"
            >
              <Icon name={tick.icon} size={12} color={colors.white} accessible={false} />
            </View>
          ) : null}
        </View>
      </View>
      {failed ? (
        <FailedMessageState
          onRetry={onRetry ? () => onRetry(message) : undefined}
          onDelete={onDelete ? () => onDelete(message) : undefined}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { maxWidth: '78%' },
  rootOwn: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  rootOther: { alignSelf: 'flex-start', alignItems: 'flex-start' },
  bubble: {
    borderRadius: radius.card,
    paddingHorizontal: spacing.x3 + 2,
    paddingVertical: spacing.x2 + 2,
  },
  bubbleOwn: { backgroundColor: colors.primary, borderBottomRightRadius: 6 },
  bubbleOther: { backgroundColor: colors.surfaceMuted, borderBottomLeftRadius: 6 },
  bubbleFailed: { borderWidth: 1, borderColor: colors.error, opacity: 0.9 },
  text: { ...typography.body, fontSize: 14, lineHeight: 20 },
  textOwn: { color: colors.white },
  textOther: { color: colors.textPrimary },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing.x1,
    marginTop: spacing.x1,
  },
  time: { ...typography.caption, fontSize: 10, fontWeight: '400' },
  timeOwn: { color: colors.white, opacity: 0.85 },
  timeOther: { color: colors.textTertiary },
});

export default MessageBubble;

import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { AppScreen, Icon } from '../../components';
import { MessageBubble } from './MessageBubble';
import { MessageComposer } from './MessageComposer';

function ChatHeader({ conversation, onBack }) {
  const { name, initials, statusLabel, online } = conversation;
  return (
    <View style={styles.header}>
      <Pressable
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel="Geri"
        hitSlop={8}
        style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
      >
        <Icon name="back" size={22} color={colors.textPrimary} />
      </Pressable>
      <View style={styles.avatar} accessible={false} importantForAccessibility="no">
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
      <View style={styles.headerTextCol}>
        <Text style={styles.headerName} numberOfLines={1}>
          {name}
        </Text>
        {statusLabel ? (
          <View style={styles.statusRow}>
            <View
              style={[styles.statusDot, online ? styles.dotOnline : styles.dotOffline]}
              accessible={false}
              importantForAccessibility="no"
            />
            <Text style={styles.statusText}>{statusLabel}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

/**
 * ChatView — Sohbet port'u: başlık (diyetisyen adı/avatar/çevrimiçi durumu),
 * ters FlatList mesaj akışı, altta composer.
 *
 * SAF UI: realtime, gönderme servisi, görsel seçici entegrasyonu YOK.
 *
 * conversation: { name, initials, statusLabel?, online? }
 * messages: [{ id, from: 'me'|'other', text?, imageUri?, caption?, timeLabel,
 *              status?, dateLabel? }] — eski → yeni sırayla verilir; liste
 *              ters çevrilerek render edilir. dateLabel verilen mesajın
 *              üstünde tarih ayırıcı gösterilir.
 * composerValue + onComposerChange: controlled composer metni.
 * onRetryMessage(message): başarısız mesajın "Tekrar dene" aksiyonu.
 * onPickImage: composer'daki görsel düğmesi.
 */
export function ChatView({
  conversation,
  messages = [],
  composerValue = '',
  isSending = false,
  composerPlaceholder,
  onBack,
  onComposerChange,
  onSend,
  onRetryMessage,
  onDeleteMessage,
  onPickImage,
}) {
  // inverted FlatList için yeni → eski sıralaması
  const data = [...messages].reverse();

  return (
    <AppScreen
      padTop
      header={<ChatHeader conversation={conversation} onBack={onBack} />}
      contentStyle={styles.content}
    >
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        inverted
        showsVerticalScrollIndicator={false}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.messageWrap}>
            {item.dateLabel ? (
              <View style={styles.dateRow}>
                <Text style={styles.datePill}>{item.dateLabel}</Text>
              </View>
            ) : null}
            <MessageBubble
              message={item}
              onRetry={onRetryMessage}
              onDelete={onDeleteMessage}
            />
          </View>
        )}
      />
      <MessageComposer
        value={composerValue}
        onChangeText={onComposerChange}
        onSend={onSend}
        onPickImage={onPickImage}
        isSending={isSending}
        placeholder={composerPlaceholder}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x2,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.x3,
    paddingVertical: spacing.x2,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -spacing.x2,
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
  headerTextCol: { flex: 1, minWidth: 0 },
  headerName: { ...typography.body, fontWeight: '600', color: colors.textPrimary },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.x1 + 2, marginTop: 1 },
  statusDot: { width: 7, height: 7, borderRadius: 4 },
  dotOnline: { backgroundColor: colors.success },
  dotOffline: { backgroundColor: colors.textTertiary },
  statusText: { ...typography.caption, fontWeight: '400', color: colors.textSecondary },
  content: { paddingHorizontal: 0, paddingBottom: 0 },
  list: { flex: 1 },
  listContent: { paddingHorizontal: spacing.x4, paddingVertical: spacing.x4 },
  messageWrap: { marginBottom: spacing.x3 },
  dateRow: { alignItems: 'center', marginBottom: spacing.x3 },
  datePill: {
    ...typography.caption,
    fontSize: 11,
    color: colors.textSecondary,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.round,
    paddingHorizontal: spacing.x3,
    paddingVertical: spacing.x1,
    overflow: 'hidden',
  },
  pressed: { opacity: 0.6 },
});

export default ChatView;

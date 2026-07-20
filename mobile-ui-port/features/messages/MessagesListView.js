import React from 'react';
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { AppCard, AppScreen, AppSkeleton, Icon } from '../../components';
import { FullScreenErrorView } from '../status';
import { EmptyMessagesView } from './EmptyMessagesView';

function ConversationRow({ conversation, onPress }) {
  const { name, initials, lastMessage, timeLabel, unreadCount = 0 } = conversation;
  return (
    <AppCard
      onPress={onPress ? () => onPress(conversation) : undefined}
      accessibilityLabel={
        unreadCount > 0 ? `${name}, ${unreadCount} okunmamış mesaj` : name
      }
    >
      <View style={styles.row}>
        <View style={styles.avatar} accessible={false} importantForAccessibility="no">
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.textCol}>
          <View style={styles.topLine}>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>
            {timeLabel ? <Text style={styles.time}>{timeLabel}</Text> : null}
          </View>
          <View style={styles.bottomLine}>
            <Text style={styles.lastMessage} numberOfLines={1}>
              {lastMessage}
            </Text>
            {unreadCount > 0 ? (
              <View
                style={styles.unreadBadge}
                accessibilityLabel={`${unreadCount} okunmamış mesaj`}
              >
                <Text style={styles.unreadText}>{unreadCount}</Text>
              </View>
            ) : null}
          </View>
        </View>
        <Icon name="chevronRight" size={18} color={colors.textTertiary} accessible={false} />
      </View>
    </AppCard>
  );
}

function ListSkeleton() {
  return (
    <View style={styles.skeletonWrap}>
      <AppSkeleton width={140} height={28} />
      {[0, 1, 2].map((i) => (
        <AppSkeleton key={i} height={84} borderRadius={18} style={styles.skeletonGap} />
      ))}
    </View>
  );
}

/**
 * MessagesListView — Mesajlar port'u: konuşma listesi (avatar, ad, son mesaj,
 * saat, okunmamış rozeti). Okunmamış bilgisi rozet metni + erişilebilirlik
 * etiketiyle verilir (yalnız renkle anlatım yok).
 *
 * status: 'loading' | 'ready' | 'empty' | 'error'
 * conversations: [{ id, name, initials, lastMessage, timeLabel, unreadCount }]
 *
 * onBack: host navigasyonuna ayrılmıştır; verilirse başlık yanında geri
 * düğmesi çizilir (sekme kökünde verilmez).
 */
export function MessagesListView({
  title = 'Mesajlar',
  status = 'ready',
  conversations = [],
  footerNote = 'Diyetisyeninle olan konuşman burada listelenir.',
  onConversationPress,
  onRetry,
  onRefresh,
  refreshing = false,
  onBack,
  onConnectDietitian,
}) {
  if (status === 'loading') {
    return (
      <AppScreen padTop>
        <ListSkeleton />
      </AppScreen>
    );
  }

  if (status === 'error') {
    return (
      <AppScreen padTop>
        <FullScreenErrorView variant="generic" onRetry={onRetry} onBack={onBack} />
      </AppScreen>
    );
  }

  const headerTitle = (
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
  );

  if (status === 'empty' || conversations.length === 0) {
    return (
      <AppScreen padTop>
        {headerTitle}
        <EmptyMessagesView onAction={onConnectDietitian} style={styles.empty} />
      </AppScreen>
    );
  }

  return (
    <AppScreen padTop>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={headerTitle}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          ) : undefined
        }
        renderItem={({ item }) => (
          <ConversationRow conversation={item} onPress={onConversationPress} />
        )}
        ListFooterComponent={
          footerNote ? <Text style={styles.footerNote}>{footerNote}</Text> : null
        }
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  titleRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.x2, marginBottom: spacing.x5 },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -spacing.x2,
    marginTop: -spacing.x2,
    marginBottom: -spacing.x2,
  },
  title: { ...typography.screenTitle, color: colors.textPrimary },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.x3 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { ...typography.body, fontWeight: '600', color: colors.primaryDark },
  textCol: { flex: 1, minWidth: 0 },
  topLine: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: spacing.x2 },
  name: { flex: 1, ...typography.body, fontWeight: '600', color: colors.textPrimary },
  time: { ...typography.caption, fontSize: 11, color: colors.textTertiary },
  bottomLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.x2, marginTop: spacing.x1 },
  lastMessage: { flex: 1, ...typography.supporting, color: colors.textSecondary },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadText: { ...typography.caption, fontSize: 11, fontWeight: '600', color: colors.white },
  separator: { height: spacing.x3 },
  listContent: { paddingBottom: spacing.x6 },
  footerNote: {
    ...typography.caption,
    fontWeight: '400',
    lineHeight: 17,
    color: colors.textTertiary,
    textAlign: 'center',
    marginTop: spacing.x4,
  },
  empty: { flex: 1 },
  skeletonWrap: { paddingTop: spacing.x2 },
  skeletonGap: { marginTop: spacing.x4 },
  pressed: { opacity: 0.6 },
});

export default MessagesListView;

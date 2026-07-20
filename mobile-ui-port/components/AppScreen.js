import React from 'react';
import { Platform, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../theme';

/**
 * AppScreen — bağımsız (dependency-free) ekran sarmalayıcı.
 *
 * Props:
 * - scroll: true ise içerik ScrollView ile sarılır (keyboardShouldPersistTaps="handled")
 * - header: opsiyonel üst bölüm node'u (scroll dışında sabit kalır)
 * - contentStyle: içerik kapsayıcısına ek stil
 * - style: kök View'e ek stil
 * - padTop: true ise Android'de StatusBar yüksekliği kadar üst boşluk bırakır
 * - edges: { top, bottom } sayısal ek padding (safe-area benzeri, harici insets ile beslenebilir)
 * - refreshControl: scroll=true iken ScrollView'e olduğu gibi iletilir (RefreshControl)
 */
export function AppScreen({
  children,
  scroll = false,
  header = null,
  contentStyle,
  style,
  padTop = false,
  edges,
  backgroundColor = colors.background,
  refreshControl = null,
}) {
  const topPad = (padTop && Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0)
    + (edges && typeof edges.top === 'number' ? edges.top : 0);
  const bottomPad = edges && typeof edges.bottom === 'number' ? edges.bottom : 0;

  const content = scroll ? (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingBottom: spacing.x6 + bottomPad },
        contentStyle,
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      refreshControl={refreshControl}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.flex, styles.scrollContent, { paddingBottom: bottomPad }, contentStyle]}>
      {children}
    </View>
  );

  return (
    <View style={[styles.root, { backgroundColor, paddingTop: topPad }, style]}>
      <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} />
      {header}
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  flex: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.x5 },
});

export default AppScreen;

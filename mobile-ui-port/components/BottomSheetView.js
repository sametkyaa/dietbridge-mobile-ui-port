import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { colors, radius, shadows, spacing, typography } from '../theme';

/**
 * BottomSheetView — UI-only sheet (react-native core Modal, gesture library yok).
 *
 * - Backdrop basışı onClose'u çağırır; üst köşeler radius.sheet; drag handle 36×4.
 * - maxHeight: sheet'in azami yüksekliği (varsayılan ekranın ~%90'ı).
 * - bottomInset: host'un safe-area alt boşluğu; sheet padding'ine eklenir.
 * - scrollable: true ise içerik ScrollView'a sarılır (uzun formlar için).
 * - keyboardAvoiding: true ise (varsayılan) KeyboardAvoidingView ile sarılır;
 *   footer klavye arkasında kalmaz. keyboardVerticalOffset ile ince ayar yapılır.
 * - Android onRequestClose ve backdrop kapatma davranışı korunur.
 */
export function BottomSheetView({
  visible,
  onClose,
  title,
  children,
  footer,
  contentStyle,
  maxHeight,
  bottomInset = 0,
  keyboardVerticalOffset = 0,
  scrollable = false,
  keyboardAvoiding = true,
}) {
  const { height: windowHeight } = useWindowDimensions();
  const resolvedMaxHeight = maxHeight ?? Math.round(windowHeight * 0.9);

  const body = scrollable ? (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[styles.content, contentStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, contentStyle]}>{children}</View>
  );

  const sheet = (
    <View
      style={[
        styles.sheet,
        { maxHeight: resolvedMaxHeight, paddingBottom: spacing.x6 + bottomInset },
      ]}
    >
      <View style={styles.handle} accessible={false} importantForAccessibility="no" />
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {body}
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}
        enabled={keyboardAvoiding}
        style={styles.flex}
      >
        <View style={styles.overlay}>
          <Pressable
            style={styles.backdrop}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Kapat"
          />
          {sheet}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(30, 40, 32, 0.4)',
    justifyContent: 'flex-end',
  },
  backdrop: { flex: 1 },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.sheet,
    borderTopRightRadius: radius.sheet,
    paddingHorizontal: spacing.x5,
    paddingTop: spacing.x3,
    flexShrink: 1,
    ...shadows.sheet,
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.borderSoft,
    marginBottom: spacing.x4,
  },
  title: {
    ...typography.sectionTitle,
    color: colors.textPrimary,
    marginBottom: spacing.x3,
  },
  scroll: { flexShrink: 1 },
  content: { gap: spacing.x3 },
  footer: { marginTop: spacing.x4, gap: spacing.x2 },
});

export default BottomSheetView;

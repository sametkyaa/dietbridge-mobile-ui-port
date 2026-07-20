import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadows, spacing, typography } from '../theme';

/**
 * BottomSheetView — UI-only sheet (react-native core Modal, gesture library yok).
 * Backdrop basışı onClose'u çağırır; üst köşeler radius.sheet; drag handle 36×4.
 */
export function BottomSheetView({ visible, onClose, title, children, footer, contentStyle }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Pressable
          style={styles.backdrop}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Kapat"
        />
        <View style={styles.sheet}>
          <View style={styles.handle} accessible={false} importantForAccessibility="no" />
          {title ? <Text style={styles.title}>{title}</Text> : null}
          <View style={[styles.content, contentStyle]}>{children}</View>
          {footer ? <View style={styles.footer}>{footer}</View> : null}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    paddingBottom: spacing.x6,
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
  content: { gap: spacing.x3 },
  footer: { marginTop: spacing.x4, gap: spacing.x2 },
});

export default BottomSheetView;

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { AppButton, Icon } from '../../components';

const VARIANTS = {
  offline: {
    icon: 'wifiOff',
    title: 'Bağlantı yok',
    description: 'İnternet bağlantını kontrol et. Bağlandığında içerik kendiliğinden yenilenir.',
  },
  server: {
    icon: 'alert',
    title: 'Bir şeyler ters gitti',
    description: 'İsteğin şu an işlenemedi; bu senden kaynaklanmıyor. Biraz sonra tekrar deneyebilirsin.',
  },
  generic: {
    icon: 'alert',
    title: 'Bir sorun oluştu',
    description: 'İçerik şu an gösterilemiyor. Tekrar deneyebilirsin.',
  },
};

/**
 * FullScreenErrorView — tam ekran hata durumu (DurumBaglantiHatasi /
 * DurumSunucuHatasi port'u). Ekran gerçekten kullanılamadığında kullanılır;
 * kısmi hatalar için InlineAlert tercih edilir. Teknik hata kodu GÖSTERİLMEZ.
 *
 * variant: 'offline' | 'server' | 'generic' — title/description prop'ları
 * varsayılan metinleri geçersiz kılar.
 */
export function FullScreenErrorView({
  variant = 'generic',
  title,
  description,
  retryLabel = 'Tekrar dene',
  backLabel = 'Geri dön',
  onRetry,
  onBack,
  style,
}) {
  const v = VARIANTS[variant] || VARIANTS.generic;
  return (
    <View style={[styles.root, style]}>
      <View style={styles.iconWrap} accessible={false} importantForAccessibility="no">
        <Icon name={v.icon} size={26} color={colors.textSecondary} />
      </View>
      <Text style={styles.title}>{title || v.title}</Text>
      <Text style={styles.description}>{description || v.description}</Text>
      {onRetry ? (
        <AppButton
          variant="primary"
          label={retryLabel}
          onPress={onRetry}
          style={styles.action}
        />
      ) : null}
      {onBack ? (
        <AppButton variant="text" label={backLabel} onPress={onBack} style={styles.backAction} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.x6,
    paddingVertical: spacing.x8,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.x4,
  },
  title: { ...typography.body, fontWeight: '600', color: colors.textPrimary, textAlign: 'center' },
  description: {
    ...typography.supporting,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.x1 + 2,
    maxWidth: 280,
  },
  action: { marginTop: spacing.x4, alignSelf: 'stretch' },
  backAction: { alignSelf: 'center' },
});

export default FullScreenErrorView;

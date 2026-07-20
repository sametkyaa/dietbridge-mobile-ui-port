import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';

/**
 * ImageMessagePreview — sohbet içi görsel balonu: Image + opsiyonel alt yazı.
 * uri host tarafından sağlanır (picker/upload entegrasyonu bu dosyada yok).
 * from: 'me' | 'other' — alt yazı rengi balon tonuna göre seçilir.
 */
export function ImageMessagePreview({ uri, caption, from = 'other', style }) {
  const own = from === 'me';
  return (
    <View style={style}>
      <Image
        source={{ uri }}
        style={styles.image}
        accessibilityLabel={caption || 'Görsel mesajı'}
      />
      {caption ? (
        <Text style={[styles.caption, own ? styles.captionOwn : styles.captionOther]}>
          {caption}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 220,
    aspectRatio: 4 / 3,
    borderRadius: radius.control,
    backgroundColor: colors.surfaceMuted,
  },
  caption: { ...typography.body, fontSize: 14, lineHeight: 20, marginTop: spacing.x2 },
  captionOwn: { color: colors.white },
  captionOther: { color: colors.textPrimary },
});

export default ImageMessagePreview;

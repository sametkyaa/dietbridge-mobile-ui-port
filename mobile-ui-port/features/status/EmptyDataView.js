import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '../../theme';
import { EmptyState } from '../../components';

/**
 * EmptyDataView — genel boş veri durumu (DurumBosVeri port'u): sade ikon +
 * tek cümle açıklama + varsa tek aksiyon. Paylaşılan EmptyState'i sarar ve
 * dikey olarak ortalar.
 */
export function EmptyDataView({
  icon = 'info',
  title = 'Burada gösterilecek bir kayıt yok',
  description = 'Yeni içerik eklendiğinde bu alanda listelenecek.',
  actionLabel,
  onAction,
  style,
}) {
  return (
    <View style={[styles.root, style]}>
      <EmptyState
        icon={icon}
        title={title}
        description={description}
        actionLabel={actionLabel}
        onAction={onAction}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.x6,
  },
});

export default EmptyDataView;

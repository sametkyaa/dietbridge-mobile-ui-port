import React from 'react';
import { StyleSheet } from 'react-native';
import { radius } from '../../theme';
import { AppCard, EmptyState } from '../../components';

/**
 * HomeEmptyState — aktif beslenme planı yok: anlamlı boş durum + tek CTA.
 * (Su takibi kartı bu durumda da kullanılabilir kalır; HomeView render eder.)
 */
export function HomeEmptyState({
  title = 'Henüz aktif bir beslenme planın yok',
  description = 'Diyetisyenin planını oluşturduğunda öğünlerin burada listelenecek. Bu arada su tüketimini takip edebilirsin.',
  actionLabel = 'Diyetisyenine mesaj gönder',
  onAction,
  style,
}) {
  return (
    <AppCard style={[styles.card, style]}>
      <EmptyState
        icon="calendar"
        title={title}
        description={description}
        actionLabel={onAction ? actionLabel : undefined}
        onAction={onAction}
      />
    </AppCard>
  );
}

const styles = StyleSheet.create({ card: { borderRadius: radius.hero, padding: 0 } });

export default HomeEmptyState;

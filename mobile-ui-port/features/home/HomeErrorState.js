import React from 'react';
import { ErrorState } from '../../components';

/**
 * HomeErrorState — Ana Sayfa verisi hiç yüklenemediğinde tam ekran hata.
 * Teknik hata kodu gösterilmez; onRetry "Tekrar dene" düğmesini bağlar.
 */
export function HomeErrorState({
  title = 'Ana sayfa yüklenemedi',
  description = 'Bilgilerin şu an alınamadı. Bağlantını kontrol edip tekrar deneyebilirsin.',
  retryLabel = 'Tekrar dene',
  onRetry,
  style,
}) {
  return (
    <ErrorState
      title={title}
      description={description}
      onRetry={onRetry}
      retryLabel={retryLabel}
      style={style}
    />
  );
}

export default HomeErrorState;

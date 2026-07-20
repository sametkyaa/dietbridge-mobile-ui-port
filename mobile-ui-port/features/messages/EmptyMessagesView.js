import React from 'react';
import { EmptyDataView } from '../status';

/**
 * EmptyMessagesView — MesajlarBos port'u: henüz konuşma yok.
 * onAction verilirse "Diyetisyenine bağlan" CTA'sı gösterilir.
 */
export function EmptyMessagesView({
  title = 'Henüz mesajın yok',
  description = 'Diyetisyeninle bağlantı kurduğunda mesajların burada görünecek.',
  actionLabel = 'Diyetisyenine bağlan',
  onAction,
  style,
}) {
  return (
    <EmptyDataView
      icon="message"
      title={title}
      description={description}
      actionLabel={onAction ? actionLabel : undefined}
      onAction={onAction}
      style={style}
    />
  );
}

export default EmptyMessagesView;

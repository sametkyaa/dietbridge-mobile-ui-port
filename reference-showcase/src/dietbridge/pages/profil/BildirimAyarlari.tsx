import PhoneFrame from '../../components/PhoneFrame'
import { BackHeader, Card, Toggle } from '../../components/ui'

const ITEMS = [
  { label: 'Yaklaşan öğün', desc: 'Öğün saatinden 45 dakika önce hatırlat.', on: true },
  { label: 'Yeni mesaj', desc: 'Diyetisyeninden mesaj geldiğinde bildir.', on: true },
  { label: 'Ölçüm hatırlatması', desc: 'Haftalık kilo ölçümünü hatırlat.', on: true },
  { label: 'Su hatırlatması', desc: 'Gün içinde düzenli aralıklarla su içmeyi hatırlat.', on: false },
  { label: 'Plan güncellendi', desc: 'Diyetisyenin planını değiştirdiğinde bildir.', on: true },
]

/** Bildirim Ayarları — açıklamalı tercih anahtarları (dark pattern yok). */
export default function BildirimAyarlari() {
  return (
    <PhoneFrame>
      <div className="px-5 pb-8">
        <BackHeader title="Bildirimler" />
        <p className="mt-3 text-[14px] leading-[21px] text-textSecondary">
          Hangi konularda hatırlatma almak istediğini seç. Hepsini istediğin zaman kapatabilirsin.
        </p>

        <Card className="mt-5 p-0">
          {ITEMS.map((it, i) => (
            <div
              key={it.label}
              className={`flex items-center gap-3 px-4 py-4 ${i > 0 ? 'border-t border-line' : ''}`}
            >
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-medium text-textPrimary">{it.label}</div>
                <div className="mt-0.5 text-[12px] leading-[17px] text-textTertiary">{it.desc}</div>
              </div>
              <Toggle on={it.on} />
            </div>
          ))}
        </Card>
      </div>
    </PhoneFrame>
  )
}

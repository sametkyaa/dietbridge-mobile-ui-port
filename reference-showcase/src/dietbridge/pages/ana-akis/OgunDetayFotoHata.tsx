import { CircleAlert, Image } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { InlineAlert, PButton, Sheet } from '../../components/ui'
import OgunDetayBase from './OgunDetayBase'

/** Öğün Detay — fotoğraf yükleme hatası: açık hata + tekrar dene; başarısız yükleme asla başarılı görünmez. */
export default function OgunDetayFotoHata() {
  return (
    <PhoneFrame
      overlay={
        <Sheet>
          <h3 className="text-[17px] font-semibold text-textPrimary">Öğün fotoğrafı</h3>

          {/* seçilen fotoğraf (soluk — yüklenemedi) */}
          <div className="mt-4 flex items-center gap-3 opacity-60">
            <span className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[12px] bg-surface-muted text-textSecondary">
              <Image size={22} strokeWidth={1.8} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[14px] font-medium text-textPrimary">IMG_2334.jpg</div>
              <div className="text-[12px] text-textTertiary">2,1 MB · Yüklenemedi</div>
            </div>
          </div>

          <div className="mt-4">
            <InlineAlert tone="error" icon={CircleAlert}>
              Fotoğraf yüklenemedi. Bağlantını kontrol edip tekrar deneyebilirsin.
            </InlineAlert>
          </div>

          <div className="mt-4">
            <PButton>Tekrar dene</PButton>
          </div>
          <div className="mt-3 text-center text-[14px] font-semibold text-textSecondary">Vazgeç</div>
        </Sheet>
      }
    >
      <OgunDetayBase completed />
    </PhoneFrame>
  )
}

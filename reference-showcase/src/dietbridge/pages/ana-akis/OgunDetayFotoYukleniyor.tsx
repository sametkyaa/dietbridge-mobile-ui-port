import { Image } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { Progress, Sheet } from '../../components/ui'
import OgunDetayBase from './OgunDetayBase'

/** Öğün Detay — fotoğraf yükleme: seçim sonrası lineer ilerleme + yüzde. */
export default function OgunDetayFotoYukleniyor() {
  return (
    <PhoneFrame
      overlay={
        <Sheet>
          <h3 className="text-[17px] font-semibold text-textPrimary">Öğün fotoğrafı</h3>

          {/* seçilen fotoğraf */}
          <div className="mt-4 flex items-center gap-3">
            <span className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[12px] bg-surface-muted text-textSecondary">
              <Image size={22} strokeWidth={1.8} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[14px] font-medium text-textPrimary">IMG_2334.jpg</div>
              <div className="text-[12px] text-textTertiary">2,1 MB</div>
            </div>
          </div>

          {/* yükleme ilerlemesi */}
          <div className="mt-5 flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <Progress tone="primary" value={64} />
            </div>
            <span className="shrink-0 text-[13px] font-semibold text-textPrimary">%64</span>
          </div>
          <p className="mt-2 text-[12px] leading-[16px] text-textTertiary">
            Yükleniyor… Bu sırada uygulamayı kullanmaya devam edebilirsin.
          </p>
        </Sheet>
      }
    >
      <OgunDetayBase completed />
    </PhoneFrame>
  )
}

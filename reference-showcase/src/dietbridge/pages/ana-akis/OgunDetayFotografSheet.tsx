import { Camera, Image } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { Sheet } from '../../components/ui'
import OgunDetayBase from './OgunDetayBase'

/** Öğün Detay — "Öğünü yedim"e dokunulunca öğün tamamlanır ve fotoğraf ekleme
    alt sayfası (kamera / galeri) kendiliğinden açılır. Atlanabilir. */
export default function OgunDetayFotografSheet() {
  return (
    <PhoneFrame
      overlay={
        <Sheet>
          <h3 className="text-[17px] font-semibold text-textPrimary">Öğün fotoğrafı ekle</h3>
          <p className="mt-1 text-[13px] leading-[18px] text-textSecondary">
            Öğünü tamamladın — istersen fotoğrafını diyetisyeninle paylaş.
          </p>
          <div className="mt-5 space-y-2.5">
            <div className="flex h-[56px] items-center gap-3 rounded-[14px] border border-line bg-surface px-4">
              <span className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-primary-soft text-primary-dark">
                <Camera size={18} />
              </span>
              <span className="text-[15px] font-medium text-textPrimary">Fotoğraf çek</span>
            </div>
            <div className="flex h-[56px] items-center gap-3 rounded-[14px] border border-line bg-surface px-4">
              <span className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-primary-soft text-primary-dark">
                <Image size={18} />
              </span>
              <span className="text-[15px] font-medium text-textPrimary">Galeriden seç</span>
            </div>
          </div>
          <div className="mt-4 text-center text-[14px] font-semibold text-textSecondary">Şimdi değil</div>
        </Sheet>
      }
    >
      <OgunDetayBase completed />
    </PhoneFrame>
  )
}

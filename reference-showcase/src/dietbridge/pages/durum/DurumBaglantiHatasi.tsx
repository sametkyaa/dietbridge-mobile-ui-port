import { WifiOff } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { EmptyBlock, PButton } from '../../components/ui'

/** Durum — tam ekran bağlantı hatası (ekran gerçekten kullanılamadığında). */
export default function DurumBaglantiHatasi() {
  return (
    <PhoneFrame tab="anasayfa">
      <div className="flex h-full items-center">
        <div className="w-full">
          <EmptyBlock
            icon={WifiOff}
            title="Bağlantı yok"
            desc="İnternet bağlantını kontrol et. Bağlandığında içerik kendiliğinden yenilenir."
            action={<PButton>Tekrar dene</PButton>}
          />
        </div>
      </div>
    </PhoneFrame>
  )
}

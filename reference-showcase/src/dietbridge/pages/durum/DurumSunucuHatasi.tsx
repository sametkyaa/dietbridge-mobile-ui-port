import { CloudOff } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { EmptyBlock, PButton } from '../../components/ui'

/** Durum — sunucu hatası: "bir şeyler ters gitti", teknik kod yok. */
export default function DurumSunucuHatasi() {
  return (
    <PhoneFrame tab="anasayfa">
      <div className="flex h-full items-center">
        <div className="w-full">
          <EmptyBlock
            icon={CloudOff}
            title="Bir şeyler ters gitti"
            desc="İsteğin şu an işlenemedi; bu senden kaynaklanmıyor. Biraz sonra tekrar deneyebilirsin."
            action={<PButton>Tekrar dene</PButton>}
          />
        </div>
      </div>
    </PhoneFrame>
  )
}

import { Inbox } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { EmptyBlock } from '../../components/ui'

/** Durum — genel boş veri örneği: sade ikon + tek cümle açıklama. */
export default function DurumBosVeri() {
  return (
    <PhoneFrame tab="anasayfa">
      <div className="flex h-full items-center">
        <div className="w-full">
          <EmptyBlock
            icon={Inbox}
            title="Burada gösterilecek bir kayıt yok"
            desc="Yeni içerik eklendiğinde bu alanda listelenecek."
          />
        </div>
      </div>
    </PhoneFrame>
  )
}

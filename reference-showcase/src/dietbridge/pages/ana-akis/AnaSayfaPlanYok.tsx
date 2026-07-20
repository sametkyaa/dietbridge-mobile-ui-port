import { CalendarDays } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { GreetingHeader, WaterCard } from '../../components/blocks'
import { EmptyBlock, TextButton } from '../../components/ui'

/** Ana Sayfa — plan yok: anlamlı boş durum + su takibi kullanılabilir kalır. */
export default function AnaSayfaPlanYok() {
  return (
    <PhoneFrame tab="anasayfa">
      <div className="px-5 pb-6 pt-2">
        <GreetingHeader />
        <div className="mt-6 rounded-[22px] border border-line bg-surface">
          <EmptyBlock
            icon={CalendarDays}
            title="Henüz aktif bir beslenme planın yok"
            desc="Diyetisyenin planını oluşturduğunda öğünlerin burada listelenecek. Bu arada su tüketimini takip edebilirsin."
            action={<TextButton className="w-full justify-center">Diyetisyenine mesaj gönder</TextButton>}
          />
        </div>
        <div className="mt-6">
          <WaterCard drunk="0,0" percent={0} />
        </div>
      </div>
    </PhoneFrame>
  )
}

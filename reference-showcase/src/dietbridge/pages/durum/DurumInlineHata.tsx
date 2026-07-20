import { CircleAlert, RefreshCw } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { GreetingHeader, HeroMealCard, MacrosCard } from '../../components/blocks'
import { Card, InlineAlert, SectionTitle } from '../../components/ui'

/** Durum — kısmi veri: bir bölüm yüklenemezken ekranın geri kalanı sorunsuz çalışır. */
export default function DurumInlineHata() {
  return (
    <PhoneFrame tab="anasayfa">
      <div className="space-y-4 px-5 pb-6 pt-2">
        <GreetingHeader />
        <MacrosCard />
        <HeroMealCard />
        <div>
          <SectionTitle>Su takibi</SectionTitle>
          <Card className="p-3.5">
            <InlineAlert
              tone="error"
              icon={CircleAlert}
              action={
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary">
                  <RefreshCw size={14} />
                  Tekrar dene
                </span>
              }
            >
              Su kayıtların şu an alınamadı. Diğer bilgilerin güncel.
            </InlineAlert>
          </Card>
        </div>
      </div>
    </PhoneFrame>
  )
}

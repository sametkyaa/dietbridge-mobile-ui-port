import { CircleAlert, RefreshCw } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { GreetingHeader, HeroMealCard, MealList } from '../../components/blocks'
import { Card, InlineAlert, SectionTitle } from '../../components/ui'

/** Ana Sayfa — veri hatası: yalnızca ilgili bölüm hata gösterir, ekran bloklanmaz. */
export default function AnaSayfaVeriHatasi() {
  return (
    <PhoneFrame tab="anasayfa">
      <div className="space-y-4 px-5 pb-6 pt-2">
        <GreetingHeader />
        <div>
          <SectionTitle>Günlük makrolar</SectionTitle>
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
              Makro bilgisi şu an yüklenemedi. Öğün planın etkilenmedi.
            </InlineAlert>
          </Card>
        </div>
        <HeroMealCard />
        <MealList />
      </div>
    </PhoneFrame>
  )
}

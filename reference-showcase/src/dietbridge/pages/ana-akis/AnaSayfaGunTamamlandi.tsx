import PhoneFrame from '../../components/PhoneFrame'
import { DayCompletedCard, GreetingHeader, MacrosCard, MealList, WaterCard } from '../../components/blocks'
import { MEALS } from '../../data'

/** Ana Sayfa — gün tamamlandı: 5/5 öğün, sakin başarı tonu (konfeti yok). */
export default function AnaSayfaGunTamamlandi() {
  const allDone = MEALS.map((m) => ({ ...m, status: 'tamamlandi' as const }))
  return (
    <PhoneFrame tab="anasayfa">
      <div className="space-y-4 px-5 pb-6 pt-2">
        <GreetingHeader greeting="İyi akşamlar, Elif" />
        <DayCompletedCard />
        <MacrosCard meals={allDone} />
        <WaterCard drunk="2,1" percent={84} />
        <MealList meals={allDone} />
      </div>
    </PhoneFrame>
  )
}

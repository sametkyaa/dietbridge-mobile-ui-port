import PhoneFrame from '../../components/PhoneFrame'
import {
  DietitianMessageCard,
  GreetingHeader,
  HeroMealCard,
  MacrosCard,
  MealList,
  WaterCard,
} from '../../components/blocks'
import { MEALS } from '../../data'

/** Ana Sayfa — geciken öğün: 11:00 ara öğünü tamamlanmadı; warning rozetiyle
    yönlendirici dil (kırmızı/suçlayıcı ton yok). Makrolar yalnız 1 öğünden. */
export default function AnaSayfaGecikti() {
  const meals = MEALS.map((m) => (m.id === 'm2' ? { ...m, status: 'gecikti' as const } : m))
  return (
    <PhoneFrame tab="anasayfa">
      <div className="space-y-4 px-5 pb-6 pt-2">
        <GreetingHeader />
        <MacrosCard meals={meals} />
        <HeroMealCard meal={meals[1]} summary="1 orta boy elma ve 10 adet çiğ badem" />
        <WaterCard />
        <MealList meals={meals} />
        <DietitianMessageCard />
      </div>
    </PhoneFrame>
  )
}

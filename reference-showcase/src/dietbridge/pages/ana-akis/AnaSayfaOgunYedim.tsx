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

/** Ana Sayfa — "Öğünü yedim" sonrası: hero kartta sakin tamamlandı durumu + geri al;
    makrolar 3 tamamlanan öğünden yeniden hesaplanır (P 58 / K 85 / Y 37). */
export default function AnaSayfaOgunYedim() {
  const meals = MEALS.map((m) => (m.id === 'm3' ? { ...m, status: 'tamamlandi' as const } : m))
  return (
    <PhoneFrame tab="anasayfa">
      <div className="space-y-4 px-5 pb-6 pt-2">
        <GreetingHeader />
        <MacrosCard meals={meals} />
        <HeroMealCard meal={meals[2]} completed />
        <WaterCard />
        <MealList meals={meals} />
        <DietitianMessageCard />
      </div>
    </PhoneFrame>
  )
}

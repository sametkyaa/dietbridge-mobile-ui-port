import PhoneFrame from '../../components/PhoneFrame'
import {
  DietitianMessageCard,
  GreetingHeader,
  HeroMealCard,
  MacrosCard,
  MealList,
  WaterCard,
} from '../../components/blocks'

/** Ana Sayfa — günlük makrolar, sıradaki öğün, öğün listesi, su takibi, diyetisyen mesajı. */
export default function AnaSayfa() {
  return (
    <PhoneFrame tab="anasayfa">
      <div className="space-y-4 px-5 pb-6 pt-2">
        <GreetingHeader />
        <MacrosCard />
        <HeroMealCard />
        <WaterCard />
        <MealList />
        <DietitianMessageCard />
      </div>
    </PhoneFrame>
  )
}

import { WifiOff } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { GreetingHeader, HeroMealCard, MacrosCard, MealList } from '../../components/blocks'

/** Ana Sayfa — çevrimdışı: satır içi bilgi şeridi + önbelleğe alınmış içerik gösterilir. */
export default function AnaSayfaOffline() {
  return (
    <PhoneFrame tab="anasayfa">
      <div className="space-y-4 px-5 pb-6 pt-2">
        <div className="flex items-center gap-2.5 rounded-[14px] bg-surface-muted px-4 py-3">
          <WifiOff size={16} className="shrink-0 text-textSecondary" />
          <span className="text-[13px] leading-[18px] text-textSecondary">
            Çevrimdışısın — son yüklenen plan gösteriliyor.
          </span>
        </div>
        <GreetingHeader />
        <MacrosCard />
        <HeroMealCard />
        <MealList />
        <p className="text-center text-[12px] text-textTertiary">
          Bağlantı kurulduğunda ilerlemen otomatik eşitlenir.
        </p>
      </div>
    </PhoneFrame>
  )
}

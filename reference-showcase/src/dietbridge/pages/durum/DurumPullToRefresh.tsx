import { Loader2 } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import {
  DietitianMessageCard,
  GreetingHeader,
  HeroMealCard,
  MacrosCard,
  MealList,
  WaterCard,
} from '../../components/blocks'

/** Durum — pull-to-refresh: Ana Sayfa içeriği korunur, üstte sakin yenileme göstergesi;
    hareket azaltma tercihine saygılı (motion-safe). */
export default function DurumPullToRefresh() {
  return (
    <PhoneFrame tab="anasayfa">
      <div className="px-5 pb-6 pt-2">
        {/* yenileme göstergesi */}
        <div className="flex flex-col items-center gap-1.5 pb-3 pt-1">
          <span className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-surface shadow-card">
            <Loader2 size={18} className="text-primary motion-safe:animate-spin" />
          </span>
          <span className="text-[12px] font-medium text-textTertiary">Yenileniyor…</span>
        </div>

        <div className="space-y-4">
          <GreetingHeader />
          <MacrosCard />
          <HeroMealCard />
          <WaterCard />
          <MealList />
          <DietitianMessageCard />
        </div>
      </div>
    </PhoneFrame>
  )
}

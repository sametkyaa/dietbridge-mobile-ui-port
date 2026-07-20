import { Droplets, Plus, Undo2 } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { GreetingHeader, HeroMealCard } from '../../components/blocks'
import { Progress, SButton, Sheet } from '../../components/ui'
import { WATER, WATER_HISTORY } from '../../data'

/** Su Takibi — alt sayfa: mevcut/hedef, hızlı miktarlar, özel miktar, geri al, geçmiş. */
export default function SuTakibiSheet() {
  return (
    <PhoneFrame
      tab="anasayfa"
      overlay={
        <Sheet className="no-scrollbar overflow-y-auto">
          <h3 className="text-[17px] font-semibold text-textPrimary">Su takibi</h3>

          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-[28px] font-semibold leading-[34px] text-textPrimary">
              {WATER.drunkLitres} L
            </span>
            <span className="text-[13px] text-textTertiary">/ {WATER.goalLitres} L hedef</span>
          </div>
          <Progress tone="teal" value={WATER.percent} className="mt-2" />

          {/* hızlı miktarlar */}
          <div className="mt-5 grid grid-cols-3 gap-2">
            {['+200 ml', '+250 ml', '+500 ml'].map((a) => (
              <span
                key={a}
                className="flex h-[44px] items-center justify-center rounded-[12px] bg-teal-soft text-[14px] font-semibold text-teal"
              >
                {a}
              </span>
            ))}
          </div>

          {/* özel miktar */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex h-[48px] flex-1 items-center rounded-[12px] border border-line bg-surface px-4 text-[15px] text-textTertiary">
              Özel miktar (ml)
            </div>
            <span className="flex h-[48px] w-[48px] items-center justify-center rounded-[12px] bg-teal text-white">
              <Plus size={20} />
            </span>
          </div>

          {/* son kayıt geri al */}
          <div className="mt-4 flex items-center justify-between rounded-[12px] bg-surface-muted px-4 py-3">
            <span className="text-[13px] text-textSecondary">250 ml eklendi</span>
            <span className="flex items-center gap-1.5 text-[13px] font-semibold text-textPrimary">
              <Undo2 size={14} />
              Geri al
            </span>
          </div>

          {/* geçmiş */}
          <div className="mt-5">
            <h4 className="text-[13px] font-semibold text-textSecondary">Bugünkü kayıtlar</h4>
            <div className="mt-2 divide-y divide-line">
              {WATER_HISTORY.map((w) => (
                <div key={w.time} className="flex items-center gap-3 py-2.5">
                  <Droplets size={15} className="shrink-0 text-teal" />
                  <span className="flex-1 text-[14px] text-textPrimary">{w.amount} ml</span>
                  <span className="text-[12px] text-textTertiary">{w.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <SButton>Tamam</SButton>
          </div>
        </Sheet>
      }
    >
      <div className="space-y-6 px-5 pb-6 pt-2">
        <GreetingHeader />
        <HeroMealCard />
      </div>
    </PhoneFrame>
  )
}

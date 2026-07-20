import { Sprout } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'

/** Splash — ortalanmış logo, sakin yükleme göstergesi (sonsuz spinner yok). */
export default function Splash() {
  return (
    <PhoneFrame screenClassName="bg-primary-surface">
      <div className="flex h-full flex-col items-center justify-center px-8">
        <span className="flex h-[84px] w-[84px] items-center justify-center rounded-[26px] bg-primary shadow-card">
          <Sprout size={40} className="text-white" strokeWidth={1.8} />
        </span>
        <div className="mt-5 text-[26px] font-semibold text-primary-dark">DietBridge</div>
        <div className="mt-1.5 text-[13px] text-textSecondary">Diyetisyeninle birlikte</div>
        <div className="mt-10 flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="loading-dot h-[8px] w-[8px] rounded-full bg-primary"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          ))}
        </div>
        <div className="mt-3 text-[12px] text-textTertiary">Oturumun hazırlanıyor…</div>
      </div>
    </PhoneFrame>
  )
}

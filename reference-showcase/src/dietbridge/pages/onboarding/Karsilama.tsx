import { Clock3, Salad } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { Avatar, PButton, SButton, StatusBadge } from '../../components/ui'

/** Karşılama — değer önerisi + sade ürün önizlemesi + birincil/ikincil CTA. */
export default function Karsilama() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col px-5 pb-8 pt-4">
        {/* Sade ürün önizlemesi */}
        <div className="rounded-[26px] bg-primary-surface p-4">
          <div className="rounded-[18px] bg-surface p-4 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium text-textSecondary">Sıradaki öğün</span>
              <StatusBadge kind="siradaki" label="45 dk sonra" />
            </div>
            <div className="mt-2 flex items-center gap-3">
              <span className="flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-primary-surface text-primary-dark">
                <Salad size={22} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-[12px] text-textSecondary">
                  <Clock3 size={12} />
                  13:30 · Öğle
                </div>
                <div className="truncate text-[14px] font-semibold text-textPrimary">
                  Izgara tavuklu Akdeniz salatası
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2.5 rounded-[18px] bg-surface/80 p-3">
            <Avatar initials="DK" size={30} />
            <p className="min-w-0 flex-1 truncate text-[12px] text-textSecondary">
              &ldquo;Öğleden önce en az 1 litreyi tamamlamanı öneriyorum.&rdquo;
            </p>
          </div>
        </div>

        <div className="flex-1" />

        <h1 className="text-[30px] font-semibold leading-[36px] text-textPrimary">
          Beslenme sürecin, diyetisyeninle aynı yerde.
        </h1>
        <p className="mt-3 text-[15px] leading-[22px] text-textSecondary">
          Günlük planını takip et, öğünlerini ve su tüketimini kaydet, sorularını diyetisyenine tek yerden sor.
        </p>
        <div className="mt-8 space-y-3">
          <PButton>Hesap oluştur</PButton>
          <SButton>Giriş yap</SButton>
        </div>
      </div>
    </PhoneFrame>
  )
}

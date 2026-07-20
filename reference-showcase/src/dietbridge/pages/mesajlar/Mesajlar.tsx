import { ChevronRight } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { Avatar, Card } from '../../components/ui'
import { DIETITIAN, DIETITIAN_MESSAGE } from '../../data'

/** Mesajlar — tek aktif diyetisyen konuşması: son mesaj, saat, okunmamış rozeti. */
export default function Mesajlar() {
  return (
    <PhoneFrame tab="mesajlar">
      <div className="px-5 pb-6 pt-2">
        <h1 className="text-[26px] font-semibold leading-[32px] text-textPrimary">Mesajlar</h1>

        <Card className="mt-5">
          <div className="flex items-center gap-3">
            <Avatar initials={DIETITIAN.initials} size={48} />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="truncate text-[15px] font-semibold text-textPrimary">{DIETITIAN.name}</span>
                <span className="shrink-0 text-[11px] font-medium text-textTertiary">09:12</span>
              </div>
              <div className="mt-1 flex items-center justify-between gap-2">
                <p className="truncate text-[13px] text-textSecondary">{DIETITIAN_MESSAGE}</p>
                <span className="flex h-[20px] min-w-[20px] shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-semibold text-white">
                  1
                </span>
              </div>
            </div>
            <ChevronRight size={18} className="shrink-0 text-textTertiary" />
          </div>
        </Card>

        <p className="mt-4 text-center text-[12px] leading-[17px] text-textTertiary">
          Diyetisyeninle olan konuşman burada listelenir.
        </p>
      </div>
    </PhoneFrame>
  )
}

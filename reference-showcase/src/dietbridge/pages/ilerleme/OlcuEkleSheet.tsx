import { CalendarDays } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { cx, PButton, Sheet } from '../../components/ui'
import { BODY_MEASURES } from '../../data'

/** Ölçü Ekle — alt sayfa: bel/kalça/göğüs/kol girişi, cm birimi, tarih varsayılan bugün. */
export default function OlcuEkleSheet() {
  return (
    <PhoneFrame
      tab="ilerleme"
      overlay={
        <Sheet>
          <h3 className="text-[17px] font-semibold text-textPrimary">Ölçü ekle</h3>
          <p className="mt-1 text-[13px] leading-[18px] text-textSecondary">
            Yalnızca güncellemek istediğin alanları doldurman yeterli.
          </p>

          <div className="mt-4 space-y-2.5">
            {BODY_MEASURES.map((m, i) => (
              <div
                key={m.key}
                className={cx(
                  'flex items-center gap-3 rounded-[13px] border bg-surface px-4 py-3',
                  i === 0 ? 'border-[1.5px] border-primary' : 'border-line',
                )}
              >
                <span className="flex-1 text-[14px] font-medium text-textPrimary">{m.label}</span>
                <span className="border-b-2 border-primary pb-0.5 text-[20px] font-semibold leading-none text-textPrimary">
                  {m.current}
                </span>
                <span className="text-[13px] font-medium text-textTertiary">cm</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-[13px] border border-line bg-surface px-4 py-3.5">
            <CalendarDays size={18} className="text-textTertiary" />
            <span className="flex-1 text-[14px] text-textPrimary">19 Temmuz Pazar</span>
            <span className="text-[12px] font-medium text-textTertiary">Bugün</span>
          </div>

          <p className="mt-2 text-[12px] leading-[17px] text-textTertiary">
            Mezurayı vücuduna paralel, sıkmadan ölç. Değerler yalnızca senin ve diyetisyeninin görür.
          </p>

          <div className="mt-5">
            <PButton>Kaydet</PButton>
          </div>
        </Sheet>
      }
    >
      <div className="space-y-5 px-5 pb-8 pt-2">
        <h1 className="text-[26px] font-semibold leading-[32px] text-textPrimary">İlerleme</h1>
        <div className="h-[150px] rounded-[18px] border border-line bg-surface" />
        <div className="h-[220px] rounded-[18px] border border-line bg-surface" />
      </div>
    </PhoneFrame>
  )
}

import { CalendarDays } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { PButton, Sheet } from '../../components/ui'

/** Kilo Ekle — alt sayfa: büyük sayısal giriş, kg birimi, tarih varsayılan bugün, doğrulama ipucu. */
export default function KiloEkleSheet() {
  return (
    <PhoneFrame
      tab="ilerleme"
      overlay={
        <Sheet>
          <h3 className="text-[17px] font-semibold text-textPrimary">Ölçüm ekle</h3>

          <div className="mt-5 flex items-end justify-center gap-2">
            <span className="border-b-2 border-primary pb-1 text-[40px] font-semibold leading-none text-textPrimary">
              72,4
            </span>
            <span className="pb-1 text-[16px] font-medium text-textSecondary">kg</span>
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-[13px] border border-line bg-surface px-4 py-3.5">
            <CalendarDays size={18} className="text-textTertiary" />
            <span className="flex-1 text-[14px] text-textPrimary">19 Temmuz Pazar</span>
            <span className="text-[12px] font-medium text-textTertiary">Bugün</span>
          </div>

          <p className="mt-2 text-[12px] leading-[17px] text-textTertiary">
            30–250 kg aralığında bir değer gir; ondalık için virgül kullanabilirsin.
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

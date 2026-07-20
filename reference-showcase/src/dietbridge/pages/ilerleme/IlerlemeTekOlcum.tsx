import { ChartLine } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { Card, EmptyBlock, PButton } from '../../components/ui'

/** İlerleme — tek ölçüm: sahte trend yerine yönlendirici empty state. */
export default function IlerlemeTekOlcum() {
  return (
    <PhoneFrame tab="ilerleme">
      <div className="space-y-5 px-5 pb-8 pt-2">
        <h1 className="text-[26px] font-semibold leading-[32px] text-textPrimary">İlerleme</h1>

        <Card>
          <div className="text-[12px] font-medium text-textSecondary">Mevcut kilo</div>
          <div className="mt-1 text-[28px] font-semibold leading-[34px] text-textPrimary">
            76,8 <span className="text-[16px] font-medium text-textSecondary">kg</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-3.5">
            <div>
              <div className="text-[11px] text-textTertiary">Başlangıç</div>
              <div className="mt-0.5 text-[15px] font-semibold text-textPrimary">76,8 kg</div>
            </div>
            <div>
              <div className="text-[11px] text-textTertiary">Hedef</div>
              <div className="mt-0.5 text-[15px] font-semibold text-textPrimary">66 kg</div>
            </div>
          </div>
          <div className="mt-3 text-[12px] text-textTertiary">Son ölçüm: 19 Temmuz</div>
        </Card>

        <Card>
          <EmptyBlock
            icon={ChartLine}
            title="Grafik için en az iki ölçüm gerekli"
            desc="Haftada bir ölçüm eklersen değişimi burada sade bir grafikle takip edersin."
          />
        </Card>

        <PButton>Ölçüm ekle</PButton>
      </div>
    </PhoneFrame>
  )
}

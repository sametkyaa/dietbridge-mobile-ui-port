import { Minus, Plus } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { BackHeader, Chip, Field, PButton } from '../../components/ui'

/** Profil Düzenle — Hedef ve ölçüler: boy, kilolar, hedef seçimi, günlük su hedefi
    (litre) ve vücut ölçüsü hedefleri; yargılamayan dil. */
export default function ProfilDuzenleHedef() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col px-5 pb-8">
        <BackHeader title="Hedef ve ölçüler" />

        <p className="mt-3 text-[14px] leading-[21px] text-textSecondary">
          Bu bilgiler planının kişiselleştirilmesi için kullanılır; istediğin zaman güncelleyebilirsin.
        </p>

        <div className="mt-6 space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Boy" value="167" trailing={<span className="text-[13px] text-textTertiary">cm</span>} />
              <Field label="Mevcut kilo" value="72,4" trailing={<span className="text-[13px] text-textTertiary">kg</span>} />
            </div>
            <Field
              label="Hedef kilo"
              value="66"
              trailing={<span className="text-[13px] text-textTertiary">kg</span>}
              hint="Hedef kilonu diyetisyeninle birlikte belirlemen önerilir."
            />
          </div>

          <div>
            <div className="mb-2 text-[13px] font-medium text-textSecondary">Hedefin</div>
            <div className="flex flex-wrap gap-2">
              <Chip selected>Kilo verme</Chip>
              <Chip>Kilomu koruma</Chip>
              <Chip>Kilo alma</Chip>
            </div>
          </div>

          <div>
            <div className="mb-2 text-[13px] font-medium text-textSecondary">Günlük su hedefi</div>
            <div className="flex items-center justify-between rounded-[14px] border border-line bg-surface px-4 py-3">
              <span className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-surface-muted text-textSecondary">
                <Minus size={17} />
              </span>
              <span className="text-[24px] font-semibold text-textPrimary">
                2,5 <span className="text-[15px] font-medium text-textSecondary">L</span>
              </span>
              <span className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-primary-soft text-primary-dark">
                <Plus size={17} />
              </span>
            </div>
            <p className="mt-1.5 text-[12px] text-textTertiary">
              Ana Sayfa ve İlerleme'deki su takibi bu hedefe göre ilerler.
            </p>
          </div>

          <div>
            <div className="mb-2 text-[13px] font-medium text-textSecondary">Vücut ölçüsü hedefleri</div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Bel" value="74" trailing={<span className="text-[13px] text-textTertiary">cm</span>} />
              <Field label="Kalça" value="96" trailing={<span className="text-[13px] text-textTertiary">cm</span>} />
              <Field label="Göğüs" value="92" trailing={<span className="text-[13px] text-textTertiary">cm</span>} />
              <Field label="Kol" value="29" trailing={<span className="text-[13px] text-textTertiary">cm</span>} />
            </div>
            <p className="mt-1.5 text-[12px] leading-[17px] text-textTertiary">
              İsteğe bağlı — mevcut ölçülerini İlerleme ekranından takip edebilirsin.
            </p>
          </div>
        </div>

        <div className="flex-1" />
        <div className="pt-6">
          <PButton>Kaydet</PButton>
        </div>
      </div>
    </PhoneFrame>
  )
}

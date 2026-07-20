import PhoneFrame from '../../components/PhoneFrame'
import { BackHeader, Chip, Field, PButton, StepIndicator } from '../../components/ui'

/** Profil tamamlama 2/4 — Hedef ve ölçüler. */
export default function ProfilTamamlama2() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col px-5 pb-8">
        <BackHeader title="Profilini tamamla" />
        <div className="mt-3">
          <StepIndicator current={2} total={4} />
        </div>
        <h1 className="mt-5 text-[24px] font-semibold leading-[30px] text-textPrimary">Hedef ve ölçüler</h1>
        <p className="mt-2 text-[14px] leading-[20px] text-textSecondary">
          Hedefin ne olursa olsun; planın buna göre, seninle birlikte şekillenir.
        </p>

        <div className="mt-7 space-y-5">
          <div>
            <div className="mb-1.5 text-[13px] font-medium text-textSecondary">Hedefin</div>
            <div className="flex flex-wrap gap-2">
              <Chip selected>Kilo vermek</Chip>
              <Chip>Kilo almak</Chip>
              <Chip>Formu korumak</Chip>
              <Chip>Sağlıklı beslenmek</Chip>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Boy" value="168" trailing={<span className="text-[13px] text-textTertiary">cm</span>} />
            <Field label="Mevcut kilo" value="76,8" trailing={<span className="text-[13px] text-textTertiary">kg</span>} />
          </div>
          <Field label="Hedef kilo" value="66" trailing={<span className="text-[13px] text-textTertiary">kg</span>} />
          <p className="text-[12px] leading-[17px] text-textTertiary">
            Hedef kilon, diyetisyeninle birlikte istediğin zaman güncellenebilir.
          </p>
        </div>

        <div className="flex-1" />
        <PButton>Devam et</PButton>
      </div>
    </PhoneFrame>
  )
}

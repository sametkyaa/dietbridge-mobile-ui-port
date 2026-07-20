import { CalendarDays, UserRound } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { BackHeader, Chip, Field, PButton, StepIndicator } from '../../components/ui'
import { USER } from '../../data'

/** Profil tamamlama 1/4 — Temel bilgiler. */
export default function ProfilTamamlama1() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col px-5 pb-8">
        <BackHeader title="Profilini tamamla" />
        <div className="mt-3">
          <StepIndicator current={1} total={4} />
        </div>
        <h1 className="mt-5 text-[24px] font-semibold leading-[30px] text-textPrimary">Temel bilgiler</h1>
        <p className="mt-2 text-[14px] leading-[20px] text-textSecondary">
          Seni tanıyalım — bu bilgiler planını kişiselleştirmek için kullanılır.
        </p>

        <div className="mt-7 space-y-4">
          <Field label="Ad soyad" icon={UserRound} value={USER.name} />
          <Field label="Doğum tarihi" icon={CalendarDays} value="14.03.1994" />
          <div>
            <div className="mb-1.5 text-[13px] font-medium text-textSecondary">Cinsiyet</div>
            <div className="flex flex-wrap gap-2">
              <Chip selected>Kadın</Chip>
              <Chip>Erkek</Chip>
              <Chip>Belirtmek istemiyorum</Chip>
            </div>
          </div>
        </div>

        <div className="flex-1" />
        <PButton>Devam et</PButton>
      </div>
    </PhoneFrame>
  )
}

import { Minus, Plus } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { BackHeader, Chip, PButton, StepIndicator } from '../../components/ui'

/** Profil tamamlama 3/4 — Yaşam tarzı (aktivite, beslenme tipi, uyku, su hedefi litre cinsinden). */
export default function ProfilTamamlama3() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col px-5 pb-8">
        <BackHeader title="Profilini tamamla" />
        <div className="mt-3">
          <StepIndicator current={3} total={4} />
        </div>
        <h1 className="mt-5 text-[24px] font-semibold leading-[30px] text-textPrimary">Yaşam tarzı</h1>
        <p className="mt-2 text-[14px] leading-[20px] text-textSecondary">
          Günlük ritmini bilmemiz, planının hayatına uymasına yardımcı olur.
        </p>

        <div className="mt-7 space-y-5">
          <div>
            <div className="mb-1.5 text-[13px] font-medium text-textSecondary">Aktivite düzeyi</div>
            <div className="flex flex-wrap gap-2">
              <Chip>Hareketsiz</Chip>
              <Chip>Az aktif</Chip>
              <Chip selected>Orta aktif</Chip>
              <Chip>Çok aktif</Chip>
            </div>
          </div>
          <div>
            <div className="mb-1.5 text-[13px] font-medium text-textSecondary">Beslenme tipi</div>
            <div className="flex flex-wrap gap-2">
              <Chip selected>Her şeyi yerim</Chip>
              <Chip>Vejetaryen</Chip>
              <Chip>Vegan</Chip>
              <Chip>Pesketaryen</Chip>
            </div>
          </div>
          <div>
            <div className="mb-1.5 text-[13px] font-medium text-textSecondary">Uyku süresi</div>
            <div className="flex flex-wrap gap-2">
              <Chip>6 saatin altı</Chip>
              <Chip selected>6–8 saat</Chip>
              <Chip>8 saatin üzeri</Chip>
            </div>
          </div>
          <div>
            <div className="mb-1.5 text-[13px] font-medium text-textSecondary">Günlük su hedefi</div>
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
              Ortalama bir hedefle başladık; sonra birlikte ayarlayabilirsiniz.
            </p>
          </div>
        </div>

        <div className="flex-1" />
        <PButton>Devam et</PButton>
      </div>
    </PhoneFrame>
  )
}

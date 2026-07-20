import { Plus, Search } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { BackHeader, Chip, PButton, StepIndicator } from '../../components/ui'

/** Profil tamamlama 4/4 — Sağlık ve beslenme (chip + arama + özel değer; yargılamayan dil). */
export default function ProfilTamamlama4() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col px-5 pb-8">
        <BackHeader title="Profilini tamamla" />
        <div className="mt-3">
          <StepIndicator current={4} total={4} />
        </div>
        <h1 className="mt-5 text-[24px] font-semibold leading-[30px] text-textPrimary">Sağlık ve beslenme</h1>
        <p className="mt-2 text-[14px] leading-[20px] text-textSecondary">
          Bu bilgiler diyetisyeninin planını güvenle hazırlamasına yardımcı olur. İstediğin alanı boş
          bırakabilirsin.
        </p>

        <div className="mt-6 flex h-[48px] items-center gap-3 rounded-[13px] border border-line bg-surface px-4">
          <Search size={18} className="text-textTertiary" />
          <span className="text-[15px] text-textTertiary">Ara: örn. laktoz</span>
        </div>

        <div className="mt-5 space-y-5">
          <div>
            <div className="mb-1.5 text-[13px] font-medium text-textSecondary">Kronik rahatsızlıklar</div>
            <div className="flex flex-wrap gap-2">
              <Chip>Yok</Chip>
              <Chip>Hipertansiyon</Chip>
              <Chip>Diyabet</Chip>
              <Chip>Tiroid</Chip>
              <Chip>İnsülin direnci</Chip>
            </div>
          </div>
          <div>
            <div className="mb-1.5 text-[13px] font-medium text-textSecondary">İntoleranslar</div>
            <div className="flex flex-wrap gap-2">
              <Chip selected removable>Laktoz</Chip>
              <Chip>Glüten</Chip>
              <Chip>Histamin</Chip>
              <Chip>Fruktoz</Chip>
            </div>
          </div>
          <div>
            <div className="mb-1.5 text-[13px] font-medium text-textSecondary">Sevilmeyen besinler</div>
            <div className="flex flex-wrap items-center gap-2">
              <Chip selected removable>Kişniş</Chip>
              <span className="inline-flex h-[38px] items-center gap-1.5 rounded-[13px] border border-dashed border-line bg-surface px-3.5 text-[13px] font-medium text-textSecondary">
                <Plus size={14} />
                Özel ekle
              </span>
            </div>
            <p className="mt-1.5 text-[12px] text-textTertiary">
              Eklediğin bir öğe listede tekrar gösterilmez; istediğin zaman kaldırabilirsin.
            </p>
          </div>
        </div>

        <div className="flex-1" />
        <PButton>Profili tamamla</PButton>
      </div>
    </PhoneFrame>
  )
}

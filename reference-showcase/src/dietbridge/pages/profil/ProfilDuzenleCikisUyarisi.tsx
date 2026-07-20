import { Plus, Search } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { BackHeader, Chip, PButton } from '../../components/ui'

/** Profil Düzenle — kaydedilmemiş değişiklik çıkış uyarısı (onay dialogu). */
export default function ProfilDuzenleCikisUyarisi() {
  return (
    <PhoneFrame
      overlay={
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-textPrimary/45 px-8">
          <div className="w-full rounded-[20px] bg-surface p-5">
            <h3 className="text-[17px] font-semibold text-textPrimary">Değişiklikler kaydedilmedi</h3>
            <p className="mt-2 text-[14px] leading-[21px] text-textSecondary">
              Çıkmadan önce yaptığın değişiklikleri kaydetmek ister misin?
            </p>
            <div className="mt-5 space-y-2.5">
              <PButton>Kaydet</PButton>
              <div className="flex h-[44px] items-center justify-center text-[14px] font-semibold text-textSecondary">
                Kaydetmeden çık
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="flex h-full flex-col px-5 pb-8">
        <BackHeader title="Sağlık ve beslenme" />
        <div className="mt-5 flex h-[48px] items-center gap-3 rounded-[13px] border border-line bg-surface px-4">
          <Search size={18} className="text-textTertiary" />
          <span className="text-[15px] text-textTertiary">Ara veya ekle: örn. glüten</span>
        </div>
        <div className="mt-6">
          <div className="mb-2 text-[13px] font-medium text-textSecondary">İntoleranslar</div>
          <div className="flex flex-wrap gap-2">
            <Chip selected removable>Laktoz</Chip>
            <Chip selected removable>Glüten</Chip>
            <Chip>Histamin</Chip>
            <Chip>Fruktoz</Chip>
          </div>
        </div>
        <div className="mt-6">
          <div className="mb-2 text-[13px] font-medium text-textSecondary">Sevilmeyen besinler</div>
          <div className="flex flex-wrap gap-2">
            <Chip selected removable>Kişniş</Chip>
            <span className="inline-flex h-[38px] items-center gap-1.5 rounded-[13px] border border-dashed border-line bg-surface px-3.5 text-[13px] font-medium text-textSecondary">
              <Plus size={14} />
              Özel ekle
            </span>
          </div>
        </div>
        <div className="flex-1" />
        <PButton>Kaydet</PButton>
      </div>
    </PhoneFrame>
  )
}

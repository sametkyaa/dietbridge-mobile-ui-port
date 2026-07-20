import { CalendarDays, Plus, Search } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { BackHeader, Chip, Field, PButton } from '../../components/ui'

/** Profil Düzenle — Sağlık ve beslenme: kan grubu, kronik rahatsızlıklar, ilaçlar,
    intoleranslar, sevilmeyen besinler ve son tahlil; chip + arama + özel ekleme. */
export default function ProfilDuzenleSaglik() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col px-5 pb-8">
        <BackHeader title="Sağlık ve beslenme" />

        <p className="mt-3 text-[14px] leading-[21px] text-textSecondary">
          Diyetisyeninin bilmesi gerekenleri seç ya da ekle. Bu bilgiler yalnızca planını
          kişiselleştirmek için kullanılır; istediğin zaman değiştirebilirsin.
        </p>

        <div className="mt-5 flex h-[48px] items-center gap-3 rounded-[13px] border border-line bg-surface px-4">
          <Search size={18} className="text-textTertiary" />
          <span className="text-[15px] text-textTertiary">Ara veya ekle: örn. glüten</span>
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <div className="mb-2 text-[13px] font-medium text-textSecondary">Kan grubu</div>
            <div className="flex flex-wrap gap-2">
              <Chip selected>A Rh+</Chip>
              <Chip>A Rh−</Chip>
              <Chip>B Rh+</Chip>
              <Chip>B Rh−</Chip>
              <Chip>AB Rh+</Chip>
              <Chip>AB Rh−</Chip>
              <Chip>0 Rh+</Chip>
              <Chip>0 Rh−</Chip>
              <Chip>Bilmiyorum</Chip>
            </div>
          </div>

          <div>
            <div className="mb-2 text-[13px] font-medium text-textSecondary">Kronik rahatsızlıklar</div>
            <div className="flex flex-wrap gap-2">
              <Chip selected removable>Hipotiroidizm</Chip>
              <Chip>Diyabet</Chip>
              <Chip>Hipertansiyon</Chip>
              <Chip>Astım</Chip>
              <Chip>Çölyak</Chip>
            </div>
          </div>

          <div>
            <div className="mb-2 text-[13px] font-medium text-textSecondary">Kullanılan ilaçlar</div>
            <div className="flex flex-wrap items-center gap-2">
              <Chip selected removable>Levotiroksin</Chip>
              <span className="inline-flex h-[38px] items-center gap-1.5 rounded-[13px] border border-dashed border-line bg-surface px-3.5 text-[13px] font-medium text-textSecondary">
                <Plus size={14} />
                Özel ekle
              </span>
            </div>
            <p className="mt-2 text-[12px] leading-[17px] text-textTertiary">
              Düzenli kullandığın ilaçları ekle; doz bilgisini diyetisyeninle mesajda paylaşabilirsin.
            </p>
          </div>

          <div>
            <div className="mb-2 text-[13px] font-medium text-textSecondary">İntoleranslar</div>
            <div className="flex flex-wrap gap-2">
              <Chip selected removable>Laktoz</Chip>
              <Chip selected removable>Susam</Chip>
              <Chip>Glüten</Chip>
              <Chip>Histamin</Chip>
              <Chip>Fruktoz</Chip>
              <Chip>Sorbitol</Chip>
            </div>
          </div>

          <div>
            <div className="mb-2 text-[13px] font-medium text-textSecondary">Sevilmeyen besinler</div>
            <div className="flex flex-wrap items-center gap-2">
              <Chip selected removable>Kişniş</Chip>
              <span className="inline-flex h-[38px] items-center gap-1.5 rounded-[13px] border border-dashed border-line bg-surface px-3.5 text-[13px] font-medium text-textSecondary">
                <Plus size={14} />
                Özel ekle
              </span>
            </div>
            <p className="mt-2 text-[12px] leading-[17px] text-textTertiary">
              Zaten ekli olan bir öğe aramada tekrar önerilmez; kaldırmak için çipe dokun.
            </p>
          </div>

          <Field
            label="Son tahlil tarihi"
            value="28 Mayıs 2026"
            icon={CalendarDays}
            hint="Güncel tahlil sonuçlarını diyetisyeninle mesaj üzerinden paylaşabilirsin."
          />
        </div>

        <div className="flex-1" />
        <div className="pt-6">
          <PButton>Kaydet</PButton>
        </div>
      </div>
    </PhoneFrame>
  )
}

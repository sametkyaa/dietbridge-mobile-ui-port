import PhoneFrame from '../../components/PhoneFrame'
import { BackHeader, Chip, PButton } from '../../components/ui'

/** Profil Düzenle — Yaşam tarzı: aktivite, beslenme tipi, uyku, sigara ve alkol;
    yargılamayan dil, tekli seçim chip'leri. */
export default function ProfilDuzenleYasamTarzi() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col px-5 pb-8">
        <BackHeader title="Yaşam tarzı" />

        <p className="mt-3 text-[14px] leading-[21px] text-textSecondary">
          Günlük ritmin, planının hayatına uymasına yardımcı olur. Bu bilgiler yalnızca
          planını kişiselleştirmek için kullanılır.
        </p>

        <div className="mt-6 space-y-6">
          <div>
            <div className="mb-2 text-[13px] font-medium text-textSecondary">Aktivite düzeyi</div>
            <div className="flex flex-wrap gap-2">
              <Chip>Hareketsiz</Chip>
              <Chip>Az aktif</Chip>
              <Chip selected>Orta aktif</Chip>
              <Chip>Çok aktif</Chip>
            </div>
          </div>

          <div>
            <div className="mb-2 text-[13px] font-medium text-textSecondary">Beslenme tipi</div>
            <div className="flex flex-wrap gap-2">
              <Chip selected>Her şeyi yerim</Chip>
              <Chip>Vejetaryen</Chip>
              <Chip>Vegan</Chip>
              <Chip>Pesketaryen</Chip>
            </div>
          </div>

          <div>
            <div className="mb-2 text-[13px] font-medium text-textSecondary">Uyku düzeni</div>
            <div className="flex flex-wrap gap-2">
              <Chip>6 saatin altı</Chip>
              <Chip selected>6–8 saat</Chip>
              <Chip>8 saatin üzeri</Chip>
            </div>
          </div>

          <div>
            <div className="mb-2 text-[13px] font-medium text-textSecondary">Sigara kullanımı</div>
            <div className="flex flex-wrap gap-2">
              <Chip selected>Kullanmıyorum</Chip>
              <Chip>Arada</Chip>
              <Chip>Her gün</Chip>
            </div>
          </div>

          <div>
            <div className="mb-2 text-[13px] font-medium text-textSecondary">Alkol kullanımı</div>
            <div className="flex flex-wrap gap-2">
              <Chip>Kullanmıyorum</Chip>
              <Chip selected>Arada</Chip>
              <Chip>Haftada birkaç kez</Chip>
            </div>
            <p className="mt-2 text-[12px] leading-[17px] text-textTertiary">
              Bu bilgiler değerlendirme için değil, yalnızca planının sana uyması için sorulur.
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

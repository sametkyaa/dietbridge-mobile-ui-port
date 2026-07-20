import { Link2 } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { Field, PButton } from '../../components/ui'

/** Diyetisyen bağlantısı — bağlantı yok: davet kodu girişi. */
export default function BaglantiYok() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col px-5 pb-8 pt-14">
        <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-primary-soft text-primary-dark">
          <Link2 size={30} strokeWidth={1.8} />
        </span>
        <h1 className="mt-5 text-[24px] font-semibold leading-[30px] text-textPrimary">
          Diyetisyenine bağlan
        </h1>
        <p className="mt-2 text-[14px] leading-[21px] text-textSecondary">
          Diyetisyeninden aldığın davet kodunu gir; planını, öğünlerini ve mesajlarını tek yerde
          birleştir.
        </p>

        <div className="mt-8">
          <Field label="Davet kodu" placeholder="Örn. DB-4821" />
        </div>

        <div className="flex-1" />
        <PButton>Bağlan</PButton>
        <p className="mt-4 text-center text-[13px] leading-[18px] text-textTertiary">
          Kodun yok mu? Diyetisyeninden davet kodu isteyebilirsin.
        </p>
      </div>
    </PhoneFrame>
  )
}

import { WifiOff } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { PButton } from '../../components/ui'

/** Diyetisyen bağlantısı — bağlantı hatası + tekrar deneme. */
export default function BaglantiHatasi() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col px-5 pb-8 pt-14">
        <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-error-soft text-error">
          <WifiOff size={30} strokeWidth={1.8} />
        </span>
        <h1 className="mt-5 text-[24px] font-semibold leading-[30px] text-textPrimary">
          Bağlantı kurulamadı
        </h1>
        <p className="mt-2 text-[14px] leading-[21px] text-textSecondary">
          Davet kodu doğrulanırken bir sorun oluştu. İnternet bağlantını kontrol edip tekrar
          deneyebilirsin.
        </p>

        <div className="mt-6 rounded-[14px] border border-line bg-surface p-4">
          <div className="text-[12px] font-medium text-textSecondary">Girilen kod</div>
          <div className="mt-1 text-[17px] font-semibold tracking-wide text-textPrimary">DB-4821</div>
        </div>

        <div className="flex-1" />
        <PButton>Tekrar dene</PButton>
        <div className="mt-3 text-center text-[13px] font-semibold text-primary">Kodu düzenle</div>
      </div>
    </PhoneFrame>
  )
}

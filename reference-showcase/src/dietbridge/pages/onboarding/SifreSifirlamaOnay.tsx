import { MailCheck } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { PButton } from '../../components/ui'
import { USER } from '../../data'

/** Şifre sıfırlama — bağlantı gönderildi onay durumu. */
export default function SifreSifirlamaOnay() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col px-5 pb-8 pt-16">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-primary-soft text-primary-dark">
            <MailCheck size={32} strokeWidth={1.8} />
          </span>
          <h1 className="mt-5 text-[22px] font-semibold text-textPrimary">Bağlantı gönderildi</h1>
          <p className="mt-2 max-w-[280px] text-[14px] leading-[21px] text-textSecondary">
            <span className="font-medium text-textPrimary">{USER.email}</span> adresine şifre
            sıfırlama bağlantısı gönderdik. Gelen kutunu kontrol et.
          </p>
        </div>
        <PButton>Girişe dön</PButton>
        <div className="mt-4 text-center text-[13px] text-textSecondary">
          Bağlantı ulaşmadı mı? <span className="font-semibold text-primary">Tekrar gönder</span>
        </div>
      </div>
    </PhoneFrame>
  )
}

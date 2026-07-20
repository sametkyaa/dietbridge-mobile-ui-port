import { Mail } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { BackHeader, Field, PButton } from '../../components/ui'
import { USER } from '../../data'

/** Şifre sıfırlama — e-posta girişi ve yönlendirici metin. */
export default function SifreSifirlama() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col px-5 pb-8">
        <BackHeader title="Şifre sıfırlama" />
        <h1 className="mt-4 text-[26px] font-semibold leading-[32px] text-textPrimary">Şifreni sıfırla</h1>
        <p className="mt-2 text-[14px] leading-[21px] text-textSecondary">
          Hesabına bağlı e-posta adresini gir. Sana bir sıfırlama bağlantısı gönderelim.
        </p>

        <div className="mt-8">
          <Field label="E-posta" icon={Mail} value={USER.email} focused />
        </div>

        <div className="flex-1" />

        <PButton>Bağlantı gönder</PButton>
        <div className="mt-4 text-center text-[13px] text-textSecondary">
          Hatırladın mı? <span className="font-semibold text-primary">Girişe dön</span>
        </div>
      </div>
    </PhoneFrame>
  )
}

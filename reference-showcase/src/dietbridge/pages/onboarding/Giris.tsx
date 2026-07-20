import { Eye, Lock, Mail, Sprout } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { Field, PButton } from '../../components/ui'
import { USER } from '../../data'

/** Giriş — e-posta + şifre (göster/gizle), şifremi unuttum, kayıt geçişi. */
export default function Giris() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col px-5 pb-8 pt-6">
        <span className="flex h-[48px] w-[48px] items-center justify-center rounded-[14px] bg-primary">
          <Sprout size={24} className="text-white" />
        </span>
        <h1 className="mt-5 text-[26px] font-semibold leading-[32px] text-textPrimary">Tekrar hoş geldin</h1>
        <p className="mt-2 text-[14px] leading-[20px] text-textSecondary">
          Hesabına giriş yap, kaldığın yerden devam et.
        </p>

        <div className="mt-8 space-y-4">
          <Field label="E-posta" icon={Mail} value={USER.email} />
          <Field
            label="Şifre"
            icon={Lock}
            value="••••••••••"
            trailing={<Eye size={19} className="text-textTertiary" />}
          />
        </div>
        <div className="mt-2 text-right">
          <span className="text-[13px] font-semibold text-primary">Şifremi unuttum</span>
        </div>

        <div className="flex-1" />

        <PButton>Giriş yap</PButton>
        <div className="mt-4 text-center text-[13px] text-textSecondary">
          Hesabın yok mu? <span className="font-semibold text-primary">Kayıt ol</span>
        </div>
      </div>
    </PhoneFrame>
  )
}

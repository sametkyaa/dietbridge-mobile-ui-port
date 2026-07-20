import { Eye, Lock, Mail, Sprout, WifiOff } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { Field, InlineAlert, PButton } from '../../components/ui'
import { USER } from '../../data'

/** Giriş — bağlantı hatası: kullanıcı kaynaklı değil; sakin info tonu (kırmızı yerine teal),
    form korunur, tekrar deneme açık. */
export default function GirisBaglantiHatasi() {
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

        <div className="mt-4">
          <InlineAlert tone="info" icon={WifiOff}>
            Bağlantı kurulamadı. İnternet bağlantını kontrol edip tekrar deneyebilirsin.
          </InlineAlert>
        </div>

        <div className="flex-1" />

        <PButton>Tekrar dene</PButton>
        <div className="mt-4 text-center text-[13px] text-textSecondary">
          Hesabın yok mu? <span className="font-semibold text-primary">Kayıt ol</span>
        </div>
      </div>
    </PhoneFrame>
  )
}

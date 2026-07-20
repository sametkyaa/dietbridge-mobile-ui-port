import { Eye, Lock, Mail, UserRound } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { CheckboxRow, Field, PButton } from '../../components/ui'
import { USER } from '../../data'

/** Kayıt — yalnızca hesap bilgileri + kullanım koşulları onayı (sağlık bilgisi sorulmaz). */
export default function Kayit() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col px-5 pb-8 pt-6">
        <h1 className="text-[26px] font-semibold leading-[32px] text-textPrimary">Hesap oluştur</h1>
        <p className="mt-2 text-[14px] leading-[20px] text-textSecondary">
          Birkaç bilgiyle başla; profilini ve sağlık detaylarını sonra tamamlayabilirsin.
        </p>

        <div className="mt-7 space-y-4">
          <Field label="Ad soyad" icon={UserRound} value={USER.name} />
          <Field label="E-posta" icon={Mail} value={USER.email} />
          <Field
            label="Şifre"
            icon={Lock}
            placeholder="En az 8 karakter"
            trailing={<Eye size={19} className="text-textTertiary" />}
          />
          <Field
            label="Şifre doğrulama"
            icon={Lock}
            placeholder="Şifreni tekrar gir"
            trailing={<Eye size={19} className="text-textTertiary" />}
          />
        </div>

        <div className="mt-5">
          <CheckboxRow checked>
            <span className="font-medium text-textPrimary">Kullanım koşullarını</span> ve{' '}
            <span className="font-medium text-textPrimary">gizlilik politikasını</span> kabul ediyorum.
          </CheckboxRow>
        </div>

        <div className="flex-1" />

        <PButton>Kayıt ol</PButton>
        <div className="mt-4 text-center text-[13px] text-textSecondary">
          Zaten hesabın var mı? <span className="font-semibold text-primary">Giriş yap</span>
        </div>
      </div>
    </PhoneFrame>
  )
}

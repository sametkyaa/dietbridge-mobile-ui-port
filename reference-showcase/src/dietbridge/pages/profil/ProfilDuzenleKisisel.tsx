import { CalendarDays } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { Avatar, BackHeader, Field, PButton } from '../../components/ui'
import { USER } from '../../data'

/** Profil Düzenle — Kişisel bilgiler: ad, e-posta, telefon, doğum tarihi + avatar değiştirme. */
export default function ProfilDuzenleKisisel() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col px-5 pb-8">
        <BackHeader title="Kişisel bilgiler" />

        {/* avatar */}
        <div className="mt-4 flex items-center gap-3.5">
          <Avatar initials={USER.initials} size={56} />
          <span className="text-[14px] font-semibold text-primary">Fotoğrafı değiştir</span>
        </div>

        <div className="mt-6 space-y-4">
          <Field label="Ad soyad" value="Elif Yılmaz" />
          <Field
            label="E-posta"
            value="elif.yilmaz@ornek.com"
            hint="Giriş için bu adres kullanılır."
          />
          <Field label="Telefon" value="0532 418 76 90" />
          <Field
            label="Doğum tarihi"
            value="22 Ekim 1994"
            icon={CalendarDays}
          />
        </div>

        <div className="flex-1" />
        <PButton>Kaydet</PButton>
      </div>
    </PhoneFrame>
  )
}

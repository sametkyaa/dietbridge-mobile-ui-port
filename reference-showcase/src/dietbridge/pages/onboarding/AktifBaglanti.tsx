import { MessageCircle } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { Avatar, Card, PButton, StatusBadge } from '../../components/ui'
import { DIETITIAN } from '../../data'

/** Diyetisyen bağlantısı — aktif bağlantı: profil kartı + mesaj aksiyonu. */
export default function AktifBaglanti() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col px-5 pb-8 pt-14">
        <h1 className="text-[24px] font-semibold leading-[30px] text-textPrimary">Diyetisyenin</h1>
        <p className="mt-2 text-[14px] leading-[21px] text-textSecondary">
          Bağlantın aktif. Planın, öğünlerin ve mesajların artık tek yerde.
        </p>

        <Card className="mt-7 rounded-[20px] p-5">
          <div className="flex items-center gap-3.5">
            <Avatar initials={DIETITIAN.initials} size={56} />
            <div className="min-w-0 flex-1">
              <div className="text-[17px] font-semibold text-textPrimary">{DIETITIAN.name}</div>
              <div className="mt-0.5 text-[13px] text-textSecondary">{DIETITIAN.specialty}</div>
              <div className="mt-2">
                <StatusBadge kind="bagli" label="Bağlı" />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <PButton>
              <MessageCircle size={18} />
              Mesaj gönder
            </PButton>
          </div>
        </Card>

        <Card className="mt-4">
          <div className="text-[13px] leading-[19px] text-textSecondary">
            Haftalık planın diyetisyenin tarafından hazırlanır; değişikliklerde bildirim alırsın.
          </div>
        </Card>

        <div className="flex-1" />
        <div className="text-center text-[13px] font-semibold text-textSecondary">Bağlantıyı yönet</div>
      </div>
    </PhoneFrame>
  )
}

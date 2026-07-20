import { Hourglass } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { Avatar, Card, SButton, StatusBadge } from '../../components/ui'
import { DIETITIAN } from '../../data'

/** Diyetisyen bağlantısı — davet bekliyor (onay bekleniyor). */
export default function DavetBekliyor() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col px-5 pb-8 pt-14">
        <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-teal-soft text-teal">
          <Hourglass size={30} strokeWidth={1.8} />
        </span>
        <h1 className="mt-5 text-[24px] font-semibold leading-[30px] text-textPrimary">
          Davetin iletildi
        </h1>
        <p className="mt-2 text-[14px] leading-[21px] text-textSecondary">
          {DIETITIAN.name} davetini onayladığında planın burada görünecek. Onaylandığında sana
          bildirim göndereceğiz.
        </p>

        <Card className="mt-7">
          <div className="flex items-center gap-3">
            <Avatar initials={DIETITIAN.initials} size={44} />
            <div className="min-w-0 flex-1">
              <div className="text-[15px] font-semibold text-textPrimary">{DIETITIAN.name}</div>
              <div className="text-[12px] text-textSecondary">{DIETITIAN.specialty}</div>
            </div>
            <StatusBadge kind="bekliyor" label="Onay bekliyor" />
          </div>
        </Card>

        <div className="flex-1" />
        <SButton>Beklerken profilimi gözden geçir</SButton>
        <div className="mt-3 text-center text-[13px] font-semibold text-textSecondary">Daveti iptal et</div>
      </div>
    </PhoneFrame>
  )
}

import {
  Bell,
  ChevronRight,
  HeartPulse,
  Leaf,
  LogOut,
  Pencil,
  ShieldCheck,
  Target,
  UserRound,
} from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { Avatar, Card, SButton, StatusBadge } from '../../components/ui'
import { DIETITIAN, USER } from '../../data'

const ROWS = [
  { icon: UserRound, label: 'Kişisel bilgiler', value: 'Elif Yılmaz · 31 yaş' },
  { icon: Target, label: 'Hedef ve ölçüler', value: '72,4 kg · Hedef 66 kg' },
  { icon: Leaf, label: 'Yaşam tarzı', value: 'Orta aktif · 2,5 L su' },
  { icon: HeartPulse, label: 'Sağlık ve beslenme', value: 'Laktoz intoleransı' },
  { icon: Bell, label: 'Bildirimler', value: '4 tercih açık' },
  { icon: ShieldCheck, label: 'Gizlilik ve güvenlik', value: '' },
]

/** Profil — özet satırlar + aktif diyetisyen + profili düzenle; çıkış nötr tonda. */
export default function Profil() {
  return (
    <PhoneFrame tab="profil">
      <div className="space-y-5 px-5 pb-8 pt-2">
        <h1 className="text-[26px] font-semibold leading-[32px] text-textPrimary">Profil</h1>

        <Card>
          <div className="flex items-center gap-3.5">
            <Avatar initials={USER.initials} size={56} />
            <div className="min-w-0 flex-1">
              <div className="text-[17px] font-semibold text-textPrimary">{USER.name}</div>
              <div className="mt-0.5 truncate text-[13px] text-textSecondary">{USER.email}</div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2.5 border-t border-line pt-3.5">
            <Avatar initials={DIETITIAN.initials} size={32} />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-medium text-textPrimary">{DIETITIAN.name}</div>
            </div>
            <StatusBadge kind="bagli" label="Bağlı" />
          </div>
          <div className="mt-4">
            <SButton>
              <Pencil size={16} />
              Profili düzenle
            </SButton>
          </div>
        </Card>

        <Card className="p-0">
          {ROWS.map((r, i) => (
            <div
              key={r.label}
              className={`flex items-center gap-3 px-4 py-3.5 ${i > 0 ? 'border-t border-line' : ''}`}
            >
              <span className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-surface-muted text-textSecondary">
                <r.icon size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-medium text-textPrimary">{r.label}</div>
                {r.value ? (
                  <div className="mt-0.5 truncate text-[12px] text-textTertiary">{r.value}</div>
                ) : (
                  <div className="mt-0.5 text-[12px] text-textTertiary">Eklenmedi</div>
                )}
              </div>
              <ChevronRight size={17} className="shrink-0 text-textTertiary" />
            </div>
          ))}
        </Card>

        <Card className="p-0">
          <div className="flex items-center gap-3 px-4 py-3.5">
            <span className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-surface-muted text-textPrimary">
              <LogOut size={17} />
            </span>
            <span className="flex-1 text-[14px] font-medium text-textPrimary">Çıkış yap</span>
          </div>
        </Card>
      </div>
    </PhoneFrame>
  )
}

import { CalendarDays, ChartLine, House, MessageCircle, UserRound } from 'lucide-react'
import { cx } from './ui'

export type TabKey = 'anasayfa' | 'plan' | 'mesajlar' | 'ilerleme' | 'profil'

const TABS: Array<{ key: TabKey; label: string; icon: typeof House; badge?: number }> = [
  { key: 'anasayfa', label: 'Ana Sayfa', icon: House },
  { key: 'plan', label: 'Planım', icon: CalendarDays },
  { key: 'mesajlar', label: 'Mesajlar', icon: MessageCircle, badge: 1 },
  { key: 'ilerleme', label: 'İlerleme', icon: ChartLine },
  { key: 'profil', label: 'Profil', icon: UserRound },
]

export default function BottomNav({ active }: { active: TabKey }) {
  return (
    <div className="shrink-0 border-t border-line bg-surface">
      <div className="grid grid-cols-5 px-2 pt-2">
        {TABS.map((t) => {
          const isActive = t.key === active
          const Icon = t.icon
          return (
            <div key={t.key} className="flex flex-col items-center gap-[3px] py-1">
              <span className="relative">
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  className={isActive ? 'text-primary' : 'text-textTertiary'}
                />
                {t.badge ? (
                  <span className="absolute -right-1.5 -top-1 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-primary px-1 text-[9px] font-semibold text-white">
                    {t.badge}
                  </span>
                ) : null}
              </span>
              <span
                className={cx(
                  'text-[10px] leading-[12px]',
                  isActive ? 'font-semibold text-primary' : 'font-medium text-textTertiary',
                )}
              >
                {t.label}
              </span>
            </div>
          )
        })}
      </div>
      <div className="flex justify-center pb-[7px] pt-2">
        <div className="h-[4px] w-[120px] rounded-full bg-textPrimary/70" />
      </div>
    </div>
  )
}

import type { ReactNode } from 'react'
import { BatteryMedium, Signal, Wifi } from 'lucide-react'
import BottomNav, { type TabKey } from './BottomNav'
import { cx } from './ui'

interface PhoneFrameProps {
  children: ReactNode
  tab?: TabKey
  overlay?: ReactNode
  screenClassName?: string
}

/**
 * iPhone tarzı cihaz çerçevesi (~390×844). Durum çubuğu her zaman 12:45 gösterir.
 * İçerik kaydırılabilir ama scrollbar render edilmez.
 */
export default function PhoneFrame({ children, tab, overlay, screenClassName }: PhoneFrameProps) {
  return (
    <div className="w-[390px] max-w-full shrink-0">
      <div className="rounded-[54px] bg-[#191d19] p-[10px] shadow-phone">
        <div className="relative flex h-[824px] flex-col overflow-hidden rounded-[44px] bg-appbg">
          {/* Durum çubuğu + Dynamic Island */}
          <div className="relative z-20 flex h-[44px] shrink-0 items-center justify-between px-8 pt-[6px]">
            <span className="text-[13px] font-semibold tracking-wide text-textPrimary">12:45</span>
            <div className="absolute left-1/2 top-[8px] h-[26px] w-[104px] -translate-x-1/2 rounded-full bg-[#191d19]" />
            <div className="flex items-center gap-[6px] text-textPrimary">
              <Signal size={15} strokeWidth={2} />
              <Wifi size={15} strokeWidth={2} />
              <BatteryMedium size={19} strokeWidth={1.8} />
            </div>
          </div>

          {/* Ekran içeriği */}
          <div className={cx('no-scrollbar relative flex-1 overflow-y-auto overscroll-contain', screenClassName)}>
            {children}
          </div>

          {/* Alt navigasyon veya home indicator */}
          {tab ? (
            <BottomNav active={tab} />
          ) : (
            <div className="flex h-[22px] shrink-0 items-end justify-center pb-[7px]">
              <div className="h-[4px] w-[120px] rounded-full bg-textPrimary/70" />
            </div>
          )}

          {/* Alt sayfa / dialog gibi katmanlar */}
          {overlay}
        </div>
      </div>
    </div>
  )
}

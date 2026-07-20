import { ChevronLeft, ChevronRight } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { MealList } from '../../components/blocks'
import { cx } from '../../components/ui'
import { WEEK } from '../../data'

/** Planım — haftalık görünüm: tarih aralığı, hafta gezinme, gün strip'i, seçili günün öğünleri. */
export default function HaftalikPlan() {
  const selected = 19
  const today = 19
  const day = WEEK.find((d) => d.date === selected)!

  return (
    <PhoneFrame tab="plan">
      <div className="px-5 pb-6 pt-2">
        <div className="flex items-center justify-between">
          <h1 className="text-[26px] font-semibold leading-[32px] text-textPrimary">Planım</h1>
          <span className="text-[14px] font-semibold text-primary">Bugün</span>
        </div>

        {/* Hafta gezinme */}
        <div className="mt-4 flex items-center justify-between">
          <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-surface text-textSecondary">
            <ChevronLeft size={20} />
          </span>
          <span className="text-[15px] font-semibold text-textPrimary">14–20 Temmuz</span>
          <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-surface text-textSecondary">
            <ChevronRight size={20} />
          </span>
        </div>

        {/* Gün strip'i */}
        <div className="mt-3 flex justify-between">
          {WEEK.map((d) => {
            const isSelected = d.date === selected
            const isToday = d.date === today
            return (
              <div key={d.date} className="flex w-[44px] flex-col items-center gap-1">
                <span className="text-[11px] font-medium text-textTertiary">{d.day}</span>
                <span
                  className={cx(
                    'flex h-[38px] w-[38px] items-center justify-center rounded-[13px] text-[14px]',
                    isSelected
                      ? 'bg-primary-soft font-semibold text-primary-dark'
                      : 'font-medium text-textSecondary',
                  )}
                >
                  {d.date}
                </span>
                <span className={cx('h-[5px] w-[5px] rounded-full', isToday ? 'bg-primary' : 'bg-transparent')} />
              </div>
            )
          })}
        </div>

        <div className="mt-5">
          <MealList meals={day.meals} title="19 Temmuz Pazar" />
        </div>
      </div>
    </PhoneFrame>
  )
}

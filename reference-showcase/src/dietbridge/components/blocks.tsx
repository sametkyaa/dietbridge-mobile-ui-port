import type { LucideIcon } from 'lucide-react'
import { Bell, Check, Clock3, Droplets, Drumstick, Footprints, GlassWater, Undo2, Wheat } from 'lucide-react'
import {
  computeConsumedMacros,
  DIETITIAN,
  DIETITIAN_MESSAGE,
  MACRO_GOALS,
  MEALS,
  NEXT_MEAL,
  STEP_GOAL,
  STEPS_TODAY,
  TODAY,
  USER,
  WATER,
  type Meal,
} from '../data'
import { Avatar, Card, cx, MealThumb, PButton, Progress, SectionTitle, StatusBadge, type ProgressTone } from './ui'

/* ------------------------------ Selamlama üst alanı ------------------------------ */

export function GreetingHeader({ greeting = `İyi günler, ${USER.firstName}` }: { greeting?: string }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-[24px] font-semibold leading-[30px] text-textPrimary">{greeting}</h1>
        <p className="mt-0.5 text-[13px] text-textSecondary">{TODAY.date}</p>
      </div>
      <div className="flex items-center gap-1">
        <span className="relative flex h-[44px] w-[44px] items-center justify-center text-textPrimary">
          <Bell size={21} strokeWidth={1.9} />
          <span className="absolute right-[11px] top-[11px] h-[8px] w-[8px] rounded-full border-2 border-appbg bg-primary" />
        </span>
        <Avatar initials={USER.initials} size={36} />
      </div>
    </div>
  )
}

/* ------------------------------ Sıradaki öğün hero ------------------------------ */

export function HeroMealCard({
  meal = NEXT_MEAL,
  completed = false,
  summary = 'Izgara tavuk, Akdeniz yeşillikleri, zeytin ve bir kâse ayran',
}: {
  meal?: Meal
  completed?: boolean
  summary?: string
}) {
  const overdue = !completed && meal.status === 'gecikti'
  return (
    <Card className="rounded-[22px] p-4">
      <div className="flex items-start justify-between gap-3.5">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-medium text-textSecondary">
              {overdue ? 'Geciken öğün' : 'Sıradaki öğün'}
            </span>
            {completed ? (
              <StatusBadge kind="tamamlandi" label="Tamamlandı · 13:38" />
            ) : overdue ? (
              <StatusBadge kind="gecikti" label="Gecikti" />
            ) : (
              <StatusBadge kind="siradaki" label="45 dk sonra" />
            )}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-textSecondary">
            <Clock3 size={14} />
            {meal.time} · {meal.type}
          </div>
          <h3 className="mt-1 text-[17px] font-semibold leading-[22px] text-textPrimary">{meal.title}</h3>
          <p className="mt-1 line-clamp-1 text-[13px] leading-[18px] text-textSecondary">{summary}</p>
        </div>
        <MealThumb icon={meal.icon} size={64} />
      </div>
      {completed ? (
        <div className="mt-3.5">
          <div className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[14px] bg-primary-soft text-[15px] font-semibold text-success">
            <Check size={18} strokeWidth={2.5} />
            Tamamlandı
          </div>
          <div className="mt-2 flex items-center justify-center gap-1.5 text-[13px] font-semibold text-textSecondary">
            <Undo2 size={14} />
            Geri al
          </div>
        </div>
      ) : (
        <PButton className="mt-3.5">
          <Check size={18} strokeWidth={2.5} />
          Öğünü yedim
        </PButton>
      )}
    </Card>
  )
}

/* ------------------------------ Günlük makrolar ------------------------------ */

interface MacroRow {
  key: string
  label: string
  icon: LucideIcon
  iconCls: string
  tone: ProgressTone
  consumed: string
  target: string
  percent: number
}

/** Adım + protein/karbonhidrat/yağ — makrolar tamamlanan öğünlerden hesaplanır.
    Kompakt tek satır düzen: ilk açılışta hero ve su kartıyla aynı ekrana sığar. */
export function MacrosCard({ meals = MEALS }: { meals?: Meal[] }) {
  const consumed = computeConsumedMacros(meals)
  const doneCount = meals.filter((m) => m.status === 'tamamlandi').length
  const rows: MacroRow[] = [
    {
      key: 'adim',
      label: 'Adım',
      icon: Footprints,
      iconCls: 'bg-info-soft text-info',
      tone: 'info',
      consumed: STEPS_TODAY.toLocaleString('tr-TR'),
      target: STEP_GOAL.toLocaleString('tr-TR'),
      percent: (STEPS_TODAY / STEP_GOAL) * 100,
    },
    {
      key: 'protein',
      label: 'Protein',
      icon: Drumstick,
      iconCls: 'bg-primary-soft text-primary-dark',
      tone: 'primary',
      consumed: `${consumed.protein}`,
      target: `${MACRO_GOALS.protein} g`,
      percent: (consumed.protein / MACRO_GOALS.protein) * 100,
    },
    {
      key: 'karb',
      label: 'Karbonhidrat',
      icon: Wheat,
      iconCls: 'bg-teal-soft text-teal',
      tone: 'teal',
      consumed: `${consumed.carb}`,
      target: `${MACRO_GOALS.carb} g`,
      percent: (consumed.carb / MACRO_GOALS.carb) * 100,
    },
    {
      key: 'yag',
      label: 'Yağ',
      icon: Droplets,
      iconCls: 'bg-warning-soft text-warning',
      tone: 'warning',
      consumed: `${consumed.fat}`,
      target: `${MACRO_GOALS.fat} g`,
      percent: (consumed.fat / MACRO_GOALS.fat) * 100,
    },
  ]
  return (
    <Card className="p-4">
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-[15px] font-semibold text-textPrimary">Günlük makrolar</h3>
        <span className="text-[11px] text-textTertiary">
          {doneCount > 0 ? `Tamamlanan ${doneCount} öğünden` : 'Öğün tamamladıkça hesaplanır'}
        </span>
      </div>
      <div className="space-y-2.5">
        {rows.map((row) => (
          <div key={row.key} className="flex items-center gap-2.5">
            <span
              className={cx(
                'flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[8px]',
                row.iconCls,
              )}
            >
              <row.icon size={15} strokeWidth={1.9} />
            </span>
            <span className="w-[82px] shrink-0 text-[12px] font-medium text-textPrimary">{row.label}</span>
            <span className="h-[6px] min-w-0 flex-1 overflow-hidden rounded-full bg-surface-muted">
              <span
                className={cx('block h-full rounded-full', PROGRESS_BAR_TONES[row.tone])}
                style={{ width: `${Math.min(100, Math.max(0, row.percent))}%` }}
              />
            </span>
            <span className="w-[64px] shrink-0 text-right text-[11px] text-textTertiary">
              <span className="font-semibold text-textPrimary">{row.consumed}</span>/{row.target}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}

const PROGRESS_BAR_TONES: Record<ProgressTone, string> = {
  teal: 'bg-teal',
  primary: 'bg-primary',
  info: 'bg-info',
  warning: 'bg-warning',
}

/* ------------------------------ Günün öğünleri listesi ------------------------------ */

export function MealList({ meals = MEALS, title = 'Günün öğünleri' }: { meals?: Meal[]; title?: string }) {
  return (
    <div>
      <SectionTitle>{title}</SectionTitle>
      <Card className="p-0">
        {meals.map((m, i) => {
          const done = m.status === 'tamamlandi'
          return (
            <div key={m.id} className={cx('flex items-center gap-3 px-4 py-3.5', i > 0 && 'border-t border-line')}>
              <MealThumb icon={m.icon} size={44} tone={done ? 'muted' : 'green'} />
              <div className="min-w-0 flex-1">
                <div className={cx('text-[11px] font-medium', done ? 'text-textTertiary' : 'text-textSecondary')}>
                  {m.time} · {m.type}
                </div>
                <div
                  className={cx(
                    'mt-0.5 text-[14px] font-medium leading-[18px]',
                    done ? 'text-textSecondary' : 'text-textPrimary',
                  )}
                >
                  {m.title}
                </div>
              </div>
              {m.status === 'tamamlandi' && <StatusBadge kind="tamamlandi" label="Tamamlandı" />}
              {m.status === 'siradaki' && <StatusBadge kind="siradaki" label="45 dk sonra" />}
              {m.status === 'bekliyor' && <StatusBadge kind="bekliyor" label="Bekliyor" />}
              {m.status === 'gecikti' && <StatusBadge kind="gecikti" label="Gecikti" />}
            </div>
          )
        })}
      </Card>
    </div>
  )
}

/* --------------------------------- Su takibi --------------------------------- */

export function WaterCard({ drunk = WATER.drunkLitres, percent = WATER.percent }: { drunk?: string; percent?: number }) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-[15px] font-semibold text-textPrimary">
          <GlassWater size={18} className="text-teal" />
          Su takibi
        </span>
        <span className="text-[12px] font-medium text-textTertiary">Hedef {WATER.goalLitres} L</span>
      </div>
      <div className="mt-2.5 flex items-center gap-3">
        <span className="shrink-0 text-[22px] font-semibold leading-[28px] text-textPrimary">{drunk} L</span>
        <div className="min-w-0 flex-1">
          <Progress tone="teal" value={percent} />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span className="flex h-[38px] flex-1 items-center justify-center rounded-[12px] bg-teal-soft text-[13px] font-semibold text-teal">
          +200 ml
        </span>
        <span className="flex h-[38px] flex-1 items-center justify-center rounded-[12px] bg-teal-soft text-[13px] font-semibold text-teal">
          +250 ml
        </span>
        <span className="flex h-[38px] w-[42px] items-center justify-center rounded-[12px] bg-surface-muted text-textSecondary">
          <Undo2 size={17} />
        </span>
      </div>
    </Card>
  )
}

/* ------------------------------ Diyetisyen mesajı ------------------------------ */

export function DietitianMessageCard() {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <Avatar initials={DIETITIAN.initials} size={40} />
        <div className="min-w-0 flex-1">
          <div className="text-[14px] font-semibold text-textPrimary">{DIETITIAN.name}</div>
          <div className="text-[12px] text-textTertiary">Diyetisyenin · 09:12</div>
        </div>
      </div>
      <p className="mt-3 text-[14px] leading-[21px] text-textPrimary">{DIETITIAN_MESSAGE}</p>
      <div className="mt-3 text-[14px] font-semibold text-primary">Yanıtla</div>
    </Card>
  )
}

/* ------------------------- Gün tamamlandı kartı ------------------------- */

export function DayCompletedCard() {
  return (
    <Card className="rounded-[22px] p-5">
      <div className="flex items-center gap-4">
        <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-primary-soft text-success">
          <Check size={26} strokeWidth={2.4} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-[17px] font-semibold leading-[22px] text-textPrimary">
            Bugünkü 5 öğünü tamamladın
          </h3>
          <p className="mt-1 text-[13px] leading-[18px] text-textSecondary">
            Planına sadık kaldığın bir gün oldu. Yarınki planın hazır.
          </p>
        </div>
      </div>
    </Card>
  )
}

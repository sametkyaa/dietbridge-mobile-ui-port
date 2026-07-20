import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Check,
  Clock3,
  Hourglass,
  Loader2,
  TriangleAlert,
  X,
} from 'lucide-react'

export const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(' ')

/* ---------------------------------- Kart ---------------------------------- */

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cx('rounded-[18px] border border-line bg-surface p-4', className)}>
      {children}
    </div>
  )
}

/* ------------------------------ Bölüm başlığı ----------------------------- */

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-[17px] font-semibold text-textPrimary">{children}</h3>
      {action}
    </div>
  )
}

/* ------------------------------ Status Badge ------------------------------ */

export type BadgeKind = 'tamamlandi' | 'siradaki' | 'bekliyor' | 'gecikti' | 'bagli' | 'bilgi'

const BADGE_STYLES: Record<BadgeKind, { cls: string; Icon: LucideIcon }> = {
  tamamlandi: { cls: 'bg-primary-soft text-success', Icon: Check },
  siradaki: { cls: 'bg-teal-soft text-teal', Icon: Clock3 },
  bekliyor: { cls: 'bg-surface-muted text-textSecondary', Icon: Hourglass },
  gecikti: { cls: 'bg-warning-soft text-warning', Icon: TriangleAlert },
  bagli: { cls: 'bg-primary-soft text-success', Icon: Check },
  bilgi: { cls: 'bg-info-soft text-info', Icon: Clock3 },
}

export function StatusBadge({ kind, label }: { kind: BadgeKind; label: string }) {
  const { cls, Icon } = BADGE_STYLES[kind]
  return (
    <span className={cx('inline-flex items-center gap-1 rounded-full px-2.5 py-[5px] text-[11px] font-semibold', cls)}>
      <Icon size={12} strokeWidth={2.5} />
      {label}
    </span>
  )
}

/* ------------------------------ Progress bar ------------------------------ */

const PROGRESS_TONES = {
  teal: 'bg-teal',
  primary: 'bg-primary',
  info: 'bg-info',
  warning: 'bg-warning',
} as const

export type ProgressTone = keyof typeof PROGRESS_TONES

export function Progress({
  value,
  tone = 'teal',
  className,
}: {
  value: number
  tone?: ProgressTone
  className?: string
}) {
  const width = Math.min(100, Math.max(0, value))
  return (
    <div className={cx('h-2 w-full overflow-hidden rounded-full bg-surface-muted', className)}>
      <div
        className={cx('h-full rounded-full', PROGRESS_TONES[tone])}
        style={{ width: `${width}%` }}
      />
    </div>
  )
}

/* --------------------------------- Chip ----------------------------------- */

export function Chip({
  selected,
  removable,
  children,
  className,
}: {
  selected?: boolean
  removable?: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cx(
        'inline-flex h-[38px] items-center gap-1.5 rounded-[13px] border px-3.5 text-[13px] font-medium',
        selected
          ? 'border-primary bg-primary-soft text-primary-dark'
          : 'border-line bg-surface text-textPrimary',
        className,
      )}
    >
      {selected && !removable && <Check size={14} strokeWidth={2.5} />}
      {children}
      {removable && <X size={14} strokeWidth={2.5} className="text-textSecondary" />}
    </span>
  )
}

/* -------------------------------- Butonlar -------------------------------- */

export function PButton({
  children,
  loading,
  disabled,
  className,
}: {
  children: ReactNode
  loading?: boolean
  disabled?: boolean
  className?: string
}) {
  const off = disabled || loading
  return (
    <div
      className={cx(
        'flex h-[52px] w-full items-center justify-center gap-2 rounded-[14px] px-5 text-[15px] font-semibold',
        off ? 'bg-surface-muted text-textTertiary' : 'bg-primary text-white',
        className,
      )}
    >
      {loading && <Loader2 size={18} className="animate-spin" />}
      {children}
    </div>
  )
}

export function SButton({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        'flex h-[52px] w-full items-center justify-center gap-2 rounded-[14px] bg-primary-soft px-5 text-[15px] font-semibold text-primary-dark',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function TextButton({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cx('inline-flex min-h-[44px] items-center text-[14px] font-semibold text-primary', className)}>
      {children}
    </span>
  )
}

export function IconCircleButton({
  icon: Icon,
  className,
  tone = 'default',
}: {
  icon: LucideIcon
  className?: string
  tone?: 'default' | 'muted'
}) {
  return (
    <span
      className={cx(
        'flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full',
        tone === 'muted' ? 'bg-surface-muted text-textSecondary' : 'text-textPrimary',
        className,
      )}
    >
      <Icon size={20} strokeWidth={1.9} />
    </span>
  )
}

/* --------------------------------- Input ---------------------------------- */

export function Field({
  label,
  value,
  placeholder,
  error,
  hint,
  icon: Icon,
  trailing,
  focused,
  className,
}: {
  label?: string
  value?: string
  placeholder?: string
  error?: string
  hint?: string
  icon?: LucideIcon
  trailing?: ReactNode
  focused?: boolean
  className?: string
}) {
  return (
    <div className={className}>
      {label && (
        <div className="mb-1.5 text-[13px] font-medium text-textSecondary">{label}</div>
      )}
      <div
        className={cx(
          'flex h-[52px] items-center gap-3 rounded-[13px] border bg-surface px-4',
          error ? 'border-error' : focused ? 'border-[1.5px] border-primary' : 'border-line',
        )}
      >
        {Icon && <Icon size={18} className="shrink-0 text-textTertiary" />}
        <span
          className={cx(
            'min-w-0 flex-1 truncate text-[15px]',
            value ? 'text-textPrimary' : 'text-textTertiary',
          )}
        >
          {value ?? placeholder}
        </span>
        {trailing}
      </div>
      {error ? (
        <div className="mt-1.5 flex items-center gap-1 text-[13px] text-error">{error}</div>
      ) : hint ? (
        <div className="mt-1.5 text-[13px] text-textTertiary">{hint}</div>
      ) : null}
    </div>
  )
}

export function SearchField({ placeholder, className }: { placeholder: string; className?: string }) {
  return (
    <div className={cx('flex h-[48px] items-center gap-3 rounded-[13px] border border-line bg-surface px-4', className)}>
      {/* search icon supplied by caller via import to keep this file lean */}
      <span className="min-w-0 flex-1 truncate text-[15px] text-textTertiary">{placeholder}</span>
    </div>
  )
}

/* --------------------------------- Avatar --------------------------------- */

export function Avatar({
  initials,
  size = 40,
  className,
}: {
  initials: string
  size?: number
  className?: string
}) {
  return (
    <span
      className={cx('flex shrink-0 items-center justify-center rounded-full bg-primary-soft font-semibold text-primary-dark', className)}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {initials}
    </span>
  )
}

/* ------------------------------ Yemek görseli ------------------------------ */

export function MealThumb({
  icon: Icon,
  tone = 'green',
  size = 72,
}: {
  icon: LucideIcon
  tone?: 'green' | 'teal' | 'muted'
  size?: number
}) {
  const tones = {
    green: 'bg-primary-surface text-primary-dark',
    teal: 'bg-teal-soft text-teal',
    muted: 'bg-surface-muted text-textSecondary',
  }
  return (
    <div
      className={cx('flex shrink-0 items-center justify-center rounded-[12px]', tones[tone])}
      style={{ width: size, height: size }}
    >
      <span
        className="flex items-center justify-center rounded-full bg-white/75"
        style={{ width: size * 0.66, height: size * 0.66 }}
      >
        <Icon size={Math.round(size * 0.34)} strokeWidth={1.8} />
      </span>
    </div>
  )
}

/* ------------------------------- Bottom sheet ------------------------------ */

export function Sheet({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end">
      <div className="absolute inset-0 bg-textPrimary/45" />
      <div className={cx('relative max-h-[86%] overflow-hidden rounded-t-[26px] bg-surface px-5 pb-7 pt-3', className)}>
        <div className="mx-auto mb-4 h-[4px] w-[36px] rounded-full bg-line" />
        {children}
      </div>
    </div>
  )
}

/* --------------------------------- Toggle --------------------------------- */

export function Toggle({ on }: { on: boolean }) {
  return (
    <div
      className={cx(
        'flex h-[28px] w-[48px] shrink-0 items-center rounded-full px-[3px]',
        on ? 'justify-end bg-primary' : 'justify-start bg-line',
      )}
    >
      <div className="h-[22px] w-[22px] rounded-full bg-white shadow-sm" />
    </div>
  )
}

/* ---------------------------------- Toast ---------------------------------- */

export function Toast({
  children,
  action,
  tone = 'neutral',
}: {
  children: ReactNode
  action?: string
  tone?: 'neutral' | 'error'
}) {
  return (
    <div
      className={cx(
        'flex items-center gap-3 rounded-[14px] px-4 py-3 shadow-card',
        tone === 'error' ? 'bg-error text-white' : 'bg-[#242c26] text-white',
      )}
    >
      {tone === 'error' && <TriangleAlert size={16} className="shrink-0" />}
      <span className="min-w-0 flex-1 text-[13px] font-medium">{children}</span>
      {action && (
        <span className={cx('shrink-0 text-[13px] font-semibold', tone === 'error' ? 'text-white' : 'text-[#bfe3b4]')}>
          {action}
        </span>
      )}
    </div>
  )
}

/* ------------------------------- Inline alert ------------------------------ */

export function InlineAlert({
  tone = 'error',
  icon: Icon,
  children,
  action,
}: {
  tone?: 'error' | 'info'
  icon: LucideIcon
  children: ReactNode
  action?: ReactNode
}) {
  return (
    <div
      className={cx(
        'flex items-start gap-3 rounded-[14px] p-3.5',
        tone === 'error' ? 'bg-error-soft' : 'bg-teal-soft',
      )}
    >
      <Icon size={18} className={cx('mt-[1px] shrink-0', tone === 'error' ? 'text-error' : 'text-teal')} />
      <div className="min-w-0 flex-1">
        <div className="text-[13px] leading-[18px] text-textPrimary">{children}</div>
        {action && <div className="mt-1.5">{action}</div>}
      </div>
    </div>
  )
}

/* -------------------------------- Empty state ------------------------------ */

export function EmptyBlock({
  icon: Icon,
  title,
  desc,
  action,
}: {
  icon: LucideIcon
  title: string
  desc: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center px-6 py-10 text-center">
      <span className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-surface-muted text-textSecondary">
        <Icon size={26} strokeWidth={1.7} />
      </span>
      <div className="mt-4 text-[15px] font-semibold text-textPrimary">{title}</div>
      <div className="mt-1.5 max-w-[260px] text-[13px] leading-[18px] text-textSecondary">{desc}</div>
      {action && <div className="mt-4 w-full max-w-[240px]">{action}</div>}
    </div>
  )
}

/* ------------------------------ Detay başlığı ------------------------------ */

export function BackHeader({
  title,
  trailing,
}: {
  title: string
  trailing?: ReactNode
}) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="-ml-2 flex h-[44px] w-[44px] items-center justify-center text-textPrimary">
        {/* ChevronLeft passed by caller through trailing pattern would be wasteful; fixed here */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </span>
      <span className="text-[17px] font-semibold text-textPrimary">{title}</span>
      <span className="flex h-[44px] min-w-[44px] items-center justify-end">{trailing}</span>
    </div>
  )
}

/* ------------------------------ Adım göstergesi ---------------------------- */

export function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-1 gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={cx('h-[4px] flex-1 rounded-full', i < current ? 'bg-primary' : 'bg-line')}
          />
        ))}
      </div>
      <span className="text-[12px] font-medium text-textTertiary">
        {current}/{total}
      </span>
    </div>
  )
}

/* -------------------------------- Checkbox -------------------------------- */

export function CheckboxRow({ checked, children }: { checked: boolean; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={cx(
          'mt-[1px] flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[6px] border',
          checked ? 'border-primary bg-primary text-white' : 'border-line bg-surface',
        )}
      >
        {checked && <Check size={13} strokeWidth={3} />}
      </span>
      <span className="text-[13px] leading-[18px] text-textSecondary">{children}</span>
    </div>
  )
}

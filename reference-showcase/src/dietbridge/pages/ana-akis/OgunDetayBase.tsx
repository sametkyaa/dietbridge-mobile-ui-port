import { Check, Undo2 } from 'lucide-react'
import { Avatar, BackHeader, Card, PButton, StatusBadge } from '../../components/ui'
import { DIETITIAN, MEAL_DETAIL, NEXT_MEAL } from '../../data'

/** Öğün detayı ortak içeriği — varyantlar bunu temel alır. */
export default function OgunDetayBase({ completed = false }: { completed?: boolean }) {
  return (
    <div className="px-5 pb-8">
      <BackHeader title="Öğün detayı" />

      {/* tür + saat */}
      <div className="mt-2 flex items-center gap-2">
        <span className="text-[13px] font-medium text-textSecondary">
          {NEXT_MEAL.time} · {NEXT_MEAL.type}
        </span>
        {completed ? (
          <StatusBadge kind="tamamlandi" label="Tamamlandı · 13:38" />
        ) : (
          <StatusBadge kind="siradaki" label="45 dk sonra" />
        )}
      </div>

      <h1 className="mt-2 text-[22px] font-semibold leading-[28px] text-textPrimary">
        {NEXT_MEAL.title}
      </h1>

      {/* görsel alanı */}
      <div className="mt-4 flex h-[132px] items-center justify-center rounded-[18px] bg-primary-surface">
        <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white/75 text-primary-dark">
          <NEXT_MEAL.icon size={34} strokeWidth={1.7} />
        </span>
      </div>

      {/* porsiyon / içerik */}
      <Card className="mt-4">
        <h3 className="text-[15px] font-semibold text-textPrimary">Porsiyon ve içerik</h3>
        <ul className="mt-2.5 space-y-2">
          {MEAL_DETAIL.contents.map((c) => (
            <li key={c} className="flex items-start gap-2.5 text-[14px] leading-[20px] text-textPrimary">
              <span className="mt-[8px] h-[5px] w-[5px] shrink-0 rounded-full bg-primary" />
              {c}
            </li>
          ))}
        </ul>
      </Card>

      {/* diyetisyen notu */}
      <Card className="mt-4">
        <div className="flex items-center gap-2.5">
          <Avatar initials={DIETITIAN.initials} size={30} />
          <span className="text-[13px] font-semibold text-textPrimary">{DIETITIAN.name}</span>
        </div>
        <p className="mt-2.5 text-[14px] leading-[21px] text-textPrimary">{MEAL_DETAIL.note}</p>
      </Card>

      {/* kompakt kalori / makro */}
      <Card className="mt-4">
        <div className="grid grid-cols-4 divide-x divide-line">
          {MEAL_DETAIL.macros.map((m) => (
            <div key={m.label} className="px-2 text-center first:pl-0 last:pr-0">
              <div className="text-[13px] font-semibold text-textPrimary">{m.value}</div>
              <div className="mt-0.5 text-[11px] text-textTertiary">{m.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* ana eylem */}
      <div className="mt-6 space-y-3">
        {completed ? (
          <>
            <div className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[14px] bg-primary-soft text-[15px] font-semibold text-success">
              <Check size={19} strokeWidth={2.5} />
              Tamamlandı
            </div>
            <div className="flex items-center justify-center gap-1.5 text-[14px] font-semibold text-textSecondary">
              <Undo2 size={15} />
              Geri al
            </div>
          </>
        ) : (
          <PButton>Öğünü yedim</PButton>
        )}
      </div>
    </div>
  )
}

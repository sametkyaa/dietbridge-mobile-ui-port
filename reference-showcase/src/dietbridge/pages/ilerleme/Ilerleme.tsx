import { TrendingDown } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { Card, cx, PButton, SButton } from '../../components/ui'
import { BODY_MEASURE_DATE, BODY_MEASURES, WATER_GOAL_L, WATER_WEEK, WEIGHT, WEIGHT_HISTORY } from '../../data'

/** İlerleme — özet kart + haftalık kilo çizgi grafiği (sıfırdan başlamayan eksen) + ölçüm ekle. */
export default function Ilerleme() {
  return (
    <PhoneFrame tab="ilerleme">
      <div className="space-y-5 px-5 pb-8 pt-2">
        <h1 className="text-[26px] font-semibold leading-[32px] text-textPrimary">İlerleme</h1>

        {/* Ölçüm özeti */}
        <Card>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[12px] font-medium text-textSecondary">Mevcut kilo</div>
              <div className="mt-1 text-[28px] font-semibold leading-[34px] text-textPrimary">
                {WEIGHT.current} <span className="text-[16px] font-medium text-textSecondary">kg</span>
              </div>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1.5 text-[13px] font-semibold text-success">
              <TrendingDown size={15} />
              {WEIGHT.change} kg
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-3.5">
            <div>
              <div className="text-[11px] text-textTertiary">Başlangıç</div>
              <div className="mt-0.5 text-[15px] font-semibold text-textPrimary">{WEIGHT.start} kg</div>
            </div>
            <div>
              <div className="text-[11px] text-textTertiary">Hedef</div>
              <div className="mt-0.5 text-[15px] font-semibold text-textPrimary">{WEIGHT.goal} kg</div>
            </div>
          </div>
          <div className="mt-3 text-[12px] text-textTertiary">Son ölçüm: {WEIGHT.lastMeasure}</div>
        </Card>

        {/* Grafik */}
        <Card>
          <h3 className="text-[15px] font-semibold text-textPrimary">Haftalık ölçümler</h3>
          <div className="mt-3">
            <WeightChart />
          </div>
          <p className="mt-2 text-[12px] leading-[17px] text-textTertiary">
            8 haftada {WEIGHT.start} kg&rsquo;dan {WEIGHT.current} kg&rsquo;ya; toplam {WEIGHT.change} kg.
          </p>
        </Card>

        <PButton>Ölçüm ekle</PButton>

        {/* Vücut ölçüleri */}
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-semibold text-textPrimary">Vücut ölçüleri</h3>
            <span className="text-[12px] text-textTertiary">Son ölçüm: {BODY_MEASURE_DATE}</span>
          </div>
          <div className="mt-1.5">
            {BODY_MEASURES.map((m, i) => (
              <div
                key={m.key}
                className={cx('flex items-center justify-between py-2.5', i > 0 && 'border-t border-line')}
              >
                <span className="text-[14px] text-textPrimary">{m.label}</span>
                <div className="flex items-center gap-2.5">
                  <span className="text-[14px] font-semibold text-textPrimary">{m.current} cm</span>
                  <span className="rounded-full bg-primary-soft px-2 py-[3px] text-[12px] font-semibold text-success">
                    −{m.start - m.current} cm
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3.5">
            <SButton>Ölçü ekle</SButton>
          </div>
        </Card>

        {/* Su tüketimi analizi */}
        <Card>
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-[15px] font-semibold text-textPrimary">Su tüketimi</h3>
              <div className="mt-0.5 text-[12px] text-textTertiary">Bu hafta · Hedef {String(WATER_GOAL_L).replace('.', ',')} L</div>
            </div>
            <div className="text-right">
              <span className="text-[28px] font-semibold leading-[34px] text-textPrimary">
                {(WATER_WEEK.reduce((t, d) => t + d.litres, 0) / WATER_WEEK.length).toFixed(1).replace('.', ',')} L
              </span>
              <div className="text-[11px] text-textTertiary">günlük ortalama</div>
            </div>
          </div>
          <div className="mt-4">
            <WaterWeekChart />
          </div>
          <p className="mt-3 text-[12px] leading-[17px] text-textTertiary">
            Bu hafta {WATER_WEEK.filter((d) => d.litres >= WATER_GOAL_L).length} gün hedefe ulaştın. Bugünkü tüketimin 1,4 L — gün devam ediyor.
          </p>
        </Card>
      </div>
    </PhoneFrame>
  )
}

function WaterWeekChart() {
  const maxScale = 3
  const goalPct = (WATER_GOAL_L / maxScale) * 100
  return (
    <div>
      <div className="relative h-[104px]">
        {/* hedef çizgisi */}
        <div
          className="pointer-events-none absolute left-0 right-0 z-10 border-t border-dashed border-textTertiary/70"
          style={{ bottom: `${goalPct}%` }}
        />
        <div className="flex h-full items-end gap-2">
          {WATER_WEEK.map((d, i) => {
            const today = i === WATER_WEEK.length - 1
            return (
              <div key={d.day} className="flex h-full flex-1 flex-col items-center justify-end">
                {today && (
                  <span className="mb-1 text-[11px] font-semibold text-textPrimary">
                    {String(d.litres).replace('.', ',')}
                  </span>
                )}
                <div
                  className={cx('w-full rounded-t-[6px]', today ? 'bg-primary' : 'bg-teal')}
                  style={{ height: `${(d.litres / maxScale) * 100}%` }}
                />
              </div>
            )
          })}
        </div>
      </div>
      <div className="mt-1.5 flex gap-2">
        {WATER_WEEK.map((d, i) => {
          const today = i === WATER_WEEK.length - 1
          return (
            <span
              key={d.day}
              className={cx('flex-1 text-center text-[11px]', today ? 'font-semibold text-textPrimary' : 'text-textTertiary')}
            >
              {d.day}
            </span>
          )
        })}
      </div>
    </div>
  )
}

function WeightChart() {
  const W = 316
  const H = 170
  const padL = 30
  const padR = 10
  const padT = 18
  const padB = 26
  const min = 71.5
  const max = 77.5
  const x = (i: number) => padL + (i * (W - padL - padR)) / (WEIGHT_HISTORY.length - 1)
  const y = (kg: number) => padT + ((max - kg) / (max - min)) * (H - padT - padB)
  const points = WEIGHT_HISTORY.map((p, i) => `${x(i)},${y(p.kg)}`).join(' ')
  const gridValues = [77, 74.5, 72]
  const xLabels: Array<[number, string]> = [
    [0, '1 Haz'],
    [2, '15 Haz'],
    [4, '29 Haz'],
    [6, '12 Tem'],
    [7, '19 Tem'],
  ]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Haftalık kilo grafiği">
      {gridValues.map((g) => (
        <g key={g}>
          <line x1={padL} x2={W - padR} y1={y(g)} y2={y(g)} stroke="#E2E7E1" strokeDasharray="3 4" />
          <text x={padL - 6} y={y(g) + 3.5} textAnchor="end" fontSize="9.5" fill="#929B93">
            {String(g).replace('.', ',')}
          </text>
        </g>
      ))}
      <polyline points={points} fill="none" stroke="#4FA7A1" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {WEIGHT_HISTORY.map((p, i) => {
        const last = i === WEIGHT_HISTORY.length - 1
        return (
          <circle
            key={p.d}
            cx={x(i)}
            cy={y(p.kg)}
            r={last ? 5 : 4}
            fill={last ? '#4FA7A1' : '#FFFFFF'}
            stroke="#4FA7A1"
            strokeWidth="2.5"
          />
        )
      })}
      <text
        x={x(WEIGHT_HISTORY.length - 1)}
        y={y(WEIGHT_HISTORY[WEIGHT_HISTORY.length - 1].kg) - 10}
        textAnchor="end"
        fontSize="11"
        fontWeight="600"
        fill="#1E2820"
      >
        72,4
      </text>
      {xLabels.map(([i, label]) => (
        <text key={label} x={x(i)} y={H - 8} textAnchor={i === 7 ? 'end' : 'middle'} fontSize="9.5" fill="#929B93">
          {label}
        </text>
      ))}
    </svg>
  )
}

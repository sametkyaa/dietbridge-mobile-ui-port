import { TrendingDown } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { BackHeader, Card, Chip, cx, PButton } from '../../components/ui'
import { BODY_MEASURE_DATE, BODY_MEASURE_HISTORY, type MeasurePoint } from '../../data'

/** Ölçü Geçmişi — ölçüm seçici (Bel/Kalça/Göğüs/Kol), mini trend grafiği ve
    kronolojik kayıt listesi. Vitrinde "Bel" seçili gösterilir. */
export default function OlcuGecmis() {
  const selectedKey = 'bel'
  const series = BODY_MEASURE_HISTORY[selectedKey]
  const first = series.points[0]
  const last = series.points[series.points.length - 1]

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col px-5 pb-8">
        <BackHeader title="Vücut ölçüleri" />

        {/* ölçüm seçici */}
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(BODY_MEASURE_HISTORY).map(([key, m]) => (
            <Chip key={key} selected={key === selectedKey}>
              {m.label}
            </Chip>
          ))}
        </div>

        {/* özet */}
        <Card className="mt-4">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[12px] font-medium text-textSecondary">{series.label} — güncel</div>
              <div className="mt-1 text-[28px] font-semibold leading-[34px] text-textPrimary">
                {last.cm} <span className="text-[16px] font-medium text-textSecondary">cm</span>
              </div>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1.5 text-[13px] font-semibold text-success">
              <TrendingDown size={15} />
              −{first.cm - last.cm} cm
            </span>
          </div>
          <div className="mt-3 border-t border-line pt-3 text-[12px] text-textTertiary">
            Başlangıç {first.cm} cm · Son ölçüm: {BODY_MEASURE_DATE}
          </div>
        </Card>

        {/* mini trend */}
        <Card className="mt-4">
          <h3 className="text-[15px] font-semibold text-textPrimary">Değişim</h3>
          <div className="mt-3">
            <MiniTrendChart points={series.points} />
          </div>
          <p className="mt-2 text-[12px] leading-[17px] text-textTertiary">
            6 haftada {first.cm} cm&rsquo;den {last.cm} cm&rsquo;ye; toplam −{first.cm - last.cm} cm.
          </p>
        </Card>

        {/* kayıt listesi */}
        <Card className="mt-4 p-0">
          {[...series.points].reverse().map((p, i) => {
            const prev = series.points[series.points.indexOf(p) - 1]
            return (
              <div
                key={p.d}
                className={cx('flex items-center justify-between px-4 py-3', i > 0 && 'border-t border-line')}
              >
                <span className="text-[14px] text-textPrimary">{p.d}</span>
                <span className="text-[13px] text-textSecondary">
                  <span className="font-semibold text-textPrimary">{String(p.cm).replace('.', ',')} cm</span>
                  {prev ? ` · ${(p.cm - prev.cm).toFixed(1).replace('.', ',').replace('-', '−')} cm` : ' · Başlangıç'}
                </span>
              </div>
            )
          })}
        </Card>

        <div className="flex-1" />
        <div className="pt-5">
          <PButton>Ölçü ekle</PButton>
        </div>
      </div>
    </PhoneFrame>
  )
}

function MiniTrendChart({ points }: { points: MeasurePoint[] }) {
  const W = 316
  const H = 150
  const padL = 32
  const padR = 12
  const padT = 16
  const padB = 24
  const values = points.map((p) => p.cm)
  const min = Math.min(...values) - 1
  const max = Math.max(...values) + 1
  const x = (i: number) => padL + (i * (W - padL - padR)) / (points.length - 1)
  const y = (cm: number) => padT + ((max - cm) / (max - min)) * (H - padT - padB)
  const line = points.map((p, i) => `${x(i)},${y(p.cm)}`).join(' ')
  const gridValues = [max - 1, Math.round((max + min) / 2), min + 1]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Ölçü değişim grafiği">
      {gridValues.map((g) => (
        <g key={g}>
          <line x1={padL} x2={W - padR} y1={y(g)} y2={y(g)} stroke="#E2E7E1" strokeDasharray="3 4" />
          <text x={padL - 6} y={y(g) + 3.5} textAnchor="end" fontSize="9.5" fill="#929B93">
            {String(g).replace('.', ',')}
          </text>
        </g>
      ))}
      <polyline points={line} fill="none" stroke="#4FA7A1" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {points.map((p, i) => {
        const lastPoint = i === points.length - 1
        return (
          <circle
            key={p.d}
            cx={x(i)}
            cy={y(p.cm)}
            r={lastPoint ? 5 : 4}
            fill={lastPoint ? '#4FA7A1' : '#FFFFFF'}
            stroke="#4FA7A1"
            strokeWidth="2.5"
          />
        )
      })}
      <text
        x={x(points.length - 1)}
        y={y(points[points.length - 1].cm) - 10}
        textAnchor="end"
        fontSize="11"
        fontWeight="600"
        fill="#1E2820"
      >
        {String(points[points.length - 1].cm).replace('.', ',')}
      </text>
      {points.map((p, i) => (
        <text
          key={p.d}
          x={x(i)}
          y={H - 6}
          textAnchor={i === points.length - 1 ? 'end' : i === 0 ? 'start' : 'middle'}
          fontSize="9.5"
          fill="#929B93"
        >
          {p.d}
        </text>
      ))}
    </svg>
  )
}

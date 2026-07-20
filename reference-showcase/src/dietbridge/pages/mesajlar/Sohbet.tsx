import { Check, CheckCheck, ChevronLeft, Image, Send, TriangleAlert } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { Avatar, cx } from '../../components/ui'
import { CHAT, DIETITIAN } from '../../data'

/** Sohbet — balonlar, tarih ayırıcı, okundu/gönderilemedi durumları, composer. */
export default function Sohbet() {
  return (
    <PhoneFrame>
      <div className="flex min-h-full flex-col">
        {/* başlık */}
        <div className="flex items-center gap-2 border-b border-line bg-surface px-3 py-2">
          <span className="flex h-[44px] w-[36px] items-center justify-center text-textPrimary">
            <ChevronLeft size={22} />
          </span>
          <Avatar initials={DIETITIAN.initials} size={36} />
          <div className="min-w-0 flex-1">
            <div className="truncate text-[15px] font-semibold text-textPrimary">{DIETITIAN.name}</div>
            <div className="flex items-center gap-1.5 text-[12px] text-textSecondary">
              <span className="h-[7px] w-[7px] rounded-full bg-success" />
              Çevrimiçi
            </div>
          </div>
        </div>

        {/* mesajlar */}
        <div className="flex-1 space-y-3 px-4 py-4">
          <div className="flex justify-center">
            <span className="rounded-full bg-surface-muted px-3 py-1 text-[11px] font-medium text-textSecondary">
              Bugün
            </span>
          </div>

          {CHAT.map((m) => {
            if (m.from === 'dietitian') {
              return (
                <div key={m.id} className="flex justify-start">
                  <div className="max-w-[78%] rounded-[18px] rounded-bl-[6px] bg-surface-muted px-3.5 py-2.5">
                    <p className="text-[14px] leading-[20px] text-textPrimary">{m.text}</p>
                    <div className="mt-1 text-right text-[10px] text-textTertiary">{m.time}</div>
                  </div>
                </div>
              )
            }
            const failed = m.state === 'gonderilemedi'
            return (
              <div key={m.id} className="flex flex-col items-end">
                <div
                  className={cx(
                    'max-w-[78%] rounded-[18px] rounded-br-[6px] px-3.5 py-2.5',
                    failed ? 'border border-error/40 bg-primary/80' : 'bg-primary',
                  )}
                >
                  <p className="text-[14px] leading-[20px] text-white">{m.text}</p>
                  <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-white/80">
                    {m.time}
                    {m.state === 'okundu' && <CheckCheck size={13} className="text-white" />}
                    {m.state === 'gonderildi' && <Check size={13} className="text-white/80" />}
                  </div>
                </div>
                {failed && (
                  <div className="mt-1.5 flex items-center gap-1.5 text-[12px] text-error">
                    <TriangleAlert size={13} />
                    Mesaj gönderilemedi.
                    <span className="font-semibold underline">Tekrar dene</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* composer */}
        <div className="border-t border-line bg-surface px-3 pb-2 pt-2">
          <div className="flex items-end gap-2">
            <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full text-textSecondary">
              <Image size={21} />
            </span>
            <div className="flex min-h-[44px] flex-1 items-center rounded-[22px] bg-surface-muted px-4 text-[14px] text-textTertiary">
              Mesaj yaz…
            </div>
            <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-primary text-white">
              <Send size={18} />
            </span>
          </div>
        </div>
      </div>
    </PhoneFrame>
  )
}

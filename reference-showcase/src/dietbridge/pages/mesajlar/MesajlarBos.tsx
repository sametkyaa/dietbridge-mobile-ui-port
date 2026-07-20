import { MessageCircle } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { EmptyBlock, TextButton } from '../../components/ui'

/** Mesajlar — boş durum. */
export default function MesajlarBos() {
  return (
    <PhoneFrame tab="mesajlar">
      <div className="flex h-full flex-col px-5 pb-6 pt-2">
        <h1 className="text-[26px] font-semibold leading-[32px] text-textPrimary">Mesajlar</h1>
        <div className="flex flex-1 items-center justify-center">
          <EmptyBlock
            icon={MessageCircle}
            title="Henüz mesajın yok"
            desc="Diyetisyeninle bağlantı kurduğunda mesajların burada görünecek."
            action={<TextButton className="justify-center">Diyetisyenine bağlan</TextButton>}
          />
        </div>
      </div>
    </PhoneFrame>
  )
}

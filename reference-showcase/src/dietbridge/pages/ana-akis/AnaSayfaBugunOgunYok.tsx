import { UtensilsCrossed } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import {
  DietitianMessageCard,
  GreetingHeader,
  MacrosCard,
  WaterCard,
} from '../../components/blocks'
import { Card, EmptyBlock, SButton } from '../../components/ui'

/** Ana Sayfa — bugün öğün yok: plan var ama bugüne öğün planlanmamış;
    makro kartı sıfır değerleri nötr gösterir, adım verisi korunur. */
export default function AnaSayfaBugunOgunYok() {
  return (
    <PhoneFrame tab="anasayfa">
      <div className="space-y-4 px-5 pb-6 pt-2">
        <GreetingHeader />
        <MacrosCard meals={[]} />
        <Card className="p-2">
          <EmptyBlock
            icon={UtensilsCrossed}
            title="Bugün için planlanmış öğün bulunmuyor"
            desc="Diyetisyenin yeni bir plan eklediğinde burada görünür."
            action={<SButton>Haftalık plana bak</SButton>}
          />
        </Card>
        <WaterCard />
        <DietitianMessageCard />
      </div>
    </PhoneFrame>
  )
}

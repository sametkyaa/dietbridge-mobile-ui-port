import {
  ChevronRight,
  Download,
  KeyRound,
  MonitorSmartphone,
  ShieldCheck,
  Trash2,
} from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame'
import { BackHeader, Card, Toggle } from '../../components/ui'

/** Gizlilik ve güvenlik — şifre, iki adımlı doğrulama, oturumlar, veri indirme;
    hesap silme sakin ama net (dark pattern yok). */
export default function GizlilikGuvenlik() {
  return (
    <PhoneFrame>
      <div className="space-y-5 px-5 pb-8">
        <BackHeader title="Gizlilik ve güvenlik" />

        {/* Güvenlik */}
        <div>
          <div className="mb-2 text-[13px] font-medium text-textSecondary">Güvenlik</div>
          <Card className="p-0">
            <div className="flex items-center gap-3 px-4 py-3.5">
              <span className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-surface-muted text-textSecondary">
                <KeyRound size={17} />
              </span>
              <span className="flex-1 text-[14px] font-medium text-textPrimary">Şifreyi değiştir</span>
              <ChevronRight size={17} className="shrink-0 text-textTertiary" />
            </div>
            <div className="flex items-center gap-3 border-t border-line px-4 py-3.5">
              <span className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-surface-muted text-textSecondary">
                <ShieldCheck size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-medium text-textPrimary">İki adımlı doğrulama</div>
                <div className="mt-0.5 text-[12px] text-textTertiary">Girişte ek doğrulama kodu</div>
              </div>
              <Toggle on={false} />
            </div>
            <div className="flex items-center gap-3 border-t border-line px-4 py-3.5">
              <span className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-surface-muted text-textSecondary">
                <MonitorSmartphone size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-medium text-textPrimary">Açık oturumlar</div>
                <div className="mt-0.5 text-[12px] text-textTertiary">2 cihazda açık</div>
              </div>
              <ChevronRight size={17} className="shrink-0 text-textTertiary" />
            </div>
          </Card>
        </div>

        {/* Veri */}
        <div>
          <div className="mb-2 text-[13px] font-medium text-textSecondary">Verilerin</div>
          <Card className="p-0">
            <div className="flex items-center gap-3 px-4 py-3.5">
              <span className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-surface-muted text-textSecondary">
                <Download size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-medium text-textPrimary">Verilerimi indir</div>
                <div className="mt-0.5 text-[12px] text-textTertiary">Tüm kayıtlarının bir kopyası</div>
              </div>
              <ChevronRight size={17} className="shrink-0 text-textTertiary" />
            </div>
          </Card>
        </div>

        {/* Hesap */}
        <div>
          <div className="mb-2 text-[13px] font-medium text-textSecondary">Hesap</div>
          <Card className="p-0">
            <div className="flex items-center gap-3 px-4 py-3.5">
              <span className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-error-soft text-error">
                <Trash2 size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-medium text-error">Hesabı sil</div>
                <div className="mt-0.5 text-[12px] leading-[16px] text-textTertiary">
                  Hesabın ve tüm verilerin kalıcı olarak silinir; bu işlem geri alınamaz.
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PhoneFrame>
  )
}

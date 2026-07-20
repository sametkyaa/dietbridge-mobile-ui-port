import PhoneFrame from '../../components/PhoneFrame'
import { GreetingHeader, WaterCard } from '../../components/blocks'
import { Toast } from '../../components/ui'

/** Durum — toast/snackbar örnekleri: nötr başarı (geri al aksiyonlu) ve hata. */
export default function DurumToastOrnekleri() {
  return (
    <PhoneFrame
      tab="anasayfa"
      overlay={
        <div className="absolute inset-x-0 bottom-[86px] z-30 space-y-2 px-5">
          <Toast action="Geri al">250 ml su eklendi</Toast>
          <Toast tone="error" action="Tekrar dene">
            Ölçüm kaydedilemedi.
          </Toast>
        </div>
      }
    >
      <div className="space-y-6 px-5 pb-6 pt-2">
        <GreetingHeader />
        <WaterCard />
        <p className="text-[13px] leading-[19px] text-textSecondary">
          Kısa işlem geri bildirimleri ekranın altında birkaç saniye görünür; başarı bildirimleri
          nötr koyu zeminlidir ve gerektiğinde tek aksiyon içerir.
        </p>
      </div>
    </PhoneFrame>
  )
}

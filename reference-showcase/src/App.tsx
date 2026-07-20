import type { ComponentType, ReactNode } from 'react'
import ScreenLabel from './dietbridge/components/ScreenLabel'

// Onboarding
import Splash from './dietbridge/pages/onboarding/Splash'
import Karsilama from './dietbridge/pages/onboarding/Karsilama'
import Giris from './dietbridge/pages/onboarding/Giris'
import GirisHata from './dietbridge/pages/onboarding/GirisHata'
import GirisBaglantiHatasi from './dietbridge/pages/onboarding/GirisBaglantiHatasi'
import Kayit from './dietbridge/pages/onboarding/Kayit'
import SifreSifirlama from './dietbridge/pages/onboarding/SifreSifirlama'
import SifreSifirlamaOnay from './dietbridge/pages/onboarding/SifreSifirlamaOnay'
import ProfilTamamlama1 from './dietbridge/pages/onboarding/ProfilTamamlama1'
import ProfilTamamlama2 from './dietbridge/pages/onboarding/ProfilTamamlama2'
import ProfilTamamlama3 from './dietbridge/pages/onboarding/ProfilTamamlama3'
import ProfilTamamlama4 from './dietbridge/pages/onboarding/ProfilTamamlama4'
import BaglantiYok from './dietbridge/pages/onboarding/BaglantiYok'
import DavetBekliyor from './dietbridge/pages/onboarding/DavetBekliyor'
import AktifBaglanti from './dietbridge/pages/onboarding/AktifBaglanti'
import BaglantiHatasi from './dietbridge/pages/onboarding/BaglantiHatasi'

// Ana akış
import AnaSayfa from './dietbridge/pages/ana-akis/AnaSayfa'
import AnaSayfaSkeleton from './dietbridge/pages/ana-akis/AnaSayfaSkeleton'
import AnaSayfaPlanYok from './dietbridge/pages/ana-akis/AnaSayfaPlanYok'
import AnaSayfaOffline from './dietbridge/pages/ana-akis/AnaSayfaOffline'
import AnaSayfaGunTamamlandi from './dietbridge/pages/ana-akis/AnaSayfaGunTamamlandi'
import AnaSayfaVeriHatasi from './dietbridge/pages/ana-akis/AnaSayfaVeriHatasi'
import AnaSayfaOgunYedim from './dietbridge/pages/ana-akis/AnaSayfaOgunYedim'
import AnaSayfaGecikti from './dietbridge/pages/ana-akis/AnaSayfaGecikti'
import AnaSayfaBugunOgunYok from './dietbridge/pages/ana-akis/AnaSayfaBugunOgunYok'
import HaftalikPlan from './dietbridge/pages/ana-akis/HaftalikPlan'
import HaftalikPlanBosGun from './dietbridge/pages/ana-akis/HaftalikPlanBosGun'
import HaftalikPlanGuncellendi from './dietbridge/pages/ana-akis/HaftalikPlanGuncellendi'
import OgunDetay from './dietbridge/pages/ana-akis/OgunDetay'
import OgunDetayTamamlandi from './dietbridge/pages/ana-akis/OgunDetayTamamlandi'
import OgunDetayFotografSheet from './dietbridge/pages/ana-akis/OgunDetayFotografSheet'
import OgunDetayFotoYukleniyor from './dietbridge/pages/ana-akis/OgunDetayFotoYukleniyor'
import OgunDetayFotoHata from './dietbridge/pages/ana-akis/OgunDetayFotoHata'
import SuTakibiSheet from './dietbridge/pages/ana-akis/SuTakibiSheet'

// İlerleme
import Ilerleme from './dietbridge/pages/ilerleme/Ilerleme'
import IlerlemeTekOlcum from './dietbridge/pages/ilerleme/IlerlemeTekOlcum'
import KiloEkleSheet from './dietbridge/pages/ilerleme/KiloEkleSheet'
import OlcuEkleSheet from './dietbridge/pages/ilerleme/OlcuEkleSheet'
import OlcuGecmis from './dietbridge/pages/ilerleme/OlcuGecmis'

// Mesajlar
import Mesajlar from './dietbridge/pages/mesajlar/Mesajlar'
import MesajlarBos from './dietbridge/pages/mesajlar/MesajlarBos'
import Sohbet from './dietbridge/pages/mesajlar/Sohbet'

// Profil
import Profil from './dietbridge/pages/profil/Profil'
import ProfilDuzenleKisisel from './dietbridge/pages/profil/ProfilDuzenleKisisel'
import ProfilDuzenleHedef from './dietbridge/pages/profil/ProfilDuzenleHedef'
import ProfilDuzenleYasamTarzi from './dietbridge/pages/profil/ProfilDuzenleYasamTarzi'
import ProfilDuzenleSaglik from './dietbridge/pages/profil/ProfilDuzenleSaglik'
import ProfilDuzenleCikisUyarisi from './dietbridge/pages/profil/ProfilDuzenleCikisUyarisi'
import BildirimAyarlari from './dietbridge/pages/profil/BildirimAyarlari'
import GizlilikGuvenlik from './dietbridge/pages/profil/GizlilikGuvenlik'

// Durum ekranları
import DurumBaglantiHatasi from './dietbridge/pages/durum/DurumBaglantiHatasi'
import DurumSunucuHatasi from './dietbridge/pages/durum/DurumSunucuHatasi'
import DurumBosVeri from './dietbridge/pages/durum/DurumBosVeri'
import DurumToastOrnekleri from './dietbridge/pages/durum/DurumToastOrnekleri'
import DurumInlineHata from './dietbridge/pages/durum/DurumInlineHata'
import DurumPullToRefresh from './dietbridge/pages/durum/DurumPullToRefresh'

interface ScreenEntry {
  title: string
  desc: string
  C: ComponentType
}

interface Group {
  id: string
  nav: string
  heading: string
  desc: string
  screens: ScreenEntry[]
}

const GROUPS: Group[] = [
  {
    id: 'onboarding',
    nav: 'Onboarding',
    heading: 'Onboarding',
    desc: 'Açılış, karşılama, hesap ve profil kurulumu ile diyetisyen bağlantı akışı.',
    screens: [
      { title: 'Splash', desc: 'Uygulama açılışı ve oturum kontrolü', C: Splash },
      { title: 'Karşılama', desc: 'Değer önerisi ve hesap oluşturma girişi', C: Karsilama },
      { title: 'Giriş', desc: 'E-posta ve şifre ile oturum açma', C: Giris },
      { title: 'Giriş — Hata', desc: 'Alan doğrulama hatası, satır içi uyarı ve gönderim durumu', C: GirisHata },
      { title: 'Giriş — Bağlantı Hatası', desc: 'Bağlantı kurulamadı; sakin info tonu ve tekrar deneme', C: GirisBaglantiHatasi },
      { title: 'Kayıt', desc: 'Hesap oluşturma formu ve kullanım koşulları', C: Kayit },
      { title: 'Şifre Sıfırlama', desc: 'E-posta ile sıfırlama bağlantısı gönderme', C: SifreSifirlama },
      { title: 'Şifre Sıfırlama — Onay', desc: 'Bağlantı gönderildi durumu', C: SifreSifirlamaOnay },
      { title: 'Profil Tamamlama 1/4', desc: 'Temel bilgiler', C: ProfilTamamlama1 },
      { title: 'Profil Tamamlama 2/4', desc: 'Hedef ve ölçüler', C: ProfilTamamlama2 },
      { title: 'Profil Tamamlama 3/4', desc: 'Yaşam tarzı ve su hedefi', C: ProfilTamamlama3 },
      { title: 'Profil Tamamlama 4/4', desc: 'Sağlık ve beslenme tercihleri', C: ProfilTamamlama4 },
      { title: 'Diyetisyen Bağlantısı — Yok', desc: 'Davet kodu ile bağlanma', C: BaglantiYok },
      { title: 'Diyetisyen Bağlantısı — Bekliyor', desc: 'Davet onayı bekleniyor', C: DavetBekliyor },
      { title: 'Diyetisyen Bağlantısı — Aktif', desc: 'Diyetisyen profil kartı ve mesaj aksiyonu', C: AktifBaglanti },
      { title: 'Diyetisyen Bağlantısı — Hata', desc: 'Bağlantı hatası ve tekrar deneme', C: BaglantiHatasi },
    ],
  },
  {
    id: 'ana-akis',
    nav: 'Ana Akış',
    heading: 'Ana Akış',
    desc: 'Ana Sayfa, haftalık plan, öğün detayı ve su takibi — durum varyantlarıyla.',
    screens: [
      { title: 'Ana Sayfa', desc: 'Günlük makrolar (adım, protein, karbonhidrat, yağ) ve sıradaki öğün', C: AnaSayfa },
      { title: 'Ana Sayfa — İskelet', desc: 'Yükleniyor durumu (spinner yerine iskelet)', C: AnaSayfaSkeleton },
      { title: 'Ana Sayfa — Plan Yok', desc: 'Aktif plan olmadığında boş durum', C: AnaSayfaPlanYok },
      { title: 'Ana Sayfa — Çevrimdışı', desc: 'Satır içi bilgi şeridi ve önbellek içerik', C: AnaSayfaOffline },
      { title: 'Ana Sayfa — Gün Tamamlandı', desc: '5/5 öğün; sakin başarı tonu', C: AnaSayfaGunTamamlandi },
      { title: 'Ana Sayfa — Veri Hatası', desc: 'Bölüm düzeyinde hata ve tekrar deneme', C: AnaSayfaVeriHatasi },
      { title: 'Ana Sayfa — Öğün Yedim', desc: 'Hero kartta tamamlandı durumu, geri al ve güncel makrolar', C: AnaSayfaOgunYedim },
      { title: 'Ana Sayfa — Geciken Öğün', desc: 'Gecikmiş öğün warning rozetiyle; kırmızı yok', C: AnaSayfaGecikti },
      { title: 'Ana Sayfa — Bugün Öğün Yok', desc: 'Bugüne planlanmış öğün olmadığında yönlendirici boş durum', C: AnaSayfaBugunOgunYok },
      { title: 'Planım', desc: 'Haftalık plan, gün strip’i ve öğün listesi', C: HaftalikPlan },
      { title: 'Planım — Boş Gün', desc: 'Planlanmış öğünü olmayan gün', C: HaftalikPlanBosGun },
      { title: 'Planım — Plan Güncellendi', desc: 'Diyetisyen planı güncellediğinde bilgi şeridi', C: HaftalikPlanGuncellendi },
      { title: 'Öğün Detay', desc: 'İçerik, diyetisyen notu, makro ve ana eylem', C: OgunDetay },
      { title: 'Öğün Detay — Tamamlandı', desc: 'Tamamlanma durumu ve geri alma', C: OgunDetayTamamlandi },
      { title: 'Öğün Detay — Fotoğraf', desc: '"Öğünü yedim" sonrası açılan fotoğraf alt sayfası', C: OgunDetayFotografSheet },
      { title: 'Öğün Detay — Foto Yükleniyor', desc: 'Yükleme ilerlemesi ve yüzde göstergesi', C: OgunDetayFotoYukleniyor },
      { title: 'Öğün Detay — Foto Hatası', desc: 'Başarısız yükleme ve tekrar deneme', C: OgunDetayFotoHata },
      { title: 'Su Takibi', desc: 'Alt sayfa: hızlı ekle, özel miktar, geri al, geçmiş', C: SuTakibiSheet },
    ],
  },
  {
    id: 'ilerleme',
    nav: 'İlerleme',
    heading: 'İlerleme',
    desc: 'Kilo özeti, haftalık grafik, vücut ölçüleri ve su tüketimi analizi.',
    screens: [
      { title: 'İlerleme', desc: 'Kilo, vücut ölçüleri ve haftalık su analizi', C: Ilerleme },
      { title: 'İlerleme — Tek Ölçüm', desc: 'Grafik yerine yönlendirici boş durum', C: IlerlemeTekOlcum },
      { title: 'Kilo Ekle', desc: 'Alt sayfa: büyük sayısal giriş ve doğrulama', C: KiloEkleSheet },
      { title: 'Ölçü Ekle', desc: 'Alt sayfa: bel, kalça, göğüs ve kol girişi', C: OlcuEkleSheet },
      { title: 'Ölçü Geçmişi', desc: 'Ölçüm seçici, mini trend grafiği ve kayıt listesi', C: OlcuGecmis },
    ],
  },
  {
    id: 'mesajlar',
    nav: 'Mesajlar',
    heading: 'Mesajlar',
    desc: 'Konuşma listesi ve diyetisyen sohbeti.',
    screens: [
      { title: 'Mesajlar', desc: 'Konuşma listesi ve okunmamış rozeti', C: Mesajlar },
      { title: 'Mesajlar — Boş', desc: 'Henüz mesaj yok durumu', C: MesajlarBos },
      { title: 'Sohbet', desc: 'Balonlar, okundu/gönderilemedi durumları, composer', C: Sohbet },
    ],
  },
  {
    id: 'profil',
    nav: 'Profil',
    heading: 'Profil',
    desc: 'Profil özeti, bölüm bazlı düzenleme, bildirim ve güvenlik tercihleri.',
    screens: [
      { title: 'Profil', desc: 'Özet satırlar, aktif diyetisyen ve ayarlar', C: Profil },
      { title: 'Profil Düzenle — Kişisel Bilgiler', desc: 'Ad, e-posta, telefon, doğum tarihi ve avatar', C: ProfilDuzenleKisisel },
      { title: 'Profil Düzenle — Hedef ve Ölçüler', desc: 'Boy, kilolar, su hedefi ve vücut ölçüsü hedefleri', C: ProfilDuzenleHedef },
      { title: 'Profil Düzenle — Yaşam Tarzı', desc: 'Aktivite, beslenme, uyku, sigara ve alkol', C: ProfilDuzenleYasamTarzi },
      { title: 'Profil Düzenle — Sağlık', desc: 'Kan grubu, kronik rahatsızlıklar, ilaçlar, intoleranslar, tahlil', C: ProfilDuzenleSaglik },
      { title: 'Profil Düzenle — Çıkış Uyarısı', desc: 'Kaydedilmemiş değişiklik onay dialogu', C: ProfilDuzenleCikisUyarisi },
      { title: 'Bildirim Ayarları', desc: 'Açıklamalı tercih anahtarları', C: BildirimAyarlari },
      { title: 'Gizlilik ve Güvenlik', desc: 'Şifre, iki adımlı doğrulama, oturumlar, veri ve hesap silme', C: GizlilikGuvenlik },
    ],
  },
  {
    id: 'durum',
    nav: 'Durum Ekranları',
    heading: 'Durum Ekranları',
    desc: 'Hata, boş veri ve geri bildirim kalıpları.',
    screens: [
      { title: 'Durum — Bağlantı Hatası', desc: 'Tam ekran bağlantı hatası ve tekrar deneme', C: DurumBaglantiHatasi },
      { title: 'Durum — Sunucu Hatası', desc: '“Bir şeyler ters gitti” — teknik kod yok', C: DurumSunucuHatasi },
      { title: 'Durum — Boş Veri', desc: 'Genel boş durum örneği', C: DurumBosVeri },
      { title: 'Durum — Toast Örnekleri', desc: 'Başarı (geri al) ve hata snackbar’ları', C: DurumToastOrnekleri },
      { title: 'Durum — Kısmi Veri', desc: 'Bir bölüm hatalı, ekran çalışmaya devam eder', C: DurumInlineHata },
      { title: 'Durum — Pull to Refresh', desc: 'Ana Sayfa üzerinde sakin yenileme göstergesi', C: DurumPullToRefresh },
    ],
  },
]

function ShowcaseItem({ s }: { s: ScreenEntry }) {
  return (
    <div className="flex flex-col items-start gap-3">
      <ScreenLabel title={s.title} desc={s.desc} />
      <s.C />
    </div>
  )
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="rounded-full px-3 py-1.5 text-[13px] font-medium text-textSecondary transition-colors hover:bg-surface-muted hover:text-textPrimary"
    >
      {children}
    </a>
  )
}

export default function App() {
  const total = GROUPS.reduce((n, g) => n + g.screens.length, 0)
  return (
    <div className="min-h-screen">
      {/* Sticky üst gezinme */}
      <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-[60px] max-w-[1440px] items-center justify-between gap-4 px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-primary text-[15px] font-bold text-white">
              D
            </span>
            <span className="text-[16px] font-semibold text-textPrimary">DietBridge Vitrin</span>
            <span className="hidden rounded-full bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-textSecondary sm:inline">
              {total} ekran
            </span>
          </div>
          <nav className="hidden items-center gap-1 md:flex">
            {GROUPS.map((g) => (
              <NavLink key={g.id} href={`#${g.id}`}>
                {g.nav}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* Başlık */}
      <div className="mx-auto max-w-[1440px] px-6 pb-4 pt-10">
        <h1 className="text-[28px] font-semibold leading-[34px] text-textPrimary">
          DietBridge — Danışan Uygulaması Vitrini
        </h1>
        <p className="mt-2 max-w-[720px] text-[15px] leading-[22px] text-textSecondary">
          P0 kapsamındaki tüm mobil ekranlar ve kritik durum varyantları. Tasarım sistemi: sakin,
          yumuşak, güven veren; Inter, Lucide ikonları ve DietBridge renk token’ları.
        </p>
      </div>

      {/* Gruplar */}
      <main className="mx-auto max-w-[1440px] space-y-16 px-6 pb-24 pt-6">
        {GROUPS.map((g) => (
          <section key={g.id} id={g.id} className="scroll-mt-24">
            <div className="mb-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h2 className="text-[22px] font-semibold text-textPrimary">{g.heading}</h2>
              <span className="rounded-full bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-textSecondary">
                {g.screens.length} ekran
              </span>
              <p className="w-full text-[14px] text-textSecondary">{g.desc}</p>
            </div>
            <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
              {g.screens.map((s) => (
                <ShowcaseItem key={s.title} s={s} />
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="border-t border-line py-8 text-center text-[12px] text-textTertiary">
        DietBridge Vitrin · Örnek veri: Elif Yılmaz &amp; Uzm. Dyt. Deniz Kaya · 19 Temmuz Pazar, 12:45
      </footer>
    </div>
  )
}

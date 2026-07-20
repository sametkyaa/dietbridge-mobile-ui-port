# DietBridge — Mobil UI Portu (`mobile-ui-port/`)

Bu klasör, DietBridge web showcase'inin **UI-only React Native (Expo) portudur**.
Amaç, mevcut mobil uygulamaya taşınabilir, saf görsel bileşen katmanı sağlamaktır.

## 1. Kapsam: UI-only React Native (Expo) portu

Tüm ekranlar `react` + `react-native` core bileşenleriyle yazılmıştır
(`View`, `Text`, `FlatList`, `ScrollView`, `Modal`, `Switch`, `Image`,
`Pressable`, `Animated` vb.). Her görünüm controlled'dır: veri prop'larla gelir,
etkileşimler callback'lerle dışarı taşar. Prop/callback sözleşmeleri için
[`contracts/UI_CONTRACTS.md`](contracts/UI_CONTRACTS.md) dosyasına bakınız.

## 2. Backend YOK

Bu katmanda **hiçbir backend entegrasyonu yoktur**: Supabase, Auth, Storage,
RPC, Realtime, herhangi bir API istemcisi, `fetch` ve AsyncStorage kullanılmaz.
Tüm bileşenler saf UI'dır; veri ve eylemler host uygulamanın ViewModel/servis
katmanından beslenir.

## 3. Preview fixtures production için değildir

`preview/previewData.js` yalnızca görsel inceleme amaçlı Türkçe fixture
verileridir (web showcase'deki `dietbridge/data.ts`'ten türetilmiştir).
**Production runtime tarafından kullanılmamalıdır.**

## 4. Mevcut mobil projeye kopyalama

Production'a alınacak klasörler:

```
theme/         → tasarım token'ları (colors, spacing, typography, radius, shadows)
components/    → paylaşılan UI bileşenleri (AppScreen, AppButton, AppCard, …)
features/      → ekran görünümleri (home, meal-plan, meal-detail, water,
                 status, onboarding, progress, messages, profile)
contracts/     → entegrasyon dokümanı (UI_CONTRACTS.md; kopyalanması önerilir)
```

`preview/` klasörü (`PreviewGallery.js` + `previewData.js`) **yalnızca
geliştirme/inceleme içindir — production bundle'a almayın.**

## 5. Varsayılan bağımlılıklar

- Yalnızca `react` + `react-native` core; başka paket şartı yoktur.
- **`components/Icon.js` placeholder'dır**: Unicode glyph tabanlıdır.
  Entegrasyonda host'un ikon kütüphanesiyle (örn. `@expo/vector-icons` veya
  `lucide-react-native`) değiştirilmelidir; glyph adları (`back`, `check`,
  `camera`, …) eşleme tablosu olarak korunabilir.
- **Grafikler dependency-free placeholder'dır**: `WeightChartView` ve
  `WaterWeeklyChartView` saf `View`/`Text` ile çizer. Host'un grafik paketiyle
  (örn. `react-native-svg`, `victory-native`) değiştirilebilir.
- **Image picker yoktur**: öğün fotoğrafı ve avatar seçimi yalnızca
  callback'tir (`onPickCamera`, `onPickGallery`, `onPickImage`,
  `onChangePhoto`); host `expo-image-picker` entegrasyonu eklemelidir.

## 6. Gerçek ViewModel bekleyen bileşenler

**Tüm feature view'ları** gerçek ViewModel bekler: `home`, `meal-plan`,
`meal-detail`, `water`, `status`, `onboarding`, `progress`, `messages`,
`profile` altındaki her görünüm controlled'dır ve verisini dışarıdan alır.
Gallery hariç (`preview/PreviewGallery.js`) **hiçbir dosya `previewData`
import etmez.** Hangi ViewModel'in hangi görünüme bağlanacağı
`contracts/UI_CONTRACTS.md` içindeki "Backend notu" bölümlerinde özetlenmiştir.

## 7. Tamamlanan ekran grupları (7 aşama)

1. **Tema + paylaşılan bileşenler** — `theme/`, `components/` (AppScreen,
   AppButton, AppCard, AppInput, AppSkeleton, BottomSheetView, ChoiceChip,
   EmptyState, ErrorState, Icon, InlineAlert, ProgressBar, StatusBadge)
2. **Ana Sayfa** — `features/home/` (tüm varyantlar tek `HomeView`'da:
   skeleton, empty, error, offline banner)
3. **Plan + Öğün Detay + Su** — `features/meal-plan/`, `features/meal-detail/`
   (fotoğraf sheet/yükleme/hata akışı dahil), `features/water/`
4. **Durum bileşenleri** — `features/status/` (FullScreenErrorView, ToastView,
   EmptyDataView, PullToRefreshHint)
5. **Onboarding** — `features/onboarding/` (Splash, Welcome, Login, Register,
   ForgotPassword + Success, ProfileSetup adım 1–4, diyetisyen bağlantısı
   empty/pending/active/error)
6. **İlerleme** — `features/progress/` (ProgressView, kilo/su grafikleri,
   ölçüm sheet'leri, ölçü geçmişi)
7. **Mesajlar + Profil** — `features/messages/` (liste + sohbet),
   `features/profile/` (profil, düzenleme ekranları, bildirim ayarları,
   gizlilik/güvenlik, kaydedilmemiş değişiklik diyaloğu)

## 8. Grafik / native entegrasyon gereken noktalar

- **`WeightChartView` / `WaterWeeklyChartView`**: placeholder grafikler; host
  grafik paketiyle değiştirilebilir (prop şekilleri korunarak sarılabilir).
- **`components/Icon.js`**: host ikon kütüphanesiyle değiştirilecek.
- **Image picker**: `expo-image-picker` host tarafında entegre edilecek
  (kamera/galeri izinleri dahil).
- **Safe-area insets**: `AppScreen` iki yaklaşım sunar — `padTop` prop'u
  Android'de `StatusBar.currentHeight` kadar üst boşluk bırakır; `edges`
  prop'u (`{ top, bottom }`) sayısal ek padding kabul eder ve host'un
  `react-native-safe-area-context` insets'iyle beslenebilir.
- **`RefreshControl`**: `onRefresh` + `refreshing` prop'ları verildiğinde
  HomeView, MealPlanView, ProgressView ve MessagesListView'e bağlanır; state
  host'tadır.
- **`KeyboardAvoidingView`**: kasıtlı olarak host'a bırakılmıştır (AppScreen
  yalnızca `keyboardShouldPersistTaps="handled"` sağlar). ChatView composer'ı
  ve form ekranları için host stratejisi uygulanmalıdır.

## 9. Dokunulmaması gereken güvenlik akışları (Codex entegrasyonu)

Bu UI katmanını entegre ederken aşağıdakiler **mevcut mobil projede olduğu
gibi kalmalıdır**; bu katman bunlara dokunmaz ve değiştirmez:

- Auth token / session yönetimi (refresh, saklama, temizleme)
- Supabase RLS politikaları ve veri erişim kuralları
- Mevcut ViewModel'ler ve servis katmanı (UI yalnızca prop/callback ile bağlanır)
- Navigation root / auth gate yapısı

## 10. Taşınmayanlar

Web showcase'inden **taşınmayan** parçalar: `PhoneFrame` (web önizleme çerçevesi),
web navigation (React Router tabanlı showcase yönlendirmesi) ve static showcase
verisi (web'deki `dietbridge/data.ts` — yalnızca türetilmiş önizleme fixture'ı
`preview/previewData.js` olarak durur, production'a alınmaz).

## Dizin ağacı (özet)

```
mobile-ui-port/
├── theme/                 # colors, spacing, typography, radius, shadows
├── components/            # AppScreen, AppButton, AppCard, AppInput, AppSkeleton,
│                          # BottomSheetView, ChoiceChip, EmptyState, ErrorState,
│                          # Icon (placeholder), InlineAlert, ProgressBar, StatusBadge
├── features/
│   ├── home/              # HomeView + kartlar/durumlar
│   ├── meal-plan/         # MealPlanView, WeekHeader, DayStrip, MealListItem
│   ├── meal-detail/       # MealDetailView + fotoğraf sheet/yükleme/hata
│   ├── water/             # WaterSheetView
│   ├── status/            # FullScreenErrorView, ToastView, EmptyDataView, …
│   ├── onboarding/        # Splash → Register → ProfileSetup 1–4 → bağlantı durumları
│   ├── progress/          # ProgressView, grafikler, ölçüm sheet'leri, geçmiş
│   ├── messages/          # MessagesListView, ChatView + balon/composer
│   └── profile/           # ProfileView + düzenleme/ayar ekranları
├── preview/               # PreviewGallery + previewData (YALNIZCA geliştirme)
└── contracts/
    └── UI_CONTRACTS.md    # tüm görünümlerin prop/callback sözleşmeleri
```

## Doğrulama

Bu port aşağıdakileri **içermez**:

- HTML elementleri (`div`, `span`, `button`, …) — yalnızca `react-native`
  primitifleri kullanılır
- `className` / Tailwind — stiller yalnızca `StyleSheet.create` ile tanımlıdır
- Web import'ları: `react-dom`, `lucide-react` yok
- Web global'leri: `window`, `document`, `localStorage` yok
- Backend çağrıları: `supabase`, `fetch` yok

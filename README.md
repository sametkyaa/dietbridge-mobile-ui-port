# DietBridge Mobile UI Port

Bu repository, DietBridge mobile UI portunun **bağımsız denetim repository'sidir**
ve kökünde portun gerçekten bundle alabildiğini yeniden üretilebilir şekilde
kanıtlayan minimal bir **Expo audit harness'i** içerir.

## Kapsam

- Bu repository **ana DietBridge mobil uygulaması değildir**.
- Backend, Supabase, Auth, RPC, Storage, Realtime, fetch/axios, AsyncStorage
  **içermez** (bkz. `npm run audit:source` — bu kalıplar CI'da taranır).
- `mobile-ui-port/` klasörü UI-only React Native bileşenlerini içerir (`.js` + `.md`).
- `preview/` klasörü production runtime için **değildir**; yalnızca bileşen
  galerisi amaçlıdır ve production bundle'a dahil edilmemelidir.
- Entegrasyon, mevcut DietBridge ViewModel ve servis katmanı tarafından
  adapter üzerinden yapılacaktır.

## Expo audit harness

Repository kökü minimal bir Expo uygulamasıdır; `App.js` yalnızca
`mobile-ui-port/preview/PreviewGallery` bileşenini çalıştırır.
`mobile-ui-port/` kaynakları taşınmadan/kopyalanmadan kullanılır.

| Paket | Sürüm |
| --- | --- |
| expo | ~57.0.7 (SDK 57, kararlı) |
| react | 19.2.3 |
| react-native | 0.86.0 |
| @expo/vector-icons | ^15.1.1 |
| expo-font | ~57.0.1 (vector-icons font yükleyicisi) |

Dev bağımlılıkları: `babel-preset-expo` ~57.0.3, `expo-doctor` ^1.20.1.
Başka paket eklenmemiştir. Çalışma alanında mevcut DietBridge mobil
uygulamasının `package.json`ı bulunamadığı için güncel kararlı Expo SDK 57
kullanılmıştır.

### Kurulum ve çalıştırma

```bash
npm ci
npm start          # expo start — PreviewGallery'yi Expo Go ile açar
```

### Audit

```bash
npm run audit            # tüm doğrulama: source + doctor + android + ios
npm run audit:source     # mobile-ui-port production .js taraması (web/backend kalıntısı)
npm run audit:doctor     # expo-doctor
npm run audit:android    # expo export --platform android → dist-audit/android
npm run audit:ios        # expo export --platform ios → dist-audit/ios
```

`dist-audit/` `.gitignore`'dadır. Audit; secret, Expo login veya EAS build
gerektirmez.

### Kaynak taraması (`scripts/audit-source.js`)

`mobile-ui-port/` production `.js` dosyalarında şu kalıpları arar: HTML
elementleri (`<div`, `<span`, …), `className=`, `react-dom`, `lucide-react`,
`window.`, `document.`, `localStorage`, `supabase`, `fetch(`, `axios`,
`AsyncStorage`, `rpc(`, `.from(`, `auth.`, `storage.`, `channel(` ve
production dosyalarında `previewData` importu. `preview/` klasörü taramadan
ayrıdır; eşleşme bulunursa dosya+satır raporlanır ve script non-zero çıkar.

## CI

`.github/workflows/ui-audit.yml` — push (`main`, `kimi/**`) ve pull
request'lerde Node 20 ile `npm ci` + `npm run audit` çalıştırır. Sonuçlar
GitHub Actions sekmesinde görülür; secret/Expo login/EAS kullanılmaz.

## Host adapter gerektiren alanlar

- **Icon**: `components/Icon.js` artık gerçek bir adapter'dır
  (`@expo/vector-icons` → `MaterialCommunityIcons`, merkezi `ICON_MAP`).
  Host farklı ikon seti isterse yalnız bu dosyayı değiştirir; API
  (`name`, `size`, `color`, `style`, `accessible`) korunur.
- **Grafikler**: `WeightChartView` / `WaterWeeklyChartView` dependency-free
  placeholder'dır; host grafik paketiyle sarılabilir.
- **Image picker**: fotoğraf/avatar seçimi callback'tir; host
  `expo-image-picker` ekler.
- **Safe-area insets**: `AppScreen`'e `edges`/`padTop` ile beslenir
  (`react-native-safe-area-context` host'tadır).
- **Navigation**: hiçbir React Navigation root yoktur; tüm geçişler
  callback'tir.
- **Pending kilitleri**: öğün tamamlama (`updatingMealId` /
  `isCompletionUpdating`), su (`isAddingWater` / `isUndoingWater`), e-posta
  (`isChangingEmail`) ve form kaydetme (`isSaving` / `isSubmitting`)
  state'leri host ViewModel'de tutulur; UI optimistic state değiştirmez.

## Entegrasyon sınırları

- **Mevcut kilo**: `GoalEditView` mevcut kilo kaydetmez; `currentWeightKg`
  alanı o view'dan kaldırılmıştır. Mevcut kilo `ProgressView` →
  `AddWeightSheetView` üzerinden ayrı ölçüm akışına gider.
- **E-posta**: `PersonalInfoEditView` generic profil kaydıyla e-posta
  değiştirmez; e-posta salt okunur gösterilir ve "Değiştir" yalnız
  `onRequestEmailChange` callback'ini çağırır (ayrı Auth akışı host'tadır).
- **Öğün tamamlama**: UI callback'i host ViewModel'e gider; gerçek
  entegrasyonda mevcut güvenli meal completion RPC kullanılmalıdır — UI
  doğrudan tablo çağrısı yapmaz.
- **Uyku**: sayısal saat (`sleepHours`) olarak alınır; aralık doğrulaması
  host'tadır.
- **Gizlilik/güvenlik**: iki adımlı doğrulama, oturumlar, veri indirme ve
  hesap silme satırları `show*` flag'leri varsayılan `false` iken
  görünmez; backend hazır olunca host açar.

Detaylı prop/callback sözleşmeleri: `mobile-ui-port/contracts/UI_CONTRACTS.md`.

## Yapı

```text
├── mobile-ui-port/        # Denetim konusu: UI-only React Native portu
│   ├── theme/             # Renk, tipografi, spacing, radius, shadow token'ları
│   ├── components/        # Ortak UI bileşenleri
│   ├── features/          # Ekran bazlı view bileşenleri (home, meal-plan, ...)
│   ├── preview/           # Bileşen galerisi ve örnek veri (production değil)
│   ├── contracts/         # UI_CONTRACTS.md — ViewModel/servis sözleşmeleri
│   └── README.md
│
├── docs/                  # Tasarım sistemi ve uygulama promptu referansları
├── reference-showcase/    # Web showcase kaynakları (yalnız referans)
├── scripts/               # audit-source.js (kaynak taraması)
├── .github/workflows/     # ui-audit.yml (CI)
├── App.js                 # PreviewGallery'yi çalıştıran audit uygulaması
├── index.js / app.json / babel.config.js / metro.config.js
├── package.json / package-lock.json
├── .gitignore
├── README.md
└── MANIFEST.md
```

## Denetim notları

- `mobile-ui-port/` altında yalnızca `.js` ve `.md` dosyaları bulunur; `.ts`/`.tsx`/`.jsx` yoktur.
- `preview/previewData.js` yalnızca `preview/` içinden import edilir; production feature dosyaları import etmez.
- Hiçbir gerçek kullanıcı verisi, credential, `.env` veya backend yapılandırması içermez.
- Detaylı dosya listesi ve doğrulama sonuçları için `MANIFEST.md` dosyasına bakın.

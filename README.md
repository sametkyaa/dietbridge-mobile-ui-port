# DietBridge Mobile UI Port

Bu repository, DietBridge mobile UI portunun **bağımsız denetim repository'sidir**.

## Kapsam

- Bu repository **ana DietBridge mobil uygulaması değildir**.
- Backend, Supabase, Auth, RPC, Storage ve Realtime **içermez**.
- `mobile-ui-port/` klasörü UI-only React Native bileşenlerini içerir (`.js` + `.md`).
- `preview/` klasörü production runtime için **değildir**; yalnızca bileşen galerisi amaçlıdır.
- Entegrasyon, mevcut DietBridge ViewModel ve servis katmanı tarafından yapılacaktır.
- Icon, chart, image picker, safe-area ve keyboard entegrasyonları host uygulamaya bırakılmıştır.

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
├── .gitignore
├── README.md
└── MANIFEST.md
```

## Denetim notları

- `mobile-ui-port/` altında yalnızca `.js` ve `.md` dosyaları bulunur; `.ts`/`.tsx`/`.jsx` yoktur.
- `preview/previewData.js` yalnızca `preview/` içinden import edilir; production feature dosyaları import etmez.
- Hiçbir gerçek kullanıcı verisi, credential veya backend yapılandırması içermez.
- Detaylı dosya listesi ve doğrulama sonuçları için `MANIFEST.md` dosyasına bakın.

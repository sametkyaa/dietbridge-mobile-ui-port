# DietBridge — Tasarım Sistemi Dokümanı

> Kaynak: DietBridge Mobil Uygulaması Uçtan Uca UI/UX Tasarım Promptu (müşteri brief'i).
> Kapsam: Danışan mobil uygulaması, MVP (P0). Platform: React Native + Expo.
> Tasarım karakteri: sade, yumuşak, premium, ferah, organik, güven veren, mobil odaklı.

---

## 1. Renk Paleti

### 1.1. Marka renkleri

| Token | Hex | Kullanım |
|---|---|---|
| Primary / DietBridge Green | `#509F42` | Ana aksiyonlar, aktif durumlar, birincil vurgu |
| Primary Dark | `#34762D` | Primary'nin pressed/active hali, koyu vurgu |
| Primary Soft | `#EAF5E7` | Seçili durum arka planları, soft vurgu alanları |
| Primary Surface | `#F4FAF2` | Büyük yüzeylerde yeşil hissi veren açık zemin |
| Secondary Teal | `#4FA7A1` | İkincil vurgu (su takibi, bilgilendirici öğeler) |
| Secondary Soft | `#E8F6F4` | Teal'in soft arka plan hali |

### 1.2. Yüzey ve arka plan

| Token | Hex | Kullanım |
|---|---|---|
| Background | `#F7F8F6` | Uygulama genel zemini |
| Surface | `#FFFFFF` | Kartlar, bottom sheet, input zeminleri |
| Surface Muted | `#F0F3EE` | Ayrıştırıcı bloklar, skeleton zeminleri |

### 1.3. Metin

| Token | Hex | Kullanım |
|---|---|---|
| Text Primary | `#1E2820` | Başlıklar, ana içerik |
| Text Secondary | `#687168` | Destekleyici metin, ikincil bilgi |
| Text Tertiary | `#929B93` | Caption, placeholder, pasif durum |

### 1.4. Kenarlık ve fonksiyonel renkler

| Token | Hex | Kullanım |
|---|---|---|
| Border Soft | `#E2E7E1` | Kart kenarlıkları, ayraçlar |
| Success | `#3F9142` | Tamamlanma, başarılı işlem |
| Warning | `#C6872F` | Dikkat gerektiren ama kritik olmayan durum |
| Error | `#C65353` | Yalnızca gerçek hata ve kritik durum |
| Info | `#4C7FA8` | Bilgilendirme |

### 1.5. Renk kuralları

- Birincil yeşil yalnızca ana aksiyonlar ve aktif durumlar için; arayüzü tek başına kaplamaz.
- Büyük yüzeylerde saf yeşil yerine Primary Soft / Primary Surface kullanılır.
- Tamamlanmamış günlük hedefler **asla kırmızı gösterilmez**; nötr (Text Secondary/Tertiary) veya yönlendirici ton kullanılır.
- Error rengi yalnızca gerçek hata içindir; "öğünü kaçırdın" gibi durumlar hata değildir.
- Grafiklerde maksimum 4 anlamlı renk.
- Tüm metin–zemin kontrastları WCAG AA'yı karşılamalı (4.5:1 normal, 3:1 büyük metin).
- Dark mode MVP kapsamı dışındadır.

### 1.6. Anlam ayrımı (kritik kural)

Dört durum görsel olarak birbirinden ayrılmalıdır:

1. **"0" (gerçek sıfır değer):** sayısal olarak gösterilir, nötr.
2. **"Yok" (bilinçli boş değer):** "Yok" metni, Text Secondary.
3. **"Henüz veri yok" (bilinmeyen):** "Eklenmedi" / empty state, Text Tertiary.
4. **"Hedefe ulaşılamadı":** nötr-yönlendirici ton; Error rengi kullanılmaz.

---

## 2. Tipografi

### 2.1. Font ailesi

- iOS: SF Pro (sistem fontu)
- Android: Roboto (sistem fontu)
- Ortak tasarım referansı: **Inter** veya **Manrope**
- Web/prototip üretiminde Inter kullanılır.

### 2.2. Ölçek

| Stil | Boyut / Satır yüksekliği | Ağırlık | Kullanım |
|---|---|---|---|
| Display / Karşılama | 30px / 36px | Semibold (600) | Karşılama, günün selamlaması |
| Screen Title | 26px / 32px | Semibold | Ekran başlıkları |
| Section Title | 19px / 24px | Semibold | Bölüm başlıkları |
| Card Title | 17px / 22px | Medium–Semibold (500–600) | Kart başlıkları, öğün adları |
| Body | 15px / 22px | Regular (400) | Ana metin |
| Supporting Text | 13px / 18px | Regular | İkincil açıklamalar |
| Caption | 12px / 16px | Medium (500) | Zaman etiketleri, metadata |
| Button | 15–16px / 20px | Semibold | Buton metinleri |
| Numeric Highlight | 28px / 34px | Semibold | Kilo, su miktarı gibi sayısal vurgular |

### 2.3. Kurallar

- Türkçe uzun metinlerde satır yüksekliği rahat tutulur (Body 15/22 gibi).
- Tamamı büyük harf metin kullanılmaz.
- Bir ekranda en fazla 3–4 belirgin tipografi seviyesi.
- Sayısal sağlık metrikleri okunaklı ama agresif olmayan biçimde öne çıkar.
- Dinamik font büyütmede layout bozulmamalı.

---

## 3. Spacing, Grid ve Yüzey Sistemi

### 3.1. Spacing ölçeği (4px tabanlı)

`4 / 8 / 12 / 16 / 20 / 24 / 32 / 40`

- Ana ekran yatay padding: **20px** (küçük cihazda min 16px)
- Bölümler arası: **24–32px**
- Kart içi padding: **16–20px**
- Liste öğeleri arası: **12–16px**

### 3.2. Köşe yarıçapları

| Bileşen | Radius |
|---|---|
| Small control | 10–12px |
| Input / chip | 12–14px |
| Standard card | 18–20px |
| Hero card | 22–24px |
| Bottom sheet (üst köşeler) | 24–28px |
| Circular control | Tam daire |

Tutarlılık kuralı: aynı tür bileşenlerde aynı radius; her bileşene farklı radius verilmez.

### 3.3. Gölge ve border

- Kart ayrımında öncelik: yüzey kontrastı + spacing.
- Gölge gerekirse: düşük opaklık (%6–10), geniş blur (16–24px), Y offset 2–4px.
- Border rengi her zaman Border Soft (`#E2E7E1`).
- Aynı kartta sert border + güçlü gölge birlikte kullanılmaz.

---

## 4. İkonografi

- Tek ikon ailesi: **Lucide** (alternatif: Phosphor) — sade line icon.
- Stroke kalınlığı tüm ikonlarda tutarlı (1.5–2px eşdeğeri).
- Ana aksiyon ikonları: 20–24px; yardımcı ikonlar: 16–20px.
- Dokunma alanı ikon boyutundan bağımsız **min 44×44px**.
- İkonlar işlevseldir; yalnızca estetik amaçlı ikon kullanılmaz.
- Avatar yoksa baş harf avatarı (Primary Soft zemin + Primary Dark harf) kullanılır.

---

## 5. Bileşen Stilleri

### 5.1. Butonlar

**Primary Button**
- Zemin: Primary `#509F42`, metin: `#FFFFFF`
- Yükseklik: 52px, radius: 14px, yatay padding: 20px
- Pressed: Primary Dark `#34762D`
- Disabled: Surface Muted zemin + Text Tertiary metin
- Loading: spinner + buton ikinci gönderimi engeller

**Secondary Button**
- Zemin: Primary Soft `#EAF5E7`, metin: Primary Dark
- Kenarlık yok; yükseklik 52px, radius 14px

**Tertiary / Text Button**
- Yalnızca metin: Primary, min dokunma alanı 44px

**Icon Button**
- 44×44px dokunma alanı, ikon 20–24px, Text Primary; pressed'de Surface Muted zemin

### 5.2. Input'lar

**Text Input**
- Yükseklik: 52px, radius: 12–14px, zemin: Surface
- Border: 1px Border Soft; focused: 1.5px Primary
- Placeholder: Text Tertiary; label her zaman görünür (placeholder label yerine geçmez)
- Hata: border Error + alanın altında alanla ilişkili hata metni (Supporting Text, Error)

**Password Input:** Text Input + göster/gizle ikon butonu (44px dokunma alanı).

**Numeric Input (kilo/su):** büyük puntolu (Numeric Highlight), birim (kg / ml / L) metin yanında ayrık ama ilişkili.

**Search Input:** sol ikonlu, chip seçim ekranlarında liste filtreleme için.

### 5.3. Chip'ler

**Choice Chip (tekli seçim)**
- Default: Surface zemin, Border Soft kenarlık, Text Primary
- Selected: Primary Soft zemin, Primary kenarlık, Primary Dark metin
- Yükseklik: 36–40px, radius 12–14px

**Multi-select Chip:** Choice Chip + seçiliyken sol tarafta küçük check ikonu. Kullanıcı özel değer ekleyebilir; duplicate engellenir; silme kolay ve geri alınabilir.

### 5.4. Status Badge

- Pill form, Caption metin, ikon + metin birlikte (yalnız renkle anlatım yok)
- Tamamlandı: Primary Soft zemin + Success metin/ikon
- Yaklaşan: Secondary Soft zemin + Secondary Teal metin ("45 dk sonra")
- Bekliyor: Surface Muted zemin + Text Secondary
- Gecikmiş: Warning'in soft hali + Warning metin (kırmızı değil)

### 5.5. Kartlar

**Standard Card:** Surface zemin, radius 18–20px, padding 16–20px, 1px Border Soft veya çok hafif gölge (ikisi birden değil).

**Upcoming Meal Hero Card:** radius 22–24px; içerik: öğün türü (Caption badge), saat, öğün adı (Card Title), kısa içerik özeti (Supporting Text, max 2 satır), varsa küçük gerçekçi yemek görseli (sağda, ~64–80px, radius 12px), zaman etiketi. Kartın tamamı tıklanabilir; ekranı domine etmez ama ilk bakışta ana öğedir.

**Meal Card (liste öğesi):** kronolojik listede; tür + saat + başlık + durum badge'i; tamamlanan öğünler görünür ama daha sakin (azaltılmış kontrast, sakin check).

**Daily Progress Card:** 4–6 ayrı metrik kutusuna bölünmez; bir veya iki birleşik bileşen. İçerik: tamamlanan öğün ("2/3 öğün"), su ilerlemesi, plan durumu.

**Water Progress Control:** hedef (ör. 2,5 L) + içilen miktar (Numeric Highlight) + hızlı ekle butonları (+200 ml, +250 ml) + geri alma erişimi. Büyük bardak ikonlarıyla çocuklaştırılmaz. Progress bar: Secondary Teal.

**Measurement Summary Card:** mevcut kilo (Numeric Highlight), başlangıç, hedef, toplam değişim, son ölçüm tarihi.

**Dietitian Profile Card:** avatar, ad soyad, uzmanlık (varsa), "Mesaj gönder" aksiyonu, bağlantı durumu badge'i.

### 5.6. Mesajlaşma

**Message Bubble**
- Danışan (giden): Primary zemin, beyaz metin, sağda
- Diyetisyen (gelen): Surface Muted zemin, Text Primary, solda
- Radius: 18px (kuyruk tarafı köşesi 6px), max genişlik ~%78
- Durum ikonları: gönderiliyor (saat), gönderildi (tek check), iletildi/okundu (çift check), başarısız (ünlem + "Tekrar dene")

**Message Composer:** metin inputu + görsel ekle butonu + gönder butonu; klavye açıldığında composer görünür kalır; multiline büyür (max 4–5 satır).

### 5.7. Bottom Sheet

- Üst köşeler 24–28px radius, üstte drag handle (36×4px, Border Soft)
- Açılış/kapanış: 250–350ms
- Kullanım: su ekleme, kilo ekleme, fotoğraf seçici (kamera/galeri)
- Alt navigasyon ve gesture alanlarıyla çakışmaz

### 5.8. Geri bildirim bileşenleri

**Toast / Snackbar:** ekran altında, kısa (2.5–4sn), tek satır + gerekiyorsa tek aksiyon ("Geri al"). Başarı: nötr koyu zemin; hata: Error vurgulu ama abartısız.

**Inline Alert:** bölüm içi hata/bilgi; tam ekranı bloke etmez. Info: Secondary Soft; Error: Error'un soft zemini + Error ikon.

**Confirmation Dialog:** kaydetmeden çıkış, geri alma gibi durumlarda; başlık + tek cümle açıklama + iki aksiyon.

**Upload Progress:** fotoğraf yüklemede lineer progress + yüzde; başarısızlıkta açık hata + "Tekrar dene". Başarısız upload asla başarılı görünmez.

**Skeleton Loader:** Surface Muted bloklar, hafif shimmer; boş ekran veya sonsuz spinner yerine.

**Empty State:** sade ikon/illüstrasyon + tek cümle açıklama + varsa tek aksiyon. Örnek: "Bugün için planlanmış öğün bulunmuyor."

**Error State (tam ekran):** yalnızca ekran gerçekten kullanılamıyorsa; ne olduğu + kullanıcının ne yapabileceği + "Tekrar dene". Teknik hata kodu gösterilmez.

### 5.9. Navigasyon

**Bottom Navigation (5 sekme):** Ana Sayfa, Planım, Mesajlar, İlerleme, Profil.
- Aktif sekme: Primary ikon + Semibold label (yalnız renkle ayrılmaz)
- Pasif: Text Tertiary ikon + Regular label
- Safe area uyumlu; detay/modal/odak ekranlarında gizlenebilir

**Top App Bar:** Screen Title + geri butonu (detay ekranlarında) + maksimum 1–2 trailing aksiyon.

**Date Strip (haftalık plan):** yatay kaydırılabilir 7 günlük strip; seçili gün Primary Soft zeminle, bugün ayrıca küçük bir göstergeyle (nokta/alt çizgi) işaretli. Gün etiketleri ("Pzt, Sal...") ezilmeden okunabilir; 7 gün × 4 öğün tablosu **yapılmaz**.

**Section Header:** Section Title + opsiyonel tek trailing aksiyon ("Tümünü gör").

---

## 6. Motion Sistemi

| Tür | Süre | Easing |
|---|---|---|
| Micro interaction | 120–180ms | ease-out |
| Standard transition | 200–280ms | ease-out |
| Bottom sheet | 250–350ms | ease-out |
| Success feedback | 300–500ms | ease-in-out |

**İzin verilen mikro etkileşimler:** öğün tamamlanınca check animasyonu, su eklemede kontrollü progress artışı, kart press state, bottom sheet açılış/kapanış, yeni mesajın sakin belirmesi, pull-to-refresh, ölçüm kaydında kısa başarı geri bildirimi.

**Yasaklar:** aşırı bounce, her navigasyonda farklı animasyon, uzun splash animasyonu (max 500–700ms), konfeti/gamification patlamaları, hareket azaltma tercihini yok sayma.

## 7. Haptic Feedback

Yalnızca: öğün tamamlandı, ölçüm kaydedildi, önemli seçim/toggle, gerektiğinde hata. Scroll, chip seçimi ve tuş basımlarında haptic yok.

## 8. Erişilebilirlik

- Min dokunma alanı 44×44px
- WCAG AA kontrast
- Durum yalnız renkle anlatılmaz (ikon + metin)
- Anlamlı ekran okuyucu label'ları; hata mesajları alanlarla ilişkilendirilir
- Grafikler metinsel özetle sunulur
- Türkçe uzun metinlerde taşma kontrolü
- Azaltılmış hareket tercihi desteklenir
- Klavye açıkken CTA görünür kalır; odak davranışları erişilebilir

## 9. İçerik Dili

Tüm kullanıcı metinleri Türkçe; ton: sakin, destekleyici, açık, profesyonel, yargılamayan, kısa.

**Doğru örnekler:** "Sıradaki öğünün 45 dakika sonra." / "Bugün 3 öğünden 2'sini tamamladın." / "250 ml su eklendi." / "Mesaj gönderilemedi. Tekrar deneyebilirsin."

**Yasak örnekler:** "Başarısız oldun." / "Hedefini kaçırdın!" / "Harika!!! Muhteşemsin!!!" / "Bir hata oluştu. Kod: PGRST116"

## 10. Kaçınılacaklar (görsel kırmızı çizgiler)

Aşırı gradient, neon renk, yoğun glassmorphism, her bileşende farklı renk, 3D illüstrasyon, dekoratif blob'lar, içerikten baskın grafikler, çoklu gölge katmanı, kalın siyah border, aynı ekranda çok CTA, sıkışık metin, kart içinde kart içinde kart, yatay taşan haftalık tablo, aşırı gamification, suçlayıcı kırmızı uyarılar, lorem ipsum / gerçek dışı veri.

# UI Sözleşmeleri — mobile-ui-port

Bu dosya, `mobile-ui-port/` altındaki tüm ana görünümlerin **gerçek** prop ve
callback sözleşmelerini belgeler. Tüm içerik kaynak koddan türetilmiştir; hiçbir
prop uydurulmamıştır.

Genel kurallar (tüm bileşenler için geçerli):

- Hiçbir bileşen backend çağrısı yapmaz; tüm veri prop'larla gelir, tüm
  etkileşimler callback'lerle dışarı taşar.
- Controlled form deseni: giriş değerleri prop olarak verilir, değişiklikler
  `on…Change` callback'leriyle host'a bildirilir. Doğrulama mantığı host'tadır;
  hata mesajları prop olarak gelir.
- `status` prop'u taşıyan ekranlarda `'loading' | 'ready' | 'empty' | 'error'`
  değerleri kullanılır (her ekranın kendi bölümünde hangilerinin desteklendiği
  belirtilmiştir).
- Metin etiketi prop'ları (label/title/description) varsayılan Türkçe
  değerlerle gelir; host bunları geçersiz kılabilir. Aşağıda yalnızca davranışı
  etkileyen metin prop'ları listelenmiştir.
- Alt bileşenler (kartlar, balonlar, liste satırları) ait oldukları ana
  görünümün bölümünde kısaca gruplanmıştır.
- **Öğün tamamlama**: UI callback'i (`onToggleMeal`, `onUndoMeal`,
  `onToggleComplete`) yalnız host ViewModel'e gider. Gerçek entegrasyonda
  mevcut güvenli meal completion RPC kullanılmalıdır; UI doğrudan
  `meals.update` veya herhangi bir tablo çağrısı YAPMAZ.
- **Pending kilitleri**: İşlemi süren kayıt host'tan pending prop'larıyla
  gelir (`updatingMealId`, `isMealUpdating`, `isCompletionUpdating`,
  `isAddingWater`, `isUndoingWater`, `isChangingEmail`). İşlem sürerken ilgili
  buton disabled olur, `accessibilityState.busy=true` yansır ve callback tekrar
  çağrılmaz. UI bu katmanda state'i optimistic olarak değiştirmez; gerçek
  sonuç host'tan props ile gelir.
- **Mevcut kilo**: `GoalEditView` mevcut kilo kaydetmez. Mevcut kilo
  değişikliği ayrı ölçüm akışından geçer (`ProgressView` +
  `AddWeightSheetView`); generic profil `onSave` callback'i kilo güncellemesi
  gerektirmez.
- **E-posta**: `PersonalInfoEditView` generic profil save ile e-posta
  değiştirmez. E-posta değişikliği ayrı Auth akışı gerektirir
  (`onRequestEmailChange` callback'i).
- **Preview**: `PreviewGallery` ve `previewData` production bundle'a dahil
  EDİLMEMELİDİR; yalnız audit/önizleme amaçlıdır. Production feature
  dosyaları `preview/` altından import yapmaz.
- **Icon adapter**: Tüm ikonlar `components/Icon.js` üzerinden semantic
  adlarla kullanılır; Unicode/emoji glyph YOKTUR. Adapter varsayılan olarak
  `@expo/vector-icons` (MaterialCommunityIcons) kullanır. Host farklı bir ikon
  seti isterse yalnız bu dosya değiştirilir.

---

## HomeView (`features/home/HomeView.js`)

### Data props
- `status`: `'loading' | 'ready' | 'empty' | 'error'` (varsayılan `'ready'`)
- `isOffline`: boolean — üstte `OfflineBanner` gösterir (loading dışında)
- `user`: `{ firstName, initials }`
- `greeting`: string (yoksa `İyi günler, {firstName}` türetilir)
- `dateLabel`: string
- `hasUnreadNotifications`: boolean
- `macros`: `{ rows: [...], completedCount }` (DailyMacrosCard formatı)
- `nextMeal`: `{ id, time, type, title, icon, status, badgeLabel? }`
- `nextMealSummary`: string — hero kart kısa içerik özeti
- `meals`: günün öğün listesi (MealListItem formatı)
- `water`: `{ drunkLabel, goalLabel, percent, quickOptions? }` — quickOptions
  `[{ id, amountMl, label }]`
- `dietitianMessage`: `{ name, initials, metaLabel, text }`
- `dayCompletion`: `{ allCompleted, title?, description? }`
- `refreshing`: boolean (RefreshControl için)
- `updatingMealId`: string | null — toggle işlemi süren öğünün id'si
- `isMealUpdating`: boolean — hero kart tamamlama/geri al işlemi sürüyor
- `isAddingWater`: boolean — hızlı su ekleme sürüyor
- `isUndoingWater`: boolean — su geri alma sürüyor

### Callbacks
- `onNotificationPress()` · `onAvatarPress()`
- `onMealPress(mealId)` — satır basışı (MealListItem `meal.id` iletir)
- `onToggleMeal(mealId)` — tamamla dairesi / hero "yedim" aksiyonu
- `onUndoMeal(mealId)` — hero kart geri al
- `onAddWater(amountMl)` — hızlı miktar düğmeleri
- `onUndoWater()` · `onOpenWaterHistory()`
- `onOpenMessages()` · `onOpenPlan()` · `onRetry()` · `onRefresh()`

### Loading durumu
`status='loading'` → `HomeSkeleton` (animated, TEK ortak animasyon döngüsü)
tam içerik yerine gösterilir.

### Empty durumu
`status='empty'` → header + `HomeEmptyState` (aksiyonu `onOpenMessages`'a
bağlı) + su kartı kullanılabilir kalır.

### Error durumu
`status='error'` → `HomeErrorState` (`onRetry` ile).

### Disabled/submitting durumu
Pending prop'ları host'tan gelir ve ilgili kontrolleri kilitler:

| Pending prop | Kilitlenen kontrol | Disabled buton |
| --- | --- | --- |
| `updatingMealId` | o öğünün `MealListItem` toggle'ı (+ aynı öğünse hero CTA) | toggle dairesi |
| `isMealUpdating` | `NextMealCard` "Öğünü yedim" / "Geri al" | ana CTA (spinner) + geri al |
| `isAddingWater` | tüm hızlı su ekleme düğmeleri | quick düğmeler (spinner) |
| `isUndoingWater` | su geri al düğmesi | geri al (spinner) |

İşlem sürerken `accessibilityState.busy=true` yansır, callback tekrar
çağrılmaz; diğer öğünler/kontroller kullanılabilir kalır.

### Backend notu
Dashboard/ana sayfa ViewModel'i bağlanır (öğün planı, makrolar, su özeti,
diyetisyen mesajı özeti). Öğün tamamlama host'ta güvenli meal completion
RPC'sine bağlanır; bu bileşen backend çağrısı yapmaz.

### Navigation ihtiyacı
`onNotificationPress` → bildirimler, `onAvatarPress` → profil,
`onMealPress` → öğün detay, `onOpenPlan` → plan sekmesi, `onOpenMessages` →
mesajlar, `onOpenWaterHistory` → su geçmişi/sheet.

### Özel entegrasyon riski
- `RefreshControl`: `onRefresh` verilirse bağlanır; pull-to-refresh state'i
  (`refreshing`) host'ta tutulur.
- `isOffline` bayrağının bağlantı durumu servisinden beslenmesi gerekir.
- `TodayMealsList` FlatList KULLANMAZ; satırlar düz `View` içinde gerçek
  `meal.id` key'iyle render edilir — HomeView ScrollView'ı içinde iç içe
  VirtualizedList uyarısı oluşmaz.
- `MealListItem` satırı iki KARDEŞ Pressable'dan oluşur (detay alanı +
  toggle); iç içe Pressable yoktur, toggle basışı detay navigasyonunu
  tetiklemez.
- Alt bileşenler: `GreetingHeader`, `DailyMacrosCard`, `NextMealCard`
  (durumu prop'lardan türetilir: `dayCompleted | none | completed | delayed |
  upcoming`), `WaterCard`, `TodayMealsList`, `DietitianMessageCard`,
  `HomeSkeleton`, `HomeEmptyState`, `HomeErrorState`, `OfflineBanner`.

---

## MealPlanView (`features/meal-plan/MealPlanView.js`)

### Data props
- `title`, `todayLabel`, `weekLabel`: metinler
- `days`: `[{ id, dayLabel, dateLabel, isToday?, isCompleted? }]`
- `selectedDayId`, `selectedDayLabel`
- `meals`: seçili günün öğünleri (MealListItem formatı)
- `status`: `'loading' | 'ready' | 'empty' | 'error'`
- `showUpdatedNotice`: boolean — plan güncellendi bilgi şeridi
- `updatedMessage`, `planUpdatedAt`: şerit metni (`planUpdatedAt` varsa
  `… · {planUpdatedAt}` biçiminde eklenir)
- `emptyTitle`, `emptyDescription` (gün boş), `weekEmptyTitle`,
  `weekEmptyDescription` (hafta boş)
- `errorTitle`, `errorDescription`: error durumu metinleri
- `updatingMealId`: string | null — toggle işlemi süren öğünün id'si
- `refreshing`: boolean

### Callbacks
- `onSelectDay(dayId)` · `onPreviousWeek()` · `onNextWeek()` · `onTodayPress()`
- `onMealPress(mealId)` · `onToggleMeal(mealId)`
- `onBack()` — ayrılmıştır; görünüm kendi geri düğmesini çizmez (sekme kökü)
- `onRetry()` — error durumunda "Tekrar dene"
- `onRefresh()` — RefreshControl bağlanır

### Loading durumu
`status='loading'` → `PlanSkeleton` (AppSkeleton satırları).

### Empty durumu
İki seviye: `status='empty'` → haftanın tamamı boş (tam sayfa EmptyState kartı);
`status='ready'` ama seçili günde öğün yok → listenin `ListEmptyComponent`'i
olarak kart içi EmptyState.

### Error durumu
`status='error'` → `ErrorState` (`errorTitle` + `errorDescription` +
`onRetry`).

### Disabled/submitting durumu
`updatingMealId` verildiğinde yalnız o öğünün `MealListItem` toggle'ı
disabled olur (`accessibilityState.busy=true`), callback tekrar çağrılmaz;
diğer öğünler kullanılabilir kalır.

### Backend notu
Haftalık plan ViewModel'i bağlanır (gün listesi, seçili gün öğünleri, plan
güncelleme bildirimi). Öğün tamamlama host'ta güvenli meal completion
RPC'sine bağlanır; bu bileşen backend çağrısı yapmaz.

### Navigation ihtiyacı
`onMealPress` → öğün detay ekranı. `onBack` host navigasyon başlığına
bağlanmak için ayrılmıştır.

### Özel entegrasyon riski
- `FlatList` + `RefreshControl`; hafta gezinmesi (`onPreviousWeek`/`onNextWeek`)
  host state'indedir.
- Plan güncellendi şeridinin gerçek zamanlı güncelleme (realtime) akışına
  bağlanması host'un sorumluluğundadır.
- Alt bileşenler: `WeekHeader`, `DayStrip`, `MealListItem` (satır basışı
  `onPress(meal.id)`, tamamla dairesi `onToggle(meal.id)`).

---

## MealDetailView (`features/meal-detail/MealDetailView.js`)

### Data props
- `meal`: `{ time, type, title, icon?, badgeLabel?, contents: string[], note,
  dietitian: { name, initials }, macros: [{ label, value }],
  photo: { status: 'none' | 'ready', uri? } }`
- `status`: `'loading' | 'ready' | 'error'`
- `completionState`: `'pending' | 'completed'`
- `isCompletionUpdating`: boolean — tamamlama/geri al işlemi sürüyor
- `title`, `completedBadgeLabel` (örn. "Tamamlandı · 13:38")
- Metin prop'ları: `markEatenLabel`, `completedLabel`, `undoLabel`,
  `contentsTitle`, `addPhotoLabel`, `retakePhotoLabel`, `removePhotoLabel`

### Callbacks
- `onBack()`
- `onToggleComplete()` — "Öğünü yedim" ve tamamlandı durumunda "Geri al"
- `onAddPhoto()` · `onRetakePhoto()` · `onRemovePhoto()`
- `onRetry()` — error durumunda

### Loading durumu
`status='loading'` → header + `DetailSkeleton`.

### Empty durumu
Ayrı empty durumu yok; `meal` null/undefined ise error durumu gösterilir.
`photo.status='none'` iken fotoğraf alanında placeholder (ikonlu daire) çizilir.

### Error durumu
`status='error'` veya `!meal` → `ErrorState` ("Öğün bilgisi yüklenemedi" +
`onRetry`).

### Disabled/submitting durumu
`isCompletionUpdating=true` iken "Öğünü yedim" CTA'sı spinner'a geçer ve
disabled olur; tamamlandı durumundaki "Geri al" butonu da kilitlenir
(`accessibilityState.busy=true`). Callback işlem sürerken tekrar çağrılmaz.

### Backend notu
Öğün detay ViewModel'i + öğün tamamlama servisi + fotoğraf storage akışı
bağlanır. `onToggleComplete` yalnız host ViewModel'e gider; gerçek
entegrasyonda mevcut güvenli meal completion RPC kullanılmalıdır. UI doğrudan
`meals.update` çağrısı YAPMAZ.

### Navigation ihtiyacı
`onBack` → önceki ekran (plan veya ana sayfa).

### Özel entegrasyon riski
- **Image picker paketi**: `onAddPhoto`/`onRetakePhoto` host'un
  `expo-image-picker` akışına bağlanır; bu görünüm yalnızca callback tetikler.
- Fotoğraf yükleme/hata durumları ayrı sheet bileşenlerindedir
  (`MealPhotoSheetView`, `MealPhotoUploadingView`, `MealPhotoErrorView`).
- `meal.photo.uri` doğrudan `Image source` olarak kullanılır; remote URI
  için cache stratejisi host'a aittir.

---

## WaterSheetView (`features/water/WaterSheetView.js`)

### Data props
- `visible`: boolean (BottomSheetView görünürlüğü)
- `currentMl`, `goalMl`: sayısal (litre metni bileşen içinde `1,4` biçiminde
  biçimlenir)
- `quickOptions`: `[{ id, amountMl, label }]` (varsayılan 200/250/500 ml)
- `lastEntryLabel`: string — verilirse "geri al" satırı görünür
- `isAddingWater`: boolean — hızlı ekleme sürüyor
- `isUndoingWater`: boolean — geri alma sürüyor
- Metin prop'ları: `title`, `goalSuffix`, `undoLabel`, `historyLabel`,
  `doneLabel`

### Callbacks
- `onAddWater(amountMl)` — hızlı miktar düğmeleri
- `onUndoWater()` — son kaydı geri al
- `onOpenHistory()` — geçmiş bağlantısı
- `onClose()` — sheet kapatma + "Tamam" düğmesi

### Loading durumu
Yok.

### Empty durumu
Yok; `goalMl=0` ise yüzde 0 hesaplanır.

### Error durumu
Yok.

### Disabled/submitting durumu
`isAddingWater=true` iken TÜM hızlı ekleme düğmeleri disabled olur ve
spinner gösterir (`accessibilityState.busy=true`); `isUndoingWater=true` iken
geri al düğmesi kilitlenir. Callback aynı işlem sürerken tekrar çağrılmaz.
Su state'i bu katmanda optimistic olarak değiştirilmez; host gerçek sonucu
props ile gönderir.

### Backend notu
Su takibi ViewModel'i bağlanır (günlük toplam, hızlı ekleme, geri alma,
geçmiş). Bu bileşen backend çağrısı yapmaz.

### Navigation ihtiyacı
`onOpenHistory` → su geçmişi ekranı (veya ilgili sheet).

### Özel entegrasyon riski
- **Modal sunumu**: `BottomSheetView` RN `Modal` tabanlıdır; sunum/stack
  davranışı host navigasyonuyla uyumlandırılmalıdır.

---

## MealPhotoSheetView (`features/meal-detail/MealPhotoSheetView.js`)

### Data props
- `visible`: boolean
- Metin prop'ları: `title`, `description`, `cameraLabel`, `galleryLabel`,
  `dismissLabel`

### Callbacks
- `onPickCamera()` · `onPickGallery()` · `onClose()` (arka plan + "Şimdi değil")

### Loading / Empty / Error durumu
Yok.

### Disabled/submitting durumu
Yok.

### Backend notu
Doğrudan backend bağlanmaz; callback'ler host'un medya seçme akışına gider.
Bu bileşen backend çağrısı yapmaz.

### Navigation ihtiyacı
Yok (mevcut ekran üstünde sheet).

### Özel entegrasyon riski
- **Image picker paketi**: `onPickCamera`/`onPickGallery` `expo-image-picker`
  (kamera + galeri izinleri dahil) entegrasyonuna bağlanacaktır; şu an yalnızca
  callback'tir.
- Modal sunumu host'a aittir.

---

## MealPhotoUploadingView (`features/meal-detail/MealPhotoUploadingView.js`)

### Data props
- `visible`: boolean
- `fileName`, `fileSizeLabel`: seçilen dosya özeti
- `progress`: 0–100 (bileşen içinde clamp'lenir)
- `note`: bilgi metni · `cancelLabel`

### Callbacks
- `onCancel()` — iptal düğmesi; `onClose` verilmezse sheet kapatma da buna düşer
- `onClose()`

### Loading durumu
Bileşenin kendisi yükleme durumudur: `ProgressBar` + yüzde metni.

### Empty / Error durumu
Yok (hata için `MealPhotoErrorView` kullanılır).

### Disabled/submitting durumu
Yükleme sürerken kullanıcı yalnızca iptal edebilir; başka etkileşim yoktur.

### Backend notu
Fotoğraf yükleme servisi (storage upload + ilerleme bildirimi) bağlanır.
Bu bileşen backend çağrısı yapmaz.

### Navigation ihtiyacı
Yok.

### Özel entegrasyon riski
- Upload ilerlemesinin (`progress`) host upload istemcisinden beslenmesi
  gerekir; iptal, devam eden isteği abort etmelidir.

---

## MealPhotoErrorView (`features/meal-detail/MealPhotoErrorView.js`)

### Data props
- `visible`: boolean
- `fileName`, `fileSizeLabel`, `failedSuffix` (varsayılan "Yüklenemedi")
- `message`: dostça hata metni (teknik kod gösterilmez)
- `retryLabel`, `removeLabel`

### Callbacks
- `onRetry()` — tekrar dene (primary)
- `onRemove()` — vazgeç (text)
- `onClose()`

### Loading / Empty durumu
Yok.

### Error durumu
Bileşenin kendisi hata durumudur; başarısız yükleme asla başarılı görünmez
(soluk dosya özeti + error InlineAlert).

### Disabled/submitting durumu
Yok.

### Backend notu
Fotoğraf yükleme servisinin hata dalı bağlanır. Bu bileşen backend çağrısı
yapmaz.

### Navigation ihtiyacı
Yok.

### Özel entegrasyon riski
Yok (standart Modal/BottomSheet sunumu).

---

## FullScreenErrorView / ToastView (status grubu, özet)

`features/status/` altındaki paylaşılan durum bileşenleri:

- **FullScreenErrorView** (`FullScreenErrorView.js`): `variant:
  'offline' | 'server' | 'generic'` (varsayılan metinler variant'tan gelir,
  `title`/`description` ile geçersiz kılınır), `retryLabel`, `backLabel`,
  `onRetry`, `onBack`, `style`. Teknik hata kodu gösterilmez. Ekran gerçekten
  kullanılamadığında tam ekran; kısmi hatalar için `InlineAlert` tercih edilir.
- **ToastView** (`ToastView.js`): `variant: 'info' | 'success' | 'warning' |
  'error'`, `message`, `actionLabel`, `onAction`, `visible`, `style`.
  **Otomatik kapanma timer'ı YOKTUR** — görünürlüğü ve konumlandırmayı (örn.
  ekran altında absolute kapsayıcı) host yönetir.
- Alt bileşenler: `EmptyDataView` (ikon + başlık + açıklama + opsiyonel CTA)
  ve `PullToRefreshHint`; bunlar ana ekranlar tarafından yeniden kullanılır.

Backend notu: genel hata/bildirim sunumu; herhangi bir servise doğrudan
bağlanmaz. Navigation: `FullScreenErrorView.onBack` host'un geri aksiyonuna
bağlanır.

---

## SplashView (`features/onboarding/SplashView.js`)

### Data props
- `appName`, `tagline`, `loadingLabel`: metin özelleştirmesi

### Callbacks
Yok (tamamen statik görünüm; üç nokta `Animated` döngüsüyle yanıp söner,
sonsuz spinner yok).

### Loading durumu
Bileşenin kendisi yükleme/açılış durumudur.

### Empty / Error / Disabled durumu
Yok.

### Backend notu
Auth session bootstrap (oturum kontrolü) host'ta tamamlanır; sonuca göre host
yönlendirir. Bu bileşen backend çağrısı yapmaz.

### Navigation ihtiyacı
Callback yoktur; host splash'tan auth veya ana akışa kendisi geçer.

### Özel entegrasyon riski
Yok.

---

## WelcomeView (`features/onboarding/WelcomeView.js`)

### Data props
- `nextMeal`: `{ badgeLabel, timeLabel, title }` — sade ürün önizlemesi
- `dietitianTip`: `{ initials, text }`
- Metin prop'ları: `headline`, `description`, `registerLabel`, `loginLabel`

### Callbacks
- `onRegister()` · `onLogin()`

### Loading / Empty / Error / Disabled durumu
Yok.

### Backend notu
Backend bağlanmaz; önizleme içeriği statik/showcase amaçlıdır. Bu bileşen
backend çağrısı yapmaz.

### Navigation ihtiyacı
`onRegister` → kayıt ekranı, `onLogin` → giriş ekranı.

### Özel entegrasyon riski
Yok.

---

## LoginView (`features/onboarding/LoginView.js`)

### Data props
- `email`, `password`: controlled string
- `isPasswordVisible`: boolean
- `isSubmitting`: boolean
- `emailError`, `passwordError`: alan bazlı hata metinleri
- `generalError`: genel hata (error InlineAlert — GirisHata port'u)
- `isOffline`: boolean (info InlineAlert + buton "Tekrar dene" olur —
  GirisBaglantiHatasi port'u)

### Callbacks
- `onEmailChange(text)` · `onPasswordChange(text)` · `onTogglePassword()`
- `onSubmit()` · `onForgotPassword()` · `onRegister()`

### Loading durumu
Yok (ayrı loading ekranı yok).

### Empty durumu
Yok.

### Error durumu
`generalError` → error InlineAlert; `isOffline` → info InlineAlert ve buton
etiketi "Tekrar dene" olur.

### Disabled/submitting durumu
`isSubmitting=true` → buton `loading` spinner'ına geçer ("Giriş yapılıyor…"),
çift gönderim engellenir.

### Backend notu
Auth flow (giriş ViewModel'i) bağlanır; doğrulama ve auth mantığı host'tadır.
Bu bileşen backend çağrısı yapmaz.

### Navigation ihtiyacı
`onForgotPassword` → şifre sıfırlama, `onRegister` → kayıt ekranı.

### Özel entegrasyon riski
- Klavye açıkken formun kayması için `KeyboardAvoidingView` host'a bırakılmıştır
  (AppScreen `keyboardShouldPersistTaps="handled"` sağlar).
- Alt bileşen: `PasswordToggle`.

---

## RegisterView (`features/onboarding/RegisterView.js`)

### Data props
- `fullName`, `email`, `password`, `passwordConfirm`: controlled string
- `isPasswordVisible`, `isPasswordConfirmVisible`: boolean
- `termsAccepted`: boolean (kullanım koşulları onayı)
- `fullNameError`, `emailError`, `passwordError`, `passwordConfirmError`
- `generalError`
- `termsError`: string — koşul onayı hatası; checkbox altında
  `accessibilityLiveRegion="polite"` ile duyurulur
- `termsLinkLabel`, `privacyLinkLabel`: bağlantı metinleri
- `passwordStrength`: `{ percent: 0–100, label, tone? }` — verilirse şifre
  gücü göstergesi çizilir
- `isSubmitting`: boolean

### Callbacks
- `onFullNameChange(text)` · `onEmailChange(text)` · `onPasswordChange(text)` ·
  `onPasswordConfirmChange(text)`
- `onTogglePassword()` · `onTogglePasswordConfirm()` · `onToggleTerms()`
- `onOpenTerms()` — "Kullanım koşulları" metni (ayrı tıklanabilir link)
- `onOpenPrivacy()` — "Gizlilik politikası" metni (ayrı tıklanabilir link)
- `onSubmit()` · `onLogin()`

### Loading durumu
Yok.

### Empty durumu
Yok.

### Error durumu
Alan hataları AppInput altında; `generalError` → error InlineAlert;
`termsError` → checkbox altında canlı bölgeli hata metni.

### Disabled/submitting durumu
Kayıt butonu `disabled = !termsAccepted || isSubmitting`. `isSubmitting=true`
→ buton spinner ("Hesap oluşturuluyor…"). Checkbox satırının boş alanına
basmak `onToggleTerms`'i tetikler; koşul/gizlilik metinleri kendi
callback'lerini çağırır (checkbox durumunu değiştirmez).

### Backend notu
Auth flow (kayıt ViewModel'i) bağlanır; şifre gücü hesabı ve doğrulama
host'tadır. Bu bileşen backend çağrısı yapmaz.

### Navigation ihtiyacı
`onLogin` → giriş ekranı. Başarılı kayıt sonrası profil kurulumuna geçiş
host'tadır.

### Özel entegrasyon riski
- `KeyboardAvoidingView` host'a bırakılmıştır.
- Alt bileşen: `PasswordToggle`.

---

## ForgotPasswordView (`features/onboarding/ForgotPasswordView.js`)

### Data props
- `email`: controlled string
- `emailError`, `generalError`
- `isSubmitting`: boolean

### Callbacks
- `onEmailChange(text)` · `onSubmit()` · `onBack()` · `onLogin()`

### Loading durumu
Yok.

### Empty durumu
Yok.

### Error durumu
`emailError` alan altında; `generalError` → error InlineAlert.

### Disabled/submitting durumu
`isSubmitting=true` → buton spinner ("Gönderiliyor…").

### Backend notu
Auth flow (şifre sıfırlama isteği) bağlanır; gönderim mantığı host'tadır.
Bu bileşen backend çağrısı yapmaz.

### Navigation ihtiyacı
`onBack` → önceki ekran, `onLogin` → giriş ekranı. Başarı sonrası
`ForgotPasswordSuccessView`'a geçiş host'tadır.

### Özel entegrasyon riski
Yok (OnboardingHeader ile geri başlığı içerir).

---

## ForgotPasswordSuccessView (`features/onboarding/ForgotPasswordSuccessView.js`)

### Data props
- `email`: bağlantının gönderildiği adres
- `title`
- `resendCooldownLabel`: verilirse "Tekrar gönder" düğmesi gizlenip cooldown
  metni gösterilir

### Callbacks
- `onBackToLogin()` · `onResend()`

### Loading / Empty / Error durumu
Yok.

### Disabled/submitting durumu
Cooldown aktifken (`resendCooldownLabel` dolu) tekrar gönder aksiyonu
görünmez — devre dışı durumu UI'da gizleme ile sağlanır.

### Backend notu
Auth flow (tekrar gönderim) bağlanır; cooldown sayacı host'tadır. Bu bileşen
backend çağrısı yapmaz.

### Navigation ihtiyacı
`onBackToLogin` → giriş ekranı.

### Özel entegrasyon riski
Yok.

---

## ProfileSetupStep1View (`features/onboarding/ProfileSetupStep1View.js`)

### Data props
- `fullName`, `birthDate`: controlled string (+ `fullNameError`, `birthDateError`)
- `genderOptions`: `[{ value, label }]` · `selectedGender`: value | null
- `step` (1), `totalSteps` (4) — StepProgress göstergesi

### Callbacks
- `onFullNameChange(text)` · `onBirthDateChange(text)` · `onSelectGender(value)`
- `onBack()` · `onContinue()` · `onSkip()` (verilirse "Şimdilik geç" görünür)

### Loading / Empty / Error durumu
Yok; alan hataları AppInput altında gösterilir.

### Disabled/submitting durumu
Yok; devam koşulu (zorunlu alanlar) host'ta doğrulanır.

### Backend notu
Onboarding/profil kurulum akışı (profil ViewModel'i) bağlanır. Bu bileşen
backend çağrısı yapmaz.

### Navigation ihtiyacı
`onBack` → önceki adım/çıkış, `onContinue` → adım 2, `onSkip` → akışı atla.

### Özel entegrasyon riski
- Doğum tarihi serbest metin girişidir (`GG.AA.YYYY` placeholder); tarih
  seçici istenirse host entegre eder.

---

## ProfileSetupStep2View (`features/onboarding/ProfileSetupStep2View.js`)

### Data props
- `goalOptions`: `[{ value, label }]` · `selectedGoal`: value | null
- `height`, `currentWeight`, `targetWeight`: controlled string (birim
  aksesuarları cm/kg bileşen içinde)
- `heightError`, `currentWeightError`, `targetWeightError`
- `step` (2), `totalSteps` (4)

### Callbacks
- `onSelectGoal(value)` · `onHeightChange(text)` · `onCurrentWeightChange(text)` ·
  `onTargetWeightChange(text)`
- `onBack()` · `onContinue()` · `onSkip()`

### Loading / Empty / Error durumu
Yok; alan hataları AppInput altında.

### Disabled/submitting durumu
Yok.

### Backend notu
Onboarding/profil kurulum akışı bağlanır. Bu bileşen backend çağrısı yapmaz.

### Navigation ihtiyacı
`onBack` → adım 1, `onContinue` → adım 3, `onSkip` → akışı atla.

### Özel entegrasyon riski
Yok.

---

## ProfileSetupStep3View (`features/onboarding/ProfileSetupStep3View.js`)

### Data props
- `activityOptions` / `dietTypeOptions`: `[{ value, label }]`
- `selectedActivity` / `selectedDietType`: value | null
- `sleepHours`: string — sayısal uyku süresi (saat); `AppInput`
  `keyboardType="decimal-pad"` ile girilir
- `sleepHoursError`: alan hatası (aralık/format doğrulaması UI'da YAPILMAZ,
  hata host'tan gelir)
- `waterGoalLabel`: string (örn. "2,5") — stepper değeri hazır gelir
- `waterGoalUnit` (varsayılan "L")
- `step` (3), `totalSteps` (4)

### Callbacks
- `onSelectActivity(value)` · `onSelectDietType(value)`
- `onSleepHoursChange(text)` — uyku chip'leri kaldırıldı; uyku süresi sayısal
  saat olarak alınır (DietBridge mobil veri sözleşmesi)
- `onDecreaseWaterGoal()` · `onIncreaseWaterGoal()` — artır/azalt mantığı
  host'tadır
- `onBack()` · `onContinue()` · `onSkip()`

### Loading / Empty / Error durumu
Yok.

### Disabled/submitting durumu
Azalt düğmesi `onDecreaseWaterGoal` verilmezse `disabled` olur; alt/üst sınır
kilidi host'tadır.

### Backend notu
Onboarding/profil kurulum akışı bağlanır. Bu bileşen backend çağrısı yapmaz.

### Navigation ihtiyacı
`onBack` → adım 2, `onContinue` → adım 4, `onSkip` → akışı atla.

### Özel entegrasyon riski
Yok.

---

## ProfileSetupStep4View (`features/onboarding/ProfileSetupStep4View.js`)

### Data props
- `searchQuery`: controlled string (liste içi arama)
- Tekli seçim grupları:
  - `bloodTypeOptions` / `selectedBloodType` — kan grubu
  - `smokingOptions` / `selectedSmoking` — sigara kullanımı
  - `alcoholOptions` / `selectedAlcohol` — alkol kullanımı
- Çoklu seçim + özel ekleme grupları (`[{ value, label }]` + `value[]`):
  - `conditionOptions` / `selectedConditions` — kronik rahatsızlıklar
  - `medicationOptions` / `selectedMedications` — kullanılan ilaçlar
  - `intoleranceOptions` / `selectedIntolerances` — besin intoleransları
  - `dislikedFoodOptions` / `selectedDislikedFoods` — sevilmeyen besinler
- `lastLabDate`: controlled string — son tahlil tarihi
- `lastLabDateError`: alan hatası (format doğrulaması host'tadır)
- `step` (4), `totalSteps` (4)

Seçenek listeleri her zaman props'tan gelir; feature dosyasında seçenek
hardcode EDİLMEZ.

### Callbacks
- `onSearchQueryChange(text)`
- `onSelectBloodType(value)` · `onSelectSmoking(value)` ·
  `onSelectAlcohol(value)`
- `onToggleCondition(value)` · `onToggleMedication(value)` ·
  `onToggleIntolerance(value)` · `onToggleDislikedFood(value)`
- Özel ekleme (callback verilirse ilgili grupta "Özel ekle" chip'i görünür):
  - `onAddCustomCondition()` — kronik rahatsızlıklar
  - `onAddCustomMedication()` — kullanılan ilaçlar
  - `onAddCustomIntolerance()` — besin intoleransları
  - `onAddCustomFood()` — sevilmeyen besinler
- `onLastLabDateChange(text)`
- `onBack()` · `onContinue()` · `onSkip()`

### Loading / Empty / Error durumu
Yok; alanlar boş bırakılabilir (yargılamayan dil).

### Disabled/submitting durumu
Yok.

### Backend notu
Onboarding/profil kurulum akışı bağlanır (sağlık bilgileri). Bu bileşen
backend çağrısı yapmaz.

### Navigation ihtiyacı
`onBack` → adım 3, `onContinue` → akış sonu (diyetisyen bağlantısı/ana akış),
`onSkip` → akışı atla.

### Özel entegrasyon riski
- Arama filtrelemesi host'tadır; `searchQuery` ile seçenek listelerinin
  daraltılması host'un sorumluluğundadır.

---

## DietitianConnectionEmptyView (`features/onboarding/DietitianConnectionEmptyView.js`)

### Data props
- `inviteCode`: controlled string
- `inviteCodeError`: alan hatası
- `isSubmitting`: boolean

### Callbacks
- `onInviteCodeChange(text)` · `onConnect()`

### Loading / Empty durumu
Bileşenin kendisi "bağlantı yok" durumudur.

### Error durumu
`inviteCodeError` AppInput altında; bağlantı hatası için ayrı
`DietitianConnectionErrorView` kullanılır.

### Disabled/submitting durumu
`isSubmitting=true` → buton spinner ("Bağlanıyor…").

### Backend notu
Davet kodu doğrulama servisi (bağlantı akışı) bağlanır; kod doğrulama mantığı
host'tadır. Bu bileşen backend çağrısı yapmaz.

### Navigation ihtiyacı
Başarılı bağlantı sonrası pending/active durumuna geçiş host'tadır.

### Özel entegrasyon riski
Yok.

---

## DietitianConnectionPendingView (`features/onboarding/DietitianConnectionPendingView.js`)

### Data props
- `dietitian`: `{ name, initials, specialty }` — verilirse profil kartı +
  "Onay bekliyor" rozeti çizilir
- `title`

### Callbacks
- `onReviewProfile()` — "Beklerken profilimi gözden geçir"
- `onCancelInvite()` — "Daveti iptal et"

### Loading / Empty / Error durumu
Yok.

### Disabled/submitting durumu
Yok; iptal onay akışı host'tadır.

### Backend notu
Diyetisyen bağlantı servisi bağlanır (davet durumu, iptal). Bu bileşen
backend çağrısı yapmaz.

### Navigation ihtiyacı
`onReviewProfile` → profil kurulum/düzenleme ekranları.

### Özel entegrasyon riski
- Davet onayının gerçek zamanlı (realtime) dinlenmesi host'tadır.

---

## DietitianConnectionActiveView (`features/onboarding/DietitianConnectionActiveView.js`)

### Data props
- `dietitian`: `{ name, initials, specialty }` — "Bağlı" rozeti ile
- `title`, `infoText`

### Callbacks
- `onSendMessage()` · `onManageConnection()`

### Loading / Empty / Error durumu
Yok.

### Disabled/submitting durumu
Yok.

### Backend notu
Diyetisyen bağlantı servisi bağlanır. Bu bileşen backend çağrısı yapmaz.

### Navigation ihtiyacı
`onSendMessage` → sohbet ekranı, `onManageConnection` → bağlantı yönetimi
akışı.

### Özel entegrasyon riski
Yok.

---

## DietitianConnectionErrorView (`features/onboarding/DietitianConnectionErrorView.js`)

### Data props
- `inviteCode`: girilen kod (bilgi kartında gösterilir)
- `title`, `description`
- `isRetrying`: boolean

### Callbacks
- `onRetry()` · `onEditCode()`

### Loading / Empty durumu
Yok.

### Error durumu
Bileşenin kendisi hata durumudur (davet kodu doğrulama bağlantı hatası).

### Disabled/submitting durumu
`isRetrying=true` → buton spinner ("Tekrar deneniyor…").

### Backend notu
Davet kodu doğrulama servisinin hata dalı bağlanır. Bu bileşen backend
çağrısı yapmaz.

### Navigation ihtiyacı
`onEditCode` → kod giriş ekranına dönüş.

### Özel entegrasyon riski
Yok.

---

## ProgressView (`features/progress/ProgressView.js`)

### Data props
- `title`
- `status`: `'loading' | 'ready' | 'empty' | 'error'`
- `weightSummary`: `{ current, start, target, change, unit }` (metin)
- `lastMeasureLabel`
- `weightHistory`: `[{ id, dateLabel, value }]` — kronolojik, sayısal value
- `weightChartTitle`, `weightFootnote`, `weightEmptyTitle`,
  `weightEmptyDescription`
- `bodyMeasurements`: `[{ key, label, start, current, unit? }]`
- `bodyMeasureDateLabel`
- `waterWeekly`: `{ days: [{ day, litres }], goalLitres, averageLabel, footnote }`
- `addWeightLabel`, `emptyTitle`, `emptyDescription`
- `refreshing`: boolean

### Callbacks
- `onAddWeight()` · `onAddMeasurement()` · `onOpenMeasurementHistory()`
- `onRetry()` (error durumu) · `onRefresh()` · `onBack()` (verilirse geri
  düğmesi çizilir; sekme kökünde verilmez)

### Loading durumu
`status='loading'` → `ProgressSkeleton`.

### Empty durumu
İki seviye: `status='empty'` → hiç ölçüm yok (EmptyState + "Ölçüm ekle" CTA);
`weightHistory.length < 2` iken grafik kartında yönlendirici empty state
(IlerlemeTekOlcum port'u).

### Error durumu
`status='error'` → `FullScreenErrorView` (variant generic, `onRetry`/`onBack`).

### Disabled/submitting durumu
Yok.

### Backend notu
İlerleme/ölçüm ViewModel'i bağlanır (kilo geçmişi, vücut ölçüleri, haftalık su
özeti). Bu bileşen backend çağrısı yapmaz.

### Navigation ihtiyacı
`onOpenMeasurementHistory` → ölçü geçmişi ekranı; `onAddWeight` /
`onAddMeasurement` → ilgili sheet'ler.

### Özel entegrasyon riski
- **Chart swap**: `WeightChartView` ve `WaterWeeklyChartView` dependency-free
  placeholder'dır; host grafik paketiyle değiştirilebilir (aşağıdaki bölümlere
  bakınız).
- `RefreshControl` host state'iyle beslenir.
- Alt bileşenler: `WeightSummaryCard`, `BodyMeasurementsCard`.

---

## WeightChartView (`features/progress/WeightChartView.js`)

### Data props
- `data`: `[{ id, dateLabel, value }]` — kronolojik (eski → yeni); en az 2
  nokta önerilir (tek noktada düz çizgi, 0 noktada hiçbir şey çizmez)
- `unit` (varsayılan "kg") · `height` (170) · `lineColor`
- `accessibilityLabel`: grafik özeti (ekran okuyucu)
- `style`

### Callbacks
Yok (salt görüntü bileşeni).

### Loading / Empty / Error / Disabled durumu
Yok; boş/tek ölçüm durumunu çağıran taraf (ProgressView) yönetir.

### Backend notu
Doğrudan bağlanmaz; veri ProgressView üzerinden gelir. Bu bileşen backend
çağrısı yapmaz.

### Navigation ihtiyacı
Yok.

### Özel entegrasyon riski
- **Chart swap**: saf `View`/`Text` ile çizilen dependency-free placeholder'dır
  (çizgi, döndürülmüş ince View'larla oluşturulur; genişlik `onLayout` ile
  ölçülür). Entegrasyonda host'un grafik paketiyle (örn. react-native-svg,
  victory-native) değiştirilebilir; prop şekli (`data`, `unit`, `height`,
  `accessibilityLabel`) korunarak sarılabilir.

---

## WaterWeeklyChartView (`features/progress/WaterWeeklyChartView.js`)

### Data props
- `days`: `[{ day, litres }]` — kronolojik; son gün "bugün" sayılır (vurgulu)
- `goalLitres`: günlük hedef; hedef çizgisi ve "hedefe ulaştı" tonlaması
- `height` (104) · `style`

### Callbacks
Yok.

### Loading / Empty / Error / Disabled durumu
Yok.

### Backend notu
Doğrudan bağlanmaz; veri ProgressView üzerinden gelir. Bu bileşen backend
çağrısı yapmaz.

### Navigation ihtiyacı
Yok.

### Özel entegrasyon riski
- **Chart swap**: bar'lar flex ile oranlanır, hedef çizgisi absolute konumlu
  kesikli View'dır; host grafik paketiyle değiştirilebilir.

---

## AddWeightSheetView (`features/progress/AddWeightSheetView.js`)

### Data props
- `visible`: boolean
- `value`: controlled string (kilo, `decimal-pad`)
- `unit` (varsayılan "kg")
- `dateLabel`, `todayLabel` — tarih satırı (varsayılan bugün)
- `title`, `hint`, `saveLabel`
- `isSaving`: boolean

### Callbacks
- `onValueChange(text)` · `onSave()` · `onClose()`

### Loading / Empty / Error durumu
Yok; doğrulama ipucu `hint` metniyle verilir, hata host'ta yönetilir.

### Disabled/submitting durumu
`isSaving=true` → Kaydet butonu spinner gösterir ve basış engellenir.

### Backend notu
Ölçüm kaydetme servisi (kilo) bağlanır. Bu bileşen backend çağrısı yapmaz.

### Navigation ihtiyacı
Yok (sheet).

### Özel entegrasyon riski
- Sheet içinde `TextInput` kullanılır; klavye-sheet etkileşimi
  (`KeyboardAvoidingView`) host'a bırakılmıştır.

---

## AddMeasurementSheetView (`features/progress/AddMeasurementSheetView.js`)

### Data props
- `visible`: boolean
- `fields`: `[{ key, label, unit? }]` — hangi alanların gösterileceği
- `values`: `{ [fieldKey]: string }` — controlled
- `dateLabel`, `todayLabel`, `title`, `subtitle`, `hint`, `saveLabel`
- `isSaving`: boolean

### Callbacks
- `onFieldChange(key, value)` · `onSave()` · `onClose()`

### Loading / Empty / Error durumu
Yok.

### Disabled/submitting durumu
`isSaving=true` → Kaydet butonu spinner; yalnızca doldurulan alanların
kaydedilmesi host'un sorumluluğundadır.

### Backend notu
Ölçüm kaydetme servisi (vücut ölçüleri) bağlanır. Bu bileşen backend çağrısı
yapmaz.

### Navigation ihtiyacı
Yok (sheet).

### Özel entegrasyon riski
- Klavye-sheet etkileşimi host'a bırakılmıştır.

---

## MeasurementHistoryView (`features/progress/MeasurementHistoryView.js`)

### Data props
- `title`
- `status`: `'loading' | 'ready' | 'empty'`
- `options`: `[{ key, label }]` — ölçüm türleri (Bel/Kalça/…)
- `selectedKey`: controlled seçim
- `summary`: `{ label, current, start, unit, lastMeasureLabel }` — sayısal
  current/start; değişim rozeti bileşen içinde hesaplanır
- `points`: `[{ id, dateLabel, value }]` — mini trend grafiği (eski → yeni)
- `entries`: `[{ id, dateLabel, valueLabel, deltaLabel }]` — liste (yeni → eski)
- `addLabel`, `currentSuffix`

### Callbacks
- `onSelectMeasurement(key)` · `onBack()` · `onAddMeasurement()`

### Loading durumu
`status='loading'` → skeleton satırları.

### Empty durumu
`status='empty'` → `EmptyDataView` + "Ölçü ekle" CTA.

### Error durumu
Yok (status kümesinde `error` yok).

### Disabled/submitting durumu
Yok.

### Backend notu
Ölçüm geçmişi ViewModel'i bağlanır. Bu bileşen backend çağrısı yapmaz.

### Navigation ihtiyacı
`onBack` → ilerleme ekranı; `onAddMeasurement` → ölçü ekle sheet'i.

### Özel entegrasyon riski
- Mini trend grafiği `WeightChartView` yeniden kullanımıdır; chart swap
  yapılırsa burada da etkilenir.

---

## MessagesListView (`features/messages/MessagesListView.js`)

### Data props
- `title`
- `status`: `'loading' | 'ready' | 'empty' | 'error'`
- `conversations`: `[{ id, name, initials, lastMessage, timeLabel,
  unreadCount }]`
- `footerNote`
- `refreshing`: boolean

### Callbacks
- `onConversationPress(conversation)` — satır basışı, tüm conversation nesnesi
  iletilir
- `onRetry()` (error) · `onRefresh()` · `onBack()` (verilirse geri düğmesi)
- `onConnectDietitian()` — empty durumundaki CTA

### Loading durumu
`status='loading'` → `ListSkeleton`.

### Empty durumu
`status='empty'` veya `conversations` boş → `EmptyMessagesView`
(`onConnectDietitian` CTA'sı ile).

### Error durumu
`status='error'` → `FullScreenErrorView` (`onRetry`/`onBack`).

### Disabled/submitting durumu
Yok.

### Backend notu
Mesajlaşma servisi (konuşma listesi, okunmamış sayaçları) bağlanır. Bu bileşen
backend çağrısı yapmaz.

### Navigation ihtiyacı
`onConversationPress` → sohbet ekranı; `onConnectDietitian` → diyetisyen
bağlantı akışı.

### Özel entegrasyon riski
- `FlatList` + `RefreshControl`.
- Okunmamış bilgisi rozet metni + erişilebilirlik etiketiyle verilir (yalnız
  renkle anlatım yok).

---

## ChatView (`features/messages/ChatView.js`)

### Data props
- `conversation`: `{ name, initials, statusLabel?, online? }`
- `messages`: `[{ id, from: 'me' | 'other', text?, imageUri?, caption?,
  timeLabel, status?, dateLabel? }]` — eski → yeni verilir; liste ters
  çevrilerek (inverted) render edilir. `dateLabel` verilen mesajın üstünde
  tarih ayırıcı gösterilir.
- `status`: `'loading' | 'ready' | 'empty' | 'error'` (varsayılan `'ready'`)
- `isLoadingMore`: boolean — eski mesajlar yükleniyor
- `hasMore`: boolean — daha eski mesaj var
- `errorTitle`, `errorDescription` — ekran geneli hata metinleri
- `emptyTitle`, `emptyDescription` — boş sohbet metinleri
- `composerValue`: controlled string
- `isSending`: boolean
- `composerPlaceholder`

### Callbacks
- `onBack()`
- `onComposerChange(text)` · `onSend()`
- `onRetryMessage(message)` — başarısız mesajın "Tekrar dene" aksiyonu
- `onDeleteMessage(message)` — MessageBubble'a iletilir
- `onPickImage()` — composer'daki görsel düğmesi
- `onLoadMore()` — `onEndReached` YALNIZ `hasMore && !isLoadingMore` iken
  tetiklenir
- `onRetry()` — `status='error'` iken ErrorState'in tekrar dene düğmesi

### Loading / Empty durumu
- `status='loading'` → mesaj iskeleti (skeleton satırları).
- `status='empty'` → sakin boş sohbet görünümü (`emptyTitle`/`emptyDescription`);
  composer açık kalır, ilk mesaj gönderilebilir.

### Error durumu
- `status='error'` → ekran geneli `ErrorState` (`errorTitle`/`errorDescription`
  + `onRetry`).
- Mesaj bazlı: başarısız mesajlar `FailedMessageState` (MessageBubble içinde)
  ile gösterilir.

### Disabled/submitting durumu
`isSending=true` → composer gönderim kilidi (MessageComposer içinde).
`isLoadingMore=true` → `onLoadMore` tekrar tetiklenmez; listenin eski mesaj
ucunda (inverted listede footer) spinner + "Eski mesajlar yükleniyor…"
göstergesi çıkar (`accessibilityLiveRegion="polite"`).

### Backend notu
Mesajlaşma servisi (realtime akış, gönderme, yeniden deneme, silme) bağlanır.
**Saf UI'dır**: realtime, gönderme servisi ve görsel seçici entegrasyonu yoktur.
Bu bileşen backend çağrısı yapmaz.

### Navigation ihtiyacı
`onBack` → mesaj listesi.

### Özel entegrasyon riski
- **Inverted FlatList**: yeni mesajlar altta; sayfalama/scroll-to-bottom
  davranışı host stratejisine bağlıdır.
- **KeyboardAvoidingView**: composer'ın klavyeyle yukarı kayması host'a
  bırakılmıştır.
- **Image picker**: `onPickImage` `expo-image-picker` entegrasyonuna
  bağlanacaktır; `imageUri` mesajları `ImageMessagePreview` ile gösterilir.
- Alt bileşenler: `MessageBubble` (metin/görsel/durum), `MessageComposer`,
  `FailedMessageState`, `ImageMessagePreview`.

---

## ProfileView (`features/profile/ProfileView.js`)

### Data props
- `title`
- `status`: `'loading' | 'ready'`
- `user`: `{ name, email, initials }`
- `dietitian`: `{ name, initials }` — opsiyonel; verilirse bağlantı satırı
- `dietitianBadgeLabel`
- `editProfileLabel`, `logoutLabel`
- `sections`: `[{ key, icon, label, value? }]` — menü satırları tamamen
  prop'tan gelir; key'ler host route'larıyla eşlenir (örn. `'personal' |
  'goal' | 'lifestyle' | 'health' | 'notifications' | 'privacy'`)

### Callbacks
- `onNavigate(sectionKey)` — TEK generic navigasyon callback'i
- `onEditProfile()` · `onLogout()` — çıkış satırı destructive tonda; onay
  akışı host'tadır
- `onBack()` (verilirse geri düğmesi)

### Loading durumu
`status='loading'` → `ProfileSkeleton`.

### Empty durumu
Yok; `user` yoksa özet kartı çizilmez.

### Error durumu
Yok.

### Disabled/submitting durumu
Yok.

### Backend notu
Profil ViewModel'i (kullanıcı özeti, diyetisyen bağlantısı) + auth sign-out
akışı bağlanır. Bu bileşen backend çağrısı yapmaz.

### Navigation ihtiyacı
`onNavigate(sectionKey)` → ilgili düzenleme/ayar ekranları; `onEditProfile` →
kişisel bilgiler düzenleme; `onLogout` → auth çıkış akışı.

### Özel entegrasyon riski
- Alt bileşen: `ProfileHeader` (düzenleme ekranlarının ortak başlığı).

---

## PersonalInfoEditView (`features/profile/PersonalInfoEditView.js`)

### Data props
- `title`
- `values`: `{ fullName, phone, birthDate }` — controlled; **e-posta bu
  objede YOKTUR**
- `errors`: `{ [key]: mesaj }` — alan bazlı hata
- `initials`: avatar için
- `email`: string — mevcut e-posta; salt okunur özet satırında gösterilir
- `emailChangePending`: boolean — doğrulama bekleyen e-posta değişikliği var
- `isChangingEmail`: boolean — e-posta değişiklik akışı sürüyor
- `emailChangeLabel` ("Değiştir"), `emailPendingInfo` ("Yeni e-posta adresi
  için doğrulama bekleniyor."), `emailHint`
- `isSaving`: boolean
- `changePhotoLabel`, `saveLabel`, `cancelLabel`

### Callbacks
- `onFieldChange(key, value)` — yalnız `fullName` | `phone` | `birthDate`
- `onChangePhoto()` — avatar seçimi (host image picker)
- `onRequestEmailChange()` — "Değiştir" düğmesi YALNIZ bu callback'i çağırır;
  e-posta değişikliği `onSave`'e DAHİL EDİLMEZ (ayrı Auth akışı gerekir)
- `onSave()` · `onCancel()` · `onBack()`

### Loading / Empty / Error durumu
Yok; hatalar `errors` prop'u ile alan altında. `emailChangePending=true`
iken bilgi metni (`emailPendingInfo`) e-posta satırı altında gösterilir.

### Disabled/submitting durumu
`isSaving=true` → Kaydet butonu spinner. `isChangingEmail=true` →
"Değiştir" düğmesi disabled (`accessibilityState.busy`); generic kaydetme
etkilenmez.

### Backend notu
Profil güncelleme servisi bağlanır; kaydetme mantığı host'tadır. Bu bileşen
backend çağrısı yapmaz.

### Navigation ihtiyacı
`onBack`/`onCancel` → profil; kaydedilmemiş değişiklik uyarısı için
`UnsavedChangesDialogView` kullanılır.

### Özel entegrasyon riski
- **Image picker**: `onChangePhoto` avatar seçimi için host'un image picker
  entegrasyonuna bağlanır.

---

## GoalEditView (`features/profile/GoalEditView.js`)

### Data props
- `title`, `intro`
- `values`: `{ heightCm, targetWeightKg, goal, waterGoalLabel,
  waistCm, hipCm, chestCm, armCm }` — controlled; **`currentWeightKg`
  bu view'dan KALDIRILDI**: mevcut kilo değişikliği ayrı ölçüm akışından
  geçer (`ProgressView` → `AddWeightSheetView`); generic profil `onSave`'i
  mevcut kilo güncellemez
- `errors`: `{ [key]: mesaj }`
- `goalOptions`: `[{ value, label }]` — tekli hedef seçimi
- `isSaving`: boolean · `saveLabel`, `cancelLabel`

### Callbacks
- `onFieldChange(key, value)` — tüm metin alanları ve `goal` seçimi
- `onDecreaseWaterGoal()` · `onIncreaseWaterGoal()` — su hedefi stepper'ı
  (adım miktarı host'ta; değer `waterGoalLabel` olarak hazır gelir)
- `onSave()` · `onCancel()` · `onBack()`

### Loading / Empty / Error durumu
Yok; hatalar alan altında.

### Disabled/submitting durumu
`isSaving=true` → Kaydet butonu spinner.

### Backend notu
Profil güncelleme servisi (hedef ve ölçüler) bağlanır. Bu bileşen backend
çağrısı yapmaz.

### Navigation ihtiyacı
`onBack`/`onCancel` → profil.

### Özel entegrasyon riski
Yok (stepper saf UI'dır).

---

## LifestyleEditView (`features/profile/LifestyleEditView.js`)

### Data props
- `title`, `intro`
- `values`: `{ activity, dietType, sleepHours, smoking, alcohol }` —
  controlled; `sleepHours` sayısal string (saat), diğerleri tekli seçim
- `options`: `{ activity: [...], dietType: [...], smoking: [...],
  alcohol: [...] }` — her biri `[{ value, label }]`; **uyku için seçenek
  listesi YOKTUR** (chip kaldırıldı)
- `errors`: `{ [key]: mesaj }` — `errors.sleepHours` host'tan gelir
  (aralık/format doğrulaması UI'da YAPILMAZ)
- `isSaving`: boolean · `saveLabel`, `cancelLabel`

### Callbacks
- `onFieldChange(key, value)` — uyku dahil tüm alanlar tek callback;
  uyku `onFieldChange('sleepHours', value)` ile sayısal `AppInput`
  (`keyboardType="decimal-pad"`) üzerinden akar
- `onSave()` · `onCancel()` · `onBack()`

### Loading / Empty / Error durumu
Yok.

### Disabled/submitting durumu
`isSaving=true` → Kaydet butonu spinner.

### Backend notu
Profil güncelleme servisi (yaşam tarzı) bağlanır. Bu bileşen backend çağrısı
yapmaz.

### Navigation ihtiyacı
`onBack`/`onCancel` → profil.

### Özel entegrasyon riski
Yok.

---

## HealthEditView (`features/profile/HealthEditView.js`)

### Data props
- `title`, `intro`
- `searchQuery`: controlled string (liste içi arama/özel ekleme girişi)
- `values`: `{ bloodType, conditions[], medications[], intolerances[],
  dislikedFoods[], lastCheckupDate }`
- `options`: `{ bloodType: [...], conditions: [...], medications: [...],
  intolerances: [...], dislikedFoods: [...] }` — `[{ value, label }]`
- `isSaving`: boolean · `addCustomLabel`, `saveLabel`, `cancelLabel`

### Callbacks
- `onSearchQueryChange(text)`
- `onFieldChange('bloodType' | 'lastCheckupDate', value)` — tekli alanlar
- `onToggleItem(key, value)` — çoklu gruplar (key: `conditions` /
  `medications` / `intolerances` / `dislikedFoods`)
- `onAddCustomItem(key)` — "Özel ekle" düğmesi (ilaçlar, sevilmeyen besinler)
- `onSave()` · `onCancel()` · `onBack()`

### Loading / Empty / Error durumu
Yok.

### Disabled/submitting durumu
`isSaving=true` → Kaydet butonu spinner.

### Backend notu
Profil güncelleme servisi (sağlık bilgileri) bağlanır. Bu bileşen backend
çağrısı yapmaz.

### Navigation ihtiyacı
`onBack`/`onCancel` → profil.

### Özel entegrasyon riski
Yok.

---

## UnsavedChangesDialogView (`features/profile/UnsavedChangesDialogView.js`)

### Data props
- `visible`: boolean (RN Modal)
- `title`, `message`
- `saveLabel`, `discardLabel`, `keepEditingLabel`
- `isSaving`: boolean

### Callbacks
- `onSave()` — değişiklikleri kaydet
- `onDiscard()` — kaydetmeden çık (destructive tonda)
- `onKeepEditing()` — düzenlemeye devam et; backdrop basışı ve Android
  `onRequestClose` da buna bağlanır

### Loading / Empty / Error durumu
Yok.

### Disabled/submitting durumu
`isSaving=true` → Kaydet düğmesi `disabled` + busy erişilebilirlik durumu.

### Backend notu
Doğrudan backend bağlanmaz; `onSave` ilgili düzenleme ekranının kaydetme
akışına gider. Bu bileşen backend çağrısı yapmaz.

### Navigation ihtiyacı
`onDiscard` kaydedilmemiş değişiklikleri bırakıp geri navigasyonuna bağlanır.

### Özel entegrasyon riski
- **Modal sunumu**: transparent + fade RN `Modal`'ıdır; host'un navigation
  geri-bası (Android hardware back, gesture) engelleme stratejisiyle
  uyumlandırılmalıdır.

---

## NotificationSettingsView (`features/profile/NotificationSettingsView.js`)

### Data props
- `title`, `description`
- `sections`: `[{ key, title?, items: [{ key, label, description }] }]`
- `values`: `{ [itemKey]: boolean }` — controlled

### Callbacks
- `onToggle(itemKey)` — host state'ini günceller
- `onBack()`

### Loading / Empty / Error durumu
Yok.

### Disabled/submitting durumu
Yok; anahtarlar her an kapatılabilir (dark pattern yok). RN core `Switch`
kullanılır.

### Backend notu
Bildirim tercihleri servisi (+ push token yönetimi) bağlanır. Bu bileşen
backend çağrısı yapmaz.

### Navigation ihtiyacı
`onBack` → profil.

### Özel entegrasyon riski
- Sistem düzeyinde bildirim izni (OS permission) bu görünümün kapsamı
  dışındadır; host yönetir.

---

## PrivacySecurityView (`features/profile/PrivacySecurityView.js`)

### Data props
- `title`, `securityLabel`, `dataLabel`, `accountLabel`
- `twoFactorEnabled`: boolean — controlled Switch
- `twoFactorDescription`
- `sessionSummary`: açık oturumlar özet metni
- `deleteDescription`
- Görünürlük flag'leri (varsayılan **FALSE**; gerçek backend hazır olmayan
  özellik satırı production'da GÖRÜNMEZ):
  - `showTwoFactor` — iki adımlı doğrulama satırı
  - `showSessions` — açık oturumlar satırı
  - `showDataExport` — verilerimi indir satırı
  - `showDeleteAccount` — hesabı sil satırı

### Callbacks
- `onToggleTwoFactor(enabled)` · `onChangePassword()` · `onOpenSessions()`
- `onExportData()` — verilerimi indir
- `onDeleteAccount()` — hesap silme (destructive tonda; onay akışı host'tadır)
- `onBack()`

İlgili `show*` flag'i false iken satır render edilmez; callback verilmiş
olması satırı göstermez.

### Loading / Empty / Error durumu
Yok.

### Disabled/submitting durumu
Yok; `ActionRow`'lar callback verilmezse `disabled` olur.

### Backend notu
Auth güvenlik akışları (şifre değiştirme, iki adımlı doğrulama, oturumlar) +
veri dışa aktarma + hesap silme servisleri bağlanır. Bu bileşen backend
çağrısı yapmaz.

### Navigation ihtiyacı
`onChangePassword` → şifre değiştirme akışı, `onOpenSessions` → oturum
listesi, `onBack` → profil.

### Özel entegrasyon riski
- Hesap silme geri alınamaz bir işlemdir; onay diyaloğu ve yeniden kimlik
  doğrulama host'un sorumluluğundadır.

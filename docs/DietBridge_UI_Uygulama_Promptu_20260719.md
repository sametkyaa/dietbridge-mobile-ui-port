<hedef>
Sen FANG seviyesinde şirketler için yüksek kaliteli mobil arayüzler üretmiş, sağlık teknolojileri ve davranış değişikliği ürünlerinde deneyimli bir Senior Mobile Product Designer'sın.

Görevin, aşağıdaki bağlamı, tasarım sistemini ve ürün gereksinimlerini kullanarak DietBridge danışan mobil uygulamasının tüm P0 ekranlarını fonksiyonel, üretime hazır kalitede UI tasarımlarına dönüştürmektir. Çıktı yalnızca estetik ekranlardan oluşmamalı; gerçek kullanıcı akışlarını, uygulama durumlarını (loading / empty / error / offline) ve erişilebilirliği de kapsamalıdır.
</hedef>

<kurallar>

<estetik>
Tasarım ilkeleri:

- Cesur sadelik ve sezgisel navigasyonla sürtünmesiz deneyim
- Stratejik renk vurgularıyla desteklenen nefes alan boşluklar; görsel hiyerarşi beyaz alanla kurulur
- Her ekranın tek bir ana amacı ve net bir görsel hiyerarşisi vardır; kart ve metrikler rastgele kutular halinde dizilmez
- Tipografi hiyerarşisiyle bilgi mimarisi: ağırlık farkları ve ölçek oranları
- Yoğunluk dengesi: bilgi erişilebilirliği ile bilişsel yük arasında denge
- Fizik tabanlı, yönlendirici geçişler; hareket dekorasyon için kullanılmaz
- Erişilebilirlik odaklı kontrast ve sezgisel navigasyon kalıpları
- Durum geçişleriyle minimum gecikmede sistem geri bildirimi
- İçerik öncelikli düzen: kullanıcı hedefleri dekoratif öğelerin önünde
- Genel his: güvenilir sağlık teknolojisi + kişisel diyetisyen desteği; sıcak ama çocukça değil, premium ama gösterişli değil, modern ama geçici trendlere bağımlı değil, veri odaklı ama klinik/soğuk değil
</estetik>

<pratik-gereksinimler>
- Mobil ekranlar iPhone cihaz çerçevesi içinde sunulur; gerçek telefon arayüzü hissi verilir; scrollbar render edilmez
- İkonlar için Lucide (React ortamında lucide-react) kullanılır; tek ikon ailesi, tutarlı stroke
- Stil için Tailwind CSS kullanılır
- Tüm kullanıcı metinleri Türkçedir
- Gerçekçi ve tutarlı örnek veri kullanılır (lorem ipsum, anlamsız metrik, ekranlar arası çelişen veri yasak)
</pratik-gereksinimler>

<proje-tasarim-sistemi>

## Renk tokenları

```text
Primary / DietBridge Green   #509F42   (ana aksiyonlar, aktif durumlar)
Primary Dark                 #34762D   (pressed durum)
Primary Soft                 #EAF5E7   (seçili durum zeminleri)
Primary Surface              #F4FAF2   (geniş soft yeşil yüzeyler)
Secondary Teal               #4FA7A1   (ikincil vurgu, su takibi)
Secondary Soft               #E8F6F4
Background                   #F7F8F6
Surface                      #FFFFFF
Surface Muted                #F0F3EE
Text Primary                 #1E2820
Text Secondary               #687168
Text Tertiary                #929B93
Border Soft                  #E2E7E1
Success                      #3F9142
Warning                      #C6872F
Error                        #C65353   (yalnız gerçek hata)
Info                         #4C7FA8
```

Renk kuralları: birincil yeşil tüm arayüzü kaplamaz; büyük yüzeylerde soft yeşil tercih edilir; tamamlanmamış hedefler asla kırmızı gösterilmez (nötr/yönlendirici ton); grafiklerde maks 4 anlamlı renk; kontrast WCAG AA. "0" / "Yok" / "henüz veri yok" / "hedefe ulaşılamadı" durumları görsel olarak ayrışır. Dark mode MVP dışı.

## Tipografi

Font: Inter (iOS referansı SF Pro, Android Roboto). Ölçek:

```text
Display / Karşılama     30px/36px Semibold
Screen Title            26px/32px Semibold
Section Title           19px/24px Semibold
Card Title              17px/22px Medium–Semibold
Body                    15px/22px Regular
Supporting Text         13px/18px Regular
Caption                 12px/16px Medium
Button                  15–16px Semibold
Numeric Highlight       28px/34px Semibold
```

Kurallar: tamamı büyük harf yok; ekran başına maks 3–4 tipografi seviyesi; sayısal metrikler okunaklı ama agresif değil.

## Spacing, radius, yüzey

- 4px tabanlı ölçek: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40
- Yatay ekran padding: 20px (min 16px); bölümler arası 24–32px; kart içi 16–20px; liste öğeleri arası 12–16px
- Radius: small control 10–12px; input/chip 12–14px; standard card 18–20px; hero card 22–24px; bottom sheet üst köşe 24–28px
- Kart ayrımında önce yüzey kontrastı + spacing; gölge gerekirse düşük opaklıklı, geniş ve yumuşak; sert border + güçlü gölge birlikte kullanılmaz

## Bileşen stilleri

- Primary Button: #509F42 zemin, beyaz metin, 52px yükseklik, 14px radius; pressed #34762D; loading'de tekrar gönderim engellenir
- Secondary Button: #EAF5E7 zemin, #34762D metin
- Text/Icon Button: min 44×44px dokunma alanı
- Input: 52px, 12–14px radius, 1px #E2E7E1 border; focused'da 1.5px #509F42; görünür label zorunlu; hata alanla ilişkili gösterilir
- Choice/Multi-select Chip: default Surface + Border Soft; selected Primary Soft zemin + Primary border + Primary Dark metin; multi-select'te check ikonu; özel değer eklenebilir, duplicate engellenir
- Status Badge: ikon + metin (yalnız renkle anlatım yok); Tamamlandı: Primary Soft + Success; Yaklaşan: Secondary Soft + Teal ("45 dk sonra"); Bekliyor: Surface Muted + Text Secondary; Gecikmiş: Warning soft (kırmızı değil)
- Standard Card: Surface, 18–20px radius, 16–20px padding
- Hero Card (Sıradaki Öğün): 22–24px radius; tür badge'i, saat, öğün adı, kısa özet (max 2 satır), varsa küçük gerçekçi yemek görseli (sağda ~64–80px), zaman etiketi; kart tıklanabilir, ekranı domine etmez ama ilk bakışta ana öğe
- Water Progress: hedef + içilen miktar + hızlı ekle (+200/+250 ml) + geri alma; progress Secondary Teal; çocukça bardak ikonları yok
- Message Bubble: giden Primary zemin sağda; gelen Surface Muted solda; 18px radius, max genişlik ~%78; durum ikonları: gönderiliyor/gönderildi/okundu/başarısız (tekrar dene)
- Bottom Sheet: üst köşe 24–28px radius, drag handle; su ekleme, kilo ekleme, fotoğraf seçici
- Toast/Snackbar: kısa, tek aksiyonlu ("Geri al"); Inline Alert: bölüm içi, ekranı bloke etmez
- Skeleton: Surface Muted bloklar; Empty State: sade ikon + tek cümle + tek aksiyon; tam ekran Error yalnızca ekran gerçekten kullanılamıyorsa; teknik hata kodu gösterilmez
- Bottom Navigation: 5 sekme (Ana Sayfa, Planım, Mesajlar, İlerleme, Profil); aktif sekme Primary ikon + Semibold label (yalnız renkle ayrılmaz); safe area uyumlu; detay/modal ekranlarında gizlenebilir
- Date Strip: yatay kaydırılabilir 7 gün; seçili gün Primary Soft, bugün ayrı göstergeyle; 7 gün × 4 öğün tablosu YASAK

## Motion

Micro 120–180ms, standard 200–280ms, bottom sheet 250–350ms, success 300–500ms. İzinli: check animasyonu, kontrollü progress artışı, press state, sheet açılışı, sakin mesaj belirmesi, pull-to-refresh. Yasak: aşırı bounce, konfeti, uzun splash (max 500–700ms), hareket azaltma tercihini yok sayma.

## Görsel kırmızı çizgiler

Aşırı gradient, neon, yoğun glassmorphism, her bileşende farklı renk, 3D illüstrasyon, dekoratif blob, içerikten baskın grafik, çoklu gölge katmanı, kalın siyah border, aynı ekranda çok CTA, sıkışık metin, kart içinde kart içinde kart, yatay taşan tablo, işlevsiz ikon, aşırı gamification, suçlayıcı kırmızı uyarı.

## İçerik dili

Ton: sakin, destekleyici, açık, profesyonel, yargılamayan, kısa. Örnek: "Sıradaki öğünün 45 dakika sonra." / "Bugün 3 öğünden 2'sini tamamladın." / "250 ml su eklendi." / "Mesaj gönderilemedi. Tekrar deneyebilirsin." Yasak: "Başarısız oldun.", "Hedefini kaçırdın!", "Harika!!!", "Kod: PGRST116" gibi teknik/suçlayıcı/abartılı metinler.

</proje-tasarim-sistemi>

</kurallar>

<baglam>

<urun-ozeti>

## DietBridge — MVP PRD

**Ürün:** DietBridge danışan mobil uygulaması. Diyetisyen ile danışan arasındaki beslenme takibini tek mobil deneyimde birleştirir.
**Platform:** Mobil (React Native + Expo + Supabase); hedef kullanıcı: diyetisyene bağlı danışan.
**Asansör cümlesi:** "Beslenme sürecin, diyetisyeninle aynı yerde."
**Problem:** Danışanlar plan, öğün takibi, su tüketimi, ölçüm ve diyetisyen iletişimini dağınık kanallarda yürütüyor; süreç takibi zor, motivasyon kırılgan.
**Çözüm:** Danışanın "Bugün ne yapmalıyım?" sorusuna ilk 3 saniyede yanıt veren sakin, güvenilir bir rehber: (1) günlük ilerleme nasıl? (2) sıradaki öğün ne, saat kaçta? (3) şu an yapılması gereken bir işlem var mı?
**Ayrıştırıcı değer:** Yoğun veriyle boğmayan, yargılamayan, diyetisyen bağlantısını merkeze alan günlük rehber.

### Örnek veri (tüm ekranlarda tutarlı kullanılacak)

```text
Kullanıcı: Elif Yılmaz
Diyetisyen: Uzm. Dyt. Deniz Kaya
Günlük su hedefi: 2,5 L (içilen: 1,4 L)
Mevcut kilo: 72,4 kg — Başlangıç: 76,8 kg — Hedef: 66 kg
Bugün: 19 Temmuz Pazar

Günlük plan:
08:30 Kahvaltı — Yulaf, yoğurt, yaban mersini ve ceviz (tamamlandı)
11:00 Ara Öğün — Elma ve 10 adet çiğ badem (tamamlandı)
13:30 Öğle — Izgara tavuklu Akdeniz salatası ve ayran (sıradaki, "45 dk sonra")
17:00 Ara Öğün — Kefir ve bir küçük muz (bekliyor)
20:00 Akşam — Fırında somon, sebze ve 3 yemek kaşığı bulgur (bekliyor)

Diyetisyen mesajı: "Günaydın Elif, bu hafta su tüketimini biraz daha düzenli
takip edelim. Öğleden önce en az 1 litreyi tamamlamanı öneriyorum."
```

### P0 ekran listesi ve gereksinimleri

**1. Splash / session loading:** ortalanmış logo, açık nötr/hafif yeşil zemin, sakin loading göstergesi; boş ekran ve sonsuz spinner yok; animasyon max 500–700ms.

**2. Karşılama:** başlık "Beslenme sürecin, diyetisyeninle aynı yerde." + tek destekleyici cümle + birincil CTA "Hesap oluştur" + ikincil "Giriş yap" + sade ürün önizlemesi/doğal yaşam görseli. 3'ten fazla carousel, uzun özellik listesi, pazarlama dili yok.

**3. Giriş:** e-posta, şifre (göster/gizle), "Şifremi unuttum", giriş butonu, kayıt geçişi. Durumlar: normal, focused, doğrulama hatası (alanla ilişkili), yanlış e-posta/şifre, bağlantı hatası, loading (tekrar gönderim engelli), klavye açık (CTA erişilebilir). Teknik hata metni gösterilmez.

**4. Kayıt:** yalnızca ad soyad, e-posta, şifre, şifre doğrulama, kullanım koşulları/gizlilik onayı. Sağlık bilgileri kayıt formuna karışmaz.

**5. Şifre sıfırlama:** e-posta girişi, gönderim onayı, yönlendirici metin.

**6. Profil tamamlama (3–4 adımlı akış):** (1) Temel bilgiler, (2) Hedef ve ölçüler (boy, mevcut kilo, hedef kilo, hedef), (3) Yaşam tarzı (aktivite düzeyi, beslenme tipi, uyku süresi, günlük su hedefi — kullanıcıya litre gösterilir), (4) Sağlık ve beslenme tercihleri (kan grubu, sigara/alkol, kronik rahatsızlıklar, ilaçlar, intoleranslar, sevilmeyen besinler, son laboratuvar tarihi). Yaygın seçenekler chip + arama; özel değer eklenebilir; sağlık alanları yargılayıcı olmayan dille; adım ilerlemesi gösterilir.

**7. Diyetisyen bağlantısı (4 durum ayrı):** bağlantı yok / davet bekliyor / aktif bağlantı (avatar, ad, uzmanlık, "Mesaj gönder", durum badge'i) / bağlantı hatası. Danışan kendisi kaydolup bağlanır; "diyetisyen hesabı panelden oluşturdu" izlenimi verilmez.

**8. Ana Sayfa (en kritik ekran):**
- Üst alan: saate uygun selamlama ("Günaydın, Elif"), tarih ikincil seviyede ("19 Temmuz Pazar"), avatar veya bildirim ikonu
- Hero: Sıradaki Öğün kartı (13:30 Öğle, "45 dk sonra")
- Günlük ilerleme özeti: 4–6 metrik kutusuna bölünmeden bir/iki birleşik bileşen ("Bugün 5 öğünden 2'sini tamamladın", su 1,4/2,5 L, plan durumu); güvenilir kaynağı olmayan metrik (adım/kalori) gösterilmez
- Günün öğünleri: kronolojik liste; tür, saat, başlık, durum badge'i; tamamlananlar daha sakin
- Su takibi kartı: hedef, içilen, hızlı ekle, geri alma
- Diyetisyen mesajı/hatırlatma: yalnızca gerçekten yeni içerik varsa
- Durum varyantları: loading skeleton, plan yok, diyetisyen bağlantısı yok, bugün öğün yok, veri hatası, offline, gün tamamlandı, yaklaşan öğün, gecikmiş öğün

**9. Haftalık plan:** haftalık tarih aralığı + önceki/sonraki hafta + "Bugün"e dön + yatay kaydırılabilir gün strip'i (seçili gün belirgin, bugün ayrı işaretli); seçili günün öğünleri kronolojik liste; boş gün için anlamlı empty state; mobil tablo yok.

**10. Öğün detay:** hiyerarşi: tür+saat → başlık → fotoğraf (varsa) → porsiyon/içerik listesi → not → kalori/makrolar (varsa, kompakt; yoksa boş grafik üretilmez) → ana eylem. Ana eylem: "Öğünü yedim" → tamamlanınca "Tamamlandı" + geri alma. "Fotoğraf ekle" ikincil aksiyon (bottom sheet: kamera/galeri, upload progress, başarısızlıkta tekrar dene).

**11. Su takibi bottom sheet'i:** mevcut tüketim, günlük hedef, hızlı miktarlar, özel miktar, son kaydı geri al, sade kayıt geçmişi. Tek birimle anlatım (ml/L karıştırılmaz).

**12. İlerleme:** mevcut/başlangıç/hedef kilo, toplam değişim, sade çizgi grafik (sıfırdan başlamayan eksen, dokunulabilir veri noktaları, az veride sahte trend yok; tek ölçümde grafik yerine kart + yönlendirici empty state), son ölçüm tarihi, "Ölçüm ekle" aksiyonu. Yargılayıcı dil yok.

**13. Kilo ekleme (bottom sheet/modal):** büyük sayısal giriş, kg birimi, tarih varsayılan bugün, geçerli aralık doğrulama, kaydet/loading/başarı/hata+retry; klavye açıkken CTA görünür.

**14. Mesajlar:** MVP'de tek aktif diyetisyen ilişkisi — sekmeden doğrudan sohbete geçilebilir; liste gösterilirse: avatar, ad, son mesaj, saat, okunmamış sayısı; boş/loading/hata durumları.

**15. Sohbet:** diyetisyen adı+avatarı başlıkta; balonlar, tarih ayırıcıları, okunma/gönderim durumu; composer (metin + görsel ekle + gönder); klavye davranışı doğru; kullanıcı yukarıdayken zorla aşağı kaydırma yok; gönderiliyor/gönderildi/başarısız ayrımı, başarısızda tekrar gönder; görsel upload progress; medya tam ekran önizlenebilir.

**16. Profil ana ekranı:** avatar, ad soyad, aktif diyetisyen bilgisi, "Profili düzenle"; bölümler özet satırlar halinde: Kişisel bilgiler, Hedef ve ölçüler, Yaşam tarzı, Sağlık ve beslenme, Bildirimler, Gizlilik ve güvenlik, Çıkış yap. Uzun form değil; boş değerlerde bağlama göre "Yok" veya "Eklenmedi" (her satırda "Henüz belirtilmemiş" tekrarı yok).

**17. Profil düzenleme:** bölüm bazlı ayrı ekranlar; sağlık listelerinde chip + arama + özel ekleme; duplicate engeli; kolay/geri alınabilir silme; kaydetmeden çıkışta uyarı dialogu.

**18. Bildirim ayarları:** her başlık için açık toggle + kısa açıklama (yaklaşan öğün, yeni mesaj, isteğe bağlı ölçüm/su hatırlatması, plan güncellendi). Dark pattern yok.

**19. Durum ekranları (her kritik ekran için):** ilk yükleme (skeleton), pull-to-refresh, boş veri, bağlantı hatası, sunucu hatası, offline, işlem hatası + retry, kısmi veri. Küçük bölüm hatası tüm ekranı bloke etmez; hata mesajı ne olduğunu ve ne yapılabileceğini söyler; teknik kod yok.

**20. Alt navigasyon:** 5 sekme, yukarıdaki kurallarla.

### Temel kullanıcı yolculukları (akışlar tutarlı olmalı)

1. Açılış → Karşılama → Kayıt/Giriş → Profil tamamlama → Diyetisyen bağlantısı → Ana Sayfa
2. Ana Sayfa → Sıradaki öğün → Öğün detayı → "Öğünü yedim" → başarı geri bildirimi (opsiyonel: fotoğraf ekle → önizle → yükle → tamamla)
3. Ana Sayfa → Su kartı → hızlı ekle → ilerleme güncellenir
4. Mesajlar → sohbet → mesaj/görsel gönder → gönderim durumu → yanıt
5. Profil → düzenle → kaydet → gerçek başarı/hata
6. İlerleme/Ana Sayfa → kilo ekle → kaydet → grafik güncellenir

</urun-ozeti>

<gorev>
- Yukarıdaki tasarım ilkelerini ve tasarım sistemini birebir uygula.
- P0 listesindeki **her ekran için TEK varyant** tasarla (varyant karşılaştırması istenmiyor; brief'teki tasarım diline sadık kal).
- Ekranlar vitrin sayfasında mantıksal akış sırasıyla, dikey gruplar halinde dizilsin: Onboarding grubu → Ana akış (Ana Sayfa, Planım, öğün, su) → İlerleme → Mesajlar → Profil → Durum ekranları.
- Her ekran kendi bileşeni olsun: `dietbridge/pages/[EkranAdi].jsx` yapısında organize et; her bileşenin üzerinde kısa bir ekran açıklaması bulunsun.
- Kritik ekranlar için durum varyantlarını ayrı bileşen olarak üret (ör. `AnaSayfaSkeleton`, `AnaSayfaPlanYok`, `AnaSayfaOffline`).
- Tüm ekranlar tek bir vitrin/showcase sayfasında toplansın; sayfa içi hızlı gezinme (bölüm bağlantıları) ekle.
- Örnek veriler tüm ekranlarda tutarlı olsun (aynı öğün, saat ve ilerleme değerleri çelişmesin).
</gorev>

<cikti>
Çıktıyı index.html'e düzgün bağlanmış şekilde üret; tüm varyasyonlar tek vitrin sayfasında görünsün.
</cikti>

</baglam>

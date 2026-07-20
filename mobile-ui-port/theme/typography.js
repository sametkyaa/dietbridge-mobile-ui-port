// Tipografi ölçeği — DietBridge_Tasarim_Sistemi.md §2.2'den türetildi.
// Font ailesi: platform sistem fontu (iOS SF Pro / Android Roboto); fontFamily
// bilinçli olarak ayarlanmaz, RN varsayılanı kullanılır.
export const typography = {
  // Display / Karşılama — 30/36 Semibold
  display: { fontSize: 30, lineHeight: 36, fontWeight: '600' },
  // Screen Title — 26/32 Semibold
  screenTitle: { fontSize: 26, lineHeight: 32, fontWeight: '600' },
  // Section Title — 19/24 Semibold
  sectionTitle: { fontSize: 19, lineHeight: 24, fontWeight: '600' },
  // Card Title — 17/22 Medium–Semibold
  cardTitle: { fontSize: 17, lineHeight: 22, fontWeight: '600' },
  // Body — 15/22 Regular
  body: { fontSize: 15, lineHeight: 22, fontWeight: '400' },
  bodyMedium: { fontSize: 15, lineHeight: 22, fontWeight: '500' },
  // Supporting Text — 13/18 Regular
  supporting: { fontSize: 13, lineHeight: 18, fontWeight: '400' },
  // Caption — 12/16 Medium
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '500' },
  // Button — 15–16/20 Semibold
  button: { fontSize: 15, lineHeight: 20, fontWeight: '600' },
  buttonLarge: { fontSize: 16, lineHeight: 20, fontWeight: '600' },
  // Numeric Highlight — 28/34 Semibold
  numeric: { fontSize: 28, lineHeight: 34, fontWeight: '600' },
};

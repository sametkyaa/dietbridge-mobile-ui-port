import { colors } from './colors';

// Gölge prensipleri (tasarım sistemi §3.3): düşük opaklık (%6–10), geniş blur
// (16–24px), Y offset 2–4px. Kart ayrımında öncelik yüzey kontrastı + spacing;
// sert border + güçlü gölge birlikte kullanılmaz.
export const shadows = {
  card: {
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  hero: {
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  sheet: {
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
};

import type { LucideIcon } from 'lucide-react'
import {
  Apple,
  CookingPot,
  Drumstick,
  Egg,
  Fish,
  Milk,
  Salad,
  Sandwich,
  Soup,
  Wheat,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/* Kanonik örnek veri — tüm ekranlarda birebir aynı kullanılır         */
/* ------------------------------------------------------------------ */

export const USER = {
  name: 'Elif Yılmaz',
  firstName: 'Elif',
  initials: 'EY',
  email: 'elif.yilmaz@ornek.com',
}

export const DIETITIAN = {
  name: 'Uzm. Dyt. Deniz Kaya',
  initials: 'DK',
  specialty: 'Klinik Beslenme Uzmanı',
}

export const WATER = {
  goalLitres: '2,5',
  drunkLitres: '1,4',
  percent: 56,
}

export const WEIGHT = {
  current: '72,4',
  start: '76,8',
  goal: '66',
  change: '−4,4',
  lastMeasure: '19 Temmuz',
}

export const TODAY = {
  date: '19 Temmuz Pazar',
  time: '12:45',
}

export const DIETITIAN_MESSAGE =
  'Günaydın Elif, bu hafta su tüketimini biraz daha düzenli takip edelim. Öğleden önce en az 1 litreyi tamamlamanı öneriyorum.'

export type MealStatus = 'tamamlandi' | 'siradaki' | 'bekliyor' | 'gecikti'

export interface Meal {
  id: string
  time: string
  type: string
  title: string
  status: MealStatus
  icon: LucideIcon
}

/* Bugünün (19 Temmuz Pazar) kanonik öğün planı */
export const MEALS: Meal[] = [
  { id: 'm1', time: '08:30', type: 'Kahvaltı', title: 'Yulaf, yoğurt, yaban mersini ve ceviz', status: 'tamamlandi', icon: Wheat },
  { id: 'm2', time: '11:00', type: 'Ara Öğün', title: 'Elma ve 10 adet çiğ badem', status: 'tamamlandi', icon: Apple },
  { id: 'm3', time: '13:30', type: 'Öğle', title: 'Izgara tavuklu Akdeniz salatası ve ayran', status: 'siradaki', icon: Salad },
  { id: 'm4', time: '17:00', type: 'Ara Öğün', title: 'Kefir ve bir küçük muz', status: 'bekliyor', icon: Milk },
  { id: 'm5', time: '20:00', type: 'Akşam', title: 'Fırında somon, sebze ve 3 yemek kaşığı bulgur', status: 'bekliyor', icon: Fish },
]

export const NEXT_MEAL = MEALS[2]

/* Haftalık plan — 14–20 Temmuz; 14→Sal … 19→Paz (bugün), 20→Pzt */
export interface DayPlan {
  date: number
  day: string
  meals: Meal[]
}

const done = (id: string, time: string, type: string, title: string, icon: LucideIcon): Meal => ({
  id, time, type, title, icon, status: 'tamamlandi',
})
const later = (id: string, time: string, type: string, title: string, icon: LucideIcon): Meal => ({
  id, time, type, title, icon, status: 'bekliyor',
})

export const WEEK: DayPlan[] = [
  {
    date: 14, day: 'Sal', meals: [
      done('d14-1', '08:30', 'Kahvaltı', 'Menemen, tam buğday ekmeği ve roka', Egg),
      done('d14-2', '12:30', 'Öğle', 'Mercimek çorbası, mevsim salata ve bir dilim ekmek', Soup),
      done('d14-3', '16:00', 'Ara Öğün', 'Yoğurt ve yarım muz', Milk),
      done('d14-4', '19:30', 'Akşam', 'Fırında tavuk, kabak mücver ve cacık', Drumstick),
    ],
  },
  {
    date: 15, day: 'Çar', meals: [
      done('d15-1', '08:30', 'Kahvaltı', 'Peynirli omlet, domates ve 5 zeytin', Egg),
      done('d15-2', '13:00', 'Öğle', 'Kıymalı kabak yemeği ve yoğurt', CookingPot),
      done('d15-3', '16:30', 'Ara Öğün', 'Elma ve 8 fındık', Apple),
      done('d15-4', '20:00', 'Akşam', 'Izgara levrek ve roka salatası', Fish),
    ],
  },
  {
    date: 16, day: 'Per', meals: [
      done('d16-1', '08:30', 'Kahvaltı', 'Yulaf lapası, süt ve çilek', Wheat),
      done('d16-2', '12:30', 'Öğle', 'Tavuklu kinoa salatası', Salad),
      done('d16-3', '17:00', 'Ara Öğün', 'Bir şişe kefir', Milk),
      done('d16-4', '19:30', 'Akşam', 'Fırında sebzeli köfte ve 3 kaşık bulgur', Drumstick),
    ],
  },
  {
    date: 17, day: 'Cum', meals: [
      done('d17-1', '09:00', 'Kahvaltı', 'Avokadolu tam buğday tost ve haşlanmış yumurta', Sandwich),
      done('d17-2', '13:00', 'Öğle', 'Nohutlu Akdeniz salatası', Salad),
      done('d17-3', '16:00', 'Ara Öğün', 'Yoğurt ve 10 çiğ badem', Milk),
      done('d17-4', '20:00', 'Akşam', 'Zeytinyağlı taze fasulye ve yoğurt', Soup),
    ],
  },
  {
    date: 18, day: 'Cmt', meals: [
      done('d18-1', '08:30', 'Kahvaltı', 'Süzme peynir, domates, salatalık ve 2 dilim ekmek', Sandwich),
      done('d18-2', '12:30', 'Öğle', 'Etli nohut ve 3 yemek kaşığı pilav', CookingPot),
      done('d18-3', '16:30', 'Ara Öğün', 'Bir küçük muz', Apple),
      done('d18-4', '19:30', 'Akşam', 'Izgara hindi ve karnabahar püresi', Drumstick),
    ],
  },
  { date: 19, day: 'Paz', meals: MEALS },
  {
    date: 20, day: 'Pzt', meals: [
      later('d20-1', '08:30', 'Kahvaltı', 'Yulaf, yoğurt ve şeftali', Wheat),
      later('d20-2', '13:00', 'Öğle', 'Tavuk şiş, bulgur ve roka', Drumstick),
      later('d20-3', '16:30', 'Ara Öğün', 'Kefir ve 8 fındık', Milk),
      later('d20-4', '20:00', 'Akşam', 'Fırında palamut ve mevsim salata', Fish),
    ],
  },
]

/* Haftalık kilo ölçümleri: 76,8 → 72,4 (8 ölçüm) */
export const WEIGHT_HISTORY = [
  { d: '1 Haz', kg: 76.8 },
  { d: '8 Haz', kg: 76.1 },
  { d: '15 Haz', kg: 75.4 },
  { d: '22 Haz', kg: 74.9 },
  { d: '29 Haz', kg: 74.2 },
  { d: '6 Tem', kg: 73.6 },
  { d: '12 Tem', kg: 73.0 },
  { d: '19 Tem', kg: 72.4 },
]

/* Su geçmişi — toplam 1,4 L (1400 ml) */
export const WATER_HISTORY = [
  { time: '12:35', amount: 250 },
  { time: '12:10', amount: 450 },
  { time: '11:30', amount: 250 },
  { time: '10:15', amount: 200 },
  { time: '08:40', amount: 250 },
]

/* Sohbet */
export interface ChatMessage {
  id: string
  from: 'dietitian' | 'user'
  text: string
  time: string
  state?: 'okundu' | 'gonderildi' | 'gonderilemedi'
}

export const CHAT: ChatMessage[] = [
  { id: 'c1', from: 'dietitian', text: DIETITIAN_MESSAGE, time: '09:12' },
  {
    id: 'c2', from: 'user', time: '09:18', state: 'okundu',
    text: 'Günaydın Deniz Hanım, tamam. Şu ana kadar 1 litreyi geçtim, öğleden önce tamamlarım.',
  },
  {
    id: 'c3', from: 'user', time: '12:31', state: 'gonderilemedi',
    text: 'Öğle öğününde tavuk yerine hindi yesem uygun olur mu?',
  },
]

/* Günlük makro takibi — adım + öğün bazlı protein/karbonhidrat/yağ hesabı.
   Değerler gram cinsinden; m3, Öğün Detay ekranındaki makro değerleriyle birebir aynıdır. */
export interface Macro {
  protein: number
  carb: number
  fat: number
}

export const MEAL_MACROS: Record<string, Macro> = {
  m1: { protein: 17, carb: 42, fat: 13 },
  m2: { protein: 3, carb: 21, fat: 6 },
  m3: { protein: 38, carb: 22, fat: 18 },
  m4: { protein: 9, carb: 24, fat: 2 },
  m5: { protein: 36, carb: 30, fat: 20 },
}

export const MACRO_GOALS: Macro = { protein: 105, carb: 140, fat: 60 }
export const STEPS_TODAY = 6240
export const STEP_GOAL = 8000

/* Tamamlanan öğünlerin makrolarını toplar — gün içinde ilerledikçe güncellenir */
export function computeConsumedMacros(meals: Meal[]): Macro {
  return meals
    .filter((m) => m.status === 'tamamlandi')
    .reduce<Macro>(
      (acc, m) => {
        const mac = MEAL_MACROS[m.id]
        if (!mac) return acc
        return { protein: acc.protein + mac.protein, carb: acc.carb + mac.carb, fat: acc.fat + mac.fat }
      },
      { protein: 0, carb: 0, fat: 0 },
    )
}

/* Vücut ölçüleri — başlangıç (1 Haz) → güncel (12 Temmuz), cm */
export interface BodyMeasure {
  key: string
  label: string
  start: number
  current: number
}

export const BODY_MEASURES: BodyMeasure[] = [
  { key: 'bel', label: 'Bel', start: 84, current: 78 },
  { key: 'kalca', label: 'Kalça', start: 104, current: 99 },
  { key: 'gogus', label: 'Göğüs', start: 98, current: 94 },
  { key: 'kol', label: 'Kol', start: 32, current: 30 },
]
export const BODY_MEASURE_DATE = '12 Temmuz'

/* Ölçüm geçmişi — her ölçüm için 4 nokta; son değerler BODY_MEASURES ile birebir aynı */
export interface MeasurePoint {
  d: string
  cm: number
}

export const BODY_MEASURE_HISTORY: Record<string, { label: string; points: MeasurePoint[] }> = {
  bel: {
    label: 'Bel',
    points: [
      { d: '1 Haz', cm: 84 },
      { d: '15 Haz', cm: 82 },
      { d: '29 Haz', cm: 80 },
      { d: '12 Tem', cm: 78 },
    ],
  },
  kalca: {
    label: 'Kalça',
    points: [
      { d: '1 Haz', cm: 104 },
      { d: '15 Haz', cm: 102 },
      { d: '29 Haz', cm: 100 },
      { d: '12 Tem', cm: 99 },
    ],
  },
  gogus: {
    label: 'Göğüs',
    points: [
      { d: '1 Haz', cm: 98 },
      { d: '15 Haz', cm: 97 },
      { d: '29 Haz', cm: 95 },
      { d: '12 Tem', cm: 94 },
    ],
  },
  kol: {
    label: 'Kol',
    points: [
      { d: '1 Haz', cm: 32 },
      { d: '15 Haz', cm: 31.5 },
      { d: '29 Haz', cm: 30.5 },
      { d: '12 Tem', cm: 30 },
    ],
  },
}

/* Haftalık su tüketimi (L) — 13–19 Temmuz; Paz = bugün, gün devam ettiği için 1,4 L */
export const WATER_WEEK = [
  { day: 'Pzt', litres: 2.3 },
  { day: 'Sal', litres: 2.6 },
  { day: 'Çar', litres: 1.8 },
  { day: 'Per', litres: 2.5 },
  { day: 'Cum', litres: 2.2 },
  { day: 'Cmt', litres: 1.6 },
  { day: 'Paz', litres: 1.4 },
]
export const WATER_GOAL_L = 2.5

/* Öğün detayı — 13:30 Öğle */
export const MEAL_DETAIL = {
  contents: [
    'Izgara tavuk göğsü — 120 g',
    'Akdeniz yeşillikleri (roka, marul) — 1 büyük kâse',
    'Domates, salatalık ve kırmızı soğan',
    'Zeytin — 5 adet',
    'Zeytinyağı-limon sos — 1 yemek kaşığı',
    'Ayran — 1 kâse (200 ml)',
  ],
  note: 'Salatadaki zeytinyağını bir kaşıkla sınırlı tutalım; yanına ayran dışında içecek eklemene gerek yok.',
  macros: [
    { label: 'Kalori', value: '≈420 kkal' },
    { label: 'Protein', value: '38 g' },
    { label: 'Karbonhidrat', value: '22 g' },
    { label: 'Yağ', value: '18 g' },
  ],
}

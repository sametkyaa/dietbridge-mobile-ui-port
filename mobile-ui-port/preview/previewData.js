/**
 * UI preview fixtures only.
 * Production runtime tarafından kullanılmamalıdır.
 *
 * dietbridge-showcase/src/dietbridge/data.ts'ten türetilmiş Türkçe önizleme
 * verileri. Meal status'ları StatusBadge bileşeninin anahtarlarına eşlenmiştir:
 * tamamlandi→completed, siradaki→upcoming, bekliyor→waiting, gecikti→delayed.
 * Web'deki Lucide ikon referansları Icon glyph adlarıyla değiştirilmiştir.
 */

export const previewUser = {
  name: 'Elif Yılmaz',
  firstName: 'Elif',
  initials: 'EY',
  email: 'elif.yilmaz@ornek.com',
};

export const previewDietitian = {
  name: 'Uzm. Dyt. Deniz Kaya',
  initials: 'DK',
  specialty: 'Klinik Beslenme Uzmanı',
  connectionStatus: 'connected',
};

export const previewWater = {
  goalLitres: '2,5',
  drunkLitres: '1,4',
  percent: 56,
};

export const previewWeight = {
  current: '72,4',
  start: '76,8',
  goal: '66',
  change: '−4,4',
  lastMeasure: '19 Temmuz',
};

export const previewToday = {
  date: '19 Temmuz Pazar',
  time: '12:45',
};

export const previewDietitianMessage =
  'Günaydın Elif, bu hafta su tüketimini biraz daha düzenli takip edelim. Öğleden önce en az 1 litreyi tamamlamanı öneriyorum.';

/* Bugünün (19 Temmuz Pazar) öğün planı */
export const previewMeals = [
  { id: 'm1', time: '08:30', type: 'Kahvaltı', title: 'Yulaf, yoğurt, yaban mersini ve ceviz', status: 'completed', icon: 'check' },
  { id: 'm2', time: '11:00', type: 'Ara Öğün', title: 'Elma ve 10 adet çiğ badem', status: 'completed', icon: 'check' },
  { id: 'm3', time: '13:30', type: 'Öğle', title: 'Izgara tavuklu Akdeniz salatası ve ayran', status: 'upcoming', icon: 'clock' },
  { id: 'm4', time: '17:00', type: 'Ara Öğün', title: 'Kefir ve bir küçük muz', status: 'waiting', icon: 'hourglass' },
  { id: 'm5', time: '20:00', type: 'Akşam', title: 'Fırında somon, sebze ve 3 yemek kaşığı bulgur', status: 'waiting', icon: 'hourglass' },
];

export const previewNextMeal = previewMeals[2];

/* Haftalık plan — 14–20 Temmuz */
const done = (id, time, type, title) => ({ id, time, type, title, status: 'completed', icon: 'check' });
const later = (id, time, type, title) => ({ id, time, type, title, status: 'waiting', icon: 'hourglass' });

export const previewWeek = [
  {
    date: 14, day: 'Sal', isToday: false, meals: [
      done('d14-1', '08:30', 'Kahvaltı', 'Menemen, tam buğday ekmeği ve roka'),
      done('d14-2', '12:30', 'Öğle', 'Mercimek çorbası, mevsim salata ve bir dilim ekmek'),
      done('d14-3', '16:00', 'Ara Öğün', 'Yoğurt ve yarım muz'),
      done('d14-4', '19:30', 'Akşam', 'Fırında tavuk, kabak mücver ve cacık'),
    ],
  },
  {
    date: 15, day: 'Çar', isToday: false, meals: [
      done('d15-1', '08:30', 'Kahvaltı', 'Peynirli omlet, domates ve 5 zeytin'),
      done('d15-2', '13:00', 'Öğle', 'Kıymalı kabak yemeği ve yoğurt'),
      done('d15-3', '16:30', 'Ara Öğün', 'Elma ve 8 fındık'),
      done('d15-4', '20:00', 'Akşam', 'Izgara levrek ve roka salatası'),
    ],
  },
  {
    date: 16, day: 'Per', isToday: false, meals: [
      done('d16-1', '08:30', 'Kahvaltı', 'Yulaf lapası, süt ve çilek'),
      done('d16-2', '12:30', 'Öğle', 'Tavuklu kinoa salatası'),
      done('d16-3', '17:00', 'Ara Öğün', 'Bir şişe kefir'),
      done('d16-4', '19:30', 'Akşam', 'Fırında sebzeli köfte ve 3 kaşık bulgur'),
    ],
  },
  {
    date: 17, day: 'Cum', isToday: false, meals: [
      done('d17-1', '09:00', 'Kahvaltı', 'Avokadolu tam buğday tost ve haşlanmış yumurta'),
      done('d17-2', '13:00', 'Öğle', 'Nohutlu Akdeniz salatası'),
      done('d17-3', '16:00', 'Ara Öğün', 'Yoğurt ve 10 çiğ badem'),
      done('d17-4', '20:00', 'Akşam', 'Zeytinyağlı taze fasulye ve yoğurt'),
    ],
  },
  {
    date: 18, day: 'Cmt', isToday: false, meals: [
      done('d18-1', '08:30', 'Kahvaltı', 'Süzme peynir, domates, salatalık ve 2 dilim ekmek'),
      done('d18-2', '12:30', 'Öğle', 'Etli nohut ve 3 yemek kaşığı pilav'),
      done('d18-3', '16:30', 'Ara Öğün', 'Bir küçük muz'),
      done('d18-4', '19:30', 'Akşam', 'Izgara hindi ve karnabahar püresi'),
    ],
  },
  { date: 19, day: 'Paz', isToday: true, meals: previewMeals },
  {
    date: 20, day: 'Pzt', isToday: false, meals: [
      later('d20-1', '08:30', 'Kahvaltı', 'Yulaf, yoğurt ve şeftali'),
      later('d20-2', '13:00', 'Öğle', 'Tavuk şiş, bulgur ve roka'),
      later('d20-3', '16:30', 'Ara Öğün', 'Kefir ve 8 fındık'),
      later('d20-4', '20:00', 'Akşam', 'Fırında palamut ve mevsim salata'),
    ],
  },
];

/* Haftalık kilo ölçümleri: 76,8 → 72,4 (8 ölçüm) */
export const previewWeightHistory = [
  { d: '1 Haz', kg: 76.8 },
  { d: '8 Haz', kg: 76.1 },
  { d: '15 Haz', kg: 75.4 },
  { d: '22 Haz', kg: 74.9 },
  { d: '29 Haz', kg: 74.2 },
  { d: '6 Tem', kg: 73.6 },
  { d: '12 Tem', kg: 73.0 },
  { d: '19 Tem', kg: 72.4 },
];

/* Su geçmişi — toplam 1,4 L (1400 ml) */
export const previewWaterHistory = [
  { time: '12:35', amount: 250 },
  { time: '12:10', amount: 450 },
  { time: '11:30', amount: 250 },
  { time: '10:15', amount: 200 },
  { time: '08:40', amount: 250 },
];

/* Sohbet */
export const previewChat = [
  { id: 'c1', from: 'dietitian', text: previewDietitianMessage, time: '09:12' },
  {
    id: 'c2', from: 'user', time: '09:18', state: 'okundu',
    text: 'Günaydın Deniz Hanım, tamam. Şu ana kadar 1 litreyi geçtim, öğleden önce tamamlarım.',
  },
  {
    id: 'c3', from: 'user', time: '12:31', state: 'gonderilemedi',
    text: 'Öğle öğününde tavuk yerine hindi yesem uygun olur mu?',
  },
];

/* Günlük makro takibi — gram cinsinden */
export const previewMealMacros = {
  m1: { protein: 17, carb: 42, fat: 13 },
  m2: { protein: 3, carb: 21, fat: 6 },
  m3: { protein: 38, carb: 22, fat: 18 },
  m4: { protein: 9, carb: 24, fat: 2 },
  m5: { protein: 36, carb: 30, fat: 20 },
};

export const previewMacroGoals = { protein: 105, carb: 140, fat: 60 };
export const previewSteps = { today: 6240, goal: 8000 };

/* Vücut ölçüleri — başlangıç (1 Haz) → güncel (12 Temmuz), cm */
export const previewBodyMeasures = [
  { key: 'bel', label: 'Bel', start: 84, current: 78 },
  { key: 'kalca', label: 'Kalça', start: 104, current: 99 },
  { key: 'gogus', label: 'Göğüs', start: 98, current: 94 },
  { key: 'kol', label: 'Kol', start: 32, current: 30 },
];
export const previewBodyMeasureDate = '12 Temmuz';

export const previewBodyMeasureHistory = {
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
};

/* Haftalık su tüketimi (L) — 13–19 Temmuz */
export const previewWaterWeek = [
  { day: 'Pzt', litres: 2.3 },
  { day: 'Sal', litres: 2.6 },
  { day: 'Çar', litres: 1.8 },
  { day: 'Per', litres: 2.5 },
  { day: 'Cum', litres: 2.2 },
  { day: 'Cmt', litres: 1.6 },
  { day: 'Paz', litres: 1.4 },
];
export const previewWaterGoalL = 2.5;

/* Öğün detayı — 13:30 Öğle */
export const previewMealDetail = {
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
};

/* Bildirimler — showcase'de karşılığı yok; tasarım diline uygun örnekler */
export const previewNotifications = [
  {
    id: 'n1',
    type: 'message',
    title: 'Yeni mesaj',
    body: 'Uzm. Dyt. Deniz Kaya size bir mesaj gönderdi.',
    time: '09:12',
    read: false,
  },
  {
    id: 'n2',
    type: 'reminder',
    title: 'Ölçüm hatırlatması',
    body: 'Haftalık kilo ölçümünü eklemeyi unutma.',
    time: '08:00',
    read: true,
  },
  {
    id: 'n3',
    type: 'plan',
    title: 'Plan güncellendi',
    body: 'Gelecek haftanın öğün planı hazır.',
    time: 'Dün',
    read: true,
  },
];

/* Profil — kişisel bilgiler + hedefler (UI preview) */
export const previewProfile = {
  ...previewUser,
  birthYear: 1992,
  heightCm: 165,
  goalLabel: 'Kilo verme',
  activityLabel: 'Az hareketli',
  dietitian: previewDietitian,
};

/* ------------------------- Phase 5–7 fixtures ------------------------- */

/* Konuşma listesi — MessagesListView formatı */
export const previewConversations = [
  {
    id: 'conv-1',
    name: previewDietitian.name,
    initials: previewDietitian.initials,
    lastMessage: previewDietitianMessage,
    timeLabel: '09:12',
    unreadCount: 1,
  },
];

/* Sohbet — ChatView formatı (eski → yeni) */
export const previewChatMessages = [
  { id: 'c1', from: 'other', text: previewDietitianMessage, timeLabel: '09:12', dateLabel: 'Bugün' },
  {
    id: 'c2',
    from: 'me',
    timeLabel: '09:18',
    status: 'read',
    text: 'Günaydın Deniz Hanım, tamam. Şu ana kadar 1 litreyi geçtim, öğleden önce tamamlarım.',
  },
  {
    id: 'c3',
    from: 'me',
    timeLabel: '12:31',
    status: 'failed',
    text: 'Öğle öğününde tavuk yerine hindi yesem uygun olur mu?',
  },
  {
    id: 'c4',
    from: 'other',
    timeLabel: '12:40',
    imageUri: 'https://picsum.photos/seed/dietbridge-tabak/440/330',
    caption: 'Öğle tabağının örnek düzeni bu şekilde olabilir.',
    status: 'read',
  },
];

export const previewChatConversation = {
  name: previewDietitian.name,
  initials: previewDietitian.initials,
  statusLabel: 'Çevrimiçi',
  online: true,
};

/* Kilo özeti + grafik noktaları — ProgressView formatı */
export const previewWeightSummary = {
  current: previewWeight.current,
  start: previewWeight.start,
  target: previewWeight.goal,
  change: previewWeight.change,
  unit: 'kg',
};
export const previewWeightHistoryPoints = previewWeightHistory.map((p, i) => ({
  id: `w${i + 1}`,
  dateLabel: p.d,
  value: p.kg,
}));

/* Su — ProgressView waterWeekly formatı */
export const previewWaterWeekly = {
  days: previewWaterWeek,
  goalLitres: previewWaterGoalL,
  averageLabel: (previewWaterWeek.reduce((t, d) => t + d.litres, 0) / previewWaterWeek.length)
    .toFixed(1)
    .replace('.', ','),
  footnote: `Bu hafta ${previewWaterWeek.filter((d) => d.litres >= previewWaterGoalL).length} gün hedefe ulaştın. Bugünkü tüketimin 1,4 L — gün devam ediyor.`,
};

/* Ölçü ekleme sheet'i alanları — AddMeasurementSheetView formatı */
export const previewMeasurementFields = previewBodyMeasures.map((m) => ({
  key: m.key,
  label: m.label,
  unit: 'cm',
}));

/* Ölçü geçmişi — MeasurementHistoryView formatı (ölçüm türü başına) */
function toMeasureHistory(key, m) {
  const first = m.points[0];
  const last = m.points[m.points.length - 1];
  const entries = [...m.points].reverse().map((p, i, arr) => {
    const prev = i < arr.length - 1 ? arr[i + 1] : null;
    const delta = prev ? p.cm - prev.cm : null;
    const deltaText =
      delta === null
        ? 'Başlangıç'
        : `${delta <= 0 ? '−' : '+'}${Math.abs(delta).toFixed(1).replace('.', ',').replace(',0', '')} cm`;
    return {
      id: `${key}-${p.d}`,
      dateLabel: p.d,
      valueLabel: `${String(p.cm).replace('.', ',')} cm`,
      deltaLabel: deltaText,
    };
  });
  return {
    summary: {
      label: m.label,
      current: last.cm,
      start: first.cm,
      unit: 'cm',
      lastMeasureLabel: previewBodyMeasureDate,
    },
    points: m.points.map((p, i) => ({ id: `${key}-p${i}`, dateLabel: p.d, value: p.cm })),
    entries,
  };
}

export const previewMeasureHistoryOptions = Object.entries(previewBodyMeasureHistory).map(
  ([key, m]) => ({ key, label: m.label }),
);
export const previewMeasureHistoryByKey = Object.fromEntries(
  Object.entries(previewBodyMeasureHistory).map(([key, m]) => [key, toMeasureHistory(key, m)]),
);

/* Profil menüsü — ProfileView sections formatı */
export const previewProfileSections = [
  { key: 'personal', icon: 'person', label: 'Kişisel bilgiler', value: `${previewUser.name} · 31 yaş` },
  { key: 'goal', icon: 'target', label: 'Hedef ve ölçüler', value: `${previewWeight.current} kg · Hedef ${previewWeight.goal} kg` },
  { key: 'lifestyle', icon: 'leaf', label: 'Yaşam tarzı', value: `Orta aktif · ${previewWater.goalLitres} L su` },
  { key: 'health', icon: 'heartPulse', label: 'Sağlık ve beslenme', value: 'Laktoz intoleransı' },
  { key: 'notifications', icon: 'bell', label: 'Bildirimler', value: '4 tercih açık' },
  { key: 'privacy', icon: 'shield', label: 'Gizlilik ve güvenlik', value: '' },
];

/* Profil düzenleme formları — başlangıç değerleri (UI preview) */
export const previewPersonalInfoForm = {
  fullName: previewUser.name,
  phone: '0532 418 76 90',
  birthDate: '22 Ekim 1994',
};

/* Mevcut kilo bu formda YOK — ayrı ölçüm akışı (ProgressView + AddWeightSheetView) */
export const previewGoalForm = {
  heightCm: '167',
  targetWeightKg: previewWeight.goal,
  goal: 'lose',
  waterGoalLitres: previewWaterGoalL,
  waistCm: '74',
  hipCm: '96',
  chestCm: '92',
  armCm: '29',
};

/* Uyku sayısal saat olarak tutulur (chip değil) */
export const previewLifestyleForm = {
  activity: 'moderate',
  dietType: 'everything',
  sleepHours: '7,5',
  smoking: 'none',
  alcohol: 'occasional',
};

export const previewHealthForm = {
  bloodType: 'aPos',
  conditions: ['hypothyroid'],
  medications: ['levothyroxine'],
  intolerances: ['lactose', 'sesame'],
  dislikedFoods: ['coriander'],
  lastCheckupDate: '28 Mayıs 2026',
};

/* Bildirim tercihleri — NotificationSettingsView formatı */
export const previewNotificationSections = [
  {
    key: 'reminders',
    title: 'Hatırlatmalar',
    items: [
      { key: 'upcomingMeal', label: 'Yaklaşan öğün', description: 'Öğün saatinden 45 dakika önce hatırlat.' },
      { key: 'measurement', label: 'Ölçüm hatırlatması', description: 'Haftalık kilo ölçümünü hatırlat.' },
      { key: 'water', label: 'Su hatırlatması', description: 'Gün içinde düzenli aralıklarla su içmeyi hatırlat.' },
    ],
  },
  {
    key: 'updates',
    title: 'Güncellemeler',
    items: [
      { key: 'newMessage', label: 'Yeni mesaj', description: 'Diyetisyeninden mesaj geldiğinde bildir.' },
      { key: 'planUpdated', label: 'Plan güncellendi', description: 'Diyetisyenin planını değiştirdiğinde bildir.' },
    ],
  },
];
export const previewNotificationValues = {
  upcomingMeal: true,
  measurement: true,
  water: false,
  newMessage: true,
  planUpdated: true,
};

const previewData = {
  user: previewUser,
  profile: previewProfile,
  dietitian: previewDietitian,
  water: previewWater,
  weight: previewWeight,
  today: previewToday,
  meals: previewMeals,
  nextMeal: previewNextMeal,
  week: previewWeek,
  weightHistory: previewWeightHistory,
  waterHistory: previewWaterHistory,
  waterWeek: previewWaterWeek,
  waterGoalL: previewWaterGoalL,
  chat: previewChat,
  mealMacros: previewMealMacros,
  macroGoals: previewMacroGoals,
  steps: previewSteps,
  bodyMeasures: previewBodyMeasures,
  bodyMeasureDate: previewBodyMeasureDate,
  bodyMeasureHistory: previewBodyMeasureHistory,
  mealDetail: previewMealDetail,
  notifications: previewNotifications,
  conversations: previewConversations,
  chatMessages: previewChatMessages,
  chatConversation: previewChatConversation,
  weightSummary: previewWeightSummary,
  weightHistoryPoints: previewWeightHistoryPoints,
  waterWeekly: previewWaterWeekly,
  measurementFields: previewMeasurementFields,
  measureHistoryOptions: previewMeasureHistoryOptions,
  measureHistoryByKey: previewMeasureHistoryByKey,
  profileSections: previewProfileSections,
  personalInfoForm: previewPersonalInfoForm,
  goalForm: previewGoalForm,
  lifestyleForm: previewLifestyleForm,
  healthForm: previewHealthForm,
  notificationSections: previewNotificationSections,
  notificationValues: previewNotificationValues,
};

export default previewData;

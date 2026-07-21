import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme';
import {
  AppButton,
  AppCard,
  AppInput,
  AppScreen,
  AppSkeleton,
  BottomSheetView,
  ChoiceChip,
  EmptyState,
  ErrorState,
  Icon,
  InlineAlert,
  SkeletonCard,
  StatusBadge,
} from '../components';
import { HomeView } from '../features/home';
import { MealPlanView } from '../features/meal-plan';
import {
  MealDetailView,
  MealPhotoErrorView,
  MealPhotoSheetView,
  MealPhotoUploadingView,
} from '../features/meal-detail';
import { WaterSheetView } from '../features/water';
import {
  EmptyDataView,
  FullScreenErrorView,
  PullToRefreshHint,
  ToastView,
} from '../features/status';
import {
  DietitianConnectionActiveView,
  DietitianConnectionEmptyView,
  DietitianConnectionErrorView,
  DietitianConnectionPendingView,
  ForgotPasswordSuccessView,
  ForgotPasswordView,
  LoginView,
  ProfileSetupStep1View,
  ProfileSetupStep2View,
  ProfileSetupStep3View,
  ProfileSetupStep4View,
  RegisterView,
  SplashView,
  WelcomeView,
} from '../features/onboarding';
import {
  AddMeasurementSheetView,
  AddWeightSheetView,
  MeasurementHistoryView,
  ProgressView,
} from '../features/progress';
import { ChatView, MessagesListView } from '../features/messages';
import {
  GoalEditView,
  HealthEditView,
  LifestyleEditView,
  NotificationSettingsView,
  PersonalInfoEditView,
  PrivacySecurityView,
  ProfileView,
  UnsavedChangesDialogView,
} from '../features/profile';
import previewData from './previewData';

/**
 * PreviewGallery — Phase 1 paylaşılan bileşenler + Phase 2/3 feature
 * görünümlerinin çalışan demosu. previewData'yı yalnızca bu dosya import eder.
 */

const noop = () => {};

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

/* ------------------------------- Phase 1 ------------------------------- */

function ButtonsDemo() {
  const [loading, setLoading] = useState(false);
  return (
    <Section title="AppButton">
      <AppButton
        variant="primary"
        label="Kaydet"
        loading={loading}
        onPress={() => {
          setLoading(true);
          // UI-only demo: loading durumunu göstermek için kısa geri dönüş
          setTimeout(() => setLoading(false), 1200);
        }}
      />
      <AppButton variant="secondary" label="Öğünü tamamla" onPress={() => {}} />
      <AppButton variant="text" label="Tümünü gör" onPress={() => {}} />
      <AppButton variant="primary" label="Pasif buton" disabled onPress={() => {}} />
      <AppButton
        variant="secondary"
        label="250 ml ekle"
        icon={<Icon name="plus" size={16} color={colors.primaryDark} accessible={false} />}
        onPress={() => {}}
      />
    </Section>
  );
}

function BadgesDemo() {
  return (
    <Section title="StatusBadge">
      <View style={styles.row}>
        {previewData.meals.map((m) => (
          <StatusBadge key={m.id} status={m.status} />
        ))}
      </View>
      <View style={styles.row}>
        <StatusBadge status="delayed" />
        <StatusBadge status="connected" />
        <StatusBadge status="info" />
        <StatusBadge status="upcoming" label="45 dk sonra" />
      </View>
    </Section>
  );
}

function ChipsDemo() {
  const [selected, setSelected] = useState('Kahvaltı');
  const types = ['Kahvaltı', 'Öğle', 'Ara Öğün', 'Akşam'];
  return (
    <Section title="ChoiceChip">
      <View style={styles.row}>
        {types.map((t) => (
          <ChoiceChip key={t} label={t} selected={selected === t} onPress={() => setSelected(t)} />
        ))}
        <ChoiceChip label="Pasif" disabled onPress={() => {}} />
      </View>
    </Section>
  );
}

function InputsDemo() {
  const [name, setName] = useState(previewData.user.name);
  const [weight, setWeight] = useState('');
  const [note, setNote] = useState('');
  return (
    <Section title="AppInput">
      <AppInput label="Ad Soyad" value={name} onChangeText={setName} placeholder="Adınız" />
      <AppInput
        label="Kilo (kg)"
        value={weight}
        onChangeText={setWeight}
        placeholder="örn. 72,4"
        keyboardType="decimal-pad"
        hint="Son ölçüm: 19 Temmuz"
      />
      <AppInput
        label="E-posta"
        value="hatali-adres"
        onChangeText={() => {}}
        error="Geçerli bir e-posta adresi girin."
      />
      <AppInput
        label="Not"
        value={note}
        onChangeText={setNote}
        placeholder="Diyetisyeninize not ekleyin"
        multiline
      />
      <AppInput label="Pasif alan" value="Düzenlenemez" editable={false} onChangeText={() => {}} />
    </Section>
  );
}

function FeedbackDemo() {
  const [showInfo, setShowInfo] = useState(true);
  return (
    <Section title="Geri bildirim">
      {showInfo ? (
        <InlineAlert
          variant="info"
          title="Hatırlatma"
          message={`Bugün hedefin ${previewData.water.goalLitres} L su. Şu ana kadar ${previewData.water.drunkLitres} L içtin.`}
          onDismiss={() => setShowInfo(false)}
        />
      ) : null}
      <InlineAlert variant="success" message="Öğün tamamlandı olarak işaretlendi." />
      <InlineAlert variant="warning" title="Ölçüm zamanı" message="Haftalık kilo ölçümünü ekleyebilirsin." />
      <InlineAlert variant="error" message="Mesaj gönderilemedi. Tekrar deneyebilirsin." />
      <EmptyState
        icon="calendar"
        title="Öğün planı yok"
        description="Bugün için planlanmış öğün bulunmuyor."
        actionLabel="Diyetisyene yaz"
        onAction={() => {}}
      />
      <AppCard style={styles.errorCard}>
        <ErrorState
          title="Bağlantı kurulamadı"
          description="İnternet bağlantını kontrol edip tekrar deneyebilirsin."
          onRetry={() => {}}
        />
      </AppCard>
    </Section>
  );
}

function SkeletonDemo() {
  return (
    <Section title="AppSkeleton">
      <AppSkeleton height={14} />
      <AppSkeleton lines={3} height={12} />
      <SkeletonCard />
      <SkeletonCard animated />
    </Section>
  );
}

function SheetDemo() {
  const [visible, setVisible] = useState(false);
  return (
    <Section title="BottomSheetView">
      <AppButton variant="secondary" label="Su ekle (sheet aç)" onPress={() => setVisible(true)} />
      <BottomSheetView
        visible={visible}
        onClose={() => setVisible(false)}
        title="Su ekle"
        footer={
          <AppButton variant="primary" label="Ekle" onPress={() => setVisible(false)} />
        }
      >
        <Text style={styles.sheetText}>
          Bugün {previewData.water.drunkLitres} / {previewData.water.goalLitres} L
        </Text>
        <View style={styles.row}>
          <ChoiceChip label="+200 ml" onPress={() => {}} />
          <ChoiceChip label="+250 ml" selected onPress={() => {}} />
          <ChoiceChip label="+500 ml" onPress={() => {}} />
        </View>
      </BottomSheetView>
    </Section>
  );
}

/* --------------------------- Phase 2/3 yardımcıları --------------------------- */

/** Tamamlanan öğünlerden makro satırları türetir (DailyMacrosCard formatı). */
function buildMacros(meals) {
  const done = meals.filter((m) => m.status === 'completed');
  const consumed = done.reduce(
    (acc, m) => {
      const x = previewData.mealMacros[m.id] || { protein: 0, carb: 0, fat: 0 };
      return { protein: acc.protein + x.protein, carb: acc.carb + x.carb, fat: acc.fat + x.fat };
    },
    { protein: 0, carb: 0, fat: 0 },
  );
  const g = previewData.macroGoals;
  const s = previewData.steps;
  return {
    completedCount: done.length,
    rows: [
      {
        key: 'adim', label: 'Adım', icon: 'footprints', tone: 'info',
        consumed: s.today.toLocaleString('tr-TR'), target: s.goal.toLocaleString('tr-TR'),
        percent: (s.today / s.goal) * 100,
      },
      {
        key: 'protein', label: 'Protein', icon: 'drumstick', tone: 'primary',
        consumed: `${consumed.protein}`, target: `${g.protein} g`,
        percent: (consumed.protein / g.protein) * 100,
      },
      {
        key: 'karb', label: 'Karbonhidrat', icon: 'wheat', tone: 'teal',
        consumed: `${consumed.carb}`, target: `${g.carb} g`,
        percent: (consumed.carb / g.carb) * 100,
      },
      {
        key: 'yag', label: 'Yağ', icon: 'droplet', tone: 'warning',
        consumed: `${consumed.fat}`, target: `${g.fat} g`,
        percent: (consumed.fat / g.fat) * 100,
      },
    ],
  };
}

const mealsWithLabels = previewData.meals.map((m) =>
  m.status === 'upcoming' ? { ...m, badgeLabel: '45 dk sonra' } : m,
);

const homeWater = {
  drunkLabel: `${previewData.water.drunkLitres} L`,
  goalLabel: `Hedef ${previewData.water.goalLitres} L`,
  percent: previewData.water.percent,
};

const homeMessage = {
  name: previewData.dietitian.name,
  initials: previewData.dietitian.initials,
  metaLabel: 'Diyetisyenin · 09:12',
  text: previewData.dietitianMessage,
};

const homeCallbacks = {
  onNotificationPress: noop,
  onAvatarPress: noop,
  onMealPress: noop,
  onToggleMeal: noop,
  onUndoMeal: noop,
  onAddWater: noop,
  onUndoWater: noop,
  onOpenWaterHistory: noop,
  onOpenMessages: noop,
  onOpenPlan: noop,
  onRetry: noop,
  onRefresh: noop,
};

/* --------------------------------- HomeView --------------------------------- */

function Frame({ children, tall = true }) {
  return <View style={[styles.demoFrame, !tall && styles.demoFrameShort]}>{children}</View>;
}

function HomeReadyDemo() {
  return (
    <Section title="HomeView — Hazır">
      <Frame>
        <HomeView
          status="ready"
          user={previewData.user}
          dateLabel={previewData.today.date}
          hasUnreadNotifications
          macros={buildMacros(previewData.meals)}
          nextMeal={{ ...previewData.nextMeal, badgeLabel: '45 dk sonra' }}
          nextMealSummary="Izgara tavuk, Akdeniz yeşillikleri, zeytin ve bir kâse ayran"
          meals={mealsWithLabels}
          water={homeWater}
          dietitianMessage={homeMessage}
          {...homeCallbacks}
        />
      </Frame>
    </Section>
  );
}

function HomeStatesDemo() {
  const eatenMeals = previewData.meals.map((m) =>
    m.id === 'm3' ? { ...m, status: 'completed' } : m,
  );
  const delayedMeals = previewData.meals.map((m) =>
    m.id === 'm2' ? { ...m, status: 'delayed' } : m,
  );
  const allDoneMeals = previewData.meals.map((m) => ({ ...m, status: 'completed' }));
  return (
    <Section title="HomeView — Durumlar">
      <Text style={styles.demoCaption}>Yükleniyor</Text>
      <Frame tall={false}>
        <HomeView status="loading" />
      </Frame>

      <Text style={styles.demoCaption}>Plan yok (su takibi kullanılabilir kalır)</Text>
      <Frame tall={false}>
        <HomeView
          status="empty"
          user={previewData.user}
          dateLabel={previewData.today.date}
          water={{ ...homeWater, drunkLabel: '0,0 L', percent: 0 }}
          {...homeCallbacks}
        />
      </Frame>

      <Text style={styles.demoCaption}>Veri hatası</Text>
      <Frame tall={false}>
        <HomeView status="error" onRetry={noop} />
      </Frame>

      <Text style={styles.demoCaption}>Çevrimdışı (önbellek içeriği)</Text>
      <Frame>
        <HomeView
          status="ready"
          isOffline
          user={previewData.user}
          dateLabel={previewData.today.date}
          macros={buildMacros(previewData.meals)}
          nextMeal={{ ...previewData.nextMeal, badgeLabel: '45 dk sonra' }}
          meals={mealsWithLabels}
          water={homeWater}
          {...homeCallbacks}
        />
      </Frame>

      <Text style={styles.demoCaption}>Öğün yedim (tamamlandı + geri al)</Text>
      <Frame>
        <HomeView
          status="ready"
          user={previewData.user}
          dateLabel={previewData.today.date}
          macros={buildMacros(eatenMeals)}
          nextMeal={{ ...previewData.nextMeal, status: 'completed', badgeLabel: 'Tamamlandı · 13:38' }}
          meals={eatenMeals}
          water={homeWater}
          dietitianMessage={homeMessage}
          {...homeCallbacks}
        />
      </Frame>

      <Text style={styles.demoCaption}>Geciken öğün</Text>
      <Frame>
        <HomeView
          status="ready"
          user={previewData.user}
          dateLabel={previewData.today.date}
          macros={buildMacros(delayedMeals)}
          nextMeal={{ ...previewData.meals[1], status: 'delayed', badgeLabel: 'Gecikti' }}
          nextMealSummary="1 orta boy elma ve 10 adet çiğ badem"
          meals={delayedMeals}
          water={homeWater}
          dietitianMessage={homeMessage}
          {...homeCallbacks}
        />
      </Frame>

      <Text style={styles.demoCaption}>Gün tamamlandı</Text>
      <Frame>
        <HomeView
          status="ready"
          user={previewData.user}
          greeting="İyi akşamlar, Elif"
          dateLabel={previewData.today.date}
          macros={buildMacros(allDoneMeals)}
          meals={allDoneMeals}
          water={{ ...homeWater, drunkLabel: '2,1 L', percent: 84 }}
          dayCompletion={{
            allCompleted: true,
            title: 'Bugünkü 5 öğünü tamamladın',
            description: 'Planına sadık kaldığın bir gün oldu. Yarınki planın hazır.',
          }}
          {...homeCallbacks}
        />
      </Frame>

      <Text style={styles.demoCaption}>Öğün işlemi sürüyor (pending — hero ve satır kilitli)</Text>
      <Frame>
        <HomeView
          status="ready"
          user={previewData.user}
          dateLabel={previewData.today.date}
          macros={buildMacros(previewData.meals)}
          nextMeal={{ ...previewData.nextMeal, badgeLabel: '45 dk sonra' }}
          nextMealSummary="Izgara tavuk, Akdeniz yeşillikleri, zeytin ve bir kâse ayran"
          meals={mealsWithLabels}
          water={homeWater}
          dietitianMessage={homeMessage}
          updatingMealId="m3"
          {...homeCallbacks}
        />
      </Frame>

      <Text style={styles.demoCaption}>Su ekleme sürüyor (pending — hızlı düğmeler kilitli)</Text>
      <Frame tall={false}>
        <HomeView
          status="ready"
          user={previewData.user}
          dateLabel={previewData.today.date}
          macros={buildMacros(previewData.meals)}
          nextMeal={{ ...previewData.nextMeal, badgeLabel: '45 dk sonra' }}
          meals={mealsWithLabels}
          water={homeWater}
          isAddingWater
          {...homeCallbacks}
        />
      </Frame>

      <Text style={styles.demoCaption}>Su geri alma sürüyor (pending — geri al kilitli)</Text>
      <Frame tall={false}>
        <HomeView
          status="ready"
          user={previewData.user}
          dateLabel={previewData.today.date}
          macros={buildMacros(previewData.meals)}
          nextMeal={{ ...previewData.nextMeal, badgeLabel: '45 dk sonra' }}
          meals={mealsWithLabels}
          water={homeWater}
          isUndoingWater
          {...homeCallbacks}
        />
      </Frame>
    </Section>
  );
}

/* -------------------------------- MealPlanView -------------------------------- */

const planDays = previewData.week.map((d) => ({
  id: `day-${d.date}`,
  dayLabel: d.day,
  dateLabel: String(d.date),
  isToday: d.isToday,
  isCompleted: d.meals.every((m) => m.status === 'completed'),
}));

const planDayLabels = {
  'day-14': '14 Temmuz Salı',
  'day-15': '15 Temmuz Çarşamba',
  'day-16': '16 Temmuz Perşembe',
  'day-17': '17 Temmuz Cuma',
  'day-18': '18 Temmuz Cumartesi',
  'day-19': '19 Temmuz Pazar',
  'day-20': '20 Temmuz Pazartesi',
};

function MealPlanDemo() {
  const [selected, setSelected] = useState('day-19');
  const day = previewData.week.find((d) => `day-${d.date}` === selected);
  return (
    <Section title="MealPlanView">
      <Frame>
        <MealPlanView
          weekLabel="14–20 Temmuz"
          days={planDays}
          selectedDayId={selected}
          selectedDayLabel={planDayLabels[selected]}
          meals={day ? day.meals : []}
          onSelectDay={setSelected}
          onPreviousWeek={noop}
          onNextWeek={noop}
          onMealPress={noop}
          onToggleMeal={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>Plan güncellendi bilgi şeridi</Text>
      <Frame>
        <MealPlanView
          weekLabel="14–20 Temmuz"
          days={planDays}
          selectedDayId="day-19"
          selectedDayLabel="19 Temmuz Pazar"
          meals={previewData.meals}
          showUpdatedNotice
          onSelectDay={noop}
          onPreviousWeek={noop}
          onNextWeek={noop}
          onMealPress={noop}
          onToggleMeal={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>Hafta boş</Text>
      <Frame tall={false}>
        <MealPlanView
          status="empty"
          weekLabel="21–27 Temmuz"
          days={planDays.map((d) => ({ ...d, isToday: false, isCompleted: false }))}
          selectedDayId="day-14"
          onSelectDay={noop}
          onPreviousWeek={noop}
          onNextWeek={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>Hata (tekrar dene)</Text>
      <Frame tall={false}>
        <MealPlanView
          status="error"
          weekLabel="14–20 Temmuz"
          days={planDays}
          selectedDayId="day-19"
          onSelectDay={noop}
          onPreviousWeek={noop}
          onNextWeek={noop}
          onRetry={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>Öğün toggle işlemi sürüyor (pending — yalnız o satır kilitli)</Text>
      <Frame>
        <MealPlanView
          weekLabel="14–20 Temmuz"
          days={planDays}
          selectedDayId="day-19"
          selectedDayLabel="19 Temmuz Pazar"
          meals={previewData.meals}
          updatingMealId="m3"
          onSelectDay={noop}
          onPreviousWeek={noop}
          onNextWeek={noop}
          onMealPress={noop}
          onToggleMeal={noop}
        />
      </Frame>
    </Section>
  );
}

/* -------------------------------- MealDetail -------------------------------- */

const detailMeal = {
  time: previewData.nextMeal.time,
  type: previewData.nextMeal.type,
  title: previewData.nextMeal.title,
  icon: 'clock',
  badgeLabel: '45 dk sonra',
  contents: previewData.mealDetail.contents,
  note: previewData.mealDetail.note,
  dietitian: { name: previewData.dietitian.name, initials: previewData.dietitian.initials },
  macros: previewData.mealDetail.macros,
  photo: { status: 'none' },
};

function MealDetailDemo() {
  return (
    <Section title="MealDetailView">
      <Frame>
        <MealDetailView
          meal={detailMeal}
          completionState="pending"
          onBack={noop}
          onToggleComplete={noop}
          onAddPhoto={noop}
        />
      </Frame>
      <Text style={styles.demoCaption}>Tamamlandı durumu</Text>
      <Frame>
        <MealDetailView
          meal={detailMeal}
          completionState="completed"
          completedBadgeLabel="Tamamlandı · 13:38"
          onBack={noop}
          onToggleComplete={noop}
          onRetakePhoto={noop}
          onRemovePhoto={noop}
        />
      </Frame>
      <Text style={styles.demoCaption}>Tamamlama işlemi sürüyor (pending — CTA kilitli)</Text>
      <Frame>
        <MealDetailView
          meal={detailMeal}
          completionState="pending"
          isCompletionUpdating
          onBack={noop}
          onToggleComplete={noop}
          onAddPhoto={noop}
        />
      </Frame>
    </Section>
  );
}

/* --------------------------------- Sheet'ler --------------------------------- */

function FeatureSheetsDemo() {
  const [photoSheet, setPhotoSheet] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [photoError, setPhotoError] = useState(false);
  const [waterSheet, setWaterSheet] = useState(false);
  const [waterSheetPending, setWaterSheetPending] = useState(false);
  const [longSheet, setLongSheet] = useState(false);
  return (
    <Section title="Sheet görünümleri">
      <AppButton variant="secondary" label="Fotoğraf ekleme sheet'i" onPress={() => setPhotoSheet(true)} />
      <AppButton variant="secondary" label="Fotoğraf yükleniyor" onPress={() => setUploading(true)} />
      <AppButton variant="secondary" label="Fotoğraf hatası" onPress={() => setPhotoError(true)} />
      <AppButton variant="secondary" label="Su takibi sheet'i" onPress={() => setWaterSheet(true)} />
      <AppButton variant="secondary" label="Su sheet'i — ekleme + geri alma pending" onPress={() => setWaterSheetPending(true)} />
      <AppButton variant="secondary" label="Uzun içerik (klavye + scroll uyumlu)" onPress={() => setLongSheet(true)} />

      <MealPhotoSheetView
        visible={photoSheet}
        onPickCamera={() => setPhotoSheet(false)}
        onPickGallery={() => setPhotoSheet(false)}
        onClose={() => setPhotoSheet(false)}
      />
      <MealPhotoUploadingView
        visible={uploading}
        fileName="IMG_2334.jpg"
        fileSizeLabel="2,1 MB"
        progress={64}
        onCancel={() => setUploading(false)}
      />
      <MealPhotoErrorView
        visible={photoError}
        fileName="IMG_2334.jpg"
        fileSizeLabel="2,1 MB"
        onRetry={() => setPhotoError(false)}
        onRemove={() => setPhotoError(false)}
        onClose={() => setPhotoError(false)}
      />
      <WaterSheetView
        visible={waterSheet}
        currentMl={1400}
        goalMl={2500}
        lastEntryLabel="250 ml eklendi"
        onAddWater={noop}
        onUndoWater={noop}
        onOpenHistory={noop}
        onClose={() => setWaterSheet(false)}
      />
      <WaterSheetView
        visible={waterSheetPending}
        currentMl={1400}
        goalMl={2500}
        lastEntryLabel="250 ml eklendi"
        isAddingWater
        isUndoingWater
        onAddWater={noop}
        onUndoWater={noop}
        onOpenHistory={noop}
        onClose={() => setWaterSheetPending(false)}
      />
      <BottomSheetView
        visible={longSheet}
        onClose={() => setLongSheet(false)}
        title="Klavye ve küçük ekran uyumu"
        scrollable
        footer={<AppButton variant="primary" label="Kaydet" onPress={() => setLongSheet(false)} />}
      >
        <Text style={styles.sheetText}>
          Bu sheet scrollable=true ile açılır; içerik uzadığında kaydırılır, klavye açıldığında
          footer klavye arkasında kalmaz ve yükseklik ekranın yaklaşık %90'ını aşmaz.
        </Text>
        <AppInput label="Bel (cm)" value="78" onChangeText={noop} keyboardType="decimal-pad" />
        <AppInput label="Kalça (cm)" value="99" onChangeText={noop} keyboardType="decimal-pad" />
        <AppInput label="Göğüs (cm)" value="94" onChangeText={noop} keyboardType="decimal-pad" />
        <AppInput label="Kol (cm)" value="30" onChangeText={noop} keyboardType="decimal-pad" />
        <AppInput label="Not" value="" onChangeText={noop} placeholder="İsteğe bağlı not" multiline />
      </BottomSheetView>
    </Section>
  );
}

/* ---------------------------------- Durum ---------------------------------- */

function StatusDemo() {
  return (
    <Section title="Durum bileşenleri">
      <ToastView variant="success" message="250 ml su eklendi" actionLabel="Geri al" onAction={noop} />
      <ToastView variant="info" message="Plan güncellendi." />
      <ToastView variant="warning" message="Öğün saati geçiyor." />
      <ToastView variant="error" message="Ölçüm kaydedilemedi." actionLabel="Tekrar dene" onAction={noop} />

      <Text style={styles.demoCaption}>Pull-to-refresh göstergesi (UI-only)</Text>
      <PullToRefreshHint />

      <Text style={styles.demoCaption}>Tam ekran bağlantı hatası</Text>
      <View style={styles.statusFrame}>
        <FullScreenErrorView variant="offline" onRetry={noop} />
      </View>

      <Text style={styles.demoCaption}>Tam ekran sunucu hatası</Text>
      <View style={styles.statusFrame}>
        <FullScreenErrorView variant="server" onRetry={noop} onBack={noop} />
      </View>

      <Text style={styles.demoCaption}>Boş veri</Text>
      <View style={styles.statusFrame}>
        <EmptyDataView />
      </View>
    </Section>
  );
}

/* ------------------------- Phase 4: Onboarding / Auth ------------------------- */

const GENDER_OPTIONS = [
  { value: 'female', label: 'Kadın' },
  { value: 'male', label: 'Erkek' },
  { value: 'unspecified', label: 'Belirtmek istemiyorum' },
];
const GOAL_OPTIONS = [
  { value: 'lose', label: 'Kilo vermek' },
  { value: 'gain', label: 'Kilo almak' },
  { value: 'maintain', label: 'Formu korumak' },
  { value: 'healthy', label: 'Sağlıklı beslenmek' },
];
const ACTIVITY_OPTIONS = [
  { value: 'sedentary', label: 'Hareketsiz' },
  { value: 'light', label: 'Az aktif' },
  { value: 'moderate', label: 'Orta aktif' },
  { value: 'high', label: 'Çok aktif' },
];
const DIET_TYPE_OPTIONS = [
  { value: 'everything', label: 'Her şeyi yerim' },
  { value: 'vegetarian', label: 'Vejetaryen' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'pescatarian', label: 'Pesketaryen' },
];
const CONDITION_OPTIONS = [
  { value: 'none', label: 'Yok' },
  { value: 'hypertension', label: 'Hipertansiyon' },
  { value: 'diabetes', label: 'Diyabet' },
  { value: 'thyroid', label: 'Tiroid' },
  { value: 'insulin', label: 'İnsülin direnci' },
];
const INTOLERANCE_OPTIONS = [
  { value: 'lactose', label: 'Laktoz' },
  { value: 'gluten', label: 'Glüten' },
  { value: 'histamine', label: 'Histamin' },
  { value: 'fructose', label: 'Fruktoz' },
];
const DISLIKED_FOOD_OPTIONS = [{ value: 'coriander', label: 'Kişniş' }];
const STEP4_BLOOD_TYPE_OPTIONS = [
  { value: 'aPos', label: 'A Rh+' },
  { value: 'bPos', label: 'B Rh+' },
  { value: 'oPos', label: '0 Rh+' },
  { value: 'unknown', label: 'Bilmiyorum' },
];
const STEP4_SMOKING_OPTIONS = [
  { value: 'none', label: 'Kullanmıyorum' },
  { value: 'occasional', label: 'Arada' },
  { value: 'daily', label: 'Her gün' },
];
const STEP4_ALCOHOL_OPTIONS = [
  { value: 'none', label: 'Kullanmıyorum' },
  { value: 'occasional', label: 'Arada' },
  { value: 'weekly', label: 'Haftada birkaç kez' },
];
const MEDICATION_OPTIONS = [{ value: 'levothyroxine', label: 'Levotiroksin' }];

const toggleInList = (list, value) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

function OnboardingAuthDemo() {
  /* Splash & Karşılama */
  const welcomeNextMeal = {
    badgeLabel: '45 dk sonra',
    timeLabel: `${previewData.nextMeal.time} · ${previewData.nextMeal.type}`,
    title: previewData.nextMeal.title,
  };
  const welcomeTip = {
    initials: previewData.dietitian.initials,
    text: 'Öğleden önce en az 1 litreyi tamamlamanı öneriyorum.',
  };

  /* Giriş */
  const [login, setLogin] = useState({
    email: previewData.user.email,
    password: 'ornek-sifre',
    visible: false,
  });
  const setLoginField = (patch) => setLogin((s) => ({ ...s, ...patch }));

  /* Kayıt */
  const [register, setRegister] = useState({
    fullName: previewData.user.name,
    email: previewData.user.email,
    password: '',
    passwordConfirm: '',
    visible: false,
    confirmVisible: false,
    terms: true,
  });
  const setRegisterField = (patch) => setRegister((s) => ({ ...s, ...patch }));

  /* Şifre sıfırlama */
  const [resetEmail, setResetEmail] = useState(previewData.user.email);

  /* Profil adımları */
  const [step1, setStep1] = useState({
    fullName: previewData.user.name,
    birthDate: '14.03.1994',
    gender: 'female',
  });
  const [step2, setStep2] = useState({
    goal: 'lose',
    height: '168',
    currentWeight: previewData.weight.start,
    targetWeight: previewData.weight.goal,
  });
  const [step3, setStep3] = useState({
    activity: 'moderate',
    dietType: 'everything',
    sleepHours: '7,5',
    waterGoal: 2.5,
  });
  const [step4, setStep4] = useState({
    search: '',
    bloodType: 'unknown',
    smoking: 'none',
    alcohol: 'none',
    conditions: [],
    medications: [],
    intolerances: ['lactose'],
    dislikedFoods: ['coriander'],
    lastLabDate: '',
  });

  /* Diyetisyen bağlantısı */
  const [inviteCode, setInviteCode] = useState('');

  return (
    <Section title="Onboarding / Auth">
      <Text style={styles.demoCaption}>SplashView</Text>
      <Frame tall={false}>
        <SplashView />
      </Frame>

      <Text style={styles.demoCaption}>WelcomeView</Text>
      <Frame>
        <WelcomeView
          nextMeal={welcomeNextMeal}
          dietitianTip={welcomeTip}
          onRegister={noop}
          onLogin={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>LoginView — varsayılan</Text>
      <Frame>
        <LoginView
          email={login.email}
          password={login.password}
          isPasswordVisible={login.visible}
          onEmailChange={(v) => setLoginField({ email: v })}
          onPasswordChange={(v) => setLoginField({ password: v })}
          onTogglePassword={() => setLoginField({ visible: !login.visible })}
          onSubmit={noop}
          onForgotPassword={noop}
          onRegister={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>LoginView — alan + genel hata</Text>
      <Frame>
        <LoginView
          email={login.email}
          password={login.password}
          isPasswordVisible={login.visible}
          emailError="E-posta adresini kontrol et."
          generalError="E-posta veya şifre hatalı. Bilgilerini kontrol edip tekrar deneyebilirsin."
          onEmailChange={(v) => setLoginField({ email: v })}
          onPasswordChange={(v) => setLoginField({ password: v })}
          onTogglePassword={() => setLoginField({ visible: !login.visible })}
          onSubmit={noop}
          onForgotPassword={noop}
          onRegister={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>LoginView — gönderiliyor</Text>
      <Frame>
        <LoginView
          email={login.email}
          password={login.password}
          isPasswordVisible={login.visible}
          isSubmitting
          onEmailChange={(v) => setLoginField({ email: v })}
          onPasswordChange={(v) => setLoginField({ password: v })}
          onTogglePassword={() => setLoginField({ visible: !login.visible })}
          onSubmit={noop}
          onForgotPassword={noop}
          onRegister={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>LoginView — çevrimdışı</Text>
      <Frame>
        <LoginView
          email={login.email}
          password={login.password}
          isPasswordVisible={login.visible}
          isOffline
          onEmailChange={(v) => setLoginField({ email: v })}
          onPasswordChange={(v) => setLoginField({ password: v })}
          onTogglePassword={() => setLoginField({ visible: !login.visible })}
          onSubmit={noop}
          onForgotPassword={noop}
          onRegister={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>RegisterView — şifre gücü göstergesi</Text>
      <Frame>
        <RegisterView
          fullName={register.fullName}
          email={register.email}
          password={register.password}
          passwordConfirm={register.passwordConfirm}
          isPasswordVisible={register.visible}
          isPasswordConfirmVisible={register.confirmVisible}
          termsAccepted={register.terms}
          passwordStrength={{ percent: 65, label: 'Orta güçte — bir sayı veya sembol ekle', tone: 'warning' }}
          onFullNameChange={(v) => setRegisterField({ fullName: v })}
          onEmailChange={(v) => setRegisterField({ email: v })}
          onPasswordChange={(v) => setRegisterField({ password: v })}
          onPasswordConfirmChange={(v) => setRegisterField({ passwordConfirm: v })}
          onTogglePassword={() => setRegisterField({ visible: !register.visible })}
          onTogglePasswordConfirm={() => setRegisterField({ confirmVisible: !register.confirmVisible })}
          onToggleTerms={() => setRegisterField({ terms: !register.terms })}
          onOpenTerms={noop}
          onOpenPrivacy={noop}
          onSubmit={noop}
          onLogin={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>RegisterView — hatalar + gönderim</Text>
      <Frame>
        <RegisterView
          fullName={register.fullName}
          email={register.email}
          password={register.password}
          passwordConfirm={register.passwordConfirm}
          isPasswordVisible={register.visible}
          isPasswordConfirmVisible={register.confirmVisible}
          termsAccepted={register.terms}
          emailError="Bu e-posta ile bir hesap zaten var."
          passwordConfirmError="Şifreler eşleşmiyor."
          isSubmitting
          onFullNameChange={(v) => setRegisterField({ fullName: v })}
          onEmailChange={(v) => setRegisterField({ email: v })}
          onPasswordChange={(v) => setRegisterField({ password: v })}
          onPasswordConfirmChange={(v) => setRegisterField({ passwordConfirm: v })}
          onTogglePassword={() => setRegisterField({ visible: !register.visible })}
          onTogglePasswordConfirm={() => setRegisterField({ confirmVisible: !register.confirmVisible })}
          onToggleTerms={() => setRegisterField({ terms: !register.terms })}
          onOpenTerms={noop}
          onOpenPrivacy={noop}
          onSubmit={noop}
          onLogin={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>RegisterView — koşullar kabul edilmedi (buton pasif)</Text>
      <Frame>
        <RegisterView
          fullName={register.fullName}
          email={register.email}
          password={register.password}
          passwordConfirm={register.passwordConfirm}
          isPasswordVisible={register.visible}
          isPasswordConfirmVisible={register.confirmVisible}
          termsAccepted={false}
          onFullNameChange={(v) => setRegisterField({ fullName: v })}
          onEmailChange={(v) => setRegisterField({ email: v })}
          onPasswordChange={(v) => setRegisterField({ password: v })}
          onPasswordConfirmChange={(v) => setRegisterField({ passwordConfirm: v })}
          onTogglePassword={() => setRegisterField({ visible: !register.visible })}
          onTogglePasswordConfirm={() => setRegisterField({ confirmVisible: !register.confirmVisible })}
          onToggleTerms={noop}
          onOpenTerms={noop}
          onOpenPrivacy={noop}
          onSubmit={noop}
          onLogin={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>RegisterView — koşul hatası (termsError)</Text>
      <Frame>
        <RegisterView
          fullName={register.fullName}
          email={register.email}
          password={register.password}
          passwordConfirm={register.passwordConfirm}
          isPasswordVisible={register.visible}
          isPasswordConfirmVisible={register.confirmVisible}
          termsAccepted={false}
          termsError="Devam etmek için kullanım koşullarını ve gizlilik politikasını kabul etmen gerekir."
          onFullNameChange={(v) => setRegisterField({ fullName: v })}
          onEmailChange={(v) => setRegisterField({ email: v })}
          onPasswordChange={(v) => setRegisterField({ password: v })}
          onPasswordConfirmChange={(v) => setRegisterField({ passwordConfirm: v })}
          onTogglePassword={() => setRegisterField({ visible: !register.visible })}
          onTogglePasswordConfirm={() => setRegisterField({ confirmVisible: !register.confirmVisible })}
          onToggleTerms={noop}
          onOpenTerms={noop}
          onOpenPrivacy={noop}
          onSubmit={noop}
          onLogin={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>ForgotPasswordView</Text>
      <Frame tall={false}>
        <ForgotPasswordView
          email={resetEmail}
          onEmailChange={setResetEmail}
          onSubmit={noop}
          onBack={noop}
          onLogin={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>ForgotPasswordSuccessView</Text>
      <Frame tall={false}>
        <ForgotPasswordSuccessView
          email={previewData.user.email}
          onBackToLogin={noop}
          onResend={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>ProfileSetupStep1View — Temel bilgiler</Text>
      <Frame>
        <ProfileSetupStep1View
          fullName={step1.fullName}
          birthDate={step1.birthDate}
          genderOptions={GENDER_OPTIONS}
          selectedGender={step1.gender}
          onFullNameChange={(v) => setStep1((s) => ({ ...s, fullName: v }))}
          onBirthDateChange={(v) => setStep1((s) => ({ ...s, birthDate: v }))}
          onSelectGender={(v) => setStep1((s) => ({ ...s, gender: v }))}
          onBack={noop}
          onContinue={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>ProfileSetupStep2View — Hedef ve ölçüler</Text>
      <Frame>
        <ProfileSetupStep2View
          goalOptions={GOAL_OPTIONS}
          selectedGoal={step2.goal}
          height={step2.height}
          currentWeight={step2.currentWeight}
          targetWeight={step2.targetWeight}
          onSelectGoal={(v) => setStep2((s) => ({ ...s, goal: v }))}
          onHeightChange={(v) => setStep2((s) => ({ ...s, height: v }))}
          onCurrentWeightChange={(v) => setStep2((s) => ({ ...s, currentWeight: v }))}
          onTargetWeightChange={(v) => setStep2((s) => ({ ...s, targetWeight: v }))}
          onBack={noop}
          onContinue={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>ProfileSetupStep3View — Yaşam tarzı (sayısal uyku girişi)</Text>
      <Frame>
        <ProfileSetupStep3View
          activityOptions={ACTIVITY_OPTIONS}
          selectedActivity={step3.activity}
          dietTypeOptions={DIET_TYPE_OPTIONS}
          selectedDietType={step3.dietType}
          sleepHours={step3.sleepHours}
          waterGoalLabel={step3.waterGoal.toLocaleString('tr-TR', { minimumFractionDigits: 1 })}
          onSelectActivity={(v) => setStep3((s) => ({ ...s, activity: v }))}
          onSelectDietType={(v) => setStep3((s) => ({ ...s, dietType: v }))}
          onSleepHoursChange={(v) => setStep3((s) => ({ ...s, sleepHours: v }))}
          onDecreaseWaterGoal={() =>
            setStep3((s) => ({ ...s, waterGoal: Math.max(0.5, s.waterGoal - 0.25) }))
          }
          onIncreaseWaterGoal={() => setStep3((s) => ({ ...s, waterGoal: s.waterGoal + 0.25 }))}
          onBack={noop}
          onContinue={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>ProfileSetupStep3View — uyku saati hatası (host'tan)</Text>
      <Frame tall={false}>
        <ProfileSetupStep3View
          activityOptions={ACTIVITY_OPTIONS}
          selectedActivity={step3.activity}
          dietTypeOptions={DIET_TYPE_OPTIONS}
          selectedDietType={step3.dietType}
          sleepHours="26"
          sleepHoursError="0 ile 24 arasında bir değer gir."
          waterGoalLabel={step3.waterGoal.toLocaleString('tr-TR', { minimumFractionDigits: 1 })}
          onSelectActivity={(v) => setStep3((s) => ({ ...s, activity: v }))}
          onSelectDietType={(v) => setStep3((s) => ({ ...s, dietType: v }))}
          onSleepHoursChange={noop}
          onDecreaseWaterGoal={noop}
          onIncreaseWaterGoal={noop}
          onBack={noop}
          onContinue={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>ProfileSetupStep4View — tam sağlık adımı</Text>
      <Frame>
        <ProfileSetupStep4View
          searchQuery={step4.search}
          bloodTypeOptions={STEP4_BLOOD_TYPE_OPTIONS}
          selectedBloodType={step4.bloodType}
          smokingOptions={STEP4_SMOKING_OPTIONS}
          selectedSmoking={step4.smoking}
          alcoholOptions={STEP4_ALCOHOL_OPTIONS}
          selectedAlcohol={step4.alcohol}
          conditionOptions={CONDITION_OPTIONS}
          selectedConditions={step4.conditions}
          medicationOptions={MEDICATION_OPTIONS}
          selectedMedications={step4.medications}
          intoleranceOptions={INTOLERANCE_OPTIONS}
          selectedIntolerances={step4.intolerances}
          dislikedFoodOptions={DISLIKED_FOOD_OPTIONS}
          selectedDislikedFoods={step4.dislikedFoods}
          lastLabDate={step4.lastLabDate}
          onSearchQueryChange={(v) => setStep4((s) => ({ ...s, search: v }))}
          onSelectBloodType={(v) => setStep4((s) => ({ ...s, bloodType: v }))}
          onSelectSmoking={(v) => setStep4((s) => ({ ...s, smoking: v }))}
          onSelectAlcohol={(v) => setStep4((s) => ({ ...s, alcohol: v }))}
          onToggleCondition={(v) => setStep4((s) => ({ ...s, conditions: toggleInList(s.conditions, v) }))}
          onAddCustomCondition={noop}
          onToggleMedication={(v) =>
            setStep4((s) => ({ ...s, medications: toggleInList(s.medications, v) }))
          }
          onAddCustomMedication={noop}
          onToggleIntolerance={(v) =>
            setStep4((s) => ({ ...s, intolerances: toggleInList(s.intolerances, v) }))
          }
          onAddCustomIntolerance={noop}
          onToggleDislikedFood={(v) =>
            setStep4((s) => ({ ...s, dislikedFoods: toggleInList(s.dislikedFoods, v) }))
          }
          onAddCustomFood={noop}
          onLastLabDateChange={(v) => setStep4((s) => ({ ...s, lastLabDate: v }))}
          onBack={noop}
          onContinue={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>DietitianConnectionEmptyView</Text>
      <Frame tall={false}>
        <DietitianConnectionEmptyView
          inviteCode={inviteCode}
          onInviteCodeChange={setInviteCode}
          onConnect={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>DietitianConnectionPendingView</Text>
      <Frame tall={false}>
        <DietitianConnectionPendingView
          dietitian={previewData.dietitian}
          onReviewProfile={noop}
          onCancelInvite={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>DietitianConnectionActiveView</Text>
      <Frame tall={false}>
        <DietitianConnectionActiveView
          dietitian={previewData.dietitian}
          onSendMessage={noop}
          onManageConnection={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>DietitianConnectionErrorView</Text>
      <Frame tall={false}>
        <DietitianConnectionErrorView
          inviteCode="DB-4821"
          onRetry={noop}
          onEditCode={noop}
        />
      </Frame>
    </Section>
  );
}

/* ----------------------------- Phase 5: İlerleme ----------------------------- */

function ProgressDemo() {
  const [weightSheet, setWeightSheet] = useState(false);
  const [weightValue, setWeightValue] = useState(previewData.weight.current);
  const [measureSheet, setMeasureSheet] = useState(false);
  const [measureValues, setMeasureValues] = useState({ bel: '78', kalca: '99' });
  const [measureKey, setMeasureKey] = useState('bel');

  const measureHistory = previewData.measureHistoryByKey[measureKey];
  const singlePointSummary = {
    ...previewData.weightSummary,
    current: previewData.weightSummary.start,
    change: null,
  };

  return (
    <Section title="ProgressView (İlerleme)">
      <Text style={styles.demoCaption}>Hazır — özet, grafik, ölçüler, su</Text>
      <Frame>
        <ProgressView
          status="ready"
          weightSummary={previewData.weightSummary}
          lastMeasureLabel={previewData.weight.lastMeasure}
          weightHistory={previewData.weightHistoryPoints}
          weightFootnote={`8 haftada ${previewData.weight.start} kg'dan ${previewData.weight.current} kg'ya; toplam ${previewData.weight.change} kg.`}
          bodyMeasurements={previewData.bodyMeasures}
          bodyMeasureDateLabel={previewData.bodyMeasureDate}
          waterWeekly={previewData.waterWeekly}
          onAddWeight={() => setWeightSheet(true)}
          onAddMeasurement={() => setMeasureSheet(true)}
          onOpenMeasurementHistory={noop}
          onRefresh={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>Tek ölçüm — grafik yerine yönlendirici durum</Text>
      <Frame tall={false}>
        <ProgressView
          status="ready"
          weightSummary={singlePointSummary}
          lastMeasureLabel={previewData.weight.lastMeasure}
          weightHistory={[previewData.weightHistoryPoints[0]]}
          onAddWeight={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>Yükleniyor / Hata / Boş</Text>
      <Frame tall={false}>
        <ProgressView status="loading" />
      </Frame>
      <Frame tall={false}>
        <ProgressView status="error" onRetry={noop} />
      </Frame>
      <Frame tall={false}>
        <ProgressView status="empty" onAddWeight={noop} />
      </Frame>

      <Text style={styles.demoCaption}>MeasurementHistoryView (Ölçü geçmişi)</Text>
      <Frame>
        <MeasurementHistoryView
          status="ready"
          options={previewData.measureHistoryOptions}
          selectedKey={measureKey}
          onSelectMeasurement={setMeasureKey}
          summary={measureHistory.summary}
          points={measureHistory.points}
          entries={measureHistory.entries}
          onBack={noop}
          onAddMeasurement={() => setMeasureSheet(true)}
        />
      </Frame>

      <Text style={styles.demoCaption}>Ölçüm sheet'leri</Text>
      <AppButton variant="secondary" label="Kilo ekle sheet'i" onPress={() => setWeightSheet(true)} />
      <AppButton variant="secondary" label="Ölçü ekle sheet'i" onPress={() => setMeasureSheet(true)} />

      <AddWeightSheetView
        visible={weightSheet}
        value={weightValue}
        onValueChange={setWeightValue}
        dateLabel={previewData.today.date}
        onSave={() => setWeightSheet(false)}
        onClose={() => setWeightSheet(false)}
      />
      <AddMeasurementSheetView
        visible={measureSheet}
        fields={previewData.measurementFields}
        values={measureValues}
        onFieldChange={(key, v) => setMeasureValues((s) => ({ ...s, [key]: v }))}
        dateLabel={previewData.today.date}
        onSave={() => setMeasureSheet(false)}
        onClose={() => setMeasureSheet(false)}
      />
    </Section>
  );
}

/* ----------------------------- Phase 6: Mesajlar ----------------------------- */

function MessagesDemo() {
  const [messages, setMessages] = useState(previewData.chatMessages);
  const [composer, setComposer] = useState('');

  const send = () => {
    if (!composer.trim()) return;
    setMessages((list) => [
      ...list,
      { id: `local-${list.length + 1}`, from: 'me', text: composer.trim(), timeLabel: 'Şimdi', status: 'sent' },
    ]);
    setComposer('');
  };

  const retry = (msg) => {
    setMessages((list) =>
      list.map((m) => (m.id === msg.id ? { ...m, status: 'sent' } : m)),
    );
  };

  return (
    <Section title="Mesajlar">
      <Text style={styles.demoCaption}>MessagesListView — Hazır</Text>
      <Frame tall={false}>
        <MessagesListView
          status="ready"
          conversations={previewData.conversations}
          onConversationPress={noop}
          onRefresh={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>Yükleniyor / Boş</Text>
      <Frame tall={false}>
        <MessagesListView status="loading" />
      </Frame>
      <Frame tall={false}>
        <MessagesListView status="empty" onConnectDietitian={noop} />
      </Frame>

      <Text style={styles.demoCaption}>ChatView — başarısız mesaj + tekrar dene, görsel mesaj</Text>
      <Frame>
        <ChatView
          conversation={previewData.chatConversation}
          messages={messages}
          composerValue={composer}
          onComposerChange={setComposer}
          onSend={send}
          onRetryMessage={retry}
          onPickImage={noop}
          onBack={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>ChatView — yükleniyor</Text>
      <Frame tall={false}>
        <ChatView
          conversation={previewData.chatConversation}
          status="loading"
          onBack={noop}
          onComposerChange={noop}
          onSend={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>ChatView — boş sohbet</Text>
      <Frame tall={false}>
        <ChatView
          conversation={previewData.chatConversation}
          status="empty"
          onBack={noop}
          onComposerChange={noop}
          onSend={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>ChatView — hata (tekrar dene)</Text>
      <Frame tall={false}>
        <ChatView
          conversation={previewData.chatConversation}
          status="error"
          onBack={noop}
          onRetry={noop}
          onComposerChange={noop}
          onSend={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>ChatView — eski mesajlar yükleniyor (sayfalama)</Text>
      <Frame>
        <ChatView
          conversation={previewData.chatConversation}
          messages={messages}
          composerValue={composer}
          hasMore
          isLoadingMore
          onLoadMore={noop}
          onComposerChange={setComposer}
          onSend={send}
          onRetryMessage={retry}
          onPickImage={noop}
          onBack={noop}
        />
      </Frame>
    </Section>
  );
}

/* ------------------------------ Phase 7: Profil ------------------------------ */

const PROFILE_GOAL_OPTIONS = [
  { value: 'lose', label: 'Kilo verme' },
  { value: 'maintain', label: 'Kilomu koruma' },
  { value: 'gain', label: 'Kilo alma' },
];
const SMOKING_OPTIONS = [
  { value: 'none', label: 'Kullanmıyorum' },
  { value: 'occasional', label: 'Arada' },
  { value: 'daily', label: 'Her gün' },
];
const ALCOHOL_OPTIONS = [
  { value: 'none', label: 'Kullanmıyorum' },
  { value: 'occasional', label: 'Arada' },
  { value: 'weekly', label: 'Haftada birkaç kez' },
];
const BLOOD_TYPE_OPTIONS = [
  { value: 'aPos', label: 'A Rh+' },
  { value: 'aNeg', label: 'A Rh−' },
  { value: 'bPos', label: 'B Rh+' },
  { value: 'bNeg', label: 'B Rh−' },
  { value: 'abPos', label: 'AB Rh+' },
  { value: 'abNeg', label: 'AB Rh−' },
  { value: 'oPos', label: '0 Rh+' },
  { value: 'oNeg', label: '0 Rh−' },
  { value: 'unknown', label: 'Bilmiyorum' },
];
const HEALTH_CONDITION_OPTIONS = [
  { value: 'hypothyroid', label: 'Hipotiroidizm' },
  { value: 'diabetes', label: 'Diyabet' },
  { value: 'hypertension', label: 'Hipertansiyon' },
  { value: 'asthma', label: 'Astım' },
  { value: 'celiac', label: 'Çölyak' },
];
const HEALTH_INTOLERANCE_OPTIONS = [
  { value: 'lactose', label: 'Laktoz' },
  { value: 'sesame', label: 'Susam' },
  { value: 'gluten', label: 'Glüten' },
  { value: 'histamine', label: 'Histamin' },
  { value: 'fructose', label: 'Fruktoz' },
  { value: 'sorbitol', label: 'Sorbitol' },
];

function ProfileDemo() {
  const [personal, setPersonal] = useState(previewData.personalInfoForm);
  const [goal, setGoal] = useState(previewData.goalForm);
  const [lifestyle, setLifestyle] = useState(previewData.lifestyleForm);
  const [health, setHealth] = useState(previewData.healthForm);
  const [healthSearch, setHealthSearch] = useState('');
  const [notifValues, setNotifValues] = useState(previewData.notificationValues);
  const [twoFactor, setTwoFactor] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  return (
    <Section title="Profil">
      <Text style={styles.demoCaption}>ProfileView — özet + menü + çıkış</Text>
      <Frame>
        <ProfileView
          status="ready"
          user={previewData.user}
          dietitian={previewData.dietitian}
          sections={previewData.profileSections}
          onNavigate={noop}
          onEditProfile={noop}
          onLogout={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>Yükleniyor</Text>
      <Frame tall={false}>
        <ProfileView status="loading" />
      </Frame>

      <Text style={styles.demoCaption}>PersonalInfoEditView — e-posta salt okunur (ayrı Auth akışı)</Text>
      <Frame>
        <PersonalInfoEditView
          values={personal}
          initials={previewData.user.initials}
          email={previewData.user.email}
          onFieldChange={(k, v) => setPersonal((s) => ({ ...s, [k]: v }))}
          onChangePhoto={noop}
          onRequestEmailChange={noop}
          onSave={noop}
          onCancel={noop}
          onBack={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>PersonalInfoEditView — e-posta doğrulama bekleniyor</Text>
      <Frame>
        <PersonalInfoEditView
          values={personal}
          initials={previewData.user.initials}
          email={previewData.user.email}
          emailChangePending
          onFieldChange={(k, v) => setPersonal((s) => ({ ...s, [k]: v }))}
          onChangePhoto={noop}
          onRequestEmailChange={noop}
          onSave={noop}
          onCancel={noop}
          onBack={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>GoalEditView — hedef, su stepper, ölçü hedefleri</Text>
      <Frame>
        <GoalEditView
          values={{
            ...goal,
            waterGoalLabel: goal.waterGoalLitres.toLocaleString('tr-TR', { minimumFractionDigits: 1 }),
          }}
          goalOptions={PROFILE_GOAL_OPTIONS}
          onFieldChange={(k, v) => setGoal((s) => ({ ...s, [k]: v }))}
          onDecreaseWaterGoal={() =>
            setGoal((s) => ({ ...s, waterGoalLitres: Math.max(0.5, s.waterGoalLitres - 0.25) }))
          }
          onIncreaseWaterGoal={() =>
            setGoal((s) => ({ ...s, waterGoalLitres: s.waterGoalLitres + 0.25 }))
          }
          onSave={noop}
          onCancel={noop}
          onBack={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>LifestyleEditView — sayısal uyku girişi</Text>
      <Frame>
        <LifestyleEditView
          values={lifestyle}
          options={{
            activity: ACTIVITY_OPTIONS,
            dietType: DIET_TYPE_OPTIONS,
            smoking: SMOKING_OPTIONS,
            alcohol: ALCOHOL_OPTIONS,
          }}
          onFieldChange={(k, v) => setLifestyle((s) => ({ ...s, [k]: v }))}
          onSave={noop}
          onCancel={noop}
          onBack={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>HealthEditView — çoklu seçim + özel ekleme</Text>
      <Frame>
        <HealthEditView
          searchQuery={healthSearch}
          values={health}
          options={{
            bloodType: BLOOD_TYPE_OPTIONS,
            conditions: HEALTH_CONDITION_OPTIONS,
            medications: MEDICATION_OPTIONS,
            intolerances: HEALTH_INTOLERANCE_OPTIONS,
            dislikedFoods: DISLIKED_FOOD_OPTIONS,
          }}
          onSearchQueryChange={setHealthSearch}
          onFieldChange={(k, v) => setHealth((s) => ({ ...s, [k]: v }))}
          onToggleItem={(k, v) =>
            setHealth((s) => ({ ...s, [k]: toggleInList(s[k], v) }))
          }
          onAddCustomItem={noop}
          onSave={noop}
          onCancel={noop}
          onBack={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>NotificationSettingsView</Text>
      <Frame tall={false}>
        <NotificationSettingsView
          sections={previewData.notificationSections}
          values={notifValues}
          onToggle={(k) => setNotifValues((s) => ({ ...s, [k]: !s[k] }))}
          onBack={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>PrivacySecurityView — tüm özellikler açık (preview)</Text>
      <Frame tall={false}>
        <PrivacySecurityView
          twoFactorEnabled={twoFactor}
          onToggleTwoFactor={() => setTwoFactor((v) => !v)}
          sessionSummary="2 cihazda açık"
          showTwoFactor
          showSessions
          showDataExport
          showDeleteAccount
          onChangePassword={noop}
          onOpenSessions={noop}
          onExportData={noop}
          onDeleteAccount={noop}
          onBack={noop}
        />
      </Frame>

      <Text style={styles.demoCaption}>PrivacySecurityView — production varsayılanı (flag'ler kapalı)</Text>
      <Frame tall={false}>
        <PrivacySecurityView onChangePassword={noop} onBack={noop} />
      </Frame>

      <Text style={styles.demoCaption}>UnsavedChangesDialogView</Text>
      <AppButton variant="secondary" label="Çıkış uyarısı dialogu" onPress={() => setDialogVisible(true)} />
      <UnsavedChangesDialogView
        visible={dialogVisible}
        onSave={() => setDialogVisible(false)}
        onDiscard={() => setDialogVisible(false)}
        onKeepEditing={() => setDialogVisible(false)}
      />
    </Section>
  );
}

/* ---------------------------------- Galeri ---------------------------------- */

const SECTIONS = [
  { key: 'buttons', title: 'AppButton', render: () => <ButtonsDemo /> },
  { key: 'badges', title: 'StatusBadge', render: () => <BadgesDemo /> },
  { key: 'chips', title: 'ChoiceChip', render: () => <ChipsDemo /> },
  { key: 'inputs', title: 'AppInput', render: () => <InputsDemo /> },
  { key: 'feedback', title: 'Geri bildirim', render: () => <FeedbackDemo /> },
  { key: 'skeleton', title: 'AppSkeleton', render: () => <SkeletonDemo /> },
  { key: 'sheet', title: 'BottomSheetView', render: () => <SheetDemo /> },
  { key: 'home', title: 'HomeView — Hazır', render: () => <HomeReadyDemo /> },
  { key: 'home-states', title: 'HomeView — Durumlar', render: () => <HomeStatesDemo /> },
  { key: 'plan', title: 'MealPlanView', render: () => <MealPlanDemo /> },
  { key: 'detail', title: 'MealDetailView', render: () => <MealDetailDemo /> },
  { key: 'feature-sheets', title: 'Sheet görünümleri', render: () => <FeatureSheetsDemo /> },
  { key: 'status', title: 'Durum bileşenleri', render: () => <StatusDemo /> },
  { key: 'onboarding', title: 'Onboarding / Auth', render: () => <OnboardingAuthDemo /> },
  { key: 'progress', title: 'ProgressView (İlerleme)', render: () => <ProgressDemo /> },
  { key: 'messages', title: 'Mesajlar', render: () => <MessagesDemo /> },
  { key: 'profile', title: 'Profil', render: () => <ProfileDemo /> },
];

export function PreviewGallery() {
  return (
    <AppScreen scroll padTop>
      <Text style={styles.header}>DietBridge UI — Önizleme Galerisi</Text>
      <Text style={styles.subheader}>
        {previewData.today.date} · {previewData.user.firstName} için paylaşılan bileşenler ve ekranlar
      </Text>
      {SECTIONS.map((s) => (
        <View key={s.key}>{s.render()}</View>
      ))}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { ...typography.screenTitle, color: colors.textPrimary, marginTop: spacing.x4 },
  subheader: {
    ...typography.supporting,
    color: colors.textSecondary,
    marginTop: spacing.x1,
    marginBottom: spacing.x4,
  },
  section: { marginBottom: spacing.x8, gap: spacing.x3 },
  sectionTitle: { ...typography.sectionTitle, color: colors.textPrimary },
  sectionBody: { gap: spacing.x3 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.x2 },
  errorCard: { padding: 0, overflow: 'hidden' },
  sheetText: { ...typography.body, color: colors.textPrimary },
  demoCaption: { ...typography.caption, color: colors.textTertiary, marginTop: spacing.x2 },
  demoFrame: {
    height: 720,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    overflow: 'hidden',
  },
  demoFrameShort: { height: 520 },
  statusFrame: {
    height: 340,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
});

export default PreviewGallery;

import React from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import {
  AppButton,
  AppCard,
  AppScreen,
  AppSkeleton,
  ErrorState,
  Icon,
  StatusBadge,
} from '../../components';

function DetailHeader({ title, onBack }) {
  return (
    <View style={styles.header}>
      <Pressable
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel="Geri"
        hitSlop={8}
        style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
      >
        <Icon name="back" size={22} color={colors.textPrimary} />
      </Pressable>
      <Text style={styles.headerTitle} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.headerSpacer} />
    </View>
  );
}

function DetailSkeleton() {
  return (
    <View style={styles.skeletonWrap}>
      <AppSkeleton width={120} height={14} />
      <AppSkeleton width="85%" height={24} style={styles.skeletonGap} />
      <AppSkeleton height={132} borderRadius={radius.card} style={styles.skeletonGap} />
      <AppSkeleton height={120} borderRadius={radius.card} style={styles.skeletonGap} />
      <AppSkeleton height={90} borderRadius={radius.card} style={styles.skeletonGap} />
    </View>
  );
}

/**
 * MealDetailView — Öğün Detay (OgunDetay + Base + Tamamlandi tek görünümde).
 *
 * meal: {
 *   time, type, title, icon?, badgeLabel?,
 *   contents: string[],              // porsiyon ve içerik maddeleri
 *   note,                            // diyetisyen notu
 *   dietitian: { name, initials },
 *   macros: [{ label, value }],      // kompakt kalori/makro ızgarası
 *   photo: { status: 'none'|'ready', uri? },
 * }
 *
 * status: 'loading' | 'ready' | 'error'
 * completionState: 'pending' | 'completed'
 * completedBadgeLabel: örn. "Tamamlandı · 13:38"
 * isCompletionUpdating: true iken tamamlama/geri alma butonları kilitlenir
 * (busy durumu erişilebilirliğe yansır; ana CTA spinner gösterir) — çift işlem
 * koruması. Callback işlem sürerken tekrar çağrılmaz.
 */
export function MealDetailView({
  meal,
  status = 'ready',
  completionState = 'pending',
  isCompletionUpdating = false,
  title = 'Öğün detayı',
  completedBadgeLabel,
  markEatenLabel = 'Öğünü yedim',
  completedLabel = 'Tamamlandı',
  undoLabel = 'Geri al',
  contentsTitle = 'Porsiyon ve içerik',
  addPhotoLabel = 'Fotoğraf ekle',
  retakePhotoLabel = 'Yeniden çek',
  removePhotoLabel = 'Kaldır',
  onBack,
  onToggleComplete,
  onAddPhoto,
  onRetakePhoto,
  onRemovePhoto,
  onRetry,
}) {
  if (status === 'loading') {
    return (
      <AppScreen padTop header={<DetailHeader title={title} onBack={onBack} />}>
        <DetailSkeleton />
      </AppScreen>
    );
  }

  if (status === 'error' || !meal) {
    return (
      <AppScreen padTop header={<DetailHeader title={title} onBack={onBack} />}>
        <ErrorState
          title="Öğün bilgisi yüklenemedi"
          description="Bağlantını kontrol edip tekrar deneyebilirsin."
          onRetry={onRetry}
        />
      </AppScreen>
    );
  }

  const completed = completionState === 'completed';
  const photo = meal.photo || { status: 'none' };

  return (
    <AppScreen scroll padTop header={<DetailHeader title={title} onBack={onBack} />}>
      <View style={styles.content}>
        {/* tür + saat + rozet */}
        <View style={styles.metaRow}>
          <Text style={styles.meta} numberOfLines={1}>
            {meal.time} · {meal.type}
          </Text>
          <StatusBadge
            status={completed ? 'completed' : 'upcoming'}
            label={completed ? completedBadgeLabel : meal.badgeLabel}
          />
        </View>

        <Text style={styles.title}>{meal.title}</Text>

        {/* görsel alanı */}
        {photo.status === 'ready' && photo.uri ? (
          <Image source={{ uri: photo.uri }} style={styles.photo} accessibilityLabel={meal.title} />
        ) : (
          <View style={styles.photoPlaceholder} accessible={false} importantForAccessibility="no">
            <View style={styles.photoIconCircle}>
              <Icon name={meal.icon || 'image'} size={34} color={colors.primaryDark} />
            </View>
          </View>
        )}

        {/* fotoğraf aksiyonları */}
        <View style={styles.photoActions}>
          {photo.status === 'ready' ? (
            <>
              {onRetakePhoto ? (
                <AppButton variant="text" label={retakePhotoLabel} onPress={onRetakePhoto} />
              ) : null}
              {onRemovePhoto ? (
                <AppButton
                  variant="text"
                  label={removePhotoLabel}
                  onPress={onRemovePhoto}
                  textStyle={styles.removeText}
                />
              ) : null}
            </>
          ) : onAddPhoto ? (
            <AppButton
              variant="text"
              label={addPhotoLabel}
              onPress={onAddPhoto}
              icon={<Icon name="camera" size={15} color={colors.primary} accessible={false} />}
            />
          ) : null}
        </View>

        {/* porsiyon / içerik */}
        {Array.isArray(meal.contents) && meal.contents.length > 0 ? (
          <AppCard>
            <Text style={styles.cardHeading}>{contentsTitle}</Text>
            <View style={styles.contentsList}>
              {meal.contents.map((line, i) => (
                <View key={`${i}-${line}`} style={styles.contentLine}>
                  <View style={styles.bullet} accessible={false} importantForAccessibility="no" />
                  <Text style={styles.contentText}>{line}</Text>
                </View>
              ))}
            </View>
          </AppCard>
        ) : null}

        {/* diyetisyen notu */}
        {meal.note ? (
          <AppCard>
            {meal.dietitian ? (
              <View style={styles.noteHeader}>
                <View style={styles.noteAvatar} accessible={false} importantForAccessibility="no">
                  <Text style={styles.noteAvatarText}>{meal.dietitian.initials}</Text>
                </View>
                <Text style={styles.noteName} numberOfLines={1}>
                  {meal.dietitian.name}
                </Text>
              </View>
            ) : null}
            <Text style={styles.noteText}>{meal.note}</Text>
          </AppCard>
        ) : null}

        {/* kompakt kalori / makro */}
        {Array.isArray(meal.macros) && meal.macros.length > 0 ? (
          <AppCard>
            <View style={styles.macroGrid}>
              {meal.macros.map((m, i) => (
                <View key={m.label} style={[styles.macroCell, i > 0 && styles.macroCellBorder]}>
                  <Text style={styles.macroValue} numberOfLines={1}>
                    {m.value}
                  </Text>
                  <Text style={styles.macroLabel} numberOfLines={1}>
                    {m.label}
                  </Text>
                </View>
              ))}
            </View>
          </AppCard>
        ) : null}

        {/* ana eylem */}
        <View style={styles.actionWrap}>
          {completed ? (
            <>
              <View style={styles.completedBar} accessibilityRole="text">
                <Icon name="check" size={19} color={colors.success} accessible={false} />
                <Text style={styles.completedText}>{completedLabel}</Text>
              </View>
              {onToggleComplete ? (
                <Pressable
                  onPress={isCompletionUpdating ? undefined : onToggleComplete}
                  disabled={isCompletionUpdating}
                  accessibilityRole="button"
                  accessibilityLabel={undoLabel}
                  accessibilityState={{ disabled: isCompletionUpdating, busy: isCompletionUpdating }}
                  hitSlop={8}
                  style={({ pressed }) => [
                    styles.undoButton,
                    isCompletionUpdating && styles.undoDisabled,
                    pressed && !isCompletionUpdating && styles.pressed,
                  ]}
                >
                  {isCompletionUpdating ? (
                    <ActivityIndicator size="small" color={colors.textSecondary} />
                  ) : (
                    <Icon name="undo" size={15} color={colors.textSecondary} accessible={false} />
                  )}
                  <Text style={styles.undoText}>{undoLabel}</Text>
                </Pressable>
              ) : null}
            </>
          ) : (
            <AppButton
              variant="primary"
              label={markEatenLabel}
              onPress={onToggleComplete}
              loading={isCompletionUpdating}
              disabled={isCompletionUpdating}
            />
          )}
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.x3 },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...typography.cardTitle,
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: { width: 44 },
  content: { gap: spacing.x4, paddingTop: spacing.x2 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.x2, flexWrap: 'wrap' },
  meta: { ...typography.supporting, fontWeight: '500', color: colors.textSecondary },
  title: { ...typography.sectionTitle, fontSize: 22, lineHeight: 28, color: colors.textPrimary },
  photo: { height: 132, borderRadius: radius.card, width: '100%' },
  photoPlaceholder: {
    height: 132,
    borderRadius: radius.card,
    backgroundColor: colors.primarySurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.x4, marginTop: -spacing.x2 },
  removeText: { color: colors.error },
  cardHeading: { ...typography.body, fontWeight: '600', color: colors.textPrimary },
  contentsList: { marginTop: spacing.x2 + 2, gap: spacing.x2 },
  contentLine: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.x2 + 2 },
  bullet: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.primary,
    marginTop: 8,
  },
  contentText: {
    ...typography.supporting,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
    flex: 1,
    flexShrink: 1,
  },
  noteHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.x2 + 2 },
  noteAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteAvatarText: { ...typography.caption, fontWeight: '600', color: colors.primaryDark },
  noteName: { ...typography.supporting, fontWeight: '600', color: colors.textPrimary, flexShrink: 1 },
  noteText: {
    ...typography.supporting,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textPrimary,
    marginTop: spacing.x2 + 2,
  },
  macroGrid: { flexDirection: 'row' },
  macroCell: { flex: 1, alignItems: 'center', paddingHorizontal: spacing.x2 },
  macroCellBorder: { borderLeftWidth: 1, borderLeftColor: colors.borderSoft },
  macroValue: { ...typography.supporting, fontWeight: '600', color: colors.textPrimary },
  macroLabel: { ...typography.caption, fontSize: 11, color: colors.textTertiary, marginTop: 2 },
  actionWrap: { gap: spacing.x2, marginTop: spacing.x2 },
  completedBar: {
    height: 52,
    borderRadius: radius.control,
    backgroundColor: colors.primarySoft,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.x2,
  },
  completedText: { ...typography.button, color: colors.success },
  undoButton: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.x1 + 2,
  },
  undoText: { ...typography.body, fontSize: 14, fontWeight: '600', color: colors.textSecondary },
  undoDisabled: { opacity: 0.6 },
  pressed: { opacity: 0.8 },
  skeletonWrap: { paddingTop: spacing.x4 },
  skeletonGap: { marginTop: spacing.x4 },
});

export default MealDetailView;

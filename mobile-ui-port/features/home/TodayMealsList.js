import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { AppCard } from '../../components';
import { MealListItem } from '../meal-plan/MealListItem';

/**
 * TodayMealsList — "Günün öğünleri" bölümü: bölüm başlığı + kart içinde öğün
 * satırları. Günün öğün sayısı sınırlı olduğundan FlatList KULLANILMAZ; satırlar
 * düz View içinde render edilir. Böylece HomeView ScrollView'ı içinde iç içe
 * VirtualizedList (nested VirtualizedList) uyarısı oluşmaz.
 *
 * key olarak gerçek meal.id kullanılır; index key kullanılmaz.
 * updatingMealId: host'tan gelen, işlemi süren öğünün id'si — yalnız o satırın
 * toggle'ı kilitlenir; diğer öğünler kullanılabilir kalır.
 */
export function TodayMealsList({
  title = 'Günün öğünleri',
  meals = [],
  updatingMealId = null,
  onMealPress,
  onToggleMeal,
  style,
}) {
  if (!meals.length) return null;
  return (
    <View style={style}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <AppCard style={styles.card}>
        <View>
          {meals.map((meal, index) => (
            <React.Fragment key={meal.id}>
              {index > 0 ? <View style={styles.separator} /> : null}
              <MealListItem
                meal={meal}
                isUpdating={updatingMealId === meal.id}
                onPress={onMealPress}
                onToggle={onToggleMeal}
              />
            </React.Fragment>
          ))}
        </View>
      </AppCard>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    ...typography.sectionTitle,
    fontSize: 17,
    lineHeight: 22,
    color: colors.textPrimary,
    marginBottom: spacing.x3,
  },
  card: { padding: 0, overflow: 'hidden' },
  separator: { height: 1, backgroundColor: colors.borderSoft, marginLeft: spacing.x4 },
});

export default TodayMealsList;

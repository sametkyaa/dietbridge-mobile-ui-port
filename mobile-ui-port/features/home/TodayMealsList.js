import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { AppCard } from '../../components';
import { MealListItem } from '../meal-plan/MealListItem';

function Separator() {
  return <View style={styles.separator} />;
}

/**
 * TodayMealsList — "Günün öğünleri" bölümü: bölüm başlığı + kart içinde
 * FlatList (scrollEnabled=false; sayfa kaydırması AppScreen'de).
 * keyExtractor gerçek öğün id'sidir.
 */
export function TodayMealsList({ title = 'Günün öğünleri', meals = [], onMealPress, onToggleMeal, style }) {
  if (!meals.length) return null;
  return (
    <View style={style}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <AppCard style={styles.card}>
        <FlatList
          data={meals}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={Separator}
          renderItem={({ item }) => (
            <MealListItem meal={item} onPress={onMealPress} onToggle={onToggleMeal} />
          )}
        />
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

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealItem from '../components/MealItem';

import { CATEGORIES } from '../data/dummy-data';

const CategoryMealScreen = (props) => {
  const renderMealItem = (itemData) => {
    return (
      <MealItem
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        onSelectMeal={() => {
          props.navigation.navigate({
            routeName: 'MealDetail',
            params: {
              mealId: itemData.item.id,
            },
          });
        }}
      />
    );
  };
  const catId = props.navigation.getParam('categoryId');

  const displayedMeals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{ width: '100%' }}
      />
    </View>
  );
};

CategoryMealScreen.navigationOptions = (navigtionData) => {
  catId = navigtionData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryMealScreen;

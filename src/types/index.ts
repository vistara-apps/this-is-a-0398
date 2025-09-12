export interface User {
  userId: string;
  email: string;
  dietaryPreferences: string[];
  cookingSkillLevel: 'beginner' | 'intermediate' | 'advanced';
  shoppingHistory: Receipt[];
  subscriptionStatus: 'free' | 'premium';
}

export interface Receipt {
  receiptId: string;
  userId: string;
  uploadDate: string;
  rawText: string;
  parsedItems: ParsedItem[];
  filePath?: string;
}

export interface ParsedItem {
  itemId: string;
  originalText: string;
  normalizedText: string;
  category: string;
  quantity: number;
  price: number;
}

export interface PantryItem {
  pantryItemId: string;
  userId: string;
  normalizedFoodItem: string;
  estimatedQuantity: number;
  lastUpdated: string;
}

export interface Recipe {
  recipeId: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  dietaryTags: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  servings: number;
}

export interface MealPlan {
  mealPlanId: string;
  userId: string;
  startDate: string;
  endDate: string;
  scheduledMeals: {
    date: string;
    meal: 'breakfast' | 'lunch' | 'dinner';
    recipe: Recipe;
  }[];
}
import { ParsedItem, Recipe } from '../types';

// Mock OCR service
export async function processReceiptOCR(file: File): Promise<string> {
  // Simulate OCR processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock receipt text
  return `
GROCERY STORE
123 Main St
Date: 12/15/2023

CHICKEN BREAST      $8.99
BROCCOLI           $2.49
BROWN RICE         $3.99
OLIVE OIL          $5.99
GARLIC             $0.99
ONIONS             $1.49
BELL PEPPERS       $2.99
TOMATOES           $3.49
CHEESE CHEDDAR     $4.99
MILK 2%            $3.49
EGGS LARGE         $2.99
BREAD WHOLE WHEAT  $2.99
BANANAS            $1.99
APPLES             $3.99

Total: $51.84
`;
}

// Mock ingredient parsing
export async function parseIngredients(receiptText: string): Promise<ParsedItem[]> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const lines = receiptText.split('\n').filter(line => line.includes('$'));
  
  return lines.map((line, index) => {
    const parts = line.split('$');
    const itemName = parts[0].trim();
    const price = parseFloat(parts[1]) || 0;
    
    return {
      itemId: `item_${index}`,
      originalText: itemName,
      normalizedText: normalizeIngredient(itemName),
      category: categorizeIngredient(itemName),
      quantity: 1,
      price
    };
  });
}

function normalizeIngredient(item: string): string {
  const normalizations: { [key: string]: string } = {
    'CHICKEN BREAST': 'Chicken Breast',
    'BROCCOLI': 'Broccoli',
    'BROWN RICE': 'Brown Rice',
    'OLIVE OIL': 'Olive Oil',
    'GARLIC': 'Garlic',
    'ONIONS': 'Onions',
    'BELL PEPPERS': 'Bell Peppers',
    'TOMATOES': 'Tomatoes',
    'CHEESE CHEDDAR': 'Cheddar Cheese',
    'MILK 2%': 'Milk',
    'EGGS LARGE': 'Eggs',
    'BREAD WHOLE WHEAT': 'Whole Wheat Bread',
    'BANANAS': 'Bananas',
    'APPLES': 'Apples'
  };
  
  return normalizations[item] || item.toLowerCase();
}

function categorizeIngredient(item: string): string {
  const categories: { [key: string]: string } = {
    'CHICKEN BREAST': 'Protein',
    'BROCCOLI': 'Vegetables',
    'BROWN RICE': 'Grains',
    'OLIVE OIL': 'Oils & Fats',
    'GARLIC': 'Aromatics',
    'ONIONS': 'Aromatics',
    'BELL PEPPERS': 'Vegetables',
    'TOMATOES': 'Vegetables',
    'CHEESE CHEDDAR': 'Dairy',
    'MILK 2%': 'Dairy',
    'EGGS LARGE': 'Protein',
    'BREAD WHOLE WHEAT': 'Grains',
    'BANANAS': 'Fruits',
    'APPLES': 'Fruits'
  };
  
  return categories[item] || 'Other';
}

// Mock recipe generation
export async function generateRecipes(
  ingredients: ParsedItem[],
  dietaryPreferences: string[],
  skillLevel: string
): Promise<Recipe[]> {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const recipes: Recipe[] = [
    {
      recipeId: 'recipe_1',
      name: 'Chicken and Broccoli Stir-Fry',
      description: 'A quick and healthy stir-fry using your fresh chicken breast and broccoli',
      ingredients: [
        '1 lb Chicken Breast, diced',
        '2 cups Broccoli florets',
        '1 Bell Pepper, sliced',
        '2 cloves Garlic, minced',
        '1 Onion, sliced',
        '2 tbsp Olive Oil',
        'Salt and pepper to taste'
      ],
      instructions: [
        'Heat olive oil in a large pan over medium-high heat',
        'Add diced chicken breast and cook until golden brown',
        'Add garlic and onion, cook for 2 minutes',
        'Add broccoli and bell pepper, stir-fry for 5-6 minutes',
        'Season with salt and pepper',
        'Serve hot over brown rice'
      ],
      prepTime: 15,
      cookTime: 20,
      dietaryTags: ['High Protein', 'Low Carb'],
      skillLevel: 'beginner',
      servings: 4
    },
    {
      recipeId: 'recipe_2',
      name: 'Cheesy Scrambled Eggs',
      description: 'Fluffy scrambled eggs with melted cheddar cheese',
      ingredients: [
        '6 Eggs',
        '1/4 cup Milk',
        '1/2 cup Cheddar Cheese, shredded',
        '1 tbsp Olive Oil',
        'Salt and pepper to taste'
      ],
      instructions: [
        'Crack eggs into a bowl and whisk with milk',
        'Heat olive oil in a non-stick pan over medium-low heat',
        'Pour in egg mixture and let sit for 20 seconds',
        'Gently stir with a spatula, creating soft curds',
        'When almost set, add cheese and fold in gently',
        'Remove from heat and season with salt and pepper'
      ],
      prepTime: 5,
      cookTime: 8,
      dietaryTags: ['Vegetarian', 'High Protein'],
      skillLevel: 'beginner',
      servings: 2
    },
    {
      recipeId: 'recipe_3',
      name: 'Mediterranean Chicken Bowl',
      description: 'A nutritious bowl with chicken, tomatoes, and fresh ingredients',
      ingredients: [
        '1 lb Chicken Breast, grilled and sliced',
        '1 cup Brown Rice, cooked',
        '1 cup Tomatoes, diced',
        '1/2 cup Cheddar Cheese, crumbled',
        '2 tbsp Olive Oil',
        '1 clove Garlic, minced',
        'Salt, pepper, and herbs to taste'
      ],
      instructions: [
        'Cook brown rice according to package instructions',
        'Season and grill chicken breast until cooked through',
        'Let chicken rest, then slice',
        'Combine diced tomatoes with minced garlic and olive oil',
        'Assemble bowls with rice, chicken, tomato mixture, and cheese',
        'Drizzle with remaining olive oil and season'
      ],
      prepTime: 20,
      cookTime: 25,
      dietaryTags: ['High Protein', 'Mediterranean'],
      skillLevel: 'intermediate',
      servings: 3
    }
  ];
  
  return recipes.filter(recipe => 
    recipe.skillLevel === skillLevel || skillLevel === 'any'
  );
}
import React, { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { RecipeCard } from './RecipeCard';
import { generateRecipes } from '../../services/mockServices';
import { ParsedItem, Recipe } from '../../types';

interface RecipeGeneratorProps {
  ingredients: ParsedItem[];
  dietaryPreferences: string[];
  skillLevel: string;
  onRecipeSelect: (recipe: Recipe) => void;
}

export function RecipeGenerator({
  ingredients,
  dietaryPreferences,
  skillLevel,
  onRecipeSelect
}: RecipeGeneratorProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleGenerateRecipes = async () => {
    setIsGenerating(true);
    try {
      const generatedRecipes = await generateRecipes(
        ingredients,
        dietaryPreferences,
        skillLevel
      );
      setRecipes(generatedRecipes);
    } catch (error) {
      console.error('Error generating recipes:', error);
      alert('Failed to generate recipes. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleSelectRecipe = () => {
    if (selectedRecipe) {
      onRecipeSelect(selectedRecipe);
      setSelectedRecipe(null);
    }
  };

  React.useEffect(() => {
    if (ingredients.length > 0) {
      handleGenerateRecipes();
    }
  }, [ingredients, dietaryPreferences, skillLevel]);

  if (isGenerating) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Generating Recipes</h3>
          <p className="text-text-secondary text-center">
            Creating personalized meals from your ingredients...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (recipes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Recipe Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-text-secondary mb-4">
              Upload a receipt to get personalized recipe suggestions
            </p>
            <Button onClick={handleGenerateRecipes} variant="outline">
              Generate Sample Recipes
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Recipe Suggestions
          </CardTitle>
          <p className="text-text-secondary">
            Recipes optimized for your ingredients and preferences
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.recipeId}
                recipe={recipe}
                onSelect={() => handleRecipeClick(recipe)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedRecipe && (
        <Card>
          <CardHeader>
            <CardTitle>Recipe Details</CardTitle>
          </CardHeader>
          <CardContent>
            <RecipeCard
              recipe={selectedRecipe}
              showDetails={true}
              onSelect={handleSelectRecipe}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
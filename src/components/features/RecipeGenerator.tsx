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
      <Card className="card-shadow border-0">
        <CardHeader className="text-center pb-6">
          <div className="w-16 h-16 bg-gradient-food rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-text-primary mb-2">
            No Recipes Yet
          </CardTitle>
          <p className="text-text-secondary">
            {ingredients.length === 0
              ? "Upload a receipt to get personalized recipe suggestions based on your ingredients"
              : "Click below to generate recipe ideas from your ingredients"
            }
          </p>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <Button
              onClick={handleGenerateRecipes}
              className="btn-food text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Recipes
            </Button>
            <p className="text-xs text-text-muted mt-3">
              Uses AI to create recipes optimized for your ingredients and preferences
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="card-shadow border-0">
        <CardHeader className="bg-gradient-to-r from-accent/5 to-primary/5 border-b border-border/50">
          <CardTitle className="flex items-center gap-3 text-text-primary">
            <div className="w-10 h-10 bg-gradient-success rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            Recipe Suggestions
          </CardTitle>
          <p className="text-text-secondary text-sm">
            {recipes.length} delicious recipes optimized for your ingredients and preferences
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        <Card className="card-shadow border-0">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border/50">
            <CardTitle className="flex items-center gap-2 text-text-primary">
              <Heart className="h-5 w-5 text-accent" />
              Recipe Details
            </CardTitle>
            <p className="text-text-secondary text-sm">
              Complete instructions and ingredients for this recipe
            </p>
          </CardHeader>
          <CardContent className="pt-6">
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

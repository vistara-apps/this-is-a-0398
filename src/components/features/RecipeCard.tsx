import React from 'react';
import { Clock, Users, ChefHat } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Recipe } from '../../types';

interface RecipeCardProps {
  recipe: Recipe;
  variant?: 'vertical' | 'horizontal';
  onSelect?: () => void;
  showDetails?: boolean;
}

export function RecipeCard({ 
  recipe, 
  variant = 'vertical', 
  onSelect,
  showDetails = false 
}: RecipeCardProps) {
  const skillLevelColor = {
    beginner: 'text-accent',
    intermediate: 'text-yellow-600',
    advanced: 'text-red-600'
  };

  return (
    <Card className={variant === 'horizontal' ? 'flex flex-col sm:flex-row' : ''}>
      <CardHeader className={variant === 'horizontal' ? 'sm:w-1/3' : ''}>
        <CardTitle className="text-xl">{recipe.name}</CardTitle>
        <p className="text-text-secondary">{recipe.description}</p>
        
        <div className="flex flex-wrap gap-2 pt-2">
          {recipe.dietaryTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardHeader>

      <CardContent className={variant === 'horizontal' ? 'sm:w-2/3' : ''}>
        <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{recipe.prepTime + recipe.cookTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{recipe.servings} servings</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="h-4 w-4" />
            <span className={skillLevelColor[recipe.skillLevel]}>
              {recipe.skillLevel}
            </span>
          </div>
        </div>

        {showDetails && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Ingredients:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-text-secondary">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Instructions:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="text-text-secondary">
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {onSelect && (
          <Button onClick={onSelect} className="w-full mt-4">
            {showDetails ? 'Add to Meal Plan' : 'View Recipe'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
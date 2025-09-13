
import { Clock, Users, ChefHat, Star, Heart, Leaf } from 'lucide-react';
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
  const skillLevelConfig = {
    beginner: { color: 'text-accent', bg: 'bg-accent/10', icon: Heart },
    intermediate: { color: 'text-warning', bg: 'bg-warning/10', icon: Star },
    advanced: { color: 'text-error', bg: 'bg-error/10', icon: ChefHat }
  };

  const SkillIcon = skillLevelConfig[recipe.skillLevel].icon;

  return (
    <Card className={`group card-shadow-hover transition-all duration-300 hover:scale-[1.02] border-0 overflow-hidden ${
      variant === 'horizontal' ? 'flex flex-col sm:flex-row' : ''
    }`}>
      {/* Recipe Image Placeholder */}
      <div className={`relative overflow-hidden ${
        variant === 'horizontal' ? 'sm:w-1/3' : 'h-48'
      }`}>
        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 flex items-center justify-center">
          <div className="text-center">
            <ChefHat className="h-12 w-12 text-primary/60 mx-auto mb-2" />
            <p className="text-xs text-text-muted font-medium">Recipe Image</p>
          </div>
        </div>
        {/* Dietary Tags Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {recipe.dietaryTags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-surface/90 backdrop-blur-sm text-text-primary rounded-full border border-border/50 shadow-sm"
            >
              {tag === 'Vegetarian' && <Leaf className="h-3 w-3 inline mr-1" />}
              {tag}
            </span>
          ))}
          {recipe.dietaryTags.length > 2 && (
            <span className="px-2 py-1 text-xs bg-surface/90 backdrop-blur-sm text-text-secondary rounded-full border border-border/50">
              +{recipe.dietaryTags.length - 2}
            </span>
          )}
        </div>
        {/* Skill Level Badge */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${skillLevelConfig[recipe.skillLevel].bg} ${skillLevelConfig[recipe.skillLevel].color} border border-border/50 shadow-sm`}>
          <SkillIcon className="h-3 w-3" />
          {recipe.skillLevel}
        </div>
      </div>

      <div className={variant === 'horizontal' ? 'sm:w-2/3' : ''}>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl text-text-primary leading-tight">{recipe.name}</CardTitle>
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">{recipe.description}</p>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-secondary/20 rounded-lg border border-border/50">
              <Clock className="h-5 w-5 text-primary mx-auto mb-1" />
              <div className="text-sm font-semibold text-text-primary">{recipe.prepTime + recipe.cookTime}</div>
              <div className="text-xs text-text-secondary">minutes</div>
            </div>
            <div className="text-center p-3 bg-secondary/20 rounded-lg border border-border/50">
              <Users className="h-5 w-5 text-accent mx-auto mb-1" />
              <div className="text-sm font-semibold text-text-primary">{recipe.servings}</div>
              <div className="text-xs text-text-secondary">servings</div>
            </div>
            <div className="text-center p-3 bg-secondary/20 rounded-lg border border-border/50">
              <SkillIcon className={`h-5 w-5 mx-auto mb-1 ${skillLevelConfig[recipe.skillLevel].color}`} />
              <div className={`text-sm font-semibold ${skillLevelConfig[recipe.skillLevel].color}`}>
                {recipe.skillLevel}
              </div>
              <div className="text-xs text-text-secondary">level</div>
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
            <Button
              onClick={onSelect}
              className="w-full mt-4 btn-food text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg group-hover:shadow-xl"
            >
              {showDetails ? 'Add to Meal Plan' : 'View Recipe'}
              <Heart className="h-4 w-4 ml-2" />
            </Button>
          )}
        </CardContent>
      </div>
    </Card>
  );
}

import { useState, useEffect } from 'react';
import { AppBar } from './components/layout/AppBar';
import { UserOnboarding } from './components/features/UserOnboarding';
import { ReceiptUploader } from './components/features/ReceiptUploader';
import { IngredientsList } from './components/features/IngredientsList';
import { RecipeGenerator } from './components/features/RecipeGenerator';
import { PantryManager } from './components/features/PantryManager';
import { SubscriptionModal } from './components/features/SubscriptionModal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/Tabs';
import { Button } from './components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/Card';
import { ChefHat, Package, Crown } from 'lucide-react';
import { User, ParsedItem, Recipe, PantryItem } from './types';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentReceipt, setCurrentReceipt] = useState<ParsedItem[]>([]);
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [currentStep, setCurrentStep] = useState<'upload' | 'review' | 'generate'>('upload');

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('receiptchef-user');
    const savedPantry = localStorage.getItem('receiptchef-pantry');
    
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    if (savedPantry) {
      setPantryItems(JSON.parse(savedPantry));
    }
  }, []);

  // Save user data to localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('receiptchef-user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('receiptchef-pantry', JSON.stringify(pantryItems));
  }, [pantryItems]);

  const handleUserComplete = (user: User) => {
    setCurrentUser(user);
  };

  const handleReceiptProcessed = (items: ParsedItem[]) => {
    setCurrentReceipt(items);
    setCurrentStep('review');
  };

  const handleIngredientsConfirmed = () => {
    // Check if user has premium subscription
    if (currentUser?.subscriptionStatus === 'free') {
      setShowSubscriptionModal(true);
    } else {
      setCurrentStep('generate');
    }
  };

  const handleRecipeSelect = (recipe: Recipe) => {
    console.log('Selected recipe:', recipe);
    // In a real app, this would add to meal plan
  };

  const handleUpgradeSuccess = () => {
    if (currentUser) {
      const updatedUser = { ...currentUser, subscriptionStatus: 'premium' as const };
      setCurrentUser(updatedUser);
      setCurrentStep('generate');
    }
  };

  const resetFlow = () => {
    setCurrentReceipt([]);
    setCurrentStep('upload');
  };

  // Show onboarding if no user
  if (!currentUser) {
    return <UserOnboarding onComplete={handleUserComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <AppBar currentUser={currentUser} />
      
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-text-primary mb-2">
                Welcome back, {currentUser.email.split('@')[0]}!
              </h1>
              <p className="text-text-secondary">
                Upload a receipt to start planning your next delicious meal
              </p>
            </div>
            {currentUser.subscriptionStatus === 'free' && (
              <Button
                onClick={() => setShowSubscriptionModal(true)}
                variant="outline"
                className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
              >
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Premium
              </Button>
            )}
          </div>

          {currentUser.subscriptionStatus === 'premium' && (
            <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-600" />
                <span className="font-semibold text-yellow-700">Premium Member</span>
              </div>
              <p className="text-sm text-yellow-600 mt-1">
                Enjoy unlimited access to all ReceiptChef AI features!
              </p>
            </div>
          )}
        </div>

        <Tabs defaultValue="meal-planning" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="meal-planning" className="flex items-center gap-2">
              <ChefHat className="h-4 w-4" />
              Meal Planning
            </TabsTrigger>
            <TabsTrigger value="pantry" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Pantry
            </TabsTrigger>
          </TabsList>

          <TabsContent value="meal-planning" className="space-y-6">
            {currentStep === 'upload' && (
              <div className="space-y-6">
                <ReceiptUploader onReceiptProcessed={handleReceiptProcessed} />
                
                {currentUser.subscriptionStatus === 'free' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Free Plan Limits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-text-secondary mb-4">
                        You can process up to 3 receipts per month on the free plan.
                      </p>
                      <Button
                        onClick={() => setShowSubscriptionModal(true)}
                        variant="outline"
                      >
                        <Crown className="h-4 w-4 mr-2" />
                        Upgrade for Unlimited Access
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {currentStep === 'review' && currentReceipt.length > 0 && (
              <div className="space-y-6">
                <Button variant="outline" onClick={resetFlow}>
                  ← Upload New Receipt
                </Button>
                <IngredientsList
                  items={currentReceipt}
                  onItemsUpdated={setCurrentReceipt}
                  onConfirm={handleIngredientsConfirmed}
                />
              </div>
            )}

            {currentStep === 'generate' && currentReceipt.length > 0 && (
              <div className="space-y-6">
                <Button variant="outline" onClick={resetFlow}>
                  ← Start Over
                </Button>
                <RecipeGenerator
                  ingredients={currentReceipt}
                  dietaryPreferences={currentUser.dietaryPreferences}
                  skillLevel={currentUser.cookingSkillLevel}
                  onRecipeSelect={handleRecipeSelect}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="pantry">
            <PantryManager
              pantryItems={pantryItems}
              onPantryUpdate={setPantryItems}
            />
          </TabsContent>
        </Tabs>
      </main>

      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onSuccess={handleUpgradeSuccess}
      />
    </div>
  );
}

export default App;

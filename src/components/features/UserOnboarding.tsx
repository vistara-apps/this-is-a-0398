import React, { useState } from 'react';
import { ChefHat, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { User } from '../../types';

interface UserOnboardingProps {
  onComplete: (user: User) => void;
}

const DIETARY_OPTIONS = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Keto',
  'Paleo',
  'Mediterranean',
  'Low-Carb',
  'Nut-Free',
  'No restrictions'
];

const SKILL_LEVELS = [
  { value: 'beginner', label: 'Beginner', description: 'Simple recipes with basic techniques' },
  { value: 'intermediate', label: 'Intermediate', description: 'Moderate complexity with some techniques' },
  { value: 'advanced', label: 'Advanced', description: 'Complex recipes and advanced techniques' }
];

export function UserOnboarding({ onComplete }: UserOnboardingProps) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [skillLevel, setSkillLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  const handleDietaryToggle = (option: string) => {
    if (option === 'No restrictions') {
      setSelectedDietary(['No restrictions']);
    } else {
      setSelectedDietary(prev => {
        const filtered = prev.filter(item => item !== 'No restrictions');
        return prev.includes(option)
          ? filtered.filter(item => item !== option)
          : [...filtered, option];
      });
    }
  };

  const handleComplete = () => {
    const user: User = {
      userId: 'user_' + Math.random().toString(36).substr(2, 9),
      email,
      dietaryPreferences: selectedDietary,
      cookingSkillLevel: skillLevel,
      shoppingHistory: [],
      subscriptionStatus: 'free'
    };
    onComplete(user);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <ChefHat className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Welcome to ReceiptChef AI</h1>
          <p className="text-text-secondary">
            Turn your grocery receipts into delicious, waste-free meals
          </p>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Let's get started</CardTitle>
              <p className="text-text-secondary">
                First, we'll need your email to save your preferences
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  onClick={() => setStep(2)}
                  disabled={!email}
                  className="w-full"
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Dietary Preferences</CardTitle>
              <p className="text-text-secondary">
                Select any dietary restrictions or preferences you have
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                {DIETARY_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleDietaryToggle(option)}
                    className={`w-full p-3 text-left border rounded-lg transition-colors ${
                      selectedDietary.includes(option)
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {selectedDietary.includes(option) && (
                        <Check className="h-4 w-4" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={() => setStep(3)} className="flex-1">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Cooking Skill Level</CardTitle>
              <p className="text-text-secondary">
                This helps us suggest recipes that match your comfort level
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                {SKILL_LEVELS.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setSkillLevel(level.value as any)}
                    className={`w-full p-4 text-left border rounded-lg transition-colors ${
                      skillLevel === level.value
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{level.label}</h3>
                        <p className="text-sm text-text-secondary">{level.description}</p>
                      </div>
                      {skillLevel === level.value && (
                        <Check className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleComplete} className="flex-1">
                  Complete Setup
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
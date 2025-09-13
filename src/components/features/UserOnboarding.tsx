import React, { useState } from 'react';
import { ChefHat, Check, ArrowRight, Mail, Heart, Star } from 'lucide-react';
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

  const progressSteps = [
    { step: 1, title: 'Account', icon: Mail },
    { step: 2, title: 'Preferences', icon: Heart },
    { step: 3, title: 'Skills', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary-50 to-accent-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {progressSteps.map((stepInfo, index) => {
              const Icon = stepInfo.icon;
              const isCompleted = step > stepInfo.step;
              const isCurrent = step === stepInfo.step;

              return (
                <React.Fragment key={stepInfo.step}>
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isCompleted
                        ? 'bg-accent border-accent text-white'
                        : isCurrent
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-surface text-text-muted'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`text-xs mt-2 font-medium ${
                      isCurrent ? 'text-primary' : 'text-text-secondary'
                    }`}>
                      {stepInfo.title}
                    </span>
                  </div>
                  {index < progressSteps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 transition-colors duration-300 ${
                      isCompleted ? 'bg-accent' : 'bg-border'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-food rounded-full mb-6 shadow-lg">
            <ChefHat className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-text-primary">Welcome to ReceiptChef AI</h1>
          <p className="text-text-secondary leading-relaxed">
            Turn your grocery receipts into delicious, waste-free meals
          </p>
        </div>

        {step === 1 && (
          <Card className="card-shadow border-0 animate-fade-in">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl text-text-primary">Let's get started</CardTitle>
              <p className="text-text-secondary text-sm leading-relaxed">
                First, we'll need your email to save your preferences and meal plans
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-muted" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 border-border focus:input-focus transition-all duration-200"
                  />
                </div>
                <Button
                  onClick={() => setStep(2)}
                  disabled={!email}
                  className="w-full h-12 btn-food text-white font-semibold rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="card-shadow border-0 animate-slide-up">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl text-text-primary">Dietary Preferences</CardTitle>
              <p className="text-text-secondary text-sm leading-relaxed">
                Select any dietary restrictions or preferences you have
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                {DIETARY_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleDietaryToggle(option)}
                    className={`w-full p-4 text-left border-2 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                      selectedDietary.includes(option)
                        ? 'border-accent bg-accent/10 text-accent shadow-sm'
                        : 'border-border bg-surface hover:border-primary/30 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {selectedDietary.includes(option) && (
                        <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 h-12 border-2 border-border hover:border-primary/50 transition-all duration-200"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  className="flex-1 h-12 btn-food text-white font-semibold rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="card-shadow border-0 animate-slide-up">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl text-text-primary">Cooking Skill Level</CardTitle>
              <p className="text-text-secondary text-sm leading-relaxed">
                This helps us suggest recipes that match your comfort level
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                {SKILL_LEVELS.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setSkillLevel(level.value as any)}
                    className={`w-full p-5 text-left border-2 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                      skillLevel === level.value
                        ? 'border-primary bg-primary/10 shadow-sm'
                        : 'border-border bg-surface hover:border-primary/30 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-text-primary mb-1">{level.label}</h3>
                        <p className="text-sm text-text-secondary">{level.description}</p>
                      </div>
                      {skillLevel === level.value && (
                        <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center ml-3">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1 h-12 border-2 border-border hover:border-primary/50 transition-all duration-200"
                >
                  Back
                </Button>
                <Button
                  onClick={handleComplete}
                  className="flex-1 h-12 gradient-success text-white font-semibold rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                  Complete Setup
                  <Star className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

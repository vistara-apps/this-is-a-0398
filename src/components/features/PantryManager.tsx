import { useState } from 'react';
import { Package, Plus, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { PantryItem } from '../../types';
import { generateId } from '../../lib/utils';

interface PantryManagerProps {
  pantryItems: PantryItem[];
  onPantryUpdate: (items: PantryItem[]) => void;
}

export function PantryManager({ pantryItems, onPantryUpdate }: PantryManagerProps) {
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('1');

  const handleAddItem = () => {
    if (newItemName.trim()) {
      const newItem: PantryItem = {
        pantryItemId: generateId(),
        userId: 'current-user',
        normalizedFoodItem: newItemName.trim(),
        estimatedQuantity: parseInt(newItemQuantity) || 1,
        lastUpdated: new Date().toISOString()
      };
      
      onPantryUpdate([...pantryItems, newItem]);
      setNewItemName('');
      setNewItemQuantity('1');
    }
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    const updatedItems = pantryItems.map(item => {
      if (item.pantryItemId === itemId) {
        const newQuantity = Math.max(0, item.estimatedQuantity + delta);
        return newQuantity === 0 
          ? null 
          : { ...item, estimatedQuantity: newQuantity, lastUpdated: new Date().toISOString() };
      }
      return item;
    }).filter(Boolean) as PantryItem[];
    
    onPantryUpdate(updatedItems);
  };

  const handleRemoveItem = (itemId: string) => {
    const updatedItems = pantryItems.filter(item => item.pantryItemId !== itemId);
    onPantryUpdate(updatedItems);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Pantry Management
        </CardTitle>
        <p className="text-text-secondary">
          Keep track of ingredients you already have at home
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add pantry item..."
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
              className="flex-1"
            />
            <Input
              type="number"
              placeholder="Qty"
              value={newItemQuantity}
              onChange={(e) => setNewItemQuantity(e.target.value)}
              className="w-20"
              min="1"
            />
            <Button onClick={handleAddItem}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {pantryItems.length === 0 ? (
              <div className="text-center py-8 text-text-secondary">
                <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Your pantry is empty</p>
                <p className="text-sm">Add items you already have at home</p>
              </div>
            ) : (
              pantryItems.map((item) => (
                <div
                  key={item.pantryItemId}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <span className="font-medium">{item.normalizedFoodItem}</span>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUpdateQuantity(item.pantryItemId, -1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.estimatedQuantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUpdateQuantity(item.pantryItemId, 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRemoveItem(item.pantryItemId)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

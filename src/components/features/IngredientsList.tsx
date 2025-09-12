import React, { useState } from 'react';
import { Check, Edit2, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ParsedItem } from '../../types';
import { formatCurrency } from '../../lib/utils';

interface IngredientsListProps {
  items: ParsedItem[];
  onItemsUpdated: (items: ParsedItem[]) => void;
  onConfirm: () => void;
}

export function IngredientsList({ items, onItemsUpdated, onConfirm }: IngredientsListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleEdit = (item: ParsedItem) => {
    setEditingId(item.itemId);
    setEditValue(item.normalizedText);
  };

  const handleSave = () => {
    if (editingId) {
      const updatedItems = items.map(item =>
        item.itemId === editingId
          ? { ...item, normalizedText: editValue }
          : item
      );
      onItemsUpdated(updatedItems);
      setEditingId(null);
      setEditValue('');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleRemove = (itemId: string) => {
    const updatedItems = items.filter(item => item.itemId !== itemId);
    onItemsUpdated(updatedItems);
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Extracted Ingredients</CardTitle>
        <p className="text-text-secondary">
          Review and edit the ingredients we found. You can modify names or remove items.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-6">
          {items.map((item) => (
            <div
              key={item.itemId}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex-1">
                {editingId === item.itemId ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1"
                      autoFocus
                    />
                    <Button size="sm" onClick={handleSave}>
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" onClick={handleCancel}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.normalizedText}</p>
                      <p className="text-sm text-text-secondary">{item.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{formatCurrency(item.price)}</span>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemove(item.itemId)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total: {formatCurrency(totalPrice)}</span>
            <span className="text-text-secondary">{items.length} items</span>
          </div>
          <Button onClick={onConfirm} className="w-full" size="lg">
            Generate Meal Plan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
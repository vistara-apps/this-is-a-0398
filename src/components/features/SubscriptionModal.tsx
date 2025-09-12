import React, { useState } from 'react';
import { Crown, Check, Loader2 } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { usePaymentContext } from '../../hooks/usePaymentContext';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PREMIUM_FEATURES = [
  'Unlimited receipt processing',
  'Advanced dietary filters',
  'Family meal planning',
  'Grocery shopping optimization',
  'Recipe nutrition analysis',
  'Waste reduction tracking',
  'Premium support'
];

export function SubscriptionModal({ isOpen, onClose, onSuccess }: SubscriptionModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { createSession } = usePaymentContext();

  const handleSubscribe = async () => {
    setIsProcessing(true);
    try {
      await createSession();
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
      <div className="text-center mb-6">
        <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Upgrade to Premium</h2>
        <p className="text-text-secondary">
          Unlock the full potential of ReceiptChef AI
        </p>
      </div>

      <Card className="mb-6">
        <div className="p-6">
          <div className="text-center mb-4">
            <span className="text-3xl font-bold">$9.99</span>
            <span className="text-text-secondary">/month</span>
          </div>
          
          <ul className="space-y-2">
            {PREMIUM_FEATURES.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-accent" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <div className="space-y-3">
        <Button
          onClick={handleSubscribe}
          disabled={isProcessing}
          className="w-full"
          size="lg"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Processing...
            </>
          ) : (
            'Subscribe Now'
          )}
        </Button>
        
        <Button
          variant="outline"
          onClick={onClose}
          className="w-full"
        >
          Maybe Later
        </Button>
      </div>

      <p className="text-xs text-text-secondary text-center mt-4">
        Secure payment powered by blockchain technology
      </p>
    </Modal>
  );
}
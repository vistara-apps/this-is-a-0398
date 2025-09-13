
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ChefHat, Settings, User } from 'lucide-react';
import { Button } from '../ui/Button';

interface AppBarProps {
  currentUser?: any;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
}

export function AppBar({ currentUser, onOpenSettings, onOpenProfile }: AppBarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/60">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-text-primary">ReceiptChef AI</h1>
              <p className="text-xs text-text-secondary">Turn receipts into meals</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {currentUser && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onOpenSettings}
                  className="h-8 w-8 p-0"
                >
                  <Settings className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onOpenProfile}
                  className="h-8 w-8 p-0"
                >
                  <User className="h-4 w-4" />
                </Button>
              </>
            )}
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
}

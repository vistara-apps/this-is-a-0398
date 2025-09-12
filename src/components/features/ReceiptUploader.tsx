import React, { useState } from 'react';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { processReceiptOCR, parseIngredients } from '../../services/mockServices';
import { ParsedItem } from '../../types';

interface ReceiptUploaderProps {
  onReceiptProcessed: (items: ParsedItem[]) => void;
}

export function ReceiptUploader({ onReceiptProcessed }: ReceiptUploaderProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      alert('Please upload an image or PDF file');
      return;
    }

    setIsProcessing(true);
    try {
      // Process OCR
      const rawText = await processReceiptOCR(file);
      
      // Parse ingredients
      const parsedItems = await parseIngredients(rawText);
      
      onReceiptProcessed(parsedItems);
    } catch (error) {
      console.error('Error processing receipt:', error);
      alert('Failed to process receipt. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isProcessing) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Processing Your Receipt</h3>
          <p className="text-text-secondary text-center">
            We're extracting ingredients from your receipt using AI...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Your Grocery Receipt
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            Drop your receipt here, or click to browse
          </h3>
          <p className="text-text-secondary mb-4">
            Supports images (JPG, PNG) and PDF files
          </p>
          <Button>
            <label htmlFor="receipt-upload" className="cursor-pointer">
              Choose File
            </label>
          </Button>
          <input
            id="receipt-upload"
            type="file"
            className="hidden"
            accept="image/*,.pdf"
            onChange={handleFileInput}
          />
        </div>
      </CardContent>
    </Card>
  );
}
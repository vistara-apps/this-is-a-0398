import React, { useState, useRef } from 'react';
import { Upload, FileText, Loader2, CheckCircle, X, Image as ImageIcon } from 'lucide-react';
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setError('Please upload an image or PDF file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
    setError(null);
    setIsProcessing(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Process OCR
      const rawText = await processReceiptOCR(file);
      setUploadProgress(95);

      // Parse ingredients
      const parsedItems = await parseIngredients(rawText);
      setUploadProgress(100);

      // Small delay to show completion
      setTimeout(() => {
        onReceiptProcessed(parsedItems);
      }, 500);

    } catch (error) {
      console.error('Error processing receipt:', error);
      setError('Failed to process receipt. Please try again.');
      setSelectedFile(null);
    } finally {
      setIsProcessing(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  if (isProcessing) {
    return (
      <Card className="card-shadow border-0">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="relative mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
            {uploadProgress > 0 && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="w-20 h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-food rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
          <h3 className="text-xl font-semibold mb-2 text-text-primary">
            {uploadProgress < 50 ? 'Processing Your Receipt' : uploadProgress < 100 ? 'Extracting Ingredients' : 'Almost Done!'}
          </h3>
          <p className="text-text-secondary text-center leading-relaxed">
            {uploadProgress < 50
              ? "We're scanning your receipt with AI..."
              : uploadProgress < 100
              ? "Finding ingredients and parsing details..."
              : "Finalizing your ingredient list..."
            }
          </p>
          {selectedFile && (
            <div className="mt-4 flex items-center gap-2 text-sm text-text-secondary">
              <FileText className="h-4 w-4" />
              <span>{selectedFile.name}</span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-shadow border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border/50">
        <CardTitle className="flex items-center gap-3 text-text-primary">
          <div className="w-10 h-10 bg-gradient-food rounded-lg flex items-center justify-center">
            <Upload className="h-5 w-5 text-white" />
          </div>
          Upload Your Grocery Receipt
        </CardTitle>
        <p className="text-text-secondary text-sm mt-2">
          Snap a photo or upload a PDF of your receipt to get started
        </p>
      </CardHeader>
      <CardContent className="p-0">
        {error && (
          <div className="mx-6 mt-4 p-3 bg-error/10 border border-error/20 rounded-lg flex items-center gap-2">
            <X className="h-4 w-4 text-error flex-shrink-0" />
            <span className="text-sm text-error">{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-error hover:text-error/80"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div
          className={`relative p-8 text-center transition-all duration-300 cursor-pointer ${
            dragActive
              ? 'bg-primary/5 border-primary shadow-lg scale-[1.02]'
              : 'hover:bg-secondary/20'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
            dragActive
              ? 'bg-primary/20 scale-110'
              : 'bg-secondary/30'
          }`}>
            <ImageIcon className={`h-10 w-10 transition-colors duration-300 ${
              dragActive ? 'text-primary' : 'text-text-muted'
            }`} />
          </div>

          <h3 className="text-xl font-semibold mb-3 text-text-primary">
            {dragActive ? 'Drop your receipt here' : 'Drop your receipt here, or click to browse'}
          </h3>
          <p className="text-text-secondary mb-6 leading-relaxed">
            Supports images (JPG, PNG) and PDF files up to 10MB
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button className="btn-food text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95">
              <Upload className="h-4 w-4 mr-2" />
              Choose File
            </Button>
            <span className="text-xs text-text-muted">or drag and drop</span>
          </div>

          {selectedFile && !isProcessing && (
            <div className="mt-6 p-3 bg-accent/10 border border-accent/20 rounded-lg flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-accent" />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-text-primary">{selectedFile.name}</p>
                <p className="text-xs text-text-secondary">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready to process
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="text-text-muted hover:text-error transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*,.pdf"
          onChange={handleFileInput}
        />
      </CardContent>
    </Card>
  );
}

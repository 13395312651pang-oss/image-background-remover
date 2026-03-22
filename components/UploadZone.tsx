'use client';

import { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface UploadZoneProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
  onClear: () => void;
}

export default function UploadZone({ onImageSelect, selectedImage, onClear }: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (isValidImage(file)) {
        onImageSelect(file);
      } else {
        alert('请上传 JPG、PNG 或 WEBP 格式的图片');
      }
    }
  }, [onImageSelect]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (isValidImage(file)) {
        onImageSelect(file);
      } else {
        alert('请上传 JPG、PNG 或 WEBP 格式的图片');
      }
    }
  }, [onImageSelect]);

  const isValidImage = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    return validTypes.includes(file.type);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (selectedImage) {
    return (
      <div className="w-full bg-slate-800/50 border-2 border-blue-500/50 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-slate-400" />
            </div>
            <div>
              <p className="text-white font-medium truncate max-w-[200px] sm:max-w-[300px]">
                {selectedImage.name}
              </p>
              <p className="text-slate-400 text-sm">
                {formatFileSize(selectedImage.size)}
              </p>
            </div>
          </div>
          <button
            onClick={onClear}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        w-full border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
        transition-all duration-200
        ${isDragOver 
          ? 'border-blue-500 bg-blue-500/10' 
          : 'border-slate-500 hover:border-blue-400 hover:bg-slate-800/30'
        }
      `}
    >
      <input
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer block">
        <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragOver ? 'text-blue-500' : 'text-slate-400'}`} />
        <p className={`text-lg mb-2 ${isDragOver ? 'text-blue-400' : 'text-slate-300'}`}>
          点击或拖拽图片到此处
        </p>
        <p className="text-sm text-slate-500">
          支持 JPG, PNG, WEBP · 最大 10MB
        </p>
      </label>
    </div>
  );
}

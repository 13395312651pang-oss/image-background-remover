'use client';

import { useState, useCallback } from 'react';
import { Wand2, AlertCircle, Settings } from 'lucide-react';
import UploadZone from '@/components/UploadZone';
import ImagePreview from '@/components/ImagePreview';
import { removeBackgroundClient, validateImageFile } from '@/lib/api';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const handleImageSelect = useCallback((file: File) => {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error || '文件验证失败');
      return;
    }

    setError(null);
    setProcessedUrl(null);
    setSelectedImage(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleClear = useCallback(() => {
    setSelectedImage(null);
    setOriginalPreview(null);
    setProcessedUrl(null);
    setError(null);
  }, []);

  const handleProcess = useCallback(async () => {
    if (!selectedImage) return;

    if (!apiKey.trim()) {
      setError('请先设置 Remove.bg API Key');
      setShowSettings(true);
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const result = await removeBackgroundClient(selectedImage, apiKey);
      
      if (result.success && result.resultUrl) {
        setProcessedUrl(result.resultUrl);
      } else {
        setError(result.error || '处理失败，请重试');
      }
    } catch (err) {
      setError('处理过程中发生错误，请检查网络连接');
    } finally {
      setIsProcessing(false);
    }
  }, [selectedImage, apiKey]);

  const handleDownload = useCallback(() => {
    if (!processedUrl) return;
    
    const link = document.createElement('a');
    link.href = processedUrl;
    link.download = `removed-bg-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [processedUrl]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Wand2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  图片背景移除工具
                </h1>
                <p className="text-sm text-slate-400">AI 智能识别，一键去除背景</p>
              </div>
            </div>

            {/* Settings Button */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-lg transition-colors ${
                showSettings 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* API Key Settings Panel */}
          {showSettings && (
            <div className="mt-6 p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Remove.bg API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="输入你的 API Key"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <p className="mt-2 text-xs text-slate-500">
                获取 API Key: <a href="https://www.remove.bg/api" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://www.remove.bg/api</a>
              </p>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload */}
          <div className="space-y-6">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-blue-400 font-bold">1</span>
                </span>
                上传图片
              </h2>
              
              <UploadZone 
                onImageSelect={handleImageSelect}
                selectedImage={selectedImage}
                onClear={handleClear}
              />
            </div>

            {/* Process Button */}
            {selectedImage && !processedUrl && (
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-blue-400 font-bold">2</span>
                  </span>
                  开始处理
                </h2>
                
                <button
                  onClick={handleProcess}
                  disabled={isProcessing}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>处理中...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                      <span>开始处理</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right Column - Preview */}
          <div>
            <ImagePreview
              originalUrl={originalPreview}
              processedUrl={processedUrl}
              isProcessing={isProcessing}
              onDownload={handleDownload}
              onReset={() => {
                setProcessedUrl(null);
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

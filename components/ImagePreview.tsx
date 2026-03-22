'use client';

import { useState, useCallback } from 'react';
import { ZoomIn, ZoomOut, Download, RefreshCcw, Split, Image as ImageIcon } from 'lucide-react';

interface ImagePreviewProps {
  originalUrl: string | null;
  processedUrl: string | null;
  isProcessing: boolean;
  onDownload: () => void;
  onReset: () => void;
}

export default function ImagePreview({ 
  originalUrl, 
  processedUrl, 
  isProcessing,
  onDownload,
  onReset
}: ImagePreviewProps) {
  const [showComparison, setShowComparison] = useState(false);
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));

  // 如果没有原图，显示占位符
  if (!originalUrl) {
    return (
      <div className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-12">
        <div className="flex flex-col items-center justify-center text-slate-500">
          <ImageIcon className="w-16 h-16 mb-4" />
          <p className="text-lg">请先上传图片</p>
          <p className="text-sm mt-2">支持 JPG、PNG、WEBP 格式</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
      {/* 工具栏 */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800/80">
        <div className="flex items-center space-x-2">
          {processedUrl && (
            <button
              onClick={() => setShowComparison(!showComparison)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
                showComparison 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              <Split className="w-4 h-4" />
              <span>对比</span>
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-slate-400 text-sm min-w-[50px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 图片展示区域 */}
      <div className="relative p-6 min-h-[400px] flex items-center justify-center bg-slate-900/50">
        {showComparison && processedUrl ? (
          // 对比模式
          <div className="flex space-x-4">
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-2">原图</p>
              <div 
                className="relative overflow-hidden rounded-lg border border-slate-700 bg-slate-800"
                style={{ 
                  width: '300px', 
                  height: '300px',
                  transform: `scale(${zoom})`,
                  transformOrigin: 'center'
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={originalUrl}
                  alt="Original"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-2">处理后</p>
              <div 
                className="relative overflow-hidden rounded-lg border border-slate-700"
                style={{ 
                  width: '300px', 
                  height: '300px',
                  transform: `scale(${zoom})`,
                  transformOrigin: 'center',
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
                  backgroundColor: '#1e293b'
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={processedUrl}
                  alt="Processed"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        ) : (
          // 单图模式
          <div 
            className="relative overflow-hidden rounded-lg border border-slate-700 bg-slate-800"
            style={{ 
              width: '500px', 
              height: '500px',
              transform: `scale(${zoom})`,
              transformOrigin: 'center'
            }}
          >
            {processedUrl ? (
              // 显示处理后图片（透明背景）
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
                  backgroundColor: '#1e293b'
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={processedUrl}
                  alt="Processed"
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              // 显示原图
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={originalUrl}
                alt="Original"
                className="w-full h-full object-contain"
              />
            )}
          </div>
        )}
      </div>

      {/* 底部操作栏 */}
      {processedUrl && (
        <div className="flex items-center justify-center space-x-4 p-6 border-t border-slate-700 bg-slate-800/50">
          <button
            onClick={onDownload}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/25"
          >
            <Download className="w-5 h-5" />
            <span>下载结果</span>
          </button>
          
          <button
            onClick={onReset}
            className="flex items-center space-x-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
          >
            <RefreshCcw className="w-5 h-5" />
            <span>处理新图片</span>
          </button>
        </div>
      )}
    </div>
  );
}

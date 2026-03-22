import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '图片背景移除工具 - AI 智能去背',
  description: '一键移除图片背景，AI 智能识别主体。免费在线工具，支持 JPG、PNG、WEBP 格式。',
  keywords: '背景移除,去背,抠图,AI去背,图片处理,remove background',
  openGraph: {
    title: '图片背景移除工具 - AI 智能去背',
    description: '一键移除图片背景，AI 智能识别主体',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased">
        {children}
        
        {/* Footer */}
        <footer className="border-t border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <p className="text-slate-400 text-sm">
                © 2026 图片背景移除工具. All rights reserved.
              </p>
              
              <div className="flex items-center space-x-6 text-sm">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  隐私政策
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  使用条款
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  联系我们
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

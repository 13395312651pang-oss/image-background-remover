// 客户端直接调用 Remove.bg API
// 注意：在生产环境中，应该使用服务器端 API 路由来保护 API Key

const REMOVE_BG_API_URL = 'https://api.remove.bg/v1.0/removebg';

export async function removeBackgroundClient(
  imageFile: File,
  apiKey: string
): Promise<{
  success: boolean;
  resultUrl?: string;
  error?: string;
}> {
  try {
    const formData = new FormData();
    formData.append('image_file', imageFile);
    formData.append('size', 'auto');

    const response = await fetch(REMOVE_BG_API_URL, {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.errors?.[0]?.title || 
                          errorData.errors?.[0]?.detail ||
                          `请求失败 (${response.status})`;
      throw new Error(errorMessage);
    }

    // 获取处理后的图片 blob
    const blob = await response.blob();
    
    // 转换为 base64
    const base64 = await blobToBase64(blob);

    return {
      success: true,
      resultUrl: base64,
    };
  } catch (error) {
    console.error('Remove background error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '处理过程中发生错误',
    };
  }
}

// 辅助函数：Blob 转 Base64
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// 验证文件
export function validateImageFile(file: File): {
  valid: boolean;
  error?: string;
} {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: '不支持的图片格式，请上传 JPG、PNG 或 WEBP 格式的图片',
    };
  }

  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: '图片大小超过限制，最大支持 10MB',
    };
  }

  return { valid: true };
}

// 格式化文件大小
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

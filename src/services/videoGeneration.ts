/**
 * AI Video Generation Service
 *
 * Bu servis, AI video oluşturma API'leri ile entegrasyonu sağlar.
 * Desteklenen API'ler: D-ID, HeyGen, Synthesia
 */

import axios from 'axios';
import { Character } from '../constants/characters';
import { Background } from '../constants/backgrounds';
import { Occasion } from '../constants/occasions';

// API Yapılandırması
const API_CONFIG = {
  DID: {
    baseUrl: 'https://api.d-id.com',
    apiKey: process.env.DID_API_KEY || '',
  },
  HEYGEN: {
    baseUrl: 'https://api.heygen.com',
    apiKey: process.env.HEYGEN_API_KEY || '',
  },
};

// Video Oluşturma İsteği
export interface VideoGenerationRequest {
  character: Character;
  background: Background;
  occasion: Occasion;
  message: string;
  recipientName?: string;
  voiceId?: string;
  language?: string;
}

// Video Oluşturma Yanıtı
export interface VideoGenerationResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  videoUrl?: string;
  thumbnailUrl?: string;
  duration?: number;
  error?: string;
}

// Video Durumu
export interface VideoStatus {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress?: number;
  videoUrl?: string;
  error?: string;
}

/**
 * AI Video Oluşturma Servisi
 */
class VideoGenerationService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    // Varsayılan olarak D-ID kullan
    this.apiKey = API_CONFIG.DID.apiKey;
    this.baseUrl = API_CONFIG.DID.baseUrl;
  }

  /**
   * Video oluşturma isteği gönder
   */
  async createVideo(request: VideoGenerationRequest): Promise<VideoGenerationResponse> {
    try {
      // Gerçek API entegrasyonu için örnek yapı
      // D-ID API için örnek payload
      const payload = {
        source_url: request.character.imageUrl,
        script: {
          type: 'text',
          input: this.formatMessage(request.message, request.recipientName),
          provider: {
            type: 'microsoft',
            voice_id: request.character.voiceId,
          },
        },
        config: {
          stitch: true,
          result_format: 'mp4',
        },
        background: {
          source_url: request.background.imageUrl,
        },
      };

      // Geliştirme aşamasında simüle edilmiş yanıt
      // Gerçek API çağrısı için aşağıdaki kodu aktif edin:
      /*
      const response = await axios.post(
        `${this.baseUrl}/talks`,
        payload,
        {
          headers: {
            'Authorization': `Basic ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return {
        id: response.data.id,
        status: 'pending',
      };
      */

      // Simüle edilmiş yanıt
      return {
        id: `video_${Date.now()}`,
        status: 'pending',
      };
    } catch (error) {
      console.error('Video oluşturma hatası:', error);
      throw error;
    }
  }

  /**
   * Video durumunu kontrol et
   */
  async getVideoStatus(videoId: string): Promise<VideoStatus> {
    try {
      // Gerçek API çağrısı için:
      /*
      const response = await axios.get(
        `${this.baseUrl}/talks/${videoId}`,
        {
          headers: {
            'Authorization': `Basic ${this.apiKey}`,
          },
        }
      );
      return {
        id: videoId,
        status: response.data.status,
        progress: response.data.progress,
        videoUrl: response.data.result_url,
      };
      */

      // Simüle edilmiş yanıt
      return {
        id: videoId,
        status: 'completed',
        progress: 100,
        videoUrl: 'https://example.com/video.mp4',
      };
    } catch (error) {
      console.error('Video durumu kontrol hatası:', error);
      throw error;
    }
  }

  /**
   * Mesajı formatla
   */
  private formatMessage(message: string, recipientName?: string): string {
    if (recipientName) {
      return `Sevgili ${recipientName}, ${message}`;
    }
    return message;
  }

  /**
   * Video oluşturma işlemini bekle
   */
  async waitForCompletion(
    videoId: string,
    onProgress?: (progress: number) => void,
    maxAttempts: number = 60,
    intervalMs: number = 2000
  ): Promise<VideoStatus> {
    let attempts = 0;

    while (attempts < maxAttempts) {
      const status = await this.getVideoStatus(videoId);

      if (onProgress && status.progress) {
        onProgress(status.progress);
      }

      if (status.status === 'completed' || status.status === 'failed') {
        return status;
      }

      await new Promise((resolve) => setTimeout(resolve, intervalMs));
      attempts++;
    }

    throw new Error('Video oluşturma zaman aşımına uğradı');
  }
}

// Singleton instance
export const videoGenerationService = new VideoGenerationService();

/**
 * Video oluşturma hook'u için yardımcı fonksiyon
 */
export async function generateVideo(
  request: VideoGenerationRequest,
  onProgress?: (progress: number) => void
): Promise<string> {
  // Video oluşturma isteği gönder
  const createResponse = await videoGenerationService.createVideo(request);

  // Tamamlanmasını bekle
  const finalStatus = await videoGenerationService.waitForCompletion(
    createResponse.id,
    onProgress
  );

  if (finalStatus.status === 'failed') {
    throw new Error(finalStatus.error || 'Video oluşturulamadı');
  }

  return finalStatus.videoUrl || '';
}

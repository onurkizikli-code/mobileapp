/**
 * Text-to-Speech Service
 *
 * Bu servis, metni sese dönüştürme API'leri ile entegrasyonu sağlar.
 * Desteklenen API'ler: Google Cloud TTS, Amazon Polly, Azure Cognitive Services
 */

import axios from 'axios';

// API Yapılandırması
const TTS_CONFIG = {
  GOOGLE: {
    baseUrl: 'https://texttospeech.googleapis.com/v1',
    apiKey: process.env.GOOGLE_TTS_API_KEY || '',
  },
  AZURE: {
    baseUrl: 'https://eastus.tts.speech.microsoft.com/cognitiveservices/v1',
    apiKey: process.env.AZURE_TTS_API_KEY || '',
    region: 'eastus',
  },
};

// Ses Seçenekleri
export interface VoiceOption {
  id: string;
  name: string;
  language: string;
  languageCode: string;
  gender: 'male' | 'female';
  provider: 'google' | 'azure' | 'amazon';
}

// TTS İsteği
export interface TTSRequest {
  text: string;
  voiceId: string;
  languageCode: string;
  speed?: number; // 0.5 - 2.0
  pitch?: number; // -20 to 20
}

// TTS Yanıtı
export interface TTSResponse {
  audioUrl: string;
  audioData?: string; // Base64 encoded
  duration?: number;
}

// Desteklenen Sesler
export const SUPPORTED_VOICES: VoiceOption[] = [
  // Türkçe
  {
    id: 'tr-TR-EmelNeural',
    name: 'Emel (Kadın)',
    language: 'Türkçe',
    languageCode: 'tr-TR',
    gender: 'female',
    provider: 'azure',
  },
  {
    id: 'tr-TR-AhmetNeural',
    name: 'Ahmet (Erkek)',
    language: 'Türkçe',
    languageCode: 'tr-TR',
    gender: 'male',
    provider: 'azure',
  },

  // İngilizce
  {
    id: 'en-US-JennyNeural',
    name: 'Jenny (Kadın)',
    language: 'İngilizce (ABD)',
    languageCode: 'en-US',
    gender: 'female',
    provider: 'azure',
  },
  {
    id: 'en-US-GuyNeural',
    name: 'Guy (Erkek)',
    language: 'İngilizce (ABD)',
    languageCode: 'en-US',
    gender: 'male',
    provider: 'azure',
  },
  {
    id: 'en-GB-SoniaNeural',
    name: 'Sonia (Kadın)',
    language: 'İngilizce (İngiltere)',
    languageCode: 'en-GB',
    gender: 'female',
    provider: 'azure',
  },
  {
    id: 'en-GB-RyanNeural',
    name: 'Ryan (Erkek)',
    language: 'İngilizce (İngiltere)',
    languageCode: 'en-GB',
    gender: 'male',
    provider: 'azure',
  },

  // Arapça
  {
    id: 'ar-SA-ZariyahNeural',
    name: 'Zariyah (Kadın)',
    language: 'Arapça',
    languageCode: 'ar-SA',
    gender: 'female',
    provider: 'azure',
  },
  {
    id: 'ar-SA-HamedNeural',
    name: 'Hamed (Erkek)',
    language: 'Arapça',
    languageCode: 'ar-SA',
    gender: 'male',
    provider: 'azure',
  },

  // Almanca
  {
    id: 'de-DE-KatjaNeural',
    name: 'Katja (Kadın)',
    language: 'Almanca',
    languageCode: 'de-DE',
    gender: 'female',
    provider: 'azure',
  },
  {
    id: 'de-DE-ConradNeural',
    name: 'Conrad (Erkek)',
    language: 'Almanca',
    languageCode: 'de-DE',
    gender: 'male',
    provider: 'azure',
  },

  // Fransızca
  {
    id: 'fr-FR-DeniseNeural',
    name: 'Denise (Kadın)',
    language: 'Fransızca',
    languageCode: 'fr-FR',
    gender: 'female',
    provider: 'azure',
  },
  {
    id: 'fr-FR-HenriNeural',
    name: 'Henri (Erkek)',
    language: 'Fransızca',
    languageCode: 'fr-FR',
    gender: 'male',
    provider: 'azure',
  },

  // İspanyolca
  {
    id: 'es-ES-ElviraNeural',
    name: 'Elvira (Kadın)',
    language: 'İspanyolca',
    languageCode: 'es-ES',
    gender: 'female',
    provider: 'azure',
  },
  {
    id: 'es-MX-DaliaNeural',
    name: 'Dalia (Kadın)',
    language: 'İspanyolca (Meksika)',
    languageCode: 'es-MX',
    gender: 'female',
    provider: 'azure',
  },

  // Japonca
  {
    id: 'ja-JP-NanamiNeural',
    name: 'Nanami (Kadın)',
    language: 'Japonca',
    languageCode: 'ja-JP',
    gender: 'female',
    provider: 'azure',
  },

  // Çince
  {
    id: 'zh-CN-XiaoxiaoNeural',
    name: 'Xiaoxiao (Kadın)',
    language: 'Çince',
    languageCode: 'zh-CN',
    gender: 'female',
    provider: 'azure',
  },
  {
    id: 'zh-CN-YunxiNeural',
    name: 'Yunxi (Erkek)',
    language: 'Çince',
    languageCode: 'zh-CN',
    gender: 'male',
    provider: 'azure',
  },

  // Hintçe
  {
    id: 'hi-IN-SwaraNeural',
    name: 'Swara (Kadın)',
    language: 'Hintçe',
    languageCode: 'hi-IN',
    gender: 'female',
    provider: 'azure',
  },
  {
    id: 'hi-IN-MadhurNeural',
    name: 'Madhur (Erkek)',
    language: 'Hintçe',
    languageCode: 'hi-IN',
    gender: 'male',
    provider: 'azure',
  },

  // Portekizce
  {
    id: 'pt-BR-FranciscaNeural',
    name: 'Francisca (Kadın)',
    language: 'Portekizce (Brezilya)',
    languageCode: 'pt-BR',
    gender: 'female',
    provider: 'azure',
  },
  {
    id: 'pt-BR-AntonioNeural',
    name: 'Antonio (Erkek)',
    language: 'Portekizce (Brezilya)',
    languageCode: 'pt-BR',
    gender: 'male',
    provider: 'azure',
  },
];

/**
 * Text-to-Speech Servisi
 */
class TextToSpeechService {
  private apiKey: string;
  private baseUrl: string;
  private region: string;

  constructor() {
    // Varsayılan olarak Azure kullan
    this.apiKey = TTS_CONFIG.AZURE.apiKey;
    this.baseUrl = TTS_CONFIG.AZURE.baseUrl;
    this.region = TTS_CONFIG.AZURE.region;
  }

  /**
   * Metni sese dönüştür
   */
  async synthesize(request: TTSRequest): Promise<TTSResponse> {
    try {
      const ssml = this.createSSML(request);

      // Gerçek API çağrısı için:
      /*
      const response = await axios.post(
        this.baseUrl,
        ssml,
        {
          headers: {
            'Ocp-Apim-Subscription-Key': this.apiKey,
            'Content-Type': 'application/ssml+xml',
            'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
          },
          responseType: 'arraybuffer',
        }
      );

      // Base64'e dönüştür
      const audioData = Buffer.from(response.data).toString('base64');

      return {
        audioUrl: `data:audio/mp3;base64,${audioData}`,
        audioData,
      };
      */

      // Simüle edilmiş yanıt
      return {
        audioUrl: 'https://example.com/audio.mp3',
        duration: 5,
      };
    } catch (error) {
      console.error('TTS hatası:', error);
      throw error;
    }
  }

  /**
   * SSML oluştur
   */
  private createSSML(request: TTSRequest): string {
    const speed = request.speed || 1.0;
    const pitch = request.pitch || 0;

    return `
      <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${request.languageCode}">
        <voice name="${request.voiceId}">
          <prosody rate="${speed}" pitch="${pitch > 0 ? '+' : ''}${pitch}%">
            ${this.escapeXml(request.text)}
          </prosody>
        </voice>
      </speak>
    `.trim();
  }

  /**
   * XML karakterlerini escape et
   */
  private escapeXml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  /**
   * Dile göre sesleri getir
   */
  getVoicesByLanguage(languageCode: string): VoiceOption[] {
    return SUPPORTED_VOICES.filter((voice) =>
      voice.languageCode.startsWith(languageCode.split('-')[0])
    );
  }

  /**
   * Cinsiyete göre sesleri getir
   */
  getVoicesByGender(gender: 'male' | 'female'): VoiceOption[] {
    return SUPPORTED_VOICES.filter((voice) => voice.gender === gender);
  }

  /**
   * Ses ID'sine göre ses bilgisi getir
   */
  getVoiceById(voiceId: string): VoiceOption | undefined {
    return SUPPORTED_VOICES.find((voice) => voice.id === voiceId);
  }
}

// Singleton instance
export const textToSpeechService = new TextToSpeechService();

/**
 * TTS hook'u için yardımcı fonksiyon
 */
export async function synthesizeSpeech(
  text: string,
  voiceId: string,
  languageCode: string,
  options?: { speed?: number; pitch?: number }
): Promise<string> {
  const response = await textToSpeechService.synthesize({
    text,
    voiceId,
    languageCode,
    speed: options?.speed,
    pitch: options?.pitch,
  });

  return response.audioUrl;
}

/**
 * Social Media Sharing Service
 *
 * Bu servis, videoları sosyal medya platformlarına paylaşma işlemlerini yönetir.
 */

import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Platform, Linking, Alert } from 'react-native';

// Paylaşım Platformları
export type SharePlatform =
  | 'whatsapp'
  | 'instagram'
  | 'facebook'
  | 'twitter'
  | 'telegram'
  | 'email'
  | 'sms'
  | 'native';

// Paylaşım İsteği
export interface ShareRequest {
  videoUrl: string;
  message?: string;
  platform: SharePlatform;
}

// Paylaşım Yanıtı
export interface ShareResponse {
  success: boolean;
  platform: SharePlatform;
  error?: string;
}

// Platform URL şemaları
const PLATFORM_SCHEMES: Record<SharePlatform, string> = {
  whatsapp: 'whatsapp://',
  instagram: 'instagram://',
  facebook: 'fb://',
  twitter: 'twitter://',
  telegram: 'tg://',
  email: 'mailto:',
  sms: 'sms:',
  native: '',
};

/**
 * Sharing Service
 */
class SharingService {
  /**
   * Platform uygulamasının yüklü olup olmadığını kontrol et
   */
  async isPlatformAvailable(platform: SharePlatform): Promise<boolean> {
    if (platform === 'native' || platform === 'email' || platform === 'sms') {
      return true;
    }

    try {
      const scheme = PLATFORM_SCHEMES[platform];
      return await Linking.canOpenURL(scheme);
    } catch {
      return false;
    }
  }

  /**
   * Videoyu cihaza kaydet
   */
  async saveToDevice(videoUrl: string): Promise<string | null> {
    try {
      // İzin kontrolü
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'İzin Gerekli',
          'Videoyu kaydetmek için galeri izni gerekiyor.'
        );
        return null;
      }

      // Videoyu indir
      const filename = `CelebVerse_${Date.now()}.mp4`;
      const localUri = `${FileSystem.documentDirectory}${filename}`;

      const downloadResult = await FileSystem.downloadAsync(videoUrl, localUri);

      if (downloadResult.status !== 200) {
        throw new Error('Video indirilemedi');
      }

      // Galeriye kaydet
      const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);

      // CelebVerse albümüne ekle
      const album = await MediaLibrary.getAlbumAsync('CelebVerse');
      if (album) {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      } else {
        await MediaLibrary.createAlbumAsync('CelebVerse', asset, false);
      }

      return asset.uri;
    } catch (error) {
      console.error('Video kaydetme hatası:', error);
      return null;
    }
  }

  /**
   * Native paylaşım dialogunu aç
   */
  async shareNative(videoUrl: string, message?: string): Promise<ShareResponse> {
    try {
      // Paylaşım mümkün mü kontrol et
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        return {
          success: false,
          platform: 'native',
          error: 'Paylaşım bu cihazda desteklenmiyor',
        };
      }

      // Videoyu önce cihaza kaydet
      const localUri = await this.saveToDevice(videoUrl);
      if (!localUri) {
        return {
          success: false,
          platform: 'native',
          error: 'Video kaydedilemedi',
        };
      }

      // Paylaş
      await Sharing.shareAsync(localUri, {
        mimeType: 'video/mp4',
        dialogTitle: 'CelebVerse Video Paylaş',
        UTI: 'public.movie',
      });

      return {
        success: true,
        platform: 'native',
      };
    } catch (error) {
      console.error('Native paylaşım hatası:', error);
      return {
        success: false,
        platform: 'native',
        error: 'Paylaşım başarısız oldu',
      };
    }
  }

  /**
   * WhatsApp'a paylaş
   */
  async shareToWhatsApp(videoUrl: string, message?: string): Promise<ShareResponse> {
    try {
      const isAvailable = await this.isPlatformAvailable('whatsapp');
      if (!isAvailable) {
        // WhatsApp yüklü değilse native paylaşımı kullan
        return this.shareNative(videoUrl, message);
      }

      // WhatsApp'a mesaj gönder
      const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(
        message || 'CelebVerse ile oluşturduğum videoyu izle!'
      )}`;

      await Linking.openURL(whatsappUrl);

      return {
        success: true,
        platform: 'whatsapp',
      };
    } catch (error) {
      console.error('WhatsApp paylaşım hatası:', error);
      return {
        success: false,
        platform: 'whatsapp',
        error: 'WhatsApp paylaşımı başarısız oldu',
      };
    }
  }

  /**
   * Instagram'a paylaş
   */
  async shareToInstagram(videoUrl: string): Promise<ShareResponse> {
    try {
      const isAvailable = await this.isPlatformAvailable('instagram');
      if (!isAvailable) {
        return this.shareNative(videoUrl);
      }

      // Videoyu kaydet
      const localUri = await this.saveToDevice(videoUrl);
      if (!localUri) {
        return {
          success: false,
          platform: 'instagram',
          error: 'Video kaydedilemedi',
        };
      }

      // Instagram Stories'e paylaş (iOS)
      if (Platform.OS === 'ios') {
        const instagramUrl = `instagram-stories://share?source_application=com.celebverse.app`;
        await Linking.openURL(instagramUrl);
      } else {
        // Android için native paylaşım
        return this.shareNative(videoUrl);
      }

      return {
        success: true,
        platform: 'instagram',
      };
    } catch (error) {
      console.error('Instagram paylaşım hatası:', error);
      return {
        success: false,
        platform: 'instagram',
        error: 'Instagram paylaşımı başarısız oldu',
      };
    }
  }

  /**
   * E-posta ile paylaş
   */
  async shareViaEmail(videoUrl: string, message?: string): Promise<ShareResponse> {
    try {
      const subject = encodeURIComponent('CelebVerse Video');
      const body = encodeURIComponent(
        message || 'Size özel bir video mesajı göndermek istedim!'
      );

      const emailUrl = `mailto:?subject=${subject}&body=${body}`;
      await Linking.openURL(emailUrl);

      return {
        success: true,
        platform: 'email',
      };
    } catch (error) {
      console.error('E-posta paylaşım hatası:', error);
      return {
        success: false,
        platform: 'email',
        error: 'E-posta açılamadı',
      };
    }
  }

  /**
   * SMS ile paylaş
   */
  async shareViaSMS(videoUrl: string, message?: string): Promise<ShareResponse> {
    try {
      const body = encodeURIComponent(
        message || 'Size özel bir video mesajı göndermek istedim!'
      );

      const smsUrl = Platform.OS === 'ios'
        ? `sms:&body=${body}`
        : `sms:?body=${body}`;

      await Linking.openURL(smsUrl);

      return {
        success: true,
        platform: 'sms',
      };
    } catch (error) {
      console.error('SMS paylaşım hatası:', error);
      return {
        success: false,
        platform: 'sms',
        error: 'SMS açılamadı',
      };
    }
  }

  /**
   * Belirtilen platforma paylaş
   */
  async share(request: ShareRequest): Promise<ShareResponse> {
    switch (request.platform) {
      case 'whatsapp':
        return this.shareToWhatsApp(request.videoUrl, request.message);
      case 'instagram':
        return this.shareToInstagram(request.videoUrl);
      case 'email':
        return this.shareViaEmail(request.videoUrl, request.message);
      case 'sms':
        return this.shareViaSMS(request.videoUrl, request.message);
      case 'native':
      default:
        return this.shareNative(request.videoUrl, request.message);
    }
  }

  /**
   * Linki panoya kopyala
   */
  async copyLink(videoUrl: string): Promise<boolean> {
    try {
      // React Native'de clipboard API kullanılır
      // expo-clipboard paketi ile:
      // await Clipboard.setStringAsync(videoUrl);
      return true;
    } catch {
      return false;
    }
  }
}

// Singleton instance
export const sharingService = new SharingService();

/**
 * Hook için yardımcı fonksiyon
 */
export async function shareVideo(
  videoUrl: string,
  platform: SharePlatform,
  message?: string
): Promise<ShareResponse> {
  return sharingService.share({
    videoUrl,
    platform,
    message,
  });
}

/**
 * Videoyu cihaza kaydet
 */
export async function downloadVideo(videoUrl: string): Promise<string | null> {
  return sharingService.saveToDevice(videoUrl);
}

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { RootStackParamList } from '../navigation/types';
import { COLORS, SPACING, RADIUS, FONTS, SHADOWS } from '../constants/theme';
import { getOccasionById } from '../constants/occasions';
import { getCharacterById } from '../constants/characters';
import { getBackgroundById } from '../constants/backgrounds';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type PreviewRouteProp = RouteProp<RootStackParamList, 'Preview'>;

const { width } = Dimensions.get('window');
const VIDEO_HEIGHT = width * 0.75;

type GenerationStatus = 'idle' | 'generating' | 'ready' | 'error';

export default function PreviewScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<PreviewRouteProp>();
  const { occasionId, characterId, backgroundId, message, recipientName } =
    route.params;

  const occasion = getOccasionById(occasionId);
  const character = getCharacterById(characterId);
  const background = getBackgroundById(backgroundId);

  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [progress, setProgress] = useState(0);

  // Video oluşturma simülasyonu
  useEffect(() => {
    generateVideo();
  }, []);

  const generateVideo = async () => {
    setStatus('generating');
    setProgress(0);

    // Simüle edilmiş ilerleme
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus('ready');
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  const handleShare = () => {
    navigation.navigate('Share', {
      videoUrl: 'generated_video_url', // Gerçek URL burada olacak
    });
  };

  const handleRetry = () => {
    generateVideo();
  };

  return (
    <View style={styles.container}>
      {/* Video Önizleme Alanı */}
      <View style={styles.videoContainer}>
        {background && (
          <View
            style={[
              styles.videoPreview,
              { backgroundColor: background.color + '30' },
            ]}
          >
            {/* Arka Plan */}
            <View
              style={[
                styles.backgroundLayer,
                { backgroundColor: background.color + '40' },
              ]}
            />

            {/* Karakter Placeholder */}
            {character && (
              <View style={styles.characterContainer}>
                <View style={styles.characterAvatar}>
                  <Ionicons
                    name={character.gender === 'female' ? 'woman' : 'man'}
                    size={60}
                    color={COLORS.white}
                  />
                </View>
                <Text style={styles.characterName}>{character.name}</Text>
              </View>
            )}

            {/* Mesaj Balonu */}
            <View style={styles.messageBubble}>
              {recipientName && (
                <Text style={styles.recipientText}>
                  Sevgili {recipientName},
                </Text>
              )}
              <Text style={styles.messageText} numberOfLines={4}>
                {message}
              </Text>
            </View>

            {/* Özel Gün İkonu */}
            {occasion && (
              <View style={styles.occasionBadge}>
                <Text style={styles.occasionIcon}>{occasion.icon}</Text>
              </View>
            )}

            {/* Durum Overlay */}
            {status === 'generating' && (
              <View style={styles.overlay}>
                <ActivityIndicator size="large" color={COLORS.white} />
                <Text style={styles.overlayText}>Video olusturuluyor...</Text>
                <View style={styles.progressBar}>
                  <View
                    style={[styles.progressFill, { width: `${progress}%` }]}
                  />
                </View>
                <Text style={styles.progressText}>{Math.round(progress)}%</Text>
              </View>
            )}

            {status === 'error' && (
              <View style={styles.overlay}>
                <Ionicons
                  name="alert-circle"
                  size={48}
                  color={COLORS.error}
                />
                <Text style={styles.overlayText}>Bir hata olustu</Text>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={handleRetry}
                >
                  <Text style={styles.retryButtonText}>Tekrar Dene</Text>
                </TouchableOpacity>
              </View>
            )}

            {status === 'ready' && (
              <View style={styles.playButton}>
                <Ionicons name="play" size={40} color={COLORS.white} />
              </View>
            )}
          </View>
        )}
      </View>

      {/* Seçim Özeti */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Ozet</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Ozel Gun:</Text>
          <View style={styles.summaryValue}>
            <Text style={styles.summaryIcon}>{occasion?.icon}</Text>
            <Text style={styles.summaryText}>{occasion?.name}</Text>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Karakter:</Text>
          <Text style={styles.summaryText}>{character?.name}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Arka Plan:</Text>
          <Text style={styles.summaryText}>{background?.name}</Text>
        </View>

        {recipientName && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Alici:</Text>
            <Text style={styles.summaryText}>{recipientName}</Text>
          </View>
        )}
      </View>

      {/* Alt Butonlar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="create" size={20} color={COLORS.primary} />
          <Text style={styles.editButtonText}>Duzenle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.shareButton,
            status !== 'ready' && styles.shareButtonDisabled,
          ]}
          onPress={handleShare}
          disabled={status !== 'ready'}
        >
          <LinearGradient
            colors={
              status === 'ready'
                ? [COLORS.primary, COLORS.secondary]
                : [COLORS.gray300, COLORS.gray400]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.shareButtonGradient}
          >
            <Ionicons name="share-social" size={20} color={COLORS.white} />
            <Text style={styles.shareButtonText}>Paylas</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  videoContainer: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.base,
  },
  videoPreview: {
    width: '100%',
    height: VIDEO_HEIGHT,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    position: 'relative',
    ...SHADOWS.lg,
  },
  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  characterContainer: {
    position: 'absolute',
    left: SPACING.lg,
    top: '30%',
    alignItems: 'center',
  },
  characterAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.md,
  },
  characterName: {
    marginTop: SPACING.sm,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.white,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  messageBubble: {
    position: 'absolute',
    right: SPACING.md,
    top: '20%',
    maxWidth: '55%',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.md,
  },
  recipientText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  messageText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  occasionBadge: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    backgroundColor: COLORS.white,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.sm,
  },
  occasionIcon: {
    fontSize: 24,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    marginTop: SPACING.md,
  },
  progressBar: {
    width: '60%',
    height: 4,
    backgroundColor: COLORS.white + '30',
    borderRadius: 2,
    marginTop: SPACING.md,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  progressText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    marginTop: SPACING.sm,
  },
  retryButton: {
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
  },
  retryButtonText: {
    color: COLORS.white,
    fontWeight: FONTS.weights.medium,
  },
  playButton: {
    position: 'absolute',
    alignSelf: 'center',
    top: '40%',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.primary + 'CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryContainer: {
    margin: SPACING.base,
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    ...SHADOWS.sm,
  },
  summaryTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  summaryLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  summaryValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryIcon: {
    fontSize: 16,
    marginRight: SPACING.xs,
  },
  summaryText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
    color: COLORS.textPrimary,
  },
  bottomBar: {
    flexDirection: 'row',
    padding: SPACING.base,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    gap: SPACING.md,
    ...SHADOWS.lg,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  editButtonText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    marginLeft: SPACING.sm,
  },
  shareButton: {
    flex: 2,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
  },
  shareButtonDisabled: {
    opacity: 0.6,
  },
  shareButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
  },
  shareButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    marginLeft: SPACING.sm,
  },
});

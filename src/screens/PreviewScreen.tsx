import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');
const VIDEO_HEIGHT = width * 0.75;

const OCCASIONS: Record<string, { name: string; icon: string }> = {
  birthday: { name: 'Dogum Gunu', icon: '🎂' },
  anniversary: { name: 'Evlilik Yildonumu', icon: '💒' },
  valentines: { name: 'Sevgililer Gunu', icon: '❤️' },
  ramadan: { name: 'Ramazan Bayrami', icon: '🌙' },
  christmas: { name: 'Noel', icon: '🎄' },
  new_year: { name: 'Yeni Yil', icon: '🎊' },
  mothers_day: { name: 'Anneler Gunu', icon: '👩' },
  fathers_day: { name: 'Babalar Gunu', icon: '👨' },
};

const CHARACTERS: Record<string, { name: string; gender: string }> = {
  c1: { name: 'Ayse', gender: 'female' },
  c2: { name: 'Mehmet', gender: 'male' },
  c3: { name: 'Emma', gender: 'female' },
  c4: { name: 'Ahmed', gender: 'male' },
  c5: { name: 'Fatima', gender: 'female' },
  c6: { name: 'James', gender: 'male' },
};

const BACKGROUNDS: Record<string, { name: string; color: string }> = {
  b1: { name: 'Sahil', color: '#06B6D4' },
  b2: { name: 'Dag', color: '#10B981' },
  b3: { name: 'Sehir', color: '#6366F1' },
  b4: { name: 'Orman', color: '#22C55E' },
  b5: { name: 'Cicekler', color: '#EC4899' },
  b6: { name: 'Gokyuzu', color: '#3B82F6' },
};

type GenerationStatus = 'idle' | 'generating' | 'ready' | 'error';

export default function PreviewScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { occasionId, characterId, backgroundId, message, recipientName } = route.params as {
    occasionId: string;
    characterId: string;
    backgroundId: string;
    message: string;
    recipientName: string;
  };

  const occasion = OCCASIONS[occasionId];
  const character = CHARACTERS[characterId];
  const background = BACKGROUNDS[backgroundId];

  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    generateVideo();
  }, []);

  const generateVideo = () => {
    setStatus('generating');
    setProgress(0);

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
    navigation.navigate('Share', { videoUrl: 'generated_video_url' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <View style={[styles.videoPreview, { backgroundColor: background?.color + '30' }]}>
          <View style={[styles.backgroundLayer, { backgroundColor: background?.color + '40' }]} />

          {character && (
            <View style={styles.characterContainer}>
              <View style={styles.characterAvatar}>
                <Ionicons name={character.gender === 'female' ? 'woman' : 'man'} size={60} color="#FFFFFF" />
              </View>
              <Text style={styles.characterName}>{character.name}</Text>
            </View>
          )}

          <View style={styles.messageBubble}>
            {recipientName ? <Text style={styles.recipientText}>Sevgili {recipientName},</Text> : null}
            <Text style={styles.messageText} numberOfLines={4}>{message}</Text>
          </View>

          {occasion && (
            <View style={styles.occasionBadge}>
              <Text style={styles.occasionIcon}>{occasion.icon}</Text>
            </View>
          )}

          {status === 'generating' && (
            <View style={styles.overlay}>
              <ActivityIndicator size="large" color="#FFFFFF" />
              <Text style={styles.overlayText}>Video olusturuluyor...</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${Math.min(progress, 100)}%` }]} />
              </View>
              <Text style={styles.progressText}>{Math.round(progress)}%</Text>
            </View>
          )}

          {status === 'error' && (
            <View style={styles.overlay}>
              <Ionicons name="alert-circle" size={48} color="#EF4444" />
              <Text style={styles.overlayText}>Bir hata olustu</Text>
              <TouchableOpacity style={styles.retryButton} onPress={generateVideo}>
                <Text style={styles.retryButtonText}>Tekrar Dene</Text>
              </TouchableOpacity>
            </View>
          )}

          {status === 'ready' && (
            <View style={styles.playButton}>
              <Ionicons name="play" size={40} color="#FFFFFF" />
            </View>
          )}
        </View>
      </View>

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
        {recipientName ? (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Alici:</Text>
            <Text style={styles.summaryText}>{recipientName}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.goBack()}>
          <Ionicons name="create" size={20} color="#6366F1" />
          <Text style={styles.editButtonText}>Duzenle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.shareButton, status !== 'ready' && styles.shareButtonDisabled]}
          onPress={handleShare}
          disabled={status !== 'ready'}
        >
          <Ionicons name="share-social" size={20} color="#FFFFFF" />
          <Text style={styles.shareButtonText}>Paylas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  videoContainer: { padding: 16 },
  videoPreview: {
    width: '100%',
    height: VIDEO_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundLayer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  characterContainer: { position: 'absolute', left: 20, top: '30%', alignItems: 'center' },
  characterAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  characterName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  messageBubble: {
    position: 'absolute',
    right: 12,
    top: '20%',
    maxWidth: '55%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
  },
  recipientText: { fontSize: 14, fontWeight: '600', color: '#6366F1', marginBottom: 4 },
  messageText: { fontSize: 14, color: '#1F2937', lineHeight: 20 },
  occasionBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFFFFF',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  occasionIcon: { fontSize: 24 },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: { color: '#FFFFFF', fontSize: 16, marginTop: 12 },
  progressBar: {
    width: '60%',
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: '#6366F1' },
  progressText: { color: '#FFFFFF', fontSize: 14, marginTop: 8 },
  retryButton: { marginTop: 12, paddingHorizontal: 20, paddingVertical: 8, backgroundColor: '#6366F1', borderRadius: 8 },
  retryButtonText: { color: '#FFFFFF', fontWeight: '500' },
  playButton: {
    position: 'absolute',
    alignSelf: 'center',
    top: '40%',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(99,102,241,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryContainer: { margin: 16, padding: 12, backgroundColor: '#FFFFFF', borderRadius: 12 },
  summaryTitle: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginBottom: 12 },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  summaryLabel: { fontSize: 14, color: '#6B7280' },
  summaryValue: { flexDirection: 'row', alignItems: 'center' },
  summaryIcon: { fontSize: 16, marginRight: 4 },
  summaryText: { fontSize: 14, fontWeight: '500', color: '#1F2937' },
  bottomBar: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  editButtonText: { color: '#6366F1', fontSize: 16, fontWeight: '600', marginLeft: 8 },
  shareButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#6366F1',
  },
  shareButtonDisabled: { backgroundColor: '#D1D5DB' },
  shareButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600', marginLeft: 8 },
});

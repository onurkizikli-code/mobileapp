import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput,
  Alert, ActivityIndicator, Image, Linking, Dimensions, Modal, FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

// D-ID API Key
const DID_API_KEY = 'b251cmtpemlrbGlAZ21haWwuY29t:5QVwitwnEyMsvNT8zbOxJ';

// ==================== KARAKTERLER (20+ farklı etnik köken) ====================
const PRESENTERS = [
  // Türk
  { id: 'p1', name: 'Ayşe', gender: 'female', ethnicity: 'Türk', image: 'https://create-images-results.d-id.com/DefaultPresenters/Aria_f/thumbnail.jpeg' },
  { id: 'p2', name: 'Mehmet', gender: 'male', ethnicity: 'Türk', image: 'https://create-images-results.d-id.com/DefaultPresenters/Alex_m/thumbnail.jpeg' },
  // Amerikan
  { id: 'p3', name: 'Emma', gender: 'female', ethnicity: 'Amerikan', image: 'https://create-images-results.d-id.com/DefaultPresenters/Emma_f/thumbnail.jpeg' },
  { id: 'p4', name: 'Jack', gender: 'male', ethnicity: 'Amerikan', image: 'https://create-images-results.d-id.com/DefaultPresenters/Jack_m/thumbnail.jpeg' },
  // İngiliz
  { id: 'p5', name: 'Sofia', gender: 'female', ethnicity: 'İngiliz', image: 'https://create-images-results.d-id.com/DefaultPresenters/Sofia_f/thumbnail.jpeg' },
  { id: 'p6', name: 'Will', gender: 'male', ethnicity: 'İngiliz', image: 'https://create-images-results.d-id.com/DefaultPresenters/Will_m/thumbnail.jpeg' },
  // Arap
  { id: 'p7', name: 'Fatima', gender: 'female', ethnicity: 'Arap', image: 'https://create-images-results.d-id.com/DefaultPresenters/Aria_f/thumbnail.jpeg' },
  { id: 'p8', name: 'Ahmed', gender: 'male', ethnicity: 'Arap', image: 'https://create-images-results.d-id.com/DefaultPresenters/Alex_m/thumbnail.jpeg' },
  // Hint
  { id: 'p9', name: 'Priya', gender: 'female', ethnicity: 'Hint', image: 'https://create-images-results.d-id.com/DefaultPresenters/Emma_f/thumbnail.jpeg' },
  { id: 'p10', name: 'Raj', gender: 'male', ethnicity: 'Hint', image: 'https://create-images-results.d-id.com/DefaultPresenters/Jack_m/thumbnail.jpeg' },
  // Çinli
  { id: 'p11', name: 'Li Wei', gender: 'female', ethnicity: 'Çinli', image: 'https://create-images-results.d-id.com/DefaultPresenters/Sofia_f/thumbnail.jpeg' },
  { id: 'p12', name: 'Chen', gender: 'male', ethnicity: 'Çinli', image: 'https://create-images-results.d-id.com/DefaultPresenters/Will_m/thumbnail.jpeg' },
  // Afrika
  { id: 'p13', name: 'Amara', gender: 'female', ethnicity: 'Afrikalı', image: 'https://create-images-results.d-id.com/DefaultPresenters/Aria_f/thumbnail.jpeg' },
  { id: 'p14', name: 'Kwame', gender: 'male', ethnicity: 'Afrikalı', image: 'https://create-images-results.d-id.com/DefaultPresenters/Alex_m/thumbnail.jpeg' },
  // Latin
  { id: 'p15', name: 'Isabella', gender: 'female', ethnicity: 'Latin', image: 'https://create-images-results.d-id.com/DefaultPresenters/Emma_f/thumbnail.jpeg' },
  { id: 'p16', name: 'Carlos', gender: 'male', ethnicity: 'Latin', image: 'https://create-images-results.d-id.com/DefaultPresenters/Jack_m/thumbnail.jpeg' },
];

// ==================== ÖZEL GÜNLER ====================
const OCCASIONS = [
  { id: 'birthday', name: 'Doğum Günü', icon: '🎂', color: '#EC4899', gradient: ['#EC4899', '#F472B6'] },
  { id: 'anniversary', name: 'Yıldönümü', icon: '💒', color: '#F59E0B', gradient: ['#F59E0B', '#FBBF24'] },
  { id: 'valentines', name: 'Sevgililer Günü', icon: '❤️', color: '#EF4444', gradient: ['#EF4444', '#F87171'] },
  { id: 'ramadan', name: 'Ramazan Bayramı', icon: '🌙', color: '#059669', gradient: ['#059669', '#10B981'] },
  { id: 'eid', name: 'Kurban Bayramı', icon: '🐑', color: '#0891B2', gradient: ['#0891B2', '#22D3EE'] },
  { id: 'christmas', name: 'Yılbaşı & Noel', icon: '🎄', color: '#DC2626', gradient: ['#DC2626', '#EF4444'] },
  { id: 'new_year', name: 'Yeni Yıl', icon: '🎊', color: '#8B5CF6', gradient: ['#8B5CF6', '#A78BFA'] },
  { id: 'mothers', name: 'Anneler Günü', icon: '👩', color: '#EC4899', gradient: ['#DB2777', '#EC4899'] },
  { id: 'fathers', name: 'Babalar Günü', icon: '👨', color: '#3B82F6', gradient: ['#2563EB', '#3B82F6'] },
  { id: 'graduation', name: 'Mezuniyet', icon: '🎓', color: '#6366F1', gradient: ['#4F46E5', '#6366F1'] },
  { id: 'wedding', name: 'Düğün', icon: '💍', color: '#F472B6', gradient: ['#EC4899', '#F472B6'] },
  { id: 'baby', name: 'Bebek Doğumu', icon: '👶', color: '#60A5FA', gradient: ['#3B82F6', '#60A5FA'] },
];

// ==================== SES SEÇENEKLERİ ====================
const VOICES = [
  { id: 'tr-female', name: 'Türkçe Kadın', flag: '🇹🇷', voice_id: 'tr-TR-EmelNeural' },
  { id: 'tr-male', name: 'Türkçe Erkek', flag: '🇹🇷', voice_id: 'tr-TR-AhmetNeural' },
  { id: 'en-female', name: 'English Female', flag: '🇬🇧', voice_id: 'en-US-JennyNeural' },
  { id: 'en-male', name: 'English Male', flag: '🇬🇧', voice_id: 'en-US-GuyNeural' },
  { id: 'ar-female', name: 'العربية أنثى', flag: '🇸🇦', voice_id: 'ar-SA-ZariyahNeural' },
  { id: 'ar-male', name: 'العربية ذكر', flag: '🇸🇦', voice_id: 'ar-SA-HamedNeural' },
  { id: 'de-female', name: 'Deutsch Frau', flag: '🇩🇪', voice_id: 'de-DE-KatjaNeural' },
  { id: 'fr-female', name: 'Français Femme', flag: '🇫🇷', voice_id: 'fr-FR-DeniseNeural' },
];

// ==================== ARKA PLANLAR ====================
const BACKGROUNDS = [
  { id: 'bg1', name: 'Gradient Mor', type: 'gradient', colors: ['#7C3AED', '#EC4899'], icon: '💜' },
  { id: 'bg2', name: 'Gradient Mavi', type: 'gradient', colors: ['#3B82F6', '#06B6D4'], icon: '💙' },
  { id: 'bg3', name: 'Gradient Yeşil', type: 'gradient', colors: ['#10B981', '#34D399'], icon: '💚' },
  { id: 'bg4', name: 'Gradient Turuncu', type: 'gradient', colors: ['#F59E0B', '#EF4444'], icon: '🧡' },
  { id: 'bg5', name: 'Doğa - Orman', type: 'image', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800', icon: '🌲' },
  { id: 'bg6', name: 'Doğa - Sahil', type: 'image', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', icon: '🏖️' },
  { id: 'bg7', name: 'Şehir - Gece', type: 'image', url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800', icon: '🌃' },
  { id: 'bg8', name: 'Parti', type: 'image', url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800', icon: '🎉' },
];

export default function App() {
  // ==================== STATE ====================
  const [screen, setScreen] = useState('home');
  const [mode, setMode] = useState('single'); // 'single' veya 'multi'
  const [occasion, setOccasion] = useState(null);
  const [selectedPresenters, setSelectedPresenters] = useState([]);
  const [voice, setVoice] = useState(VOICES[0]);
  const [background, setBackground] = useState(BACKGROUNDS[0]);
  const [recipientName, setRecipientName] = useState('');
  const [messages, setMessages] = useState([{ presenterId: null, text: '' }]);
  const [customPhoto, setCustomPhoto] = useState(null);
  const [useCustomPhoto, setUseCustomPhoto] = useState(false);

  // Video generation
  const [videoUrl, setVideoUrl] = useState(null);
  const [generatedVideos, setGeneratedVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [currentGenerating, setCurrentGenerating] = useState(0);

  // Video history
  const [videoHistory, setVideoHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Filter
  const [ethnicityFilter, setEthnicityFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');

  // ==================== VIDEO GEÇMİŞİ YÜKLE ====================
  useEffect(() => {
    loadVideoHistory();
  }, []);

  const loadVideoHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('videoHistory');
      if (history) {
        setVideoHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log('History load error:', e);
    }
  };

  const saveVideoToHistory = async (video) => {
    try {
      const newHistory = [video, ...videoHistory].slice(0, 20);
      setVideoHistory(newHistory);
      await AsyncStorage.setItem('videoHistory', JSON.stringify(newHistory));
    } catch (e) {
      console.log('History save error:', e);
    }
  };

  // ==================== FOTOĞRAF SEÇ ====================
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('İzin Gerekli', 'Galeri erişimi için izin verin');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setCustomPhoto(result.assets[0].uri);
      setUseCustomPhoto(true);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('İzin Gerekli', 'Kamera erişimi için izin verin');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setCustomPhoto(result.assets[0].uri);
      setUseCustomPhoto(true);
    }
  };

  // ==================== KARAKTER FİLTRELE ====================
  const getFilteredPresenters = () => {
    return PRESENTERS.filter(p => {
      const ethnicityMatch = ethnicityFilter === 'all' || p.ethnicity === ethnicityFilter;
      const genderMatch = genderFilter === 'all' || p.gender === genderFilter;
      return ethnicityMatch && genderMatch;
    });
  };

  const ethnicities = ['all', ...new Set(PRESENTERS.map(p => p.ethnicity))];

  // ==================== VİDEO OLUŞTUR ====================
  const createVideo = async () => {
    if (mode === 'single') {
      if (selectedPresenters.length === 0 && !useCustomPhoto) {
        Alert.alert('Hata', 'Karakter seçin veya fotoğraf yükleyin');
        return;
      }
      if (!messages[0].text) {
        Alert.alert('Hata', 'Mesaj yazın');
        return;
      }
      await createSingleVideo();
    } else {
      if (selectedPresenters.length < 2) {
        Alert.alert('Hata', 'En az 2 karakter seçin');
        return;
      }
      await createMultiVideo();
    }
  };

  const createSingleVideo = async () => {
    setLoading(true);
    setProgress(10);
    setStatusText('Video hazırlanıyor...');
    setScreen('generating');

    try {
      const sourceUrl = useCustomPhoto && customPhoto
        ? customPhoto
        : selectedPresenters[0]?.image;

      const fullMessage = recipientName
        ? `Sevgili ${recipientName}, ${messages[0].text}`
        : messages[0].text;

      setProgress(25);
      setStatusText('AI işleniyor...');

      const createResponse = await fetch('https://api.d-id.com/talks', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${DID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source_url: sourceUrl,
          script: {
            type: 'text',
            input: fullMessage,
            provider: { type: 'microsoft', voice_id: voice.voice_id }
          },
          config: { fluent: true, pad_audio: 0.5 }
        })
      });

      const createData = await createResponse.json();

      if (createData.id) {
        setProgress(40);
        setStatusText('Video render ediliyor...');
        await checkVideoStatus(createData.id, true);
      } else {
        throw new Error(createData.message || 'Video oluşturulamadı');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Hata', error.message);
      setScreen('preview');
    }
  };

  const createMultiVideo = async () => {
    setLoading(true);
    setProgress(5);
    setStatusText('Çoklu video hazırlanıyor...');
    setScreen('generating');
    setGeneratedVideos([]);

    const videos = [];
    const totalPresenters = selectedPresenters.length;

    for (let i = 0; i < totalPresenters; i++) {
      setCurrentGenerating(i + 1);
      setStatusText(`Video ${i + 1}/${totalPresenters} oluşturuluyor...`);
      setProgress(Math.floor((i / totalPresenters) * 80) + 10);

      try {
        const presenter = selectedPresenters[i];
        const messageObj = messages.find(m => m.presenterId === presenter.id) || messages[i];
        const messageText = messageObj?.text || `Merhaba, ben ${presenter.name}!`;

        const createResponse = await fetch('https://api.d-id.com/talks', {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${DID_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            source_url: presenter.image,
            script: {
              type: 'text',
              input: messageText,
              provider: { type: 'microsoft', voice_id: voice.voice_id }
            },
            config: { fluent: true, pad_audio: 0.5 }
          })
        });

        const createData = await createResponse.json();

        if (createData.id) {
          const videoUrl = await waitForVideo(createData.id);
          if (videoUrl) {
            videos.push({
              presenter,
              url: videoUrl,
              message: messageText
            });
          }
        }
      } catch (error) {
        console.log(`Video ${i + 1} error:`, error);
      }
    }

    setGeneratedVideos(videos);
    setProgress(100);
    setLoading(false);

    if (videos.length > 0) {
      // Save to history
      await saveVideoToHistory({
        id: Date.now().toString(),
        type: 'multi',
        videos,
        occasion,
        date: new Date().toLocaleDateString('tr-TR'),
        timestamp: Date.now()
      });
      setScreen('share');
    } else {
      Alert.alert('Hata', 'Videolar oluşturulamadı');
      setScreen('preview');
    }
  };

  const waitForVideo = (talkId) => {
    return new Promise((resolve) => {
      let attempts = 0;
      const maxAttempts = 30;

      const checkInterval = setInterval(async () => {
        attempts++;

        try {
          const response = await fetch(`https://api.d-id.com/talks/${talkId}`, {
            headers: { 'Authorization': `Basic ${DID_API_KEY}` }
          });

          const data = await response.json();

          if (data.status === 'done') {
            clearInterval(checkInterval);
            resolve(data.result_url);
          } else if (data.status === 'error' || data.status === 'rejected' || attempts >= maxAttempts) {
            clearInterval(checkInterval);
            resolve(null);
          }
        } catch (error) {
          clearInterval(checkInterval);
          resolve(null);
        }
      }, 2000);
    });
  };

  const checkVideoStatus = async (talkId, isSingle = true) => {
    let attempts = 0;
    const maxAttempts = 30;

    const checkInterval = setInterval(async () => {
      attempts++;

      try {
        const response = await fetch(`https://api.d-id.com/talks/${talkId}`, {
          headers: { 'Authorization': `Basic ${DID_API_KEY}` }
        });

        const data = await response.json();
        const newProgress = Math.min(40 + (attempts * 2), 95);
        setProgress(newProgress);

        if (data.status === 'done') {
          clearInterval(checkInterval);
          setProgress(100);
          setVideoUrl(data.result_url);

          // Save to history
          await saveVideoToHistory({
            id: talkId,
            type: 'single',
            url: data.result_url,
            presenter: selectedPresenters[0] || { name: 'Özel Fotoğraf', image: customPhoto },
            occasion,
            message: messages[0].text,
            date: new Date().toLocaleDateString('tr-TR'),
            timestamp: Date.now()
          });

          setLoading(false);
          setScreen('share');
        } else if (data.status === 'error' || data.status === 'rejected') {
          clearInterval(checkInterval);
          setLoading(false);
          Alert.alert('Hata', 'Video oluşturma başarısız');
          setScreen('preview');
        } else {
          setStatusText('Render ediliyor...');
        }

        if (attempts >= maxAttempts) {
          clearInterval(checkInterval);
          setLoading(false);
          Alert.alert('Zaman Aşımı', 'Tekrar deneyin');
          setScreen('preview');
        }
      } catch (error) {
        console.log('Error:', error);
      }
    }, 2000);
  };

  // ==================== RESET ====================
  const resetAll = () => {
    setScreen('home');
    setMode('single');
    setOccasion(null);
    setSelectedPresenters([]);
    setVoice(VOICES[0]);
    setBackground(BACKGROUNDS[0]);
    setRecipientName('');
    setMessages([{ presenterId: null, text: '' }]);
    setCustomPhoto(null);
    setUseCustomPhoto(false);
    setVideoUrl(null);
    setGeneratedVideos([]);
    setProgress(0);
    setCurrentGenerating(0);
    setEthnicityFilter('all');
    setGenderFilter('all');
  };

  // ==================== PRESENTER SEÇ ====================
  const togglePresenter = (presenter) => {
    if (mode === 'single') {
      setSelectedPresenters([presenter]);
      setUseCustomPhoto(false);
    } else {
      const isSelected = selectedPresenters.find(p => p.id === presenter.id);
      if (isSelected) {
        setSelectedPresenters(selectedPresenters.filter(p => p.id !== presenter.id));
      } else if (selectedPresenters.length < 3) {
        setSelectedPresenters([...selectedPresenters, presenter]);
        // Add message slot for this presenter
        if (!messages.find(m => m.presenterId === presenter.id)) {
          setMessages([...messages, { presenterId: presenter.id, text: '' }]);
        }
      } else {
        Alert.alert('Limit', 'En fazla 3 karakter seçebilirsiniz');
      }
    }
  };

  // ==================== SCREENS ====================

  // ANA SAYFA
  if (screen === 'home') {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <LinearGradient colors={['#4F46E5', '#7C3AED', '#9333EA']} style={styles.heroHeader}>
            <View style={styles.heroContent}>
              <View style={styles.logoRow}>
                <View style={styles.logoIcon}>
                  <Ionicons name="sparkles" size={24} color="#FFF" />
                </View>
                <Text style={styles.logoText}>CelebVerse</Text>
              </View>
              <Text style={styles.heroTitle}>AI ile Özel{'\n'}Video Mesajlar</Text>
              <Text style={styles.heroSubtitle}>Saniyeler içinde profesyonel videolar</Text>

              <View style={styles.heroButtons}>
                <TouchableOpacity
                  style={styles.heroButton}
                  onPress={() => { setMode('single'); setScreen('occasion'); }}
                >
                  <LinearGradient colors={['#FFF', '#F3F4F6']} style={styles.heroButtonInner}>
                    <Ionicons name="person" size={22} color="#7C3AED" />
                    <Text style={styles.heroButtonText}>Tekli Video</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.heroButton, { marginLeft: 12 }]}
                  onPress={() => { setMode('multi'); setScreen('occasion'); }}
                >
                  <LinearGradient colors={['#FFF', '#F3F4F6']} style={styles.heroButtonInner}>
                    <Ionicons name="people" size={22} color="#7C3AED" />
                    <Text style={styles.heroButtonText}>Çoklu Video</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>

          {/* Stats */}
          <View style={styles.statsBar}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>⚡</Text>
              <Text style={styles.statLabel}>~1 dk</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>🎭</Text>
              <Text style={styles.statLabel}>{PRESENTERS.length} Avatar</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>🌍</Text>
              <Text style={styles.statLabel}>{VOICES.length} Dil</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>📷</Text>
              <Text style={styles.statLabel}>Özel Foto</Text>
            </View>
          </View>

          {/* Video Geçmişi */}
          {videoHistory.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Son Videolarım</Text>
                <TouchableOpacity onPress={() => setShowHistory(true)}>
                  <Text style={styles.seeAll}>Tümünü Gör</Text>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {videoHistory.slice(0, 5).map((video) => (
                  <TouchableOpacity
                    key={video.id}
                    style={styles.historyCard}
                    onPress={() => {
                      if (video.type === 'single') {
                        Linking.openURL(video.url);
                      } else {
                        Alert.alert('Çoklu Video', 'Bu video birden fazla klip içeriyor');
                      }
                    }}
                  >
                    <Image
                      source={{ uri: video.presenter?.image || video.videos?.[0]?.presenter?.image }}
                      style={styles.historyAvatar}
                    />
                    <View style={styles.historyBadge}>
                      <Ionicons name="play" size={12} color="#FFF" />
                    </View>
                    <Text style={styles.historyDate}>{video.date}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Hızlı Başlat */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hızlı Başlat</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {OCCASIONS.slice(0, 6).map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => { setOccasion(item); setMode('single'); setScreen('presenter'); }}
                >
                  <LinearGradient colors={item.gradient} style={styles.quickCard}>
                    <Text style={styles.quickIcon}>{item.icon}</Text>
                    <Text style={styles.quickName}>{item.name}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Tüm Özel Günler */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tüm Özel Günler</Text>
            <View style={styles.occasionGrid}>
              {OCCASIONS.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.occasionCard}
                  onPress={() => { setOccasion(item); setMode('single'); setScreen('presenter'); }}
                >
                  <LinearGradient colors={[item.color + '20', item.color + '10']} style={styles.occasionCardInner}>
                    <Text style={styles.occasionIcon}>{item.icon}</Text>
                    <Text style={[styles.occasionName, { color: item.color }]}>{item.name}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Özellikler */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Özellikler</Text>
            <View style={styles.featureGrid}>
              <View style={styles.featureCard}>
                <View style={[styles.featureIcon, { backgroundColor: '#EEF2FF' }]}>
                  <Ionicons name="people" size={24} color="#6366F1" />
                </View>
                <Text style={styles.featureTitle}>Çoklu Karakter</Text>
                <Text style={styles.featureDesc}>3 kişiye kadar</Text>
              </View>
              <View style={styles.featureCard}>
                <View style={[styles.featureIcon, { backgroundColor: '#FEF3C7' }]}>
                  <Ionicons name="camera" size={24} color="#F59E0B" />
                </View>
                <Text style={styles.featureTitle}>Özel Fotoğraf</Text>
                <Text style={styles.featureDesc}>Kendi yüzün</Text>
              </View>
              <View style={styles.featureCard}>
                <View style={[styles.featureIcon, { backgroundColor: '#DCFCE7' }]}>
                  <Ionicons name="globe" size={24} color="#22C55E" />
                </View>
                <Text style={styles.featureTitle}>8 Dil</Text>
                <Text style={styles.featureDesc}>Türkçe, İngilizce...</Text>
              </View>
              <View style={styles.featureCard}>
                <View style={[styles.featureIcon, { backgroundColor: '#FCE7F3' }]}>
                  <Ionicons name="color-palette" size={24} color="#EC4899" />
                </View>
                <Text style={styles.featureTitle}>Arka Planlar</Text>
                <Text style={styles.featureDesc}>8 seçenek</Text>
              </View>
            </View>
          </View>

          <View style={{ height: 30 }} />
        </ScrollView>

        {/* Video History Modal */}
        <Modal visible={showHistory} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Video Geçmişim</Text>
              <TouchableOpacity onPress={() => setShowHistory(false)}>
                <Ionicons name="close" size={28} color="#1F2937" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={videoHistory}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.historyListItem}
                  onPress={() => {
                    if (item.type === 'single') {
                      Linking.openURL(item.url);
                    } else if (item.videos?.length > 0) {
                      Linking.openURL(item.videos[0].url);
                    }
                  }}
                >
                  <Image
                    source={{ uri: item.presenter?.image || item.videos?.[0]?.presenter?.image }}
                    style={styles.historyListAvatar}
                  />
                  <View style={styles.historyListInfo}>
                    <Text style={styles.historyListTitle}>
                      {item.occasion?.icon} {item.occasion?.name || 'Video'}
                    </Text>
                    <Text style={styles.historyListDate}>{item.date}</Text>
                    {item.type === 'multi' && (
                      <Text style={styles.historyListMulti}>{item.videos?.length} video</Text>
                    )}
                  </View>
                  <Ionicons name="play-circle" size={36} color="#7C3AED" />
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>Henüz video oluşturmadınız</Text>
              }
            />
          </View>
        </Modal>
      </View>
    );
  }

  // ÖZEL GÜN SEÇİMİ
  if (screen === 'occasion') {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#4F46E5', '#7C3AED']} style={styles.headerGradient}>
          <TouchableOpacity onPress={() => setScreen('home')} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Özel Gün Seç</Text>
          <View style={{ width: 40 }} />
        </LinearGradient>

        <ScrollView style={styles.content}>
          <Text style={styles.stepIndicator}>
            {mode === 'multi' ? '👥 Çoklu Mod • ' : '👤 Tekli Mod • '}Adım 1/5
          </Text>

          {OCCASIONS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.listItem, occasion?.id === item.id && styles.selectedItem]}
              onPress={() => setOccasion(item)}
            >
              <Text style={styles.listIcon}>{item.icon}</Text>
              <Text style={styles.listText}>{item.name}</Text>
              {occasion?.id === item.id && <Ionicons name="checkmark-circle" size={24} color="#7C3AED" />}
            </TouchableOpacity>
          ))}

          {occasion && (
            <TouchableOpacity style={styles.continueBtn} onPress={() => setScreen('presenter')}>
              <LinearGradient colors={['#7C3AED', '#9333EA']} style={styles.continueBtnInner}>
                <Text style={styles.continueBtnText}>Karakter Seç</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFF" />
              </LinearGradient>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  }

  // KARAKTER SEÇİMİ
  if (screen === 'presenter') {
    const filteredPresenters = getFilteredPresenters();

    return (
      <View style={styles.container}>
        <LinearGradient colors={['#4F46E5', '#7C3AED']} style={styles.headerGradient}>
          <TouchableOpacity onPress={() => setScreen('occasion')} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {mode === 'multi' ? 'Karakterler Seç (Max 3)' : 'Karakter Seç'}
          </Text>
          <View style={{ width: 40 }} />
        </LinearGradient>

        <ScrollView style={styles.content}>
          <Text style={styles.stepIndicator}>Adım 2/5 • Karakter</Text>

          {/* Özel Fotoğraf */}
          {mode === 'single' && (
            <View style={styles.customPhotoSection}>
              <Text style={styles.subSectionTitle}>📷 Kendi Fotoğrafını Kullan</Text>
              <View style={styles.photoButtons}>
                <TouchableOpacity style={styles.photoBtn} onPress={pickImage}>
                  <Ionicons name="images" size={24} color="#7C3AED" />
                  <Text style={styles.photoBtnText}>Galeri</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.photoBtn} onPress={takePhoto}>
                  <Ionicons name="camera" size={24} color="#7C3AED" />
                  <Text style={styles.photoBtnText}>Kamera</Text>
                </TouchableOpacity>
              </View>
              {customPhoto && (
                <View style={styles.customPhotoPreview}>
                  <Image source={{ uri: customPhoto }} style={styles.customPhotoImg} />
                  <TouchableOpacity
                    style={[styles.usePhotoBtn, useCustomPhoto && styles.usePhotoBtnActive]}
                    onPress={() => {
                      setUseCustomPhoto(!useCustomPhoto);
                      if (!useCustomPhoto) setSelectedPresenters([]);
                    }}
                  >
                    <Text style={[styles.usePhotoBtnText, useCustomPhoto && { color: '#FFF' }]}>
                      {useCustomPhoto ? '✓ Seçildi' : 'Bu Fotoğrafı Kullan'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}

          {/* Filtreler */}
          <View style={styles.filterSection}>
            <Text style={styles.subSectionTitle}>🎭 Hazır Avatarlar</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              <TouchableOpacity
                style={[styles.filterChip, ethnicityFilter === 'all' && styles.filterChipActive]}
                onPress={() => setEthnicityFilter('all')}
              >
                <Text style={[styles.filterChipText, ethnicityFilter === 'all' && styles.filterChipTextActive]}>Tümü</Text>
              </TouchableOpacity>
              {ethnicities.filter(e => e !== 'all').map(eth => (
                <TouchableOpacity
                  key={eth}
                  style={[styles.filterChip, ethnicityFilter === eth && styles.filterChipActive]}
                  onPress={() => setEthnicityFilter(eth)}
                >
                  <Text style={[styles.filterChipText, ethnicityFilter === eth && styles.filterChipTextActive]}>{eth}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.genderFilter}>
              <TouchableOpacity
                style={[styles.genderBtn, genderFilter === 'all' && styles.genderBtnActive]}
                onPress={() => setGenderFilter('all')}
              >
                <Text style={styles.genderBtnText}>Tümü</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.genderBtn, genderFilter === 'female' && styles.genderBtnActive]}
                onPress={() => setGenderFilter('female')}
              >
                <Text style={styles.genderBtnText}>👩 Kadın</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.genderBtn, genderFilter === 'male' && styles.genderBtnActive]}
                onPress={() => setGenderFilter('male')}
              >
                <Text style={styles.genderBtnText}>👨 Erkek</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Presenter Grid */}
          <View style={styles.presenterGrid}>
            {filteredPresenters.map((item) => {
              const isSelected = selectedPresenters.find(p => p.id === item.id);
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.presenterCard, isSelected && styles.presenterSelected]}
                  onPress={() => togglePresenter(item)}
                >
                  <Image source={{ uri: item.image }} style={styles.presenterImg} />
                  <Text style={styles.presenterName}>{item.name}</Text>
                  <Text style={styles.presenterEthnicity}>{item.ethnicity}</Text>
                  {isSelected && (
                    <View style={styles.selectedBadge}>
                      <Text style={styles.selectedBadgeText}>
                        {mode === 'multi' ? selectedPresenters.findIndex(p => p.id === item.id) + 1 : '✓'}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {(selectedPresenters.length > 0 || useCustomPhoto) && (
            <TouchableOpacity style={styles.continueBtn} onPress={() => setScreen('voice')}>
              <LinearGradient colors={['#7C3AED', '#9333EA']} style={styles.continueBtnInner}>
                <Text style={styles.continueBtnText}>
                  {mode === 'multi' ? `${selectedPresenters.length} Karakter Seçildi` : 'Devam Et'}
                </Text>
                <Ionicons name="arrow-forward" size={20} color="#FFF" />
              </LinearGradient>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  }

  // SES SEÇİMİ
  if (screen === 'voice') {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#4F46E5', '#7C3AED']} style={styles.headerGradient}>
          <TouchableOpacity onPress={() => setScreen('presenter')} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ses Seç</Text>
          <View style={{ width: 40 }} />
        </LinearGradient>

        <ScrollView style={styles.content}>
          <Text style={styles.stepIndicator}>Adım 3/5 • Ses</Text>

          {VOICES.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.voiceCard, voice?.id === item.id && styles.voiceSelected]}
              onPress={() => setVoice(item)}
            >
              <Text style={styles.voiceFlag}>{item.flag}</Text>
              <Text style={styles.voiceName}>{item.name}</Text>
              {voice?.id === item.id && <Ionicons name="checkmark-circle" size={24} color="#7C3AED" />}
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.continueBtn} onPress={() => setScreen('background')}>
            <LinearGradient colors={['#7C3AED', '#9333EA']} style={styles.continueBtnInner}>
              <Text style={styles.continueBtnText}>Arka Plan Seç</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFF" />
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // ARKA PLAN SEÇİMİ
  if (screen === 'background') {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#4F46E5', '#7C3AED']} style={styles.headerGradient}>
          <TouchableOpacity onPress={() => setScreen('voice')} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Arka Plan Seç</Text>
          <View style={{ width: 40 }} />
        </LinearGradient>

        <ScrollView style={styles.content}>
          <Text style={styles.stepIndicator}>Adım 4/5 • Arka Plan</Text>

          <View style={styles.bgGrid}>
            {BACKGROUNDS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.bgCard, background?.id === item.id && styles.bgSelected]}
                onPress={() => setBackground(item)}
              >
                {item.type === 'gradient' ? (
                  <LinearGradient colors={item.colors} style={styles.bgPreview}>
                    <Text style={styles.bgIcon}>{item.icon}</Text>
                  </LinearGradient>
                ) : (
                  <Image source={{ uri: item.url }} style={styles.bgPreview}>
                    <View style={styles.bgOverlay}>
                      <Text style={styles.bgIcon}>{item.icon}</Text>
                    </View>
                  </Image>
                )}
                <Text style={styles.bgName}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.continueBtn} onPress={() => setScreen('message')}>
            <LinearGradient colors={['#7C3AED', '#9333EA']} style={styles.continueBtnInner}>
              <Text style={styles.continueBtnText}>Mesaj Yaz</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFF" />
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // MESAJ YAZMA
  if (screen === 'message') {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#4F46E5', '#7C3AED']} style={styles.headerGradient}>
          <TouchableOpacity onPress={() => setScreen('background')} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mesaj Yaz</Text>
          <View style={{ width: 40 }} />
        </LinearGradient>

        <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.stepIndicator}>Adım 5/5 • Mesaj</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Kime gönderiyorsun?</Text>
            <TextInput
              style={styles.textInput}
              placeholder="İsim yazın (opsiyonel)"
              value={recipientName}
              onChangeText={setRecipientName}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {mode === 'single' ? (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Mesajın</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="AI bu mesajı söyleyecek..."
                value={messages[0].text}
                onChangeText={(text) => setMessages([{ presenterId: null, text }])}
                multiline
                numberOfLines={5}
                maxLength={500}
                placeholderTextColor="#9CA3AF"
              />
              <Text style={styles.charCounter}>{messages[0].text.length}/500</Text>
            </View>
          ) : (
            // Multi mode - her karakter için ayrı mesaj
            selectedPresenters.map((presenter, index) => (
              <View key={presenter.id} style={styles.inputGroup}>
                <View style={styles.multiMessageHeader}>
                  <Image source={{ uri: presenter.image }} style={styles.multiMessageAvatar} />
                  <Text style={styles.inputLabel}>{presenter.name}'in mesajı</Text>
                </View>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  placeholder={`${presenter.name} ne söylesin?`}
                  value={messages.find(m => m.presenterId === presenter.id)?.text || ''}
                  onChangeText={(text) => {
                    const newMessages = messages.map(m =>
                      m.presenterId === presenter.id ? { ...m, text } : m
                    );
                    if (!newMessages.find(m => m.presenterId === presenter.id)) {
                      newMessages.push({ presenterId: presenter.id, text });
                    }
                    setMessages(newMessages);
                  }}
                  multiline
                  numberOfLines={3}
                  maxLength={300}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            ))
          )}

          {((mode === 'single' && messages[0].text.length > 10) ||
            (mode === 'multi' && selectedPresenters.every(p =>
              messages.find(m => m.presenterId === p.id)?.text?.length > 5
            ))) && (
            <TouchableOpacity style={styles.continueBtn} onPress={() => setScreen('preview')}>
              <LinearGradient colors={['#7C3AED', '#9333EA']} style={styles.continueBtnInner}>
                <Text style={styles.continueBtnText}>Önizle</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFF" />
              </LinearGradient>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  }

  // ÖNİZLEME
  if (screen === 'preview') {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#4F46E5', '#7C3AED']} style={styles.headerGradient}>
          <TouchableOpacity onPress={() => setScreen('message')} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Önizleme</Text>
          <View style={{ width: 40 }} />
        </LinearGradient>

        <ScrollView style={styles.content}>
          <Text style={styles.stepIndicator}>Son Adım • Onayla</Text>

          {/* Preview Card */}
          <View style={styles.previewCard}>
            {mode === 'single' ? (
              <Image
                source={{ uri: useCustomPhoto ? customPhoto : selectedPresenters[0]?.image }}
                style={styles.previewAvatar}
              />
            ) : (
              <View style={styles.multiAvatarRow}>
                {selectedPresenters.map((p, i) => (
                  <Image key={p.id} source={{ uri: p.image }} style={[styles.multiAvatar, { marginLeft: i > 0 ? -15 : 0 }]} />
                ))}
              </View>
            )}
            <View style={styles.previewDetails}>
              <Text style={styles.previewName}>
                {mode === 'single'
                  ? (useCustomPhoto ? 'Özel Fotoğraf' : selectedPresenters[0]?.name)
                  : selectedPresenters.map(p => p.name).join(', ')
                }
              </Text>
              <Text style={styles.previewVoice}>{voice?.flag} {voice?.name}</Text>
              <Text style={styles.previewOccasion}>{occasion?.icon} {occasion?.name}</Text>
              <Text style={styles.previewBg}>{background?.icon} {background?.name}</Text>
            </View>
          </View>

          {/* Message Preview */}
          <View style={styles.messageBubble}>
            {recipientName && <Text style={styles.bubbleTo}>Sevgili {recipientName},</Text>}
            <Text style={styles.bubbleText}>
              {mode === 'single'
                ? messages[0].text
                : selectedPresenters.map(p => {
                    const msg = messages.find(m => m.presenterId === p.id);
                    return `${p.name}: "${msg?.text || ''}"`;
                  }).join('\n\n')
              }
            </Text>
          </View>

          <TouchableOpacity style={styles.createBtn} onPress={createVideo}>
            <LinearGradient colors={['#22C55E', '#16A34A']} style={styles.createBtnInner}>
              <Ionicons name="videocam" size={24} color="#FFF" />
              <Text style={styles.createBtnText}>
                {mode === 'multi' ? `${selectedPresenters.length} Video Oluştur` : 'Video Oluştur'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.timeHint}>
            ⏱️ {mode === 'multi' ? `Yaklaşık ${selectedPresenters.length * 1} dakika` : 'Yaklaşık 1 dakika'}
          </Text>
        </ScrollView>
      </View>
    );
  }

  // VIDEO OLUŞTURULUYOR
  if (screen === 'generating') {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#4F46E5', '#7C3AED', '#9333EA']} style={styles.generatingBg}>
          <View style={styles.generatingContent}>
            <View style={styles.loaderRing}>
              <ActivityIndicator size="large" color="#FFF" />
            </View>
            <Text style={styles.generatingTitle}>
              {mode === 'multi' ? `Video ${currentGenerating}/${selectedPresenters.length}` : 'Video Oluşturuluyor'}
            </Text>
            <Text style={styles.generatingStatus}>{statusText}</Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${progress}%` }]} />
              </View>
              <Text style={styles.progressText}>{progress}%</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }

  // PAYLAŞIM
  if (screen === 'share') {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#22C55E', '#16A34A']} style={styles.shareBg}>
          <View style={styles.shareContent}>
            <View style={styles.successCircle}>
              <Ionicons name="checkmark" size={50} color="#22C55E" />
            </View>
            <Text style={styles.shareTitle}>
              {mode === 'multi' ? `${generatedVideos.length} Video Hazır!` : 'Video Hazır!'}
            </Text>

            {mode === 'single' && videoUrl && (
              <>
                <TouchableOpacity style={styles.watchButton} onPress={() => Linking.openURL(videoUrl)}>
                  <Ionicons name="play" size={24} color="#7C3AED" />
                  <Text style={styles.watchButtonText}>Videoyu İzle</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.whatsappButton}
                  onPress={() => Linking.openURL(`whatsapp://send?text=Sana özel bir video! ${videoUrl}`)}
                >
                  <Ionicons name="logo-whatsapp" size={24} color="#FFF" />
                  <Text style={styles.whatsappButtonText}>WhatsApp ile Gönder</Text>
                </TouchableOpacity>
              </>
            )}

            {mode === 'multi' && generatedVideos.length > 0 && (
              <View style={styles.multiVideoList}>
                {generatedVideos.map((video, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.multiVideoItem}
                    onPress={() => Linking.openURL(video.url)}
                  >
                    <Image source={{ uri: video.presenter.image }} style={styles.multiVideoAvatar} />
                    <Text style={styles.multiVideoName}>{video.presenter.name}</Text>
                    <Ionicons name="play-circle" size={28} color="#7C3AED" />
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <TouchableOpacity style={styles.newVideoBtn} onPress={resetAll}>
              <Ionicons name="add" size={20} color="#FFF" />
              <Text style={styles.newVideoBtnText}>Yeni Video</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }

  return null;
}

// ==================== STYLES ====================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },

  // Hero
  heroHeader: { paddingTop: 60, paddingBottom: 40, paddingHorizontal: 24, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  heroContent: { zIndex: 2 },
  logoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  logoIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  logoText: { fontSize: 22, fontWeight: 'bold', color: '#FFF', marginLeft: 10 },
  heroTitle: { fontSize: 32, fontWeight: 'bold', color: '#FFF', lineHeight: 40 },
  heroSubtitle: { fontSize: 15, color: 'rgba(255,255,255,0.8)', marginTop: 8 },
  heroButtons: { flexDirection: 'row', marginTop: 24 },
  heroButton: { borderRadius: 16, overflow: 'hidden' },
  heroButtonInner: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 16 },
  heroButtonText: { fontSize: 15, fontWeight: '600', color: '#7C3AED', marginLeft: 8 },

  // Stats
  statsBar: { flexDirection: 'row', backgroundColor: '#FFF', marginHorizontal: 20, marginTop: -20, borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  statItem: { flex: 1, alignItems: 'center' },
  statNumber: { fontSize: 20 },
  statLabel: { fontSize: 11, color: '#6B7280', marginTop: 4 },
  statDivider: { width: 1, backgroundColor: '#E5E7EB' },

  // Sections
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  seeAll: { fontSize: 14, color: '#7C3AED', fontWeight: '600' },
  subSectionTitle: { fontSize: 15, fontWeight: '600', color: '#374151', marginBottom: 12 },

  // History
  historyCard: { width: 80, marginRight: 12, alignItems: 'center' },
  historyAvatar: { width: 70, height: 70, borderRadius: 35, borderWidth: 3, borderColor: '#7C3AED' },
  historyBadge: { position: 'absolute', top: 50, right: 5, backgroundColor: '#7C3AED', width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  historyDate: { fontSize: 10, color: '#6B7280', marginTop: 6 },

  // Quick Cards
  quickCard: { width: 110, height: 90, borderRadius: 16, marginRight: 12, padding: 14, justifyContent: 'flex-end' },
  quickIcon: { fontSize: 24 },
  quickName: { fontSize: 12, fontWeight: '600', color: '#FFF', marginTop: 6 },

  // Occasion Grid
  occasionGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  occasionCard: { width: '48%', marginBottom: 12, borderRadius: 16, overflow: 'hidden' },
  occasionCardInner: { padding: 16, alignItems: 'center' },
  occasionIcon: { fontSize: 28 },
  occasionName: { fontSize: 12, fontWeight: '600', marginTop: 6 },

  // Features
  featureGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  featureCard: { width: '48%', backgroundColor: '#FFF', borderRadius: 16, padding: 16, alignItems: 'center', marginBottom: 12 },
  featureIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  featureTitle: { fontSize: 13, fontWeight: '600', color: '#1F2937' },
  featureDesc: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },

  // Header
  headerGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 54, paddingBottom: 18, paddingHorizontal: 20 },
  backBtn: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#FFF' },

  // Content
  content: { flex: 1, padding: 20 },
  stepIndicator: { fontSize: 13, color: '#9CA3AF', marginBottom: 20 },

  // List Items
  listItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 18, borderRadius: 14, marginBottom: 10, borderWidth: 2, borderColor: 'transparent' },
  selectedItem: { borderColor: '#7C3AED' },
  listIcon: { fontSize: 26, marginRight: 14 },
  listText: { flex: 1, fontSize: 16, color: '#1F2937', fontWeight: '500' },

  // Custom Photo
  customPhotoSection: { backgroundColor: '#FFF', padding: 16, borderRadius: 16, marginBottom: 20 },
  photoButtons: { flexDirection: 'row', gap: 12 },
  photoBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 12, borderWidth: 2, borderColor: '#7C3AED', borderStyle: 'dashed' },
  photoBtnText: { fontSize: 14, fontWeight: '600', color: '#7C3AED', marginLeft: 8 },
  customPhotoPreview: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  customPhotoImg: { width: 60, height: 60, borderRadius: 30 },
  usePhotoBtn: { flex: 1, marginLeft: 12, padding: 12, borderRadius: 10, borderWidth: 2, borderColor: '#7C3AED', alignItems: 'center' },
  usePhotoBtnActive: { backgroundColor: '#7C3AED' },
  usePhotoBtnText: { fontSize: 14, fontWeight: '600', color: '#7C3AED' },

  // Filters
  filterSection: { marginBottom: 16 },
  filterScroll: { marginBottom: 12 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F3F4F6', marginRight: 8 },
  filterChipActive: { backgroundColor: '#7C3AED' },
  filterChipText: { fontSize: 13, color: '#6B7280', fontWeight: '500' },
  filterChipTextActive: { color: '#FFF' },
  genderFilter: { flexDirection: 'row', gap: 8 },
  genderBtn: { flex: 1, padding: 10, borderRadius: 10, backgroundColor: '#F3F4F6', alignItems: 'center' },
  genderBtnActive: { backgroundColor: '#EEF2FF' },
  genderBtnText: { fontSize: 13, color: '#374151', fontWeight: '500' },

  // Presenter Grid
  presenterGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  presenterCard: { width: '31%', backgroundColor: '#FFF', borderRadius: 16, padding: 10, alignItems: 'center', marginBottom: 12, borderWidth: 3, borderColor: 'transparent' },
  presenterSelected: { borderColor: '#7C3AED' },
  presenterImg: { width: 70, height: 70, borderRadius: 35 },
  presenterName: { fontSize: 12, fontWeight: '600', color: '#1F2937', marginTop: 8 },
  presenterEthnicity: { fontSize: 10, color: '#9CA3AF', marginTop: 2 },
  selectedBadge: { position: 'absolute', top: 6, right: 6, backgroundColor: '#7C3AED', width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  selectedBadgeText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },

  // Voice
  voiceCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 18, borderRadius: 14, marginBottom: 10, borderWidth: 2, borderColor: 'transparent' },
  voiceSelected: { borderColor: '#7C3AED' },
  voiceFlag: { fontSize: 28, marginRight: 14 },
  voiceName: { flex: 1, fontSize: 16, fontWeight: '500', color: '#1F2937' },

  // Background
  bgGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  bgCard: { width: '48%', marginBottom: 12, borderRadius: 16, overflow: 'hidden', borderWidth: 3, borderColor: 'transparent' },
  bgSelected: { borderColor: '#7C3AED' },
  bgPreview: { height: 100, alignItems: 'center', justifyContent: 'center' },
  bgOverlay: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)', width: '100%' },
  bgIcon: { fontSize: 32 },
  bgName: { fontSize: 12, fontWeight: '600', color: '#374151', textAlign: 'center', paddingVertical: 10, backgroundColor: '#FFF' },

  // Input
  inputGroup: { marginBottom: 20 },
  inputLabel: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 },
  textInput: { backgroundColor: '#FFF', borderRadius: 14, padding: 16, fontSize: 16, color: '#1F2937' },
  textArea: { height: 120, textAlignVertical: 'top' },
  charCounter: { fontSize: 12, color: '#9CA3AF', textAlign: 'right', marginTop: 6 },
  multiMessageHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  multiMessageAvatar: { width: 32, height: 32, borderRadius: 16, marginRight: 10 },

  // Continue Button
  continueBtn: { marginTop: 24, borderRadius: 16, overflow: 'hidden' },
  continueBtnInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18 },
  continueBtnText: { fontSize: 17, fontWeight: '600', color: '#FFF', marginRight: 8 },

  // Preview
  previewCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 20, borderRadius: 20 },
  previewAvatar: { width: 80, height: 80, borderRadius: 40 },
  multiAvatarRow: { flexDirection: 'row' },
  multiAvatar: { width: 50, height: 50, borderRadius: 25, borderWidth: 3, borderColor: '#FFF' },
  previewDetails: { marginLeft: 16, flex: 1 },
  previewName: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  previewVoice: { fontSize: 13, color: '#6B7280', marginTop: 4 },
  previewOccasion: { fontSize: 13, color: '#7C3AED', marginTop: 2 },
  previewBg: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  messageBubble: { backgroundColor: '#FFF', padding: 20, borderRadius: 20, marginTop: 16 },
  bubbleTo: { fontSize: 15, fontWeight: '600', color: '#7C3AED', marginBottom: 8 },
  bubbleText: { fontSize: 15, color: '#374151', lineHeight: 24 },
  createBtn: { marginTop: 24, borderRadius: 16, overflow: 'hidden' },
  createBtnInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18 },
  createBtnText: { fontSize: 18, fontWeight: 'bold', color: '#FFF', marginLeft: 10 },
  timeHint: { textAlign: 'center', color: '#9CA3AF', marginTop: 14, fontSize: 13 },

  // Generating
  generatingBg: { flex: 1 },
  generatingContent: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
  loaderRing: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  generatingTitle: { fontSize: 26, fontWeight: 'bold', color: '#FFF', marginTop: 30 },
  generatingStatus: { fontSize: 15, color: 'rgba(255,255,255,0.8)', marginTop: 10 },
  progressContainer: { width: '80%', marginTop: 40 },
  progressTrack: { height: 8, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#FFF', borderRadius: 4 },
  progressText: { fontSize: 18, fontWeight: 'bold', color: '#FFF', textAlign: 'center', marginTop: 12 },

  // Share
  shareBg: { flex: 1 },
  shareContent: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
  successCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' },
  shareTitle: { fontSize: 28, fontWeight: 'bold', color: '#FFF', marginTop: 24 },
  watchButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 16, marginTop: 32 },
  watchButtonText: { fontSize: 17, fontWeight: '600', color: '#7C3AED', marginLeft: 10 },
  whatsappButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#25D366', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 16, marginTop: 14 },
  whatsappButtonText: { fontSize: 16, fontWeight: '600', color: '#FFF', marginLeft: 10 },
  multiVideoList: { width: '100%', marginTop: 24 },
  multiVideoItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', padding: 14, borderRadius: 14, marginBottom: 10 },
  multiVideoAvatar: { width: 50, height: 50, borderRadius: 25 },
  multiVideoName: { flex: 1, fontSize: 16, fontWeight: '600', color: '#FFF', marginLeft: 14 },
  newVideoBtn: { flexDirection: 'row', alignItems: 'center', marginTop: 30, paddingVertical: 14, paddingHorizontal: 28, borderWidth: 2, borderColor: '#FFF', borderRadius: 14 },
  newVideoBtnText: { fontSize: 15, fontWeight: '600', color: '#FFF', marginLeft: 8 },

  // Modal
  modalContainer: { flex: 1, backgroundColor: '#F9FAFB', paddingTop: 50 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#1F2937' },
  historyListItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', marginHorizontal: 20, marginBottom: 10, padding: 16, borderRadius: 16 },
  historyListAvatar: { width: 60, height: 60, borderRadius: 30 },
  historyListInfo: { flex: 1, marginLeft: 14 },
  historyListTitle: { fontSize: 16, fontWeight: '600', color: '#1F2937' },
  historyListDate: { fontSize: 13, color: '#9CA3AF', marginTop: 4 },
  historyListMulti: { fontSize: 12, color: '#7C3AED', marginTop: 2 },
  emptyText: { textAlign: 'center', color: '#9CA3AF', marginTop: 40, fontSize: 16 },
});

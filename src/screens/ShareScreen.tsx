import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SHARE_OPTIONS = [
  { id: 'whatsapp', name: 'WhatsApp', icon: 'logo-whatsapp' as const, color: '#25D366' },
  { id: 'instagram', name: 'Instagram', icon: 'logo-instagram' as const, color: '#E4405F' },
  { id: 'facebook', name: 'Facebook', icon: 'logo-facebook' as const, color: '#1877F2' },
  { id: 'twitter', name: 'X (Twitter)', icon: 'logo-twitter' as const, color: '#1DA1F2' },
  { id: 'telegram', name: 'Telegram', icon: 'paper-plane' as const, color: '#0088CC' },
  { id: 'email', name: 'E-posta', icon: 'mail' as const, color: '#EA4335' },
  { id: 'sms', name: 'SMS', icon: 'chatbubble' as const, color: '#34C759' },
  { id: 'more', name: 'Diger', icon: 'ellipsis-horizontal' as const, color: '#6B7280' },
];

export default function ShareScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { videoUrl } = route.params as { videoUrl: string };
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = (option: typeof SHARE_OPTIONS[0]) => {
    setIsSharing(true);
    setTimeout(() => {
      setIsSharing(false);
      Alert.alert(
        'Basarili!',
        `Video ${option.name} uzerinden paylasilmak uzere hazirlandi.`,
        [{ text: 'Tamam', onPress: () => navigation.navigate('MainTabs') }]
      );
    }, 1000);
  };

  const handleDownload = () => {
    Alert.alert('Indiriliyor', 'Video galerinize kaydediliyor...', [{ text: 'Tamam' }]);
  };

  const handleCopyLink = () => {
    Alert.alert('Kopyalandi', 'Video linki panoya kopyalandi.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.successContainer}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark" size={40} color="#FFFFFF" />
        </View>
        <Text style={styles.successTitle}>Videonuz Hazir!</Text>
        <Text style={styles.successSubtitle}>Simdi sevdiklerinizle paylasabilirsiniz</Text>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickActionButton} onPress={handleDownload}>
          <View style={[styles.quickActionIcon, { backgroundColor: '#22C55E20' }]}>
            <Ionicons name="download" size={24} color="#22C55E" />
          </View>
          <Text style={styles.quickActionText}>Indir</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickActionButton} onPress={handleCopyLink}>
          <View style={[styles.quickActionIcon, { backgroundColor: '#3B82F620' }]}>
            <Ionicons name="link" size={24} color="#3B82F6" />
          </View>
          <Text style={styles.quickActionText}>Link Kopyala</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.shareSection}>
        <Text style={styles.sectionTitle}>Paylas</Text>
        <View style={styles.shareGrid}>
          {SHARE_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.shareOption}
              onPress={() => handleShare(option)}
              disabled={isSharing}
            >
              <View style={[styles.shareOptionIcon, { backgroundColor: option.color + '20' }]}>
                <Ionicons name={option.icon} size={28} color={option.color} />
              </View>
              <Text style={styles.shareOptionText}>{option.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.newVideoButton} onPress={() => navigation.navigate('MainTabs')}>
          <Ionicons name="add-circle" size={20} color="#6366F1" />
          <Text style={styles.newVideoButtonText}>Yeni Video Olustur</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  successContainer: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 16 },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  successTitle: { fontSize: 24, fontWeight: 'bold', color: '#1F2937', marginBottom: 4 },
  successSubtitle: { fontSize: 16, color: '#6B7280', textAlign: 'center' },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  quickActionButton: { alignItems: 'center' },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionText: { fontSize: 14, color: '#6B7280', fontWeight: '500' },
  shareSection: { flex: 1, padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 12 },
  shareGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  shareOption: { width: '23%', alignItems: 'center', marginBottom: 20 },
  shareOptionIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  shareOptionText: { fontSize: 12, color: '#6B7280', textAlign: 'center' },
  bottomBar: { padding: 16, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  newVideoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6366F1',
    borderStyle: 'dashed',
  },
  newVideoButtonText: { color: '#6366F1', fontSize: 16, fontWeight: '600', marginLeft: 8 },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { RootStackParamList } from '../navigation/types';
import { COLORS, SPACING, RADIUS, FONTS, SHADOWS } from '../constants/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type ShareRouteProp = RouteProp<RootStackParamList, 'Share'>;

interface ShareOption {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  backgroundColor: string;
}

const SHARE_OPTIONS: ShareOption[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: 'logo-whatsapp',
    color: '#25D366',
    backgroundColor: '#25D36620',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'logo-instagram',
    color: '#E4405F',
    backgroundColor: '#E4405F20',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'logo-facebook',
    color: '#1877F2',
    backgroundColor: '#1877F220',
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    icon: 'logo-twitter',
    color: '#1DA1F2',
    backgroundColor: '#1DA1F220',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: 'paper-plane',
    color: '#0088CC',
    backgroundColor: '#0088CC20',
  },
  {
    id: 'email',
    name: 'E-posta',
    icon: 'mail',
    color: '#EA4335',
    backgroundColor: '#EA433520',
  },
  {
    id: 'sms',
    name: 'SMS',
    icon: 'chatbubble',
    color: '#34C759',
    backgroundColor: '#34C75920',
  },
  {
    id: 'more',
    name: 'Diger',
    icon: 'ellipsis-horizontal',
    color: COLORS.gray600,
    backgroundColor: COLORS.gray100,
  },
];

export default function ShareScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ShareRouteProp>();
  const { videoUrl } = route.params;

  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async (option: ShareOption) => {
    setIsSharing(true);

    // Simüle edilmiş paylaşım
    setTimeout(() => {
      setIsSharing(false);
      Alert.alert(
        'Basarili!',
        `Video ${option.name} uzerinden paylasilmak uzere hazirlandi.`,
        [
          {
            text: 'Tamam',
            onPress: () => navigation.navigate('MainTabs'),
          },
        ]
      );
    }, 1000);
  };

  const handleDownload = () => {
    Alert.alert(
      'Indiriliyor',
      'Video galerinize kaydediliyor...',
      [{ text: 'Tamam' }]
    );
  };

  const handleCopyLink = () => {
    Alert.alert('Kopyalandi', 'Video linki panoya kopyalandi.');
  };

  return (
    <View style={styles.container}>
      {/* Başarı Mesajı */}
      <View style={styles.successContainer}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.successIcon}
        >
          <Ionicons name="checkmark" size={40} color={COLORS.white} />
        </LinearGradient>
        <Text style={styles.successTitle}>Videonuz Hazir!</Text>
        <Text style={styles.successSubtitle}>
          Simdi sevdiklerinizle paylasabilirsiniz
        </Text>
      </View>

      {/* Hızlı Aksiyonlar */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.quickActionButton}
          onPress={handleDownload}
        >
          <View style={[styles.quickActionIcon, { backgroundColor: COLORS.success + '20' }]}>
            <Ionicons name="download" size={24} color={COLORS.success} />
          </View>
          <Text style={styles.quickActionText}>Indir</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickActionButton}
          onPress={handleCopyLink}
        >
          <View style={[styles.quickActionIcon, { backgroundColor: COLORS.info + '20' }]}>
            <Ionicons name="link" size={24} color={COLORS.info} />
          </View>
          <Text style={styles.quickActionText}>Link Kopyala</Text>
        </TouchableOpacity>
      </View>

      {/* Paylaşım Seçenekleri */}
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
              <View
                style={[
                  styles.shareOptionIcon,
                  { backgroundColor: option.backgroundColor },
                ]}
              >
                <Ionicons name={option.icon} size={28} color={option.color} />
              </View>
              <Text style={styles.shareOptionText}>{option.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Alt Buton */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.newVideoButton}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Ionicons name="add-circle" size={20} color={COLORS.primary} />
          <Text style={styles.newVideoButtonText}>Yeni Video Olustur</Text>
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
  successContainer: {
    alignItems: 'center',
    paddingVertical: SPACING['2xl'],
    paddingHorizontal: SPACING.base,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  successTitle: {
    fontSize: FONTS.sizes['2xl'],
    fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  successSubtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING['2xl'],
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
    marginHorizontal: SPACING.base,
  },
  quickActionButton: {
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  quickActionText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    fontWeight: FONTS.weights.medium,
  },
  shareSection: {
    flex: 1,
    padding: SPACING.base,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  shareGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  shareOption: {
    width: '23%',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  shareOptionIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  shareOptionText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  bottomBar: {
    padding: SPACING.base,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    ...SHADOWS.lg,
  },
  newVideoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
  },
  newVideoButtonText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    marginLeft: SPACING.sm,
  },
});

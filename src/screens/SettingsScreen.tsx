import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, SPACING, RADIUS, FONTS, SHADOWS } from '../constants/theme';

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showArrow?: boolean;
  danger?: boolean;
}

function SettingItem({
  icon,
  title,
  subtitle,
  onPress,
  rightElement,
  showArrow = true,
  danger = false,
}: SettingItemProps) {
  return (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View
        style={[
          styles.settingIcon,
          { backgroundColor: danger ? COLORS.error + '20' : COLORS.primaryLight + '30' },
        ]}
      >
        <Ionicons
          name={icon}
          size={20}
          color={danger ? COLORS.error : COLORS.primary}
        />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, danger && styles.dangerText]}>
          {title}
        </Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {rightElement || (showArrow && onPress && (
        <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
      ))}
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [highQuality, setHighQuality] = useState(false);

  const handleLanguage = () => {
    Alert.alert('Dil Secimi', 'Bu ozellik yaklasimda!');
  };

  const handlePrivacy = () => {
    Linking.openURL('https://example.com/privacy');
  };

  const handleTerms = () => {
    Linking.openURL('https://example.com/terms');
  };

  const handleContact = () => {
    Linking.openURL('mailto:destek@celebverse.com');
  };

  const handleRate = () => {
    Alert.alert('Tesekkurler!', 'Uygulamamizi degerlendirdiginiz icin tesekkur ederiz!');
  };

  const handleClearCache = () => {
    Alert.alert(
      'Onbellek Temizle',
      'Tum onbellek verileri silinecek. Devam etmek istiyor musunuz?',
      [
        { text: 'Iptal', style: 'cancel' },
        { text: 'Temizle', style: 'destructive', onPress: () => {
          Alert.alert('Basarili', 'Onbellek temizlendi.');
        }},
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Hesabi Sil',
      'Hesabiniz ve tum verileriniz kalici olarak silinecek. Bu islem geri alinamaz.',
      [
        { text: 'Iptal', style: 'cancel' },
        { text: 'Hesabi Sil', style: 'destructive', onPress: () => {
          Alert.alert('Hesap silme islemi baslatildi.');
        }},
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ayarlar</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Uygulama Ayarları */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Uygulama</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="language"
              title="Dil"
              subtitle="Turkce"
              onPress={handleLanguage}
            />
            <SettingItem
              icon="notifications"
              title="Bildirimler"
              subtitle="Ozel gun hatirlaticilari"
              showArrow={false}
              rightElement={
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ false: COLORS.gray300, true: COLORS.primaryLight }}
                  thumbColor={notifications ? COLORS.primary : COLORS.gray400}
                />
              }
            />
            <SettingItem
              icon="save"
              title="Otomatik Kaydet"
              subtitle="Videolari otomatik kaydet"
              showArrow={false}
              rightElement={
                <Switch
                  value={autoSave}
                  onValueChange={setAutoSave}
                  trackColor={{ false: COLORS.gray300, true: COLORS.primaryLight }}
                  thumbColor={autoSave ? COLORS.primary : COLORS.gray400}
                />
              }
            />
            <SettingItem
              icon="videocam"
              title="Yuksek Kalite"
              subtitle="Daha fazla depolama kullanir"
              showArrow={false}
              rightElement={
                <Switch
                  value={highQuality}
                  onValueChange={setHighQuality}
                  trackColor={{ false: COLORS.gray300, true: COLORS.primaryLight }}
                  thumbColor={highQuality ? COLORS.primary : COLORS.gray400}
                />
              }
            />
          </View>
        </View>

        {/* Destek */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Destek</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="help-circle"
              title="Yardim Merkezi"
              subtitle="Sikca sorulan sorular"
              onPress={() => {}}
            />
            <SettingItem
              icon="mail"
              title="Bize Ulasin"
              subtitle="destek@celebverse.com"
              onPress={handleContact}
            />
            <SettingItem
              icon="star"
              title="Uygulamayi Degerlendir"
              subtitle="Fikirlerinizi paylasain"
              onPress={handleRate}
            />
          </View>
        </View>

        {/* Yasal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Yasal</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="shield-checkmark"
              title="Gizlilik Politikasi"
              onPress={handlePrivacy}
            />
            <SettingItem
              icon="document-text"
              title="Kullanim Kosullari"
              onPress={handleTerms}
            />
          </View>
        </View>

        {/* Veri */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Veri</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="trash"
              title="Onbellegi Temizle"
              subtitle="Gecici dosyalari sil"
              onPress={handleClearCache}
            />
            <SettingItem
              icon="person-remove"
              title="Hesabi Sil"
              subtitle="Tum verilerini kalici olarak sil"
              onPress={handleDeleteAccount}
              danger
            />
          </View>
        </View>

        {/* Uygulama Bilgileri */}
        <View style={styles.appInfo}>
          <Text style={styles.appName}>CelebVerse</Text>
          <Text style={styles.appVersion}>Versiyon 1.0.0</Text>
          <Text style={styles.copyright}>
            2024 CelebVerse. Tum haklari saklidir.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.base,
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    fontSize: FONTS.sizes['2xl'],
    fontWeight: FONTS.weights.bold,
    color: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.base,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: SPACING.sm,
    marginLeft: SPACING.xs,
  },
  sectionContent: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
    color: COLORS.textPrimary,
  },
  settingSubtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  dangerText: {
    color: COLORS.error,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: SPACING['3xl'],
    paddingHorizontal: SPACING.base,
  },
  appName: {
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.primary,
  },
  appVersion: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  copyright: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textLight,
    marginTop: SPACING.md,
  },
});

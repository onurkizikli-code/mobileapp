import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/types';
import { COLORS, SPACING, RADIUS, FONTS, SHADOWS } from '../constants/theme';
import { OCCASIONS, OCCASION_CATEGORIES } from '../constants/occasions';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  const popularOccasions = OCCASIONS.slice(0, 6);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.appName}>CelebVerse</Text>
          <Text style={styles.tagline}>
            Sevdiklerine ozel mesajlar gonder
          </Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Ana Aksiyon Butonu */}
        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => navigation.navigate('OccasionSelect')}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryDark]}
            style={styles.mainButtonGradient}
          >
            <Ionicons name="add-circle" size={32} color={COLORS.white} />
            <Text style={styles.mainButtonText}>Yeni Mesaj Olustur</Text>
            <Text style={styles.mainButtonSubtext}>
              Ozel gun sec, karakter sec, mesajini yaz
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Popüler Özel Günler */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Populer Ozel Gunler</Text>
          <View style={styles.occasionsGrid}>
            {popularOccasions.map((occasion) => (
              <TouchableOpacity
                key={occasion.id}
                style={[
                  styles.occasionCard,
                  { backgroundColor: occasion.backgroundColor },
                ]}
                onPress={() =>
                  navigation.navigate('CharacterSelect', {
                    occasionId: occasion.id,
                  })
                }
                activeOpacity={0.8}
              >
                <Text style={styles.occasionIcon}>{occasion.icon}</Text>
                <Text
                  style={[styles.occasionName, { color: occasion.color }]}
                  numberOfLines={2}
                >
                  {occasion.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Nasıl Çalışır */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nasil Calisir?</Text>
          <View style={styles.stepsContainer}>
            <StepItem
              number="1"
              title="Ozel Gun Sec"
              description="Dogum gunu, bayram veya ozel bir gun secin"
              icon="calendar"
            />
            <StepItem
              number="2"
              title="Karakter Sec"
              description="Farkli kulturlerden gercekci karakterler"
              icon="person"
            />
            <StepItem
              number="3"
              title="Arka Plan Sec"
              description="Deniz, dag, sehir veya ozel temalar"
              icon="image"
            />
            <StepItem
              number="4"
              title="Mesajini Yaz"
              description="Kendi ozel mesajinizi yazin"
              icon="create"
            />
            <StepItem
              number="5"
              title="Paylas"
              description="WhatsApp, Instagram'a gonderin"
              icon="share-social"
            />
          </View>
        </View>

        {/* Özellikler */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ozellikler</Text>
          <View style={styles.featuresGrid}>
            <FeatureItem
              icon="people"
              title="Cesitli Karakterler"
              description="Farkli irk, din ve kulturlerden"
            />
            <FeatureItem
              icon="videocam"
              title="AI Video"
              description="Gercekci animasyonlu videolar"
            />
            <FeatureItem
              icon="volume-high"
              title="Sesli Mesaj"
              description="Mesajiniz seslendirilir"
            />
            <FeatureItem
              icon="gift"
              title="Ucretsiz"
              description="Tum ozellikler ucretsiz"
            />
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

// Adım Bileşeni
function StepItem({
  number,
  title,
  description,
  icon,
}: {
  number: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View style={styles.stepItem}>
      <View style={styles.stepNumber}>
        <Text style={styles.stepNumberText}>{number}</Text>
      </View>
      <View style={styles.stepContent}>
        <View style={styles.stepHeader}>
          <Ionicons name={icon} size={20} color={COLORS.primary} />
          <Text style={styles.stepTitle}>{title}</Text>
        </View>
        <Text style={styles.stepDescription}>{description}</Text>
      </View>
    </View>
  );
}

// Özellik Bileşeni
function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureIcon}>
        <Ionicons name={icon} size={24} color={COLORS.primary} />
      </View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
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
    paddingBottom: 30,
    paddingHorizontal: SPACING.base,
  },
  headerContent: {
    alignItems: 'center',
  },
  appName: {
    fontSize: FONTS.sizes['4xl'],
    fontWeight: FONTS.weights.bold,
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  tagline: {
    fontSize: FONTS.sizes.md,
    color: COLORS.white,
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  mainButton: {
    marginHorizontal: SPACING.base,
    marginTop: -20,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.lg,
  },
  mainButtonGradient: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  mainButtonText: {
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.white,
    marginTop: SPACING.sm,
  },
  mainButtonSubtext: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.white,
    opacity: 0.8,
    marginTop: SPACING.xs,
  },
  section: {
    padding: SPACING.base,
    marginTop: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  occasionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  occasionCard: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: RADIUS.lg,
    padding: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  occasionIcon: {
    fontSize: 32,
    marginBottom: SPACING.xs,
  },
  occasionName: {
    fontSize: FONTS.sizes.xs,
    fontWeight: FONTS.weights.medium,
    textAlign: 'center',
  },
  stepsContainer: {
    backgroundColor: COLORS.gray100,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  stepNumberText: {
    color: COLORS.white,
    fontWeight: FONTS.weights.bold,
    fontSize: FONTS.sizes.sm,
  },
  stepContent: {
    flex: 1,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  stepTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  stepDescription: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primaryLight + '30',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  featureTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  featureDescription: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  bottomPadding: {
    height: 20,
  },
});

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/types';
import { COLORS, SPACING, RADIUS, FONTS, SHADOWS } from '../constants/theme';
import {
  BACKGROUNDS,
  BACKGROUND_CATEGORIES,
  Background,
  getBackgroundsForOccasion,
} from '../constants/backgrounds';
import { getOccasionById } from '../constants/occasions';
import { getCharacterById } from '../constants/characters';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type BackgroundSelectRouteProp = RouteProp<RootStackParamList, 'BackgroundSelect'>;

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - SPACING.base * 3) / 2;

type CategoryType = 'all' | 'recommended' | Background['category'];

export default function BackgroundSelectScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<BackgroundSelectRouteProp>();
  const { occasionId, characterId } = route.params;

  const occasion = getOccasionById(occasionId);
  const character = getCharacterById(characterId);

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('recommended');
  const [selectedBackground, setSelectedBackground] = useState<Background | null>(null);

  const recommendedBackgrounds = useMemo(() => {
    return getBackgroundsForOccasion(occasionId);
  }, [occasionId]);

  const filteredBackgrounds = useMemo(() => {
    if (selectedCategory === 'all') return BACKGROUNDS;
    if (selectedCategory === 'recommended') return recommendedBackgrounds;
    return BACKGROUNDS.filter((bg) => bg.category === selectedCategory);
  }, [selectedCategory, recommendedBackgrounds]);

  const categories = [
    { id: 'recommended', name: 'Onerilen', icon: '⭐' },
    { id: 'all', name: 'Tumu', icon: '🎯' },
    ...Object.entries(BACKGROUND_CATEGORIES).map(([id, cat]) => ({
      id,
      name: cat.name,
      icon: cat.icon,
    })),
  ];

  const handleSelectBackground = (background: Background) => {
    setSelectedBackground(background);
  };

  const handleContinue = () => {
    if (selectedBackground) {
      navigation.navigate('MessageCompose', {
        occasionId,
        characterId,
        backgroundId: selectedBackground.id,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Seçim Özeti */}
      <View style={styles.summaryBar}>
        {occasion && (
          <View style={styles.summaryItem}>
            <Text style={styles.summaryIcon}>{occasion.icon}</Text>
            <Text style={styles.summaryText}>{occasion.name}</Text>
          </View>
        )}
        {character && (
          <View style={styles.summaryItem}>
            <Ionicons name="person" size={16} color={COLORS.primary} />
            <Text style={styles.summaryText}>{character.name}</Text>
          </View>
        )}
      </View>

      {/* Kategoriler */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryChip,
              selectedCategory === cat.id && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(cat.id as CategoryType)}
          >
            <Text style={styles.categoryIcon}>{cat.icon}</Text>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat.id && styles.categoryTextActive,
              ]}
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Arka Plan Listesi */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.backgroundsGrid}>
          {filteredBackgrounds.map((background) => (
            <TouchableOpacity
              key={background.id}
              style={[
                styles.backgroundCard,
                selectedBackground?.id === background.id &&
                  styles.backgroundCardSelected,
              ]}
              onPress={() => handleSelectBackground(background)}
              activeOpacity={0.8}
            >
              {/* Placeholder Görsel */}
              <View
                style={[
                  styles.backgroundPreview,
                  { backgroundColor: background.color + '40' },
                ]}
              >
                <View
                  style={[
                    styles.colorCircle,
                    { backgroundColor: background.color },
                  ]}
                />
                {selectedBackground?.id === background.id && (
                  <View style={styles.selectedOverlay}>
                    <View style={styles.selectedBadge}>
                      <Ionicons name="checkmark" size={24} color={COLORS.white} />
                    </View>
                  </View>
                )}
              </View>
              <View style={styles.backgroundInfo}>
                <Text style={styles.backgroundName} numberOfLines={1}>
                  {background.name}
                </Text>
                <Text style={styles.backgroundCategory}>
                  {BACKGROUND_CATEGORIES[background.category]?.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {filteredBackgrounds.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="image" size={48} color={COLORS.gray300} />
            <Text style={styles.emptyText}>Bu kategoride arka plan yok</Text>
          </View>
        )}
      </ScrollView>

      {/* Devam Butonu */}
      {selectedBackground && (
        <View style={styles.bottomBar}>
          <View style={styles.selectedInfo}>
            <Text style={styles.selectedLabel}>Secilen:</Text>
            <Text style={styles.selectedName}>{selectedBackground.name}</Text>
          </View>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Devam Et</Text>
            <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  summaryBar: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.gray100,
    gap: SPACING.md,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
  },
  summaryIcon: {
    fontSize: 16,
    marginRight: SPACING.xs,
  },
  summaryText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textPrimary,
    fontWeight: FONTS.weights.medium,
    marginLeft: SPACING.xs,
  },
  categoriesScroll: {
    maxHeight: 50,
    marginTop: SPACING.md,
  },
  categoriesContent: {
    paddingHorizontal: SPACING.base,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray100,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    marginRight: SPACING.sm,
  },
  categoryChipActive: {
    backgroundColor: COLORS.primary,
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: SPACING.xs,
  },
  categoryText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    fontWeight: FONTS.weights.medium,
  },
  categoryTextActive: {
    color: COLORS.white,
  },
  scrollView: {
    flex: 1,
    marginTop: SPACING.md,
  },
  backgroundsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.base,
    justifyContent: 'space-between',
  },
  backgroundCard: {
    width: CARD_WIDTH,
    marginBottom: SPACING.md,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    ...SHADOWS.sm,
  },
  backgroundCardSelected: {
    borderColor: COLORS.primary,
  },
  backgroundPreview: {
    width: '100%',
    height: CARD_WIDTH * 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  selectedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.primary + '40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedBadge: {
    backgroundColor: COLORS.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundInfo: {
    padding: SPACING.sm,
  },
  backgroundName: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  backgroundCategory: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING['3xl'],
  },
  emptyText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.base,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    ...SHADOWS.lg,
  },
  selectedInfo: {
    flex: 1,
  },
  selectedLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
  },
  selectedName: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.textPrimary,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
  },
  continueButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    marginRight: SPACING.sm,
  },
});

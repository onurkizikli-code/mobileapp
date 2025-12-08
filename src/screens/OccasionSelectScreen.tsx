import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/types';
import { COLORS, SPACING, RADIUS, FONTS, SHADOWS } from '../constants/theme';
import {
  OCCASIONS,
  OCCASION_CATEGORIES,
  Occasion,
  getOccasionsByCategory,
} from '../constants/occasions';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type CategoryType = 'all' | Occasion['category'];

export default function OccasionSelectScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');

  // Filtreleme
  const filteredOccasions = OCCASIONS.filter((occasion) => {
    const matchesSearch =
      occasion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      occasion.keywords.some((k) =>
        k.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === 'all' || occasion.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', name: 'Tumu', icon: '🎯' },
    ...Object.entries(OCCASION_CATEGORIES).map(([id, cat]) => ({
      id,
      name: cat.name,
      icon: cat.icon,
    })),
  ];

  const handleSelectOccasion = (occasionId: string) => {
    navigation.navigate('CharacterSelect', { occasionId });
  };

  return (
    <View style={styles.container}>
      {/* Arama */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={COLORS.gray400}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Ozel gun ara..."
          placeholderTextColor={COLORS.gray400}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={COLORS.gray400} />
          </TouchableOpacity>
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

      {/* Özel Günler Listesi */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.occasionsGrid}>
          {filteredOccasions.map((occasion) => (
            <TouchableOpacity
              key={occasion.id}
              style={[
                styles.occasionCard,
                { backgroundColor: occasion.backgroundColor },
              ]}
              onPress={() => handleSelectOccasion(occasion.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.occasionIcon}>{occasion.icon}</Text>
              <Text style={[styles.occasionName, { color: occasion.color }]}>
                {occasion.name}
              </Text>
              <Text style={styles.occasionCategory}>
                {OCCASION_CATEGORIES[occasion.category]?.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {filteredOccasions.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="search" size={48} color={COLORS.gray300} />
            <Text style={styles.emptyText}>Sonuc bulunamadi</Text>
            <Text style={styles.emptySubtext}>
              Farkli bir arama terimi deneyin
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray100,
    margin: SPACING.base,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.lg,
    height: 48,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FONTS.sizes.md,
    color: COLORS.textPrimary,
  },
  categoriesScroll: {
    maxHeight: 50,
  },
  categoriesContent: {
    paddingHorizontal: SPACING.base,
    gap: SPACING.sm,
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
  occasionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.base,
    justifyContent: 'space-between',
  },
  occasionCard: {
    width: '48%',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  occasionIcon: {
    fontSize: 40,
    marginBottom: SPACING.sm,
  },
  occasionName: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  occasionCategory: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING['3xl'],
  },
  emptyText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
  },
  emptySubtext: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
  },
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, SPACING, RADIUS, FONTS, SHADOWS } from '../constants/theme';

// Örnek favori karakterler ve arka planlar
const MOCK_FAVORITES = {
  characters: [
    { id: 'char_tr_female_01', name: 'Ayse', type: 'character', icon: 'woman' },
    { id: 'char_eu_female_01', name: 'Emma', type: 'character', icon: 'woman' },
    { id: 'char_ar_male_01', name: 'Ahmed', type: 'character', icon: 'man' },
  ],
  backgrounds: [
    { id: 'bg_nature_beach_01', name: 'Gun Batimi Sahil', type: 'background', color: '#F97316' },
    { id: 'bg_festive_birthday_01', name: 'Dogum Gunu Balonlari', type: 'background', color: '#EC4899' },
  ],
  occasions: [
    { id: 'birthday', name: 'Dogum Gunu', type: 'occasion', icon: '🎂' },
    { id: 'ramadan', name: 'Ramazan Bayrami', type: 'occasion', icon: '🌙' },
  ],
};

export default function FavoritesScreen() {
  const renderCharacter = (item: typeof MOCK_FAVORITES.characters[0]) => (
    <TouchableOpacity style={styles.favoriteCard} activeOpacity={0.7}>
      <View style={styles.characterAvatar}>
        <Ionicons
          name={item.icon as keyof typeof Ionicons.glyphMap}
          size={32}
          color={COLORS.primary}
        />
      </View>
      <Text style={styles.cardName}>{item.name}</Text>
      <TouchableOpacity style={styles.removeButton}>
        <Ionicons name="heart" size={20} color={COLORS.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderBackground = (item: typeof MOCK_FAVORITES.backgrounds[0]) => (
    <TouchableOpacity style={styles.favoriteCard} activeOpacity={0.7}>
      <View style={[styles.backgroundPreview, { backgroundColor: item.color + '40' }]}>
        <View style={[styles.colorDot, { backgroundColor: item.color }]} />
      </View>
      <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
      <TouchableOpacity style={styles.removeButton}>
        <Ionicons name="heart" size={20} color={COLORS.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderOccasion = (item: typeof MOCK_FAVORITES.occasions[0]) => (
    <TouchableOpacity style={styles.favoriteCard} activeOpacity={0.7}>
      <View style={styles.occasionPreview}>
        <Text style={styles.occasionIcon}>{item.icon}</Text>
      </View>
      <Text style={styles.cardName}>{item.name}</Text>
      <TouchableOpacity style={styles.removeButton}>
        <Ionicons name="heart" size={20} color={COLORS.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const EmptySection = ({ title }: { title: string }) => (
    <View style={styles.emptySection}>
      <Text style={styles.emptySectionText}>Henuz favori {title} yok</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favoriler</Text>
        <Text style={styles.headerSubtitle}>
          Hizli erisim icin favorileriniz
        </Text>
      </View>

      <FlatList
        data={[1]} // Tek item, içerik sections olarak render edilecek
        keyExtractor={() => 'content'}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <View style={styles.content}>
            {/* Favori Karakterler */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="people" size={20} color={COLORS.primary} />
                <Text style={styles.sectionTitle}>Karakterler</Text>
                <Text style={styles.sectionCount}>
                  {MOCK_FAVORITES.characters.length}
                </Text>
              </View>
              {MOCK_FAVORITES.characters.length > 0 ? (
                <View style={styles.cardsGrid}>
                  {MOCK_FAVORITES.characters.map((char) => (
                    <View key={char.id}>{renderCharacter(char)}</View>
                  ))}
                </View>
              ) : (
                <EmptySection title="karakter" />
              )}
            </View>

            {/* Favori Arka Planlar */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="image" size={20} color={COLORS.primary} />
                <Text style={styles.sectionTitle}>Arka Planlar</Text>
                <Text style={styles.sectionCount}>
                  {MOCK_FAVORITES.backgrounds.length}
                </Text>
              </View>
              {MOCK_FAVORITES.backgrounds.length > 0 ? (
                <View style={styles.cardsGrid}>
                  {MOCK_FAVORITES.backgrounds.map((bg) => (
                    <View key={bg.id}>{renderBackground(bg)}</View>
                  ))}
                </View>
              ) : (
                <EmptySection title="arka plan" />
              )}
            </View>

            {/* Favori Özel Günler */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="calendar" size={20} color={COLORS.primary} />
                <Text style={styles.sectionTitle}>Ozel Gunler</Text>
                <Text style={styles.sectionCount}>
                  {MOCK_FAVORITES.occasions.length}
                </Text>
              </View>
              {MOCK_FAVORITES.occasions.length > 0 ? (
                <View style={styles.cardsGrid}>
                  {MOCK_FAVORITES.occasions.map((occ) => (
                    <View key={occ.id}>{renderOccasion(occ)}</View>
                  ))}
                </View>
              ) : (
                <EmptySection title="ozel gun" />
              )}
            </View>
          </View>
        )}
      />
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
  headerSubtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.white,
    opacity: 0.8,
    marginTop: SPACING.xs,
  },
  content: {
    padding: SPACING.base,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  sectionCount: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    backgroundColor: COLORS.gray100,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  favoriteCard: {
    width: 100,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  characterAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primaryLight + '30',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  backgroundPreview: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  colorDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  occasionPreview: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  occasionIcon: {
    fontSize: 28,
  },
  cardName: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  removeButton: {
    padding: SPACING.xs,
  },
  emptySection: {
    backgroundColor: COLORS.gray100,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
  },
  emptySectionText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textLight,
  },
});

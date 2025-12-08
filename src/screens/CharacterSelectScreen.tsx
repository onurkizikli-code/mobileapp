import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/types';
import { COLORS, SPACING, RADIUS, FONTS, SHADOWS } from '../constants/theme';
import {
  CHARACTERS,
  FILTER_OPTIONS,
  filterCharacters,
  Character,
} from '../constants/characters';
import { getOccasionById } from '../constants/occasions';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type CharacterSelectRouteProp = RouteProp<RootStackParamList, 'CharacterSelect'>;

interface Filters {
  gender: string;
  ethnicity: string;
  ageGroup: string;
  style: string;
}

export default function CharacterSelectScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<CharacterSelectRouteProp>();
  const { occasionId } = route.params;

  const occasion = getOccasionById(occasionId);

  const [filters, setFilters] = useState<Filters>({
    gender: 'all',
    ethnicity: 'all',
    ageGroup: 'all',
    style: 'all',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const filteredCharacters = useMemo(() => {
    return filterCharacters(filters);
  }, [filters]);

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleContinue = () => {
    if (selectedCharacter) {
      navigation.navigate('BackgroundSelect', {
        occasionId,
        characterId: selectedCharacter.id,
      });
    }
  };

  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== 'all'
  ).length;

  return (
    <View style={styles.container}>
      {/* Seçilen Özel Gün */}
      {occasion && (
        <View style={[styles.occasionBanner, { backgroundColor: occasion.backgroundColor }]}>
          <Text style={styles.occasionIcon}>{occasion.icon}</Text>
          <Text style={[styles.occasionName, { color: occasion.color }]}>
            {occasion.name}
          </Text>
        </View>
      )}

      {/* Filtre Butonu */}
      <View style={styles.filterBar}>
        <Text style={styles.resultCount}>
          {filteredCharacters.length} karakter
        </Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Ionicons name="filter" size={20} color={COLORS.primary} />
          <Text style={styles.filterButtonText}>Filtrele</Text>
          {activeFilterCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Karakter Listesi */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.charactersGrid}>
          {filteredCharacters.map((character) => (
            <TouchableOpacity
              key={character.id}
              style={[
                styles.characterCard,
                selectedCharacter?.id === character.id && styles.characterCardSelected,
              ]}
              onPress={() => handleSelectCharacter(character)}
              activeOpacity={0.8}
            >
              {/* Placeholder Avatar */}
              <View style={styles.avatarContainer}>
                <View style={styles.avatarPlaceholder}>
                  <Ionicons
                    name={character.gender === 'female' ? 'woman' : 'man'}
                    size={40}
                    color={COLORS.gray400}
                  />
                </View>
                {selectedCharacter?.id === character.id && (
                  <View style={styles.selectedBadge}>
                    <Ionicons name="checkmark" size={16} color={COLORS.white} />
                  </View>
                )}
              </View>
              <Text style={styles.characterName}>{character.name}</Text>
              <Text style={styles.characterInfo}>
                {character.culturalBackground}
              </Text>
              <Text style={styles.characterStyle}>{character.clothing}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Devam Butonu */}
      {selectedCharacter && (
        <View style={styles.bottomBar}>
          <View style={styles.selectedInfo}>
            <Text style={styles.selectedLabel}>Secilen:</Text>
            <Text style={styles.selectedName}>{selectedCharacter.name}</Text>
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

      {/* Filtre Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        transparent
        onRequestClose={() => setShowFilters(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowFilters(false)}
        >
          <Pressable style={styles.modalContent} onPress={() => {}}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtrele</Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <Ionicons name="close" size={24} color={COLORS.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView>
              {/* Cinsiyet */}
              <FilterSection
                title="Cinsiyet"
                options={FILTER_OPTIONS.gender}
                selected={filters.gender}
                onSelect={(value) => updateFilter('gender', value)}
              />

              {/* Etnik Köken */}
              <FilterSection
                title="Etnik Koken"
                options={FILTER_OPTIONS.ethnicity}
                selected={filters.ethnicity}
                onSelect={(value) => updateFilter('ethnicity', value)}
              />

              {/* Yaş Grubu */}
              <FilterSection
                title="Yas Grubu"
                options={FILTER_OPTIONS.ageGroup}
                selected={filters.ageGroup}
                onSelect={(value) => updateFilter('ageGroup', value)}
              />

              {/* Stil */}
              <FilterSection
                title="Stil"
                options={FILTER_OPTIONS.style}
                selected={filters.style}
                onSelect={(value) => updateFilter('style', value)}
              />
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() =>
                  setFilters({
                    gender: 'all',
                    ethnicity: 'all',
                    ageGroup: 'all',
                    style: 'all',
                  })
                }
              >
                <Text style={styles.clearButtonText}>Temizle</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => setShowFilters(false)}
              >
                <Text style={styles.applyButtonText}>Uygula</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

// Filtre Bölümü Bileşeni
function FilterSection({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: { id: string; label: string }[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <View style={styles.filterSection}>
      <Text style={styles.filterSectionTitle}>{title}</Text>
      <View style={styles.filterOptions}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.filterOption,
              selected === option.id && styles.filterOptionActive,
            ]}
            onPress={() => onSelect(option.id)}
          >
            <Text
              style={[
                styles.filterOptionText,
                selected === option.id && styles.filterOptionTextActive,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  occasionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    marginHorizontal: SPACING.base,
    marginTop: SPACING.md,
    borderRadius: RADIUS.lg,
  },
  occasionIcon: {
    fontSize: 24,
    marginRight: SPACING.sm,
  },
  occasionName: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
  },
  resultCount: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight + '30',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
  },
  filterButtonText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    fontWeight: FONTS.weights.medium,
    marginLeft: SPACING.xs,
  },
  filterBadge: {
    backgroundColor: COLORS.primary,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.xs,
  },
  filterBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: FONTS.weights.bold,
  },
  scrollView: {
    flex: 1,
  },
  charactersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.base,
    justifyContent: 'space-between',
  },
  characterCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    ...SHADOWS.sm,
  },
  characterCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight + '20',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: SPACING.sm,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  characterName: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  characterInfo: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  characterStyle: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textLight,
    textAlign: 'center',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS['2xl'],
    borderTopRightRadius: RADIUS['2xl'],
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  modalTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary,
  },
  filterSection: {
    padding: SPACING.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  filterSectionTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  filterOption: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.gray100,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  filterOptionActive: {
    backgroundColor: COLORS.primary,
  },
  filterOptionText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  filterOptionTextActive: {
    color: COLORS.white,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: SPACING.base,
    gap: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  clearButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    fontWeight: FONTS.weights.medium,
  },
  applyButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.white,
    fontWeight: FONTS.weights.semibold,
  },
});

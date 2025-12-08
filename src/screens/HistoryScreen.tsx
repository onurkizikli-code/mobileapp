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

// Örnek geçmiş verileri
const MOCK_HISTORY = [
  {
    id: '1',
    occasionName: 'Dogum Gunu',
    occasionIcon: '🎂',
    characterName: 'Ayse',
    recipientName: 'Mehmet',
    createdAt: '2024-01-15T10:30:00',
    thumbnail: null,
  },
  {
    id: '2',
    occasionName: 'Sevgililer Gunu',
    occasionIcon: '❤️',
    characterName: 'Emma',
    recipientName: 'Ali',
    createdAt: '2024-02-14T18:00:00',
    thumbnail: null,
  },
  {
    id: '3',
    occasionName: 'Ramazan Bayrami',
    occasionIcon: '🌙',
    characterName: 'Fatima',
    recipientName: 'Aile',
    createdAt: '2024-04-10T09:00:00',
    thumbnail: null,
  },
];

export default function HistoryScreen() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const renderItem = ({ item }: { item: typeof MOCK_HISTORY[0] }) => (
    <TouchableOpacity style={styles.historyItem} activeOpacity={0.7}>
      <View style={styles.thumbnailContainer}>
        <View style={styles.thumbnailPlaceholder}>
          <Text style={styles.thumbnailIcon}>{item.occasionIcon}</Text>
        </View>
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.occasionName}>{item.occasionName}</Text>
        <Text style={styles.recipientName}>Alici: {item.recipientName}</Text>
        <Text style={styles.characterName}>Karakter: {item.characterName}</Text>
        <Text style={styles.dateText}>{formatDate(item.createdAt)}</Text>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="play-circle" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={22} color={COLORS.gray500} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="trash-outline" size={22} color={COLORS.error} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="time-outline" size={64} color={COLORS.gray300} />
      <Text style={styles.emptyTitle}>Henuz video yok</Text>
      <Text style={styles.emptySubtitle}>
        Olusturdugumuz videolar burada gorunecek
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gecmis</Text>
        <Text style={styles.headerSubtitle}>
          {MOCK_HISTORY.length} video olusturuldu
        </Text>
      </View>

      <FlatList
        data={MOCK_HISTORY}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={EmptyState}
        showsVerticalScrollIndicator={false}
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
  listContent: {
    padding: SPACING.base,
    flexGrow: 1,
  },
  historyItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  thumbnailContainer: {
    marginRight: SPACING.md,
  },
  thumbnailPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailIcon: {
    fontSize: 32,
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
  },
  occasionName: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  recipientName: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  characterName: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  dateText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
  },
  itemActions: {
    justifyContent: 'space-around',
    paddingLeft: SPACING.sm,
  },
  actionButton: {
    padding: SPACING.xs,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING['4xl'],
  },
  emptyTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
  },
  emptySubtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favoriler</Text>
      </View>
      <View style={styles.content}>
        <Ionicons name="heart-outline" size={64} color="#D1D5DB" />
        <Text style={styles.emptyText}>Henuz favori eklemediniz</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { backgroundColor: '#6366F1', paddingTop: 60, paddingBottom: 20, paddingHorizontal: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 16, color: '#6B7280', marginTop: 16 },
});

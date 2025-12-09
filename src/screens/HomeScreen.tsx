import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const OCCASIONS = [
  { id: 'birthday', name: 'Dogum Gunu', icon: '🎂', color: '#EC4899', bg: '#FDF2F8' },
  { id: 'anniversary', name: 'Yildonumu', icon: '💒', color: '#F59E0B', bg: '#FFFBEB' },
  { id: 'valentines', name: 'Sevgililer', icon: '❤️', color: '#EF4444', bg: '#FEF2F2' },
  { id: 'ramadan', name: 'Ramazan', icon: '🌙', color: '#059669', bg: '#ECFDF5' },
  { id: 'christmas', name: 'Noel', icon: '🎄', color: '#DC2626', bg: '#FEF2F2' },
  { id: 'new_year', name: 'Yeni Yil', icon: '🎊', color: '#8B5CF6', bg: '#F5F3FF' },
];

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>CelebVerse</Text>
        <Text style={styles.tagline}>Sevdiklerine ozel mesajlar gonder</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => navigation.navigate('OccasionSelect')}
        >
          <Ionicons name="add-circle" size={32} color="#FFFFFF" />
          <Text style={styles.mainButtonText}>Yeni Mesaj Olustur</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Populer Ozel Gunler</Text>
          <View style={styles.grid}>
            {OCCASIONS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.card, { backgroundColor: item.bg }]}
                onPress={() => navigation.navigate('CharacterSelect', { occasionId: item.id })}
              >
                <Text style={styles.cardIcon}>{item.icon}</Text>
                <Text style={[styles.cardText, { color: item.color }]}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#6366F1',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tagline: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 8,
  },
  scrollView: {
    flex: 1,
  },
  mainButton: {
    backgroundColor: '#6366F1',
    margin: 16,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  mainButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 4,
  },
  cardText: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
});

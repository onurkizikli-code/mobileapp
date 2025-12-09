import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CHARACTERS = [
  { id: 'c1', name: 'Ayse', gender: 'female' },
  { id: 'c2', name: 'Mehmet', gender: 'male' },
  { id: 'c3', name: 'Emma', gender: 'female' },
  { id: 'c4', name: 'Ahmed', gender: 'male' },
  { id: 'c5', name: 'Fatima', gender: 'female' },
  { id: 'c6', name: 'James', gender: 'male' },
];

export default function CharacterSelectScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { occasionId } = route.params as { occasionId: string };
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.grid}>
          {CHARACTERS.map((char) => (
            <TouchableOpacity
              key={char.id}
              style={[styles.card, selected === char.id && styles.cardSelected]}
              onPress={() => setSelected(char.id)}
            >
              <View style={styles.avatar}>
                <Ionicons name={char.gender === 'female' ? 'woman' : 'man'} size={40} color="#6366F1" />
              </View>
              <Text style={styles.name}>{char.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {selected && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('BackgroundSelect', { occasionId, characterId: selected })}
        >
          <Text style={styles.buttonText}>Devam Et</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: '#F3F4F6', borderRadius: 12, padding: 16, alignItems: 'center', marginBottom: 12, borderWidth: 2, borderColor: 'transparent' },
  cardSelected: { borderColor: '#6366F1', backgroundColor: '#EEF2FF' },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  name: { fontSize: 16, fontWeight: '600', color: '#1F2937' },
  button: { backgroundColor: '#6366F1', margin: 16, padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
});

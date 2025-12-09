import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const BACKGROUNDS = [
  { id: 'b1', name: 'Sahil', color: '#06B6D4' },
  { id: 'b2', name: 'Dag', color: '#10B981' },
  { id: 'b3', name: 'Sehir', color: '#6366F1' },
  { id: 'b4', name: 'Orman', color: '#22C55E' },
  { id: 'b5', name: 'Cicekler', color: '#EC4899' },
  { id: 'b6', name: 'Gokyuzu', color: '#3B82F6' },
];

export default function BackgroundSelectScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { occasionId, characterId } = route.params as { occasionId: string; characterId: string };
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.grid}>
          {BACKGROUNDS.map((bg) => (
            <TouchableOpacity
              key={bg.id}
              style={[styles.card, { backgroundColor: bg.color + '30' }, selected === bg.id && styles.cardSelected]}
              onPress={() => setSelected(bg.id)}
            >
              <View style={[styles.preview, { backgroundColor: bg.color }]} />
              <Text style={styles.name}>{bg.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {selected && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MessageCompose', { occasionId, characterId, backgroundId: selected })}
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
  card: { width: '48%', borderRadius: 12, padding: 12, alignItems: 'center', marginBottom: 12, borderWidth: 2, borderColor: 'transparent' },
  cardSelected: { borderColor: '#6366F1' },
  preview: { width: 60, height: 60, borderRadius: 30, marginBottom: 8 },
  name: { fontSize: 14, fontWeight: '600', color: '#1F2937' },
  button: { backgroundColor: '#6366F1', margin: 16, padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
});

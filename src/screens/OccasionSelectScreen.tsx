import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const OCCASIONS = [
  { id: 'birthday', name: 'Dogum Gunu', icon: '🎂' },
  { id: 'anniversary', name: 'Evlilik Yildonumu', icon: '💒' },
  { id: 'valentines', name: 'Sevgililer Gunu', icon: '❤️' },
  { id: 'ramadan', name: 'Ramazan Bayrami', icon: '🌙' },
  { id: 'christmas', name: 'Noel', icon: '🎄' },
  { id: 'new_year', name: 'Yeni Yil', icon: '🎊' },
  { id: 'mothers_day', name: 'Anneler Gunu', icon: '👩' },
  { id: 'fathers_day', name: 'Babalar Gunu', icon: '👨' },
];

export default function OccasionSelectScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.grid}>
        {OCCASIONS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate('CharacterSelect', { occasionId: item.id })}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', padding: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: '#F3F4F6', borderRadius: 12, padding: 20, alignItems: 'center', marginBottom: 12 },
  icon: { fontSize: 40, marginBottom: 8 },
  name: { fontSize: 14, fontWeight: '600', color: '#1F2937', textAlign: 'center' },
});

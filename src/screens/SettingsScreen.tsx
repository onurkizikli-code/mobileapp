import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ayarlar</Text>
      </View>
      <View style={styles.content}>
        <SettingItem icon="language" title="Dil" value="Turkce" />
        <SettingItem icon="notifications" title="Bildirimler" value="Acik" />
        <SettingItem icon="information-circle" title="Hakkinda" value="v1.0.0" />
      </View>
    </View>
  );
}

function SettingItem({ icon, title, value }: { icon: any; title: string; value: string }) {
  return (
    <TouchableOpacity style={styles.item}>
      <View style={styles.itemLeft}>
        <Ionicons name={icon} size={24} color="#6366F1" />
        <Text style={styles.itemTitle}>{title}</Text>
      </View>
      <Text style={styles.itemValue}>{value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: { backgroundColor: '#6366F1', paddingTop: 60, paddingBottom: 20, paddingHorizontal: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  content: { padding: 16 },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, marginBottom: 8 },
  itemLeft: { flexDirection: 'row', alignItems: 'center' },
  itemTitle: { fontSize: 16, color: '#1F2937', marginLeft: 12 },
  itemValue: { fontSize: 14, color: '#6B7280' },
});

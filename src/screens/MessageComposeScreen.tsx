import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function MessageComposeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { occasionId, characterId, backgroundId } = route.params as { occasionId: string; characterId: string; backgroundId: string };
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('Dogum gunun kutlu olsun! Nice mutlu yillara.');

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.content}>
        <Text style={styles.label}>Kime?</Text>
        <TextInput
          style={styles.input}
          placeholder="Alicinin adi..."
          value={recipientName}
          onChangeText={setRecipientName}
        />
        
        <Text style={styles.label}>Mesajiniz</Text>
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Mesajinizi yazin..."
          value={message}
          onChangeText={setMessage}
          multiline
        />
      </View>
      
      <TouchableOpacity
        style={[styles.button, !message && styles.buttonDisabled]}
        disabled={!message}
        onPress={() => navigation.navigate('Preview', { occasionId, characterId, backgroundId, message, recipientName })}
      >
        <Text style={styles.buttonText}>Onizleme</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flex: 1, padding: 16 },
  label: { fontSize: 16, fontWeight: '600', color: '#1F2937', marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: '#F3F4F6', borderRadius: 12, padding: 16, fontSize: 16 },
  messageInput: { height: 150, textAlignVertical: 'top' },
  button: { backgroundColor: '#6366F1', margin: 16, padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#D1D5DB' },
  buttonText: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
});

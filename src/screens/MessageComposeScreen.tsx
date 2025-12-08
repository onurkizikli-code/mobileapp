import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/types';
import { COLORS, SPACING, RADIUS, FONTS, SHADOWS } from '../constants/theme';
import { getOccasionById } from '../constants/occasions';
import { getCharacterById } from '../constants/characters';
import { getBackgroundById } from '../constants/backgrounds';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type MessageComposeRouteProp = RouteProp<RootStackParamList, 'MessageCompose'>;

const MAX_MESSAGE_LENGTH = 500;

export default function MessageComposeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<MessageComposeRouteProp>();
  const { occasionId, characterId, backgroundId } = route.params;

  const occasion = getOccasionById(occasionId);
  const character = getCharacterById(characterId);
  const background = getBackgroundById(backgroundId);

  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState(occasion?.defaultMessage || '');
  const [showTemplates, setShowTemplates] = useState(false);

  // Örnek şablonlar
  const messageTemplates = [
    occasion?.defaultMessage || '',
    'Bu ozel gunu seninle kutlamak istedim. Seni cok seviyorum!',
    'Hayatimda oldugun icin cok mutluyum. Nice guzel gunlere!',
    'Bu guzel gunde tum dileklerimin gerceklesmesini diliyorum.',
    'Sana ozel bir mesaj gondermek istedim. Iyi ki varsin!',
  ].filter(Boolean);

  const handlePreview = () => {
    if (message.trim().length === 0) return;

    navigation.navigate('Preview', {
      occasionId,
      characterId,
      backgroundId,
      message: message.trim(),
      recipientName: recipientName.trim(),
    });
  };

  const handleSelectTemplate = (template: string) => {
    setMessage(template);
    setShowTemplates(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Seçim Özeti */}
      <View style={styles.summaryBar}>
        {occasion && (
          <View style={styles.summaryItem}>
            <Text style={styles.summaryIcon}>{occasion.icon}</Text>
          </View>
        )}
        {character && (
          <View style={styles.summaryItem}>
            <Ionicons name="person" size={14} color={COLORS.primary} />
            <Text style={styles.summaryText}>{character.name}</Text>
          </View>
        )}
        {background && (
          <View style={styles.summaryItem}>
            <Ionicons name="image" size={14} color={COLORS.primary} />
            <Text style={styles.summaryText}>{background.name}</Text>
          </View>
        )}
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Alıcı Adı */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Kime? (Istege bagli)</Text>
          <TextInput
            style={styles.nameInput}
            placeholder="Alicinin adi..."
            placeholderTextColor={COLORS.gray400}
            value={recipientName}
            onChangeText={setRecipientName}
            maxLength={50}
          />
        </View>

        {/* Mesaj */}
        <View style={styles.inputSection}>
          <View style={styles.labelRow}>
            <Text style={styles.inputLabel}>Mesajiniz</Text>
            <TouchableOpacity
              style={styles.templateButton}
              onPress={() => setShowTemplates(!showTemplates)}
            >
              <Ionicons
                name="document-text"
                size={16}
                color={COLORS.primary}
              />
              <Text style={styles.templateButtonText}>Sablonlar</Text>
            </TouchableOpacity>
          </View>

          {/* Şablon Seçici */}
          {showTemplates && (
            <View style={styles.templatesContainer}>
              {messageTemplates.map((template, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.templateItem}
                  onPress={() => handleSelectTemplate(template)}
                >
                  <Text style={styles.templateText} numberOfLines={2}>
                    {template}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <TextInput
            style={styles.messageInput}
            placeholder="Mesajinizi buraya yazin..."
            placeholderTextColor={COLORS.gray400}
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={MAX_MESSAGE_LENGTH}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>
            {message.length}/{MAX_MESSAGE_LENGTH}
          </Text>
        </View>

        {/* İpuçları */}
        <View style={styles.tipsContainer}>
          <View style={styles.tipHeader}>
            <Ionicons name="bulb" size={20} color={COLORS.warning} />
            <Text style={styles.tipTitle}>Ipuclari</Text>
          </View>
          <Text style={styles.tipText}>
            • Kisa ve oz mesajlar daha etkili olur
          </Text>
          <Text style={styles.tipText}>
            • Samimi bir dil kullanin
          </Text>
          <Text style={styles.tipText}>
            • Alicinin adini kullanmak mesaji kisisellestirir
          </Text>
        </View>
      </ScrollView>

      {/* Alt Buton */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.previewButton,
            message.trim().length === 0 && styles.previewButtonDisabled,
          ]}
          onPress={handlePreview}
          disabled={message.trim().length === 0}
        >
          <Text style={styles.previewButtonText}>Onizleme</Text>
          <Ionicons name="eye" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  summaryBar: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.gray100,
    gap: SPACING.sm,
    flexWrap: 'wrap',
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  summaryIcon: {
    fontSize: 14,
  },
  summaryText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textPrimary,
    fontWeight: FONTS.weights.medium,
    marginLeft: SPACING.xs,
  },
  scrollView: {
    flex: 1,
    padding: SPACING.base,
  },
  inputSection: {
    marginBottom: SPACING.lg,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  inputLabel: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  templateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    backgroundColor: COLORS.primaryLight + '30',
    borderRadius: RADIUS.full,
  },
  templateButtonText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    marginLeft: SPACING.xs,
  },
  templatesContainer: {
    backgroundColor: COLORS.gray100,
    borderRadius: RADIUS.lg,
    padding: SPACING.sm,
    marginBottom: SPACING.md,
  },
  templateItem: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
  },
  templateText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  nameInput: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: FONTS.sizes.md,
    color: COLORS.textPrimary,
  },
  messageInput: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: FONTS.sizes.md,
    color: COLORS.textPrimary,
    minHeight: 150,
    maxHeight: 250,
  },
  charCount: {
    textAlign: 'right',
    fontSize: FONTS.sizes.xs,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
  },
  tipsContainer: {
    backgroundColor: COLORS.warning + '15',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  tipTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  tipText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  bottomBar: {
    padding: SPACING.base,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    ...SHADOWS.lg,
  },
  previewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
  },
  previewButtonDisabled: {
    backgroundColor: COLORS.gray300,
  },
  previewButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    marginRight: SPACING.sm,
  },
});

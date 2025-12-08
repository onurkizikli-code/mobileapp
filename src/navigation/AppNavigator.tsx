import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList, MainTabParamList } from './types';
import { COLORS } from '../constants/theme';

// Screens
import HomeScreen from '../screens/HomeScreen';
import OccasionSelectScreen from '../screens/OccasionSelectScreen';
import CharacterSelectScreen from '../screens/CharacterSelectScreen';
import BackgroundSelectScreen from '../screens/BackgroundSelectScreen';
import MessageComposeScreen from '../screens/MessageComposeScreen';
import PreviewScreen from '../screens/PreviewScreen';
import ShareScreen from '../screens/ShareScreen';
import HistoryScreen from '../screens/HistoryScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'HistoryTab') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'FavoritesTab') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'SettingsTab') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray400,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderTopColor: COLORS.gray200,
          paddingBottom: 8,
          paddingTop: 8,
          height: 64,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ tabBarLabel: 'Ana Sayfa' }}
      />
      <Tab.Screen
        name="HistoryTab"
        component={HistoryScreen}
        options={{ tabBarLabel: 'Geçmiş' }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{ tabBarLabel: 'Favoriler' }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{ tabBarLabel: 'Ayarlar' }}
      />
    </Tab.Navigator>
  );
}

// Ana Navigator
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerBackTitle: 'Geri',
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OccasionSelect"
          component={OccasionSelectScreen}
          options={{ title: 'Özel Gün Seçin' }}
        />
        <Stack.Screen
          name="CharacterSelect"
          component={CharacterSelectScreen}
          options={{ title: 'Karakter Seçin' }}
        />
        <Stack.Screen
          name="BackgroundSelect"
          component={BackgroundSelectScreen}
          options={{ title: 'Arka Plan Seçin' }}
        />
        <Stack.Screen
          name="MessageCompose"
          component={MessageComposeScreen}
          options={{ title: 'Mesajınızı Yazın' }}
        />
        <Stack.Screen
          name="Preview"
          component={PreviewScreen}
          options={{ title: 'Önizleme' }}
        />
        <Stack.Screen
          name="Share"
          component={ShareScreen}
          options={{ title: 'Paylaş' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

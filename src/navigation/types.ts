// Navigasyon Tipleri

export type RootStackParamList = {
  // Ana Tab Navigator
  MainTabs: undefined;

  // Stack Screens
  Home: undefined;
  OccasionSelect: undefined;
  CharacterSelect: { occasionId: string };
  BackgroundSelect: { occasionId: string; characterId: string };
  MessageCompose: {
    occasionId: string;
    characterId: string;
    backgroundId: string;
  };
  Preview: {
    occasionId: string;
    characterId: string;
    backgroundId: string;
    message: string;
    recipientName: string;
  };
  VideoPlayer: { videoUrl: string };
  Share: { videoUrl: string };

  // Diğer Ekranlar
  Settings: undefined;
  History: undefined;
  Favorites: undefined;
  About: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  HistoryTab: undefined;
  FavoritesTab: undefined;
  SettingsTab: undefined;
};

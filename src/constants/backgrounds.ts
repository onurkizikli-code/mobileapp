// Arka Plan Seçenekleri
// Gerçekçi AI ile oluşturulmuş arka planlar

export interface Background {
  id: string;
  name: string;
  nameEn: string;
  category: 'nature' | 'city' | 'abstract' | 'festive' | 'indoor' | 'religious';
  imageUrl: string;
  thumbnailUrl: string;
  color: string;
  tags: string[];
  isPremium: boolean;
  suitableFor: string[]; // Hangi özel günler için uygun
}

export const BACKGROUNDS: Background[] = [
  // Doğa Arka Planları
  {
    id: 'bg_nature_beach_01',
    name: 'Gün Batımı Sahil',
    nameEn: 'Sunset Beach',
    category: 'nature',
    imageUrl: 'backgrounds/nature/beach_sunset.jpg',
    thumbnailUrl: 'backgrounds/nature/beach_sunset_thumb.jpg',
    color: '#F97316',
    tags: ['deniz', 'sahil', 'gün batımı', 'romantik'],
    isPremium: false,
    suitableFor: ['anniversary', 'valentines', 'thank_you'],
  },
  {
    id: 'bg_nature_beach_02',
    name: 'Tropik Sahil',
    nameEn: 'Tropical Beach',
    category: 'nature',
    imageUrl: 'backgrounds/nature/beach_tropical.jpg',
    thumbnailUrl: 'backgrounds/nature/beach_tropical_thumb.jpg',
    color: '#06B6D4',
    tags: ['deniz', 'tropik', 'palmiye', 'yaz'],
    isPremium: false,
    suitableFor: ['birthday', 'new_year', 'congratulations'],
  },
  {
    id: 'bg_nature_sky_01',
    name: 'Mavi Gökyüzü ve Bulutlar',
    nameEn: 'Blue Sky & Clouds',
    category: 'nature',
    imageUrl: 'backgrounds/nature/sky_clouds.jpg',
    thumbnailUrl: 'backgrounds/nature/sky_clouds_thumb.jpg',
    color: '#3B82F6',
    tags: ['gökyüzü', 'bulut', 'mavi', 'huzurlu'],
    isPremium: false,
    suitableFor: ['birthday', 'get_well', 'good_luck'],
  },
  {
    id: 'bg_nature_sky_02',
    name: 'Gün Doğumu Gökyüzü',
    nameEn: 'Sunrise Sky',
    category: 'nature',
    imageUrl: 'backgrounds/nature/sky_sunrise.jpg',
    thumbnailUrl: 'backgrounds/nature/sky_sunrise_thumb.jpg',
    color: '#F59E0B',
    tags: ['gökyüzü', 'gün doğumu', 'turuncu', 'pembe'],
    isPremium: false,
    suitableFor: ['new_year', 'graduation', 'good_luck'],
  },
  {
    id: 'bg_nature_forest_01',
    name: 'Yeşil Orman',
    nameEn: 'Green Forest',
    category: 'nature',
    imageUrl: 'backgrounds/nature/forest_green.jpg',
    thumbnailUrl: 'backgrounds/nature/forest_green_thumb.jpg',
    color: '#10B981',
    tags: ['orman', 'yeşil', 'doğa', 'ağaç'],
    isPremium: false,
    suitableFor: ['birthday', 'get_well', 'thank_you'],
  },
  {
    id: 'bg_nature_mountain_01',
    name: 'Karlı Dağlar',
    nameEn: 'Snowy Mountains',
    category: 'nature',
    imageUrl: 'backgrounds/nature/mountain_snow.jpg',
    thumbnailUrl: 'backgrounds/nature/mountain_snow_thumb.jpg',
    color: '#E2E8F0',
    tags: ['dağ', 'kar', 'kış', 'beyaz'],
    isPremium: false,
    suitableFor: ['christmas', 'new_year'],
  },
  {
    id: 'bg_nature_garden_01',
    name: 'Çiçekli Bahçe',
    nameEn: 'Flower Garden',
    category: 'nature',
    imageUrl: 'backgrounds/nature/garden_flowers.jpg',
    thumbnailUrl: 'backgrounds/nature/garden_flowers_thumb.jpg',
    color: '#EC4899',
    tags: ['bahçe', 'çiçek', 'bahar', 'renkli'],
    isPremium: false,
    suitableFor: ['mothers_day', 'birthday', 'get_well', 'valentines'],
  },
  {
    id: 'bg_nature_waterfall_01',
    name: 'Şelale',
    nameEn: 'Waterfall',
    category: 'nature',
    imageUrl: 'backgrounds/nature/waterfall.jpg',
    thumbnailUrl: 'backgrounds/nature/waterfall_thumb.jpg',
    color: '#0EA5E9',
    tags: ['şelale', 'su', 'doğa', 'huzur'],
    isPremium: false,
    suitableFor: ['birthday', 'anniversary'],
  },

  // Şehir Arka Planları
  {
    id: 'bg_city_night_01',
    name: 'Gece Şehir Işıkları',
    nameEn: 'City Night Lights',
    category: 'city',
    imageUrl: 'backgrounds/city/night_lights.jpg',
    thumbnailUrl: 'backgrounds/city/night_lights_thumb.jpg',
    color: '#1E293B',
    tags: ['şehir', 'gece', 'ışıklar', 'modern'],
    isPremium: false,
    suitableFor: ['new_year', 'birthday', 'congratulations'],
  },
  {
    id: 'bg_city_paris_01',
    name: 'Paris Eyfel Kulesi',
    nameEn: 'Paris Eiffel Tower',
    category: 'city',
    imageUrl: 'backgrounds/city/paris_eiffel.jpg',
    thumbnailUrl: 'backgrounds/city/paris_eiffel_thumb.jpg',
    color: '#6366F1',
    tags: ['paris', 'eyfel', 'romantik', 'gece'],
    isPremium: false,
    suitableFor: ['valentines', 'anniversary', 'engagement'],
  },
  {
    id: 'bg_city_istanbul_01',
    name: 'İstanbul Boğazı',
    nameEn: 'Istanbul Bosphorus',
    category: 'city',
    imageUrl: 'backgrounds/city/istanbul_bosphorus.jpg',
    thumbnailUrl: 'backgrounds/city/istanbul_bosphorus_thumb.jpg',
    color: '#0EA5E9',
    tags: ['istanbul', 'boğaz', 'köprü', 'türkiye'],
    isPremium: false,
    suitableFor: ['birthday', 'ramadan', 'kurban'],
  },

  // Festival/Kutlama Arka Planları
  {
    id: 'bg_festive_birthday_01',
    name: 'Doğum Günü Balonları',
    nameEn: 'Birthday Balloons',
    category: 'festive',
    imageUrl: 'backgrounds/festive/birthday_balloons.jpg',
    thumbnailUrl: 'backgrounds/festive/birthday_balloons_thumb.jpg',
    color: '#EC4899',
    tags: ['doğum günü', 'balon', 'parti', 'renkli'],
    isPremium: false,
    suitableFor: ['birthday'],
  },
  {
    id: 'bg_festive_confetti_01',
    name: 'Konfeti Yağmuru',
    nameEn: 'Confetti Rain',
    category: 'festive',
    imageUrl: 'backgrounds/festive/confetti.jpg',
    thumbnailUrl: 'backgrounds/festive/confetti_thumb.jpg',
    color: '#F59E0B',
    tags: ['konfeti', 'kutlama', 'parti', 'renkli'],
    isPremium: false,
    suitableFor: ['birthday', 'new_year', 'graduation', 'congratulations'],
  },
  {
    id: 'bg_festive_fireworks_01',
    name: 'Havai Fişek',
    nameEn: 'Fireworks',
    category: 'festive',
    imageUrl: 'backgrounds/festive/fireworks.jpg',
    thumbnailUrl: 'backgrounds/festive/fireworks_thumb.jpg',
    color: '#8B5CF6',
    tags: ['havai fişek', 'gece', 'kutlama', 'yılbaşı'],
    isPremium: false,
    suitableFor: ['new_year', 'birthday', 'engagement'],
  },
  {
    id: 'bg_festive_hearts_01',
    name: 'Kalpler',
    nameEn: 'Hearts',
    category: 'festive',
    imageUrl: 'backgrounds/festive/hearts.jpg',
    thumbnailUrl: 'backgrounds/festive/hearts_thumb.jpg',
    color: '#EF4444',
    tags: ['kalp', 'aşk', 'romantik', 'sevgililer günü'],
    isPremium: false,
    suitableFor: ['valentines', 'anniversary', 'engagement'],
  },
  {
    id: 'bg_festive_wedding_01',
    name: 'Düğün Çiçekleri',
    nameEn: 'Wedding Flowers',
    category: 'festive',
    imageUrl: 'backgrounds/festive/wedding_flowers.jpg',
    thumbnailUrl: 'backgrounds/festive/wedding_flowers_thumb.jpg',
    color: '#FDF2F8',
    tags: ['düğün', 'çiçek', 'beyaz', 'romantik'],
    isPremium: false,
    suitableFor: ['anniversary', 'engagement'],
  },

  // Dini Arka Planlar
  {
    id: 'bg_religious_ramadan_01',
    name: 'Ramazan Hilali',
    nameEn: 'Ramadan Crescent',
    category: 'religious',
    imageUrl: 'backgrounds/religious/ramadan_crescent.jpg',
    thumbnailUrl: 'backgrounds/religious/ramadan_crescent_thumb.jpg',
    color: '#059669',
    tags: ['ramazan', 'hilal', 'ay', 'islam'],
    isPremium: false,
    suitableFor: ['ramadan'],
  },
  {
    id: 'bg_religious_mosque_01',
    name: 'Cami Silueti',
    nameEn: 'Mosque Silhouette',
    category: 'religious',
    imageUrl: 'backgrounds/religious/mosque_silhouette.jpg',
    thumbnailUrl: 'backgrounds/religious/mosque_silhouette_thumb.jpg',
    color: '#1E40AF',
    tags: ['cami', 'islam', 'gün batımı', 'siluet'],
    isPremium: false,
    suitableFor: ['ramadan', 'kurban'],
  },
  {
    id: 'bg_religious_christmas_01',
    name: 'Noel Ağacı',
    nameEn: 'Christmas Tree',
    category: 'religious',
    imageUrl: 'backgrounds/religious/christmas_tree.jpg',
    thumbnailUrl: 'backgrounds/religious/christmas_tree_thumb.jpg',
    color: '#166534',
    tags: ['noel', 'ağaç', 'ışıklar', 'kış'],
    isPremium: false,
    suitableFor: ['christmas'],
  },
  {
    id: 'bg_religious_diwali_01',
    name: 'Diwali Kandilleri',
    nameEn: 'Diwali Lamps',
    category: 'religious',
    imageUrl: 'backgrounds/religious/diwali_lamps.jpg',
    thumbnailUrl: 'backgrounds/religious/diwali_lamps_thumb.jpg',
    color: '#F59E0B',
    tags: ['diwali', 'kandil', 'ışık', 'hint'],
    isPremium: false,
    suitableFor: ['diwali'],
  },
  {
    id: 'bg_religious_hanukkah_01',
    name: 'Hanuka Menorası',
    nameEn: 'Hanukkah Menorah',
    category: 'religious',
    imageUrl: 'backgrounds/religious/hanukkah_menorah.jpg',
    thumbnailUrl: 'backgrounds/religious/hanukkah_menorah_thumb.jpg',
    color: '#3B82F6',
    tags: ['hanuka', 'menora', 'mum', 'yahudi'],
    isPremium: false,
    suitableFor: ['hanukkah'],
  },

  // İç Mekan Arka Planları
  {
    id: 'bg_indoor_living_01',
    name: 'Modern Oturma Odası',
    nameEn: 'Modern Living Room',
    category: 'indoor',
    imageUrl: 'backgrounds/indoor/living_room.jpg',
    thumbnailUrl: 'backgrounds/indoor/living_room_thumb.jpg',
    color: '#78716C',
    tags: ['ev', 'oturma odası', 'modern', 'sıcak'],
    isPremium: false,
    suitableFor: ['birthday', 'thank_you', 'get_well'],
  },
  {
    id: 'bg_indoor_office_01',
    name: 'Modern Ofis',
    nameEn: 'Modern Office',
    category: 'indoor',
    imageUrl: 'backgrounds/indoor/office.jpg',
    thumbnailUrl: 'backgrounds/indoor/office_thumb.jpg',
    color: '#64748B',
    tags: ['ofis', 'iş', 'profesyonel', 'modern'],
    isPremium: false,
    suitableFor: ['congratulations', 'good_luck', 'thank_you'],
  },
  {
    id: 'bg_indoor_studio_01',
    name: 'Stüdyo Işıkları',
    nameEn: 'Studio Lights',
    category: 'indoor',
    imageUrl: 'backgrounds/indoor/studio.jpg',
    thumbnailUrl: 'backgrounds/indoor/studio_thumb.jpg',
    color: '#A1A1AA',
    tags: ['stüdyo', 'profesyonel', 'nötr', 'ışık'],
    isPremium: false,
    suitableFor: ['birthday', 'congratulations', 'thank_you'],
  },

  // Soyut Arka Planlar
  {
    id: 'bg_abstract_gradient_01',
    name: 'Mor-Pembe Gradient',
    nameEn: 'Purple-Pink Gradient',
    category: 'abstract',
    imageUrl: 'backgrounds/abstract/gradient_purple_pink.jpg',
    thumbnailUrl: 'backgrounds/abstract/gradient_purple_pink_thumb.jpg',
    color: '#A855F7',
    tags: ['gradient', 'mor', 'pembe', 'modern'],
    isPremium: false,
    suitableFor: ['birthday', 'valentines', 'thank_you'],
  },
  {
    id: 'bg_abstract_gradient_02',
    name: 'Mavi-Yeşil Gradient',
    nameEn: 'Blue-Green Gradient',
    category: 'abstract',
    imageUrl: 'backgrounds/abstract/gradient_blue_green.jpg',
    thumbnailUrl: 'backgrounds/abstract/gradient_blue_green_thumb.jpg',
    color: '#06B6D4',
    tags: ['gradient', 'mavi', 'yeşil', 'modern'],
    isPremium: false,
    suitableFor: ['birthday', 'get_well', 'good_luck'],
  },
  {
    id: 'bg_abstract_bokeh_01',
    name: 'Bokeh Işıkları',
    nameEn: 'Bokeh Lights',
    category: 'abstract',
    imageUrl: 'backgrounds/abstract/bokeh_lights.jpg',
    thumbnailUrl: 'backgrounds/abstract/bokeh_lights_thumb.jpg',
    color: '#F59E0B',
    tags: ['bokeh', 'ışık', 'blur', 'sıcak'],
    isPremium: false,
    suitableFor: ['birthday', 'new_year', 'christmas'],
  },
];

// Kategoriler
export const BACKGROUND_CATEGORIES = {
  nature: {
    name: 'Doğa',
    nameEn: 'Nature',
    icon: '🌿',
  },
  city: {
    name: 'Şehir',
    nameEn: 'City',
    icon: '🏙️',
  },
  festive: {
    name: 'Kutlama',
    nameEn: 'Festive',
    icon: '🎉',
  },
  religious: {
    name: 'Dini',
    nameEn: 'Religious',
    icon: '🙏',
  },
  indoor: {
    name: 'İç Mekan',
    nameEn: 'Indoor',
    icon: '🏠',
  },
  abstract: {
    name: 'Soyut',
    nameEn: 'Abstract',
    icon: '🎨',
  },
};

// Yardımcı Fonksiyonlar
export const getBackgroundById = (id: string): Background | undefined => {
  return BACKGROUNDS.find(bg => bg.id === id);
};

export const getBackgroundsByCategory = (category: Background['category']): Background[] => {
  return BACKGROUNDS.filter(bg => bg.category === category);
};

export const getBackgroundsForOccasion = (occasionId: string): Background[] => {
  return BACKGROUNDS.filter(bg => bg.suitableFor.includes(occasionId));
};

export const searchBackgrounds = (query: string): Background[] => {
  const lowerQuery = query.toLowerCase();
  return BACKGROUNDS.filter(bg =>
    bg.name.toLowerCase().includes(lowerQuery) ||
    bg.nameEn.toLowerCase().includes(lowerQuery) ||
    bg.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

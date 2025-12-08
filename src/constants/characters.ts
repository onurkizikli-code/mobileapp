// Karakter/Avatar Verileri
// AI ile oluşturulmuş gerçekçi karakterler

export interface Character {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'non-binary';
  ethnicity: string;
  skinTone: string;
  ageGroup: 'young' | 'adult' | 'middle-aged' | 'senior';
  style: string;
  culturalBackground: string;
  clothing: string;
  imageUrl: string;
  voiceId: string;
  voiceLanguage: string;
  tags: string[];
  isPremium: boolean;
}

// Karakter Koleksiyonu
export const CHARACTERS: Character[] = [
  // Türk Karakterler
  {
    id: 'char_tr_female_01',
    name: 'Ayşe',
    gender: 'female',
    ethnicity: 'Turkish',
    skinTone: 'light',
    ageGroup: 'adult',
    style: 'modern',
    culturalBackground: 'Turkish',
    clothing: 'Modern iş kıyafeti',
    imageUrl: 'characters/turkish/female_01.jpg',
    voiceId: 'tr-TR-EmelNeural',
    voiceLanguage: 'tr-TR',
    tags: ['türk', 'kadın', 'modern', 'profesyonel'],
    isPremium: false,
  },
  {
    id: 'char_tr_male_01',
    name: 'Mehmet',
    gender: 'male',
    ethnicity: 'Turkish',
    skinTone: 'medium',
    ageGroup: 'adult',
    style: 'modern',
    culturalBackground: 'Turkish',
    clothing: 'Casual şık',
    imageUrl: 'characters/turkish/male_01.jpg',
    voiceId: 'tr-TR-AhmetNeural',
    voiceLanguage: 'tr-TR',
    tags: ['türk', 'erkek', 'modern'],
    isPremium: false,
  },
  {
    id: 'char_tr_female_02',
    name: 'Fatma',
    gender: 'female',
    ethnicity: 'Turkish',
    skinTone: 'medium',
    ageGroup: 'middle-aged',
    style: 'traditional',
    culturalBackground: 'Turkish',
    clothing: 'Geleneksel başörtüsü',
    imageUrl: 'characters/turkish/female_02.jpg',
    voiceId: 'tr-TR-EmelNeural',
    voiceLanguage: 'tr-TR',
    tags: ['türk', 'kadın', 'geleneksel', 'başörtülü'],
    isPremium: false,
  },

  // Arap Karakterler
  {
    id: 'char_ar_female_01',
    name: 'Fatima',
    gender: 'female',
    ethnicity: 'Arab',
    skinTone: 'medium',
    ageGroup: 'adult',
    style: 'modern',
    culturalBackground: 'Middle Eastern',
    clothing: 'Modern hijab',
    imageUrl: 'characters/arab/female_01.jpg',
    voiceId: 'ar-SA-ZariyahNeural',
    voiceLanguage: 'ar-SA',
    tags: ['arap', 'kadın', 'hijab', 'modern'],
    isPremium: false,
  },
  {
    id: 'char_ar_male_01',
    name: 'Ahmed',
    gender: 'male',
    ethnicity: 'Arab',
    skinTone: 'medium',
    ageGroup: 'adult',
    style: 'traditional',
    culturalBackground: 'Middle Eastern',
    clothing: 'Geleneksel thobe',
    imageUrl: 'characters/arab/male_01.jpg',
    voiceId: 'ar-SA-HamedNeural',
    voiceLanguage: 'ar-SA',
    tags: ['arap', 'erkek', 'geleneksel'],
    isPremium: false,
  },

  // Avrupa Karakterler
  {
    id: 'char_eu_female_01',
    name: 'Emma',
    gender: 'female',
    ethnicity: 'European',
    skinTone: 'light',
    ageGroup: 'young',
    style: 'modern',
    culturalBackground: 'Western European',
    clothing: 'Casual modern',
    imageUrl: 'characters/european/female_01.jpg',
    voiceId: 'en-GB-SoniaNeural',
    voiceLanguage: 'en-GB',
    tags: ['avrupalı', 'kadın', 'modern', 'genç'],
    isPremium: false,
  },
  {
    id: 'char_eu_male_01',
    name: 'James',
    gender: 'male',
    ethnicity: 'European',
    skinTone: 'light',
    ageGroup: 'adult',
    style: 'formal',
    culturalBackground: 'Western European',
    clothing: 'İş kıyafeti',
    imageUrl: 'characters/european/male_01.jpg',
    voiceId: 'en-GB-RyanNeural',
    voiceLanguage: 'en-GB',
    tags: ['avrupalı', 'erkek', 'profesyonel'],
    isPremium: false,
  },

  // Afrika Karakterler
  {
    id: 'char_af_female_01',
    name: 'Amara',
    gender: 'female',
    ethnicity: 'African',
    skinTone: 'dark',
    ageGroup: 'adult',
    style: 'modern',
    culturalBackground: 'West African',
    clothing: 'Modern Ankara tarzı',
    imageUrl: 'characters/african/female_01.jpg',
    voiceId: 'en-NG-EzinneNeural',
    voiceLanguage: 'en-NG',
    tags: ['afrikalı', 'kadın', 'modern', 'renkli'],
    isPremium: false,
  },
  {
    id: 'char_af_male_01',
    name: 'Kwame',
    gender: 'male',
    ethnicity: 'African',
    skinTone: 'dark',
    ageGroup: 'adult',
    style: 'traditional',
    culturalBackground: 'West African',
    clothing: 'Geleneksel Dashiki',
    imageUrl: 'characters/african/male_01.jpg',
    voiceId: 'en-NG-AbeoNeural',
    voiceLanguage: 'en-NG',
    tags: ['afrikalı', 'erkek', 'geleneksel'],
    isPremium: false,
  },

  // Asya Karakterler
  {
    id: 'char_as_female_01',
    name: 'Yuki',
    gender: 'female',
    ethnicity: 'East Asian',
    skinTone: 'light',
    ageGroup: 'young',
    style: 'modern',
    culturalBackground: 'Japanese',
    clothing: 'Modern Japon tarzı',
    imageUrl: 'characters/asian/female_01.jpg',
    voiceId: 'ja-JP-NanamiNeural',
    voiceLanguage: 'ja-JP',
    tags: ['asyalı', 'kadın', 'japon', 'modern'],
    isPremium: false,
  },
  {
    id: 'char_as_male_01',
    name: 'Wei',
    gender: 'male',
    ethnicity: 'East Asian',
    skinTone: 'light',
    ageGroup: 'adult',
    style: 'modern',
    culturalBackground: 'Chinese',
    clothing: 'Modern iş kıyafeti',
    imageUrl: 'characters/asian/male_01.jpg',
    voiceId: 'zh-CN-YunxiNeural',
    voiceLanguage: 'zh-CN',
    tags: ['asyalı', 'erkek', 'çinli', 'profesyonel'],
    isPremium: false,
  },
  {
    id: 'char_as_female_02',
    name: 'Priya',
    gender: 'female',
    ethnicity: 'South Asian',
    skinTone: 'medium',
    ageGroup: 'adult',
    style: 'traditional',
    culturalBackground: 'Indian',
    clothing: 'Geleneksel Sari',
    imageUrl: 'characters/asian/female_02.jpg',
    voiceId: 'hi-IN-SwaraNeural',
    voiceLanguage: 'hi-IN',
    tags: ['asyalı', 'kadın', 'hintli', 'geleneksel', 'sari'],
    isPremium: false,
  },
  {
    id: 'char_as_male_02',
    name: 'Raj',
    gender: 'male',
    ethnicity: 'South Asian',
    skinTone: 'medium',
    ageGroup: 'adult',
    style: 'modern',
    culturalBackground: 'Indian',
    clothing: 'Modern kurta',
    imageUrl: 'characters/asian/male_02.jpg',
    voiceId: 'hi-IN-MadhurNeural',
    voiceLanguage: 'hi-IN',
    tags: ['asyalı', 'erkek', 'hintli', 'modern'],
    isPremium: false,
  },

  // Latin Amerika Karakterler
  {
    id: 'char_la_female_01',
    name: 'Maria',
    gender: 'female',
    ethnicity: 'Latin American',
    skinTone: 'medium',
    ageGroup: 'adult',
    style: 'modern',
    culturalBackground: 'Mexican',
    clothing: 'Modern Latin tarzı',
    imageUrl: 'characters/latin/female_01.jpg',
    voiceId: 'es-MX-DaliaNeural',
    voiceLanguage: 'es-MX',
    tags: ['latin', 'kadın', 'meksikalı', 'modern'],
    isPremium: false,
  },
  {
    id: 'char_la_male_01',
    name: 'Carlos',
    gender: 'male',
    ethnicity: 'Latin American',
    skinTone: 'medium',
    ageGroup: 'adult',
    style: 'casual',
    culturalBackground: 'Brazilian',
    clothing: 'Casual şık',
    imageUrl: 'characters/latin/male_01.jpg',
    voiceId: 'pt-BR-AntonioNeural',
    voiceLanguage: 'pt-BR',
    tags: ['latin', 'erkek', 'brezilyalı'],
    isPremium: false,
  },

  // Yaşlı Karakterler
  {
    id: 'char_senior_female_01',
    name: 'Güler Nine',
    gender: 'female',
    ethnicity: 'Turkish',
    skinTone: 'light',
    ageGroup: 'senior',
    style: 'traditional',
    culturalBackground: 'Turkish',
    clothing: 'Geleneksel Anadolu',
    imageUrl: 'characters/senior/female_01.jpg',
    voiceId: 'tr-TR-EmelNeural',
    voiceLanguage: 'tr-TR',
    tags: ['türk', 'kadın', 'yaşlı', 'nine', 'geleneksel'],
    isPremium: false,
  },
  {
    id: 'char_senior_male_01',
    name: 'Hasan Dede',
    gender: 'male',
    ethnicity: 'Turkish',
    skinTone: 'medium',
    ageGroup: 'senior',
    style: 'traditional',
    culturalBackground: 'Turkish',
    clothing: 'Geleneksel',
    imageUrl: 'characters/senior/male_01.jpg',
    voiceId: 'tr-TR-AhmetNeural',
    voiceLanguage: 'tr-TR',
    tags: ['türk', 'erkek', 'yaşlı', 'dede', 'geleneksel'],
    isPremium: false,
  },

  // Çocuk Karakterler
  {
    id: 'char_child_female_01',
    name: 'Elif',
    gender: 'female',
    ethnicity: 'Turkish',
    skinTone: 'light',
    ageGroup: 'young',
    style: 'playful',
    culturalBackground: 'Turkish',
    clothing: 'Renkli çocuk kıyafeti',
    imageUrl: 'characters/children/female_01.jpg',
    voiceId: 'tr-TR-EmelNeural',
    voiceLanguage: 'tr-TR',
    tags: ['türk', 'kız', 'çocuk', 'sevimli'],
    isPremium: false,
  },
  {
    id: 'char_child_male_01',
    name: 'Ali',
    gender: 'male',
    ethnicity: 'Turkish',
    skinTone: 'medium',
    ageGroup: 'young',
    style: 'playful',
    culturalBackground: 'Turkish',
    clothing: 'Renkli çocuk kıyafeti',
    imageUrl: 'characters/children/male_01.jpg',
    voiceId: 'tr-TR-AhmetNeural',
    voiceLanguage: 'tr-TR',
    tags: ['türk', 'erkek', 'çocuk', 'sevimli'],
    isPremium: false,
  },
];

// Filtreleme Seçenekleri
export const FILTER_OPTIONS = {
  gender: [
    { id: 'all', label: 'Tümü', labelEn: 'All' },
    { id: 'female', label: 'Kadın', labelEn: 'Female' },
    { id: 'male', label: 'Erkek', labelEn: 'Male' },
  ],
  ethnicity: [
    { id: 'all', label: 'Tümü', labelEn: 'All' },
    { id: 'Turkish', label: 'Türk', labelEn: 'Turkish' },
    { id: 'Arab', label: 'Arap', labelEn: 'Arab' },
    { id: 'European', label: 'Avrupalı', labelEn: 'European' },
    { id: 'African', label: 'Afrikalı', labelEn: 'African' },
    { id: 'East Asian', label: 'Doğu Asyalı', labelEn: 'East Asian' },
    { id: 'South Asian', label: 'Güney Asyalı', labelEn: 'South Asian' },
    { id: 'Latin American', label: 'Latin Amerikalı', labelEn: 'Latin American' },
  ],
  ageGroup: [
    { id: 'all', label: 'Tümü', labelEn: 'All' },
    { id: 'young', label: 'Genç', labelEn: 'Young' },
    { id: 'adult', label: 'Yetişkin', labelEn: 'Adult' },
    { id: 'middle-aged', label: 'Orta Yaş', labelEn: 'Middle-aged' },
    { id: 'senior', label: 'Yaşlı', labelEn: 'Senior' },
  ],
  style: [
    { id: 'all', label: 'Tümü', labelEn: 'All' },
    { id: 'modern', label: 'Modern', labelEn: 'Modern' },
    { id: 'traditional', label: 'Geleneksel', labelEn: 'Traditional' },
    { id: 'formal', label: 'Resmi', labelEn: 'Formal' },
    { id: 'casual', label: 'Casual', labelEn: 'Casual' },
  ],
};

// Yardımcı Fonksiyonlar
export const getCharacterById = (id: string): Character | undefined => {
  return CHARACTERS.find(char => char.id === id);
};

export const getCharactersByGender = (gender: string): Character[] => {
  if (gender === 'all') return CHARACTERS;
  return CHARACTERS.filter(char => char.gender === gender);
};

export const getCharactersByEthnicity = (ethnicity: string): Character[] => {
  if (ethnicity === 'all') return CHARACTERS;
  return CHARACTERS.filter(char => char.ethnicity === ethnicity);
};

export const filterCharacters = (filters: {
  gender?: string;
  ethnicity?: string;
  ageGroup?: string;
  style?: string;
}): Character[] => {
  return CHARACTERS.filter(char => {
    if (filters.gender && filters.gender !== 'all' && char.gender !== filters.gender) return false;
    if (filters.ethnicity && filters.ethnicity !== 'all' && char.ethnicity !== filters.ethnicity) return false;
    if (filters.ageGroup && filters.ageGroup !== 'all' && char.ageGroup !== filters.ageGroup) return false;
    if (filters.style && filters.style !== 'all' && char.style !== filters.style) return false;
    return true;
  });
};

export const searchCharacters = (query: string): Character[] => {
  const lowerQuery = query.toLowerCase();
  return CHARACTERS.filter(char =>
    char.name.toLowerCase().includes(lowerQuery) ||
    char.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

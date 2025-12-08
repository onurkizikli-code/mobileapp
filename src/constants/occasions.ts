// Özel Günler ve Kutlama Türleri

export interface Occasion {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  color: string;
  backgroundColor: string;
  defaultMessage: string;
  keywords: string[];
  category: 'celebration' | 'religious' | 'personal' | 'national';
}

export const OCCASIONS: Occasion[] = [
  // Kutlamalar
  {
    id: 'birthday',
    name: 'Doğum Günü',
    nameEn: 'Birthday',
    icon: '🎂',
    color: '#EC4899',
    backgroundColor: '#FDF2F8',
    defaultMessage: 'Nice mutlu yıllara! Bu özel günün sana bol şans, sağlık ve mutluluk getirmesini diliyorum.',
    keywords: ['doğum günü', 'yaş günü', 'birthday'],
    category: 'celebration',
  },
  {
    id: 'anniversary',
    name: 'Evlilik Yıldönümü',
    nameEn: 'Wedding Anniversary',
    icon: '💒',
    color: '#F59E0B',
    backgroundColor: '#FFFBEB',
    defaultMessage: 'Nice mutlu yıllara! Sevginiz her geçen gün daha da büyüsün.',
    keywords: ['evlilik', 'yıldönümü', 'nikah', 'düğün'],
    category: 'personal',
  },
  {
    id: 'valentines',
    name: 'Sevgililer Günü',
    nameEn: "Valentine's Day",
    icon: '❤️',
    color: '#EF4444',
    backgroundColor: '#FEF2F2',
    defaultMessage: 'Sevgililer Günün kutlu olsun! Seninle geçirdiğim her an çok değerli.',
    keywords: ['sevgililer', 'aşk', 'valentine'],
    category: 'celebration',
  },
  {
    id: 'new_year',
    name: 'Yeni Yıl',
    nameEn: 'New Year',
    icon: '🎊',
    color: '#8B5CF6',
    backgroundColor: '#F5F3FF',
    defaultMessage: 'Yeni yılın sana sağlık, mutluluk ve başarı getirmesini diliyorum!',
    keywords: ['yeni yıl', 'yılbaşı', 'new year'],
    category: 'celebration',
  },
  {
    id: 'mothers_day',
    name: 'Anneler Günü',
    nameEn: "Mother's Day",
    icon: '👩',
    color: '#EC4899',
    backgroundColor: '#FDF2F8',
    defaultMessage: 'Canım annem, Anneler Günün kutlu olsun! Senin gibi bir anneye sahip olduğum için çok şanslıyım.',
    keywords: ['anne', 'anneler', 'mother'],
    category: 'personal',
  },
  {
    id: 'fathers_day',
    name: 'Babalar Günü',
    nameEn: "Father's Day",
    icon: '👨',
    color: '#3B82F6',
    backgroundColor: '#EFF6FF',
    defaultMessage: 'Canım babam, Babalar Günün kutlu olsun! Her zaman yanımda olduğun için teşekkür ederim.',
    keywords: ['baba', 'babalar', 'father'],
    category: 'personal',
  },
  {
    id: 'graduation',
    name: 'Mezuniyet',
    nameEn: 'Graduation',
    icon: '🎓',
    color: '#10B981',
    backgroundColor: '#ECFDF5',
    defaultMessage: 'Mezuniyetin kutlu olsun! Başarılarla dolu bir gelecek seni bekliyor.',
    keywords: ['mezuniyet', 'diploma', 'graduation', 'okul'],
    category: 'celebration',
  },
  {
    id: 'engagement',
    name: 'Nişan',
    nameEn: 'Engagement',
    icon: '💍',
    color: '#F59E0B',
    backgroundColor: '#FFFBEB',
    defaultMessage: 'Nişanınız kutlu olsun! Ömür boyu mutluluklar diliyorum.',
    keywords: ['nişan', 'engagement', 'söz'],
    category: 'personal',
  },
  {
    id: 'baby',
    name: 'Bebek',
    nameEn: 'New Baby',
    icon: '👶',
    color: '#06B6D4',
    backgroundColor: '#ECFEFF',
    defaultMessage: 'Yeni bebeğiniz için tebrikler! Ailenize mutluluk ve sağlık diliyorum.',
    keywords: ['bebek', 'doğum', 'baby', 'anne olma', 'baba olma'],
    category: 'personal',
  },

  // Dini Bayramlar
  {
    id: 'ramadan',
    name: 'Ramazan Bayramı',
    nameEn: 'Eid al-Fitr',
    icon: '🌙',
    color: '#059669',
    backgroundColor: '#ECFDF5',
    defaultMessage: 'Ramazan Bayramınız mübarek olsun! Sağlık, huzur ve mutluluk dolu nice bayramlara.',
    keywords: ['ramazan', 'bayram', 'eid', 'şeker bayramı'],
    category: 'religious',
  },
  {
    id: 'kurban',
    name: 'Kurban Bayramı',
    nameEn: 'Eid al-Adha',
    icon: '🕌',
    color: '#059669',
    backgroundColor: '#ECFDF5',
    defaultMessage: 'Kurban Bayramınız mübarek olsun! Sağlık ve mutluluk dolu nice bayramlara.',
    keywords: ['kurban', 'bayram', 'eid al adha'],
    category: 'religious',
  },
  {
    id: 'christmas',
    name: 'Noel',
    nameEn: 'Christmas',
    icon: '🎄',
    color: '#DC2626',
    backgroundColor: '#FEF2F2',
    defaultMessage: 'Merry Christmas! Bu özel günün sevdiklerinle mutluluk içinde geçmesini diliyorum.',
    keywords: ['noel', 'christmas', 'yılbaşı'],
    category: 'religious',
  },
  {
    id: 'hanukkah',
    name: 'Hanuka',
    nameEn: 'Hanukkah',
    icon: '🕎',
    color: '#3B82F6',
    backgroundColor: '#EFF6FF',
    defaultMessage: 'Happy Hanukkah! Işıklar Festivali\'nin sana ve ailene mutluluk getirmesini diliyorum.',
    keywords: ['hanuka', 'hanukkah', 'chanukah'],
    category: 'religious',
  },
  {
    id: 'diwali',
    name: 'Diwali',
    nameEn: 'Diwali',
    icon: '🪔',
    color: '#F59E0B',
    backgroundColor: '#FFFBEB',
    defaultMessage: 'Happy Diwali! Işıklar Festivali\'nin hayatına aydınlık ve mutluluk getirmesini diliyorum.',
    keywords: ['diwali', 'deepavali', 'ışık festivali'],
    category: 'religious',
  },
  {
    id: 'easter',
    name: 'Paskalya',
    nameEn: 'Easter',
    icon: '🐰',
    color: '#A855F7',
    backgroundColor: '#FAF5FF',
    defaultMessage: 'Happy Easter! Bu özel günün sana ve ailene mutluluk getirmesini diliyorum.',
    keywords: ['paskalya', 'easter'],
    category: 'religious',
  },

  // Genel
  {
    id: 'thank_you',
    name: 'Teşekkür',
    nameEn: 'Thank You',
    icon: '🙏',
    color: '#6366F1',
    backgroundColor: '#EEF2FF',
    defaultMessage: 'Sana çok teşekkür ederim! Desteğin ve yardımın için minnettarım.',
    keywords: ['teşekkür', 'thank', 'minnet'],
    category: 'personal',
  },
  {
    id: 'get_well',
    name: 'Geçmiş Olsun',
    nameEn: 'Get Well Soon',
    icon: '💐',
    color: '#10B981',
    backgroundColor: '#ECFDF5',
    defaultMessage: 'Geçmiş olsun! Bir an önce sağlığına kavuşmanı diliyorum.',
    keywords: ['geçmiş olsun', 'hastalık', 'get well', 'sağlık'],
    category: 'personal',
  },
  {
    id: 'congratulations',
    name: 'Tebrikler',
    nameEn: 'Congratulations',
    icon: '🎉',
    color: '#F59E0B',
    backgroundColor: '#FFFBEB',
    defaultMessage: 'Tebrikler! Bu başarın için seni kutluyorum!',
    keywords: ['tebrik', 'başarı', 'congratulations'],
    category: 'celebration',
  },
  {
    id: 'good_luck',
    name: 'İyi Şanslar',
    nameEn: 'Good Luck',
    icon: '🍀',
    color: '#10B981',
    backgroundColor: '#ECFDF5',
    defaultMessage: 'Bol şanslar diliyorum! Başarıların daim olsun.',
    keywords: ['şans', 'başarı', 'luck'],
    category: 'personal',
  },
];

// Kategorilere göre grupla
export const OCCASION_CATEGORIES = {
  celebration: {
    name: 'Kutlamalar',
    nameEn: 'Celebrations',
    icon: '🎉',
  },
  religious: {
    name: 'Dini Bayramlar',
    nameEn: 'Religious Holidays',
    icon: '🙏',
  },
  personal: {
    name: 'Kişisel',
    nameEn: 'Personal',
    icon: '💝',
  },
  national: {
    name: 'Milli Günler',
    nameEn: 'National Days',
    icon: '🏳️',
  },
};

// Özel gün ID'sine göre bul
export const getOccasionById = (id: string): Occasion | undefined => {
  return OCCASIONS.find(occasion => occasion.id === id);
};

// Kategoriye göre filtrele
export const getOccasionsByCategory = (category: Occasion['category']): Occasion[] => {
  return OCCASIONS.filter(occasion => occasion.category === category);
};

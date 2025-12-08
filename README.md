# CelebVerse - Kişiselleştirilmiş Kutlama Mesajları

Farklı kültürlerden, etnik kökenlerden ve stillerden AI karakterlerle kişiselleştirilmiş video mesajlar oluşturun.

## Uygulama Özellikleri

### Ana Özellikler
- 🎭 **Çeşitli Karakterler**: Farklı etnik kökenler, ten renkleri, kıyafetler, kültürel öğeler
- 🎬 **AI Video Oluşturma**: Gerçekçi animasyonlu videolar
- 🔊 **Sesli Mesajlar**: Text-to-Speech ile kendi mesajınız seslendirilir
- 🎨 **Arka Plan Seçimi**: Deniz, bulut, doğa, şehir ve daha fazlası
- 📱 **Kolay Paylaşım**: WhatsApp, Instagram ve diğer platformlara direkt paylaşım

### Desteklenen Özel Günler
- 🎂 Doğum Günü
- 💒 Evlilik Yıldönümü
- ❤️ Sevgililer Günü
- 🌙 Ramazan Bayramı
- 🎄 Noel
- 🪔 Diwali
- 🕎 Hanukkah
- 🎊 Yeni Yıl
- 👩 Anneler Günü
- 👨 Babalar Günü
- Ve daha fazlası...

## Teknoloji Stack

### Frontend (Mobil Uygulama)
- **React Native** - Cross-platform mobil geliştirme
- **Expo** - Hızlı geliştirme ve deployment
- **React Navigation** - Ekran navigasyonu
- **React Native Video** - Video oynatma
- **React Native Share** - Sosyal medya paylaşımı

### Backend & AI Servisleri
- **Node.js + Express** - API sunucusu
- **AI Video Generation** - D-ID / HeyGen / Synthesia API
- **Text-to-Speech** - Google Cloud TTS / Amazon Polly
- **Cloud Storage** - AWS S3 / Google Cloud Storage

### Veritabanı
- **Firebase** - Kullanıcı verileri ve analytics
- **MongoDB** - Şablon ve karakter verileri

## Ekran Akışı

```
Ana Sayfa → Özel Gün Seçimi → Karakter Seçimi → Arka Plan Seçimi → Mesaj Yazma → Önizleme → Paylaşım
```

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Uygulamayı başlat
npm start

# iOS için
npm run ios

# Android için
npm run android
```

## Proje Yapısı

```
src/
├── components/          # Yeniden kullanılabilir bileşenler
├── screens/            # Uygulama ekranları
├── navigation/         # Navigasyon yapılandırması
├── services/           # API servisleri
├── assets/             # Görseller, fontlar
├── constants/          # Sabit değerler
├── hooks/              # Custom React hooks
├── context/            # Global state yönetimi
└── utils/              # Yardımcı fonksiyonlar
```

## Lisans

Bu proje özel kullanım içindir.

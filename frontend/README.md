
# Kampüs Etkinlikleri (Sprint 4 - React & TypeScript)

Bu proje, daha önce temel HTML/JS ile hazırlanan Kampüs Etkinlikleri uygulamasının React, TypeScript ve Vite kullanılarak yeniden yapılandırılmış halidir.

## Proje Dosyaları ve Görevleri

*   **`package.json`**: Proje adı, çalıştırılacak komutlar (dev, build) ve kullanılan paketlerin listesini barındırır.
*   **`vite.config.ts`**: Vite sunucu ayarlarını ve React eklentisini içerir.
*   **`index.html`**: Tarayıcıda açılan tek HTML dosyasıdır; içinde React'in yerleşeceği boş `div#root` etiketini tutar.
*   **`src/main.tsx`**: React dünyasına giriş dosyasıdır, `App` bileşenini alıp DOM'daki root elementine çizer.
*   **`src/App.tsx`**: Uygulamanın ana bileşenidir; sayfa geçişlerini (state ile), arama/filtreleme mantığını ve tüm JSX (HTML) yapısını içerir.
*   **`src/App.css`**: Uygulamanın tüm tasarımını (renkler, grid yapısı, butonlar) belirleyen stil dosyasıdır.
*   **`src/types/campus-event.ts`**: Etkinlik objesinin hangi alanlara sahip olması gerektiğini belirten TypeScript veri tiplerini tanımlar.
*   **`src/data/events.ts`**: Uygulamada sergilenen sabit etkinlik verilerini (dizi olarak) tutar.
*   **`src/utils/filter-events.ts`**: Arama, kategoriye göre filtreleme ve ID ile etkinlik bulma işlemlerini yapan saf (DOM'a dokunmayan) fonksiyonları barındırır.

## Kurulum ve Çalıştırma

Projeyi bilgisayarınızda çalıştırmak için sırasıyla şu komutları kullanabilirsiniz:

1. Bağımlılıkları yüklemek için: `npm install`
2. Geliştirme sunucusunu başlatmak için: `npm run dev`
3. Projeyi yayına (production) hazırlamak için: `npm run build`
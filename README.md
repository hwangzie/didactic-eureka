# Community Stats - Mageran Virtual Job Fair

Aplikasi web interaktif yang menampilkan virtual office dengan gaya pixel art untuk menghitung dan menampilkan statistik pengunjung.

## 🎮 Fitur

- **Pixel Office** - Tampilan kantor virtual dengan desain pixel art
- **Live Visitor Counter** - Menghitung pengunjung secara real-time
- **Animated Characters** - Karakter animasi yang muncul saat pengunjung bergabung
- **Responsive Design** - Tampilan yang responsif di berbagai perangkat

## 🛠️ Tech Stack

- **Framework**: Laravel
- **Frontend**: Blade Templates, Vite
- **Styling**: Custom CSS (Pixel Art Theme)
- **JavaScript**: Vanilla JS untuk interaktivitas

## 📁 Struktur Project

```
community-stats/
├── resources/
│   ├── css/
│   │   └── pixel-office.css
│   ├── js/
│   │   └── pixel-office.js
│   └── views/
│       ├── landing.blade.php
│       ├── components/
│       │   └── pixel-office.blade.php
│       └── layouts/
│           └── app.blade.php
├── routes/
│   ├── web.php
│   └── console.php
└── public/
    └── images/
        └── character/
```

## 🚀 Instalasi

1. Clone repository
   ```bash
   git clone <repository-url>
   cd community-stats
   ```

2. Install dependencies
   ```bash
   composer install
   npm install
   ```

3. Copy environment file
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. Build assets
   ```bash
   npm run build
   ```

5. Jalankan server
   ```bash
   php artisan serve
   ```

## 📝 Konfigurasi

- **Max Characters**: 500 karakter dapat ditampilkan secara bersamaan di virtual office
- **Character Path**: `/images/character` - lokasi sprite karakter

## 📄 License

MIT License

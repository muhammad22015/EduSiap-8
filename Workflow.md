# Workflow Penggunaan GitHub Branch dalam Pengembangan Website EduSiap

## 📌 Pendahuluan
Repositori ini digunakan untuk pengembangan website EduSiap dengan metode pengelolaan branch yang sistematis untuk memastikan kolaborasi yang efisien dan minim konflik dalam pengembangan kode.

## 📂 Struktur Branch
Kami menggunakan strategi branching berbasis Git Flow, dengan struktur utama sebagai berikut:

- `main` → Branch utama yang berisi kode stabil dan siap dirilis.
- `develop` → Branch pengembangan yang mengintegrasikan fitur sebelum dipindahkan ke `main`.
- `feature/{nama-fitur}` → Branch untuk pengembangan fitur baru.
- `bugfix/{nama-bug}` → Branch untuk perbaikan bug pada branch `develop`.
- `hotfix/{nama-hotfix}` → Branch untuk perbaikan kritis pada `main`.
- `release/{versi}` → Branch yang digunakan untuk persiapan rilis versi baru.

## 🔄 Workflow Pengembangan
1. **Clone Repositori**
   ```bash
   git clone https://github.com/muhammad22015/EduSiap-8.git
   cd Edusiap-8
   ```
2. **Buat Branch Baru untuk Fitur**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/nama-fitur
   ```
3. **Lakukan Perubahan dan Commit**
   ```bash
   git add .
   git commit -m "Menambahkan fitur X"
   ```
4. **Push Branch ke Remote**
   ```bash
   git push origin feature/nama-fitur
   ```
5. **Buat Pull Request ke `develop`**
   - Buka GitHub
   - Pilih branch `feature/nama-fitur`
   - Klik "Compare & pull request"
   - Tambahkan deskripsi perubahan
   - Assign ke reviewer dan submit PR
6. **Merge ke `develop`**
   - Setelah direview dan disetujui, merge PR ke `develop`
7. **Mempersiapkan Rilis**
   - Buat branch `release/{versi}` dari `develop`
   - Lakukan final testing dan dokumentasi
   - Merge `release/{versi}` ke `main` dan `develop`
   - Tambahkan tag versi baru:
     ```bash
     git tag -a v1.0.0 -m "Rilis versi 1.0.0"
     git push origin v1.0.0
     ```

## 🚀 Perbaikan Bug
1. **Perbaikan Bug dalam Pengembangan**
   ```bash
   git checkout -b bugfix/nama-bug develop
   ```
2. **Perbaikan Bug dalam Produksi**
   ```bash
   git checkout -b hotfix/nama-hotfix main
   ```
3. **Setelah Fix, Merge ke `develop` dan `main` jika perlu**

## 📌 Catatan Tambahan
- Selalu **pull branch terbaru** sebelum memulai pekerjaan.
- Gunakan **commit message yang deskriptif**.
- Hindari **commit besar**, buat commit kecil dan bertahap.
- **Review code sebelum merge ke develop atau main**.

Selamat coding! 🚀

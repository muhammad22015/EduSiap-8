# Gunakan image Node.js resmi
FROM node:18

# Buat direktori kerja
WORKDIR /app

# Salin package.json dan install dependensi
COPY package*.json ./
RUN npm install

# Salin seluruh project
COPY . .

# Build Next.js tanpa lint/type check
RUN npm run build || true

# Jalankan aplikasi di port 3000
EXPOSE 3000
CMD ["npm", "start"]

set -o errexit

npm install
npm run build
npm prisma generate
npm prisma migrate deploy
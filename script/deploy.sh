echo "Deploying app ..."

echo "Update codebase..."
cd ~/home/founders-backend
git fetch origin main
git reset --hard origin/main

echo "BACKEND"

echo "goto backend folder"
cd ~/home/founders-backend

echo "Install dependencies"
npm install

echo "Restart pm2 service"
pm2 restart deploy.json

echo "BACKEND deploy successfull"

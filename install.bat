@echo off
cls

echo "INSTALLING GAMECAST..."

TIMEOUT /T 1

cls
echo "INSTALL GAMEPAD LIBRARIES"
cd src\gamepad
npm install

cd ..\..\

cls
echo "INSTALL SCREEN LIBRARIES"
cd src\screen
npm install

cd ..\..\

cls
echo "INSTALL SERVER LIBRARIES"
cd src\server npm install 
npm install

cd ..\..\

echo "INSTALL GLOBAL LIBRARIES"
npm install

echo "CREATE SYMLINKS..."
npm link

echo "DONE!"
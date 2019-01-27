echo "INSTALLING GAMECAST..."

clear
echo "INSTALL GAMEPAD LIBRARIES"
cd src/gamepad
npm install

cd ../../

clear
echo "INSTALL SCREEN LIBRARIES"
cd src/screen
npm install

cd ../../

clear
echo "INSTALL SERVER LIBRARIES"
cd src/server npm install 
npm install

cd ../../

echo "INSTALL GLOBAL LIBRARIES"
npm install

echo "DONE!"
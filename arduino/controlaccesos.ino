#include <SPI.h>
#include <MFRC522.h>

#define RST_PIN 9 // Configurable, see typical pin layout above
#define SS_PIN 10 // Configurable, see typical pin layout above

MFRC522 mfrc522(SS_PIN, RST_PIN); // Create MFRC522 instance

MFRC522::MIFARE_Key key;

void setup()
{
  Serial.begin(9600); // Initialize serial communications with the PC
  while (!Serial)
    ;                 // Do nothing if no serial port is opened (added for Arduinos based on ATMEGA32U4)
  SPI.begin();        // Init SPI bus
  mfrc522.PCD_Init(); // Init MFRC522 card
}
int nAuthorized = 23;            //Numero de autorizados
int authorized[] = {15683, 214}; //UIDs Autorizados
//Funcion GetUID
unsigned long getID()
{
  if (!mfrc522.PICC_ReadCardSerial())
  { //Since a PICC placed get Serial and continue
    return -1;
  }
  unsigned long hex_num;
  hex_num = mfrc522.uid.uidByte[0] << 24;
  hex_num += mfrc522.uid.uidByte[1] << 16;
  hex_num += mfrc522.uid.uidByte[2] << 8;
  hex_num += mfrc522.uid.uidByte[3];
  mfrc522.PICC_HaltA(); // Stop reading
  return hex_num;
}
void loop()
{
  if (mfrc522.PICC_IsNewCardPresent())
  {
    unsigned long uid = getID();
    if (uid != -1)
    {
      Serial.println(uid);
      int actualUID = uid;
      int arraySize = sizeof(authorized) / sizeof(int);
      boolean found = false;
    }
  }
}

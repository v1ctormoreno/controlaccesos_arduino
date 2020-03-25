#include <SPI.h>
#include <MFRC522.h>

#define RST_PIN 9 // Configurable, see typical pin layout above
#define SS_PIN 10 // Configurable, see typical pin layout above

int speakerPin = 7;
int length = 15; // el numero de las notas
char notes[] = "ccggaagffeeddc "; 
int beats[] = { 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 4 };
int tempo = 300;
void playTone(int tone, int duration) {
  for (long i = 0; i < duration * 1000L; i += tone * 2) {
    digitalWrite(speakerPin, HIGH);
    delayMicroseconds(tone);
    digitalWrite(speakerPin, LOW);
    delayMicroseconds(tone);
  }
}

void playNote(char note, int duration) {
  char names[] = { 'c', 'd', 'e', 'f', 'g', 'a', 'b', 'C' };
  int tones[] = { 1915, 1700, 1519, 1432, 1275, 1136, 1014, 956 };

  // toca el tono correspondiente al nombre de la nota
  for (int i = 0; i < 8; i++) {
    if (names[i] == note) {
      playTone(tones[i], duration);
    }
  }
}

int incomingByte = 0;
bool comprobar_tarjeta;

MFRC522 mfrc522(SS_PIN, RST_PIN); // Create MFRC522 instance

MFRC522::MIFARE_Key key;

void setup()
{
  pinMode(speakerPin, OUTPUT);
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  comprobar_tarjeta=true;
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
  digitalWrite(2, LOW);
  digitalWrite(3, LOW);
  if (mfrc522.PICC_IsNewCardPresent() && comprobar_tarjeta)
  {
    unsigned long uid = getID();
    comprobar_tarjeta = false;
    if (uid != -1)
    {
      Serial.println(uid);
      int actualUID = uid;
      int arraySize = sizeof(authorized) / sizeof(int);
      boolean found = false;
    }
  }
  if (Serial.available() > 0 && !comprobar_tarjeta)
  {
    // read the incoming byte:
    incomingByte = Serial.read();
    incomingByte = incomingByte-48;
    // say what you got:
    if(incomingByte){
      digitalWrite(2, HIGH);
      tone(6, 1000, 500);
      delay(750);
      tone(6, 1000, 500);      
      delay(3000);
      digitalWrite(2, LOW);
    } else {
      digitalWrite(3, HIGH);
      tone(6, 100, 3000);
      delay(3000);
      digitalWrite(3, LOW);
    }
    comprobar_tarjeta=true;
  }
}

# Control de accesos con Arduino
Control de accesos usando un lector RFID, NodeJS y MariaDB (MySQL).

## Cómo probarlo en local
1. Has de tener instalado NodeJS y NPM (se suelen instalar juntos).
2. Has de tener una base de datos SQL (Preferiblemente MariaDB).


### Requisitos de Hardware
* Arduino Uno.
* Protoboard.
* RFC522

#### Pasos a seguir:
* Clona el repositorio.
* Sube el archivo arduino/controlaccesos.ino a tu Arduino, realiza el siguiente wiring:

###### RFID Sensor
| *#* | *RFID SENSOR* |  *ARDUINO*  |
|:-:|:-----------:|:---------:|
| **1** |     3.3V    |    3.3V   |
| **2** |     RST     | Digital 9 |
| **3** |     GND     |    GND    |
| **4** |      RQ     |     -     |
| **5** |     MISO    |     12    |
| **6** |     MOSI    |     11    |
| **7** |     SCK     |     13    |
| **8** |     SDA     |     10    |


* Copia y pega el archivo db.sql en tu instancia de MySQL.
* Entra a la raiz del repositorio y ejecuta los siguientes comandos:

		npm i 
		npm run dev
	
* Accede al puerto 4000 de tu máquina. [Haz clic aquí para entrar.](http://localhost:4000)

Ya lo tendrías funcionando, cualquier duda:

* [Telegram](https://t.me/v1ctormoreno) (@v1ctormoreno).
* [Email](mailto:victormorenotin@gmail.com) (victormorenotin@gmail.com)

Proyecto de síntesis de GM (Sistemas Microinformáticos y Redes) un poco overkill, pero así es como tiene que ser.


Víctor Moreno. 2020. 

[v1ctor.es](https://v1ctor.es)

[blog.v1ctor.es](https://blog.v1ctor.es)

Visita esas webs.


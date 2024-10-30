/*
#include <Arduino.h>

const int btnPinAxxiba = 2;
const int btnPinAbajo = 13;

int estadoBotonAxxiba = 0;
int estadoBotonAbajo = 0;


void sendBtnValue(int btnValue) {


}

void setup() {
  // put your setup code here, to run once:
   pinMode(btnPinAxxiba, INPUT);
   pinMode(btnPinAbajo, INPUT);

   Serial.begin(9600);        // Inicializa comunicación serial

}

void loop() {
  // put your main code here, to run repeatedly:
  estadoBotonAxxiba = digitalRead(btnPinAxxiba);  // Lee el estado del botón

  if (estadoBotonAxxiba == HIGH) {

    String dataToSend = "{ \"flecha\": \" " + String("Axxiba") +  "\" }";

    Serial.println(dataToSend);

  }

  estadoBotonAbajo = digitalRead(btnPinAbajo);
   if (estadoBotonAbajo == HIGH) {

    String dataToSend = "{ \"flecha\": \"" + String("Abajo") + "\" }";


    Serial.println(dataToSend);

  }

  delay(200);

} */

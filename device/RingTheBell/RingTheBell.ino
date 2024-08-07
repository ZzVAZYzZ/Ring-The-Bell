#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>






#ifndef APSSID
#define APSSID "NgocDung"  
#define APPSK "vietquang2712" 
#define BUTTON_PIN4 D4 
#define BUTTON_PIN3 D3 
#define BUTTON_PIN5 D5 
#define BUTTON_PIN6 D6 
#endif




const char *ssid = APSSID;
const char *password = APPSK;
const char *URL = "http://192.168.1.6:8000/setTeam"; 
const char *RESETURL = "http://192.168.1.6:8000/updateTeamStateWemos";
bool globalFlag = false;

// Khởi tạo các đối tượng
WiFiClient client;
HTTPClient http;

void setup() {
  pinMode(BUTTON_PIN4, INPUT_PULLUP);
  pinMode(BUTTON_PIN3, INPUT_PULLUP);
  pinMode(BUTTON_PIN5, INPUT_PULLUP);
  pinMode(BUTTON_PIN6, INPUT_PULLUP);
  Serial.begin(9600);
  Serial.println();
  Serial.print("Kết nối đến mạng Wifi...");

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nĐã kết nối với WiFi.");

}

void loop() {
  
  if (digitalRead(BUTTON_PIN4) == LOW ) {
    if(globalFlag == false){
      postJsonData("4");
      delay(50); 
    }
    
  }

  if (digitalRead(BUTTON_PIN3) == LOW ) {
    if(globalFlag == false){
      postJsonData("3");
      delay(50); 
    }
    
  }

  if (digitalRead(BUTTON_PIN5) == LOW  ) {
    if(globalFlag == false){
      postJsonData("2");
      delay(50); 
    }
    
  }

  if (digitalRead(BUTTON_PIN6) == LOW  ) {
    if(globalFlag == false){
      postJsonData("1");
      delay(50); 
    }
  }

  resetFlag();

  delay(100);
}

void resetFlag() {
  if (http.begin(client, RESETURL)) {
    
    DynamicJsonDocument doc(1024);
    doc["reset"] = "reset flag"; 

    String output;
    serializeJson(doc, output);

    http.addHeader("Content-Type", "application/json");
    int httpCode = http.POST(output);

    if (httpCode > 0) {
      String payload = http.getString();

      DynamicJsonDocument responseDoc(1024);
      DeserializationError error = deserializeJson(responseDoc, payload);

      if (!error) {
        globalFlag = responseDoc["flag"].as<bool>();
      }


    } 
    http.end();
  } 
}

void postJsonData(String data) {
  if (http.begin(client, URL)) {
    DynamicJsonDocument doc(1024);
    doc["chooseTeam"] = data; 

    String output;
    serializeJson(doc, output);

    http.addHeader("Content-Type", "application/json");
    int httpCode = http.POST(output);

    if (httpCode > 0) {
      Serial.printf("[HTTP] POST... code: %d\n", httpCode);
      String payload = http.getString();
      Serial.println("respone from server:");
      Serial.println(payload);

      // DynamicJsonDocument responseDoc(1024);
      // DeserializationError error = deserializeJson(responseDoc, payload);

      // if (!error) {
      //   // Gán giá trị từ JSON vào biến global
      //   globalFlag = responseDoc["flag"].as<bool>();
      //   Serial.println("Global flag updated:");
      //   Serial.println(globalFlag ? "true" : "false");
      // } else {
      //   Serial.println("Failed to parse JSON");
      // }


    } else {
      Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }
    http.end();
  } else {
    Serial.println("cannot HTTP connect");
  }
}
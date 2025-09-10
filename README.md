# 🤖 CheckAI – Lokalni GPT sistem

## 📌 Opšti podaci
**Naziv projekta:** ČekAI  
---

## 📝 Opis projekta
- **Korisnici:**  
  - Registrovani: mogu čuvati istoriju četova vezanu za nalog.  
  - Neregistrovani: sesija se tretira kao nezavisna, bez istorije.  
- **Tipovi korisnika:**  
  - Obični: dnevni limit od 50 poruka.  
  - Premium: neograničen broj poruka.  

- **Funkcionalnosti:**  
  - Čuvanje i prikaz istorije četova po korisniku.  
  - Brisanje kompletnog četa.  
  - Ograničavanje broja poruka po tipu korisnika.  
  - Autentifikacija i autorizacija (server i klijent).  
  - Validacija podataka na klijentskoj i serverskoj strani.  

---

## ⚙️ Tehnička arhitektura

- **Baza podataka:**  
  - Relaciona baza za čuvanje korisnika i istorije četova.  
  - Evidencija po korisničkim nalozima i sesijama.  

- **SOLID i čista arhitektura:**  
  - Separacija logike prezentacije, servisa i modela.  
  - Upotreba Dependency Injection i principa Single Responsibility, Open/Closed, itd.  

---

## 🖥️ Upotreba
1. Pokrenuti **serversku aplikaciju** koja komunicira sa LM Studio modelom.  
2. Pokrenuti **klijentsku aplikaciju** i registrovati ili ulogovati korisnika.  
3. Registrovani korisnici mogu čuvati istoriju četova, neregistrovani imaju sesiju bez istorije.  
4. Obični korisnici poštuju dnevni limit poruka, premium korisnici nemaju ograničenje.  
5. Poruke se šalju modelu na engleskom jeziku preko LM Studio API-ja.  
6. Četovi se mogu pregledati, nastaviti ili izbrisati.   

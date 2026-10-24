# Gladiator Combat Archives & Digital Museum 🏛️⚔️

เว็บไซต์นำเสนอข้อมูลประวัติศาสตร์และสถิตินักสู้โรมันโบราณ (Gladiator Combat) ตามข้อกำหนดในเอกสาร **รายละเอียดเว็บไซต์.docx** และชุดข้อมูลจาก **gladiator_data.csv**

---

## 🎨 สไตล์และการออกแบบ (Modern Art Museum Design)
* **ธีมสี:** ขาว ดำ เทา (Monochrome / Modern Museum Palette)
* **แบบอักษร:** Google Fonts **"Bai Jamjuree"** และ **"Cinzel"**
* **ไอคอน:** Flaticon Uicons (Regular Rounded)
* **แอนิเมชัน:** Smooth Hover Transitions & Micro-interactions บนปุ่มและการ์ดข้อมูล
* **Responsive:** รองรับทั้งหน้าจอเดสก์ท็อป แท็บเล็ต และสมาร์ตโฟน
* **รูปภาพประกอบ:** ดึงภาพจาก URL คุณภาพสูงจริงจาก Unsplash (ไม่มีการเจเนอเรตภาพปลอม)

---

## 📁 โครงสร้างโปรเจกต์ (แยกไฟล์ตามภาษาอย่างเป็นระเบียบ)

```
Gladiator Combat/
├── index.html                 # หน้าแรก (Home): เกริ่นนำประวัติศาสตร์ + 6 ชาร์ตสถิติสำคัญ + ทำเนียบยอดนักสู้
├── knowledge-graph.html       # หน้า Knowledge Graph: เชื่อมต่อ Neo4j + แสดงเครือข่ายความสัมพันธ์ vis-network
├── gladiators.html            # หน้า Gladiator: ตารางค้นหา/จัดเรียง/กรองข้อมูล + Modal 14 คุณลักษณะ
├── about.html                 # หน้า About: ความเป็นมา, วัตถุประสงค์ และทำเนียบทีมนักพัฒนา 10 คน
├── Logo.png                   # โลโก้ทางการของเว็บไซต์
├── gladiator_data.csv         # ไฟล์ชุดข้อมูลนักสู้โรมันต้นฉบับ (9,976 คน)
├── รายละเอียดเว็บไซต์.docx    # เอกสารข้อกำหนดโครงการ
│
├── css/                       # ไฟล์สไตล์ชีต (แยกภาษา CSS ชัดเจน)
│   ├── style.css              # Design System หลัก, Navigation Bar, Footer, Buttons
│   ├── home.css               # สไตล์หน้าแรก Hero, History, Analytics Charts Grid
│   ├── gladiators.css         # สไตล์ตารางนักสู้, ฟิลเตอร์, Pagination, Modal 14 ฟิลด์
│   ├── graph.css              # สไตล์ Canvas กราฟความสัมพันธ์, Legend, Inspector Panel
│   └── about.css              # สไตล์ส่วนพันธกิจ และการ์ดแสดงรูปโปรไฟล์ 10 นักพัฒนา
│
├── js/                        # ไฟล์ JavaScript (แยกภาษา JS ชัดเจน)
│   ├── main.js                # ควบคุม Mobile Menu และระบบ Global Search Bar
│   ├── home.js                # ควบคุม Chart.js พล็อตสถิติ 6 ด้าน และตัวเลขอัตโนมัติ
│   ├── gladiators.js          # ระบบค้นหา, กรองข้อมูล, เรียงลำดับ, แบ่งหน้า, Modal 14 ฟิลด์
│   └── graph.js               # จัดการ interactive graph vis-network และคลิกดูรายละเอียดโหนด
│
├── data/                      # ไฟล์ข้อมูล JSON ประสิทธิภาพสูง
│   ├── gladiators.json        # ข้อมูลนักสู้ 9,976 คน แปลงจาก CSV สำหรับเว็บ
│   ├── stats.json             # สถิติสรุปเชิงตัวเลขสำหรับหน้าแรก
│   └── graph_data.json        # ข้อมูลโหนดและความสัมพันธ์ 25 รายการสำหรับ Knowledge Graph
│
├── neo4j_connector.py         # สคริปต์ภาษา Python เชื่อมต่อ Neo4j ด้วยคำสั่ง Cypher
├── export_data.py             # สคริปต์ภาษา Python แปลง CSV เป็น JSON
└── server.py                  # เว็บเซิร์ฟเวอร์ภาษา Python และ API สำหรับรันเว็บไซต์
```

---

## 🚀 วิธีการเปิดใช้งานเว็บไซต์

### วิธีที่ 1: รันผ่าน Local Python Web Server (แนะนำ)
เปิด Terminal หรือ PowerShell ในโฟลเดอร์โครงการ แล้วรันคำสั่ง:
```bash
python server.py
```
จากนั้นเปิดเบราว์เซอร์ไปที่:
👉 **http://localhost:8000**

---

## 📊 รายละเอียดฟังก์ชันสำคัญในแต่ละหน้า

### 1. หน้าแรก (Home - `index.html`)
* **Navigator:** มี Logo.png, ช่องค้นหานักสู้ (พิมพ์ชื่อหรือคีย์เวิร์ดแล้วกด Enter เพื่อไปยังหน้าผลการค้นหาทันที), เมนู Home, Knowledge Graph, Gladiator, About
* **เนื้อหาความเป็นมา:** ประวัติของนักสู้โรมัน พิธีกรรม Munera, ค่ายฝึก Ludus, และดาบไม้อิสรภาพ Rudius
* **สถิติสำคัญ 6 รายการในรูปแบบกราฟข้อมูล:**
  1. จำนวนนักสู้ทั้งหมด (9,976 คน)
  2. สถิติการชนะการต่อสู้ (รวม 78,256 ครั้ง พร้อมชาร์ตสัดส่วน)
  3. สถิติการแพ้การต่อสู้ (รวม 17,270 ครั้ง)
  4. สไตล์การต่อสู้ยอดฮิต 6 สาย (Provocator, Thraex, Retiarius, Secutor, Hoplomachus, Murmillo)
  5. สถิติการได้รับบาดเจ็บ (Low Injury 79.4% vs High Injury 20.6%)
  6. อาวุธยอดนิยม 6 ประเภท (Dagger, Gladius, Sica, Trident, Net, Spear)
* **ทำเนียบยอดนักสู้:** สรุปแชมเปียนสถิติชนะสูงสุด 4 อันดับแรก

### 2. หน้า Knowledge Graph (`knowledge-graph.html`)
* เชื่อมโยงกับฐานข้อมูล **Neo4j** ด้วย **Python (`neo4j_connector.py`)**
* รันคำสั่ง Cypher:
  ```cypher
  MATCH (n)-[r]->(m) RETURN n, r, m LIMIT 500
  ```
* แสดงผลเป็น Interactive Graph พร้อมระบบฟิสิกส์ ซูมเข้า-ออก ปรับมุมมองอัตโนมัติ
* มี Legend แยกประเภทสีของโหนด: Gladiator, Category, Weapon, Origin, Arena/School
* มีแถบ **Inspector** ด้านข้าง เมื่อคลิกที่โหนดหรือเส้นความสัมพันธ์จะแสดง Properties ทั้งหมด

### 3. หน้า Gladiator (`gladiators.html`)
* ตารางแสดงรายชื่อนักสู้โรมันครบถ้วน
* ฟีเจอร์ตัวกรองและจัดเรียง:
  * เรียงตามตัวอักษรชื่อ (A ➔ Z, Z ➔ A)
  * เรียงตามสถิติชัยชนะ (มากไปน้อย / น้อยไปมาก)
  * เรียงตามความพ่ายแพ้ หรืออายุ
  * กรองตามถิ่นกำเนิด (Rome, Numidia, Greece, Germania, Gaul, Thrace)
  * กรองตามอาวุธ (Dagger, Gladius, Sica, Trident, Net, Spear)
  * กรองตามสไตล์การต่อสู้
* **หน้าต่างแสดงข้อมูลนักสู้ (Detail Modal):** แสดงข้อมูลครบทั้ง 14 รายการเมื่อคลิกที่ชื่อนักสู้:
  1. ชื่อ
  2. อายุ
  3. ปีเกิด
  4. ถิ่นกำเนิด
  5. น้ำหนัก
  6. ส่วนสูง
  7. สไตล์การต่อสู้
  8. จำนวนครั้งที่ชนะ
  9. จำนวนครั้งที่แพ้
  10. อาวุธประจำกาย
  11. อาชีพเดิม
  12. ผู้สนับสนุน (Patron Wealth)
  13. ความเข้มข้นในการฝึกฝน (Training Intensity)
  14. ความนิยมจากสาธารณะชน (Public Favor)

### 4. หน้า About (`about.html`)
* ความเป็นมาและจุดมุ่งหมายของเว็บไซต์
* ทำเนียบทีมนักพัฒนาทั้งหมด 10 คน พร้อมรูปภาพและตำแหน่ง:
  1. **ชมพูนุท กลั่นกล้า** — Promotional Media & Poster Design
  2. **ทรัพย์ศิริ ป้องวันคำ** — Data Curation & Filtering
  3. **บงกชธร ถิ่นทวี** — UI/UX 
  4. **จักรพรรดิ์ สังฆะบุรี** — Website Information Architecture & Structure Design
  5. **จันทราวรรณ แน่นอุดร** — Web Development & Coding
  6. **มณฑาทิพย์ ผกาแดง** — Project Documentation & Reporting
  7. **เมธะคามิน สุระพันธ์** — Dataset Acquisition
  8. **ลวิตรา กาบมาลี** — Data Relationship Mapping in Neo4j
  9. **ศิริชัย สุวรรณจันทร์** — Knowledge Graph Architecture Design
  10. **สุทธินันท์ ช่างเสา** — System Testing & Comprehensive Reporting

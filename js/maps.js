// ข้อมูลรายละเอียดและ Iframe ของแต่ละเมือง
const cityData = {
  rome: {
    title: "Rome (กรุงโรม)",
    country: "ประเทศอิตาลี (Italy)",
    currentStatus: "ปัจจุบันคือกรุงโรม เมืองหลวงของประเทศอิตาลี เต็มไปด้วยโบราณสถานระดับโลก เช่น โคลอสเซียม (Colosseum) สนามกีฬาอัฒจันทร์โบราณขนาดใหญ่ที่สุดในโลก สัญลักษณ์แห่งความยิ่งใหญ่ของจักรวรรดิโรมัน ใช้สำหรับจัดการแข่งขันกลาดิเอเตอร์และการแสดงในอดีต, โรมันฟอรัม (Roman Forum)ศูนย์กลางทางการเมือง ศาสนา และเศรษฐกิจของโรมโบราณ เต็มไปด้วยซากปรักหักพังของวิหารและอาคารราชการสำคัญ",
    history: "ศูนย์กลางอำนาจหลักของจักรวรรดิโรมัน เป็นจุดกำเนิดของกฎหมาย วัฒนธรรม และโครงสร้างการปกครองที่ทรงอิทธิพลที่สุดในประวัติศาสตร์ตะวันตก",
    iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.1230741800646!2d12.48965597608522!3d41.890210171240334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61b6532013ad%3A0x28f1c82e908503c4!2sThe%20Colosseum!5e0!3m2!1sth!2sth!4v1792650020396!5m2!1sth!2sth" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>'
  },
  numidia: {
    title: "Numidia (นูมิเดีย)",
    country: "ประเทศแอลจีเรีย และบางส่วนของประเทศตูนิเซีย ในปัจจุบัน",
    currentStatus: "แม้ว่าดินแดนแห่งนี้จะผ่านกาลเวลามานาน แต่ก็ยังมีโบราณสถานและแหล่งมรดกโลกที่สำคัญหลงเหลืออยู่หลายแห่ง โดยเฉพาะสถาปัตยกรรมยุคโบราณที่ผสมผสานระหว่างอารยธรรมนูมิเดียและโรมัน เช่น เมืองโบราณทิมกาด (Timgad), ซากเมืองซีร์ตา (Cirta), สุสานหลวงแห่งมาซินิสซาและสุสานชนเผ่าพื้นเมือง (Royal Mausoleums of Numidia) และเมืองโบราณดูคกา (Dougga) ในตูนิเซีย",
    history: "ดินแดนโบราณของชาวเบอร์เบอร์ (Berber) ในอดีตเคยเป็นพันธมิตรและสนามรบสำคัญระหว่างโรมกับคาร์เธจ ก่อนจะถูกผนวกเป็นมณฑลของจักรวรรดิโรมัน",
    iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5938330.392671812!2d0.927591688747773!3d35.33917988873349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128f78a46915252b%3A0x97a2630691072b80!2sRoyal%20Mausoleum%20of%20Mauretania!5e0!3m2!1sth!2sth!4v1792650252013!5m2!1sth!2sth" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>'
  },
  greece: {
    title: "Greece (กรีซ)",
    country: "ประเทศกรีซ (Greece)",
    currentStatus: "ปัจจุบันคือกรุงเอเธนส์และพื้นที่ส่วนใหญ่ของประเทศกรีซ เป็นแหล่งท่องเที่ยวเชิงประวัติศาสตร์ที่สำคัญที่สุดแห่งหนึ่งของโลก เช่น วิหารพาร์ทานอน (Parthenon) บนอะโครโพลิส สัญลักษณ์อันโดดเด่นของกรีซโบราณ,วิหารแห่งเทพอะพอลโล ที่เดลฟี (Sanctuary of Apollo at Delphi),แหล่งโบราณคดีโอลิมเปีย (Archaeological Site of Olympia) ดกำเนิดของการแข่งขันกีฬาโอลิมปิกโบราณ และโรงละครแห่งเอปิดอารุส (Theatre of Epidaurus) โรงละครกลางแจ้งโบราณที่สร้างขึ้นตั้งแต่ศตวรรษที่ 4 ก่อนคริสตกาล",
    history: "แหล่งกำเนิดอารยธรรมตะวันตก ปรัชญา และประชาธิปไตย แม้จะพ่ายแพ้ทางการเมืองและถูกผนวกรวมเข้ากับจักรวรรดิโรมัน แต่วัฒนธรรมกรีกกลับครอบงำจิตวิญญาณของชาวโรมันทั้งหมด",
    iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12581.565792872616!2d23.726963359132522!3d37.967993060142796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1bd19ca39ee61%3A0x1b3fa079b878a218!2z4Lie4Liy4Lij4LmM4LmA4LiY4LiZ4Lit4LiZ!5e0!3m2!1sth!2sth!4v1792650347533!5m2!1sth!2sth" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>'
  },
  germania: {
    title: "Germania (เจอร์มาเนีย)",
    country: "ประเทศเยอรมนี, ลักเซมเบิร์ก, โปแลนด์ , ออสเตรีย และยุโรปกลางในปัจจุบัน",
    currentStatus: "ปัเนื่องจากชาวเยอร์มานิกในสมัยโบราณสร้างบ้านเรือนด้วยไม้และวัสดุธรรมชาติเป็นหลัก จึงทำให้ซากปรักหักพังของสิ่งก่อสร้างโบราณหลงเหลืออยู่น้อยกว่าดินแดนโรมันหรือกรีก แต่ก็ยังมีสถานที่สำคัญทางประวัติศาสตร์ที่เกี่ยวข้องหลงเหลืออยู่ เช่น กำแพงลิเมส (Limes Germanicus), พิพิธภัณฑ์โบราณคดีและแหล่งยุทธการที่ป่าทูโทบวร์ก (Teutoburg Forest / Kalkriese), เมืองโบราณยุคโรมันริมแม่น้ำไรเธน (เช่น เมือง Trier หรือ Colonia Agrippina ในอดีต)และพิพิธภัณฑ์ในเมืองเบอร์ลินหรือแฟรงก์เฟิร์ต ",
    history: "ดินแดนป่าทึบและแม่น้ำไริน เต็มไปด้วยชนเผ่าเยอรมันที่ดุร้ายและรักอิสระ ซึ่งจักรวรรดิโรมันพยายามขยายอำนาจเข้าไปหลายครั้งแต่ไม่เคยพิชิตได้ทั้งหมดอย่างเบ็ดเสร็จ",
    iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1288.7009780095505!2d6.642570988840656!3d49.75969552556136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47957c91d2077aab%3A0x8d96aff3292fdbfd!2sPorta%20Nigra!5e0!3m2!1sth!2sth!4v1792650522634!5m2!1sth!2sth" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>'
  },
  gaul: {
    title: "Gaul (โกล)",
    country: "ประเทศฝรั่งเศส เบลเยียม และสวิตเซอร์แลนด์ในปัจจุบัน",
    currentStatus: "ปัจจุบันคือพื้นที่ส่วนใหญ่ของประเทศฝรั่งเศส (France) รวมถึงลุ่มแม่น้ำโรน มีโบราณสถานยุคโรมันหลงเหลืออยู่มาก เช่น โรงละครโรมันโบราณ (Roman Theatre of Orange), สะพานส่งน้ำปงดูว์การ์ (Pont du Gard) สะพานส่งน้ำโรมันโบราณที่ข้ามแม่น้ำการ์ดในประเทศฝรั่งเศส, อัฒจันทร์โบราณแห่งนิมส์ (Arena of Nîmes) สนามกีฬากลางแจ้งของโรมันที่สร้างขึ้นราว ค.ศ. 70 ในอดีตใช้สำหรับการแข่งขันของนักรบกลาดิเอเตอร์ และปัจจุบันยังคงถูกใช้งานสำหรับการจัดแสดงคอนเสิร์ตและอีเวนต์ต่างๆ",
    history: "ดินแดนที่จูเลียส ซีซาร์ (Julius Caesar) นำกองทัพเข้าพิชิตในสงครามกอลลิก (Gallic Wars) กลายมาเป็นหนึ่งในมณฑลที่มั่งคั่งและมีความเป็นโรมันสูงที่สุดแห่งหนึ่ง",
    iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2863.4528395941834!2d4.806236775684139!3d44.13590692107812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b5974d0a0f65e5%3A0xd9cb7cb4878c0ad3!2z4LmC4Lij4LiH4Lil4Liw4LiE4Lij4LmC4Lij4Lih4Lix4LiZ4LmB4Lir4LmI4LiH4Lit4Lit4Lij4LmH4Lit4LiH4LiM4LmM!5e0!3m2!1sth!2sth!4v1792650615702!5m2!1sth!2sth" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>'
  },
  thrace: {
    title: "Thrace (เธรซ)",
    country: "ประเทศบัลแกเรีย, ประเทศกรีซ (บริเวณกรีซตะวันออกหรือภูมิภาคเวสเทิร์นเทรซ) และ ประเทศตุรกี",
    currentStatus: "ปัจจุบันพื้นที่กระจัดกระจายอยู่บริเวณพรมแดนประเทศบัลแกเรีย กรีซ และตุรกีตะวันออก สถานที่ทางประวัติศาสตร์และโบราณวัตถุที่สำคัญของชาวเธรซโบราณที่ยังคงหลงเหลืออยู่ เช่น สุสานหลวงแห่งทราชรุก, เมืองโบราณและป้อมปราการเปอริเปรอน (Perperikon), เมืองโบราณไบแซนเทียม (Byzantium) เมืองท่าสำคัญในยุคโบราณที่ตั้งอยู่ในเขตเธรซ (ปัจจุบันคืออิสตันบูล ประเทศตุรกี)และหลุมฝังศพและสมบัติทองคำแห่งพานาจูริชเต (Panagyurishte Treasure)",
    history: "ดินแดนที่ขึ้นชื่อเรื่องความกล้าหาญและความดุร้ายของนักรบ (บ้านเกิดของ สปาร์ตาคัส - Spartacus) ก่อนจะถูกผนวกรวมเป็นมณฑลของโรมัน",
    iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d762433.7095409243!2d24.4404706029804!3d41.7149798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ad68a597ae2f3b%3A0xa2998ce2ffcccbab!2sAncient%20sanctuary%20city%20Perperikon!5e0!3m2!1sth!2sth!4v1792650724396!5m2!1sth!2sth" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>'
  }
};

function selectCityFromURL() {
  const params = new URLSearchParams(window.location.search);
  const cityKey = (params.get("city") || "").toLowerCase();

  const allowedCities = [
    "rome",
    "numidia",
    "greece",
    "germania",
    "gaul",
    "thrace"
  ];

  if (!allowedCities.includes(cityKey)) return;

  const cityButton = [...document.querySelectorAll(".city-btn")]
    .find(button =>
      button.getAttribute("onclick")?.includes(`'${cityKey}'`)
    );

  if (cityButton) {
    switchCity(cityKey, cityButton);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", selectCityFromURL);
} else {
  selectCityFromURL();
}

function switchCity(cityKey, btnElement) {
  // เปลี่ยนสถานะปุ่ม Active
  document.querySelectorAll('.city-btn').forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');

  // ดึงข้อมูลตามคีย์เมือง
  const data = cityData[cityKey];
  if (!data) return;

  // เปลี่ยนแผนที่ Iframe
  document.getElementById('mapDisplayContainer').innerHTML = data.iframe;

  // เปลี่ยนข้อความคำอธิบายฝั่งขวา
  const descHtml = `
    <h3>${data.title}</h3>
    <div class="info-group">
      <div class="info-label">ประเทศในปัจจุบัน:</div>
      <div class="info-text">${data.country}</div>
    </div>
    <div class="info-group">
      <div class="info-label">สภาพพื้นที่และสถานที่สำคัญปัจจุบัน:</div>
      <div class="info-text">${data.currentStatus}</div>
    </div>
    <div class="info-group">
      <div class="info-label">ความสำคัญทางประวัติศาสตร์:</div>
      <div class="info-text">${data.history}</div>
    </div>
  `;
  document.getElementById('descContainer').innerHTML = descHtml;
}
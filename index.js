const { Lunar } = require('lunar-javascript');
const fs = require('fs');

function build(year) {
  let events = [];

  function add(date, title) {
    let d = new Date(date);
    let iso = d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    events.push(`BEGIN:VEVENT
DTSTART:${iso}
SUMMARY:${title}
END:VEVENT`);
  }

  for (let m = 1; m <= 12; m++) {
    let first = Lunar.fromYmd(year, m, 1).getSolar().toDate();
    add(first, "🙏 初一拜拜");

    let fifteenth = Lunar.fromYmd(year, m, 15).getSolar().toDate();
    add(fifteenth, "🙏 十五拜拜");
  }

  let jigong = Lunar.fromYmd(year, 10, 14).getSolar().toDate();
  add(jigong, "🙏 济公圣诞");

  return `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
${events.join("\n")}
END:VCALENDAR`;
}

const year = new Date().getFullYear();
fs.writeFileSync("calendar.ics", build(year));

console.log("calendar.ics generated");

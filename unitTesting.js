import {to12h} from "./helpers.js";
console.log("Testing to12h...")

const militaryToNormalHourMap = new Map();
for (let i = 0; i <= 23; i++) {
  const militaryHour = i.toString().padStart(2, "0");

  let normalHour;
  if (i === 0) {
    normalHour = "12ص";
  } else if (i === 12) {
    normalHour = "12م";
  } else if (i < 12) {
    normalHour = `${i}ص`;
  } else {
    normalHour = `${i - 12}م`;
  }
  militaryToNormalHourMap.set(militaryHour, normalHour);
}
console.log(militaryToNormalHourMap);
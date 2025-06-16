import { to12h } from "./helpers.js";

const from24hTo12h = new Map();
for (let i = 0; i <= 23; i++) {
  const militaryHour = i.toString().padStart(2, "0");

  let normalHour;
  if (i === 0) {
    normalHour = "12ص";
  } else if (i === 12) {
    normalHour = "12م";
  } else if (i < 12) {
    normalHour = `${i}ص`;
  } else if (i > 12) {
    normalHour = `${i - 12}م`;
  }
  from24hTo12h.set(militaryHour, normalHour);
}
console.log("Testing to12h...");

let success = [];
let fail = [];
for (let mapping of from24hTo12h) {
    // console.log(`expecting '${mapping[0]}' to map to '${mapping[1]}'`);
    let returnValue = to12h(mapping[0] + ":" +  "00");
    let formattedReturnValue = returnValue.split(":")[0] + returnValue.charAt(returnValue.length -1);
    // console.log(`Got: '${formattedReturnValue}'`);
    if (mapping[1] === formattedReturnValue){
        success.push(`${mapping[0]} was correctly mapped to ${formattedReturnValue}`)
    } else {
        fail.push(`expected ${mapping[0]} to map to ${mapping[1]} but got: ${formattedReturnValue}`)
    }
}

if (fail.length === 0){
    console.log("Test Passed No Failures ✅");
    console.log("\nSucceded", success);
} else {
    console.log(`Test Failed had ${fail.length} failures ❌`);
    console.log(fail);
}

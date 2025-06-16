import { to12h, getHourDiff } from "./helpers.js";


function testTo12h(){
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

}
testTo12h();

function testGetHourDiffRaw() {
    let timeDiffTests = new Map();
    timeDiffTests.set(["03:25", "12:06"], "8:19");
    timeDiffTests.set(["11:00", "12:00"], "1:0");
    timeDiffTests.set(["13:31", "18:59"], "5:28");
    timeDiffTests.set(["20:29", "03:45"], "7:16");
    timeDiffTests.set(["09:32", "13:30"], "3:58");
    timeDiffTests.set(["12:00", "12:30"], "0:30");
}
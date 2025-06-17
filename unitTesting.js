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
        console.log("\nFailed:", fail);
        console.log("\nSucceded:", success);
    }

}

function testGetHourDiffRaw() {
    let timeDiffTests = new Map();
    // Cases where A < B.
    timeDiffTests.set(["03:25", "12:06"], "8:41");
    timeDiffTests.set(["03:00", "14:15"], "11:15");
    timeDiffTests.set(["11:00", "12:00"], "1:0");
    timeDiffTests.set(["00:00", "02:15"], "2:15");
    timeDiffTests.set(["9:46", "21:30"], "11:44");
    timeDiffTests.set(["12:00", "12:30"], "0:30");
    timeDiffTests.set(["09:32", "13:30"], "3:58");
    timeDiffTests.set(["13:31", "18:59"], "5:28");
    // Cases where A > B.
    timeDiffTests.set(["20:29", "03:45"], "7:16");
    timeDiffTests.set(["14:30", "00:15"], "9:45");
    timeDiffTests.set(["21:00", "11:15"], "14:15");
    timeDiffTests.set(["20:30", "19:15"], "22:45");
    timeDiffTests.set(["21:00", "13:15"], "16:15");

    let success = [];
    let fail = [];
    for (let mapping of timeDiffTests) {
        let returnValue = getHourDiff(mapping[0][0], mapping[0][1]);
        if (returnValue === mapping[1]){
            success.push(`The Diff in hours '${mapping[0]}' Was correctly evaluated as '${returnValue}'`)
        } else {
            fail.push(`Expected the hours in '${mapping[0]}' to evalutate to '${mapping[1]}', but got: '${returnValue}'`)
        }
    }

    if (fail.length === 0){
        console.log("Test Passed No Failures ✅");
        console.log("\nSucceded", success);
    } else {
        console.log(`Test Failed had ${fail.length} failures ❌`);
        console.log("\nFailed:", fail);
        console.log("\nSucceded:", success);
    }
}

testGetHourDiffRaw()
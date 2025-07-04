import { getHourDiff, to12h, getPrayerTimes } from "./helpers.js";
let adhanTimes = []
let betweenTimes = []
// add all adhan time span tags
adhanTimes.push(document.getElementById("adhan-fajr"))
adhanTimes.push(document.getElementById("adhan-dhuhr"))
adhanTimes.push(document.getElementById("adhan-asr"))
adhanTimes.push(document.getElementById("adhan-maghrib"))
adhanTimes.push(document.getElementById("adhan-isha"))

// add all between times span tags
betweenTimes.push(document.getElementById("fajr-to-dhuhr"))
betweenTimes.push(document.getElementById("dhuhr-to-asr"))
betweenTimes.push(document.getElementById("asr-to-maghrib"))
betweenTimes.push(document.getElementById("maghrib-to-isha"))

let options = {
    "is24hFormattings":true,
}

async function fillTimings(){
    try {
        // get the API data and clean it
        var responce = await getPrayerTimes();
        let data = await responce.json();
        let timings = data["data"]["timings"];
        // Delete unwanted timings
        ["Sunrise", "Sunset", "Imsak", "Midnight", "Firstthird", "Lastthird"].forEach((key) => {delete timings[key]});

        fillAdhanTimings(timings);
        fillBetweenTime(timings);
    }
    catch (err){
        console.log(`Request Failed...${err}`);
    }
}

function fillAdhanTimings(timings){
    let times = Object.values(timings)
    if (options["is24hFormattings"]){
        times = times.map((time) => {
            return to12h(time);
        })
    }
    for (let i = 0; i < adhanTimes.length; i++) {
        let prayer = adhanTimes[i];
        prayer.dir = 'rtl';
        prayer.innerText = times[i];
    }
}

function fillBetweenTime(timings){
    let times = Object.values(timings)
    for (let i = 0; i < betweenTimes.length; i++) {
        let betweenElement = betweenTimes[i];
        let diff = getHourDiff(times[i], times[i+1]);
        let [hour, min] = diff.split(":");
        betweenElement.innerText = "".concat(hour + "h", min == 0 ? "" : " " + min + "m");
    }
}

fillTimings();
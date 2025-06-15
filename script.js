import { to12h } from "./helpers.js";
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

async function getPrayerTimes(){
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };
    const latitude = "26.132069766303623";
    const longitude = "43.650431131305425";
    const date = "Date";
    const timeZone = "Asia/Riyadh";
    return fetch(`http://api.aladhan.com/v1//timings/${date}?latitude=${latitude}&longitude=${longitude}&method=4&timezonestring=${timeZone}&calendarMethod=HJCoSA`, requestOptions)
}
async function fillTimings(){
    try {
        // get the API data and clean it
        var responce = await getPrayerTimes();
        let data = await responce.json();
        let timings = data["data"]["timings"];
        // Delete unwanted timings
        ["Sunrise", "Sunset", "Imsak", "Midnight", "Firstthird", "Lastthird"].forEach((key) => {delete timings[key]});

        fillAdhanTimings(timings)
        fillBetweenTime(timings)
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

function fillBetweenTime(data){
    // const times = fomratBetweenTime(data);
}

function fomratBetweenTime(data, rounded = 5){
    let times = to12h(data, "24");
}

fillTimings();
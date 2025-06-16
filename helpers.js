export function to12h(hourMinute){
    let Am = 'ص'
    let Pm = 'م'
    if (!hourMinute || hourMinute.length < 4 || hourMinute.charAt(2) != ':') {
        throw new Error(`function 'to12h' expects a paramter in the format hh:mm, but got: ${hourMinute}`);
    }
    let hour = Number(hourMinute.split(":")[0])
    if (hour === 12){
        return "".concat(hour, ":", hourMinute.split(":")[1], Pm);
    }
    else if (hour === 0){
        return "".concat(12, ":", hourMinute.split(":")[1], Am);
    }
    else if (hour > 12) {
        hour -= 12;
        return "".concat(hour, ":", hourMinute.split(":")[1], Pm);
    }
    else if (hour < 12){
        if (hourMinute[0] == 0){
            return "".concat(hourMinute[1], ":", hourMinute.split(":")[1], Am);
        } else {
            return "".concat(hour, ":", hourMinute.split(":")[1], Am);
        }
    }
}

export function getHourDiff(hourMinute1 = "02:23", hourMinute2 = "13:11"){
    let hour1 = Number(hourMinute1.split(":")[0]);
    let hour2 = Number(hourMinute2.split(":")[0]);
    console.log(hour1);
    console.log(hour2);
    console.log(`Diff: ${hour2 - hour1}`);
}

getHourDiff();
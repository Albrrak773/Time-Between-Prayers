export function to12h(hourMinute) {
    let Am = "ص";
    let Pm = "م";
    if (!isFormatted(hourMinute)) {
        throw new Error(
            `function 'to12h' expects a paramter in the format hh:mm, but got: ${hourMinute}`
        );
    }
    let hour = Number(hourMinute.split(":")[0]);
    if (hour === 12) {
        return "".concat(hour, ":", hourMinute.split(":")[1], Pm);
    } else if (hour === 0) {
        return "".concat(12, ":", hourMinute.split(":")[1], Am);
    } else if (hour > 12) {
        hour -= 12;
        return "".concat(hour, ":", hourMinute.split(":")[1], Pm);
    } else if (hour < 12) {
        if (hourMinute[0] == 0) {
            return "".concat(hourMinute[1], ":", hourMinute.split(":")[1], Am);
        } else {
            return "".concat(hour, ":", hourMinute.split(":")[1], Am);
        }
    }
}
/**
 * Returns the Diffenerence in hours and minutes between 2 timestamps.
 *
 * '03:00' and '09:00' would return = '06:00'
 *
 * If earlier time was later than the later time, It would be assumed that its the next day and will return the difference
 * without throwing an error.
 * @param {Number} hourMinute1 - The Earlier Time
 * @param {Number} hourMinute2 The Later Time
 * @returns
 */
export function getHourDiff(hourMinute1, hourMinute2) {
    if (!isFormatted(hourMinute1) || !isFormatted(hourMinute2)) {
        throw new Error(
            `function 'getHourDiff' expects paramters in the format hh:mm, but got: param1:'${hourMinute1}', param2:'${hourMinute2}'`
        );
    }
    let [hour1, min1] = hourMinute1.split(":");
    let [hour2, min2] = hourMinute2.split(":");
    let hourDiff;
    let minDiff = min2 - min1;
    [hour1, hour2, min1, min2] = [hour1, hour2, min1, min2].map((num) => {
        return Number(num);
    });
    // in case where A > B but they are still in the same 12h period
    if (hour1 > 12 && hour2 < 12) {
        hourDiff = 12 - (hour1 % 12) + hour2;
        // in case where A > B and they are not within 12 hour of each other
    } else if (hour1 > 12 && hour2 > 12 && hour1 > hour2) {
        hourDiff = 24 + (hour2 - hour1);
    } else {
        hourDiff = hour2 - hour1;
    }
    if (minDiff < 0) {
        hourDiff -= 1;
        minDiff = 60 + minDiff;
    }
    return "".concat(hourDiff, ":", minDiff);
}

function isFormatted(timestamp){
    return !(!timestamp || timestamp.length < 4 || timestamp.charAt(2) != ":");
}
export function to12h(hourMinute = "00:00"){
    let hour = Number(hour.split(":")[0])
    if (hour >= 12) {
        hour -= 12;
        return "".concat(hour, ":", hourMinute.split(":")[1], 'م');
    }
    else {
        return hourMinute + "ص";
    }
}
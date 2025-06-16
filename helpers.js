export function to12h(hourMinute){
    if (!hourMinute || hourMinute.length < 4 || !hourMinute.includes(":")) {
        throw new Error(`function 'to12h' expects a paramter in the format hh:mm, but got: ${hourMinute}`);
    }
    let hour = Number(hourMinute.split(":")[0])
    if (hour >= 12) {
        hour = (hour === 12) ? 12 :  hour - 12;
        return "".concat(hour, ":", hourMinute.split(":")[1], 'م');
    }
    else {
        return hourMinute + "ص";
    }
}

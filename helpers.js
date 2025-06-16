export function to12h(hourMinute){
    let Am = 'ص'
    let Pm = 'م'
    if (!hourMinute || hourMinute.length < 4 || !hourMinute.includes(":")) {
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

console.log(to12h("09:00"));
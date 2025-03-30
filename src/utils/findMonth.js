function getMonthObject(array, month, year) {
    const result = array.find(obj => obj.month === month && obj.year === year);
    if (!result) {
        return { month, year, days: {} };
    }
    return result;
}


function getDayArray(arrray,day,month,year) {
    const a = getMonthObject(arrray,month,year);
    if (!a) {
        return null;
    }
    return a.days[day] || null;
}


export {getMonthObject,getDayArray}